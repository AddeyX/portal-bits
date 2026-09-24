<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  let { children, class: className = '', ...rest }: HTMLAttributes<HTMLUListElement> = $props();
</script>

<ul {...rest} class={`p-row-list ${className}`}>{@render children?.()}</ul>
