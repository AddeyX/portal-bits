<script lang="ts">
  import type { Snippet } from 'svelte';
  import { page } from '$app/state';
  import { componentDocs, componentGroups, guideLinks } from '../demo/catalog';
  let { children }: { children: Snippet } = $props();
  let path = $derived(page.url.pathname);
</script>

<div class="docs-frame">
  <nav class="docs-sidebar" aria-label="Documentation">
    <p class="docs-group-label">Guides</p>
    {#each guideLinks as guide (guide.href)}
      <a href={guide.href} aria-current={path === guide.href ? 'page' : undefined}>{guide.label}</a>
    {/each}
    <p class="docs-group-label">Components</p>
    <a href="/components" aria-current={path === '/components' ? 'page' : undefined}
      >All components</a
    >
    {#each componentGroups as group (group)}
      <p class="docs-subgroup">{group}</p>
      {#each componentDocs.filter((item) => item.group === group) as item (item.slug)}
        <a
          href={`/components/${item.slug}`}
          aria-current={path === `/components/${item.slug}` ? 'page' : undefined}>{item.title}</a
        >
      {/each}
    {/each}
  </nav>
  <main id="main-content" class="docs-main" tabindex="-1">{@render children()}</main>
</div>
