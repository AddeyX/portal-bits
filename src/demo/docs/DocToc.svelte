<script lang="ts">
  import { onMount } from 'svelte';

  let { items }: { items: { id: string; label: string; depth: 1 | 2 }[] } = $props();
  let current = $state('');

  onMount(() => {
    // The last heading above this line is the one being read.
    const line = 140;
    const update = () => {
      let active = items[0]?.id ?? '';
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= line) active = item.id;
      }
      current = active;
    };
    update();
    addEventListener('scroll', update, { passive: true });
    return () => removeEventListener('scroll', update);
  });
</script>

<nav class="doc-toc" aria-label="On this page">
  <div class="doc-toc-inner">
    <p>On this page</p>
    <ul>
      {#each items as item (item.id)}
        <li data-depth={item.depth}>
          <a href={`#${item.id}`} aria-current={current === item.id ? 'location' : undefined}
            >{item.label}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</nav>
