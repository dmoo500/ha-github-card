import { html, css, nothing } from "lit";

export interface CardHeaderOptions {
  title?: string;
  show_header?: boolean;
  show_header_icon?: boolean;
}

/** Card-level header shared by all cards (title + optional GitHub icon). */
export function renderCardHeader(options: CardHeaderOptions) {
  if (options.show_header === false || !options.title) return nothing;
  return html`
    <div class="card-header">
      ${
        options.show_header_icon !== false
          ? html`<div class="header-icon">
              <ha-icon class="icon-header" .icon="${"mdi:github"}"></ha-icon>
            </div>`
          : nothing
      }
      <span class="header-title">${options.title}</span>
    </div>
  `;
}

export const cardHeaderStyles = css`
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px 8px;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--gh-text, var(--primary-text-color, #24292e));
    border-bottom: 1px solid var(--gh-border, var(--divider-color, #e1e4e8));
  }

  .header-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .header-title {
    flex: 1;
  }

  ha-icon.icon-header {
    --mdc-icon-size: 20px;
    width: 20px;
    height: 20px;
    color: var(--gh-text, var(--primary-text-color, #24292e));
  }
`;
