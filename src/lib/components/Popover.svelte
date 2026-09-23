<script lang="ts">
  import { Popover } from 'bits-ui';
  import type { Snippet } from 'svelte';
  let {
    open = $bindable(false),
    label,
    trigger,
    children,
    align = 'end',
    side = 'bottom',
    sideOffset = 12,
    theme = 'light',
    triggerClass = 'p-button p-icon-button p-button--secondary p-button--40',
  }: {
    open?: boolean;
    label: string;
    trigger: Snippet;
    children?: Snippet;
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    theme?: 'light' | 'dark';
    triggerClass?: string;
  } = $props();
</script>

<Popover.Root bind:open>
  <Popover.Trigger class={triggerClass} aria-label={label}>{@render trigger()}</Popover.Trigger>
  <Popover.Portal
    ><Popover.Content
      {align}
      {side}
      {sideOffset}
      collisionPadding={16}
      class="p-popover p-theme"
      data-portal-theme={theme}
      aria-label={label}>{@render children?.()}</Popover.Content
    ></Popover.Portal
  >
</Popover.Root>
