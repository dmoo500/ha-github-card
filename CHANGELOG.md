# Changelog

All notable changes to this project are documented in this file.

## [0.1.0-beta.1] - 2026-10-30

Pre-release for the upcoming 0.1.0 release.

### Added

- Daily activity chart (commits, pull requests, issues, optionally discussions) derived from the Home Assistant history of the GitHub integration's "Latest …" sensors.
  - Shown below each repository table of the GitHub Card (`show_activity: true`).
  - New standalone `custom:ha-github-activity-card` per repository, including a visual editor.
  - Line chart by default, stacked bars via `activity_chart_type: bar`.
  - Options `activity_range` (`7d`), `activity_metrics` and `activity_chart_type`, configurable in both editors.
  - Theming via `--gh-activity-*-color` and `--gh-activity-chart-height`.
- Card version is logged to the browser console on load.

### Fixed

- Lit reactive properties did not reliably trigger re-renders (`useDefineForClassFields: false`).

### Changed

- Removed verbose debug logging from the card, editor and utilities.
- Conditional color rules are evaluated once per slot.
- Shared card header and editor styles between the cards.
