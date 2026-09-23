<script lang="ts">
  import type { Snippet } from 'svelte';
  let {
    variant = 'neutral',
    children,
  }: { variant?: 'neutral' | 'spotlight' | 'success'; children?: Snippet } = $props();
</script>

<span class={`p-badge p-badge--${variant}`}>{@render children?.()}</span>
