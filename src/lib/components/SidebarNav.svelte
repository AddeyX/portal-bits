<script lang="ts">
  import type { NavItem } from '../types';
  let {
    items,
    active,
    collapsed = false,
  }: { items: NavItem[]; active: string; collapsed?: boolean } = $props();
</script>

<nav class="p-sidebar-nav" aria-label="Main navigation">
  {#each items as item (item.href)}<a
      href={item.href}
      class="p-nav-link"
      aria-current={active === item.href ? 'page' : undefined}
      aria-label={collapsed ? item.label : undefined}
      title={collapsed ? item.label : undefined}
      ><span class="p-nav-icon"
        >{#if item.icon}<item.icon size={19} strokeWidth={1.6} />{/if}</span
      >{#if !collapsed}<span>{item.label}</span>{#if item.count}<span class="p-nav-count"
            >{item.count}</span
          >{/if}{/if}</a
    >{/each}
</nav>
