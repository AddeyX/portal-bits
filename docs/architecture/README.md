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
- `/get-started` is the first docs page. It covers install, a first component, styles, and where to go next. `/components` lists the components. `/components/[slug]` shows one component, its example, and its API reference.
- A component preview sits in a shared stage inside the preview card. The stage centers the specimen. Its minimum height is 320px, or 240px below 640px. Its padding is 24px, or 16px below 640px. Carousel, SectionHeader, RowList, Row, TopBar, and FloatingNav use the full stage width. These sizes are gallery adaptations. Overflow stays visible so focus rings and overlays are not clipped. PortalShell, MobileNav, and AuthFrame stay full-page links. They are not scaled miniatures.
- Each preview shows one specimen, or one collection for Carousel. Variation controls sit below the stage, outside the specimen region. `src/demo/docs/variations.ts` owns each catalog entry's defaults and controls. Controls offer only props the component already accepts. Choice controls are labeled native selects that keep numeric values as numbers. Boolean controls use the library `Switch`. The specimen is the matching example component, which receives the validated settings. A control that does not apply, such as Size for quiet Button, is disabled and says why. Less common cases sit in a native "More examples" disclosure, each with its own title. The component page keys the preview by slug, so settings and demo state reset on navigation. These layouts are gallery adaptations.
- `src/demo/examples/` holds one `<ComponentName>Example.svelte` per catalog component. An example is complete consumer source: it declares its imports, state, data, handlers, and snippets, and uses inline SVG, local data, or `#` anchors instead of gallery assets and routes. `registry.ts` maps each slug to its example component, its `?raw` source, and a function that turns settings into props. `getExampleFiles` returns `+layout.svelte`, an `App.svelte` that passes the selected settings as JSON literals on fixed prop names, and the example itself. The only text change is the `$lib` import specifier, which becomes `portal-bits`. A file selector shows each file and Copy copies the raw file. PortalShell, MobileNav, and AuthFrame need the whole viewport, so the page links to them; their source is still complete. "More examples" stay gallery demos without copyable source.
- `src/demo/docs/reference.ts` holds one `ComponentReference` per catalog slug: props, snippets, forwarded attributes, limits, and related components. Each row is written from the component's `$props()` declaration. `tests/docs-reference.test.ts` fails when a catalog slug has no reference, and when a reference differs from the destructured names, bindable markers, or simple defaults in `src/lib/components`. `ApiTable.svelte` renders a row set as a semantic table inside a labeled, focusable scroll region, so a narrow viewport scrolls the table and not the page. `+page.svelte` renders the reference under `id="api-reference"`, after the use-site source under `id="usage"`. Bits UI documentation is linked only for components built on a primitive, and the page says that only the listed props are the wrapper contract. The reference lists no data attributes, because none is documented as stable. `docs/reference/components.md` keeps the summary and links here for depth.
- `scripts/build-doc-examples.mjs` runs from the `buildStart` hook of a Vite plugin in `vite.config.ts` and again when an example changes. It compiles every consumer file, rejects gallery-only imports, and writes `src/demo/docs/generated/highlight.json`, keyed by language and exact raw code. Shiki loads only the Svelte, TypeScript, CSS, and shell grammars, and only when an entry is missing. The JSON is ignored by git and is data only, so no highlighter ships to the browser. `CodeBlock` renders matching entries as text segments and leaves any other source, such as a generated `App.svelte`, escaped and readable. `npm run docs:examples` regenerates the file. `npm run docs:typecheck` type-checks every example and usage file in a temporary Svelte project; run `npm run package` first. It verifies the examples, not the package, and does not replace the missing `test:consumer`.
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

Gallery routes, demo content, examples, search, and highlight data stay out of the package exports. The package publishes to the public npm registry as `portal-bits`. [ADR 0003](../decisions/0003-publish-to-npm.md) records why. Pushes to `main` deploy the gallery to GitHub Pages. [ADR 0005](../decisions/0005-deploy-the-gallery-to-github-pages.md) records why. This scope does not add a monorepo or a second documentation site.
