# One SvelteKit repository

## Status

Accepted. The publishing limit is superseded by [ADR 0002](0002-publish-to-github-packages.md).

## Context

The library and the gallery both needed a home. A monorepo, a separate documentation site, and publishing were all open. The first deliverable is local.

## Decision

Use one SvelteKit repository. Export the library from `src/lib/index.ts`. Package it with the Svelte library packaging tool. Keep the gallery in `src/routes`. Keep Svelte and Bits UI as peer dependencies. Publishing is decided in [ADR 0002](0002-publish-to-github-packages.md). Do not deploy the gallery in this scope.

## Consequences

One install and one type check keep the library and the gallery in step.

Gallery routes and demo content have to stay out of the package exports. Deploying the gallery needs a later decision.
