<script lang="ts">
  import { Button } from 'bits-ui';
  import type { ComponentProps } from 'svelte';
  let {
    variant = 'secondary',
    size = 40,
    class: className = '',
    ...rest
  }: ComponentProps<typeof Button.Root> & {
    variant?: 'primary' | 'secondary' | 'green';
    size?: 32 | 40 | 48;
  } = $props();
</script>

<Button.Root {...rest} class={`p-button p-button--${variant} p-button--${size} ${className}`} />
