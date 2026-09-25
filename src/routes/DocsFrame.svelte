<script lang="ts">
  import type { Snippet } from 'svelte';
  import { ChevronDown } from '@lucide/svelte';
  import { page } from '$app/state';
  import { componentDocs, componentGroups, galleryTitle, guideLinks } from '../demo/catalog';
  let { children }: { children: Snippet } = $props();
  const linksId = $props.id();
  let path = $derived(page.url.pathname);
  let openedAt = $state<string | null>(null);
  let open = $derived(openedAt === path);
</script>

<div class="docs-frame">
  <nav class="docs-sidebar" aria-label="Documentation" data-open={open || undefined}>
    <button
      type="button"
      class="docs-menu-toggle"
      aria-expanded={open}
      aria-controls={linksId}
      onclick={() => (openedAt = open ? null : path)}
    >
      <span class="docs-menu-label">Browse docs</span>
      <span class="docs-menu-current">{galleryTitle(path)}</span>
      <ChevronDown size={16} aria-hidden="true" />
    </button>
    <div class="docs-sidebar-links" id={linksId}>
      <p class="docs-group-label">Guides</p>
      {#each guideLinks as guide (guide.href)}
        <a href={guide.href} aria-current={path === guide.href ? 'page' : undefined}
          >{guide.label}</a
        >
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
    </div>
  </nav>
  <main id="main-content" class="docs-main" tabindex="-1">{@render children()}</main>
</div>
