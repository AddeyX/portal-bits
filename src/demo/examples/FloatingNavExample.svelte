<script lang="ts">
  import { FloatingNav } from '$lib';
  let { actions = true }: { actions?: boolean } = $props();
</script>

{#snippet brand()}<a href="#home">Home</a>{/snippet}
{#snippet items()}<a href="#docs" aria-current="page">Docs</a>{/snippet}
{#snippet links()}<a href="https://github.com/AddeyX/portal-bits">GitHub</a>{/snippet}

<FloatingNav label="Example" {brand} {items} actions={actions ? links : undefined} />
