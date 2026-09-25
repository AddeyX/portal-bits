<script lang="ts">
  import { ArrowRight } from '@lucide/svelte';
  import { AppCard, Badge, Button, ToggleGroup } from '$lib';
  import { apps } from '../demo/data';
  let view = $state('grid');
  let favorite = $state(false);
  const featured = apps[0];
</script>

<div class="home">
  <section class="home-hero">
    <p class="home-kicker"><span class="status-dot"></span> 29 components · Built on Bits UI</p>
    <h1>Everything feels connected.</h1>
    <p>
      A measured design language, made reusable. Typed Svelte components you can inspect, then take
      with you.
    </p>
    <Button href="/components" variant="primary" size={48}
      >Explore docs <ArrowRight size={16} /></Button
    >
  </section>
  <div class="home-stage">
    <div class="home-stage-grid">
      <section class="stage-panel stage-panel-side" aria-label="Collection preview">
        <header>
          <h2>Collection</h2>
          <Badge><span class="status-dot"></span> Live</Badge>
        </header>
        <ToggleGroup
          label="Preview filter"
          bind:value={view}
          items={[
            { value: 'grid', label: 'Grid' },
            { value: 'list', label: 'List' },
          ]}
        />
        <p>{view === 'grid' ? 'Cards, side by side.' : 'A quieter list of the same work.'}</p>
      </section>
      <div class="stage-panel stage-panel-main">
        <AppCard
          title={featured.title}
          category={featured.category}
          description={featured.description}
          image={featured.image}
          imageAlt={`${featured.title} geometric poster`}
          bind:favorite
        />
      </div>
    </div>
  </div>
  <section class="home-notes" aria-label="Library qualities">
    <div>
      <h2>Measured</h2>
      <p>Color, type, space, and depth stay traceable to the source.</p>
    </div>
    <div>
      <h2>Accessible</h2>
      <p>Keyboard behavior, names, and focus come from Bits UI.</p>
    </div>
    <div>
      <h2>Composable</h2>
      <p>Import the pieces you need. The gallery stays behind.</p>
    </div>
  </section>
</div>
