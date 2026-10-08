<script lang="ts">
  import { Alert, Textarea } from '$lib';
  let {
    invalid = false,
    disabled = false,
    required = false,
  }: { invalid?: boolean; disabled?: boolean; required?: boolean } = $props();
  let note = $state('Pick up the prints on Thursday.');
</script>

<div class="field">
  <Textarea
    label="Project note"
    placeholder="What should the team know?"
    bind:value={note}
    {invalid}
    {disabled}
    {required}
    maxlength={200}
    aria-describedby={invalid ? 'note-error' : 'note-count'}
  />
  {#if invalid}
    <Alert id="note-error" message="Keep the note under 200 characters." />
  {:else}
    <p id="note-count">{note.length} of 200 characters</p>
  {/if}
</div>

<style>
  .field {
    width: 360px;
    max-width: 100%;
  }
  p {
    margin: 8px 0 0;
    color: var(--portal-muted);
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }
</style>
