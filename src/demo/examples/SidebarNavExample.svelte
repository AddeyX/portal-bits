<script lang="ts">
  import { SidebarNav, type NavItem } from '$lib';
  // This example uses @lucide/svelte for the navigation icons. Omit `icon` to skip it.
  import { Component, Layers, LayoutGrid } from '@lucide/svelte';

  let { collapsed = false }: { collapsed?: boolean } = $props();

  const items: NavItem[] = [
    { href: '#overview', label: 'Overview', icon: LayoutGrid },
    { href: '#foundations', label: 'Foundations', icon: Layers },
    { href: '#components', label: 'Components', icon: Component, count: '29' },
  ];
  // The consumer supplies the active URL. In SvelteKit, use the current pathname.
  const active = '#components';
</script>

<div class="slice">
  <SidebarNav {items} {active} {collapsed} />
</div>

<style>
  .slice {
    max-width: 280px;
    padding: 12px;
    border-radius: 16px;
    background: var(--portal-canvas);
  }
</style>
