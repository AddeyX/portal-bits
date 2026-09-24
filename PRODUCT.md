# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Svelte 5, TypeScript, SvelteKit for the gallery, and tokens for styling. Bits UI supplies interaction primitives. Shape: [docs/architecture/README.md](docs/architecture/README.md).

## Product Purpose

A reusable Svelte library of a measured design language, shown with neutral demo content.

## Users

Developers who consume the Svelte components and inspect their states, APIs, and tokens.

## Capabilities and Constraints

- Bits UI supplies interaction primitives.
- Visual decisions must be traceable to the DOM analysis.
- Demo content is neutral and synthetic.
- The package name is `portal-bits`. Publishing destination is not chosen. The deliverable is local.

## Evidence on Hand

Initial rendered-DOM and computed-style findings: `docs/dom-analysis.md`. Dark theme, mobile behavior, and several interaction states remain unverified.

## Product Principles

See [docs/principles.md](docs/principles.md).
