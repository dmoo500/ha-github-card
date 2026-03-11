import { GithubCard } from './github-card.js';
import { GithubCardEditor } from './editor/github-card-editor.js';

// Register the card
if (!customElements.get('ha-github-card')) {
  customElements.define('ha-github-card', GithubCard);
}

// Register the editor
if (!customElements.get('ha-github-card-editor')) {
  customElements.define('ha-github-card-editor', GithubCardEditor);
}

// Register with the HA custom card registry
(window as unknown as Record<string, unknown>)['customCards'] ??= [];
const customCards = (window as unknown as { customCards: unknown[] })['customCards'];
customCards.push({
  type: 'ha-github-card',
  name: 'GitHub Card',
  description: 'Display information from your GitHub repositories tracked via the GitHub integration.',
  preview: true,
  documentationURL: 'https://github.com/your-username/ha-github-card',
});

export { GithubCard, GithubCardEditor };
