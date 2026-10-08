<script lang="ts">
  import { MobileNav, type NavItem } from '$lib';
  // This example uses @lucide/svelte for the navigation icons. Omit `icon` to skip it.
  import { Component, Layers, LayoutGrid } from '@lucide/svelte';

  const items: NavItem[] = [
    { href: '#overview', label: 'Overview', icon: LayoutGrid },
    { href: '#foundations', label: 'Foundations', icon: Layers },
    { href: '#components', label: 'Components', icon: Component },
  ];
  // The consumer supplies the active URL. In SvelteKit, use the current pathname.
  const active = '#overview';
</script>

<!-- MobileNav is fixed to the bottom of the viewport below 767px. -->
<MobileNav {items} {active} />
