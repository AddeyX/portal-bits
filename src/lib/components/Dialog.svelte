<script lang="ts">
  import { Dialog } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { X } from '@lucide/svelte';
  let {
    open = $bindable(false),
    title,
    description = '',
    trigger,
    children,
    triggerLabel,
    triggerClass = 'p-button p-button--secondary p-button--40',
    theme = 'light',
  }: {
    open?: boolean;
    title: string;
    description?: string;
    trigger?: Snippet;
    triggerLabel?: string;
    triggerClass?: string;
    children?: Snippet;
    theme?: 'light' | 'dark';
  } = $props();
</script>

<Dialog.Root bind:open>
  {#if trigger}<Dialog.Trigger class={triggerClass} aria-label={triggerLabel}
      >{@render trigger()}</Dialog.Trigger
    >{/if}
  <Dialog.Portal>
    <Dialog.Overlay class="p-overlay" />
    <Dialog.Content class="p-dialog p-theme" data-portal-theme={theme}>
      <div class="p-dialog-heading">
        <Dialog.Title class="p-title">{title}</Dialog.Title><Dialog.Close
          class="p-button p-icon-button p-button--secondary p-button--32"
          aria-label="Close dialog"><X size={16} /></Dialog.Close
        >
      </div>
      {#if description}<Dialog.Description class="p-description">{description}</Dialog.Description
        >{/if}
      <div class="p-dialog-body">{@render children?.()}</div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
