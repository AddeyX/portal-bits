<script lang="ts">
  import { Select } from 'bits-ui';
  import { Check, ChevronDown } from '@lucide/svelte';
  import type { SelectOption } from '../types';

  const uid = $props.id();
  let {
    label,
    value = $bindable(''),
    options,
    placeholder,
    invalid = false,
    id = uid,
    name,
    required = false,
    disabled = false,
    form,
    theme = 'light',
    sizing = 'stable',
    class: className = '',
    ...rest
  }: {
    label: string;
    value?: string;
    options: SelectOption[];
    placeholder?: string;
    invalid?: boolean;
    id?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    form?: string;
    theme?: 'light' | 'dark';
    sizing?: 'stable' | 'dynamic';
    class?: string;
    'aria-describedby'?: string;
  } = $props();

  const items = $derived([
    ...(placeholder !== undefined ? [{ value: '', label: placeholder }] : []),
    ...options,
  ]);
  const selected = $derived(options.find((option) => option.value === value));
  let control = $state<HTMLButtonElement | null>(null);
  let text = $state<HTMLSpanElement | null>(null);
  let textWidth = $state<number>();

  $effect(() => {
    if (sizing !== 'dynamic' || !text || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) => {
      textWidth = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
    });
    observer.observe(text);
    return () => observer.disconnect();
  });
</script>

<div class="p-select-field">
  <label for={id} class="p-select-label">{label}</label>
  <Select.Root type="single" bind:value {items} {disabled} {required} allowDeselect={false}>
    <Select.Trigger
      {...rest}
      {id}
      type="button"
      role="combobox"
      bind:ref={control}
      aria-invalid={invalid || undefined}
      class={`p-input p-select p-select--${sizing} ${className}`}
    >
      <span
        class="p-select-value"
        style:width={sizing === 'dynamic' && textWidth !== undefined ? `${textWidth}px` : undefined}
      >
        {#if sizing === 'stable'}
          {#each items as item (item.value)}
            <span class="p-select-sizer" aria-hidden="true">{item.label}</span>
          {/each}
        {/if}
        <span class="p-select-text" class:p-select-placeholder={!selected} bind:this={text}
          >{selected?.label ?? placeholder ?? ''}</span
        >
      </span>
      <span class="p-select-chevron" aria-hidden="true"><ChevronDown size={16} /></span>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content
        class="p-select-menu p-theme"
        data-portal-theme={theme}
        align="start"
        sideOffset={8}
        collisionPadding={16}
      >
        <Select.Viewport>
          {#each items as item (item.value)}
            <Select.Item
              value={item.value}
              label={item.label}
              disabled={item.disabled}
              aria-disabled={item.disabled || undefined}
              class="p-select-item"
            >
              {item.label}
              {#if value === item.value}
                <span class="p-select-check"><Check size={16} aria-hidden="true" /></span>
              {/if}
            </Select.Item>
          {/each}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
  {#if name || required}
    <!-- Bits UI only creates its native form input when a name is supplied, and that input omits `form`. -->
    <input
      class="p-sr-only"
      aria-hidden="true"
      tabindex="-1"
      {name}
      {value}
      {required}
      {disabled}
      {form}
      onfocus={() => control?.focus()}
    />
  {/if}
</div>
