<script lang="ts">
  import { inlineParts } from './guides';

  let { text }: { text: string } = $props();
  const parts = $derived(inlineParts(text));
</script>

{#each parts as part, index (index)}{#if part.code}<code>{part.text}</code
    >{:else}{part.text}{/if}{/each}
