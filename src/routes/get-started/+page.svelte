<script lang="ts">
  import { Button } from '$lib';
  import { stylesSample, usageSample } from '../../demo/get-started-sample';
  import { galleryHref } from '../../demo/paths';
</script>

<article class="doc-article doc-guide">
  <h1>Get started</h1>
  <p class="doc-lede">Install the library, load its styles, and render a component.</p>
  <p>
    portal-bits is a Svelte 5 component library. Bits UI supplies the interaction. The components
    ship with their measured styles. <code>svelte</code> and <code>bits-ui</code> stay peers.
  </p>
  <h2>Installation</h2>
  <p>Install the package and both peers.</p>
  <pre><code>npm install portal-bits svelte bits-ui</code></pre>
  <h2>Basic usage</h2>
  <p>Import a component in a Svelte file and render it.</p>
  <div class="doc-preview">
    <Button variant="primary">Save changes</Button>
  </div>
  <pre><code>{usageSample}</code></pre>
  <h2>Styles</h2>
  <p>
    Load both stylesheets once, in the root layout. <code>styles.css</code> is the component
    styling. <code>tokens.css</code> is color, type, and space. The font token looks for Roobert, then
    Inter, then the system font. This gallery uses Inter. The package does not ship font files.
  </p>
  <pre><code>{stylesSample}</code></pre>
  <h2>TypeScript</h2>
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
