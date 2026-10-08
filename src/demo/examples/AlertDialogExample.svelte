<script lang="ts">
  import { AlertDialog } from '$lib';
  let { tone = 'danger' }: { tone?: 'neutral' | 'danger' } = $props();
  let drafts = $state(3);
</script>

<div class="stack">
  <AlertDialog
    title={tone === 'danger' ? 'Delete this draft?' : 'Publish this draft?'}
    description={tone === 'danger'
      ? 'The draft and its comments are removed for everyone. This cannot be undone.'
      : 'Everyone with the link can read it. You can unpublish later.'}
    confirmLabel={tone === 'danger' ? 'Delete draft' : 'Publish'}
    {tone}
    onConfirm={() => (drafts = Math.max(0, drafts - 1))}
  >
    {#snippet trigger()}{tone === 'danger' ? 'Delete draft' : 'Publish draft'}{/snippet}
  </AlertDialog>
  <p aria-live="polite">{drafts} {drafts === 1 ? 'draft' : 'drafts'} left</p>
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
