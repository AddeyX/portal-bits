<script lang="ts">
  import { ToggleGroup } from '$lib';
  let { compact = false, disabled = false }: { compact?: boolean; disabled?: boolean } = $props();
  let selected = $state('all');
</script>

{#snippet grid()}
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    ><rect width="7" height="7" x="3" y="3" rx="1" /><rect
      width="7"
      height="7"
      x="14"
      y="3"
      rx="1"
    /><rect width="7" height="7" x="14" y="14" rx="1" /><rect
      width="7"
      height="7"
      x="3"
      y="14"
      rx="1"
    /></svg
  >
{/snippet}
{#snippet apps()}
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    ><rect width="18" height="18" x="3" y="3" rx="4" /><path d="M12 8v8" /><path d="M8 12h8" /></svg
  >
{/snippet}
{#snippet layers()}
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    ><path
      d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"
    /><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" /><path
      d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"
    /></svg
  >
{/snippet}

<div class="stack">
  <ToggleGroup
    label="Example category"
    bind:value={selected}
    {compact}
    {disabled}
    items={[
      { value: 'all', label: 'All', icon: grid },
      { value: 'apps', label: 'Apps', icon: apps },
      { value: 'collections', label: 'Collections', icon: layers },
    ]}
  />
  <p aria-live="polite">{selected || 'Nothing selected'}</p>
</div>

<style>
  .stack {
    display: grid;
    justify-items: center;
    gap: 12px;
  }
  p {
    margin: 0;
  }
</style>
