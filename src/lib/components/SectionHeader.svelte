<script lang="ts">
  import type { Snippet } from 'svelte';
  let { title, description, action }: { title: string; description?: string; action?: Snippet } =
    $props();
</script>

<header class="p-section-header">
  <div>
    <h2>{title}</h2>
    {#if description}<p>{description}</p>{/if}
  </div>
  {#if action}<div class="p-section-action">{@render action()}</div>{/if}
</header>
