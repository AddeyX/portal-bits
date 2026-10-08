<script lang="ts">
  import { Button, Progress } from '$lib';
  let {
    indeterminate = false,
    showValue = true,
  }: { indeterminate?: boolean; showValue?: boolean } = $props();
  let uploaded = $state(64);
</script>

<div class="stack">
  <Progress
    label={indeterminate ? 'Preparing files' : 'Uploading photos'}
    value={indeterminate ? null : uploaded}
    {showValue}
  />
  <div class="actions">
    <Button
      size={32}
      disabled={indeterminate}
      onclick={() => (uploaded = Math.max(0, uploaded - 16))}>Back</Button
    >
    <Button
      size={32}
      variant="primary"
      disabled={indeterminate}
      onclick={() => (uploaded = Math.min(100, uploaded + 16))}>Advance</Button
    >
  </div>
</div>

<style>
  .stack {
    display: grid;
    gap: 16px;
    width: 360px;
    max-width: 100%;
  }
  .actions {
    display: flex;
    gap: 8px;
  }
</style>
