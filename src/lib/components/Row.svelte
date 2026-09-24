<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements';
  let { children, class: className = '', ...rest }: HTMLLiAttributes = $props();
</script>

<li {...rest} class={`p-row ${className}`}>{@render children?.()}</li>
