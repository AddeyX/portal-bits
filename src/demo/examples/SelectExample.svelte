<script lang="ts">
  import { Select, type SelectOption } from '$lib';
  let {
    invalid = false,
    disabled = false,
    required = false,
    sizing = 'stable',
  }: {
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
    sizing?: 'stable' | 'dynamic';
  } = $props();
  const options: SelectOption[] = [
    { value: 'notes', label: 'Notes' },
    { value: 'drafts', label: 'Drafts' },
    { value: 'research', label: 'Shared research notes' },
    { value: 'archived', label: 'Archived', disabled: true },
  ];
  let category = $state('');
</script>

<div class="field">
  <Select
    label="Record category"
    bind:value={category}
    placeholder="Choose a category"
    {options}
    {invalid}
    {required}
    {disabled}
    {sizing}
    aria-describedby={invalid ? 'category-error' : undefined}
  />
  {#if invalid}<p id="category-error" class="error">Choose a category.</p>{/if}
  <p aria-live="polite">{category || 'No category'}</p>
</div>

<style>
  .field {
    max-width: 340px;
  }
  .error {
    color: var(--portal-error);
  }
</style>
