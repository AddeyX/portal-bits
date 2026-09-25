# Content cards and carousel implementation plan

**Goal:** Ship the three components described in the [spec](../specs/2026-09-24-marketing-components-design.md).

**Architecture:** Two semantic cards and one generic collection component. Scoped component CSS uses existing shared tokens; Button owns article link styling.

**Tech stack:** Svelte 5, TypeScript, native scroll snapping, existing Bits UI Button, Vitest.

**Execution:** Native implementation in the current workspace, preserving pre-existing edits. The user requested spec followed by implementation in the same task.

## Global constraints

- Add no dependencies.
- Svelte and Bits UI remain peer dependencies.
- Documentation does not identify the inspected website.
- Synthetic local content only; unmeasured behavior is an adaptation.

## Review focus

- Failed image followed by a new URL must retry without losing navigation.
- Empty and single-item collections must not expose dead pagination controls.
- Replacing or shrinking items must not leave an invalid selected index.
- Arrow keys inside nested content must retain their native meaning.
- Narrow cards and container-driven grids must not overflow the page.

## Tasks

- [x] Add `tests/marketing-components.test.ts` to exercise public exports, image-error recovery, empty/single collections, pagination selection, keyboard boundaries, ignored nested keystrokes, native scroll selection, and item replacement. Run `npm test -- tests/marketing-components.test.ts` before implementation to confirm missing behavior.
- [x] Create `src/lib/components/ArticleCard.svelte` and `FeatureCard.svelte`. Export them from `src/lib/index.ts`. Use native articles and headings, image errors keyed by URL, scoped CSS, existing tokens, and Button with href for article navigation.
- [x] Create `src/lib/components/Carousel.svelte`. Export it. Use the spec's generic item interface, keyed list, a scroll event for closest-slide selection, immediate dot navigation, viewport-only keyboard handling, ResizeObserver cleanup, and an effect to reset after item-ID changes. Render dots only for two or more items; use container-query grid mode.
- [x] Add synthetic examples to `src/routes/components/+page.svelte` and local gallery styles. Reuse local artwork and show adaptation notes.
- [x] Update `docs/reference/components.md`, `docs/reference/marketing-dom-analysis.md`, `docs/dom-analysis.md`, `README.md`, and `CHANGELOG.md`. Keep measured values while removing site attribution from Markdown.
- [x] Run targeted tests, the full required checks, build/package, and autofix analysis. Inspect responsive layouts and interactions in the browser. Fix failures and record final results.

## Verification record

- Seven new tests first failed because the three components were absent. All seven pass after implementation; the complete suite passes 27 tests.
- Svelte check reports zero errors and zero warnings. Formatting, gallery build, and package build pass.
- Browser checks at 390px, 900px, and 1440px found no page overflow. Narrow layout scrolls; wide layout shows three columns and hides dots. Dot activation, retained focus, and Home navigation were observed.
- Light and dark cards were inspected. Programmatic scrolling computes to `auto`; no animation or smooth scrolling is introduced. Reduced-motion emulation was not separately exercised.
- Svelte autofixer reports no issues in the three new components. Its effect suggestions were reviewed: the carousel effect owns DOM scroll synchronization and ResizeObserver cleanup. Existing gallery route-link suggestions remain outside this change.
- A read-only review found incorrect gallery counts; all three gallery count locations now report the verified 28 component exports. No component defect was reported.
- Markdown scan finds no identifying website domain or brand references. Existing unrelated working-tree changes remain in place.
- The consumer test script is unavailable under the repository's documented prerequisite.

Ruling: keep intrinsic card heights and immediate scrolling as documented adaptations. This avoids sampled empty space and unmeasured animation timings.
