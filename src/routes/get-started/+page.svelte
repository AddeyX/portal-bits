<script lang="ts">
  import { Button } from '$lib';
  import CodeBlock from '../../demo/docs/CodeBlock.svelte';
  import { installCommands, packageFacts } from '../../demo/docs/install';
  import { layoutSample, pageSample } from '../../demo/get-started-sample';
  import { galleryHref } from '../../demo/paths';
  import type { SourceFile } from '../../demo/docs/types';

  let manager = $state<keyof typeof installCommands>('npm');

  const command = $derived<SourceFile>({
    name: 'Terminal',
    language: 'bash',
    code: installCommands[manager],
  });

  const layoutFile: SourceFile = {
    name: '+layout.svelte',
    language: 'svelte',
    code: layoutSample,
  };

  const pageFile: SourceFile = {
    name: '+page.svelte',
    language: 'svelte',
    code: pageSample,
  };
</script>

<article class="doc-article doc-guide">
  <h1>Get started</h1>
  <p class="doc-lede">Install the library, load its styles, and render a component.</p>
  <p>
    portal-bits is a Svelte 5 component library. Bits UI supplies the interaction. The components
    ship with their measured styles. <code>svelte</code> and <code>bits-ui</code> stay peers.
  </p>
  <h2 id="installation">Installation</h2>
  <p>
    This repository is version {packageFacts.version}. It supports
    <code>svelte@{packageFacts.peers.svelte}</code>
    and <code>bits-ui@{packageFacts.peers['bits-ui']}</code>.
  </p>
  <p>
    The command installs <code>portal-bits</code> together with the <code>svelte</code> and
    <code>bits-ui</code> peers. A project that already uses Svelte should keep a
    <code>svelte</code> release inside the supported range, and add <code>bits-ui</code> in its supported
    range.
  </p>
  <label class="doc-manager">
    Package manager
    <select bind:value={manager}>
      <option value="npm">npm</option>
      <option value="pnpm">pnpm</option>
      <option value="yarn">yarn</option>
      <option value="bun">bun</option>
    </select>
  </label>
  <CodeBlock file={command} />
  <h2 id="basic-usage">Basic usage</h2>
  <p>Import a component in a page and render it. Load the styles from the layout.</p>
  <div class="doc-preview">
    <Button variant="primary">Save changes</Button>
  </div>
  <CodeBlock file={pageFile} />
  <h2 id="styles">Styles</h2>
  <p>
    Load the styles once, in the root layout. <code>styles.css</code> is the component styling, and
    it already imports <code>tokens.css</code>. The layout example also imports
    <code>tokens.css</code> so the token file stays visible. That second import is not a separate requirement.
  </p>
  <p>
    <code>tokens.css</code> defines color, type, and space. <code>--portal-font</code> names Roobert,
    then Inter, then a system font. The package ships no font files. This gallery bundles Inter.
  </p>
  <CodeBlock file={layoutFile} />
  <h2 id="typescript">TypeScript</h2>
  <p>
    Types ship with the package. <code>NavItem</code> is a navigation item.
    <code>SelectOption</code> is a select choice. Each component export types its own props.
  </p>
  <h2>Next steps</h2>
  <ul>
    <li><a href={galleryHref('/components')}>Browse the components</a></li>
    <li><a href={galleryHref('/foundations')}>Read the foundations</a></li>
    <li><a href={galleryHref('/motion')}>Read the motion notes</a></li>
  </ul>
</article>

<style>
  .doc-manager {
    display: grid;
    gap: 8px;
    max-width: 240px;
    margin-top: 16px;
    font-size: 14px;
    line-height: 20px;
  }

  .doc-manager select {
    font: inherit;
    color: inherit;
    background: var(--portal-surface);
    border: 1px solid var(--portal-border);
    border-radius: 8px;
    padding: 8px 10px;
  }
</style>
