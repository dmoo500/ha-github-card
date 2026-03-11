# ha-github-card

A custom [Home Assistant](https://www.home-assistant.io/) Lovelace card that displays information from your GitHub repositories tracked via the official [GitHub integration](https://www.home-assistant.io/integrations/github/).

## Features

- Table-like layout with 3 rows per repository
- Row 1 (fixed): repository name + latest release tag
- Row 2 (configurable): 3 stat columns
- Row 3 (configurable): 2 stat columns
- Available stats: ⭐ Stars, 🍴 Forks, 👁 Watchers, 🐛 Issues, 🔀 Pull Requests, 🔗 Last Commit, 🏷 Latest Release, 💻 Language
- Visual card editor with HA entity picker
- Supports both old-style GitHub integration (single entity) and new-style (individual sensor entities per metric, grouped by device)
- Compact layout option
- Fully themed via HA CSS variables

## Requirements

1. [GitHub integration](https://www.home-assistant.io/integrations/github/) installed and configured in Home Assistant
2. At least one repository added to the GitHub integration

## Installation

### HACS (recommended)

1. Open HACS → Frontend → "+ Explore & download repositories"
2. Search for **ha-github-card** and install
3. Add the resource if needed: `/hacsfiles/ha-github-card/ha-github-card.js`

### Manual

1. Download `ha-github-card.js` from the [latest release](https://github.com/your-username/ha-github-card/releases)
2. Copy it to `config/www/ha-github-card/ha-github-card.js`
3. Add the resource in Settings → Dashboards → Resources: `/local/ha-github-card/ha-github-card.js`

## Configuration

### Via UI editor

Click the edit button on a dashboard, add a new card, search for **GitHub Card**. Use the entity picker to select any sensor belonging to a GitHub repository device (e.g. `sensor.myrepo_watchers_count`). The card automatically aggregates all sensors from the same device.

### YAML

```yaml
type: custom:ha-github-card
title: GitHub
entities:
  - sensor.myrepo_watchers_count   # any sensor from the GitHub device works
show_avatar: true
compact: false
row2_slots:
  - watchers
  - stars
  - last_commit
row3_slots:
  - pull_requests
  - issues
```

### Options

| Option        | Type       | Default                                   | Description                          |
|---------------|------------|-------------------------------------------|--------------------------------------|
| `title`       | `string`   | —                                         | Card header title                    |
| `entities`    | `list`     | `[]`                                      | One entity ID per GitHub repository  |
| `show_avatar` | `boolean`  | `true`                                    | Show repository owner avatar         |
| `compact`     | `boolean`  | `false`                                   | Compact layout                       |
| `row2_slots`  | `[s, s, s]`| `[watchers, stars, last_commit]`          | 3 stat columns for row 2             |
| `row3_slots`  | `[s, s]`   | `[pull_requests, issues]`                 | 2 stat columns for row 3             |

### Available slot values

| Value           | Description         |
|-----------------|---------------------|
| `stars`         | ⭐ Stargazer count  |
| `forks`         | 🍴 Fork count       |
| `watchers`      | 👁 Watcher count   |
| `issues`        | 🐛 Open issue count |
| `pull_requests` | 🔀 Open PR count   |
| `last_commit`   | 🔗 Latest commit SHA + date |
| `last_release`  | 🏷 Latest release tag |
| `language`      | 💻 Primary language badge |
| `none`          | Empty column (hidden) |

## Development

```bash
yarn install
yarn dev        # watch mode
yarn build      # production build
yarn type-check
```

## License

MIT
