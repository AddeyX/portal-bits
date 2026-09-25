# Changelog

Notable changes, newest first.

## [Unreleased]

### Added

- FloatingNav, a white pill bar with brand, middle links, and optional actions. Narrow widths open those links from Menu.
- Docs search in a popover. Matching text is bold and accent-colored. The search icon fades out on Home.
- `/shell` keeps the representative application shell.

### Fixed

- On narrow screens, docs navigation opens from a Browse docs control instead of a sticky sidebar that covered the page.
- Shell spotlight cards scroll in a row until their section fits three readable cards.

### Changed

- The gallery bar places the logo on the left and Home, Docs, and GitHub in the middle. Component examples each have a docs page, with a sidebar grouped in the library's own sections.

## [0.3.0] - 2026-09-24

### Added

- ArticleCard, FeatureCard, and a responsive Carousel with native scrolling and keyboard pagination.
- Synthetic editorial and feature examples, plus component contracts and a design spec.
- ColorSelector with five fixed presets, a rainbow gradient picker, keyboard sliders, and exact hex input.
- A top-right gallery accent control with immediate theme-aware color updates.

### Changed

- Documentation describes the measured design language without website attribution.
- Gallery component counts now reflect all 28 exported components.

## [0.2.0] - 2026-09-24

### Changed

- The visual-language credit lives in the root README.

### Removed

- The contributing guide.

### Added

- Quiet inline buttons and the AuthFrame, Checkbox, Select, Alert, RowList, and Row components.
- Synthetic task and record gallery examples, including compact and reading frame previews.
- The library publishes to GitHub Packages as `@addeyx/portal-bits`.
- A local gallery that shows the library in a shell, with foundations, component, and motion pages.
- A local Svelte package that exports the components and token CSS.
