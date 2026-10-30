import { LitElement, html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import type {
  HomeAssistant,
  GithubCardConfig,
  GithubEntityData,
  SlotKey,
} from "./types/index.js";
import {
  resolveGithubDevice,
  formatDate,
  formatCount,
} from "./utils/github.js";
import {
  cardHeaderStyles,
  renderCardHeader,
} from "./components/card-header.js";

const DEFAULT_ROWS: SlotKey[][] = [
  ["watchers", "stars", "last_commit"],
  ["pull_requests", "issues"],
];

const SLOT_FALLBACK_ICONS: Record<string, string> = {
  stars: "mdi:star",
  forks: "mdi:source-fork",
  watchers: "mdi:eye",
  issues: "mdi:alert-circle-outline",
  pull_requests: "mdi:source-pull",
  last_commit: "mdi:source-commit",
  last_release: "mdi:tag",
};

export class GithubCard extends LitElement {
  private _hass!: HomeAssistant;

  public get hass(): HomeAssistant {
    return this._hass;
  }

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.requestUpdate();
  }

  @state() private _config!: GithubCardConfig;

  // ------------------------------------------------------------------
  // Lovelace API
  // ------------------------------------------------------------------

  static getConfigElement() {
    return document.createElement("ha-github-card-editor");
  }

  static getStubConfig(): GithubCardConfig {
    return {
      type: "custom:ha-github-card",
      title: "GitHub",
      entities: [],
      show_avatar: true,
      show_header: true,
      show_header_icon: true,
      compact: false,
      rows: [
        ["watchers", "stars", "last_commit"],
        ["pull_requests", "issues"],
      ],
    };
  }

  setConfig(config: GithubCardConfig): void {
    if (!config.entities || !Array.isArray(config.entities)) {
      throw new Error('ha-github-card: "entities" must be an array');
    }
    const entities = config.entities.filter(
      (e) => typeof e === "string" && e.trim() !== "",
    );
    let rows = config.rows;
    // Migrate legacy row2_slots/row3_slots to rows
    if (!rows?.length && (config.row2_slots || config.row3_slots)) {
      rows = [
        config.row2_slots ?? DEFAULT_ROWS[0],
        config.row3_slots ?? DEFAULT_ROWS[1],
      ];
    }
    this._config = {
      ...GithubCard.getStubConfig(),
      ...config,
      entities,
      rows: rows ?? DEFAULT_ROWS,
    };
  }

  getCardSize(): number {
    const perEntity = this._config?.show_activity ? 5 : 3;
    return (this._config?.entities?.length ?? 1) * perEntity + 1;
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  render() {
    if (!this._config || !this.hass) return nothing;

    const configuredIds = this._config.entities ?? [];
    const entities: GithubEntityData[] = configuredIds
      .map((id) => resolveGithubDevice(this.hass, id))
      .filter((e): e is GithubEntityData => e !== null);

    return html`
      <ha-card>
        ${renderCardHeader(this._config)}
        <div class="card-content ${this._config.compact ? "compact" : ""}">
          ${
            entities.length === 0
              ? html`<div class="empty">No GitHub entities configured.</div>`
              : entities.map((e) => this._renderEntity(e))
          }
        </div>
      </ha-card>
    `;
  }

  private _getRows(): SlotKey[][] {
    if (this._config.rows?.length) return this._config.rows;
    // Migrate legacy format
    return [
      this._config.row2_slots ?? DEFAULT_ROWS[0],
      this._config.row3_slots ?? DEFAULT_ROWS[1],
    ];
  }

  private _renderEntity(entity: GithubEntityData) {
    const a = entity.attributes;
    const rows = this._getRows();

    return html`
      <div class="entity-card">
        <!-- Row 1: name (fixed left) + version (fixed right) -->
        <div class="entity-header">
          <div class="header-name">
            ${
              this._config.show_avatar && a.owner_avatar
                ? html`<img
                    class="avatar"
                    src="${a.owner_avatar}"
                    alt="${a.owner_login ?? ""}"
                    @error="${(e: Event) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}"
                  />`
                : nothing
            }
            <a
              class="repo-name"
              href="${a.html_url ?? "#"}"
              target="_blank"
              rel="noopener noreferrer"
              >${a.full_name ?? entity.entity_id}</a
            >
          </div>
          <div class="header-version">
            ${
              a.latest_release_tag
                ? html`<a
                    class="version-link"
                    href="${a.latest_release_url ?? "#"}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >${a.latest_release_tag}</a
                  >`
                : html`<span class="version-none">no release</span>`
            }
          </div>
        </div>

        <!-- Configurable rows -->
        ${rows.map((row) => {
          return row.length > 0
            ? html`
                <div
                  class="entity-row"
                  style="grid-template-columns: repeat(${row.length}, 1fr)"
                >
                  ${row.map((s) => {
                    const rule = this._matchSlotRule(s, entity);
                    const bg =
                      rule?.type === "background"
                        ? `background-color: ${rule.color}; border-radius: 4px; padding: 0 4px;`
                        : "";
                    const tc =
                      rule && rule.type !== "background" ? rule.color : "";
                    return html`
                      <div class="slot-cell" style="${bg}">
                        ${this._renderSlot(s, entity, tc)}
                      </div>
                    `;
                  })}
                </div>
              `
            : nothing;
        })}
        ${
          this._config.show_activity
            ? html`<ha-github-activity-chart
                class="entity-activity"
                .hass="${this.hass}"
                .sources="${entity.activity_sources}"
                .options="${this._config}"
              ></ha-github-activity-chart>`
            : nothing
        }
      </div>
    `;
  }

  private _matchSlotRule(key: SlotKey, entity: GithubEntityData) {
    const rules = this._config.slot_colors?.[key];
    if (!rules?.length) return null;
    const a = entity.attributes;
    const numericValue: Record<string, number | undefined> = {
      stars: a.stargazers_count,
      forks: a.forks_count,
      watchers: a.watchers_count,
      issues: a.open_issues_count,
      pull_requests: a.open_pull_requests_count,
    };
    const val = numericValue[key];
    if (val === undefined) return null;
    for (const rule of rules) {
      const ruleValue = Number(rule.value);
      const match =
        rule.op === ">"
          ? val > ruleValue
          : rule.op === ">="
            ? val >= ruleValue
            : rule.op === "<"
              ? val < ruleValue
              : rule.op === "<="
                ? val <= ruleValue
                : val === ruleValue;
      if (match) return rule;
    }
    return null;
  }

  private _slotIcon(key: SlotKey, entity: GithubEntityData) {
    const configOverride = this._config.icons?.[key];
    const sensorIcon = entity.slot_icons[key];
    const icon =
      configOverride ??
      sensorIcon ??
      SLOT_FALLBACK_ICONS[key] ??
      "mdi:help-circle-outline";
    return html`<ha-icon class="icon-sm" .icon="${icon}"></ha-icon>`;
  }

  private _renderSlot(key: SlotKey, entity: GithubEntityData, textColor = "") {
    const a = entity.attributes;
    const cs = textColor ? `color: ${textColor};` : "";
    switch (key) {
      case "stars":
        return html`
          ${this._slotIcon(key, entity)}
          <span class="slot-value" style="${cs}"
            >${formatCount(a.stargazers_count)}</span
          >
          <span class="slot-label" style="${cs}">Stars</span>
        `;
      case "forks":
        return html`
          ${this._slotIcon(key, entity)}
          <span class="slot-value" style="${cs}"
            >${formatCount(a.forks_count)}</span
          >
          <span class="slot-label" style="${cs}">Forks</span>
        `;
      case "watchers":
        return html`
          ${this._slotIcon(key, entity)}
          <span class="slot-value" style="${cs}"
            >${formatCount(a.watchers_count)}</span
          >
          <span class="slot-label" style="${cs}">Watchers</span>
        `;
      case "issues":
        return html`
          ${this._slotIcon(key, entity)}
          <span class="slot-value" style="${cs}"
            >${formatCount(a.open_issues_count)}</span
          >
          <span class="slot-label" style="${cs}">Issues</span>
        `;
      case "pull_requests":
        return html`
          ${this._slotIcon(key, entity)}
          <span class="slot-value" style="${cs}"
            >${formatCount(a.open_pull_requests_count)}</span
          >
          <span class="slot-label" style="${cs}">Pull Requests</span>
        `;
      case "last_commit":
        return a.latest_commit_sha
          ? html`
              ${this._slotIcon(key, entity)}
              <a
                class="slot-mono-link"
                href="${a.latest_commit_url ?? "#"}"
                target="_blank"
                rel="noopener noreferrer"
                title="${a.latest_commit_message}"
                >${a.latest_commit_sha.slice(0, 7)}</a
              >
              <span class="slot-label"
                >${formatDate(a.latest_commit_authored_at)}</span
              >
            `
          : html`${this._slotIcon(key, entity)}<span class="slot-value"
                >—</span
              >`;
      case "last_release":
        return html`
          ${this._slotIcon(key, entity)}
          ${
            a.latest_release_tag
              ? html`<a
                  class="slot-link"
                  href="${a.latest_release_url ?? "#"}"
                  target="_blank"
                  rel="noopener noreferrer"
                  >${a.latest_release_tag}</a
                >`
              : html`<span class="slot-value">—</span>`
          }
        `;
      default:
        return html``;
    }
  }

  // ------------------------------------------------------------------
  // Styles
  // ------------------------------------------------------------------

  static styles = [
    cardHeaderStyles,
    css`
      :host {
        --gh-accent: var(--primary-color, #0366d6);
        --gh-text: var(--primary-text-color, #24292e);
        --gh-text-sec: var(--secondary-text-color, #586069);
        --gh-border: var(--divider-color, #e1e4e8);
        --gh-bg-row1: var(--secondary-background-color, #f6f8fa);
        --gh-link: var(--primary-color, #0366d6);
      }

      ha-card {
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
      }

      /* ---- Content wrapper ---- */
      .card-content {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .card-content.compact {
        gap: 6px;
      }

      .empty {
        color: var(--gh-text-sec);
        padding: 16px;
        text-align: center;
        font-style: italic;
      }

      /* ================================================
       Entity card — table-like 3-row layout
       ================================================ */
      .entity-card {
        border: 1px solid var(--gh-border);
        border-radius: 8px;
        overflow: hidden;
      }

      /* ---- Row 1: name | version (fixed) ---- */
      .entity-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 12px;
        background: var(--gh-bg-row1);
      }

      .header-name {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        flex: 1;
      }

      .avatar {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .repo-name {
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--gh-link);
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .repo-name:hover {
        text-decoration: underline;
      }

      .header-version {
        flex-shrink: 0;
      }

      .version-link {
        font-size: 0.78rem;
        font-weight: 500;
        color: var(--gh-link);
        text-decoration: none;
        background: color-mix(in srgb, var(--gh-link) 12%, transparent);
        border-radius: 10px;
        padding: 2px 9px;
      }

      .version-link:hover {
        text-decoration: underline;
      }

      .version-none {
        font-size: 0.78rem;
        color: var(--gh-text-sec);
        opacity: 0.55;
      }

      /* ---- Rows 2 & 3: configurable grid ---- */
      .entity-row {
        display: grid; /* columns set inline via style="" */
      }

      /* ---- Slot cell ---- */
      .slot-cell {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 9px 12px;
        font-size: 0.82rem;
        color: var(--gh-text-sec);
        min-width: 0;
        overflow: hidden;
      }

      .compact .slot-cell {
        padding: 6px 10px;
      }

      .slot-cell + .slot-cell {
        /* no border between cells */
      }

      .slot-value {
        font-weight: 700;
        color: var(--gh-text);
        flex-shrink: 0;
      }

      .slot-label {
        font-size: 0.72rem;
        color: var(--gh-text-sec);
        opacity: 0.8;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .slot-link {
        font-weight: 600;
        color: var(--gh-link);
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .slot-link:hover {
        text-decoration: underline;
      }

      /* Monospace commit hash */
      .slot-mono-link {
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--gh-link);
        text-decoration: none;
        letter-spacing: 0.03em;
        flex-shrink: 0;
      }

      .slot-mono-link:hover {
        text-decoration: underline;
      }

      .slot-lang {
        font-weight: 600;
        color: var(--gh-text);
        background: color-mix(in srgb, var(--gh-accent) 14%, transparent);
        border-radius: 10px;
        padding: 1px 8px;
        font-size: 0.76rem;
      }

      /* ---- Activity chart below the table ---- */
      .entity-activity {
        padding: 10px 12px 8px;
        border-top: 1px solid var(--gh-border);
      }

      .compact .entity-activity {
        padding: 6px 10px 4px;
      }

      /* ---- Icons ---- */
      ha-icon.icon-sm {
        --mdc-icon-size: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 15px;
        height: 15px;
        flex-shrink: 0;
        opacity: 0.7;
        color: var(--state-icon-color, var(--gh-text-sec));
      }
    `,
  ];
}
