<script lang="ts">
  import { Checkbox } from '$lib';
  let {
    invalid = false,
    disabled = false,
    required = false,
  }: { invalid?: boolean; disabled?: boolean; required?: boolean } = $props();
  let agreed = $state(false);
</script>

<div class="field">
  <Checkbox
    bind:checked={agreed}
    {invalid}
    {required}
    {disabled}
    aria-describedby={invalid ? 'terms-error' : undefined}
  >
    {#snippet label()}I agree to the <a href="#terms">demo terms</a>.{/snippet}
  </Checkbox>
  {#if invalid}
    <p id="terms-error" class="error">Agree to the demo terms to continue.</p>
  {/if}
  <p aria-live="polite">{agreed ? 'Agreed' : 'Not agreed'}</p>
</div>

<style>
  .field {
    max-width: 340px;
  }
  .error {
    color: var(--portal-error);
  }
</style>
