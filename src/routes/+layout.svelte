<script lang="ts">
  import '@fontsource/inter/400.css';
  import '@fontsource/inter/500.css';
  import '@fontsource/inter/600.css';
  import '$lib/styles/base.css';
  import '../gallery.css';
  import { page } from '$app/state';
  import type { Snippet } from 'svelte';
  import { galleryTitle, isDocsPath } from '../demo/catalog';
  import SiteHeader from './SiteHeader.svelte';
  import DocsFrame from './DocsFrame.svelte';
  let { children }: { children: Snippet } = $props();
  let path = $derived(page.url.pathname);
  let bare = $derived(path === '/auth-preview' || path === '/shell' || path.startsWith('/shell/'));
  let docs = $derived(isDocsPath(path));
  let current = $derived(galleryTitle(path));
</script>

<svelte:head>
  <title>{current} — portal-bits</title>
  <meta
    name="description"
    content="A Svelte 5 component library, built on Bits UI. Explore foundations, components, and motion."
  />
</svelte:head>
<div class="p-theme gallery-root" data-portal-theme="light">
  {#if bare}
    {@render children()}
  {:else}
    <a class="p-skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    {#if docs}
      <DocsFrame>{@render children()}</DocsFrame>
    {:else}
      <main id="main-content" tabindex="-1">{@render children()}</main>
    {/if}
  {/if}
</div>
