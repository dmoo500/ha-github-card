import type {
  ActivityChartOptions,
  ActivityMetricKey,
  ActivityRangeKey,
  HassEntity,
  HomeAssistant,
} from "../types/index.js";

// ------------------------------------------------------------------
// Registries — extend these (plus the matching type unions) to add
// new metrics or time ranges. No other code changes are required.
// ------------------------------------------------------------------

export interface ActivityMetricDefinition {
  label: string;
  icon: string;
  /** CSS color, overridable via the referenced custom property */
  color: string;
  /** translation_key of the HA GitHub "latest ..." sensor */
  translationKey: string;
  /** State attribute that uniquely identifies an event */
  identityAttribute: string;
  /**
   * "increasing": a new event has a higher identity (issue/PR numbers), so
   *   e.g. closing the newest issue does not count as activity.
   * "distinct": every previously unseen identity is a new event (commit SHAs).
   */
  identityMode: "increasing" | "distinct";
}

export const ACTIVITY_METRICS: Record<
  ActivityMetricKey,
  ActivityMetricDefinition
> = {
  commits: {
    label: "Commits",
    icon: "mdi:source-commit",
    color: "var(--gh-activity-commits-color, #2da44e)",
    translationKey: "latest_commit",
    identityAttribute: "sha",
    identityMode: "distinct",
  },
  pull_requests: {
    label: "Pull Requests",
    icon: "mdi:source-pull",
    color: "var(--gh-activity-pull-requests-color, #8250df)",
    translationKey: "latest_pull_request",
    identityAttribute: "number",
    identityMode: "increasing",
  },
  issues: {
    label: "Issues",
    icon: "mdi:alert-circle-outline",
    color: "var(--gh-activity-issues-color, #d4a72c)",
    translationKey: "latest_issue",
    identityAttribute: "number",
    identityMode: "increasing",
  },
  discussions: {
    label: "Discussions",
    icon: "mdi:forum-outline",
    color: "var(--gh-activity-discussions-color, #0969da)",
    translationKey: "latest_discussion",
    identityAttribute: "number",
    identityMode: "increasing",
  },
};

export const ACTIVITY_METRIC_KEYS = Object.keys(
  ACTIVITY_METRICS,
) as ActivityMetricKey[];

export const DEFAULT_ACTIVITY_METRICS: ActivityMetricKey[] = [
  "commits",
  "pull_requests",
  "issues",
];

export interface ActivityRangeDefinition {
  label: string;
  days: number;
}

export const ACTIVITY_RANGES: Record<
  ActivityRangeKey,
  ActivityRangeDefinition
> = {
  "7d": { label: "Last 7 days", days: 7 },
};

export const ACTIVITY_RANGE_KEYS = Object.keys(
  ACTIVITY_RANGES,
) as ActivityRangeKey[];

export const DEFAULT_ACTIVITY_RANGE: ActivityRangeKey = "7d";

// ------------------------------------------------------------------
// Options & sensor detection
// ------------------------------------------------------------------

export interface ResolvedActivityOptions {
  range: ActivityRangeKey;
  metrics: ActivityMetricKey[];
}

/** Validates user config and applies defaults (unknown values are ignored). */
export function resolveActivityOptions(
  options: ActivityChartOptions,
): ResolvedActivityOptions {
  const range =
    options.activity_range && options.activity_range in ACTIVITY_RANGES
      ? options.activity_range
      : DEFAULT_ACTIVITY_RANGE;
  const metrics = ACTIVITY_METRIC_KEYS.filter((key) =>
    options.activity_metrics?.includes(key),
  );
  return {
    range,
    metrics: metrics.length > 0 ? metrics : [...DEFAULT_ACTIVITY_METRICS],
  };
}

/** Detects which activity metric a sensor provides (translation_key first, entity_id suffix as fallback). */
export function detectActivityMetric(
  translationKey: string | null | undefined,
  entityId: string,
): ActivityMetricKey | null {
  const eid = entityId.toLowerCase();
  for (const key of ACTIVITY_METRIC_KEYS) {
    const def = ACTIVITY_METRICS[key];
    if (translationKey === def.translationKey) return key;
  }
  for (const key of ACTIVITY_METRIC_KEYS) {
    if (eid.endsWith(`_${ACTIVITY_METRICS[key].translationKey}`)) return key;
  }
  return null;
}

// ------------------------------------------------------------------
// Time window
// ------------------------------------------------------------------

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function localDateKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

/** Local day starts covering the range, oldest first, ending with today. */
export function getActivityDays(range: ActivityRangeKey, now: Date): Date[] {
  const { days } = ACTIVITY_RANGES[range];
  const today = startOfLocalDay(now);
  return Array.from({ length: days }, (_, i) => addDays(today, i - (days - 1)));
}

// ------------------------------------------------------------------
// History processing
// ------------------------------------------------------------------

/** State entry in the compressed format of history/history_during_period */
export interface HistoryStateEntry {
  /** state */
  s: string;
  /** attributes */
  a?: Record<string, unknown>;
  /** last_updated (seconds since epoch) */
  lu: number;
}

export type HistoryResponse = Record<string, HistoryStateEntry[]>;

export interface ActivityDay {
  date: Date;
  counts: Record<ActivityMetricKey, number>;
  total: number;
}

const INVALID_STATES = new Set(["unavailable", "unknown", ""]);

/**
 * Returns timestamps (ms) of new events in a sensor history. The first valid
 * entry is the baseline (state at window start) and is never counted.
 */
export function extractEventTimestamps(
  entries: HistoryStateEntry[],
  metric: ActivityMetricDefinition,
): number[] {
  const sorted = [...entries].sort((x, y) => x.lu - y.lu);
  const seen = new Set<string>();
  let maxNumeric = -Infinity;
  let hasBaseline = false;
  const events: number[] = [];

  for (const entry of sorted) {
    if (INVALID_STATES.has(entry.s)) continue;
    const attr = entry.a?.[metric.identityAttribute];
    // Without attributes (e.g. excluded from recorder) the state is the best identity
    const identity =
      attr !== undefined && attr !== null ? String(attr) : entry.s;
    const numeric = attr !== undefined && attr !== null ? Number(attr) : NaN;
    const useNumeric =
      metric.identityMode === "increasing" && Number.isFinite(numeric);

    const isNew = useNumeric ? numeric > maxNumeric : !seen.has(identity);
    if (hasBaseline && isNew) events.push(entry.lu * 1000);

    hasBaseline = true;
    seen.add(identity);
    if (Number.isFinite(numeric)) maxNumeric = Math.max(maxNumeric, numeric);
  }
  return events;
}

/**
 * Appends the live state when it is newer than the recorded history,
 * because the recorder commits with a delay.
 */
export function mergeLiveStates(
  history: HistoryResponse,
  states: Record<string, HassEntity>,
  entityIds: string[],
): HistoryResponse {
  const merged: HistoryResponse = { ...history };
  for (const id of entityIds) {
    const live = states[id];
    if (!live) continue;
    const entries = merged[id] ?? [];
    const lu = Date.parse(live.last_updated) / 1000;
    const newest = entries.reduce((max, e) => Math.max(max, e.lu), -Infinity);
    if (Number.isFinite(lu) && lu > newest) {
      merged[id] = [...entries, { s: live.state, a: live.attributes, lu }];
    }
  }
  return merged;
}

/** Aggregates new events per local day for the selected metrics. */
export function computeDailyActivity(
  history: HistoryResponse,
  sources: Partial<Record<ActivityMetricKey, string>>,
  metrics: ActivityMetricKey[],
  range: ActivityRangeKey,
  now: Date,
): ActivityDay[] {
  const days = getActivityDays(range, now).map<ActivityDay>((date) => ({
    date,
    counts: Object.fromEntries(
      ACTIVITY_METRIC_KEYS.map((key) => [key, 0]),
    ) as Record<ActivityMetricKey, number>,
    total: 0,
  }));
  const indexByDay = new Map(days.map((day, i) => [localDateKey(day.date), i]));

  for (const metric of metrics) {
    const entityId = sources[metric];
    if (!entityId) continue;
    const timestamps = extractEventTimestamps(
      history[entityId] ?? [],
      ACTIVITY_METRICS[metric],
    );
    for (const ts of timestamps) {
      const idx = indexByDay.get(localDateKey(new Date(ts)));
      if (idx === undefined) continue;
      days[idx].counts[metric] += 1;
      days[idx].total += 1;
    }
  }
  return days;
}

// ------------------------------------------------------------------
// History fetching (deduplicated across all charts on a dashboard)
// ------------------------------------------------------------------

const MAX_CACHE_ENTRIES = 50;
const historyCache = new Map<string, Promise<HistoryResponse>>();

/**
 * Cache key changes whenever a source sensor updates or the day rolls over,
 * which triggers a refetch exactly when new data can exist.
 */
export function activityRequestKey(
  hass: HomeAssistant,
  entityIds: string[],
  range: ActivityRangeKey,
  now: Date,
): string {
  const parts = [...entityIds]
    .sort()
    .map((id) => `${id}@${hass.states[id]?.last_updated ?? ""}`);
  return [range, localDateKey(now), ...parts].join("|");
}

export function fetchActivityHistory(
  hass: HomeAssistant,
  entityIds: string[],
  range: ActivityRangeKey,
  now: Date,
): Promise<HistoryResponse> {
  const key = activityRequestKey(hass, entityIds, range, now);
  const cached = historyCache.get(key);
  if (cached) return cached;

  const [start] = getActivityDays(range, now);
  const request = hass
    .callWS<HistoryResponse>({
      type: "history/history_during_period",
      start_time: start.toISOString(),
      entity_ids: entityIds,
      include_start_time_state: true,
      // Attribute-only changes (e.g. same commit message, new SHA) must be kept
      significant_changes_only: false,
      minimal_response: false,
      no_attributes: false,
    })
    .catch((err: unknown) => {
      historyCache.delete(key);
      throw err;
    });

  historyCache.set(key, request);
  while (historyCache.size > MAX_CACHE_ENTRIES) {
    historyCache.delete(historyCache.keys().next().value as string);
  }
  return request;
}
