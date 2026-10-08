<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import type { MenuEntry } from '../types';
  let {
    label,
    items,
    trigger,
    open = $bindable(false),
    align = 'end',
    side = 'bottom',
    theme = 'light',
    triggerClass = 'p-button p-icon-button p-button--secondary p-button--40',
  }: {
    label: string;
    items: MenuEntry[];
    trigger: Snippet;
    open?: boolean;
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    theme?: 'light' | 'dark';
    triggerClass?: string;
  } = $props();
</script>

<DropdownMenu.Root bind:open>
  <DropdownMenu.Trigger class={triggerClass} aria-label={label}
    >{@render trigger()}</DropdownMenu.Trigger
  >
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      {align}
      {side}
      sideOffset={8}
      collisionPadding={16}
      class="p-menu p-theme"
      data-portal-theme={theme}
    >
      {#each items as entry, index (index)}
        {#if entry.type === 'separator'}
          <DropdownMenu.Separator class="p-menu-separator" />
        {:else}
          <DropdownMenu.Item
            disabled={entry.disabled}
            onSelect={entry.onSelect}
            class={`p-menu-item ${entry.tone === 'danger' ? 'p-menu-item--danger' : ''}`}
          >
            {#if entry.icon}<span class="p-menu-icon" aria-hidden="true"
                ><entry.icon size={16} /></span
              >{/if}
            <span>{entry.label}</span>
            {#if entry.shortcut}<kbd class="p-menu-shortcut">{entry.shortcut}</kbd>{/if}
          </DropdownMenu.Item>
        {/if}
      {/each}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
