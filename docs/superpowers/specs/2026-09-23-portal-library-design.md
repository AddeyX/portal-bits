# Bits UI library

Status: design approved on 2026-09-23. Shell and motion requirements were added from a follow-up. Direction: a faithful library, with neutral demo content.

This file is the approval record. The living docs hold the design.

## Where it lives

- System shape: [architecture](../../architecture/README.md)
- Fidelity: [concepts/fidelity.md](../../concepts/fidelity.md)
- Library and gallery: [concepts/library-and-gallery.md](../../concepts/library-and-gallery.md)
- Components: [reference/components.md](../../reference/components.md)
- Motion patterns: [reference/motion.md](../../reference/motion.md)
- Measurements: [DOM analysis](../../dom-analysis.md)
- Verification: [guides/verify-a-change.md](../../guides/verify-a-change.md)
- Repository decision: [ADR 0001](../../decisions/0001-one-sveltekit-repository.md)

## Research remaining

- Controlled responsive measurements for the shell, grids, cards, and heading changes.
- Theme rules and available dark styles, without persisting account settings.
- Representative overlay, filter, focus, and selected states through read-only or local UI interactions.
- A second public surface, such as Streams or app details, to separate shared patterns from discovery-specific compositions.

This research refines measured values inside the approved architecture. It does not authorize account actions or backend work.
