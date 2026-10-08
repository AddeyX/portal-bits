<script lang="ts">
  import { Tabs } from 'bits-ui';
  import type { TabItem } from '../types';
  let {
    label,
    items,
    value = $bindable(items.find((item) => !item.disabled)?.value ?? ''),
    activationMode = 'automatic',
    class: className = '',
  }: {
    label: string;
    items: TabItem[];
    value?: string;
    activationMode?: 'automatic' | 'manual';
    class?: string;
  } = $props();
</script>

<Tabs.Root bind:value {activationMode} class={`p-tabs ${className}`}>
  <Tabs.List aria-label={label} class="p-segmented p-tabs-list">
    {#each items as item (item.value)}
      <Tabs.Trigger value={item.value} disabled={item.disabled} class="p-segmented-item"
        >{item.label}</Tabs.Trigger
      >
    {/each}
  </Tabs.List>
  {#each items as item (item.value)}
    <Tabs.Content value={item.value} class="p-tabs-panel">{@render item.content()}</Tabs.Content>
  {/each}
</Tabs.Root>
