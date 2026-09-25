# Components

Contracts for the public components. The export list is `src/lib/index.ts`. Bits UI is the foundation only where a component needs its behavior. Static display components stay semantic HTML.

| Export        | Contract                                                                                                             | Foundation             |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Button        | `variant`: primary, secondary, green, or quiet. `size`: 32, 40, or 48. Disabled. Native button props. Child snippet. | Bits UI Button         |
| IconButton    | An accessible name is required. Size and variant follow Button where they apply.                                     | Button                 |
| Badge         | Noninteractive label. Neutral, spotlight, and status variants only where evidenced.                                  | Semantic HTML          |
| Avatar        | Image source, alt text, deterministic fallback, size.                                                                | Bits UI Avatar         |
| Input         | Native input props, stable id, invalid and disabled states.                                                          | Native input           |
| Toggle        | Bindable pressed state, disabled, accessible name.                                                                   | Bits UI Toggle         |
| ToggleGroup   | Single selection, bindable value, named items, keyboard navigation.                                                  | Bits UI ToggleGroup    |
| Switch        | Bindable checked state, label, disabled.                                                                             | Bits UI Switch         |
| Dialog        | Bindable open state, title, optional description, trigger and content snippets.                                      | Bits UI Dialog         |
| Popover       | Bindable open state, trigger and content snippets, positioning props.                                                | Bits UI Popover        |
| Tooltip       | Text or content, trigger snippet, keyboard-accessible trigger.                                                       | Bits UI Tooltip        |
| AppCard       | Title, category, description, image and alt, optional action. Favorite is an independent control.                    | Composition            |
| SectionHeader | Heading, description, optional action snippet.                                                                       | Semantic HTML          |
| EmptyState    | Title, description, optional icon and action snippets.                                                               | Semantic HTML          |
| SidebarNav    | Items with href, label, icon snippet, and active indication.                                                         | Native nav and anchors |
| MobileNav     | Narrow-width navigation.                                                                                             | Native nav and anchors |
| TopBar        | Search, notification, and favorite triggers, plus an optional account capsule.                                       | Composition            |
| PortalShell   | Responsive layout. Snippets supply branding, navigation, toolbar, and page content.                                  | Composition            |
| AuthFrame     | Centered compact or reading panel with required brand link and children snippets.                                    | Semantic HTML          |
| Checkbox      | Bindable boolean, required label snippet, disabled, required, invalid, and form name.                                | Bits UI Checkbox       |
| Select        | Visible label, bindable string, options, optional empty placeholder, and native form props.                          | Native select          |
| Alert         | Message string or inline children snippet, announced in a paragraph.                                                 | Semantic HTML          |
| RowList       | Unordered list of consumer-supplied rows.                                                                            | Semantic HTML          |
| Row           | Wrapping list item with consumer-supplied cells and a bottom hairline.                                               | Semantic HTML          |

`NavItem` is the public navigation-item type: `href`, `label`, optional `icon`, optional `count`.

Overlay wrappers keep a name, focus trapping where it applies, Escape, outside interaction, and focus restoration. Overlay content stays themeable. Set the theme scope on the overlay content, or set its target on purpose.

## Short tasks and records

Import `AuthFrame`, `Checkbox`, `Select`, `Alert`, `RowList`, `Row`, and `Button` from `@addeyx/portal-bits`. Import `@addeyx/portal-bits/styles.css` once. These patterns are adaptations. Their dimensions and behavior have not been measured against the source. They reuse the existing semantic colors and typography. The font token accepts consumer-supplied Roobert; Inter and system fonts remain the fallback. No font files are bundled.

### Quiet Button

`variant="quiet"` renders a native button for an inline action. It inherits the surrounding type and color. Its label has an underline with a 4px offset. It has no fill, border, shadow, or padding. `size` does not apply. Native button attributes and the children snippet still apply. Disabled actions stay visible and do not fire. Use a consumer-owned anchor for navigation. The other variants retain their existing Bits UI button/link API.

### AuthFrame

`brandHref` is the required destination for the brand link. The required `brand` snippet supplies its mark and name. The required `children` snippet supplies panel content. `size` defaults to `compact` (28rem maximum width); `reading` uses 40rem. Both shrink within the padded viewport. The frame centers the brand and panel vertically and horizontally, and grows for long content. The panel has a solid surface, hairline border, padding, and 20rem minimum height.

The frame provides no navigation, top bar, skip link, footer, or main landmark. The consumer owns content semantics and form structure. `PortalShell` remains the application frame. Preview both sizes at `/auth-preview` and `/auth-preview?size=reading`.

### Checkbox

Bits UI owns keyboard interaction and boolean state. `checked` is bindable and defaults to false. The required `label` snippet names the control through a stable association. Clicking the label or box toggles it. An inline label link remains its own tab stop and navigates without toggling. `disabled` disables only the box; the label remains readable and its links remain usable.

`required` participates in native form validation even without `name`. `name` submits the checked value (default `on`). Unchecked and disabled boxes are omitted. `invalid` sets `aria-invalid`; consumers render associated errors using `Alert` and `aria-describedby`. An explicit `id` is optional. Indeterminate state, descriptions, and option groups are outside this contract.

### Select

A native single-choice select, styled like `Input`, with a required visible `label`. A generated stable id associates the label; consumers may supply `id`. `value` is a bindable string that defaults to empty. `options` uses the exported `SelectOption` type: `{ value: string; label: string; disabled?: boolean }`. Option values must be unique. Reserve the empty value for the placeholder when one is supplied.

`placeholder` adds an enabled empty option so the selection can return to empty. Without a placeholder, an empty value leaves no option selected. `disabled`, `required`, `name`, and other native attributes retain native behavior. An empty required selection fails validation. `invalid` sets `aria-invalid`. Keyboard opening, typeahead, and form participation remain native. Search, multiple selection, and custom popups are outside this contract.

### Alert

Supply either a `message` string or a short inline children snippet. The component renders a paragraph with `role="alert"` in normal flow. Mount it when an action fails, update it when the message changes, and remove it when cleared. There is no dismissal, icon, or heading. Use `id` to associate it with a control. Collection empty states remain `EmptyState`.

### RowList and Row

`RowList` renders a `ul`; place `Row` children inside it. Each `Row` renders an `li` with one or more consumer-supplied cells. Cells use a horizontal layout with distributed free space and gaps. They wrap when space runs out. The bottom hairline stays beneath the whole row. Link styling belongs to the consumer. Quiet buttons keep their underlines.

Rows do not imply navigation or selection. Sorting, pagination, column headers, and definition-list layouts remain consumer concerns.

```svelte
<script lang="ts">
  import { Checkbox, Select, Alert, RowList, Row, Button } from '@addeyx/portal-bits';
  let agreed = $state(false);
  let category = $state('');
  let error = $state('');
</script>

<Select
  label="Category"
  name="category"
  bind:value={category}
  required
  placeholder="Choose a category"
  options={[{ value: 'notes', label: 'Notes' }]}
/>
<Checkbox name="terms" bind:checked={agreed} required>
  {#snippet label()}I agree to the <a href="/terms">terms</a>.{/snippet}
</Checkbox>
{#if error}<Alert message={error} />{/if}
<RowList aria-label="Drafts">
  <Row><span>Field notes</span><Button variant="quiet" onclick={() => {}}>Retry</Button></Row>
</RowList>
```

## ColorSelector

Import `ColorSelector` from `@addeyx/portal-bits` and load `@addeyx/portal-bits/styles.css` once. The selector is an adaptation: its presets, gradient dimensions, and interactions are unmeasured. It reuses the existing popover radius, shadow, typography, and entry/exit motion, including reduced-motion behavior. Roobert remains consumer-supplied, with Inter/system fallbacks.

`value` is a bindable hex string, defaulting to `#19e783`. `open` is bindable; `label` defaults to “Accent color”; `theme` accepts `light` or `dark`. `onValueChange` receives normalized six-digit hex strings on user changes. Invalid external values display default green until replaced by a valid selection.

Five fixed presets are green, blue, violet, rose, and amber. The sixth, rainbow, expands a saturation/brightness gradient with pointer dragging, keyboard-accessible hue/saturation/brightness sliders, and a hex field. Three- and six-digit hex input is accepted; invalid input shows an error without changing the selected color. Escape and outside interaction dismiss the popover and restore trigger focus. Selection applies immediately and keeps the popover open. Alpha is outside this contract.

```svelte
<script lang="ts">
  import { ColorSelector } from '@addeyx/portal-bits';
  let accent = $state('#19e783');
</script>

<ColorSelector bind:value={accent} />
```

The component does not mutate global styles. Consumers own accent application and persistence. Set `--portal-accent` for accent fills and `--portal-accent-foreground` for contrasting text; `--portal-selected-hover`, `--portal-accent-nav`, `--portal-accent-soft`, `--portal-accent-text`, and `--portal-accent-focus` customize related states. Put these properties on a shared ancestor (such as the document root) to reach portaled overlays. Legacy `--portal-green` and Button's `green` variant remain compatible. Default green retains existing token values.

The gallery mounts this control in the top-right toolbar. Layout-owned state updates accent tokens across routes and overlays, with contrasting text and theme-aware focus colors. Reload resets to green; no storage or account calls occur. Status colors and demo artwork remain independent of the accent.

## Content cards and carousel

Import `ArticleCard`, `FeatureCard`, and `Carousel` from `@addeyx/portal-bits`; load `@addeyx/portal-bits/styles.css` once. Measured geometry is recorded in the [marketing analysis](marketing-dom-analysis.md). The [design spec](../superpowers/specs/2026-09-24-marketing-components-design.md) records scope and adaptations. Roobert is consumer-supplied, with Inter/system fallbacks. No font files are bundled.

### ArticleCard

Required props are `title` and `href`. Optional props are `image`, `imageAlt` (default empty for decorative imagery), `actionLabel` (default `Read`), and `headingLevel` (`2 | 3 | 4`, default `3`). An article contains 16:9 media, a heading, and one native navigation link. Its accessible link name combines the action label and title. There are no nested buttons or whole-card click handlers.

Media uses the measured 32px radius; the title uses 24/28px at weight 400. Intrinsic card height, 16px spacing, image fitting, and fallback art are adaptations. Missing or failed imagery preserves the media region and readable content. Supplying a new URL retries the image. Consumer text is rendered as text, not HTML.

### FeatureCard

Required props are `title` and `description`. Optional `image`, `imageAlt`, and `headingLevel` follow ArticleCard. The static article contains media and copy, with measured 32px outer radius and 24px padding. A 4:3 media ratio, 16px inner radius, typography, token-colored surfaces, desktop composition, and missing-image treatment are adaptations. The card does not imply navigation or selection.

### Carousel

Supply `label`, `items`, and an `item` snippet. Items may carry any data but must include unique stable `id: string` and descriptive `label: string` fields. The snippet receives the typed item. `layout` defaults to `responsive`; `carousel` retains scrolling at all widths.

Responsive layout switches from a horizontal track to a three-column grid at 48rem of component width. This threshold is an adaptation. Native touch/trackpad scrolling and keyboard focus can reveal offscreen content. Dots provide 44px targets around 6px markers and expose selection through `aria-current`. Arrow keys, Home, and End navigate when the viewport itself has focus. Nested links and controls retain their own keys. Navigation clamps at the ends and keeps focus on its trigger.

An empty collection has no viewport or controls. A single item has no pagination. Changing item IDs or their order resets to the first item; changing copy under stable IDs preserves selection. Resize reconciles selection with visible geometry. There is no autoplay, looping, external index binding, or custom drag physics. Programmatic navigation is immediate, including under reduced motion. The track uses left-to-right navigation; bidirectional carousel controls are outside this version's contract. Dark colors use the library's existing adaptation.

```svelte
<script lang="ts">
  import { ArticleCard, FeatureCard, Carousel } from '@addeyx/portal-bits';
  const stories = [
    { id: 'notes', label: 'Field notes', href: '/notes', image: '/art/field.svg' },
    { id: 'studio', label: 'Inside the studio', href: '/studio', image: '/art/orbit.svg' },
  ];
</script>

<Carousel label="Journal" items={stories}>
  {#snippet item(story)}
    <ArticleCard title={story.label} href={story.href} image={story.image} />
  {/snippet}
</Carousel>
<FeatureCard title="Room to explore" description="Give each idea space to grow." />
```
