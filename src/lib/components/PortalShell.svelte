<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { NavItem } from '../types';
  import { PanelLeftClose, PanelLeftOpen, Aperture } from '@lucide/svelte';
  import SidebarNav from './SidebarNav.svelte';
  import MobileNav from './MobileNav.svelte';
  import IconButton from './IconButton.svelte';
  let {
    items,
    active,
    collapsed = $bindable(false),
    brand,
    summary,
    footer,
    topbar,
    children,
  }: {
    items: NavItem[];
    active: string;
    collapsed?: boolean;
    brand?: Snippet;
    summary?: Snippet;
    footer?: Snippet;
    topbar?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<div class="p-shell" data-collapsed={collapsed}>
  <a class="p-skip-link" href="#main-content">Skip to content</a>
  <aside class="p-sidebar">
    <div class="p-brand">
      <a href="/" aria-label="Portal Bits home"
        ><Aperture size={27} />{#if !collapsed}{#if brand}{@render brand()}{:else}<span
              >portal<span class="p-brand-light">bits</span></span
            >{/if}{/if}</a
      ><IconButton
        label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        size={32}
        onclick={() => (collapsed = !collapsed)}
        >{#if collapsed}<PanelLeftOpen size={15} />{:else}<PanelLeftClose
            size={15}
          />{/if}</IconButton
      >
    </div>
    {#if !collapsed && summary}<div class="p-sidebar-summary">{@render summary()}</div>{/if}
    <SidebarNav {items} {active} {collapsed} />
    {#if !collapsed}<div class="p-sidebar-footer">{@render footer?.()}</div>{/if}
  </aside>
  <div class="p-shell-main">
    {@render topbar?.()}
    <main id="main-content" tabindex="-1">{@render children?.()}</main>
  </div>
  <MobileNav {items} {active} />
</div>
