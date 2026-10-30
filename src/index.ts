import { GithubCard } from "./github-card.js";
import { GithubCardEditor } from "./editor/github-card-editor.js";
import { GithubActivityCard } from "./github-activity-card.js";
import { GithubActivityCardEditor } from "./editor/github-activity-card-editor.js";
import { GithubActivityChart } from "./components/github-activity-chart.js";

const DOCUMENTATION_URL = "https://github.com/dmoo500/ha-github-card";

console.info(
  `%c GITHUB-CARD %c ${__CARD_VERSION__} `,
  "color: white; background: #24292e; font-weight: 700;",
  "color: #24292e; background: white; font-weight: 700;",
);

const ELEMENTS: [string, typeof HTMLElement][] = [
  ["ha-github-activity-chart", GithubActivityChart],
  ["ha-github-card", GithubCard],
  ["ha-github-card-editor", GithubCardEditor],
  ["ha-github-activity-card", GithubActivityCard],
  ["ha-github-activity-card-editor", GithubActivityCardEditor],
];

for (const [name, element] of ELEMENTS) {
  if (!customElements.get(name)) customElements.define(name, element);
}

// Register with the HA custom card registry
(window as unknown as Record<string, unknown>)["customCards"] ??= [];
const customCards = (window as unknown as { customCards: unknown[] })[
  "customCards"
];
customCards.push(
  {
    type: "ha-github-card",
    name: "GitHub Card",
    description:
      "Display information from your GitHub repositories tracked via the GitHub integration.",
    preview: true,
    documentationURL: DOCUMENTATION_URL,
  },
  {
    type: "ha-github-activity-card",
    name: "GitHub Activity Card",
    description:
      "Daily commits, pull requests and issues of a GitHub repository, based on the recorded sensor history.",
    preview: true,
    documentationURL: DOCUMENTATION_URL,
  },
);

export {
  GithubCard,
  GithubCardEditor,
  GithubActivityCard,
  GithubActivityCardEditor,
  GithubActivityChart,
};
