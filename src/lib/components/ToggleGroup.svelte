<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import type { Snippet } from 'svelte';
  let {
    label,
    items,
    value = $bindable(''),
    disabled = false,
    compact = false,
  }: {
    label: string;
    items: { value: string; label: string; icon?: Snippet; disabled?: boolean }[];
    value?: string;
    disabled?: boolean;
    compact?: boolean;
  } = $props();
</script>

<ToggleGroup.Root
  type="single"
  bind:value
  {disabled}
  aria-label={label}
  class={`p-segmented ${compact ? 'p-segmented--compact' : ''}`}
>
  {#each items as item (item.value)}
    <ToggleGroup.Item
      value={item.value}
      disabled={item.disabled}
      aria-label={item.label}
      class="p-segmented-item"
    >
      {#if item.icon}{@render item.icon()}{/if}{#if !compact}{item.label}{/if}
    </ToggleGroup.Item>
  {/each}
</ToggleGroup.Root>
