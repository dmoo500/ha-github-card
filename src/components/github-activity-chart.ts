import {
  LitElement,
  html,
  svg,
  css,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, state } from "lit/decorators.js";
import type {
  ActivityChartOptions,
  ActivityChartType,
  ActivityMetricKey,
  HomeAssistant,
} from "../types/index.js";
import {
  ACTIVITY_METRICS,
  ACTIVITY_RANGES,
  activityRequestKey,
  computeDailyActivity,
  fetchActivityHistory,
  mergeLiveStates,
  resolveActivityOptions,
  type ActivityDay,
  type ResolvedActivityOptions,
} from "../utils/activity.js";

/** Short weekday labels fit up to this many days; longer ranges use dates. */
const MAX_DAYS_WITH_WEEKDAY_LABELS = 7;
/** Maximum number of x-axis labels before labels are thinned out. */
const MAX_AXIS_LABELS = 10;

/** Vertical plot area (viewBox units) kept free so lines and points are not clipped. */
const LINE_PLOT_PADDING = 8;

type LoadState = "loading" | "ready" | "error" | "no-sources";

/**
 * Daily activity chart for one GitHub repository, derived from the recorder
 * history of the "latest commit/issue/pull request" sensors.
 * Used standalone (ha-github-activity-card) and inside ha-github-card.
 */
export class GithubActivityChart extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  /** Sensor entity per metric, see GithubEntityData.activity_sources */
  @property({ attribute: false }) public sources: Partial<
    Record<ActivityMetricKey, string>
  > = {};
  @property({ attribute: false }) public options: ActivityChartOptions = {};

  @state() private _days: ActivityDay[] = [];
  @state() private _loadState: LoadState = "loading";

  private _requestKey?: string;

  protected willUpdate(changed: PropertyValues<this>): void {
    if (
      changed.has("hass") ||
      changed.has("sources") ||
      changed.has("options")
    ) {
      this._refresh();
    }
  }

  private _resolved(): ResolvedActivityOptions {
    return resolveActivityOptions(this.options);
  }

  private _refresh(): void {
    const hass = this.hass;
    if (!hass) return;
    const { range, metrics } = this._resolved();
    const entityIds = metrics
      .map((m) => this.sources[m])
      .filter((id): id is string => !!id);

    if (entityIds.length === 0) {
      this._requestKey = undefined;
      this._loadState = "no-sources";
      return;
    }

    const now = new Date();
    const key = `${metrics.join(",")}#${activityRequestKey(hass, entityIds, range, now)}`;
    if (key === this._requestKey) return;
    this._requestKey = key;
    if (this._loadState !== "ready") this._loadState = "loading";

    fetchActivityHistory(hass, entityIds, range, now)
      .then((history) => {
        if (key !== this._requestKey) return;
        this._days = computeDailyActivity(
          mergeLiveStates(history, hass.states, entityIds),
          this.sources,
          metrics,
          range,
          now,
        );
        this._loadState = "ready";
      })
      .catch(() => {
        if (key !== this._requestKey) return;
        this._loadState = "error";
      });
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  protected render() {
    const { range, metrics } = this._resolved();
    const visibleMetrics = metrics.filter((m) => this.sources[m]);
    const rangeLabel = ACTIVITY_RANGES[range].label;

    return html`
      <div class="activity">
        <div class="activity-header">
          <span class="activity-title">Activity · ${rangeLabel}</span>
          ${this._loadState === "ready"
            ? this._renderLegend(visibleMetrics)
            : nothing}
        </div>
        ${this._renderBody(visibleMetrics)}
      </div>
    `;
  }

  private _renderBody(metrics: ActivityMetricKey[]) {
    switch (this._loadState) {
      case "no-sources":
        return html`<div class="activity-message">
          No activity sensors found for this repository.
        </div>`;
      case "error":
        return html`<div class="activity-message">
          Activity history unavailable.
        </div>`;
      case "loading":
        return html`<div class="activity-message">Loading activity…</div>`;
      case "ready":
        return this._renderChart(metrics);
    }
  }

  private _renderLegend(metrics: ActivityMetricKey[]) {
    return html`
      <div class="legend">
        ${metrics.map((m) => {
          const total = this._days.reduce((sum, d) => sum + d.counts[m], 0);
          const def = ACTIVITY_METRICS[m];
          return html`
            <span class="legend-item" title="${total} ${def.label}">
              <span class="legend-dot" style="background:${def.color}"></span>
              ${def.label}
              <span class="legend-count">${total}</span>
            </span>
          `;
        })}
      </div>
    `;
  }

  /** One renderer per chart type; the Record type enforces completeness. */
  private readonly _chartRenderers: Record<
    ActivityChartType,
    (metrics: ActivityMetricKey[]) => TemplateResult
  > = {
    line: (metrics) => this._renderLine(metrics),
    bar: (metrics) => this._renderBars(metrics),
  };

  private _renderChart(metrics: ActivityMetricKey[]) {
    const { chartType } = this._resolved();
    const isEmpty = this._days.every((d) => d.total === 0);
    return html`
      <div class="chart" role="img" aria-label="${this._ariaSummary(metrics)}">
        <div class="plot">
          ${this._chartRenderers[chartType](metrics)}
          ${isEmpty
            ? html`<div class="chart-empty">No activity in this period</div>`
            : nothing}
        </div>
        ${this._renderAxis()}
      </div>
    `;
  }

  private _columnsStyle(): string {
    return `grid-template-columns: repeat(${this._days.length}, 1fr)`;
  }

  private _renderAxis() {
    const labelStep = Math.ceil(this._days.length / MAX_AXIS_LABELS);
    const lastIdx = this._days.length - 1;
    return html`
      <div class="axis" style="${this._columnsStyle()}">
        ${this._days.map(
          (day, i) => html`
            <span class="day-label">
              ${(lastIdx - i) % labelStep === 0
                ? this._formatDay(day.date)
                : ""}
            </span>
          `,
        )}
      </div>
    `;
  }

  private _renderBars(metrics: ActivityMetricKey[]) {
    const max = Math.max(0, ...this._days.map((d) => d.total));
    return html`
      <div class="bars" style="${this._columnsStyle()}">
        ${this._days.map(
          (day) => html`
            <div class="bar" title="${this._dayTooltip(day, metrics)}">
              ${metrics.map((m) =>
                day.counts[m] > 0
                  ? html`<div
                      class="segment"
                      style="height:${(day.counts[m] / max) *
                      100}%;background:${ACTIVITY_METRICS[m].color}"
                    ></div>`
                  : nothing,
              )}
            </div>
          `,
        )}
      </div>
    `;
  }

  private _renderLine(metrics: ActivityMetricKey[]) {
    const max = Math.max(
      0,
      ...this._days.flatMap((d) => metrics.map((m) => d.counts[m])),
    );
    const count = this._days.length;
    // Points sit in the middle of each day column so they align with the axis
    const x = (i: number) => ((i + 0.5) / count) * 100;
    const y = (value: number) =>
      100 -
      LINE_PLOT_PADDING -
      (max > 0 ? (value / max) * (100 - 2 * LINE_PLOT_PADDING) : 0);
    // Draw the first metric last so it stays on top when lines overlap
    const drawOrder = [...metrics].reverse();

    return html`
      <svg
        class="lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line class="baseline" x1="0" x2="100" y1="${y(0)}" y2="${y(0)}" />
        ${max > 0
          ? svg`<line class="gridline" x1="0" x2="100" y1="${y(max)}" y2="${y(max)}" />`
          : nothing}
        ${drawOrder.map(
          (m) => svg`
            <polyline
              class="series"
              stroke="${ACTIVITY_METRICS[m].color}"
              points="${this._days
                .map((d, i) => `${x(i)},${y(d.counts[m])}`)
                .join(" ")}"
            />
          `,
        )}
      </svg>
      ${drawOrder.map((m) =>
        this._days.map((d, i) =>
          d.counts[m] > 0
            ? html`<span
                class="point"
                style="left:${x(i)}%;top:${y(
                  d.counts[m],
                )}%;background:${ACTIVITY_METRICS[m].color}"
              ></span>`
            : nothing,
        ),
      )}
      ${max > 0
        ? html`<span class="y-max" style="top:${y(max)}%">${max}</span>`
        : nothing}
      <div class="hover-columns" style="${this._columnsStyle()}">
        ${this._days.map(
          (day) =>
            html`<div
              class="hover-column"
              title="${this._dayTooltip(day, metrics)}"
            ></div>`,
        )}
      </div>
    `;
  }

  private _formatDay(date: Date): string {
    const locale = this.hass?.language;
    return this._days.length <= MAX_DAYS_WITH_WEEKDAY_LABELS
      ? date.toLocaleDateString(locale, { weekday: "short" })
      : date.toLocaleDateString(locale, { day: "numeric", month: "numeric" });
  }

  private _dayTooltip(day: ActivityDay, metrics: ActivityMetricKey[]): string {
    const date = day.date.toLocaleDateString(this.hass?.language, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const parts = metrics.map(
      (m) => `${day.counts[m]} ${ACTIVITY_METRICS[m].label}`,
    );
    return `${date}: ${parts.join(", ")}`;
  }

  private _ariaSummary(metrics: ActivityMetricKey[]): string {
    const totals = metrics.map((m) => {
      const total = this._days.reduce((sum, d) => sum + d.counts[m], 0);
      return `${total} ${ACTIVITY_METRICS[m].label}`;
    });
    return `Activity: ${totals.join(", ")}`;
  }

  // ------------------------------------------------------------------
  // Styles
  // ------------------------------------------------------------------

  static styles = css`
    :host {
      display: block;
      --gh-activity-chart-height: 64px;
    }

    .activity {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .activity-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 4px 12px;
    }

    .activity-title {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color, #586069);
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 10px;
    }

    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.72rem;
      color: var(--secondary-text-color, #586069);
    }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
    }

    .legend-count {
      font-weight: 700;
      color: var(--primary-text-color, #24292e);
    }

    .chart {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .plot {
      position: relative;
      height: var(--gh-activity-chart-height);
    }

    .bars,
    .axis,
    .hover-columns {
      display: grid;
      gap: 4px;
    }

    .bars {
      height: 100%;
    }

    .bar {
      display: flex;
      flex-direction: column-reverse;
      min-width: 0;
      border-radius: 3px;
      overflow: hidden;
      background: color-mix(
        in srgb,
        var(--primary-text-color, #24292e) 5%,
        transparent
      );
    }

    .segment {
      width: 100%;
      flex-shrink: 0;
    }

    .lines {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .baseline,
    .gridline {
      stroke: var(--divider-color, rgba(0, 0, 0, 0.12));
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .gridline {
      stroke-dasharray: 3 3;
    }

    .series {
      fill: none;
      stroke-width: 2;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }

    .point {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 0 1.5px var(--card-background-color, #fff);
      pointer-events: none;
    }

    .y-max {
      position: absolute;
      left: 0;
      transform: translateY(-120%);
      font-size: 0.62rem;
      line-height: 1;
      color: var(--secondary-text-color, #586069);
      pointer-events: none;
    }

    .hover-columns {
      position: absolute;
      inset: 0;
    }

    .hover-column {
      border-radius: 3px;
    }

    .hover-column:hover {
      background: color-mix(
        in srgb,
        var(--primary-text-color, #24292e) 6%,
        transparent
      );
    }

    .day-label {
      font-size: 0.68rem;
      text-align: center;
      color: var(--secondary-text-color, #586069);
      white-space: nowrap;
      overflow: hidden;
      min-height: 1em;
    }

    .chart-empty {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-style: italic;
      color: var(--secondary-text-color, #586069);
      pointer-events: none;
    }

    .activity-message {
      font-size: 0.78rem;
      font-style: italic;
      color: var(--secondary-text-color, #586069);
      padding: 8px 0;
    }
  `;
}
