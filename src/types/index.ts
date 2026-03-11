// Home Assistant Entity / Device Registry
export interface EntityRegistryEntry {
  entity_id: string;
  unique_id?: string;
  platform?: string;
  device_id?: string | null;
  area_id?: string | null;
  translation_key?: string | null;
  name?: string | null; // user-set name
  original_name?: string | null;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string;
  name_by_user?: string;
  manufacturer?: string;
  model?: string;
  configuration_url?: string;
}

// Home Assistant Core Types
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  /** Entity registry — available in HA 2022.4+ */
  entities?: Record<string, EntityRegistryEntry>;
  /** Device registry — available in HA 2022.4+ */
  devices?: Record<string, DeviceRegistryEntry>;
  services: Record<string, Record<string, HassService>>;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ) => Promise<void>;
  connection: {
    subscribeEvents: (
      callback: (event: HassEvent) => void,
      eventType: string,
    ) => Promise<() => void>;
  };
  language: string;
  localize: (key: string, ...args: unknown[]) => string;
  themes: Record<string, unknown>;
  selectedTheme: string | null;
  user?: {
    name: string;
    is_admin: boolean;
  };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id?: string;
    user_id?: string;
  };
}

export interface HassService {
  description?: string;
  fields?: Record<string, HassServiceField>;
}

export interface HassServiceField {
  description?: string;
  required?: boolean;
  default?: unknown;
  selector?: Record<string, unknown>;
}

export interface HassEvent {
  event_type: string;
  data: Record<string, unknown>;
  origin: string;
  time_fired: string;
}

// Configurable slot keys for card rows
export type SlotKey =
  | "stars"
  | "forks"
  | "watchers"
  | "issues"
  | "pull_requests"
  | "last_commit"
  | "last_release"
  | "none";

/** A single conditional color rule for a numeric slot */
export interface SlotColorRule {
  /** Comparison operator */
  op: ">" | ">=" | "<" | "<=" | "==";
  /** Threshold value to compare against */
  value: number;
  /** CSS color string, e.g. '#f44336' or 'var(--error-color)' */
  color: string;
  /** Whether to color the text or the cell background. Default: "text" */
  type?: "text" | "background";
}

// GitHub Card Configuration
export interface GithubCardConfig {
  type: string;
  title?: string;
  /** List of entity_ids from the GitHub integration (domain: github) */
  entities: string[];
  /** Show owner avatar in the repo header */
  show_avatar?: boolean;
  /** Show the card-level header bar (title + GitHub icon) */
  show_header?: boolean;
  /** Show the GitHub icon in the card header */
  show_header_icon?: boolean;
  /** Use compact layout */
  compact?: boolean;
  /** Configurable stat rows — up to 5 rows, each with 1–3 slot columns */
  rows?: SlotKey[][];
  /** @deprecated Use `rows` instead */
  row2_slots?: [SlotKey, SlotKey, SlotKey];
  /** @deprecated Use `rows` instead */
  row3_slots?: [SlotKey, SlotKey];
  /** Per-slot icon override (e.g. { stars: 'mdi:star-outline' }) */
  icons?: Partial<Record<SlotKey, string>>;
  /** Per-slot conditional color rules — first matching rule wins */
  slot_colors?: Partial<Record<SlotKey, SlotColorRule[]>>;
}

// GitHub Entity Attributes (as provided by HA GitHub integration)
export interface GithubRepoAttributes {
  // Repository metadata
  full_name?: string;
  description?: string;
  homepage?: string;
  html_url?: string;
  private?: boolean;
  fork?: boolean;
  archived?: boolean;
  language?: string;
  topics?: string[];

  // Stats
  stargazers_count?: number;
  forks_count?: number;
  watchers_count?: number;
  open_issues_count?: number;
  size?: number;
  default_branch?: string;

  // Latest release
  latest_release_tag?: string;
  latest_release_url?: string;
  latest_release_published_at?: string;

  // Latest commit
  latest_commit_message?: string;
  latest_commit_sha?: string;
  latest_commit_url?: string;
  latest_commit_authored_at?: string;
  latest_commit_author_login?: string;
  latest_commit_author_avatar?: string;

  // Open pull requests count
  open_pull_requests_count?: number;

  // Owner info
  owner_login?: string;
  owner_avatar?: string;
  owner_url?: string;

  // Timestamps
  pushed_at?: string;
  updated_at?: string;
  created_at?: string;
}

export type GithubEntityAttributes = GithubRepoAttributes;

// Parsed entity with resolved attributes
export interface GithubEntityData {
  entity_id: string;
  state: string;
  friendly_name: string;
  attributes: GithubEntityAttributes;
  /** Icons discovered from sensor entity attributes (mdi:xxx strings) */
  slot_icons: Partial<Record<SlotKey, string>>;
}

// Lovelace Card Editor stub
export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: GithubCardConfig): void;
}
