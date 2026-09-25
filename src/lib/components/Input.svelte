<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  const uid = $props.id();
  let {
    label,
    hideLabel = false,
    invalid = false,
    value = $bindable(''),
    icon,
    id = uid,
    class: className = '',
    ...rest
  }: Omit<HTMLInputAttributes, 'value'> & {
    label: string;
    hideLabel?: boolean;
    invalid?: boolean;
    value?: string;
    icon?: Snippet;
  } = $props();
</script>

<div class={`p-input-wrap ${icon ? 'p-input-wrap--icon' : ''}`}>
  <label for={id} class={hideLabel ? 'p-sr-only' : 'p-input-label'}>{label}</label>
  {#if icon}<span class="p-input-icon">{@render icon()}</span>{/if}
  <input
    {...rest}
    {id}
    bind:value
    aria-invalid={invalid || undefined}
    class={`p-input ${className}`}
  />
</div>
