import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type {
  GithubActivityCardConfig,
  HomeAssistant,
} from "../types/index.js";
import { getGithubEntities } from "../utils/github.js";
import { editorBaseStyles } from "./editor-styles.js";
import {
  activityOptionsEditorStyles,
  renderActivityOptionsEditor,
} from "./activity-options-editor.js";

/** Visual editor for ha-github-activity-card. */
export class GithubActivityCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GithubActivityCardConfig;

  setConfig(config: GithubActivityCardConfig): void {
    this._config = { ...config };
  }

  private _update(patch: Partial<GithubActivityCardConfig>): void {
    if (!this._config) return;
    const config = { ...this._config, ...patch };
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    if (!this._config) return nothing;
    const cfg = this._config;
    const githubEntities = this.hass ? getGithubEntities(this.hass) : [];

    return html`
      <div class="field-group">
        <label class="field-label" for="activity-entity">
          GitHub Repository Entity
        </label>
        <input
          id="activity-entity"
          type="text"
          class="text-input"
          list="activity-entity-list"
          placeholder="sensor.myrepo_latest_commit"
          .value="${cfg.entity ?? ""}"
          @change="${(e: Event) =>
            this._update({
              entity: (e.target as HTMLInputElement).value.trim(),
            })}"
        />
        <datalist id="activity-entity-list">
          ${githubEntities.map((id) => html`<option value="${id}"></option>`)}
        </datalist>
        <p class="hint">
          Any sensor of the repository device works — the activity sensors are
          discovered automatically.
        </p>
      </div>

      <div class="field-group">
        <label class="field-label" for="activity-title">Card Title</label>
        <input
          id="activity-title"
          type="text"
          class="text-input"
          placeholder="Repository name"
          .value="${cfg.title ?? ""}"
          @change="${(e: Event) =>
            this._update({
              title: (e.target as HTMLInputElement).value || undefined,
            })}"
        />
      </div>

      <div class="section-label">Activity Chart</div>
      ${renderActivityOptionsEditor(cfg, (patch) => this._update(patch))}

      <div class="section-label">Visual Options</div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${cfg.show_header !== false}"
          @change="${(e: Event) =>
            this._update({
              show_header: (e.target as HTMLInputElement).checked,
            })}"
        />
        Show Card Header (title bar)
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${cfg.show_header_icon !== false}"
          @change="${(e: Event) =>
            this._update({
              show_header_icon: (e.target as HTMLInputElement).checked,
            })}"
        />
        Show GitHub Icon in Header
      </label>
    `;
  }

  static styles = [editorBaseStyles, activityOptionsEditorStyles];
}
