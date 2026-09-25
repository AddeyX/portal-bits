<script lang="ts" generics="T extends { id: string; label: string }">
  import type { Snippet } from 'svelte';
  let {
    label,
    items,
    item,
    layout = 'responsive',
  }: {
    label: string;
    items: T[];
    item: Snippet<[T]>;
    layout?: 'responsive' | 'carousel';
  } = $props();
  const id = $props.id();
  let viewport = $state<HTMLDivElement>();
  let current = $state(0);
  const itemIds = $derived(JSON.stringify(items.map((entry) => entry.id)));

  function slides() {
    return viewport?.querySelectorAll<HTMLLIElement>(':scope > ul > li');
  }
  function select(index: number) {
    current = Math.max(0, Math.min(index, items.length - 1));
    const slide = slides()?.[current];
    if (viewport && slide) viewport.scrollLeft = slide.offsetLeft;
  }
  function syncSelection() {
    if (!viewport) return;
    const max = viewport.scrollWidth - viewport.clientWidth;
    if (max <= 0) {
      current = 0;
      return;
    }
    let nearest = 0;
    let distance = Infinity;
    slides()?.forEach((slide, index) => {
      const delta = Math.abs(Math.min(slide.offsetLeft, max) - viewport!.scrollLeft);
      if (delta < distance) {
        distance = delta;
        nearest = index;
      }
    });
    current = nearest;
  }
  function onkeydown(event: KeyboardEvent) {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey)
      return;
    let next: number;
    switch (event.key) {
      case 'ArrowLeft':
        next = current - 1;
        break;
      case 'ArrowRight':
        next = current + 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = items.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(next);
  }
  // Synchronize the DOM scroll position when identity/order/layout changes.
  $effect(() => {
    itemIds;
    layout;
    if (!viewport) return;
    current = 0;
    viewport.scrollLeft = 0;
    const observer = new ResizeObserver(syncSelection);
    observer.observe(viewport);
    return () => observer.disconnect();
  });
</script>

<section
  class="p-carousel"
  class:p-carousel-responsive={layout === 'responsive'}
  aria-label={label}
>
  {#if items.length}
    <!-- A labeled scroll viewport needs focus; nested controls keep their own keys. -->
    <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
    <div
      class="p-carousel-viewport"
      {id}
      bind:this={viewport}
      role="group"
      aria-label={`${label} slides`}
      tabindex="0"
      dir="ltr"
      {onkeydown}
      onscroll={syncSelection}
    >
      <ul class="p-carousel-track">
        {#each items as entry, index (entry.id)}
          <li class="p-carousel-slide">
            <div
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}: ${entry.label}`}
            >
              {@render item(entry)}
            </div>
          </li>
        {/each}
      </ul>
    </div>
    {#if items.length > 1}
      <div class="p-carousel-pagination" role="group" aria-label={`${label} pagination`}>
        {#each items as entry, index (entry.id)}
          <button
            type="button"
            class="p-carousel-dot"
            aria-label={`Go to slide ${index + 1}: ${entry.label}`}
            aria-current={current === index ? 'true' : undefined}
            aria-controls={id}
            onclick={() => select(index)}><span aria-hidden="true"></span></button
          >
        {/each}
      </div>
    {/if}
  {/if}
</section>

<style>
  .p-carousel {
    container: portal-carousel / inline-size;
    min-width: 0;
    width: 100%;
    color: var(--portal-ink);
  }
  .p-carousel-viewport {
    position: relative;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-behavior: auto;
    scrollbar-width: thin;
    padding: var(--portal-space-1);
  }
  .p-carousel-track {
    display: flex;
    gap: var(--portal-space-4);
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .p-carousel-slide {
    flex: 0 0 88%;
    min-width: 0;
    scroll-snap-align: start;
  }
  .p-carousel-slide:only-child {
    flex-basis: 100%;
  }
  .p-carousel-slide > div {
    height: 100%;
  }
  .p-carousel-pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: var(--portal-space-4);
  }
  .p-carousel-dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--portal-ink);
    cursor: pointer;
  }
  .p-carousel-dot span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.15;
  }
  .p-carousel-dot[aria-current] span {
    opacity: 1;
  }
  .p-carousel-dot:hover {
    background: var(--portal-soft);
  }
  @container portal-carousel (min-width: 48rem) {
    .p-carousel-responsive .p-carousel-track {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--portal-space-6);
    }
    .p-carousel-responsive .p-carousel-viewport {
      overflow: visible;
      scroll-snap-type: none;
    }
    .p-carousel-responsive .p-carousel-pagination {
      display: none;
    }
  }
</style>
