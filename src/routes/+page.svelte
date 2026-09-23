<script lang="ts">
  import {
    ArrowUpRight,
    ArrowRight,
    Heart,
    Search,
    Grid2X2,
    List,
    Plus,
    Check,
    Sparkles,
    Layers,
    Component,
    Wind,
  } from '@lucide/svelte';
  import { apps } from '../demo/data';
  import {
    SectionHeader,
    Button,
    Badge,
    AppCard,
    ToggleGroup,
    Input,
    EmptyState,
    Popover,
    Dialog,
    Avatar,
  } from '$lib';
  let category = $state('all');
  let view = $state('grid');
  let query = $state('');
  let favorites = $state<Record<string, boolean>>(
    Object.fromEntries(apps.map((app) => [app.id, false])),
  );
  let selected = $state<(typeof apps)[number] | null>(null);
  let detailOpen = $state(false);
  let filtered = $derived(
    apps.filter(
      (a) =>
        (!category || category === 'all' || a.category === category) &&
        `${a.title} ${a.category}`.toLowerCase().includes(query.toLowerCase()),
    ),
  );
  let saved = $derived(apps.filter((a) => favorites[a.id]));
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'Creative', label: 'Creative' },
    { value: 'Tools', label: 'Tools' },
    { value: 'Social', label: 'Social' },
  ];
  function explore(app: (typeof apps)[number]) {
    selected = app;
    detailOpen = true;
  }
</script>

<div class="gallery-page">
  <header class="page-intro">
    <div>
      <h1>Everything feels connected.</h1>
      <p>The Portal design language, made reusable.</p>
    </div>
    <a href="/components" class="intro-link">Explore components <ArrowUpRight size={17} /></a>
  </header>
  <section class="gallery-surface spotlight-surface">
    <SectionHeader
      title="A world of possibilities"
      description="Familiar patterns. Fresh starting points."
    >
      {#snippet action()}<Badge><span class="status-dot"></span> Live component demo</Badge
        >{/snippet}
    </SectionHeader>
    <div class="spotlight-grid">
      {#each apps.slice(0, 3) as app (app.id)}<AppCard
          {...app}
          spotlight
          imageAlt={`${app.title} geometric poster`}
          bind:favorite={favorites[app.id]}
          >{#snippet action()}<Button size={32} onclick={() => explore(app)}
              >Explore <ArrowUpRight size={13} /></Button
            >{/snippet}</AppCard
        >{/each}
    </div>
    <div class="spotlight-foot">
      <span><span class="status-dot"></span> Real components. Local demo data.</span><span
        >Try a card, save a favorite, make it yours.</span
      >
    </div>
  </section>
  <section class="building-row" aria-label="Library sections">
    <a href="/foundations"
      ><span class="building-icon mint"><Layers size={21} /></span>
      <div>
        <h2>Foundations</h2>
        <p>Color, type, space & depth</p>
      </div>
      <ArrowUpRight size={18} /></a
    ><a href="/components"
      ><span class="building-icon lavender"><Component size={21} /></span>
      <div>
        <h2>18 components</h2>
        <p>Accessible from the inside out</p>
      </div>
      <ArrowUpRight size={18} /></a
    ><a href="/motion"
      ><span class="building-icon peach"><Wind size={21} /></span>
      <div>
        <h2>Small moments</h2>
        <p>Feedback that feels natural</p>
      </div>
      <ArrowUpRight size={18} /></a
    >
  </section>
  <section class="gallery-surface" id="app-gallery">
    <SectionHeader
      title="Explore the collection"
      description="A working composition of cards, filters, inputs, and toggles."
    >
      {#snippet action()}<Popover label="Saved favorites"
          >{#snippet trigger()}<Heart size={17} />{/snippet}
          <div class="panel-heading">
            <h3>Favorites</h3>
            <Badge>{saved.length}</Badge>
          </div>
          {#if saved.length}<div class="saved-list">
              {#each saved as app (app.id)}<div>
                  <Avatar alt={app.title} size={36} /><span>{app.title}</span><button
                    class="text-action"
                    aria-label={`Remove ${app.title}`}
                    onclick={() => (favorites[app.id] = false)}>Remove</button
                  >
                </div>{/each}
            </div>{:else}<EmptyState
              title="A space for your favorites"
              description="Tap a heart on any card to save it here."
              >{#snippet icon()}<Heart size={24} />{/snippet}</EmptyState
            >{/if}</Popover
        >{/snippet}
    </SectionHeader>
    <div class="collection-toolbar">
      <ToggleGroup label="Filter collection" items={categories} bind:value={category} />
      <div class="collection-tools">
        <Input label="Search collection" placeholder="Search collection" bind:value={query}
          >{#snippet icon()}<Search size={16} />{/snippet}</Input
        ><ToggleGroup
          label="Collection view"
          compact
          bind:value={view}
          items={[
            { value: 'grid', label: 'Grid view', icon: gridIcon },
            { value: 'list', label: 'List view', icon: listIcon },
          ]}
        />
      </div>
    </div>
    {#snippet gridIcon()}<Grid2X2 size={16} />{/snippet}{#snippet listIcon()}<List
        size={16}
      />{/snippet}
    <div class="collection-count" aria-live="polite">
      {filtered.length} applications <span>Fictional names. Real interactions.</span>
    </div>
    {#if filtered.length}<div class:collection-list={view === 'list'} class="collection-grid">
        {#each filtered as app (app.id)}<AppCard
            {...app}
            imageAlt={`${app.title} geometric poster`}
            bind:favorite={favorites[app.id]}
            >{#snippet action()}<Button
                size={32}
                onclick={() => explore(app)}
                aria-label={`View ${app.title}`}><ArrowUpRight size={16} /></Button
              >{/snippet}</AppCard
          >{/each}
      </div>{:else}<EmptyState
        title="Nothing here yet"
        description="Try another category or clear your search."
        >{#snippet icon()}<Search size={25} />{/snippet}{#snippet action()}<Button
            onclick={() => {
              query = '';
              category = 'all';
            }}>Clear filters</Button
          >{/snippet}</EmptyState
      >{/if}
  </section>
  <footer class="gallery-footer">
    <span>Inspired by Abstract Portal. Built on Bits UI.</span><a href="/foundations"
      >See what was measured <ArrowRight size={14} /></a
    >
  </footer>
</div>
<Dialog
  bind:open={detailOpen}
  title={selected?.title ?? 'Application'}
  description="A neutral application detail demo."
  >{#if selected}<img class="detail-art" src={selected.image} alt={`${selected.title} poster`} />
    <p class="panel-copy">{selected.description}</p>
    <div class="detail-actions">
      <Badge>{selected.category}</Badge><Button
        variant="green"
        onclick={() => (favorites[selected!.id] = !favorites[selected!.id])}
        >{#if favorites[selected.id]}<Check size={16} /> Saved{:else}<Plus size={16} /> Save to favorites{/if}</Button
      >
    </div>{/if}</Dialog
>
