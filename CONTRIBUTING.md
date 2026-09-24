# Contributing

How a change safely enters this repo.

## Branches

`feat/`, `fix/`, `refactor/`, `docs/`, then a short name. Example: `feat/shell-collapse`.

## Commits

Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.

The same words run from the issue through the branch, the commit, the pull request, and the changelog.

| Issue form | Branch      | Commit      | Changelog |
| ---------- | ----------- | ----------- | --------- |
| Bug        | `fix/`      | `fix:`      | Fixed     |
| Feature    | `feat/`     | `feat:`     | Added     |
|            | `refactor/` | `refactor:` | Changed   |
|            | `docs/`     | `docs:`     |           |
|            |             | `test:`     |           |
|            |             | `chore:`    |           |

## Pull requests

Use the pull request template: what changed, why, how you verified it, and whether docs were updated.

## Testing

`npm test` runs Vitest. `npm run check` runs the Svelte type check. `npm run format:check` runs Prettier. All three pass before a change is done.

`npm run build` builds the gallery. `npm run package` builds the library package.

`npm run test:consumer` calls `scripts/check-consumer.mjs`. That file is not in the repo. Do not treat the consumer check as passing until the file exists.

## Formatting and linting

`npm run format` writes Prettier. `npm run format:check` checks formatting. Prettier is the formatter. `npm run check` is the type check. No separate linter is configured.

## Documentation

Update the nearest doc when behavior, terms, or commands change. The pull request records when a docs update is not required. Rules and the docs map: [docs/README.md](docs/README.md). Terms: [docs/glossary.md](docs/glossary.md).

## Definition of done

- The change does what the issue or request describes.
- `npm test`, `npm run check`, and `npm run format:check` pass.
- A user-visible change has a changelog entry under Unreleased.
- Names match the glossary.
- The pull request answers the template.
