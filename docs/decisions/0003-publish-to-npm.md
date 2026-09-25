# Publish to npm

## Status

Accepted. Supersedes [ADR 0002](0002-publish-to-github-packages.md).

## Context

[ADR 0002](0002-publish-to-github-packages.md) published `@addeyx/portal-bits` to GitHub Packages. Installing that package required a GitHub token, including for a public package.

## Decision

Publish the unscoped package `portal-bits` to the public npm registry at `https://registry.npmjs.org`.

`npm run package` still builds `dist/`. Publish that build. Keep the gallery, demo content, and deployment out of the package.

Publish when a GitHub Release is published. The workflow authenticates with the `NPM_TOKEN` repository secret.

## Consequences

A consumer installs `portal-bits` from the public registry and still installs `svelte` and `bits-ui`. Installing does not require a registry token.

Publishing needs an npm account and an `NPM_TOKEN` secret with publish access.

Deployment and font files stay a later decision.
