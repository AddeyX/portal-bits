<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  const uid = $props.id();
  let {
    label,
    hideLabel = false,
    invalid = false,
    value = $bindable(''),
    rows = 4,
    id = uid,
    class: className = '',
    ...rest
  }: Omit<HTMLTextareaAttributes, 'value' | 'children'> & {
    label: string;
    hideLabel?: boolean;
    invalid?: boolean;
    value?: string;
    rows?: number;
  } = $props();
</script>

<div class="p-input-wrap">
  <label for={id} class={hideLabel ? 'p-sr-only' : 'p-input-label'}>{label}</label>
  <textarea
    {...rest}
    {id}
    {rows}
    bind:value
    aria-invalid={invalid || undefined}
    class={`p-input p-textarea ${className}`}></textarea>
</div>
