# portal-bits

## Global laws

- One term, one meaning.
- Label an unmeasured behavior as an adaptation.
- A semantics change keeps the measured visual identity.
- Demo content stays synthetic, with no wallet, chain, or account calls.
- Public exports are library components, tokens, and styles.
- Svelte and Bits UI stay peer dependencies.
- The package publishes to the public npm registry as `portal-bits`. The gallery deploys to GitHub Pages. Font files in the package are a later decision.
- Do not commit changes unless explicitly communicated.

## Context

Read context based on task. Do not read every project document by default.

- Product purpose, users, constraints → `PRODUCT.md`
- Visual tokens, component styling, named design rules → `DESIGN.md`
- Library, gallery, or shell structure → `docs/architecture/README.md`
- Terms → `docs/glossary.md`
- Product guardrails → `docs/principles.md`
- Fidelity, measured values, adaptation → `docs/concepts/fidelity.md`
- DOM measurements → `docs/dom-analysis.md`
- Component contracts → `docs/reference/components.md`
- Motion patterns → `docs/reference/motion.md`
- Docs rules and map → `docs/README.md`
- Running the gallery → `docs/guides/run-the-gallery.md`
- Deploying the gallery → `docs/guides/deploy-the-gallery.md`

## Completion

- `npm test`, `npm run check`, and `npm run format:check` pass before the task is complete.
- Acceptance checks for the change → `docs/guides/verify-a-change.md`
- Treat `npm run test:consumer` as unavailable until `scripts/check-consumer.mjs` exists.
- Update the doc nearest the change.
- A user-visible change gets a changelog entry under Unreleased.

## Commits & Pull Requests

- Conventional Commits.
- A pull request answers what changed, why, how it was verified, and whether docs were updated.
