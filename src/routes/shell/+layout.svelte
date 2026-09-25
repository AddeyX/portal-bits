<script lang="ts">
  import { accentForeground } from '$lib/internal/color';
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
  } from '@lucide/svelte';
  import {
    PortalShell,
    ColorSelector,
    TopBar,
    Popover,
    Dialog,
    Input,
    EmptyState,
    Button,
    Switch,
  } from '$lib';
  let { children }: { children: Snippet } = $props();
  let accent = $state('#19e783');
  let dark = $state(false);
  let search = $state('');
  let searchOpen = $state(false);
  let read = $state(false);
  let theme = $derived(dark ? ('dark' as const) : ('light' as const));
  $effect(() => {
    const root = document.documentElement;
    root.style.setProperty('--portal-accent', accent);
    root.style.setProperty(
      '--portal-accent-foreground',
      accent === '#19e783' ? '#181818' : accentForeground(accent),
    );
    root.style.setProperty(
      '--portal-selected-hover',
      accent === '#19e783'
        ? '#2fbf7a'
        : `color-mix(in srgb, ${accent}, ${accentForeground(accent)} 12%)`,
    );
    const adapted = accent !== '#19e783';
    const textColor = `color-mix(in srgb, ${accent} 35%, ${dark ? '#ffffff' : '#181818'})`;
    const extra = {
      '--portal-accent-focus': textColor,
      '--portal-accent-text': textColor,
      '--portal-accent-soft': `color-mix(in srgb, ${accent} 16%, ${dark ? '#1c2023' : '#ffffff'})`,
      '--portal-accent-nav': accent,
    };
    for (const [property, value] of Object.entries(extra)) {
      if (adapted) root.style.setProperty(property, value);
      else root.style.removeProperty(property);
    }
    return () => {
      for (const property of Object.keys(extra)) root.style.removeProperty(property);
      for (const property of [
        '--portal-accent',
        '--portal-accent-foreground',
        '--portal-selected-hover',
      ])
        root.style.removeProperty(property);
    };
  });
  const nav = [
    { href: '/shell', label: 'Overview', icon: LayoutGrid },
    { href: '/foundations', label: 'Foundations', icon: Layers },
    { href: '/components', label: 'Components', icon: Component, count: '29' },
    { href: '/motion', label: 'Motion', icon: Wind },
  ];
  let found = $derived(nav.filter((n) => n.label.toLowerCase().includes(search.toLowerCase())));
  let current = $derived(nav.find((n) => n.href === page.url.pathname)?.label ?? 'Overview');
</script>

<div class="p-theme" data-portal-theme={theme}>
  <PortalShell items={nav} active={page.url.pathname}>
    {#snippet summary()}
      <div class="kit-summary">
        <div class="kit-summary-top">
          <span>Your building blocks</span><Component size={20} />
        </div>
        <p>A familiar feel.<br />An open foundation.</p>
        <Button href="/components" variant="green" size={32}
          >Explore kit <ArrowUpRight size={14} /></Button
        >
      </div>
    {/snippet}
    {#snippet footer()}
      <div class="theme-row">
        <Moon size={17} /><span>Dark preview</span><Switch
          label="Dark preview"
          bind:checked={dark}
        />
      </div>
      <p class="theme-note">
        {dark
          ? 'Adapted theme · source unverified'
          : accent !== '#19e783'
            ? 'Custom accent · adapted palette'
            : 'Light theme · source-derived'}
      </p>
      <div class="sidebar-footnote">
        <span>Built with Svelte + Bits UI</span><span>Local library</span>
      </div>
    {/snippet}
    {#snippet topbar()}
      <TopBar breadcrumb={current}>
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
              hideLabel
              placeholder="Search foundations, components…"
              bind:value={search}
            />
            <div class="search-results">
              {#each found as item (item.href)}
                <a href={item.href} onclick={() => (searchOpen = false)}
                  ><item.icon size={18} />{item.label}<ArrowUpRight size={15} /></a
                >
              {:else}
                <EmptyState title="No matches" description="Try ‘components’ or ‘motion’." />
              {/each}
            </div>
          </Dialog>
          <Popover label="Notifications" {theme}>
            {#snippet trigger()}
              <span class="notification-icon"
                ><Bell size={17} />{#if !read}<i></i>{/if}</span
              >
            {/snippet}
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
              29 typed Svelte components. Bits UI behavior. Source-derived tokens.
            </p>
            <p class="panel-copy">
              Demo content is fictional. Inter stands in for licensed Roobert.
            </p>
            <Button href="/foundations" size={32}
              >View foundations <ArrowUpRight size={14} /></Button
            >
          </Popover>
          <ColorSelector bind:value={accent} {theme} />
        {/snippet}
      </TopBar>
    {/snippet}
    {@render children()}
  </PortalShell>
</div>
