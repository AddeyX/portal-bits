<script lang="ts">
  import { Aperture, Search } from '@lucide/svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { prefersReducedMotion } from 'svelte/motion';
  import { fade } from 'svelte/transition';
  import { FloatingNav, Input, Popover } from '$lib';
  import { isDocsPath } from '../demo/catalog';
  import { searchDocs, type SearchRun } from '../demo/search';

  let path = $derived(page.url.pathname);
  let docs = $derived(isDocsPath(path));
  let home = $derived(path === '/');
  let open = $state(false);
  let query = $state('');
  let results = $derived(searchDocs(query));

  function closeSearch() {
    open = false;
    query = '';
  }

  function follow(href: string) {
    closeSearch();
    void goto(href);
  }

  function followTop(event: KeyboardEvent) {
    const first = results[0];
    if (event.key !== 'Enter' || event.isComposing || !first) return;
    event.preventDefault();
    follow(first.href);
  }

  function followClick(event: MouseEvent, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return;
    event.preventDefault();
    follow(href);
  }
</script>

{#snippet textRuns(parts: SearchRun[])}
  {#each parts as run, index (`${index}:${run.match}:${run.text}`)}
    {#if run.match}<strong class="site-search-match">{run.text}</strong>{:else}{run.text}{/if}
  {/each}
{/snippet}

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
    {#snippet actions()}
      {#if docs}
        <div
          class="site-search"
          transition:fade={{ duration: prefersReducedMotion.current ? 0 : 200 }}
          onoutrostart={closeSearch}
        >
          <Popover label="Search docs" bind:open align="end" triggerClass="site-search-trigger">
            {#snippet trigger()}
              <Search size={18} strokeWidth={1.7} />
            {/snippet}
            <div class="site-search-panel">
              <Input
                label="Search docs"
                placeholder="Components and guides"
                bind:value={query}
                autocomplete="off"
                onkeydown={followTop}
              />
              {#if results.length === 0}
                <p class="site-search-empty">No matches</p>
              {:else}
                <ul class="site-search-list" aria-label="Search results">
                  {#each results as hit (hit.href)}
                    <li>
                      <a href={hit.href} onclick={(event) => followClick(event, hit.href)}>
                        <span class="site-search-title">{@render textRuns(hit.titleRuns)}</span>
                        <span class="site-search-meta">{@render textRuns(hit.groupRuns)}</span>
                        <span class="site-search-copy">{@render textRuns(hit.descriptionRuns)}</span
                        >
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          </Popover>
        </div>
      {/if}
    {/snippet}
  </FloatingNav>
</header>
