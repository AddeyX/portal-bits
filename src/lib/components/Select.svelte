<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import type { SelectOption } from '../types';
  const uid = $props.id();
  let {
    label,
    value = $bindable(''),
    options,
    placeholder,
    invalid = false,
    id = uid,
    class: className = '',
    ...rest
  }: Omit<HTMLSelectAttributes, 'value' | 'multiple' | 'children' | 'size'> & {
    label: string;
    value?: string;
    options: SelectOption[];
    placeholder?: string;
    invalid?: boolean;
  } = $props();
</script>

<div class="p-select-field">
  <label for={id} class="p-select-label">{label}</label>
  <select
    {...rest}
    {id}
    bind:value
    aria-invalid={invalid || undefined}
    class={`p-input p-select ${className}`}
  >
    {#if placeholder !== undefined}<option value="">{placeholder}</option>{/if}
    {#each options as option (option.value)}
      <option value={option.value} disabled={option.disabled}>{option.label}</option>
    {/each}
  </select>
</div>
