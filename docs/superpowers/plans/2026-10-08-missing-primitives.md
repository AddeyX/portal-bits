# Missing primitives and docs layout

Audit date: 2026-10-08. Quality bar: the bits-ui.com docs and its component set.

## Primitive audit

Bits UI 2.19 ships 41 components. portal-bits wraps 9 of them (Avatar, Button, Checkbox,
Dialog, Popover, Switch, Toggle, ToggleGroup, Tooltip). Select and Input are native.

| Gap                                                                                      | Consumer need                                    | Priority |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------ | -------- |
| Tabs                                                                                     | Switch between panels of one view                | Add now  |
| Accordion                                                                                | Progressive disclosure for settings and FAQs     | Add now  |
| RadioGroup                                                                               | One choice among visible options in a form       | Add now  |
| Slider                                                                                   | A number in a range                              | Add now  |
| Progress                                                                                 | Task progress, determinate or not                | Add now  |
| DropdownMenu                                                                             | Row and toolbar actions                          | Add now  |
| AlertDialog                                                                              | Confirm a destructive action                     | Add now  |
| Separator                                                                                | A semantic or decorative divider                 | Add now  |
| Textarea (native)                                                                        | Multiline text; the only missing field type      | Add now  |
| Combobox / Command                                                                       | Searchable choice; the docs search already needs | Later    |
| Pagination                                                                               | Long record lists                                | Later    |
| Calendar / DatePicker                                                                    | Dates; needs `@internationalized/date` as a peer | Later    |
| ContextMenu, Menubar                                                                     | Desktop-app menus; rare in this product          | Later    |
| PinInput, RatingGroup                                                                    | Narrow use                                       | Later    |
| ScrollArea, Collapsible, Meter, Label, Toolbar, LinkPreview, NavigationMenu, AspectRatio | Covered by native CSS or existing components     | Skip     |

Every new visual value is an adaptation. None of it was measured on the source surface. Each
reuses existing tokens: segmented track for Tabs, Checkbox geometry for RadioGroup, popover
surface for DropdownMenu, Dialog for AlertDialog.

## Layout review (docs pages)

1. Bug: the component page's scoped `p { margin: 0 0 8px }` beats `.doc-lede`, so the lede sits
   8px above the preview instead of 32px. Scope the API styles to `.api-reference`.
2. "More examples" uses the browser's disclosure triangle. Draw a chevron in the system stroke.
3. The Source header wraps badly on phones: the file picker label stacks over the select and
   pushes the heading down. Put label and select on one line.
4. bits-ui.com gives every page an "On this page" rail and previous/next links. Add both: the
   rail at 1280px and wider, where 260px of the main column sits empty; the pager on every page.
5. Checkbox draws its check with a text glyph. Use the Lucide check so the stroke matches.

## Build order

1. Components, styles, tokens, exports.
2. Catalog, examples, variations, API reference, Bits UI links.
3. Tests: counts, contracts, behavior for each new component.
4. Docs layout fixes.
5. `docs/reference/components.md`, DESIGN.md, CHANGELOG.
