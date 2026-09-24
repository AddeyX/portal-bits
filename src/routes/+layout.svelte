<script lang="ts">
  import '@fontsource/inter/400.css';
  import '@fontsource/inter/500.css';
  import '@fontsource/inter/600.css';
  import '$lib/styles/base.css';
  import '../gallery.css';
  import { page } from '$app/state';
  import type { Snippet } from 'svelte';
  import {
    LayoutGrid,
    Layers,
    Component,
    Wind,
    Search,
    Bell,
    Heart,
    ArrowUpRight,
    Moon,
    Code2,
    X,
    Check,
  } from '@lucide/svelte';
  import {
    PortalShell,
    TopBar,
    Popover,
    Dialog,
    Input,
    EmptyState,
    Button,
    Badge,
    Switch,
    Avatar,
  } from '$lib';
  let { children }: { children: Snippet } = $props();
  let dark = $state(false);
  let search = $state('');
  let searchOpen = $state(false);
  let read = $state(false);
  let theme = $derived(dark ? ('dark' as const) : ('light' as const));
  const nav = [
    { href: '/', label: 'Overview', icon: LayoutGrid },
    { href: '/foundations', label: 'Foundations', icon: Layers },
    { href: '/components', label: 'Components', icon: Component, count: '18' },
    { href: '/motion', label: 'Motion', icon: Wind },
  ];
  let found = $derived(nav.filter((n) => n.label.toLowerCase().includes(search.toLowerCase())));
  let current = $derived(nav.find((n) => n.href === page.url.pathname)?.label ?? 'Overview');
</script>

<svelte:head
  ><title>{current} — portal-bits</title><meta
    name="description"
    content="A Svelte 5 component library, built on Bits UI. Explore foundations, components, chrome, and motion."
  /></svelte:head
>
<div class="p-theme gallery-root" data-portal-theme={theme}>
  <PortalShell items={nav} active={page.url.pathname}>
    {#snippet summary()}<div class="kit-summary">
        <div class="kit-summary-top"><span>Your building blocks</span><Component size={20} /></div>
        <p>A familiar feel.<br />An open foundation.</p>
        <Button href="/components" variant="green" size={32}
          >Explore kit <ArrowUpRight size={14} /></Button
        >
      </div>{/snippet}
    {#snippet footer()}<div class="theme-row">
        <Moon size={17} /><span>Dark preview</span><Switch
          label="Dark preview"
          bind:checked={dark}
        />
      </div>
      <p class="theme-note">
        {dark ? 'Adapted theme · source unverified' : 'Light theme · source-derived'}
      </p>
      <div class="sidebar-footnote">
        <span>Built with Svelte + Bits UI</span><span>Local library · v0.1</span>
      </div>{/snippet}
    {#snippet topbar()}<TopBar breadcrumb={current}>
        {#snippet actions()}
          <Dialog
            title="Find your building block"
            description="Search this component library."
            bind:open={searchOpen}
            {theme}
            triggerLabel="Search library"
            triggerClass="p-button p-icon-button p-button--secondary p-button--40"
          >
            {#snippet trigger()}<Search size={17} />{/snippet}
            <Input
              label="Search pages"
              placeholder="Search foundations, components…"
              bind:value={search}
            />
            <div class="search-results">
              {#each found as item (item.href)}<a
                  href={item.href}
                  onclick={() => (searchOpen = false)}
                  ><item.icon size={18} />{item.label}<ArrowUpRight size={15} /></a
                >{:else}<EmptyState
                  title="No matches"
                  description="Try ‘components’ or ‘motion’."
                />{/each}
            </div>
          </Dialog>
          <Popover label="Notifications" {theme}>
            {#snippet trigger()}<span class="notification-icon"
                ><Bell size={17} />{#if !read}<i></i>{/if}</span
              >{/snippet}
            <div class="panel-heading">
              <h3>Notifications</h3>
              <button class="text-action" onclick={() => (read = true)}
                >{read ? 'All read' : 'Mark all read'}</button
              >
            </div>
            <div class:notification-read={read} class="notification-item">
              <span class="notification-dot"></span>
              <div>
                <strong>Your kit is ready to explore</strong>
                <p>Components, foundations, and motion in one place.</p>
                <small>Demo notification</small>
              </div>
            </div>
          </Popover>
          <Popover label="Library notes" {theme}>
            {#snippet trigger()}<Code2 size={17} />{/snippet}
            <h3 class="panel-title">Built to be yours.</h3>
            <p class="panel-copy">
              18 typed Svelte components. Bits UI behavior. Source-derived tokens.
            </p>
            <p class="panel-copy">
              Demo content is fictional. Inter stands in for licensed Roobert.
            </p>
            <Button href="/foundations" size={32}
              >View foundations <ArrowUpRight size={14} /></Button
            >
          </Popover>
          <span class="top-version"
            ><Badge variant="success"><span class="status-dot"></span> v0.1</Badge></span
          >
        {/snippet}
      </TopBar>{/snippet}
    {@render children()}
  </PortalShell>
</div>
