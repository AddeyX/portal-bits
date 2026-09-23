<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  let {
    label,
    invalid = false,
    value = $bindable(''),
    icon,
    class: className = '',
    ...rest
  }: Omit<HTMLInputAttributes, 'value'> & {
    label: string;
    invalid?: boolean;
    value?: string;
    icon?: Snippet;
  } = $props();
</script>

<div class={`p-input-wrap ${icon ? 'p-input-wrap--icon' : ''}`}>
  {#if icon}<span class="p-input-icon">{@render icon()}</span>{/if}
  <input
    {...rest}
    bind:value
    aria-label={label}
    aria-invalid={invalid || undefined}
    class={`p-input ${className}`}
  />
</div>
