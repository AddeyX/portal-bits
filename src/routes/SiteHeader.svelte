<script lang="ts">
  import { Aperture } from '@lucide/svelte';
  import { page } from '$app/state';
  import { FloatingNav } from '$lib';
  import { isDocsPath } from '../demo/catalog';

  let path = $derived(page.url.pathname);
  let docs = $derived(isDocsPath(path));
  let home = $derived(path === '/');
</script>

<header class="site-header">
  <FloatingNav label="Primary">
    {#snippet brand()}
      <a
        class="site-brand"
        href="/"
        aria-label="portal-bits home"
        aria-current={home ? 'page' : undefined}
      >
        <span class="site-brand-mark"><Aperture size={18} strokeWidth={1.7} /></span>
        <span class="site-brand-name">portal<span>bits</span></span>
      </a>
    {/snippet}
    {#snippet items()}
      <a href="/components" aria-current={docs ? 'page' : undefined}>Docs</a>
      <a href="/" aria-current={home ? 'page' : undefined}>Home</a>
      <a href="https://github.com/AddeyX/portal-bits" rel="noreferrer" target="_blank">GitHub</a>
    {/snippet}
  </FloatingNav>
</header>
