# Architecture

System shape: the parts, how they connect, and what each part owns.

This repository is one SvelteKit app. The library and the gallery share it. [ADR 0001](../decisions/0001-one-sveltekit-repository.md) records why.

## Library

`src/lib` owns reusable components, styles, and the public API.

- `src/lib/components/` owns styled wrappers and compositions.
- `src/lib/styles/tokens.css` owns primitive and semantic tokens.
- `src/lib/styles/base.css` owns library typography and shared styles.
- `src/lib/index.ts` owns the public export list.
- `src/lib/types.ts` owns shared public types. `NavItem` is the navigation item.

Svelte and Bits UI stay peer dependencies. The gallery also installs them for local development.

`npm run package` builds the library with `@sveltejs/package`. Entry points are the `exports` field in `package.json`.

## Gallery

`src/routes` owns the gallery pages. `src/gallery.css` owns gallery-only styles. `src/demo` owns demo content. `static/art` owns local demo images.

- `/` is the gallery home. `FloatingNav` places the logo on the left and Home, Docs, and GitHub in the middle. Docs pages add a search icon on the right; it fades out on Home. That search is a gallery adaptation: fuzzysort over component and guide copy, shown in a popover.
- `/components` lists the components. `/components/[slug]` shows one component, its example, and the props that matter.
- `/foundations` and `/motion` share that docs sidebar. At 800px and narrower, the sidebar becomes a Browse docs disclosure that names the current page and scrolls with the page. This is an adaptation.
- `/shell` shows the library inside a representative shell.
- `/auth-preview` shows AuthFrame without the gallery header. The `size=reading` query selects its reading layout.

Gallery state stays on the page that owns it. The shell layout owns the gallery accent and applies CSS properties at the document root so portaled overlays share it; cleanup removes these properties. Filtering derives from `src/demo`. The gallery does not keep a global store.

## Shell

`PortalShell` owns responsive layout and spacing. The consumer supplies branding, navigation, toolbar controls, and page content through snippets.

`SidebarNav` owns desktop navigation, including expanded and collapsed layouts. `TopBar` owns the search, notification, and favorite triggers, plus an optional account capsule. `MobileNav` owns navigation at narrow widths. A breakpoint chosen before the mobile layout is measured is an adaptation. See [fidelity](../concepts/fidelity.md).

Sticky chrome, popovers, modal overlays, and tooltips use separate stacking roles. Overlay content stays outside the shell's scroll clipping.

Account values and network data stay outside the shell. The shell does not call a wallet API.

## Outside this shape

Gallery routes and demo content stay out of the package exports. The package publishes to GitHub Packages as `@addeyx/portal-bits`. [ADR 0002](../decisions/0002-publish-to-github-packages.md) records why. This scope does not add a monorepo, a second documentation site, or deployment.
