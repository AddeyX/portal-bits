# Portal Bits Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. User explicitly authorized building; execute locally without another approval gate.

**Goal:** Ship a reusable Portal-derived Svelte library with working chrome and motion gallery.

**Architecture:** One package, with public components and CSS in src/lib and a separate SvelteKit demonstration in src/routes. Bits UI owns interaction semantics. Demo state stays outside the library.

**Tech Stack:** Svelte 5, Bits UI 2, TypeScript, SvelteKit, Vitest, Testing Library.

**Spec:** docs/superpowers/specs/2026-09-23-portal-library-design.md

## Global Constraints

- Neutral synthetic demo content; no account integrations.
- Namespaced `--portal-` tokens; no font binaries copied from Portal.
- Light theme source-derived; adaptations clearly documented.
- Library exports exclude gallery data and routes.
- Browser interaction and verification use the available CUA browser API.

## Review Focus

- Overlay dismissal and focus restoration after rapid interactions.
- Long content and icon controls at 390px and intermediate widths.
- Missing media must not expose broken images.
- Package consumers must resolve public exports and styles.
- Reduced motion must preserve every final state and keyboard action.

## Tasks

- [ ] Foundation: package configuration, measured tokens, scoped base styles, reproducible build/check/package scripts.
- [ ] Primitives: Button, IconButton, Badge, Avatar, Input, Toggle, ToggleGroup, Switch, Dialog, Popover, Tooltip. Typed native props, bindable states, portal theme scope.
- [ ] Compositions: AppCard, SectionHeader, SidebarNav, EmptyState, PortalShell, TopBar, MobileNav. Snippet-based injection and independent navigation links.
- [ ] Gallery: overview, foundations, components, motion; local search/favorites/notifications; neutral artwork and explicit provenance.
- [ ] Validation: integration tests for disabled controls, binding, overlays, focus, filtering; package consumer compile; typecheck/build; Svelte autofixer; desktop/mobile browser inspection and one correction batch.
- [ ] Documentation: usage, source mappings, API contracts, motion provenance, residual limits, final review.

## Execution ledger

Ruling: implement in the existing empty workspace; no Git repository exists to isolate. No external publication.
Ruling: source CSSOM does not expose all compiled component rules. Preserve measured values and label unverified hover/overlay animations as adaptations.
Ruling: Inter is bundled under its package license as a predictable fallback; Roobert remains consumer-supplied.
