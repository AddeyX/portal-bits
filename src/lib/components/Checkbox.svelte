<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import type { ComponentProps, Snippet } from 'svelte';
  import { Check } from '@lucide/svelte';
  const uid = $props.id();
  let {
    checked = $bindable(false),
    label,
    invalid = false,
    id = uid,
    name,
    required = false,
    disabled = false,
    form,
    class: className = '',
    ...rest
  }: Omit<
    ComponentProps<typeof Checkbox.Root>,
    'children' | 'child' | 'indeterminate' | 'onIndeterminateChange'
  > & {
    label: Snippet;
    invalid?: boolean;
  } = $props();
  let control = $state<HTMLButtonElement | null>(null);
</script>

<div class="p-checkbox-field">
  <Checkbox.Root
    {...rest}
    {id}
    {name}
    {required}
    {disabled}
    {form}
    bind:checked
    bind:ref={control}
    aria-labelledby={`${uid}-label`}
    aria-invalid={invalid || undefined}
    class={`p-checkbox ${className}`}
  >
    {#if checked}<Check size={13} strokeWidth={3} aria-hidden="true" />{/if}
  </Checkbox.Root>
  <label id={`${uid}-label`} for={id} class="p-checkbox-label">{@render label()}</label>
  {#if required && !name}
    <!-- Bits UI only creates its native form input when a name is supplied. -->
    <input
      type="checkbox"
      class="p-sr-only"
      aria-hidden="true"
      tabindex="-1"
      {checked}
      {required}
      {disabled}
      {form}
      onfocus={() => control?.focus()}
    />
  {/if}
</div>
