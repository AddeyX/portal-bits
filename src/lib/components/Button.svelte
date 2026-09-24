<script lang="ts">
  import { Button } from 'bits-ui';
  import type { ComponentProps } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  type Props = { size?: 32 | 40 | 48 } & (
    | (ComponentProps<typeof Button.Root> & { variant?: 'primary' | 'secondary' | 'green' })
    | (HTMLButtonAttributes & { variant: 'quiet'; href?: never; child?: never })
  );
  let {
    variant = 'secondary',
    size = 40,
    children,
    class: className = '',
    ...rest
  }: Props = $props();
</script>

{#if variant === 'quiet'}
  <button
    type="button"
    {...rest as HTMLButtonAttributes}
    class={`p-button p-button--quiet ${className}`}>{@render children?.()}</button
  >
{:else}
  <Button.Root
    {...rest}
    {children}
    class={`p-button p-button--${variant} p-button--${size} ${className}`}
  />
{/if}
