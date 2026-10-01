# Docs Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task by task. Steps use checkboxes for tracking. Use the current session's execution method; delegate only when the user authorizes delegation.

**Goal:** Make portal-bits documentation sufficient to install, evaluate, customize, and integrate every public component without reading its implementation.

**Architecture:** Keep the existing SvelteKit gallery and GitHub Pages deployment. Add gallery-only documentation components under `src/demo/docs/`, compiled examples under `src/demo/examples/`, and typed content shared by documentation, navigation, and search. Preserve library contracts and measured styling; the documentation presents those contracts rather than expanding them.

**Tech Stack:** Svelte 5, TypeScript, SvelteKit with adapter-static, existing portal-bits controls, Bits UI peers, fuzzysort, Vitest, Testing Library, and Prettier. Add Shiki as a development dependency in Commit 4 for build-time syntax highlighting.

**Spec:** The accepted docs review in this chat, reproduced as the twelve requirements in the commit map below. The user requested one implementation commit per reviewed item. This file is the implementation deliverable; product changes have not started.

## Global constraints

- One term, one meaning.
- Label an unmeasured behavior as an adaptation.
- A semantics change keeps the measured visual identity.
- Demo content stays synthetic, with no wallet, chain, or account calls.
- Public exports are library components, tokens, and styles.
- Svelte and Bits UI stay peer dependencies.
- The package publishes to the public npm registry as `portal-bits`. The gallery deploys to GitHub Pages. Font files in the package are a later decision.
- Keep all documentation components, example registries, search content, and highlighting code outside `src/lib/index.ts` and the published `dist/` directory.
- Preserve existing `/get-started`, `/components`, `/components/[slug]`, `/foundations`, `/motion`, `/shell`, and `/auth-preview` addresses.
- Use `galleryHref()` and `galleryAsset()` for gallery-owned routes and assets. Hash links must work under both `/` and `/portal-bits`.
- Package metadata is the authority for versions and supported peer ranges. Current package version is `0.4.0`; peer ranges are `svelte: ^5.33.0` and `bits-ui: ^2.19.3`. Re-read metadata at execution time.
- Complete exactly twelve implementation commits. Shared setup, tests, documentation, and changelog changes belong to the commit that first needs them. Include this plan and its documentation-map change with Commit 1; do not create a thirteenth setup commit.
- Add an Unreleased changelog entry for each user-visible commit. Preserve historical release notes.
- Product code and commit messages use ordinary, complete technical language.

## Commit map

Execute in this order, matching the review's twelve items. Each row is one commit, including all its tests and documentation.

| Commit | Reviewed gap                        | Conventional Commit subject                                     | Depends on |
| ------ | ----------------------------------- | --------------------------------------------------------------- | ---------- |
| 1      | Installation experience             | `feat(docs): improve installation guidance and code copying`    | None       |
| 2      | Centered preview viewport           | `feat(docs): center component previews in shared stages`        | 1          |
| 3      | Curated variations                  | `feat(docs): add curated component variation controls`          | 2          |
| 4      | Complete, copyable examples         | `feat(docs): provide runnable examples with highlighted source` | 1, 3       |
| 5      | Structured API reference            | `feat(docs): document public component APIs`                    | 4          |
| 6      | Search coverage                     | `fix(docs): search guide sections and component APIs`           | 5          |
| 7      | Theming guide and preview controls  | `feat(docs): document theming and add preview theme controls`   | 3, 4, 6    |
| 8      | Page navigation                     | `feat(docs): add section navigation and related pages`          | 5, 6, 7    |
| 9      | Accessibility and behavior guidance | `docs: document component accessibility and behavior`           | 5, 8       |
| 10     | Practical recipes                   | `feat(docs): add complete integration recipes`                  | 4, 7, 9    |
| 11     | Release and support context         | `feat(docs): expose release history and support links`          | 6, 8       |
| 12     | Mobile discoverability              | `fix(docs): make search and navigation direct on mobile`        | 6, 8, 11   |

## Review focus

These conditions need explicit coverage in the owning commit, beyond the happy path:

1. Clipboard unavailable or rejected: offer selectable code and announce failure without claiming success. Commit 1.
2. Rapid variation changes and route changes: component, source, and state stay in agreement; disabled settings do not permit interaction. Commits 3–4.
3. GitHub Pages base path, direct hash navigation, and browser history: links target existing sections and preserve ordinary link behavior. Commits 6 and 8.
4. Dark previews and portaled content: overlays receive the selected theme; preview state does not mutate the documentation page or leak across routes. Commit 7.
5. Narrow viewports, long content, and keyboard navigation: preview, source, reference tables, search, and mobile menus remain usable without page overflow. Commits 2, 5, and 12.

## File ownership and interfaces

Existing routes remain the page owners. `src/demo/catalog.ts` remains the component identity and grouping source. Create focused helpers in the following locations as their commits require them:

| File                                              | Responsibility                                                | First commit |
| ------------------------------------------------- | ------------------------------------------------------------- | ------------ |
| `src/demo/docs/CodeBlock.svelte`                  | Source display, filename, copy action, status, expansion      | 1            |
| `src/demo/docs/install.ts`                        | Package metadata and package-manager commands                 | 1            |
| `src/demo/docs/types.ts`                          | Shared source, preview, and page contracts                    | 1            |
| `src/demo/docs/PreviewStage.svelte`               | Accessible preview region, sizing, alignment, theme           | 2            |
| `src/demo/docs/PreviewControls.svelte`            | Named variation selectors and boolean switches                | 3            |
| `src/demo/docs/variations.ts`                     | Curated settings and valid combinations per component         | 3            |
| `src/demo/examples/<ComponentName>Example.svelte` | One compiled, self-contained example per catalog component    | 4            |
| `src/demo/examples/registry.ts`                   | Explicit slug-to-example imports and source-file generation   | 4            |
| `src/demo/docs/ExampleSource.svelte`              | Source-file selection around CodeBlock                        | 4            |
| `src/demo/docs/highlight.ts`                      | Build-time highlighting interface and safe source rendering   | 4            |
| `scripts/build-doc-examples.mjs`                  | Validate consumer example source and generate highlight data  | 4            |
| `src/demo/docs/reference.ts`                      | Complete public prop, snippet, binding, and limit metadata    | 5            |
| `src/demo/docs/ApiTable.svelte`                   | Semantic, responsive reference tables                         | 5            |
| `src/demo/docs/pages.ts`                          | Page identity, ordered sections, related pages                | 6            |
| `src/demo/docs/guides.ts`                         | Rendered guide prose and section metadata, shared with search | 6            |
| `src/demo/docs/search-index.ts`                   | Build section-level search entries from actual docs content   | 6            |
| `src/demo/docs/theming.ts`                        | Theming-guide prose and complete source examples              | 7            |
| `src/demo/docs/SectionHeading.svelte`             | Stable heading IDs and permalink affordance                   | 8            |
| `src/demo/docs/OnThisPage.svelte`                 | In-page section links and current-section indication          | 8            |
| `src/demo/docs/PageNavigation.svelte`             | Previous, next, and related links                             | 8            |
| `src/demo/docs/behavior.ts`                       | Per-component accessibility, behavior, and ownership notes    | 9            |
| `src/demo/recipes/registry.ts`                    | Recipe identity, compiled examples, and source                | 10           |
| `src/demo/docs/releases.ts`                       | Parsed changelog and repository/source URLs                   | 11           |
| `src/demo/docs/DocsSearch.svelte`                 | Extracted search interaction used by SiteHeader               | 12           |

Declare these contracts in `src/demo/docs/types.ts` as their first consumer is added; import them from that file in later tasks. Component prop signatures below describe the Svelte components rather than separate exported functions:

```ts
import type { Snippet } from 'svelte';

export type SourceFile = {
  name: string;
  language: 'svelte' | 'typescript' | 'css' | 'bash';
  code: string;
  highlightedHtml?: string;
};

export type PreviewSettings = Record<string, string | number | boolean>;

export type PreviewControl =
  | { key: string; label: string; kind: 'boolean' }
  | {
      key: string;
      label: string;
      kind: 'choice';
      options: { label: string; value: string | number }[];
    };

export type DocSection = { id: string; title: string; paragraphs: string[] };
export type DocPage = {
  path: string;
  title: string;
  description: string;
  sections: DocSection[];
  related: string[];
};

// CodeBlock: { file: SourceFile; collapsible?: boolean }
// PreviewStage: { label: string; layout?: 'center' | 'wide';
//   theme?: 'light' | 'dark'; children: Snippet }
// PreviewControls: { controls: PreviewControl[];
//   settings: PreviewSettings /* bindable */ }
// ExampleSource: { files: SourceFile[] }
// getDocPage(path: string): DocPage | undefined
// getDocPages(): DocPage[]
```

Keep browser-only clipboard, focus, observers, and keyboard handling in event handlers or lifecycle cleanup. Source files and highlighted HTML are local, trusted build artifacts; user-entered text never enters `{@html}`.

## Verification and commit procedure

Before each implementation commit:

1. Read the relevant local documentation and current component contracts. Load the Svelte code-writer and core-bestpractices skills before editing Svelte files; use official Svelte documentation and autofix tooling as required by those skills.
2. For behavioral changes, write the task's regression tests, run the focused tests, and confirm the expected failure before the fix. Verify visual-only changes in the browser rather than asserting CSS strings.
3. Update the nearest documentation and append the task's Unreleased changelog note.
4. Run the focused tests after implementation, then run the required checks:

   ```bash
   npm test
   npm run check
   npm run format:check
   npm run build
   ```

5. Run `BASE_PATH=/portal-bits npm run build` for new routes, asset handling, anchors, search URLs, or source links. Run `npm run package` for added dependency/build tooling and for the final package-boundary check. Treat `npm run test:consumer` as unavailable while its script is missing.
6. Inspect the staged diff. Stage only that task's changed files and use the exact subject from the commit map. Commit only after the checks pass.

For this plan-writing task, run the three AGENTS.md completion checks after formatting the plan. The product implementation checks above belong to execution.

---

## Commit 1: Installation experience

**Files:** Create `src/demo/docs/CodeBlock.svelte`, `src/demo/docs/install.ts`, `src/demo/docs/types.ts`, and `tests/docs-code-block.test.ts`. Modify `src/routes/get-started/+page.svelte`, `src/demo/get-started-sample.ts`, `docs/guides/install-the-library.md`, `docs/README.md`, and `CHANGELOG.md`. Include this plan file.

**Consumes:** `package.json` metadata, existing installation route and samples. **Produces:** CodeBlock and package-manager commands used by later examples.

- [ ] Write clipboard regressions using `render`, `fireEvent`, `screen`, and `vi` from the current test stack:

  ```ts
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });
  const file = {
    name: 'Terminal',
    language: 'bash' as const,
    code: 'npm install portal-bits svelte bits-ui',
  };
  render(CodeBlock, { file });
  await fireEvent.click(screen.getByRole('button', { name: 'Copy Terminal' }));
  expect(writeText).toHaveBeenCalledWith(file.code);
  expect(await screen.findByRole('status')).toHaveTextContent('Copied');
  ```

  Add a separate rejected-promise test expecting “Copy failed. Select and copy the code.” and visible selectable source. Add a missing-clipboard case. Restore the clipboard property after each test.

- [ ] Run `npm test -- tests/docs-code-block.test.ts`; confirm failure because CodeBlock does not exist.
- [ ] Implement CodeBlock with escaped `<pre><code>{file.code}</code></pre>`, a filename, named Copy button, and `aria-live="polite"` status. Call `navigator.clipboard.writeText()` only after activation. Disable repeated copy while pending; clear status when the file changes and clean up any reset timer.
- [ ] Derive package facts in `install.ts` from `../../../package.json`. Export `installCommands: Record<'npm' | 'pnpm' | 'yarn' | 'bun', string>` using `install`, `add`, `add`, and `add` respectively for `portal-bits svelte bits-ui`. Use a labeled native select initially; keyboard operation must work.
- [ ] Expand Installation with supported peer ranges and an existing-Svelte-project explanation. Give Installation, Basic usage, Styles, and TypeScript stable IDs immediately, so Commit 6 can link to them.
- [ ] Show complete `+layout.svelte` CSS imports and a separate `+page.svelte` first-component example. Explain that the package ships no font files and that the gallery bundles Inter. Describe `styles.css` accurately: it already imports token CSS internally; preserve the existing documented explicit-import recipe without claiming both imports are independently required.
- [ ] Replace all code blocks on Get started with CodeBlock. Verify all four commands copy exactly; blocked clipboard stays usable. Update installation guide and Unreleased.
- [ ] Run focused tests and the common verification procedure. Commit with the Commit 1 subject.

**Acceptance:** A visitor can choose a package manager, see compatible peers, copy setup files, and render the first component. Installation is enhanced, not duplicated into a second route.

## Commit 2: Centered preview viewport

**Files:** Create `src/demo/docs/PreviewStage.svelte`. Modify `src/routes/components/[slug]/Preview.svelte`, `src/routes/get-started/+page.svelte`, `src/gallery.css`, `docs/architecture/README.md`, and `CHANGELOG.md`.

**Consumes:** Existing live examples. **Produces:** A shared stage with center and wide layouts; later controls sit outside the specimen region.

- [ ] Implement the PreviewStage contract with a named region. Use `min-height`, not a fixed height, and keep overflow visible for focus rings and nonportaled content. Start with these gallery adaptations:

  ```css
  .doc-preview-stage {
    display: grid;
    place-items: center;
    min-height: 320px;
    padding: 24px;
    min-width: 0;
  }
  .doc-preview-stage > .doc-preview-content {
    min-width: 0;
    max-width: 100%;
  }
  .doc-preview-stage[data-layout='wide'] > .doc-preview-content {
    width: 100%;
  }
  @media (max-width: 639px) {
    .doc-preview-stage {
      min-height: 240px;
      padding: 16px;
    }
  }
  ```

- [ ] Wrap each existing component preview and the installation specimen in PreviewStage. Apply wide mode to Carousel, SectionHeader, RowList, Row, TopBar, and FloatingNav. Center intrinsic-width controls, fields, and cards. Preserve each component's own internal alignment.
- [ ] Keep shell and AuthFrame previews as clearly named full-page links at this stage. Their viewport-dependent behavior must not become a scaled or clipped miniature.
- [ ] Inspect Button, Input, AppCard, Carousel, Dialog, and Tooltip at 390px, 800px, and 1440px. Compare specimen center with the available stage center. Long field errors grow the stage; focus outlines remain visible; overlays do not acquire a clipping ancestor.
- [ ] Record the stage dimensions and responsive behavior as adaptations in architecture documentation. Add Unreleased note; run common verification and commit.

**Acceptance:** A single small specimen is centered on both axes. Wide compositions retain useful width. Long content grows naturally without document overflow. No CSS-string test is needed for this visual change.

## Commit 3: Curated variations

**Files:** Create `src/demo/docs/PreviewControls.svelte`, `src/demo/docs/variations.ts`, and `tests/docs-variations.test.ts`. Modify `src/routes/components/[slug]/Preview.svelte`, `src/gallery.css`, `docs/architecture/README.md`, and `CHANGELOG.md`.

**Consumes:** PreviewStage. **Produces:** Bindable settings and curated example choices, preserved through the source migration in Commit 4.

- [ ] Add a regression that renders the Button preview, finds one specimen, changes Variant to green and Size to 48, then enables Disabled and confirms that activating the specimen cannot change the demo status. Repeat fast toggles and confirm the final settings win.
- [ ] Define settings defaults and controls separately from component state. Reset both on slug changes with a keyed preview. Example Button settings:

  ```ts
  export const buttonDefaults = { variant: 'primary', size: 40, disabled: false, icon: false };
  export const buttonControls: PreviewControl[] = [
    {
      key: 'variant',
      label: 'Variant',
      kind: 'choice',
      options: ['primary', 'secondary', 'green', 'quiet'].map((value) => ({ label: value, value })),
    },
    {
      key: 'size',
      label: 'Size',
      kind: 'choice',
      options: [32, 40, 48].map((value) => ({ label: `${value}px`, value })),
    },
    { key: 'disabled', label: 'Disabled', kind: 'boolean' },
    { key: 'icon', label: 'Show icon', kind: 'boolean' },
  ];
  ```

  Choice controls use labeled native selects; boolean controls use existing Switch. Replace the settings object on edits and preserve numeric option types. For quiet Button, disable Size and explain that it does not apply. Keep link behavior in a separate labeled example; quiet never receives `href`.

- [ ] Curate controls for every catalog entry using this coverage map:

  | Components                        | Exposed variations                                                               |
  | --------------------------------- | -------------------------------------------------------------------------------- |
  | Button, IconButton                | Supported variants, sizes, disabled; optional icon for Button                    |
  | Input, Select                     | Default, invalid, disabled, required; labeled icon example for Input             |
  | Checkbox, Switch, Toggle          | Checked/pressed demo interaction and disabled setting; Checkbox required/invalid |
  | ToggleGroup                       | Compact and disabled settings; single selection remains the contract             |
  | Avatar, Badge                     | Avatar size/media/fallback; Badge's existing variants                            |
  | Dialog, Popover, Tooltip          | Description or positioning where supported; optional trigger-content example     |
  | AppCard, ArticleCard, FeatureCard | Media/fallback; only existing spotlight/action options                           |
  | Carousel                          | Curated three-item collection; separate one-item example                         |
  | SectionHeader, EmptyState, Alert  | Optional description/action where supported; Alert reveal/clear action           |
  | RowList, Row                      | Short and wrapping-content examples                                              |
  | PortalShell, MobileNav, AuthFrame | Compact full-page launch choices; richer integration arrives with recipes        |
  | SidebarNav, TopBar, FloatingNav   | Existing collapsed/action/menu compositions                                      |
  | ColorSelector                     | Existing preset and custom-color interaction; no invented alpha API              |

- [ ] Put less common demonstrations inside a native `<details>` named “More examples.” Each revealed example has its own title. Keep one primary specimen, or one meaningful collection for collection components.
- [ ] Keep the current snippet accurate for the selected primary options until Commit 4 replaces its source system. Use validated settings and string escaping, not user-supplied HTML.
- [ ] Run focused regressions, inspect keyboard labels and quiet-size behavior, update architecture and Unreleased, then run common verification and commit.

**Acceptance:** Initial pages show one clear specimen rather than variant matrices. Controls change valid component props; hidden examples remain reachable by keyboard.

## Commit 4: Complete, copyable examples

**Files:** Create all 29 `src/demo/examples/<ComponentName>Example.svelte` files using the component names in `src/demo/catalog.ts`; create `src/demo/examples/registry.ts`, `src/demo/docs/ExampleSource.svelte`, `src/demo/docs/highlight.ts`, `scripts/build-doc-examples.mjs`, and `tests/docs-examples.test.ts`. Modify `src/demo/docs/CodeBlock.svelte`, `src/routes/components/[slug]/Preview.svelte`, `package.json`, `package-lock.json`, `vite.config.ts`, `.gitignore`, `docs/architecture/README.md`, and `CHANGELOG.md`. Generate `src/demo/docs/generated/highlight.json` without committing it.

**Consumes:** SourceFile, CodeBlock, PreviewSettings. **Produces:** Compiled examples and corresponding consumer files for every slug.

- [ ] Add tests asserting that every catalog slug has an example registry entry, a complete source file set, and no unresolved gallery imports in consumer source. For each generated `.svelte` file, call `compile(source, { filename, generate: 'server' })` from `svelte/compiler`; errors must fail the test. This proves compilation, not consumer packaging or TypeScript completeness.
- [ ] Replace the large preview branch with explicit example imports in `registry.ts`. Use one example file per public component; keep settings-driven rendering and snippets local to that file. A Button example starts with:

  ```svelte
  <script lang="ts">
    import { Button } from '$lib';
    let {
      variant = 'primary',
      size = 40,
      disabled = false,
    }: {
      variant?: 'primary' | 'secondary' | 'green' | 'quiet';
      size?: 32 | 40 | 48;
      disabled?: boolean;
    } = $props();
    let saved = $state(false);
  </script>

  <Button {variant} {size} {disabled} onclick={() => (saved = !saved)}>
    {saved ? 'Changes saved' : 'Save changes'}
  </Button>
  ```

  Add the selected icon option with an inline SVG so copying it needs no extra icon dependency. All other examples must declare their imports, state, data, handlers, and snippets. Examples with media use local inline synthetic SVG data or an explained consumer asset input. Navigation examples use named local anchors or explicitly described consumer routes.

- [ ] Import the same example files with `?raw` for source. Convert only the exact `$lib` import specifier to `portal-bits` in consumer text. Exclude `$app/*`, gallery helpers, internal package paths, and gallery-only artwork paths from published examples.
- [ ] Export `getExampleFiles(slug: string, settings: PreviewSettings): SourceFile[]`. Return `+layout.svelte` with style setup, `App.svelte` that imports the selected example and passes validated settings, and the complete `<ComponentName>Example.svelte` source. Encode values with JSON string literals and fixed prop names. A file selector exposes each file; Copy copies the selected raw file, not highlighted markup.
- [ ] Add Shiki with `npm install --save-dev shiki` during execution, after checking its official API. Initialize highlighting in `scripts/build-doc-examples.mjs`; generate `src/demo/docs/generated/highlight.json`, keyed by source language and exact raw code. Export `highlightSource(code: string, language: SourceFile['language']): string | undefined` from `highlight.ts`. Never reuse HTML for a different source string. Static example files receive build-time highlighting; a dynamically generated usage file without a matching entry remains escaped, readable source.
- [ ] Add `src/demo/docs/generated/` to `.gitignore`. Use an async Vite plugin `buildStart` hook in `vite.config.ts` to run the generator before module loading, and a watched-source update hook to regenerate after example changes. Keep generation out of the package-only build. Load only Svelte, TypeScript, CSS, and shell grammars; no Shiki runtime or browser-side grammar bundle is sent to users.
- [ ] Ensure the generator runs the consumer source compilation checks and reports filename/slug on failure. If highlighting fails, retain escaped readable source and fail generation for invalid source. Source expansion is an accessible button; long lines scroll inside CodeBlock.
- [ ] Test that selecting green/48/disabled generates those settings in App.svelte and that copying that file returns exact raw text. Verify generated files in a temporary Svelte consumer fixture with type checking, kept outside `tests/**/*.test.ts` and outside published exports; this is example verification, not a claim that missing `test:consumer` works.
- [ ] Update architecture and Unreleased, run focused/common checks plus `npm run package`, inspect the package for gallery artifacts, and commit.

**Acceptance:** Each preview has complete consumer source; visible state and source agree. Highlighting works in the static build. Code selection, copying, and expansion work without executing displayed text.

## Commit 5: Structured API reference

**Files:** Create `src/demo/docs/reference.ts`, `src/demo/docs/ApiTable.svelte`, and `tests/docs-reference.test.ts`. Modify `src/routes/components/[slug]/+page.svelte`, `src/routes/components/[slug]/Preview.svelte`, `docs/reference/components.md`, `docs/architecture/README.md`, and `CHANGELOG.md`.

**Consumes:** Catalog identities and actual declarations in every `src/lib/components/*.svelte` plus `src/lib/types.ts`. **Produces:** Complete reference metadata reused by search and behavior pages.

- [ ] Define explicit reference rows:

  ```ts
  export type ApiProp = {
    name: string;
    type: string;
    defaultValue: string;
    required: boolean;
    bindable: boolean;
    description: string;
  };
  export type ComponentReference = {
    slug: string;
    props: ApiProp[];
    snippets: ApiProp[];
    forwards: string[];
    limitations: string[];
    related: string[];
  };
  ```

- [ ] Read each component's declared props, destructuring defaults, `$bindable` use, rest-prop forwarding, and rendered semantics. Populate all 29 references, including native attributes and callbacks actually forwarded. Record supported public data attributes only where verified; do not promise internal classes as stable APIs.
- [ ] Pin factual regressions: Button defaults to secondary/40; quiet excludes `href` and `child`; Dialog includes title, description, open, trigger, children, triggerLabel, triggerClass, and theme; Avatar includes decorative; Select is native single-choice; Carousel requires its item snippet. Assert missing metadata for any catalog slug fails coverage.
- [ ] Render Props and Snippets tables with name, type, default, required, binding, and description columns. Add explicit Forwarded attributes and Limits sections. Use `id="api-reference"` and keep use-site code under `id="usage"`. Relate inherited types to the supported peer documentation without presenting all Bits UI props as wrapper props.
- [ ] Correct the repository reference table where implementation differs: TopBar currently exposes breadcrumb and actions; it does not own account or notification state. Include ArticleCard, FeatureCard, Carousel, and ColorSelector in the summary table. Link depth rather than copying entire website tables into Markdown.
- [ ] Inspect long unions and snippet types at 390px. Table overflow stays inside a labeled scroll container. Source and headings remain readable at 200% zoom. Update Unreleased, run focused/common checks, and commit.

**Acceptance:** Every public component has a verified contract, defaults, and limits. A consumer can tell supported wrapper props from underlying primitive options.

## Commit 6: Search coverage

**Files:** Create `src/demo/docs/pages.ts`, `src/demo/docs/guides.ts`, and `src/demo/docs/search-index.ts`. Modify `src/demo/search.ts`, `src/demo/catalog.ts`, `src/routes/SiteHeader.svelte`, the three guide routes, `tests/docs-search.test.ts`, `docs/architecture/README.md`, and `CHANGELOG.md`.

**Consumes:** Rendered guide prose, example source, and API metadata. **Produces:** Section-level search entries and page metadata for navigation.

- [ ] Add the confirmed regression:

  ```ts
  expect(searchDocs('installation')[0]?.href).toBe('/get-started#installation');
  expect(
    searchDocs('hideLabel').some((hit) => hit.href === '/components/input#api-reference'),
  ).toBe(true);
  expect(searchDocs('zzzzzzzz')).toEqual([]);
  ```

  Also verify empty query returns one result per page in catalog order, not every section; a misspelled component query still ranks its page first.

- [ ] Move guide section headings and explanatory paragraphs into `guides.ts`; routes render that same content. Keep specialized swatch, motion, and example markup in the existing routes. Give all searched sections actual IDs before returning hash links.
- [ ] Implement `getDocPages()` and `getDocPage(path)`. Build search entries from guide sections and reference metadata, including prop names, descriptions, limits, binding names, and relevant example source. Use aliases such as setup/install and a11y/accessibility. Section titles and excerpts must describe the matching material.
- [ ] Extend SearchHit with `section?: string` and `excerptRuns: SearchRun[]`; retain title/group/description runs for current callers. Deduplicate by destination, favor title and heading matches over body/source matches, and cap nonempty results at 12. Preserve escaping by rendering text runs, never HTML from the query.
- [ ] Keep entries' URLs base-free. Convert route path with `galleryHref()` and append the hash when rendering/following. Test the transformation separately for `/portal-bits`, including modified clicks opening ordinary links; query text never forms a URL path.
- [ ] Add rendered-section coverage assertions: every indexed fragment corresponds to an existing page section. Verify “installation,” “tokens,” “required,” “quiet,” and “sideOffset” in the real search popover. Update architecture and Unreleased; run focused/common checks and Pages-base build; commit.

**Acceptance:** Known headings and public props return their actual sections. Empty, fuzzy, and no-match behaviors remain useful. Search results stay safe and usable under GitHub Pages.

## Commit 7: Theming guide and preview controls

**Files:** Create `src/routes/theming/+page.svelte`, `src/demo/docs/theming.ts`, and `tests/docs-theming.test.ts`. Modify PreviewStage, variations, example files/registry, pages, catalog, `src/routes/foundations/+page.svelte`, `docs/guides/theming.md` (new), `docs/guides/README.md`, `docs/architecture/README.md`, and `CHANGELOG.md`.

**Consumes:** Source examples, page/search registry, preview controls, library token contract. **Produces:** `/theming` and explicitly scoped theme settings.

- [ ] Add an interaction test that chooses Dark preview, opens Dialog, and confirms the portaled dialog has `data-portal-theme="dark"`; repeat with Popover and Tooltip. Verify selecting Light reverses it and the docs root stays light.
- [ ] Add a Theme choice to each primary specimen: Light and Dark adaptation. Scope `class="p-theme" data-portal-theme={theme}` on PreviewStage. Pass `theme` to wrappers with portaled content; inherited parent tokens alone cannot theme their body-mounted content. Reset settings on route changes.
- [ ] Write the guide using actual token names. Cover style loading, `--portal-font`, optional consumer-supplied Inter or licensed Roobert, semantic colors, accent foreground contrast, root versus local overrides, and body portals. A complete example includes:

  ```svelte
  <script lang="ts">
    import { Button, Dialog } from 'portal-bits';
    let dark = $state(false);
    let theme = $derived(dark ? 'dark' : 'light');
  </script>

  <div class="p-theme" data-portal-theme={theme}>
    <Button onclick={() => (dark = !dark)}>Change theme</Button>
    <Dialog title="Theme preview" {theme}>
      {#snippet trigger()}Open preview{/snippet}
      <p>This local example uses the selected theme.</p>
    </Dialog>
  </div>
  ```

  Show stylesheet token overrides separately, with `:root` scope for shared accent aliases and a local font override. Describe which tokens are reset by `.p-theme`; verify override order instead of assuming all ancestor overrides inherit through it.

- [ ] Add the guide to catalog, search, and related Foundations links. Clearly label unmeasured dark values as adaptation on both the guide and controls. Do not alter package token values or promise bundled fonts.
- [ ] Test source/theme agreement and cleanup while overlays close during route changes. Update Markdown guide and map, architecture, and Unreleased; run common checks and Pages-base build; commit.

**Acceptance:** Consumers can customize supported tokens and theme overlays correctly. Theme controls affect specimens without changing docs chrome or measured component geometry.

## Commit 8: Page navigation

**Files:** Create SectionHeading, OnThisPage, PageNavigation, and `tests/docs-navigation.test.ts` under their mapped locations. Modify `src/routes/DocsFrame.svelte`, guide routes, component route, pages/catalog, `src/gallery.css`, `docs/architecture/README.md`, and `CHANGELOG.md`.

**Consumes:** Ordered DocPage sections and related paths. **Produces:** Stable, accessible in-page and adjacent-page navigation.

- [ ] Add tests for a heading permalink named “Link to Installation,” a TOC link to `#installation`, and correct previous/next links at the first and last pages. Missing neighbors render no empty anchors. Related links resolve only to registered pages.
- [ ] Implement SectionHeading with `{ id, title, level?: 2 | 3 }`, a semantic heading, and an ordinary hash anchor. OnThisPage consumes sections; observer cleanup removes listeners on route changes, and current section uses `aria-current="location"`.
- [ ] Add the right-hand TOC only when the layout fits the sidebar, article, and TOC. Preserve the measured article width cap. At smaller widths, show an in-article native “On this page” disclosure. Add `scroll-margin-top` so the sticky site header does not cover target headings.
- [ ] Add PageNavigation at the article end. Previous/next order follows guideLinks and component catalog, with a clear boundary between guides and components. Related components come from verified reference metadata, not visual proximity guesses.
- [ ] Test direct page-with-hash loading, copied permalinks, Back/Forward, and navigation between slugs. Browser-native anchors must still work before hydration. Verify observer behavior with reduced motion and manual scrolling.
- [ ] Update architecture and Unreleased; run focused/common checks and Pages-base build; commit.

**Acceptance:** Each meaningful section is linkable and discoverable. Pages offer a next step, and navigation remains correct under browser history and mobile disclosure.

## Commit 9: Accessibility and behavior guidance

**Files:** Create `src/demo/docs/behavior.ts`. Modify component page, pages/search-index, `docs/reference/components.md`, `docs/reference/motion.md`, and `CHANGELOG.md`. Extend behavior tests in `tests/controls.test.ts` and `tests/new-components.test.ts` only where a new factual assertion lacks coverage.

**Consumes:** Public API reference and existing component behavior. **Produces:** Per-component Accessibility, Behavior, and Consumer responsibilities sections.

- [ ] Define `ComponentBehavior = { slug: string; keyboard: string[]; naming: string[]; state: string[]; consumerResponsibilities: string[]; adaptations: string[] }`. Populate every slug; static components explicitly describe semantics and whether they are interactive.
- [ ] Cover Dialog focus containment/return, Escape and outside dismissal; Popover dismissal/positioning; Tooltip keyboard access; ToggleGroup arrow keys and deselection; Checkbox label links and native form submission; Select's native keyboard/typeahead and single-choice limits; Carousel's arrows/Home/End and immediate scrolling; Avatar decorative versus meaningful media.
- [ ] Explain Input's invalid state and consumer-supplied associated error; Alert's mount/update announcements; RowList/Row list semantics; cards' separate navigation/favorite actions; shell navigation and content landmarks. Document required snippets and labels rather than stating blanket accessibility guarantees.
- [ ] Pin an uncovered claim only with meaningful behavior tests. Example: activate an inline Checkbox label link and confirm the checkbox state does not change. Verify existing focus and reduced-motion tests before duplicating them. If actual behavior differs, document the current limit accurately; keep unrelated library changes outside this docs plan.
- [ ] Render accessible headings and keyboard tables from metadata, add them to search, and link relevant recipes when Commit 10 adds them. Label adaptations individually; keep measured/unmeasured claims consistent with fidelity and motion documents.
- [ ] Update nearest reference docs and Unreleased; run focused/common verification and commit.

**Acceptance:** Every component states what it does for keyboard and assistive-technology users, what state it owns, and what the consumer must provide. Claims match verified implementation.

## Commit 10: Practical recipes

**Files:** Create `src/routes/recipes/+page.svelte`, `src/routes/recipes/[slug]/+page.ts`, `src/routes/recipes/[slug]/+page.svelte`, `src/routes/recipes/shell-composition/preview/+page.svelte`, `src/demo/recipes/registry.ts`, `src/demo/recipes/ValidatedForm.svelte`, `src/demo/recipes/DialogSubmission.svelte`, `src/demo/recipes/ShellComposition.svelte`, `src/demo/recipes/EmptyErrorStates.svelte`, `docs/guides/component-recipes.md`, and `tests/docs-recipes.test.ts`. Modify `src/routes/+layout.svelte`, `src/demo/docs/pages.ts`, `src/demo/catalog.ts`, `src/demo/docs/behavior.ts`, `docs/guides/README.md`, `docs/architecture/README.md`, and `CHANGELOG.md`.

**Consumes:** Source-file display, themes, behavior/API guidance, and page navigation. **Produces:** Four complete runnable recipes and their static routes.

- [ ] Add regressions for invalid form submission, successful local dialog submission, shell navigation/collapse, and empty/error recovery. For the form, include this assertion sequence:

  ```ts
  render(ValidatedForm);
  await fireEvent.click(screen.getByRole('button', { name: 'Save draft' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Enter a title.');
  await fireEvent.input(screen.getByRole('textbox', { name: 'Title' }), {
    target: { value: 'Synthetic field notes' },
  });
  await fireEvent.change(screen.getByRole('combobox', { name: 'Category' }), {
    target: { value: 'notes' },
  });
  await fireEvent.click(screen.getByRole('checkbox', { name: 'Agree to demo terms' }));
  await fireEvent.click(screen.getByRole('button', { name: 'Save draft' }));
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Draft saved.');
  ```

  Assert success only after all required fields are valid, and verify associated error IDs. Each test implements all interactions needed for its outcome.

- [ ] Build the four recipes: validated form with Input/Select/Checkbox/Alert; dialog with validation and local success; PortalShell/TopBar/SidebarNav/MobileNav composition; EmptyState/Alert/RowList recovery with deterministic in-memory data. No request, wallet, chain, or account integration.
- [ ] Define exact slugs `validated-form`, `dialog-submission`, `shell-composition`, and `empty-error-states`. `+page.ts` exports entries from the registry and throws 404 for unknown slugs. Register all recipe pages with search and navigation; source files use public imports and declared state.
- [ ] For shell recipes, offer a same-origin full-page iframe preview with an accessible title and separate “Open full-page preview” link. Define a static `/recipes/shell-composition/preview` route and add only that route to the bare-layout rule. Keep shell landmarks inside the iframe and preserve useful mobile dimensions.
- [ ] Show goal, when to use it, live recipe, complete source files, and consumer-owned integration points. Link supporting component APIs. Add recipe links from relevant behavior sections without altering component contracts.
- [ ] Update Markdown guide and maps, architecture, and Unreleased; run focused/common checks, generated-source verification, and Pages-base build; commit.

**Acceptance:** All four recipes are usable, reproducible from displayed files, and entirely synthetic. Direct recipe URLs and full-page shell preview work on GitHub Pages.

## Commit 11: Release and support context

**Files:** Create `src/demo/docs/releases.ts`, `src/routes/changelog/+page.svelte`, `src/routes/migration/+page.svelte`, and `tests/docs-releases.test.ts`. Modify DocsFrame, component page, pages/catalog, `docs/guides/migrate-the-library.md` (new), guide map, architecture, and Unreleased.

**Consumes:** package.json, CHANGELOG.md, component-to-source mapping, and navigation. **Produces:** Version visibility, release history, migration guidance, and accurate support links.

- [ ] Test changelog parsing with Unreleased, a dated release, Changed/Removed sections, and inline code. Expose `parseChangelog(markdown: string)` returning structured sections. Render text and explicitly supported inline formatting; never pass arbitrary changelog HTML through unchecked.
- [ ] Derive the displayed version from package.json and label it “Repository version,” avoiding an unverified claim that it is the npm latest release. Show it in docs context only; preserve the existing decision to keep version labels out of the representative shell.
- [ ] Build `/changelog` from the actual root changelog, including Unreleased and historical releases. Keep its history intact; label draft notes as Unreleased. Add source/release links to the GitHub repository, not network-dependent runtime data.
- [ ] Add `/migration` with verified upgrade notes: scoped registry/name history, Svelte/Bits UI peer compatibility, Input label/hideLabel behavior, quiet-button navigation limits, and portaled Tooltip theme. Distinguish removed functionality from renamed installation commands. Reference release notes and actual contracts.
- [ ] Use explicit source-file mapping for all 29 slugs. Provide component source links under `https://github.com/AddeyX/portal-bits/blob/main/src/lib/components/` and Edit page links to the appropriate gallery/example files. Provide “Report an issue” via the existing issue chooser; no automatic submission or invented community channel.
- [ ] Register routes, search entries, related links, and navigation. Verify external link names announce new tabs when used. Update Markdown guide, map, architecture, and Unreleased; run focused/common checks and Pages-base build; commit.

**Acceptance:** Visitors can identify docs version, read release and migration history, inspect the exact component source, suggest edits, and find issue reporting without misleading release claims.

## Commit 12: Mobile discoverability

**Files:** Create `src/demo/docs/DocsSearch.svelte` and `tests/docs-header.test.ts`. Modify SiteHeader, DocsFrame, `src/gallery.css`, `tests/docs-frame.test.ts`, architecture, and Unreleased. Keep the library FloatingNav contract unchanged unless execution uncovers an unavoidable documented requirement.

**Consumes:** Existing search behavior, mobile docs disclosure, page/section navigation. **Produces:** Direct search access and clear mobile navigation roles.

- [ ] Extract the current search state and interaction into DocsSearch with `{ id: string }`. SiteHeader owns one open-search state shared by desktop/mobile triggers. Close and clear on navigation; search-field focus returns to the trigger that opened it.
- [ ] Add a mobile search trigger outside FloatingNav's collapsed link cluster, inside the gallery header composition. Use complementary media rules so exactly one trigger is visible and reachable at any viewport. Keep distinct IDs if two responsive render locations exist.
- [ ] Add Ctrl/Cmd+K handling for docs routes with visible shortcut text on desktop. Ignore composing events and prevent default only when activating search. Test the shortcut, Escape, trigger focus restoration, Enter navigation, and untouched modified-link clicks. Use existing Popover focus behavior rather than adding an untested focus trap.
- [ ] Name the three navigation roles clearly: site Menu, Browse docs, and On this page. Show the current docs page in Browse docs. Add Escape/outside dismissal and focus restoration to the gallery disclosure where missing; close it when the route changes.
- [ ] Validate at 390px, 800px, and 1440px, plus 200% zoom: search requires one activation; controls and results fit; long search text and code cause only local scrolling; sticky chrome does not cover target headings. Keyboard users reach all links and never tab through a hidden duplicate search control.
- [ ] Test and manually verify the sequence: open search, type installation, follow its anchored result, open Browse docs, choose Dialog, open specimen, press Escape, then use Back. Repeat with reduced motion. Confirm representative `/shell` and `/auth-preview` still render without gallery chrome.
- [ ] Update architecture and Unreleased, run focused/common checks and Pages-base build, then run `npm run package` and inspect public exports/tarball contents. Commit with the Commit 12 subject.

**Acceptance:** Search is directly accessible on narrow screens. Site navigation, docs navigation, and in-page navigation have distinct names and correct focus behavior. All twelve commits are complete and independently reviewable.

## Execution completion

- [ ] Confirm all twelve review items map to their corresponding commit; inspect the commit log and diffs rather than counting headings in this plan.
- [ ] Confirm every catalog component has preview coverage, complete source, API, behavior notes, and valid source links.
- [ ] Confirm installation, theming, recipes, migration, and changelog are registered in navigation and search.
- [ ] Confirm required checks and local/Pages-base builds pass after the final change; public package exports remain library-only.
- [ ] Summarize implemented behavior, validation, and any verified limitations. Create or publish no release, deployment, or pull request solely because the plan is complete.
