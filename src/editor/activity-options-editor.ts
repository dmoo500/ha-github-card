import { html, css } from "lit";
import type {
  ActivityChartOptions,
  ActivityChartType,
  ActivityMetricKey,
  ActivityRangeKey,
} from "../types/index.js";
import {
  ACTIVITY_CHART_TYPES,
  ACTIVITY_CHART_TYPE_KEYS,
  ACTIVITY_METRICS,
  ACTIVITY_METRIC_KEYS,
  ACTIVITY_RANGES,
  ACTIVITY_RANGE_KEYS,
  resolveActivityOptions,
} from "../utils/activity.js";

/**
 * Editor controls for the activity chart options, shared by all editors.
 * Ranges and metrics are rendered from the registries, so new entries
 * appear here automatically.
 */
export function renderActivityOptionsEditor(
  options: ActivityChartOptions,
  onChange: (patch: ActivityChartOptions) => void,
) {
  const { range, metrics, chartType } = resolveActivityOptions(options);

  const toggleMetric = (key: ActivityMetricKey, enabled: boolean) => {
    const next = enabled ? [...metrics, key] : metrics.filter((m) => m !== key);
    // Keep the registry order and at least one metric
    const ordered = ACTIVITY_METRIC_KEYS.filter((m) => next.includes(m));
    if (ordered.length > 0) onChange({ activity_metrics: ordered });
  };

  return html`
    <div class="field-group">
      <label class="field-label" for="activity-range">Time Range</label>
      <select
        id="activity-range"
        @change="${(e: Event) =>
          onChange({
            activity_range: (e.target as HTMLSelectElement)
              .value as ActivityRangeKey,
          })}"
      >
        ${ACTIVITY_RANGE_KEYS.map(
          (key) => html`
            <option value="${key}" ?selected="${key === range}">
              ${ACTIVITY_RANGES[key].label}
            </option>
          `,
        )}
      </select>
    </div>
    <div class="field-group">
      <label class="field-label" for="activity-chart-type">Chart Type</label>
      <select
        id="activity-chart-type"
        @change="${(e: Event) =>
          onChange({
            activity_chart_type: (e.target as HTMLSelectElement)
              .value as ActivityChartType,
          })}"
      >
        ${ACTIVITY_CHART_TYPE_KEYS.map(
          (key) => html`
            <option value="${key}" ?selected="${key === chartType}">
              ${ACTIVITY_CHART_TYPES[key].label}
            </option>
          `,
        )}
      </select>
    </div>
    <div class="field-group">
      <span class="field-label">Metrics</span>
      <div class="activity-metrics">
        ${ACTIVITY_METRIC_KEYS.map(
          (key) => html`
            <label class="toggle-row">
              <input
                type="checkbox"
                .checked="${metrics.includes(key)}"
                ?disabled="${metrics.length === 1 && metrics.includes(key)}"
                @change="${(e: Event) =>
                  toggleMetric(key, (e.target as HTMLInputElement).checked)}"
              />
              <span
                class="activity-metric-dot"
                style="background:${ACTIVITY_METRICS[key].color}"
              ></span>
              ${ACTIVITY_METRICS[key].label}
            </label>
          `,
        )}
      </div>
    </div>
    <p class="hint">
      Counts new commits, pull requests, issues and discussions per day from the
      recorded history of the repository's "Latest …" sensors. Only activity
      recorded by Home Assistant is shown.
    </p>
  `;
}

export const activityOptionsEditorStyles = css`
  .activity-metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px 12px;
  }
  .activity-metric-dot {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
  }
`;
