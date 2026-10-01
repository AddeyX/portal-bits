<script lang="ts">
  import { Button, PortalShell, TopBar, type NavItem } from '$lib';
  // This example uses @lucide/svelte for the navigation icons. Omit `icon` to skip it.
  import { Component, Layers, LayoutGrid } from '@lucide/svelte';

  const items: NavItem[] = [
    { href: '#overview', label: 'Overview', icon: LayoutGrid },
    { href: '#foundations', label: 'Foundations', icon: Layers },
    { href: '#components', label: 'Components', icon: Component, count: '29' },
  ];
  // The consumer supplies the active URL. In SvelteKit, use the current pathname.
  let active = $state('#overview');
  let collapsed = $state(false);
</script>

<PortalShell {items} {active} brandHref="#overview" brandLabel="Example Studio" bind:collapsed>
  {#snippet brand()}<span>Example Studio</span>{/snippet}
  {#snippet summary()}
    <p>A familiar feel.<br />An open foundation.</p>
  {/snippet}
  {#snippet footer()}
    <Button variant="quiet" onclick={() => (collapsed = !collapsed)}>
      {collapsed ? 'Expand' : 'Collapse'} sidebar
    </Button>
  {/snippet}
  {#snippet topbar()}
    <TopBar breadcrumb="Discover" />
  {/snippet}
  <section>
    <h1>Overview</h1>
    <p>Your page content goes here.</p>
  </section>
</PortalShell>
