<script lang="ts">
  import type { Snippet } from 'svelte';
  let { breadcrumb, actions }: { breadcrumb?: string; actions?: Snippet } = $props();
</script>

<header class="p-topbar">
  <span class="p-breadcrumb">Portal <span>/</span> {breadcrumb ?? 'Overview'}</span>
  <div class="p-topbar-actions">{@render actions?.()}</div>
</header>
