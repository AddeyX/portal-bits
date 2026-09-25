# Glossary

One term, one meaning. Use these words in filenames, UI, docs, APIs, and commits.

## Library

The reusable Svelte package in `src/lib`. Its npm name is `portal-bits`.

## Gallery

The SvelteKit app in `src/routes` that demonstrates the library.

## Token

A public CSS custom property owned by the library and prefixed `--portal-`.

## Source variable

A CSS custom property recorded in the DOM analysis. It is not a token until the library adopts it.

## Inspired by

A value or behavior drawn from a recorded measurement.

## Adaptation

An implementation choice made where a behavior was not measured, and labeled as such.

## Demo content

Synthetic sample data in `src/demo`.

## Shell

The reusable application chrome: `PortalShell`, `TopBar`, `SidebarNav`, and `MobileNav`.

## Known drift

| Say this | Instead of        | Where it still appears                                |
| -------- | ----------------- | ----------------------------------------------------- |
| Library  | component library | `src/routes/+layout.svelte`                           |
| Library  | design system     | `docs/dom-analysis.md`                                |
| Gallery  | demonstration     | `docs/superpowers/plans/2026-09-23-portal-library.md` |
