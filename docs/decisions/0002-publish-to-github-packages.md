# Publish to GitHub Packages

## Status

Accepted

## Context

The library needed a way for another Svelte app to install the components. [ADR 0001](0001-one-sveltekit-repository.md) kept publishing out of the first scope. The package name was the unscoped `portal-bits`, and `package.json` blocked publish.

## Decision

Publish the library to GitHub Packages as `@addeyx/portal-bits`, from the public repository `AddeyX/portal-bits`.

`npm run package` still builds `dist/`. Publish that build. Keep the gallery, demo content, and deployment out of the package.

Publish when a GitHub Release is published. The workflow uses the repository's `GITHUB_TOKEN`.

## Consequences

A consumer installs `@addeyx/portal-bits` from `npm.pkg.github.com` and still installs `svelte` and `bits-ui`.

GitHub Packages requires a token to install, including for this public package. The scope `@addeyx` matches the GitHub account `AddeyX`.

Deployment and font files stay a later decision.
