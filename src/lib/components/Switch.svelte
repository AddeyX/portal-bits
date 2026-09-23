<script lang="ts">
  import { Switch } from 'bits-ui';
  import type { ComponentProps } from 'svelte';
  let {
    label,
    checked = $bindable(false),
    ...rest
  }: Omit<ComponentProps<typeof Switch.Root>, 'children' | 'child'> & { label: string } = $props();
</script>

<Switch.Root {...rest} bind:checked aria-label={label} class="p-switch"
  ><Switch.Thumb class="p-switch-thumb" /></Switch.Root
>
