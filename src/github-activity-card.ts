import { LitElement, html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import type { GithubActivityCardConfig, HomeAssistant } from "./types/index.js";
import { getGithubEntities, resolveGithubDevice } from "./utils/github.js";
import {
  DEFAULT_ACTIVITY_METRICS,
  DEFAULT_ACTIVITY_RANGE,
} from "./utils/activity.js";
import {
  cardHeaderStyles,
  renderCardHeader,
} from "./components/card-header.js";

/** Standalone activity chart card for a single GitHub repository. */
export class GithubActivityCard extends LitElement {
  private _hass!: HomeAssistant;

  public get hass(): HomeAssistant {
    return this._hass;
  }

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.requestUpdate();
  }

  @state() private _config!: GithubActivityCardConfig;

  // ------------------------------------------------------------------
  // Lovelace API
  // ------------------------------------------------------------------

  static getConfigElement() {
    return document.createElement("ha-github-activity-card-editor");
  }

  static getStubConfig(hass?: HomeAssistant): GithubActivityCardConfig {
    return {
      type: "custom:ha-github-activity-card",
      entity: hass ? (getGithubEntities(hass)[0] ?? "") : "",
      show_header: true,
      show_header_icon: true,
      activity_range: DEFAULT_ACTIVITY_RANGE,
      activity_metrics: [...DEFAULT_ACTIVITY_METRICS],
    };
  }

  setConfig(config: GithubActivityCardConfig): void {
    if (typeof config.entity !== "string") {
      throw new Error('ha-github-activity-card: "entity" must be a string');
    }
    this._config = { ...config, entity: config.entity.trim() };
  }

  getCardSize(): number {
    return 3;
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  render() {
    if (!this._config || !this.hass) return nothing;

    const repo = this._config.entity
      ? resolveGithubDevice(this.hass, this._config.entity)
      : null;
    const title =
      this._config.title ||
      repo?.attributes.full_name ||
      repo?.friendly_name ||
      "GitHub Activity";

    return html`
      <ha-card>
        ${renderCardHeader({ ...this._config, title })}
        <div class="card-content">
          ${
            repo
              ? html`<ha-github-activity-chart
                  .hass="${this.hass}"
                  .sources="${repo.activity_sources}"
                  .options="${this._config}"
                ></ha-github-activity-chart>`
              : html`<div class="empty">
                  ${
                    this._config.entity
                      ? `Entity "${this._config.entity}" not found.`
                      : "No GitHub entity configured."
                  }
                </div>`
          }
        </div>
      </ha-card>
    `;
  }

  static styles = [
    cardHeaderStyles,
    css`
      ha-card {
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
      }

      .card-content {
        padding: 12px 16px 14px;
      }

      .empty {
        color: var(--secondary-text-color, #586069);
        padding: 16px;
        text-align: center;
        font-style: italic;
      }
    `,
  ];
}
