import { css } from "lit";

/** Base styles shared by all card editors. */
export const editorBaseStyles = css`
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
`;
