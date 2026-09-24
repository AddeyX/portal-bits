<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  let {
    message,
    children,
    class: className = '',
    ...rest
  }: Omit<HTMLAttributes<HTMLParagraphElement>, 'children' | 'role'> &
    ({ message: string; children?: never } | { message?: never; children: Snippet }) = $props();
</script>

<p {...rest} role="alert" class={`p-alert ${className}`}>
  {#if children}{@render children()}{:else}{message}{/if}
</p>
