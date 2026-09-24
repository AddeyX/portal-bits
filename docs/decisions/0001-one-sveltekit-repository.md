# One SvelteKit repository

## Status

Accepted

## Context

The library and the gallery both needed a home. A monorepo, a separate documentation site, and publishing were all open. The first deliverable is local.

## Decision

Use one SvelteKit repository. Export the library from `src/lib/index.ts`. Package it with the Svelte library packaging tool. Keep the gallery in `src/routes`. Keep Svelte and Bits UI as peer dependencies. Do not publish the package or deploy the gallery in this scope.

## Consequences

One install and one type check keep the library and the gallery in step.

Gallery routes and demo content have to stay out of the package exports. Publishing or deploying needs a later decision.
