import type {
  HomeAssistant,
  GithubEntityData,
  GithubEntityAttributes,
  SlotKey,
} from "../types/index.js";

/**
 * Returns entity_ids that belong to the GitHub integration.
 * Uses the entity registry (platform === 'github') when available,
 * otherwise falls back to matching entity_ids starting with 'github.'.
 */
export function getGithubEntities(hass: HomeAssistant): string[] {
  if (hass.entities) {
    const byPlatform = Object.values(hass.entities)
      .filter((e) => e.platform === "github")
      .map((e) => e.entity_id)
      .filter((id) => id in hass.states);
    if (byPlatform.length > 0) return byPlatform;
  }
  // Fallback: match by entity_id prefix
  return Object.keys(hass.states).filter((entityId) =>
    entityId.startsWith("github."),
  );
}

/**
 * Maps metric key (from SENSOR_ATTR_MAP) to SlotKey.
 */
const METRIC_TO_SLOT: Record<string, SlotKey> = {
  stargazers_count: "stars",
  subscribers_count: "watchers",
  forks_count: "forks",
  issues_count: "issues",
  pulls_count: "pull_requests",
  latest_commit: "last_commit",
  newest_release: "last_release",
  latest_tag: "last_release",
  // legacy
  watchers_count: "watchers",
  open_issues_count: "issues",
  open_pull_requests_count: "pull_requests",
  forks: "forks",
  watchers: "watchers",
  issues: "issues",
  pull_requests: "pull_requests",
  open_pull_requests: "pull_requests",
  stars: "stars",
};

/**
 * Alternative suffix patterns for sensors that may use shorter names.
 * Maps entity_id suffix → canonical SENSOR_ATTR_MAP key.
 */
const SUFFIX_ALIAS: Record<string, string> = {
  forks: "forks_count",
  watchers: "watchers_count",
  issues: "open_issues_count",
  open_issues: "open_issues_count",
  pull_requests: "open_pull_requests_count",
  open_pull_requests: "open_pull_requests_count",
  stars: "stargazers_count",
  stargazers: "stargazers_count",
};

/**
 * Known metric suffixes used by the HA GitHub integration.
 * Used for pattern-based sibling discovery when hass.entities is unavailable.
 */
const KNOWN_SUFFIXES = [
  "stargazers_count",
  "forks_count",
  "watchers_count",
  "open_issues_count",
  "open_pull_requests_count",
  "newest_release",
  "latest_release",
  "latest_tag",
  "latest_commit",
  "last_commit",
];

/**
 * Strips a known metric suffix from an entity_id to get the device prefix.
 * e.g. 'sensor.dm_myrepo_watchers_count' → 'sensor.dm_myrepo_'
 */
function extractDevicePrefix(entityId: string): string | null {
  const lower = entityId.toLowerCase();
  for (const suffix of KNOWN_SUFFIXES) {
    if (lower.endsWith(`_${suffix}`)) {
      return entityId.slice(0, entityId.length - suffix.length - 1) + "_";
    }
  }
  return null;
}
const SENSOR_ATTR_MAP: Record<string, keyof GithubEntityAttributes> = {
  // Translation keys as used by the HA GitHub integration
  stargazers_count: "stargazers_count",
  subscribers_count: "watchers_count", // GitHub "watchers" = API "subscribers"
  forks_count: "forks_count",
  issues_count: "open_issues_count",
  pulls_count: "open_pull_requests_count",
  // Legacy / alternative names
  open_issues_count: "open_issues_count",
  open_pull_requests_count: "open_pull_requests_count",
  watchers_count: "watchers_count",
};

/**
 * Detects which metric key a sensor entity represents, using:
 * 1. translation_key from entity registry (most reliable)
 * 2. unique_id suffix
 * 3. entity_id suffix (last resort)
 */
function detectMetricKey(hass: HomeAssistant, entityId: string): string | null {
  if (hass.entities) {
    const entry = hass.entities[entityId];
    if (entry?.translation_key) return entry.translation_key;
    const uid = (entry?.unique_id ?? "").toLowerCase();
    for (const key of Object.keys(SENSOR_ATTR_MAP)) {
      if (uid.endsWith(`_${key}`) || uid === key) return key;
    }
  }
  const eid = entityId.toLowerCase();
  // Check full SENSOR_ATTR_MAP keys first (e.g. _open_pull_requests_count)
  for (const key of Object.keys(SENSOR_ATTR_MAP)) {
    if (eid.endsWith(`_${key}`)) return key;
  }
  // Check alias suffixes (e.g. _forks, _watchers, _issues)
  for (const [suffix, canonicalKey] of Object.entries(SUFFIX_ALIAS)) {
    if (eid.endsWith(`_${suffix}`)) return canonicalKey;
  }
  return null;
}

/**
 * Resolves one or more GitHub sensor entities (same device) into a single
 * GithubEntityData. Handles both integration styles:
 *
 * - Old style: single entity with all attributes (github.owner_repo)
 * - New style: individual sensor entities per metric, grouped by device_id
 *
 * Pass any entity_id belonging to the device; the function will discover
 * sibling entities via hass.entities / device_id.
 */
export function resolveGithubDevice(
  hass: HomeAssistant,
  entityId: string,
): GithubEntityData | null {
  if (!hass.states[entityId]) {
    console.warn(
      `[ha-github-card] resolveGithubDevice — entity '${entityId}' not found in hass.states`,
    );
    console.debug(
      "[ha-github-card] resolveGithubDevice — available states count:",
      Object.keys(hass.states).length,
    );
    console.debug(
      "[ha-github-card] resolveGithubDevice — hass.entities entry:",
      hass.entities?.[entityId],
    );

    // Fuzzy match: handle legacy repo-path format like 'owner/repo'
    if (entityId.includes("/")) {
      const [owner, repo] = entityId.split("/", 2);
      const sanitize = (s: string) =>
        s.toLowerCase().replace(/[^a-z0-9]/g, "_");
      const ownerPart = sanitize(owner);
      const repoPart = sanitize(repo);
      const candidates = Object.keys(hass.states).filter((id) => {
        const lower = id.toLowerCase();
        return lower.includes(ownerPart) && lower.includes(repoPart);
      });
      console.debug(
        `[ha-github-card] resolveGithubDevice — fuzzy match for '${entityId}':`,
        candidates,
      );
      if (candidates.length > 0) {
        console.info(
          `[ha-github-card] resolveGithubDevice — remapped '${entityId}' → '${candidates[0]}'`,
        );
        return resolveGithubDevice(hass, candidates[0]);
      }
    }
    return null;
  }

  const rawAttrs = hass.states[entityId].attributes as Record<string, unknown>;
  console.debug(
    `[ha-github-card] resolveGithubDevice — found '${entityId}' in hass.states, state='${hass.states[entityId].state}', attrs:`,
    rawAttrs,
  );

  // Old-style: rich attributes on single entity
  if (
    rawAttrs.stargazers_count !== undefined ||
    rawAttrs.full_name !== undefined
  ) {
    return {
      entity_id: entityId,
      state: hass.states[entityId].state,
      friendly_name: (rawAttrs.friendly_name as string) ?? entityId,
      attributes: rawAttrs as GithubEntityAttributes,
      slot_icons: {},
    };
  }

  // New-style: aggregate individual sensor entities by device
  const regEntry = hass.entities?.[entityId];
  const deviceId = regEntry?.device_id ?? null;
  console.debug(
    `[ha-github-card] resolveGithubDevice — new-style path. regEntry:`,
    regEntry,
    "| deviceId:",
    deviceId,
  );

  const deviceEntityIds: string[] =
    deviceId && hass.entities
      ? Object.values(hass.entities)
          .filter((e) => e.device_id === deviceId)
          .map((e) => e.entity_id)
          .filter((id) => id in hass.states)
      : (() => {
          // Fallback: pattern-based sibling discovery via shared entity_id prefix
          const prefix = extractDevicePrefix(entityId);
          console.debug(
            `[ha-github-card] resolveGithubDevice — no device registry, using prefix fallback: '${prefix}'`,
          );
          if (prefix) {
            const siblings = Object.keys(hass.states).filter((id) =>
              id.toLowerCase().startsWith(prefix.toLowerCase()),
            );
            if (siblings.length > 1) return siblings;
          }
          return [entityId];
        })();
  console.debug(
    `[ha-github-card] resolveGithubDevice — sibling entity IDs:`,
    deviceEntityIds,
  );

  const combined: GithubEntityAttributes = {};
  const slot_icons: Partial<Record<SlotKey, string>> = {};

  for (const eid of deviceEntityIds) {
    const st = hass.states[eid];
    if (!st) continue;
    const attrs = st.attributes as Record<string, unknown>;

    // Numeric metric via SENSOR_ATTR_MAP
    const metricKey = detectMetricKey(hass, eid);
    if (metricKey && metricKey in SENSOR_ATTR_MAP) {
      const attrField = SENSOR_ATTR_MAP[metricKey];
      const numVal = parseFloat(st.state);
      const value = isNaN(numVal) ? undefined : numVal;
      console.debug(
        `[ha-github-card]   ${eid} → metricKey='${metricKey}' → attr='${attrField}' state='${st.state}' value=${value}`,
      );
      if (value !== undefined) {
        (combined as Record<string, unknown>)[attrField] = value;
      }
      // collect HA icon for this slot
      const slotKey = METRIC_TO_SLOT[metricKey];
      if (slotKey && attrs.icon) slot_icons[slotKey] = attrs.icon as string;
    } else {
      console.debug(
        `[ha-github-card]   ${eid} → metricKey=${metricKey ?? "null"} (no SENSOR_ATTR_MAP match) state='${st.state}' attrs:`,
        Object.keys(attrs),
      );
    }

    // Commit sensor: translation_key='latest_commit', entity may have state=message and SHA in attrs
    if (eid.toLowerCase().includes("commit") || metricKey === "latest_commit") {
      if (attrs.sha) combined.latest_commit_sha = attrs.sha as string;
      if (attrs.url) combined.latest_commit_url = attrs.url as string;
      if (attrs.authored_at)
        combined.latest_commit_authored_at = attrs.authored_at as string;
      if (attrs.message)
        combined.latest_commit_message = attrs.message as string;
      if (!combined.latest_commit_sha && st.state && st.state !== "unavailable")
        combined.latest_commit_sha = st.state;
      if (attrs.icon) slot_icons["last_commit"] = attrs.icon as string;
    }

    // Release / tag sensor (newest_release, latest_release, latest_tag)
    if (
      eid.toLowerCase().includes("release") ||
      eid.toLowerCase().includes("_tag") ||
      metricKey === "latest_tag"
    ) {
      // state IS the tag name in modern HA GitHub integration
      if (attrs.tag) combined.latest_release_tag = attrs.tag as string;
      if (
        !combined.latest_release_tag &&
        st.state &&
        st.state !== "unavailable" &&
        st.state !== "unknown"
      )
        combined.latest_release_tag = st.state;
    }

    // Repo URL / full_name may appear as an attribute on any sensor.
    // Only accept html_url as the repo root (not commit/release/tree sub-paths).
    if (attrs.html_url) {
      const u = attrs.html_url as string;
      if (!/\/(commit|releases|tree|blob|pull|issues)\//.test(u)) {
        combined.html_url = u;
      }
    }
    if (attrs.full_name) combined.full_name = attrs.full_name as string;
    if (attrs.language) combined.language = attrs.language as string;
    if (attrs.owner_avatar)
      combined.owner_avatar = attrs.owner_avatar as string;
    if (attrs.owner_login) combined.owner_login = attrs.owner_login as string;
  }

  console.debug(
    "[ha-github-card] resolveGithubDevice — combined attrs:",
    JSON.stringify(combined),
  );
  console.debug(
    "[ha-github-card] resolveGithubDevice — slot_icons:",
    slot_icons,
  );

  // Friendly name: prefer device registry name, then strip metric suffix from entity
  let friendlyName = entityId;
  if (deviceId && hass.devices?.[deviceId]) {
    const dev = hass.devices[deviceId];
    friendlyName = dev.name_by_user ?? dev.name ?? entityId;
    if (!combined.html_url && dev.configuration_url) {
      combined.html_url = dev.configuration_url;
    }
    if (!combined.full_name && dev.name) {
      combined.full_name = dev.name;
    }
  } else {
    const fn = (rawAttrs.friendly_name as string) ?? entityId;
    // Strip trailing metric name (e.g. "dm/repo Watchers" → "dm/repo")
    friendlyName =
      fn
        .replace(
          /\s+(Stargazers.*|Forks.*|Watchers.*|Issues.*|Pull Requests.*|Commits?.*|Releases?.*)$/i,
          "",
        )
        .trim() || entityId;
  }

  // Construct release URL from repo base + tag — done after device registry so html_url is populated.
  if (combined.latest_release_tag && combined.html_url) {
    const base = combined.html_url.replace(/\/$/, "");
    combined.latest_release_url = `${base}/releases/tag/${encodeURIComponent(combined.latest_release_tag)}`;
  }

  return {
    entity_id: entityId,
    state: hass.states[entityId].state,
    friendly_name: friendlyName,
    attributes: combined,
    slot_icons,
  };
}

/**
 * Resolves an entity_id from hass.states into a typed GithubEntityData object.
 * Use resolveGithubDevice for modern sensor-based integrations.
 */
export function resolveGithubEntity(
  hass: HomeAssistant,
  entityId: string,
): GithubEntityData | null {
  return resolveGithubDevice(hass, entityId);
}

/**
 * Formats a UTC date string to a short locale string.
 */
export function formatDate(dateStr?: string): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Formats a large number with k/M suffixes.
 */
export function formatCount(count?: number): string {
  if (count === undefined || count === null) return "—";
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;
  return String(count);
}
