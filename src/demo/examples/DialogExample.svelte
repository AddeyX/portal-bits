<script lang="ts">
  import { Alert, Button, Dialog, Input } from '$lib';
  let { description = true }: { description?: boolean } = $props();
  let open = $state(false);
  let name = $state('Alex Morgan');
  let saved = $state(false);
  let error = $state('');

  function save(event: SubmitEvent) {
    event.preventDefault();
    if (!name.trim()) {
      error = 'Enter a display name.';
      return;
    }
    error = '';
    saved = true;
    open = false;
  }
</script>

<div class="stack">
  <Dialog
    title="Make yourself at home"
    description={description ? 'Edit your display name. This example stays in your browser.' : ''}
    bind:open
  >
    {#snippet trigger()}
      Edit profile
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg
      >
    {/snippet}
    <form onsubmit={save}>
      <Input
        label="Display name"
        bind:value={name}
        invalid={!!error}
        aria-describedby={error ? 'name-error' : undefined}
      />
      {#if error}<Alert id="name-error" message={error} />{/if}
      <div class="actions">
        <span>Local demo only</span>
        <Button variant="green" type="submit">Save profile</Button>
      </div>
    </form>
  </Dialog>
  <p aria-live="polite">
    {saved ? `Profile saved as ${name}.` : 'Try Tab, Escape, and clicking outside.'}
  </p>
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
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    color: var(--portal-muted);
    font-size: 14px;
  }
</style>
