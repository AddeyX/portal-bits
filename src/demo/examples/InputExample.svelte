<script lang="ts">
  import { Input } from '$lib';
  let {
    invalid = false,
    disabled = false,
    required = false,
  }: { invalid?: boolean; disabled?: boolean; required?: boolean } = $props();
  let value = $state('');
</script>

<div class="field">
  <Input
    label="Email"
    type="email"
    placeholder="alex@example.com"
    bind:value
    {invalid}
    {required}
    {disabled}
    aria-describedby={invalid ? 'email-error' : undefined}
  />
  {#if invalid}
    <p id="email-error" class="error">Enter an email address, such as alex@example.com.</p>
  {/if}
  <p aria-live="polite">{value ? `Bound value: “${value}”` : 'Type to try the bound value.'}</p>
</div>

<style>
  .field {
    max-width: 340px;
  }
  .error {
    color: var(--portal-error);
  }
</style>
