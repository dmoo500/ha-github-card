import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import type {
  ActivityChartOptions,
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
        return this._renderBars(metrics);
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

  private _renderBars(metrics: ActivityMetricKey[]) {
    const max = Math.max(0, ...this._days.map((d) => d.total));
    const labelStep = Math.ceil(this._days.length / MAX_AXIS_LABELS);
    const lastIdx = this._days.length - 1;

    return html`
      <div
        class="chart"
        role="img"
        aria-label="${this._ariaSummary(metrics)}"
        style="grid-template-columns: repeat(${this._days.length}, 1fr)"
      >
        ${this._days.map(
          (day, i) => html`
            <div class="day" title="${this._dayTooltip(day, metrics)}">
              <div class="bar">
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
              <span class="day-label">
                ${(lastIdx - i) % labelStep === 0
                  ? this._formatDay(day.date)
                  : ""}
              </span>
            </div>
          `,
        )}
        ${max === 0
          ? html`<div class="chart-empty">No activity in this period</div>`
          : nothing}
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
      --gh-activity-bar-height: 64px;
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
      position: relative;
      display: grid;
      gap: 4px;
    }

    .day {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
      min-width: 0;
    }

    .bar {
      height: var(--gh-activity-bar-height);
      display: flex;
      flex-direction: column-reverse;
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
      inset: 0 0 1.2em 0;
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
