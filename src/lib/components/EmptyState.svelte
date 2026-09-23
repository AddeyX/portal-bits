<script lang="ts">
  import type { Snippet } from 'svelte';
  let {
    title,
    description,
    icon,
    action,
  }: { title: string; description?: string; icon?: Snippet; action?: Snippet } = $props();
</script>

<div class="p-empty">
  {#if icon}<div class="p-empty-icon">{@render icon()}</div>{/if}
  <h3>{title}</h3>
  {#if description}<p>{description}</p>{/if}{@render action?.()}
</div>
