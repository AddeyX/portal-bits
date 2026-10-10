<script lang="ts">
  import '@fontsource/inter/400.css';
  import '@fontsource/inter/500.css';
  import '@fontsource/inter/600.css';
  import '$lib/styles/base.css';
  import '../gallery.css';
  import { browser, dev } from '$app/environment';
  import { page } from '$app/state';
  import type { Component, Snippet } from 'svelte';
  import { galleryTitle, isDocsPath } from '../demo/catalog';
  import { galleryPath } from '../demo/paths';
  import SiteHeader from './SiteHeader.svelte';
  import DocsFrame from './DocsFrame.svelte';
  let { children }: { children: Snippet } = $props();
  let Inspector = $state<Component<{ workspaceRoot?: string | null }> | null>(null);
  if (dev && browser) {
    void import('sv-agentation').then(({ Agentation }) => {
      Inspector = Agentation;
    });
  }
  let path = $derived(galleryPath(page.url.pathname));
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

<!-- Dev-only inspector: a dynamic import lets the production build drop it, and `browser` keeps it out of SSR -->
{#if Inspector}
  <Inspector workspaceRoot={import.meta.env.VITE_WORKSPACE_ROOT ?? '.'} />
{/if}
