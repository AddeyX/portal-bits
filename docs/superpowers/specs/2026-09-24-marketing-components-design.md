# Content cards and carousel

## Outcome

Add ArticleCard, FeatureCard, and Carousel to the Svelte library. Developers can compose editorial content and feature collections using synthetic gallery examples. Existing components retain their measured visual identity. Documentation describes the design language without identifying the inspected website.

## Architecture and choice

ArticleCard and FeatureCard are semantic HTML compositions. Carousel owns collection layout and navigation, with a generic item snippet supplying content. Existing Button supplies article link styling. Svelte and Bits UI remain peer dependencies. Add no dependencies.

Native horizontal scrolling with CSS scroll snapping is selected over a carousel dependency or a transform-driven track. It supports touch and trackpad input without custom drag physics. The cost is implementing selection and control semantics locally. There is no autoplay, loop, virtual rendering, or controlled external index in this release.

## ArticleCard

Required: `title: string`, `href: string`. Optional: `image: string`, `imageAlt: string` (default empty), `actionLabel: string` (default Read), `headingLevel: 2 | 3 | 4` (default 3).

Render an article with 16:9 media, a heading, and one native navigation link styled by Button. Media has a measured 32px radius; the title uses measured 24/28px, weight 400. Keep content height intrinsic instead of reproducing the sampled 420px empty space. This is an adaptation. Missing or failed media uses a decorative token-colored placeholder, preserving geometry. A changed image URL can load after an earlier failure. No nested interactive elements, favorite, avatar, or category.

## FeatureCard

Required: `title: string`, `description: string`. Optional: image and imageAlt, `headingLevel: 2 | 3 | 4` (default 3). Render an article with media, heading, and description. Use measured 32px radius and 24px padding. Media fitting, typography, surface colors, and desktop composition reuse library conventions as adaptations. Missing/failed media has the same recovery contract as ArticleCard. Content wraps naturally, including long unbroken text. This is not an interactive card.

## Carousel

Props: required `label: string`, `items: T[]`, and `item: Snippet<[T]>`, where T extends `{ id: string; label: string }`. IDs must be unique and stable. Labels name slides and their destination controls. `layout: 'responsive' | 'carousel'` defaults to responsive.

Use a labeled section, a focusable horizontal viewport, a list, and keyed list items. Each slide has an accessible group label that includes position, total, and item label. Native links and buttons within slides remain independently usable. Offscreen content stays in DOM and can be reached by keyboard focus; the browser scrolls focused content into view.

Below 48rem of component width, show a horizontal track, a peek of the next slide, and pagination. At or above 48rem, responsive layout uses a three-column grid and hides pagination. The carousel layout always keeps the track. This component-width threshold and desktop grid are adaptations, not measured breakpoints. A container query avoids coupling behavior to the app shell's width.

Dots retain a 6px marker inside 44px controls. Each control has a destination name and `aria-current` for the selected item. The viewport supports ArrowLeft, ArrowRight, Home, and End when the viewport itself owns focus. Do not intercept keystrokes from slide content. Controls keep focus after activation. Navigation clamps at either end. Selection follows native scrolling. Changing the item IDs resets selection and scroll to the first item. Resize reconciles selection with visible geometry. Empty collections show no viewport or controls. Single-item collections show content without pagination.

Programmatic navigation is immediate, with no autoplay or smooth scrolling. This explicit adaptation also serves reduced-motion users. The viewport uses left-to-right navigation in v1; translated labels and bidirectional carousel semantics are outside this contract. Card text can still contain other scripts.

## Documentation and gallery

Document imports, props, snippets, empty collections, image recovery, navigation, font fallback, and adaptations. Keep the generic measurement record; remove identifying website links and names from Markdown documentation, including the README. Synthetic art remains local. Add examples to the components gallery with a separate responsive content section and a feature grid. Add an Unreleased changelog entry.

## Acceptance

- All three components export from the package and render under SSR.
- Article navigation is a single anchor; failed media preserves usable content and a later URL retries.
- Carousel dots, keyboard navigation, native scroll selection, empty/single collections, and item replacement work.
- Card content remains readable with long strings and missing imagery.
- Layout works at 390px, an intermediate width, and 1440px without unintended page overflow.
- Reduced-motion mode keeps immediate navigation; dark styling is labeled an adaptation.
- Run unit tests, Svelte check, formatting check, gallery build, package build, and Svelte autofixer on changed components.
- Consumer script remains unavailable until its existing documented prerequisite exists.
