<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  let {
    size = 'compact',
    brandHref,
    brand,
    children,
    class: className = '',
    ...rest
  }: HTMLAttributes<HTMLDivElement> & {
    size?: 'compact' | 'reading';
    brandHref: string;
    brand: Snippet;
    children: Snippet;
  } = $props();
</script>

<div {...rest} class={`p-auth-frame p-auth-frame--${size} ${className}`}>
  <div class="p-auth-frame-inner">
    <a class="p-auth-frame-brand" href={brandHref}>{@render brand()}</a>
    <div class="p-auth-frame-panel">{@render children()}</div>
  </div>
</div>
