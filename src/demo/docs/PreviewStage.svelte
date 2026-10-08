<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label,
    layout = 'center',
    children,
  }: { label: string; layout?: 'center' | 'wide'; children: Snippet } = $props();
</script>

<div class="doc-preview-stage" role="region" aria-label={label} data-layout={layout}>
  <div class="doc-preview-content">
    {@render children()}
  </div>
</div>
