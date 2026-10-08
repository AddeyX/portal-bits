---
name: portal-bits
description: A measured design language as Svelte 5 components, on cool neutrals with one green signal.
colors:
  action-green: '#19e783'
  action-green-hover: '#2fbf7a'
  action-green-text: '#087346'
  action-green-soft: '#e4f9ed'
  deep-forest: '#05472a'
  ink: '#181818'
  inverse-hover: '#353535'
  muted-slate: '#686e78'
  subtle-slate: '#9da3ac'
  quiet-canvas: '#f8faff'
  white-surface: '#ffffff'
  soft-mist: '#f2f4f9'
  hairline: '#edeff3'
  control-edge: '#878e98'
  focus-green: '#008746'
  error-red: '#bf2424'
typography:
  headline:
    fontFamily: "'Roobert', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: '32px'
    fontWeight: 500
    lineHeight: '40px'
    letterSpacing: '-0.32px'
  title:
    fontFamily: "'Roobert', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: '24px'
    fontWeight: 500
    lineHeight: '32px'
    letterSpacing: '-0.24px'
  body-large:
    fontFamily: "'Roobert', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: '16px'
    fontWeight: 400
    lineHeight: '24px'
  body:
    fontFamily: "'Roobert', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: '14px'
    fontWeight: 400
    lineHeight: '20px'
    letterSpacing: '-0.14px'
  supporting:
    fontFamily: "'Roobert', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: '13px'
    fontWeight: 400
    lineHeight: '18px'
  label:
    fontFamily: "'Roobert', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: '12px'
    fontWeight: 400
    lineHeight: '18px'
  mono:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: '12px'
    lineHeight: '21px'
rounded:
  checkbox: '4px'
  tooltip: '8px'
  nav: '10px'
  surface: '16px'
  dialog: '24px'
  field: '32px'
  pill: '100px'
  circle: '50%'
spacing:
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '16px'
  '6': '24px'
  '8': '32px'
components:
  button-primary:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.white-surface}'
    typography: '{typography.body}'
    rounded: '{rounded.pill}'
    height: '40px'
    padding: '0 21px'
  button-primary-hover:
    backgroundColor: '{colors.inverse-hover}'
  button-secondary:
    backgroundColor: '{colors.white-surface}'
    textColor: '{colors.ink}'
    typography: '{typography.body}'
    rounded: '{rounded.pill}'
    height: '40px'
    padding: '0 21px'
  button-secondary-hover:
    backgroundColor: '{colors.soft-mist}'
  button-green:
    backgroundColor: '{colors.action-green}'
    textColor: '{colors.ink}'
    typography: '{typography.body}'
    rounded: '{rounded.pill}'
    height: '40px'
    padding: '0 21px'
  button-green-hover:
    backgroundColor: '{colors.action-green-hover}'
  button-small:
    height: '32px'
    padding: '0 14px'
  button-large:
    height: '48px'
    padding: '0 16px'
  input:
    backgroundColor: '{colors.white-surface}'
    textColor: '{colors.ink}'
    typography: '{typography.body}'
    rounded: '{rounded.field}'
    height: '40px'
    padding: '0 16px'
  toggle-on:
    backgroundColor: '{colors.action-green-soft}'
    textColor: '{colors.action-green-text}'
    rounded: '{rounded.pill}'
    height: '36px'
  badge:
    backgroundColor: '{colors.soft-mist}'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.pill}'
    padding: '5px 10px'
  card:
    backgroundColor: '{colors.white-surface}'
    rounded: '{rounded.surface}'
  dialog:
    backgroundColor: '{colors.white-surface}'
    rounded: '{rounded.dialog}'
    padding: '24px'
    width: '480px'
  tooltip:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.white-surface}'
    typography: '{typography.label}'
    rounded: '{rounded.tooltip}'
    padding: '8px 12px'
  nav-link:
    textColor: '{colors.muted-slate}'
    typography: '{typography.body}'
    rounded: '{rounded.nav}'
    height: '44px'
  nav-link-active:
    backgroundColor: '{colors.quiet-canvas}'
    textColor: '{colors.ink}'
---

# Design System: portal-bits

## Overview

**Creative North Star: "The Measured Specimen"**

Every value in this system can be traced to where it came from, like a specimen sheet. It was either observed on the source surface and written down in `docs/dom-analysis.md`, or it is labeled an adaptation where it is defined. The result reads as calm and exact: white surfaces float on a faintly blue canvas, ink does the talking, and a single saturated green means "act" or "on".

Controls are tactile and friendly. Buttons are raised pills with a short, soft lift and a 1px ring. They sink under an inset shadow when pressed. Surfaces are soft, rounded panels lifted by a diffuse three-layer shadow rather than outlined. Density is moderate: 40px controls, 16px surface corners, and a 4px spacing scale that mostly steps by 8.

The measured theme is light. The dark theme is an adaptation that swaps the neutral tokens and keeps the same shapes, and it does not claim to be a measured dark theme.

**Key Characteristics:**

- Cool neutral canvas, white raised surfaces, ink text.
- One signal color, action green, for primary fills and checked states.
- Pills for anything you press or type into; 16px rounded rectangles for anything that holds content.
- Soft offset shadows with a faint ring, never hard edges.
- Medium weight at most; hierarchy comes from size and tight tracking.

## Colors

A restrained cool-neutral palette with one very particular green.

### Primary

- **Action Green** (`action-green`): the fill for the green button, a checked Switch or Checkbox, and the active sidebar icon. Text on it is ink. Consumers can replace it through `--portal-accent`.
- **Action Green Hover** (`action-green-hover`): the hover fill of the green button.
- **Action Green Text** (`action-green-text`): green used as text, as in a pressed Toggle, search match highlights, and the active mobile nav item. The fill green is too light to be text on white.
- **Action Green Soft** (`action-green-soft`): the pale mint background of a pressed Toggle.
- **Deep Forest** (`deep-forest`): text-selection ink and the foreground on the active nav icon.

### Neutral

- **Ink** (`ink`): primary text, the primary button fill, and the tooltip. As `--portal-inverse`, it flips to near-white in the dark theme.
- **Inverse Hover** (`inverse-hover`): the primary button's hover fill.
- **Muted Slate** (`muted-slate`): secondary text, placeholders, labels, and resting nav links. This is a contrast adaptation of the source's tertiary text.
- **Subtle Slate** (`subtle-slate`): the measured source tertiary color. Used only for decoration, such as empty-state icons and read-notification dots, because it is below text contrast.
- **Quiet Canvas** (`quiet-canvas`): the page background and the active nav link fill.
- **White Surface** (`white-surface`): cards, dialogs, popovers, inputs, and secondary buttons.
- **Soft Mist** (`soft-mist`): badges, the segmented-control track, code blocks, and secondary hover.
- **Hairline** (`hairline`): dividers, card borders, and the off Switch track.
- **Control Edge** (`control-edge`): the border of Input, Select, and Checkbox, and the edge of the off Switch. This is a 3:1 contrast adaptation of the hairline.
- **Focus Green** (`focus-green`): the 2px focus ring and the input caret.
- **Error Red** (`error-red`): invalid borders, Alert text, and field errors.

### Named Rules

**The One Signal Rule.** Action green marks an action or an on state. It is not decoration, and it is never text on white; green text uses Action Green Text.

**The Traceable Value Rule.** A new color is either measured and recorded, or it is labeled an adaptation where the token is defined. There is no third kind.

## Typography

**Display Font:** Roobert (with Inter, then the system sans)
**Body Font:** Roobert (with Inter, then the system sans)
**Label/Mono Font:** the system monospace stack, for code and hex values only

**Character:** A single humanist grotesk carries the whole system. The repository does not ship Roobert. Consumers supply it through `--portal-font`, and Inter stands in by default.

### Hierarchy

- **Headline** (500, 32px at 1280px and wider, 28px below, 24px on phones; tracking -0.32px to -0.56px): section headers.
- **Title** (500, 24px, 32px line): dialog titles and compact headings.
- **Body Large** (400, 16px, 24px line): feature card descriptions.
- **Body** (400, 14px, 20px line, -0.14px tracking): controls, nav links, inputs, and running text in panels.
- **Supporting** (400, 13px, 18px line): search result details and secondary lines.
- **Label** (400, 12px, 18px line): badges, tooltips, breadcrumbs, and captions.

### Named Rules

**The Medium Ceiling Rule.** Library type never goes above weight 500. Emphasis comes from size and negative tracking, not bold.

## Layout

Spacing follows a 4px scale exposed as `--portal-space-1` to `--portal-space-8` (4, 8, 12, 16, 24, 32px). Most gaps are 8 or 16px, and section padding is 24px. Controls sit on three heights: 32, 40, and 48px.

The application shell has a fixed 236px sidebar that collapses to 88px. At 767px and narrower, the sidebar gives way to a bottom navigation bar that clears the phone's safe area. When the sidebar collapses, the main column lays out once and slides on a transform. FloatingNav and Carousel respond to their container, not the viewport: FloatingNav folds its links into a menu at 640px, and Carousel becomes a three-column grid from 48rem. Dialogs are at most 480px wide and keep 16px from each viewport edge.

## Elevation & Depth

Depth comes from soft shadows, not borders. Controls get a short offset lift with a faint 1px ring, and surfaces get a diffuse, slightly blue-tinted ambient shadow. Overlays add a larger, softer drop. Pressing a button replaces its lift with an inset shadow, so it feels physically pushed.

### Shadow Vocabulary

- **Control lift** (`box-shadow: 0 6px 10px -4px rgb(0 0 0 / 12%), 0 0 0 1px rgb(0 0 0 / 5%)`): buttons and FloatingNav.
- **Icon lift** (`box-shadow: 0 1px 4px rgb(0 0 0 / 12%), 0 0 0 1px rgb(0 0 0 / 5%)`): icon buttons, toggles, and the selected segment.
- **Surface ambient** (`box-shadow: 0 3px 5px rgb(200 206 215 / 25%), 0 2px 3px rgb(135 175 199 / 12%), 0 4px 10px rgb(222 228 235 / 25%)`): cards on hover and gallery panels.
- **Pressed** (`box-shadow: inset 0 1px 3px rgb(0 0 0 / 14%)`): the active button state.
- **Dialog drop** (`box-shadow: 0 24px 80px rgb(0 0 0 / 18%)`): dialogs, over a 35% black overlay with a 6px blur.

### Named Rules

**The Soft Lift Rule.** Every shadow has an offset and a soft blur. A zero-blur or hard offset shadow does not belong here.

## Shapes

The shapes follow a two-part rule. Things you press or type into are pills: buttons, toggles, segmented controls, and badges use a 100px radius, and inputs use 32px. Icon buttons, avatars, and swatches are circles. Things that hold content are 16px rounded rectangles, and dialogs are softer at 24px. Nav links (10px), tooltips (8px), and checkboxes (4px) are the small exceptions. Borders are 1px and quiet. The only strong edge is the control edge on form fields.

## Components

### Buttons

- **Shape:** full pill (100px), 32, 40, or 48px tall.
- **Primary:** ink fill with white text, and 21px side padding at 40px.
- **Green:** action-green fill with ink text. It uses the accent tokens when a consumer sets them.
- **Secondary:** white fill with ink text; hover moves to soft mist.
- **Hover / Focus:** 300ms color and shadow transitions on the shared ease. Focus is a 2px focus-green ring offset by 4px. Pressing swaps the lift for an inset shadow. Disabled drops to 42% opacity.
- **Quiet:** an inline underlined text action with no pill or shadow.
- **Links:** inside themed content, a plain link inherits the surrounding text color and keeps its underline, offset 4px.

### Chips

- **Style:** Badges are soft-mist pills with 12px ink text. Spotlight and success variants exist only where evidenced.
- **State:** Toggles rest white with muted text and turn pale mint with green text when pressed. The selected segment in a ToggleGroup lifts onto white.

### Cards / Containers

- **Corner Style:** 16px, or 32px on feature and article media.
- **Background:** white surface on quiet canvas.
- **Shadow Strategy:** flat with a hairline border at rest; surface ambient on hover.
- **Border:** 1px hairline on app cards; none on spotlight cards.
- **Internal Padding:** 14 to 24px.

### Inputs / Fields

- **Style:** 40px tall, 32px radius, white fill, 1px control-edge border, 16px side padding (40px with an icon). The label sits above the field. `hideLabel` keeps it for assistive tech only.
- **Focus:** the shared focus ring, with a focus-green caret.
- **Error / Disabled:** error-red border with an announced message below; disabled at 50% opacity.

### Navigation

- **Sidebar:** 44px rows in muted text, each with a 36px icon tile. The active row fills with quiet canvas and its tile turns green.
- **FloatingNav:** a white 56px pill bar with a control lift. The active link is an ink pill with white text.
- **Mobile:** a bottom bar of icon-over-label links; the active link turns green, using `--portal-accent-text` or focus green by default.

### Disclosure and progress

- **Tabs:** the segmented track; the selected tab lifts onto white. Panels sit 16px below.
- **Accordion:** hairline rows, 56px triggers in 15px medium text, and a 28px round chevron that turns ink when open. Content opens with a height animation.
- **Slider and Progress:** a soft-mist track with a hairline ring and an action-green fill. The slider thumb is a 20px white circle with the icon lift.
- **RadioGroup:** the Checkbox geometry as a circle, filled action green with an ink dot.

All four are adaptations; none was measured.

### Overlays

Dialogs and popovers enter by rising 8px and scaling from 98.5% over 300ms, and exit in 160ms. Tooltips are ink pills with 8px corners. DropdownMenu uses the popover surface with 36px rows and 10px row corners. AlertDialog is a Dialog with Cancel and a confirm button; its danger tone fills with error red (an adaptation). All of these accept a `theme` so their portaled content matches the page.

## Do's and Don'ts

### Do:

- **Do** reference `--portal-*` tokens for color, spacing, radius, shadow, and motion so consumer overrides reach every component.
- **Do** label any unmeasured value as an adaptation where it is defined, as the muted text and control edge are.
- **Do** keep control edges at 3:1 or better against their background.
- **Do** use Action Green Text, not Action Green, whenever green is text.
- **Do** honor reduced motion: state changes stay, movement goes.

### Don't:

- **Don't** set library type heavier than 500.
- **Don't** use Subtle Slate for text or for icons that carry meaning.
- **Don't** outline a surface when a soft lift will do; borders are hairlines.
- **Don't** present the dark theme as measured.
- **Don't** use hard offset or zero-blur shadows.
