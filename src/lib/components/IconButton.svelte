<script lang="ts">
  import Button from './Button.svelte';
  import type { ComponentProps } from 'svelte';
  let {
    label,
    class: className = '',
    ...rest
  }: ComponentProps<typeof Button> & { label: string } = $props();
</script>

<Button {...rest} aria-label={label} class={`p-icon-button ${className}`} />
