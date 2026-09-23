# Portal-derived Bits UI library

Status: original design approved on 2026-09-23; explicit shell and motion requirements added from the user's follow-up. Product direction confirmed: faithful reusable design system, neutral demo content. This spec does not claim that the library is already implemented.

## Outcome

A local Svelte component package and runnable gallery that reproduce Abstract Portal's measured visual language. Consumers can import components and token CSS without importing gallery routes or demo data. Evidence is preserved in `docs/portal-dom-analysis.md` with source URLs, selectors, values, and known limits.

## Architecture

Use one SvelteKit repository with Svelte 5 and TypeScript. Export library components from `src/lib/index.ts`; package using the Svelte library packaging tool. Keep Svelte and Bits UI as peer dependencies of the packaged library and development dependencies of the workspace. Resolve compatible versions from official package metadata when implementation begins and commit the lockfile.

```text
src/lib/
  components/        # Styled primitive wrappers and compositions
  styles/tokens.css  # Namespaced primitive and semantic tokens
  styles/base.css    # Library-scoped typography and shared styles
  index.ts          # Explicit public exports
src/routes/
  +layout.svelte    # Gallery shell
  +page.svelte      # Overview and representative composition
  foundations/     # Palette, type, spacing, radius, shadow, motion
  components/      # Interactive component examples and usage
src/demo/          # Synthetic content; excluded from package exports
docs/              # Source evidence, API decisions, validation results
```

Do not add a workspace monorepo or a separate documentation framework for this first release. Do not publish the package or deploy the gallery as part of this scope.

## Visual contract

Portal remains the visual authority. Use measured light-theme values: near-black `#181818`, white surfaces, green action fill `#19e783`, 100px pill radii, 16px card radii, and the layered shadows recorded in the audit. Separate primitive colors from semantic roles and namespace public variables with `--portal-` to avoid consumer collisions.

Preserve the distinction between source declarations and rendered computed styles. For example, a root button-shadow variable differs from the shadow computed on common pill buttons. Use the observed component value where reproducing that component.

Typography accepts a supplied Roobert font through a configurable family token. Do not redistribute font binaries without a supplied licensed asset. Use a documented system fallback initially and explicitly identify the resulting fidelity limitation in the gallery. Negative tracking, size, weight, and line height follow the measured type scale.

Before finalizing responsive and dark tokens, inspect controlled desktop/mobile viewports and the source's applicable theme CSS. If a source state cannot be observed, mark the corresponding implementation as an adaptation rather than an extraction. Unmeasured dark values must not be described as faithful. Reduced-motion support is an intentional accessibility adaptation.

## Public components

| Export        | Contract                                                                                           | Foundation                                          |
| ------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Button        | `variant`: primary/secondary/green; `size`: 32/40/48; disabled; native button props; child snippet | Bits UI Button, subject to current API verification |
| IconButton    | Accessible label required; same applicable size/variant conventions                                | Button                                              |
| Badge         | Noninteractive label; neutral/spotlight/status variants only where evidenced                       | Semantic HTML                                       |
| Avatar        | Image source, alt text, deterministic fallback, size                                               | Bits UI Avatar                                      |
| Input         | Native input props, stable id, labeled gallery examples, invalid and disabled states               | Native input                                        |
| Toggle        | Bindable pressed state, disabled, accessible name                                                  | Bits UI Toggle                                      |
| ToggleGroup   | Single selection, bindable value, named items, keyboard navigation                                 | Bits UI ToggleGroup                                 |
| Switch        | Bindable checked state, label, disabled                                                            | Bits UI Switch                                      |
| Dialog        | Bindable open state, title, optional description, trigger/content snippets                         | Bits UI Dialog                                      |
| Popover       | Bindable open state, trigger/content snippets, positioning props                                   | Bits UI Popover                                     |
| Tooltip       | Text/content, trigger snippet, keyboard-accessible trigger                                         | Bits UI Tooltip                                     |
| AppCard       | Title, category, description, image/alt, optional action; independent favorite control             | Composition                                         |
| SectionHeader | Heading, description, optional action snippet                                                      | Semantic HTML                                       |
| SidebarNav    | Navigation items with href, label, icon snippet, active indication                                 | Native nav and anchors                              |
| EmptyState    | Title, description, optional icon and action snippets                                              | Semantic HTML                                       |

Do not force Bits UI onto static display components. Use native links for navigation rather than buttons with click-driven routing. Confirm component-specific Bits UI APIs before writing wrappers; preserve native props and use Svelte 5 snippets rather than legacy slots.

Overlay wrappers must retain named titles, focus trapping where appropriate, Escape handling, outside interaction behavior, and focus restoration. Their DOM must remain themeable when portaled; apply theme scope to the portal content or configure its target deliberately.

## Portal chrome and shell

The library includes reusable application chrome, not only isolated controls. Add `PortalShell`, `TopBar`, and `MobileNav` compositions alongside `SidebarNav`. The shell owns responsive layout and spacing; consumer snippets supply branding, navigation, toolbar controls, and page content.

- Desktop sidebar: expanded and collapsed layouts, active route treatment, icon containers, dividers, optional summary card, and footer utilities.
- Top bar: search trigger, notification and favorite triggers, and an optional neutral account/status capsule. Do not couple these to wallet APIs.
- Responsive shell: measure Portal's actual mobile navigation and header arrangements before choosing breakpoints. Keep controls reachable at narrow widths and support safe-area insets where the reference requires them.
- Layering: consistent z-index roles for sticky chrome, popovers, modal overlays, and tooltips. Overlay content must not clip inside the shell's scroll containers.
- Demo compositions: notification panel, favorites panel with empty/populated states, and search surface using synthetic data. These demonstrate reusable primitives rather than extending the package into account services.

Keep account values, network data, and source branding outside the reusable shell. Chrome should carry the same visual language with consumer-supplied content.

## Micro-interactions and animation

Motion is part of fidelity, not an optional finishing pass. The existing observation establishes 300ms transitions with `cubic-bezier(.215,.61,.355,1)` on specific controls and list opacity; it does not establish every interaction's timing.

Capture each pattern's trigger, properties, duration, delay, easing, and interrupted/repeated behavior before labeling it source-matched:

| Pattern                     | Required behavior and evidence                                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Buttons and icon buttons    | Hover, press, focus-visible, and disabled feedback; measure fill/shadow/transform changes rather than inventing scale effects |
| Favorite toggle             | Immediate local pressed feedback, icon/fill state, keyboard equivalence; reproduce animation only if observed                 |
| Category and view selection | Active treatment and source-observed transition; selected state remains readable without motion                               |
| Cards                       | Hover/focus treatment, image or footer effects if observed; preserve nested action hit targets                                |
| Switch                      | Thumb travel and track color transition; preserve checked semantics                                                           |
| Dialog and popover          | Measured entry/exit opacity or transform, overlay behavior, dismissal, focus restoration, and scroll locking                  |
| Sidebar                     | Source-observed collapse/expand behavior; avoid focus loss during layout change                                               |
| Search and panels           | Open/close feedback and local filtered/empty states; no fabricated network loading                                            |
| Horizontal content rails    | Source-observed navigation behavior and disabled edge controls where included                                                 |

Define semantic motion tokens only after comparing observed timings across patterns. Animate explicit properties, not `transition: all`. Interrupting or reversing an animation must not leave hidden content focusable or controls stuck. Under `prefers-reduced-motion: reduce`, remove nonessential movement and keep state feedback immediate. Do not add celebration effects, spring physics, animated counters, or page choreography without source evidence.

Gallery examples must make motion inspectable with live interaction and document which behavior was extracted versus adapted. Responsive shell and overlays remain fully usable when animations are disabled.

## Gallery and content

The first viewport shows the system's actual components in use: sidebar, section header, representative cards, and live controls. It should resemble Portal's application shell while explaining the library. Foundations and component pages expose token values, states, short usage snippets, and source evidence.

Use fictional applications and explicitly label sample data as demo content. Favorite, filter, and grid/list controls update local demo state. Dialogs and popovers open and close. No auth, blockchain, wallet, payment, external follow, or trading integration is required. Images are neutral local assets with documented provenance or intentional fallback treatments.

Show disabled, selected, empty, long-label, and missing-image examples where applicable. Avoid adding variants solely to increase component count. Keep form error styling explicit and accessible; source gaps are documented.

## State and error handling

Use bindable primitive state without a global application store. Gallery filtering derives results from local synthetic data. Avatar and card media have deterministic fallbacks. Empty search results render EmptyState. Long titles wrap or truncate deliberately with an accessible full label. Essential actions must remain available without hover.

## Validation and acceptance

1. Type checking and production gallery build pass.
2. Library packaging passes; a minimal consumer fixture can import built components and styles without gallery dependencies.
3. Keyboard checks cover Dialog focus containment/restoration, Popover dismissal, Tooltip focus behavior, and ToggleGroup arrow-key selection.
4. Representative components match measured type, color, radius, spacing, and shadow values; compare at controlled viewports rather than eyeballing an unrelated page composition.
5. Gallery works at 390px and 1440px widths with no unintended page overflow. Test an intermediate width to catch shell/grid breakage.
6. Native semantics, accessible labels, visible focus, contrast, reduced motion, and image fallbacks receive targeted verification. Any intentional departure from the source is recorded.
7. Theme fidelity claims distinguish observed values from adaptations. If dark mode remains unverified, the faithful release is light-themed and the limitation is explicit.
8. Documentation contains imports, essential props, state examples, font caveat, evidence provenance, and unresolved limitations.
9. Expanded/collapsed desktop chrome and the measured mobile shell preserve navigation, focus, content width, and overlay stacking.
10. Motion checks cover rapid repeated toggles, closing during entry, reopening during exit, keyboard triggers, and reduced-motion preference. No animation leaves invisible focus targets or prevents the final state from being reached.

## Research remaining before component styling is finalized

- Controlled responsive measurements for shell, grids, cards, and heading changes.
- Source theme rules and available dark styles without persisting account settings.
- Representative overlay, filter, focus, and selected states through read-only or local UI interactions.
- A second public surface, such as Streams or app details, to distinguish shared patterns from discovery-specific compositions.

This research refines measured values within the approved architecture. It does not authorize account actions or expand into Portal backend functionality.
