# DOM design-language analysis

Inspected 2026-09-23.

The separate [marketing homepage analysis](reference/marketing-dom-analysis.md) records the 2026-09-24 marketing homepage inspection and ranks additional component candidates.

## Evidence and limits

Initial `/` navigation resolved to `/login`. The discovery route subsequently loaded in the available browser session. This report records rendered DOM, computed styles, root CSS custom properties, and a viewport screenshot inspected in-browser. It does not assume the session was anonymous. No account details or wallet identifiers are reproduced here.

This is an initial light-theme discovery-surface audit, not a complete audit of every surface. Dark theme, mobile navigation, exact media-query thresholds, focus/hover states, and other routes remain to be measured. Viewport dimensions changed during inspection; sizes below describe samples rather than established breakpoints. Declared custom properties are distinguished from actual computed component values. Authentication-provider variables are excluded from the proposed design system.

## Visual grammar

The shell uses a quiet light ground, white raised sections, restrained borders, rounded controls, and colorful imagery. Green marks brand actions. Spotlight cards place identity and action controls on translucent footers over artwork. Section identity comes partly from soft colored background art. Typography is predominantly regular or medium weight with slightly negative tracking.

## Observed semantic variables

| Source variable                               | Value                   |
| --------------------------------------------- | ----------------------- |
| `--color-bg-primary`                          | `#f9f8f5`               |
| `--color-bg-surface`, `--color-bg-card`       | `#ffffff`               |
| `--color-bg-surface-secondary`                | `#f5f5f5`               |
| `--color-bg-hover-subtle`                     | `#edeff3`               |
| `--color-text-primary`                        | `#181818`               |
| `--color-text-secondary`                      | `#555555`               |
| `--color-text-tertiary`, `--color-text-muted` | `#9da3ac`               |
| `--color-brand-green`                         | `#00de73`               |
| `--color-brand-green-primary`                 | `#19e783`               |
| `--color-brand-green-dark`                    | `#05472a`               |
| `--color-brand-blue`                          | `#09b5ff`               |
| `--color-border-default`                      | `#edeff3`               |
| `--color-border-input`                        | `#e2e2e0`               |
| `--color-border-focus`                        | `#00de73`               |
| `--color-border-subtle`                       | `rgba(237,239,243,0.5)` |
| `--color-bg-overlay`                          | `rgba(0,0,0,0.65)`      |
| `--color-bg-modal-overlay`                    | `rgba(255,255,255,0.8)` |

Do not assume the primary background token paints every shell region. Likewise, overlay tokens are declarations, not proof that every modal uses them.

## Typography

Primary stack: `Roobert, Inter, SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif`.

Monospace stack: `AvenueMono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`.

| Class / role                          | Size / line height | Weight             | Tracking |
| ------------------------------------- | ------------------ | ------------------ | -------- |
| `.h2`, section heading, larger sample | 32 / 40px          | 500                | -0.32px  |
| `.h2`, narrower sample                | 24 / 32px          | 500                | -0.24px  |
| `.h3`, larger sample                  | 24 / 31.992px      | 400                | -0.24px  |
| `.h3`, narrower sample                | 20 / 24px          | 400                | -0.2px   |
| `.b1`                                 | 16 / 24px          | 400, sometimes 500 | -0.16px  |
| `.b2`                                 | 15 / 22px          | 400                | -0.15px  |
| `.b3`                                 | 14 / 20px          | 400, sometimes 500 | -0.14px  |
| `.b4`                                 | 13 / 18px          | 400                | -0.13px  |

Font binaries were not copied. Proposed library accepts a consumer-provided Roobert font and has a documented fallback; exact typography requires the matching font.

## Component measurements

### Buttons

Source classes include `styles_container__TE5Rk`, `styles_height-32__qsaGS`, `styles_height-40__sxmn9`, `styles_height-48__voq7R`, and variant classes `styles_secondary__6JFqH`, `styles_primary__T3YQT`, `styles_green__1Tl33`.

- Pill radius: 100px; content gap: 8px.
- 32px variant: horizontal padding 14px.
- 40px variant: horizontal padding 21px.
- 48px primary sample: horizontal padding 16px.
- Secondary: white background, `#181818` text.
- Primary: black background, white text.
- Green: `#19e783` background, `#181818` text.
- Computed button shadow: `0 6px 10px -4px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.05)`.
- Circular icon controls use a different shadow: `0 1px 4px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.05)`.

The root `--shadow-button` variable instead declares inset highlights and a lower shadow. Preserve this distinction; one declared token does not describe every rendered button.

### Surfaces and cards

`styles_content__YcMt8` is a white raised surface with 16px radius and padding `8px 8px 24px` in the narrower sample. Section-header container `styles_container__vykyg` uses 24px padding. Section-stack gap is 16px.

Computed section shadow:

```css
0 3px 5px rgba(200,206,215,.25),
0 2px 3px rgba(135,175,199,.12),
0 4px 10px rgba(222,228,235,.25)
```

App-list items are `li.styles_appItem__2SZK_`: 16px radius, 16px padding, 24px gap, and a 0.5px `#edeff3` border. DOM anatomy includes an app-info group, image, header/title/category, description, upvote button, and separate favorite button. Card dimensions are content/layout dependent.

### Inputs and motion

Search inputs use `styles_input___oGHV`, 32px radius, `1px solid rgba(237,239,243,.5)`, and horizontal padding 40px for icons. Two samples compute to 38px high. Global search is readonly in its resting DOM and likely serves as an overlay trigger; interaction needs confirmation.

Observed view controls and upvote controls transition over 0.3s using `cubic-bezier(.215,.61,.355,1)`. App-list opacity uses the same timing. These are measured values, not a mandate to animate every property.

## Proposed Bits UI mapping

| Observed pattern                              | Library implementation                                                        |
| --------------------------------------------- | ----------------------------------------------------------------------------- |
| Primary / secondary / green actions           | Button wrapper with size and variant props                                    |
| Favorite heart                                | Toggle with accessible pressed state                                          |
| Grid / list switch                            | Single-selection ToggleGroup                                                  |
| Category filter                               | ToggleGroup for filtering; Tabs only for actual tab panels                    |
| Dialog and announcement modal                 | Dialog with title, description, focus restoration, Escape dismissal           |
| Favorites / notifications surface             | Popover where non-modal behavior is appropriate                               |
| Theme switch                                  | Switch                                                                        |
| App avatars                                   | Avatar with fallback                                                          |
| Icon explanations                             | Tooltip                                                                       |
| App cards, badges, section headers, data rows | Typed Svelte composition components                                           |
| Sidebar navigation                            | Semantic links with `aria-current`                                            |
| Search field                                  | Native labeled input; Command/Dialog only if observed interaction warrants it |

Source DOM includes visually styled non-native controls and heading tags used for small labels. Reproduce appearance while using appropriate semantics, accessible names, keyboard interaction, and focus visibility.

## Proposed deliverable

Recommended: a reusable Svelte 5 library with Bits UI primitives, semantic CSS tokens, and a SvelteKit gallery in this workspace. Use `src/lib` for package exports and `src/routes` for gallery pages. Keep the package independent of the gallery and use neutral mock data.

Alternative 1: a close page recreation first. Faster visual comparison, but narrower reusable API coverage.

Alternative 2: a brand-adapted system. More freedom over type and color, but less faithful to the requested source.

Suggested first release: Button, IconButton, Badge, Avatar, Input, Toggle, ToggleGroup, Switch, Dialog, Popover, Tooltip, AppCard, SectionHeader, SidebarNav, and EmptyState. Only include additional primitives after inspecting a corresponding source pattern or a concrete consumer requirement.

Verification: type checks and production build; keyboard tests for overlays and selection controls; desktop/mobile gallery inspection; source-versus-library token comparison. Keep measured values, inferred choices, and unverified states explicit.

Next research pass: controlled desktop/mobile viewports; dark-mode CSS rules without persisting account preferences; public app-detail and stream surfaces; overlay, selected, focus, hover, disabled, and empty states. No trading or wallet transactions are required for design analysis.
