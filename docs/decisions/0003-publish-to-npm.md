# Publish to npm

## Status

Accepted. Supersedes [ADR 0002](0002-publish-to-github-packages.md).

## Context

[ADR 0002](0002-publish-to-github-packages.md) published `@addeyx/portal-bits` to GitHub Packages. Installing that package required a GitHub token, including for a public package.

## Decision

Publish the unscoped package `portal-bits` to the public npm registry at `https://registry.npmjs.org`.

`npm run package` still builds `dist/`. Publish that build. Keep the gallery, demo content, and deployment out of the package.

Publish when a GitHub Release is published. The workflow stages the package with `npm stage publish` and npm trusted publishing. A maintainer approves that staged package with two-factor authentication before it is public. The first publish is a direct `npm publish`, because a package must already exist before it can be staged.

## Consequences

A consumer installs `portal-bits` from the public registry and still installs `svelte` and `bits-ui`. Installing does not require a registry token.

Publishing needs an npm account. The maintainer publishes the first version with interactive two-factor authentication, then authorizes `.github/workflows/publish.yml` to run `npm stage publish`. Later releases become public only after `npm stage approve` or an approval on the Staged Packages tab. The maintainer steps are in [the publish guide](../guides/publish-the-package.md).

Deployment and font files stay a later decision.
