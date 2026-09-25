<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import type { Snippet } from 'svelte';
  let {
    text,
    theme = 'light',
    children,
  }: { text: string; theme?: 'light' | 'dark'; children?: Snippet } = $props();
</script>

<Tooltip.Provider delayDuration={300}
  ><Tooltip.Root>
    <Tooltip.Trigger
      aria-label={text}
      class="p-button p-icon-button p-button--secondary p-button--40"
      >{@render children?.()}</Tooltip.Trigger
    >
    <Tooltip.Portal
      ><Tooltip.Content sideOffset={8} class="p-tooltip p-theme" data-portal-theme={theme}
        >{text}</Tooltip.Content
      ></Tooltip.Portal
    >
  </Tooltip.Root></Tooltip.Provider
>
