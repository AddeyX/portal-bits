# Changelog

Notable changes, newest first.

## [Unreleased]

### Added

- FloatingNav, a white pill bar with brand, middle links, and optional actions. Narrow widths open those links from Menu.
- Docs search in a popover. Matching text is bold and accent-colored. The search icon fades out on Home.
- `/shell` keeps the representative application shell.
- PortalShell `brandHref` and `brandLabel` set the brand link's destination and name. The link takes its name from the visible brand, or `Home` when collapsed.
- Tooltip `theme` scopes its portaled content, like Dialog and Popover.
- `--portal-control-border` and the `--portal-inverse` token set.
- `DESIGN.md` records the visual system: tokens, component styling, and named rules.
- Avatar `decorative` removes it from the accessibility tree. AppCard uses it, since the card title already names the avatar.
- The gallery has a favicon.

### Fixed

- Docs search shows keyboard focus on its trigger, field, and results.
- Input, Select, Checkbox, and the off Switch have 3:1 edges. This is a contrast adaptation; dividers keep the source border.
- Primary buttons and tooltips invert in the dark theme instead of disappearing into the surface.
- Docs group labels and the sidebar collapse icon meet contrast minimums.
- Plain links in themed content use the text color instead of the browser's default blue.
- Dialog without a description no longer repeats its title as the description.
- Reduced motion reaches library components outside a `.p-theme` wrapper.
- The smallest gallery and mobile-nav text is 11px instead of 10px.
- The gallery GitHub link says it opens in a new tab.
- On narrow screens, docs navigation opens from a Browse docs control instead of a sticky sidebar that covered the page.
- Shell spotlight cards scroll in a row until their section fits three readable cards.

### Removed

- The shell no longer shows a library version in the top bar or sidebar.

### Changed

- Docs pages keep the article in a 760px column with 16px of side padding, measured from the Bits UI docs layout, so the copy does not span the full main area. With the sidebar open, the left inset is shorter by half the sidebar width so the column sits in the middle of the page.
- Library styles read the `--portal-space-*`, `--portal-radius`, and `--portal-pill` tokens, so overriding them now reaches every component. Rendered values are unchanged.
- Input shows its `label` above the field, like Select. Pass `hideLabel` for search fields whose context is already visible. Placeholders are examples, not labels.
- Shell spotlight actions are named for their card, such as "Explore Orbit Studio".
- The Button docs snippet matches its preview.
- PortalShell collapse lays out the main column once, then slides it with a transform. Reduced motion skips the slide.
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
