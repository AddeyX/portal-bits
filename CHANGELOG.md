# Changelog

Notable changes, newest first.

## [Unreleased]

### Changed

- Docs source blocks use file tabs, Expand Code, and a copy icon. The surface follows the active theme tokens. Highlighting uses Serendipity Midnight, with those hues darkened for the light surface, which is an adaptation. The 16px radius and 320px collapsed height are gallery adaptations.

### Added

- Nine primitives: Textarea, Slider, RadioGroup, Tabs, Accordion, Progress, Separator, DropdownMenu, and AlertDialog. Each has a docs page with variations, source, and an API reference. Their visual values are adaptations built from the existing tokens. New exported types: `TabItem`, `AccordionItem`, `RadioOption`, and `MenuEntry`.
- `--portal-on-error` and `--portal-error-hover` for the danger button. Both are adaptations.
- Component pages have an "On this page" rail at 1280px and wider, and previous and next links at the end.

### Fixed

- Install commands include `@lucide/svelte` so copyable examples resolve their icon imports in pnpm consumer projects.
- The component page lede sat 8px above the preview instead of 32px, because the API reference styles leaked onto it.
- The Source header no longer stacks its file picker over the heading on phones.
- More examples uses a drawn chevron instead of the browser's disclosure triangle.
- Checkbox draws its check with the Lucide icon instead of a text glyph.

- Docs search finds guide sections and component APIs, not only page titles. A result links to its section, such as Get started, Installation, or Input, API reference, and shows the matching text in bold. Queries match prop names, defaults, binding names, limits, and example source. Aliases such as setup and a11y work. Results are capped at 12, and an empty query still lists one result per page. Guide headings now have fragment links.
- Component pages open on one specimen with variation controls below it, instead of a variant matrix. Controls change only existing props, and the example code follows them. Less common cases, such as a link Button, sit under More examples. Size is disabled for quiet Button and says why.
- Every component page shows complete, copyable consumer source: `+layout.svelte`, an `App.svelte` that passes the selected settings, and the full example. A file selector switches between them, and Copy copies the raw file. Static example source is highlighted at build time with Shiki, a dev dependency. The browser receives no highlighter. Long source expands from a button and long lines scroll inside the block.
- Component previews and the Get started specimen sit in a shared stage. Small specimens are centered. Carousel, SectionHeader, RowList, Row, TopBar, and FloatingNav use the wide stage.
- Get started lists the supported Svelte and Bits UI ranges, a package-manager command, and separate layout and page examples. Each example can be copied. A blocked clipboard keeps the source selectable and says that the copy failed.
- The gallery deploys to GitHub Pages on every push to `main`.
- Every component page ends with an API reference: props and snippets in tables with type, default, required, and binding, then forwarded attributes, limits, and related components. A test compares each reference with the component declarations. Tables scroll inside a labeled region at narrow widths.
- Docs open on Get started, with install steps, a first component, and where to go next.

## [0.4.0] - 2026-09-25

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

- The library publishes to the public npm registry as `portal-bits`.
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
