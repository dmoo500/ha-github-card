import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type {
  HomeAssistant,
  GithubCardConfig,
  SlotKey,
  SlotColorRule,
} from "../types/index.js";
import { getGithubEntities } from "../utils/github.js";

const SLOT_OPTIONS: [SlotKey, string][] = [
  ["watchers", "👁  Watchers"],
  ["stars", "⭐ Stars"],
  ["forks", "🍴 Forks"],
  ["issues", "🐛 Issues"],
  ["pull_requests", "🔀 Pull Requests"],
  ["last_commit", "🔗 Last Commit"],
  ["last_release", "🏷  Latest Release"],
  ["none", "— None —"],
];

/**
 * Visual editor for ha-github-card.
 * Uses HA native components (ha-entity-picker, ha-textfield, ha-formfield,
 * ha-switch) for maximum compatibility with Home Assistant.
 */
export class GithubCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config: GithubCardConfig | undefined = undefined;
  @state() private _pickerValue = "";

  setConfig(config: GithubCardConfig): void {
    console.debug("[ha-github-card] editor.setConfig called", config);
    this._config = { ...config };
    this.requestUpdate();
  }

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------

  private _removeEntity(entityId: string): void {
    this._fireConfigChanged({
      ...this._config!,
      entities: (this._config!.entities ?? []).filter((e) => e !== entityId),
    });
  }

  private _entityPicked(e: CustomEvent | Event): void {
    // Works for both ha-entity-picker (CustomEvent detail.value) and standard <input> change
    const entityId: string =
      (e as CustomEvent).detail?.value ??
      (e.target as HTMLInputElement)?.value ??
      "";
    console.debug("[ha-github-card] editor._entityPicked — value:", entityId);
    if (!entityId || !entityId.trim()) {
      this._pickerValue = "";
      return;
    }
    const current = this._config!.entities ?? [];
    if (!current.includes(entityId)) {
      this._fireConfigChanged({
        ...this._config!,
        entities: [...current, entityId],
      });
    }
    this._pickerValue = "";
  }

  private _addCurrentEntity(): void {
    const val = this._pickerValue.trim();
    console.debug("[ha-github-card] editor._addCurrentEntity —", val);
    if (!val) return;
    const current = this._config!.entities ?? [];
    if (!current.includes(val)) {
      this._fireConfigChanged({
        ...this._config!,
        entities: [...current, val],
      });
    }
    this._pickerValue = "";
  }

  private _setValue(key: keyof GithubCardConfig, value: unknown): void {
    this._fireConfigChanged({ ...this._config!, [key]: value });
  }

  private _setSlotIcon(key: SlotKey, icon: string): void {
    const icons = { ...(this._config!.icons ?? {}) };
    if (icon.trim()) {
      icons[key] = icon.trim();
    } else {
      delete icons[key];
    }
    this._fireConfigChanged({ ...this._config!, icons });
  }

  private _getRows(): SlotKey[][] {
    if (this._config!.rows?.length)
      return this._config!.rows.map((r) => [...r]);
    // migrate legacy format
    const r0 =
      this._config!.row2_slots ??
      (["watchers", "stars", "last_commit"] as SlotKey[]);
    const r1 =
      this._config!.row3_slots ?? (["pull_requests", "issues"] as SlotKey[]);
    return [[...r0], [...r1]];
  }

  private _setRowSlot(rowIdx: number, colIdx: number, value: SlotKey): void {
    const rows = this._getRows();
    rows[rowIdx][colIdx] = value;
    this._fireConfigChanged({ ...this._config!, rows });
  }

  private _setRowColCount(rowIdx: number, count: number): void {
    const rows = this._getRows();
    const row = rows[rowIdx];
    while (row.length < count) row.push("none");
    rows[rowIdx] = row.slice(0, count);
    this._fireConfigChanged({ ...this._config!, rows });
  }

  private _addRow(): void {
    const rows = this._getRows();
    if (rows.length >= 5) return;
    this._fireConfigChanged({
      ...this._config!,
      rows: [...rows, ["none" as SlotKey]],
    });
  }

  private _removeRow(rowIdx: number): void {
    const rows = this._getRows();
    this._fireConfigChanged({
      ...this._config!,
      rows: rows.filter((_, i) => i !== rowIdx),
    });
  }

  private _addColorRule(key: SlotKey): void {
    const slot_colors = { ...(this._config!.slot_colors ?? {}) };
    const rules = [...(slot_colors[key] ?? [])];
    rules.push({
      op: ">=",
      value: 0,
      color: "var(--error-color, #f44336)",
      type: "text",
    });
    slot_colors[key] = rules;
    this._fireConfigChanged({ ...this._config!, slot_colors });
  }

  private _removeColorRule(key: SlotKey, idx: number): void {
    const slot_colors = { ...(this._config!.slot_colors ?? {}) };
    const rules = [...(slot_colors[key] ?? [])].filter((_, i) => i !== idx);
    if (rules.length === 0) {
      delete slot_colors[key];
    } else {
      slot_colors[key] = rules;
    }
    this._fireConfigChanged({ ...this._config!, slot_colors });
  }

  private _updateColorRule(
    key: SlotKey,
    idx: number,
    patch: Partial<SlotColorRule>,
  ): void {
    const slot_colors = { ...(this._config!.slot_colors ?? {}) };
    const rules = [...(slot_colors[key] ?? [])];
    rules[idx] = { ...rules[idx], ...patch };
    slot_colors[key] = rules;
    this._fireConfigChanged({ ...this._config!, slot_colors });
  }

  private _fireConfigChanged(config: GithubCardConfig): void {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  render() {
    console.debug(
      "[ha-github-card] editor.render — hass:",
      !!this.hass,
      "| _config:",
      this._config,
    );
    if (!this._config) {
      console.warn(
        "[ha-github-card] editor.render — _config is not set yet, rendering nothing",
      );
      return nothing;
    }

    const cfg = this._config;
    const selectedEntities = cfg.entities ?? [];
    const rows = this._getRows();
    const githubEntities = this.hass ? getGithubEntities(this.hass) : [];
    console.debug(
      "[ha-github-card] editor.render — githubEntities found:",
      githubEntities.length,
      githubEntities,
    );
    console.debug(
      "[ha-github-card] editor — ha-textfield defined:",
      !!customElements.get("ha-textfield"),
      "| ha-entity-picker defined:",
      !!customElements.get("ha-entity-picker"),
    );

    return html`
      <div class="field-group">
        <label class="field-label" for="card-title">Card Title</label>
        <input
          id="card-title"
          type="text"
          class="text-input"
          .value="${cfg.title ?? ""}"
          @change="${(e: Event) =>
            this._setValue("title", (e.target as HTMLInputElement).value)}"
          placeholder="GitHub"
        />
      </div>

      <div class="section-label">GitHub Entities</div>

      ${selectedEntities.length > 0
        ? html`
            <div class="entity-list">
              ${selectedEntities.map((entityId) => {
                const inStates = !!(this.hass && this.hass.states[entityId]);
                return html`
                  <div class="entity-row ${inStates ? "" : "entity-warn"}">
                    <span class="entity-id">${entityId}</span>
                    ${!inStates
                      ? html`<span
                          class="warn-icon"
                          title="Entity not found in HA — check ID"
                          >⚠</span
                        >`
                      : nothing}
                    <button
                      class="remove-btn"
                      @click="${() => this._removeEntity(entityId)}"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>
                `;
              })}
            </div>
          `
        : html`<p class="hint">No entities added yet.</p>`}

      <datalist id="github-entity-list">
        ${githubEntities.map((id) => html`<option value="${id}"></option>`)}
      </datalist>
      <div class="add-entity-row">
        <input
          type="text"
          class="text-input entity-input"
          list="github-entity-list"
          placeholder="sensor.myrepo_watchers_count"
          .value="${this._pickerValue}"
          @input="${(e: Event) => {
            this._pickerValue = (e.target as HTMLInputElement).value;
          }}"
          @change="${this._entityPicked}"
        />
        <button class="add-btn" @click="${this._addCurrentEntity}">Add</button>
      </div>
      <p class="hint">
        ${githubEntities.length > 0
          ? html`${githubEntities.length} GitHub entities available — pick from
            list or type any entity ID.`
          : html`No GitHub entities auto-detected. Type the entity ID manually
              (e.g. <em>sensor.owner_repo_watchers_count</em>).`}
      </p>

      <div class="section-label">Rows — ${rows.length} / 5</div>

      ${rows.map(
        (row, rowIdx) => html`
          <div class="row-block">
            <div class="row-block-header">
              <span class="row-block-title">Row ${rowIdx + 1}</span>
              <div class="col-count-btns">
                <span class="col-count-label">Cols:</span>
                ${[1, 2, 3].map(
                  (n) => html`
                    <button
                      class="col-count-btn ${row.length === n ? "active" : ""}"
                      @click="${() => this._setRowColCount(rowIdx, n)}"
                    >
                      ${n}
                    </button>
                  `,
                )}
              </div>
              <button
                class="remove-btn row-remove-btn"
                @click="${() => this._removeRow(rowIdx)}"
                aria-label="Remove row"
                ?disabled="${rows.length <= 1}"
              >
                ✕
              </button>
            </div>
            <div class="slot-row">
              ${row.map((slot, colIdx) =>
                this._renderSlotSelect(
                  rowIdx,
                  colIdx,
                  slot,
                  `Col ${colIdx + 1}`,
                ),
              )}
            </div>
          </div>
        `,
      )}
      ${rows.length < 5
        ? html`
            <button class="add-row-btn" @click="${() => this._addRow()}">
              + Add Row
            </button>
          `
        : nothing}

      <div class="section-label">Conditional Colors</div>
      ${(
        [
          ["stars", "Stars"],
          ["forks", "Forks"],
          ["watchers", "Watchers"],
          ["issues", "Issues"],
          ["pull_requests", "Pull Requests"],
        ] as [SlotKey, string][]
      ).map(([key, label]) => {
        const rules = cfg.slot_colors?.[key] ?? [];
        return html`
          <div class="color-slot-block">
            <div class="color-slot-header">
              <span class="color-slot-label">${label}</span>
              <button
                class="add-color-btn"
                @click="${() => this._addColorRule(key)}"
              >
                + Rule
              </button>
            </div>
            ${rules.map(
              (rule, idx) => html`
                <div class="color-rule-row">
                  <select
                    class="color-type-select"
                    @change="${(e: Event) =>
                      this._updateColorRule(key, idx, {
                        type: (e.target as HTMLSelectElement)
                          .value as SlotColorRule["type"],
                      })}"
                  >
                    <option
                      value="text"
                      ?selected="${rule.type !== "background"}"
                    >
                      Text
                    </option>
                    <option
                      value="background"
                      ?selected="${rule.type === "background"}"
                    >
                      BG
                    </option>
                  </select>
                  <select
                    class="color-op-select"
                    @change="${(e: Event) =>
                      this._updateColorRule(key, idx, {
                        op: (e.target as HTMLSelectElement)
                          .value as SlotColorRule["op"],
                      })}"
                  >
                    ${(
                      [">", ">=", "<", "<=", "=="] as SlotColorRule["op"][]
                    ).map(
                      (op) => html`
                        <option value="${op}" ?selected="${rule.op === op}">
                          ${op}
                        </option>
                      `,
                    )}
                  </select>
                  <input
                    type="number"
                    class="text-input color-threshold-input"
                    .value="${String(rule.value)}"
                    @change="${(e: Event) =>
                      this._updateColorRule(key, idx, {
                        value:
                          parseFloat((e.target as HTMLInputElement).value) || 0,
                      })}"
                  />
                  <div
                    class="color-preview"
                    style="background:${rule.color}"
                  ></div>
                  <input
                    type="text"
                    class="text-input color-color-input"
                    .value="${rule.color}"
                    placeholder="#f44336"
                    @change="${(e: Event) =>
                      this._updateColorRule(key, idx, {
                        color: (e.target as HTMLInputElement).value,
                      })}"
                  />
                  <button
                    class="remove-btn"
                    @click="${() => this._removeColorRule(key, idx)}"
                  >
                    ✕
                  </button>
                </div>
              `,
            )}
          </div>
        `;
      })}

      <div class="section-label">Visual Options</div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${cfg.show_header !== false}"
          @change="${(e: Event) =>
            this._setValue(
              "show_header",
              (e.target as HTMLInputElement).checked,
            )}"
        />
        Show Card Header (title bar)
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${cfg.show_header_icon !== false}"
          @change="${(e: Event) =>
            this._setValue(
              "show_header_icon",
              (e.target as HTMLInputElement).checked,
            )}"
        />
        Show GitHub Icon in Header
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${cfg.show_avatar !== false}"
          @change="${(e: Event) =>
            this._setValue(
              "show_avatar",
              (e.target as HTMLInputElement).checked,
            )}"
        />
        Show Owner Avatar
      </label>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked="${!!cfg.compact}"
          @change="${(e: Event) =>
            this._setValue("compact", (e.target as HTMLInputElement).checked)}"
        />
        Compact Layout
      </label>
    `;
  }

  private _renderSlotSelect(
    rowIdx: number,
    colIdx: number,
    current: SlotKey,
    label: string,
  ) {
    const iconOverride = this._config!.icons?.[current] ?? "";
    return html`
      <div class="slot-select-wrap">
        <span class="slot-col-label">${label}</span>
        <select
          @change="${(e: Event) =>
            this._setRowSlot(
              rowIdx,
              colIdx,
              (e.target as HTMLSelectElement).value as SlotKey,
            )}"
        >
          ${SLOT_OPTIONS.map(
            ([key, optLabel]) => html`
              <option value="${key}" ?selected="${key === current}">
                ${optLabel}
              </option>
            `,
          )}
        </select>
        ${current !== "none"
          ? html`
              <div class="icon-override-row">
                ${iconOverride
                  ? html`<ha-icon
                      class="icon-preview"
                      .icon="${iconOverride}"
                    ></ha-icon>`
                  : html`<span class="icon-preview-placeholder"
                      >&#xFFFD;</span
                    >`}
                <input
                  type="text"
                  class="text-input icon-input"
                  placeholder="mdi:star"
                  .value="${iconOverride}"
                  title="Override icon (leave empty to use sensor default)"
                  @change="${(e: Event) =>
                    this._setSlotIcon(
                      current,
                      (e.target as HTMLInputElement).value,
                    )}"
                />
              </div>
            `
          : nothing}
      </div>
    `;
  }

  // ------------------------------------------------------------------
  // Styles
  // ------------------------------------------------------------------

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }
    .section-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--primary-text-color);
      border-bottom: 1px solid var(--divider-color, #e1e4e8);
      padding-bottom: 4px;
      margin-top: 4px;
    }
    .hint {
      font-size: 0.78rem;
      color: var(--secondary-text-color);
      margin: 0;
      line-height: 1.5;
    }
    .field-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .text-input {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border: 1px solid var(--divider-color, #e1e4e8);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.9rem;
      font-family: inherit;
    }
    .text-input:focus {
      outline: none;
      border-color: var(--primary-color, #0366d6);
      box-shadow: 0 0 0 2px
        color-mix(in srgb, var(--primary-color, #0366d6) 20%, transparent);
    }
    .entity-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .entity-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px 6px 12px;
      border: 1px solid var(--primary-color, #0366d6);
      border-radius: 6px;
      background: color-mix(
        in srgb,
        var(--primary-color, #0366d6) 6%,
        transparent
      );
    }
    .entity-row.entity-warn {
      border-color: var(--warning-color, #f59e0b);
      background: color-mix(
        in srgb,
        var(--warning-color, #f59e0b) 8%,
        transparent
      );
    }
    .entity-id {
      flex: 1;
      font-size: 0.85rem;
      color: var(--primary-text-color);
      word-break: break-all;
    }
    .warn-icon {
      color: var(--warning-color, #f59e0b);
      font-size: 1rem;
      cursor: help;
      flex-shrink: 0;
    }
    .remove-btn {
      flex-shrink: 0;
      background: none;
      border: none;
      color: var(--secondary-text-color);
      cursor: pointer;
      font-size: 0.9rem;
      padding: 2px 6px;
      border-radius: 4px;
      line-height: 1;
    }
    .remove-btn:hover {
      background: color-mix(
        in srgb,
        var(--error-color, #f44336) 12%,
        transparent
      );
      color: var(--error-color, #f44336);
    }
    .add-entity-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .entity-input {
      flex: 1;
      margin-bottom: 0;
    }
    .add-btn {
      flex-shrink: 0;
      padding: 8px 16px;
      background: var(--primary-color, #0366d6);
      color: var(--text-primary-color, #fff);
      border: none;
      border-radius: 6px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      font-family: inherit;
    }
    .add-btn:hover {
      opacity: 0.88;
    }
    .slot-row {
      display: flex;
      gap: 8px;
    }
    .slot-select-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .slot-col-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    select {
      width: 100%;
      padding: 6px 8px;
      border: 1px solid var(--divider-color, #e1e4e8);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.85rem;
      cursor: pointer;
      font-family: inherit;
    }
    select:focus {
      outline: none;
      border-color: var(--primary-color, #0366d6);
    }
    .icon-override-row {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 4px;
    }
    ha-icon.icon-preview {
      --mdc-icon-size: 16px;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: var(--secondary-text-color);
    }
    .icon-preview-placeholder {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: var(--secondary-text-color);
      opacity: 0.4;
    }
    .icon-input {
      font-size: 0.75rem;
      padding: 4px 6px;
    }
    .toggle-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.9rem;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .toggle-row input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: var(--primary-color, #0366d6);
    }
    .row-block {
      border: 1px solid var(--divider-color, #e1e4e8);
      border-radius: 8px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: color-mix(
        in srgb,
        var(--primary-text-color, #000) 2%,
        transparent
      );
    }
    .row-block-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .row-block-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      flex: 1;
    }
    .col-count-btns {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .col-count-label {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin-right: 2px;
    }
    .col-count-btn {
      width: 28px;
      height: 28px;
      border: 1px solid var(--divider-color, #e1e4e8);
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      padding: 0;
    }
    .col-count-btn:hover {
      background: color-mix(
        in srgb,
        var(--primary-color, #0366d6) 10%,
        transparent
      );
    }
    .col-count-btn.active {
      background: var(--primary-color, #0366d6);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color, #0366d6);
    }
    .row-remove-btn {
      padding: 2px 6px;
    }
    .row-remove-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .add-row-btn {
      align-self: flex-start;
      padding: 7px 14px;
      border: 1px dashed var(--primary-color, #0366d6);
      border-radius: 6px;
      background: color-mix(
        in srgb,
        var(--primary-color, #0366d6) 6%,
        transparent
      );
      color: var(--primary-color, #0366d6);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }
    .add-row-btn:hover {
      background: color-mix(
        in srgb,
        var(--primary-color, #0366d6) 14%,
        transparent
      );
    }
    .color-slot-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .color-slot-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .color-slot-label {
      flex: 1;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .add-color-btn {
      padding: 3px 10px;
      border: 1px dashed var(--primary-color, #0366d6);
      border-radius: 5px;
      background: color-mix(
        in srgb,
        var(--primary-color, #0366d6) 6%,
        transparent
      );
      color: var(--primary-color, #0366d6);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }
    .add-color-btn:hover {
      background: color-mix(
        in srgb,
        var(--primary-color, #0366d6) 14%,
        transparent
      );
    }
    .color-rule-row {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border: 1px solid var(--divider-color, #e1e4e8);
      border-radius: 6px;
      background: color-mix(
        in srgb,
        var(--primary-text-color, #000) 2%,
        transparent
      );
    }
    .color-op-select {
      width: 60px;
      flex-shrink: 0;
      padding: 4px 4px;
      font-size: 0.82rem;
    }
    .color-threshold-input {
      width: 70px;
      flex-shrink: 0;
      padding: 4px 6px;
      font-size: 0.82rem;
    }
    .color-color-input {
      flex: 1;
      padding: 4px 6px;
      font-size: 0.82rem;
    }
    .color-preview {
      width: 18px;
      height: 18px;
      border-radius: 3px;
      flex-shrink: 0;
      border: 1px solid var(--divider-color, #e1e4e8);
    }
  `;
}
