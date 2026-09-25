# Motion

Record a measurement before treating a pattern as measured. The concept is [fidelity](../concepts/fidelity.md).

| Pattern                     | Required behavior and evidence                                                                                                         |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Buttons and icon buttons    | Hover, press, focus-visible, and disabled feedback. Measure fill, shadow, and transform. Do not invent a scale effect.                 |
| Favorite toggle             | Immediate pressed feedback, icon and fill state, and the same result from the keyboard. Reproduce animation only when it was observed. |
| Category and view selection | Active treatment and any transition that was shown. The selected state stays readable without motion.                                  |
| Cards                       | Hover and focus treatment, plus image or footer effects when observed. Nested actions keep their hit targets.                          |
| Switch                      | Thumb travel and track color. Checked semantics stay intact.                                                                           |
| Dialog and popover          | Measured entry and exit, overlay, dismissal, focus restoration, and scroll locking.                                                    |
| Sidebar                     | Collapse and expand as measured. Focus survives the layout change. Until measured, the main column slides on `transform`.              |
| Search and panels           | Open and close feedback, and local filtered or empty states. No fabricated network loading.                                            |
| Horizontal content rails    | Navigation as measured, including disabled edge controls where they exist.                                                             |
