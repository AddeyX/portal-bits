<script lang="ts">
  import { DropdownMenu } from '$lib';
  import { Copy, Ellipsis, Pencil, Share2, Trash2 } from '@lucide/svelte';
  let {
    align = 'end',
    shortcuts = true,
  }: { align?: 'start' | 'center' | 'end'; shortcuts?: boolean } = $props();
  let last = $state('Nothing yet');
</script>

<div class="stack">
  <DropdownMenu
    label="Draft actions"
    {align}
    items={[
      {
        label: 'Rename',
        icon: Pencil,
        shortcut: shortcuts ? 'R' : undefined,
        onSelect: () => (last = 'Rename'),
      },
      {
        label: 'Duplicate',
        icon: Copy,
        shortcut: shortcuts ? 'D' : undefined,
        onSelect: () => (last = 'Duplicate'),
      },
      { label: 'Share', icon: Share2, onSelect: () => (last = 'Share') },
      { type: 'separator' },
      { label: 'Delete', icon: Trash2, tone: 'danger', onSelect: () => (last = 'Delete') },
    ]}
  >
    {#snippet trigger()}<Ellipsis size={17} />{/snippet}
  </DropdownMenu>
  <p aria-live="polite">Last action: {last}</p>
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
