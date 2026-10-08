<script lang="ts">
  import { RadioGroup } from 'bits-ui';
  import type { RadioOption } from '../types';
  const uid = $props.id();
  let {
    label,
    options,
    value = $bindable(''),
    name,
    required = false,
    disabled = false,
    invalid = false,
    orientation = 'vertical',
    class: className = '',
  }: {
    label: string;
    options: RadioOption[];
    value?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    orientation?: 'vertical' | 'horizontal';
    class?: string;
  } = $props();
</script>

<div class={`p-radio-field ${className}`}>
  <span id={`${uid}-label`} class="p-input-label">{label}</span>
  <RadioGroup.Root
    bind:value
    {name}
    {required}
    {disabled}
    {orientation}
    aria-labelledby={`${uid}-label`}
    aria-invalid={invalid || undefined}
    class="p-radio-group"
    data-orientation={orientation}
  >
    {#each options as option (option.value)}
      <label class="p-radio-option" data-disabled={disabled || option.disabled || undefined}>
        <RadioGroup.Item
          value={option.value}
          disabled={option.disabled}
          aria-labelledby={`${uid}-${option.value}-name`}
          aria-describedby={option.description ? `${uid}-${option.value}-hint` : undefined}
          class="p-radio"
        >
          <span class="p-radio-dot" aria-hidden="true"></span>
        </RadioGroup.Item>
        <span class="p-radio-copy">
          <span id={`${uid}-${option.value}-name`}>{option.label}</span>
          {#if option.description}
            <span id={`${uid}-${option.value}-hint`} class="p-radio-hint">{option.description}</span
            >
          {/if}
        </span>
      </label>
    {/each}
  </RadioGroup.Root>
</div>
