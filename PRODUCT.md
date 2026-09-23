# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

User requested Bits UI, implying Svelte. Proposed implementation: Svelte 5, TypeScript, SvelteKit for the documentation gallery, and CSS custom properties for styling. Package and gallery structure await spec approval.

## Product Purpose

Analyze portal.abs.xyz at the DOM level and create a faithful, reusable component library from its design language. The user explicitly chose neutral demo content rather than a Portal recreation or a new brand adaptation.

## Users

Assumption for the proposed spec: developers consuming Svelte components and inspecting their states, APIs, and source-derived design tokens.

## Capabilities and Constraints

- Bits UI supplies interaction primitives.
- Visual decisions must be traceable to observed Portal DOM and styles.
- Demo content is neutral and synthetic.
- Publishing destination and package name are not specified; initial deliverable is local.

## Evidence on Hand

Initial rendered-DOM and computed-style findings: `docs/portal-dom-analysis.md`. Dark theme, mobile behavior, and several interaction states remain unverified.

## Product Principles

- Preserve the reference's design language.
- Separate measured source values from inferred implementation choices.
- Make components reusable independently of the demonstration app.
- Improve semantics without silently changing visual identity.
