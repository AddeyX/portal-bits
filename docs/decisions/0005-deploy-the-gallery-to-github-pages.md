# Deploy the gallery to GitHub Pages

## Status

Accepted.

## Context

[ADR 0001](0001-one-sveltekit-repository.md) kept the gallery in this repository and left deployment for a later decision. A person can already run the gallery locally. They should also be able to open it without cloning the repository.

## Decision

Deploy the gallery to GitHub Pages on every push to `main`.

Use `@sveltejs/adapter-static`. Prerender every gallery route. The workflow is `.github/workflows/deploy.yml`. It builds with `BASE_PATH` set to `/` plus the repository name, then uploads `build/`.

The site is a project site, so Pages serves it from `/portal-bits`. Local `npm run dev` and a local `npm run build` leave that base empty.

The npm package still excludes the gallery. Publishing the package stays on a GitHub Release, as [ADR 0003](0003-publish-to-npm.md) records.

## Consequences

After the Pages source is GitHub Actions, a push to `main` publishes the gallery at `https://addeyx.github.io/portal-bits/`.

Gallery links and files in `static/` include that base. A local build does not. Font files in the published package stay a later decision.
