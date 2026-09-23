<script lang="ts">
  import type { NavItem } from '../types';
  let { items, active }: { items: NavItem[]; active: string } = $props();
</script>

<nav class="p-mobile-nav" aria-label="Mobile navigation">
  {#each items as item (item.href)}<a
      href={item.href}
      aria-current={active === item.href ? 'page' : undefined}
      >{#if item.icon}<item.icon size={20} strokeWidth={1.6} />{/if}<span>{item.label}</span></a
    >{/each}
</nav>
