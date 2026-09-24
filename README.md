# portal-bits

A Svelte component library, shown in a local gallery with demo content. The visual language is inspired by [Abstract Portal](https://portal.abs.xyz).

## Status

Active

## What it does

Run the gallery to inspect the components, foundations, and motion. Import the components and token CSS into a Svelte app.

## Quick start

```sh
npm install
npm run dev
```

Vite serves the gallery on `127.0.0.1`.

## Project structure

- `src/` holds the library and the gallery.
- `docs/` holds the documentation.
- `tests/` holds the Vitest tests.
- `static/` holds gallery images.
- `scripts/` holds package checks. The consumer script is not in the repo yet.
- `.github/` holds issue forms and the pull request template.

## Development

`npm run dev` runs the gallery. `npm test`, `npm run check`, and `npm run format:check` are the day-to-day checks.

## Documentation

The map of the docs is [docs/README.md](docs/README.md). Start with [the glossary](docs/glossary.md), [the architecture](docs/architecture/README.md), and [how to run the gallery](docs/guides/run-the-gallery.md).

## License

[MIT](LICENSE)
