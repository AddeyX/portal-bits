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

Svelte and Bits UI stay peer dependencies. [ADR 0004](../decisions/0004-svelte-and-bits-ui-as-peers.md) records why. The gallery also installs them for local development.

`npm run package` builds the library with `@sveltejs/package`. Entry points are the `exports` field in `package.json`.

## Gallery

`src/routes` owns the gallery pages. `src/gallery.css` owns gallery-only styles. `src/demo` owns demo content. `static/art` owns local demo images. `@sveltejs/adapter-static` prerenders those pages into `build/`.

- `/` is the gallery home. `FloatingNav` places the logo on the left and Home, Docs, and GitHub in the middle. Docs pages add a search icon on the right; it fades out on Home. That search is a gallery adaptation: fuzzysort over component and guide copy, shown in a popover.
- `/get-started` is the first docs page. It covers install, a first component, styles, and where to go next. `/components` lists the components. `/components/[slug]` shows one component, its example, and the props that matter.
- `/foundations` and `/motion` share that docs sidebar. At 800px and narrower, the sidebar becomes a Browse docs disclosure that names the current page and scrolls with the page. This is an adaptation.
- The docs article is 760px at most. Inline padding is 16px, top padding is 32px below 640px and 64px from there up, and bottom padding is 96px. Those values were measured on the Bits UI docs page. Bits UI also reserves a right-hand table of contents; this gallery does not, so the space beside the article is wider. That missing column is an adaptation. While the sidebar sits beside the article, the left inset is shorter by half the sidebar width, which centers the column in the page. At 800px and narrower the sidebar stacks and that shift is absent.
- `/shell` shows the library inside a representative shell. That shell does not display a package version.
- `/auth-preview` shows AuthFrame without the gallery header. The `size=reading` query selects its reading layout.

Gallery state stays on the page that owns it. The shell layout owns the gallery accent and applies CSS properties at the document root so portaled overlays share it; cleanup removes these properties. Filtering derives from `src/demo`. The gallery does not keep a global store.

## Shell

`PortalShell` owns responsive layout and spacing. The consumer supplies branding, navigation, toolbar controls, and page content through snippets.

`SidebarNav` owns desktop navigation, including expanded and collapsed layouts. `TopBar` owns the search, notification, and favorite triggers, plus an optional account capsule. `MobileNav` owns navigation at narrow widths. A breakpoint chosen before the mobile layout is measured is an adaptation. See [fidelity](../concepts/fidelity.md).

Sticky chrome, popovers, modal overlays, and tooltips use separate stacking roles. Overlay content stays outside the shell's scroll clipping.

Account values and network data stay outside the shell. The shell does not call a wallet API.

## Outside this shape

Gallery routes and demo content stay out of the package exports. The package publishes to the public npm registry as `portal-bits`. [ADR 0003](../decisions/0003-publish-to-npm.md) records why. Pushes to `main` deploy the gallery to GitHub Pages. [ADR 0005](../decisions/0005-deploy-the-gallery-to-github-pages.md) records why. This scope does not add a monorepo or a second documentation site.
