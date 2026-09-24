# Components

Contracts for the public components. The export list is `src/lib/index.ts`. Bits UI is the foundation only where a component needs its behavior. Static display components stay semantic HTML.

| Export        | Contract                                                                                                      | Foundation             |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Button        | `variant`: primary, secondary, or green. `size`: 32, 40, or 48. Disabled. Native button props. Child snippet. | Bits UI Button         |
| IconButton    | An accessible name is required. Size and variant follow Button where they apply.                              | Button                 |
| Badge         | Noninteractive label. Neutral, spotlight, and status variants only where evidenced.                           | Semantic HTML          |
| Avatar        | Image source, alt text, deterministic fallback, size.                                                         | Bits UI Avatar         |
| Input         | Native input props, stable id, invalid and disabled states.                                                   | Native input           |
| Toggle        | Bindable pressed state, disabled, accessible name.                                                            | Bits UI Toggle         |
| ToggleGroup   | Single selection, bindable value, named items, keyboard navigation.                                           | Bits UI ToggleGroup    |
| Switch        | Bindable checked state, label, disabled.                                                                      | Bits UI Switch         |
| Dialog        | Bindable open state, title, optional description, trigger and content snippets.                               | Bits UI Dialog         |
| Popover       | Bindable open state, trigger and content snippets, positioning props.                                         | Bits UI Popover        |
| Tooltip       | Text or content, trigger snippet, keyboard-accessible trigger.                                                | Bits UI Tooltip        |
| AppCard       | Title, category, description, image and alt, optional action. Favorite is an independent control.             | Composition            |
| SectionHeader | Heading, description, optional action snippet.                                                                | Semantic HTML          |
| EmptyState    | Title, description, optional icon and action snippets.                                                        | Semantic HTML          |
| SidebarNav    | Items with href, label, icon snippet, and active indication.                                                  | Native nav and anchors |
| MobileNav     | Narrow-width navigation.                                                                                      | Native nav and anchors |
| TopBar        | Search, notification, and favorite triggers, plus an optional account capsule.                                | Composition            |
| PortalShell   | Responsive layout. Snippets supply branding, navigation, toolbar, and page content.                           | Composition            |

`NavItem` is the public navigation-item type: `href`, `label`, optional `icon`, optional `count`.

Overlay wrappers keep a name, focus trapping where it applies, Escape, outside interaction, and focus restoration. Overlay content stays themeable. Set the theme scope on the overlay content, or set its target on purpose.
