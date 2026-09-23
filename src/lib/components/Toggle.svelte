<script lang="ts">
  import { Toggle } from 'bits-ui';
  import type { ComponentProps } from 'svelte';
  let {
    label,
    pressed = $bindable(false),
    class: className = '',
    ...rest
  }: ComponentProps<typeof Toggle.Root> & { label: string } = $props();
</script>

<Toggle.Root {...rest} bind:pressed aria-label={label} class={`p-toggle ${className}`} />
