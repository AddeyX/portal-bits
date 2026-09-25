# Marketing homepage DOM analysis

Inspected the public marketing homepage on 2026-09-24 (America/New_York).

## Scope and evidence

This inspection compares the public marketing homepage with the current exports in `src/lib/index.ts`, including the working-tree ColorSelector addition. It records the inspection-time candidate ranking. ArticleCard, Carousel, FeatureCard, and FloatingNav are now implemented; their current contracts are in [components](components.md).

Evidence comes from rendered DOM, computed styles, accessibility snapshots, screenshots, and menu and carousel interactions. Samples cover 1440 × 1000, 390 × 844, and the initial 615 × 945 viewport. These are sample widths, not measured breakpoint thresholds. Source CSS-module class names below are inspection locators and can change on deployment.

No wallet actions, account actions, or external application links were activated. Images, font binaries, animation assets, and source scripts were not copied. The existing [portal analysis](../dom-analysis.md) remains the authority for its measured surfaces.

## Recommended additions

Names below are proposals. Priorities reflect reuse and overlap with existing components.

| Priority | Candidate    | Homepage evidence                                                                              | Library fit                                                                                                                               |
| -------- | ------------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1        | ArticleCard  | “Our Articles”: image, title, and Read link                                                    | New semantic article composition; reuse Button link styling. Unlike AppCard, it has no avatar, favorite, or category.                     |
| 1        | Carousel     | Spotlight and article collections have slide dots at narrow widths; desktop uses rows or grids | Shared collection behavior with consumer-supplied slides. Keep pagination internal initially.                                             |
| 1        | FeatureCard  | “Engineered for Builders” has three image/title/description cards at narrow widths             | New static composition with media and content slots. Desktop source uses a canvas instead, so a desktop card grid would be an adaptation. |
| 2        | LogoStrip    | “Proudly backed by”: static desktop logo row, moving narrow layout                             | Accept consumer-supplied marks. An optional marquee needs reduced-motion and pause behavior.                                              |
| 2        | FloatingNav  | White pill navigation; Menu opens a separate rounded panel at narrow widths                    | Separate marketing composition from TopBar and SidebarNav; reuse Button and accessible disclosure/overlay behavior as appropriate.        |
| 2        | MediaCard    | “Build without boundaries”: four image-backed articles with overlaid copy                      | New media-led composition. Keep asymmetric grid layout in a recipe until another consumer needs it.                                       |
| 3        | ResourceLink | Four footer resource links combine imagery, heading, and arrow                                 | Small native-anchor composition; lower priority than cards and carousel.                                                                  |

ArticleCard, Carousel, FeatureCard, and FloatingNav are implemented. Their contracts live in [components](components.md).

## Extend or compose existing components

- **AppCard:** the homepage spotlight has artwork, a real profile image, category, title, and Visit action. Existing AppCard already covers much of this. Its avatar currently has no image prop, and its favorite control always renders. Consider an avatar source, optional favorite, and an explicit measured presentation before adding a second app-card export.
- **Button:** the source includes a 36px navigation size absent from the current 32/40/48 contract. Consider adding that measured size. Gradient appearance needs its own measurement before becoming a variant.
- **SectionHeader:** centered marketing headings and action groups can begin as a composition or variant. Keep portal typography intact.
- **Hero and footer:** start as gallery recipes using headings, media, actions, and native navigation lists. Their full-page layouts do not yet justify separate public exports.

## Measured samples

Dimensions describe the inspected content, not fixed component contracts.

| Element / locator                                                     | Desktop at 1440px                                                                     | Narrow at 390px                                                        |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Floating navigation, `.styles_content__RRhhw`                         | 960 × 56px; 100px radius; padding `0 12px 0 20px`                                     | 374 × 56px; same radius and padding                                    |
| Hero heading, `.styles_title__7SVhq`                                  | 56px font / 56px line height; weight 300                                              | 32px font / 32px line height                                           |
| Spotlight article, `.styles_container__c_kqw.styles_container__bACAK` | 472 × 256px; 32px radius; overflow hidden                                             | Collection exposes two slide-dot buttons; card dimensions not recorded |
| Article card, `.styles_card__yN8ul`                                   | 304 × 420px; transparent; no shadow; outer radius 16px                                | Approximately 322.2 × 420px                                            |
| Article media, `.styles_cardImage__v_YHg`                             | 304 × 171px; 32px radius                                                              | Approximately 322.2 × 181.2px; 32px radius                             |
| Article title, `.styles_cardText__AO_F0 .styles_title__POtPJ`         | 24px font / 28px line height; weight 400                                              | Not recorded                                                           |
| Article row, `.styles_cardWrapper__EYriI`                             | 960px wide; 24px gap; three cards                                                     | Replaced by carousel structure                                         |
| Builder feature item, `.styles_card__4JR1y`                           | Replaced by a canvas under `.styles_riveContainer__i6OnQ`                             | 32px radius; 24px padding; figure followed by text group               |
| Media article, `.styles_card__n3NVT`                                  | 400px high; alternating widths approximately 377.8/566.2px; 16px radius; 24px padding | 358 × 400px; same radius and padding                                   |
| Logo row, `.styles_logoGrid__gXbku`                                   | 920px wide; six figure elements                                                       | Moving duplicated logo track replaces visible row                      |
| Spotlight dot, `.styles_dot__R7f9U`                                   | No dot buttons in rendered desktop collection                                         | 6 × 6px; 50% radius; active `#181818`; inactive `rgba(24,24,24,.15)`   |

The navigation has a white background and this computed shadow:

```css
0 6px 10px -4px rgba(0, 0, 0, 0.12),
0 0 0 1px rgba(0, 0, 0, 0.05)
```

The desktop spotlight shadow computes to `1px 12px 24px rgba(0,0,0,.3)`. This differs from existing portal surfaces and should not replace their shared token globally.

## Interaction observations

### Carousel

At 390px, clicking the article collection's “Go to slide 2” button changes the active class to the second dot and translates `.styles_emblaContainer__dmZpI`. A screenshot confirms the second article occupies the main visible position. Adjacent content remains partially visible.

The source dots have accessible labels but no `aria-current` or `aria-pressed`. The 6px spotlight dot measurement describes visual size, not an acceptable proposed hit target. A library implementation should retain that visual marker inside a larger control and expose selection accessibly. Those behavior and hit-target choices are adaptations.

Dragging, arrow-key behavior, looping, autoplay, exact settling duration, interrupted motion, and focus handling were not verified. Class names containing `embla` are DOM evidence, not proof of a dependency version or an instruction to add it.

### Navigation

At 615px, Menu changes to Close and opens a rounded panel with navigation links and actions. The underlying page visibly blurs. Escape did not dismiss the panel in the tested state. Clicking Close dismissed it.

The inspected trigger had no `aria-expanded` or `aria-controls`. Several navigation CTAs nest a button inside an anchor. Preserve measured appearance while using a single anchor for navigation and explicit disclosure semantics. Focus containment, outside dismissal, scroll locking, and keyboard behavior require further inspection or an explicit adaptation.

### Logos and animation

The visible narrow logo track computes to a 20s linear animation with a duplicated set of figures. The desktop row is static. Navigation declares a 0.75s animation with `cubic-bezier(.215,.61,.355,1)`.

These declarations are partial motion evidence. Animated properties, delays, interruption behavior, and reduced-motion handling were not fully measured. They do not establish complete shared motion tokens. See [fidelity](../concepts/fidelity.md).

## Boundaries and remaining work

- “Build the future” exists in the DOM but its section has `display: none` at both controlled widths. Do not promote its cards or carousel as a visible source pattern.
- The desktop builder canvas does not expose its internal visual structure as DOM components. Replacing it with static cards is an adaptation.
- The marketing page uses different typography and some larger radii than the portal. Add scoped styles rather than changing existing visual identity globally.
- Keep demo content synthetic. Supply neutral illustrations and consumer-owned logos. Retain the existing consumer-supplied font policy.
- Before implementation, measure candidate hover/focus states, breakpoint thresholds, image fitting, overflow, and complete motion behavior. New accessibility behavior, dark styles, and unmeasured layouts must be labeled adaptations.
- No accordion, tabs, pricing table, or testimonial component was evidenced in the visible homepage. Do not add these based on this inspection.
