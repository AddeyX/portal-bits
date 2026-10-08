<script lang="ts">
  import { AlertDialog } from 'bits-ui';
  import type { Snippet } from 'svelte';
  let {
    open = $bindable(false),
    title,
    description,
    confirmLabel,
    cancelLabel = 'Cancel',
    tone = 'neutral',
    onConfirm,
    trigger,
    triggerLabel,
    triggerClass = 'p-button p-button--secondary p-button--40',
    theme = 'light',
  }: {
    open?: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel?: string;
    tone?: 'neutral' | 'danger';
    onConfirm?: () => void;
    trigger?: Snippet;
    triggerLabel?: string;
    triggerClass?: string;
    theme?: 'light' | 'dark';
  } = $props();

  function confirm() {
    onConfirm?.();
    open = false;
  }
</script>

<AlertDialog.Root bind:open>
  {#if trigger}<AlertDialog.Trigger class={triggerClass} aria-label={triggerLabel}
      >{@render trigger()}</AlertDialog.Trigger
    >{/if}
  <AlertDialog.Portal>
    <AlertDialog.Overlay class="p-overlay" />
    <AlertDialog.Content class="p-dialog p-alert-dialog p-theme" data-portal-theme={theme}>
      <AlertDialog.Title class="p-title">{title}</AlertDialog.Title>
      <AlertDialog.Description class="p-description">{description}</AlertDialog.Description>
      <div class="p-alert-dialog-actions">
        <AlertDialog.Cancel class="p-button p-button--secondary p-button--40"
          >{cancelLabel}</AlertDialog.Cancel
        >
        <AlertDialog.Action
          class={`p-button p-button--40 ${tone === 'danger' ? 'p-button--danger' : 'p-button--primary'}`}
          onclick={confirm}>{confirmLabel}</AlertDialog.Action
        >
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
