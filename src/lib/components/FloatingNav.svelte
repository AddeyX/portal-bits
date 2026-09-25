<script lang="ts">
  import type { Snippet } from 'svelte';
  let {
    label,
    brand,
    items,
    actions,
    open = $bindable(false),
  }: {
    label: string;
    brand: Snippet;
    items: Snippet;
    actions?: Snippet;
    open?: boolean;
  } = $props();
  const panelId = $props.id();
  let root: HTMLElement | undefined = $state();
  function remember(node: HTMLElement) {
    root = node;
  }
  function onPointerDown(event: PointerEvent) {
    if (!open || root?.contains(event.target as Node)) return;
    open = false;
  }
  function onKeydown(event: KeyboardEvent) {
    if (!open || event.key !== 'Escape') return;
    open = false;
    root?.querySelector<HTMLButtonElement>('.p-floating-nav-toggle')?.focus();
  }
</script>

<svelte:window onkeydown={onKeydown} />
<svelte:document onpointerdown={onPointerDown} />

<div class="p-floating-nav" data-open={open || undefined} {@attach remember}>
  <nav class="p-floating-nav-bar" aria-label={label}>
    <div class="p-floating-nav-brand">{@render brand()}</div>
    <div class="p-floating-nav-cluster" id={panelId}>
      <div class="p-floating-nav-items">{@render items()}</div>
      {#if actions}<div class="p-floating-nav-actions">{@render actions()}</div>{/if}
    </div>
    <button
      type="button"
      class="p-floating-nav-toggle"
      aria-expanded={open}
      aria-controls={panelId}
      onclick={() => (open = !open)}>{open ? 'Close' : 'Menu'}</button
    >
  </nav>
</div>

<style>
  .p-floating-nav {
    container: floating-nav / inline-size;
    position: relative;
    width: min(960px, 100%);
    margin-inline: auto;
  }
  .p-floating-nav-bar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    height: 56px;
    padding: 0 12px 0 20px;
    border-radius: 100px;
    background: var(--portal-surface);
    box-shadow: var(--portal-shadow-control);
    color: var(--portal-ink);
  }
  .p-floating-nav-brand {
    grid-column: 1;
    justify-self: start;
    min-width: 0;
  }
  .p-floating-nav-cluster {
    display: contents;
  }
  .p-floating-nav-items,
  .p-floating-nav-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .p-floating-nav-items {
    grid-column: 2;
    justify-self: center;
  }
  .p-floating-nav-actions {
    grid-column: 3;
    justify-self: end;
  }
  .p-floating-nav-items :global(a),
  .p-floating-nav-actions :global(a) {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    padding: 0 14px;
    border-radius: var(--portal-pill);
    color: var(--portal-muted);
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
  }
  .p-floating-nav-items :global(a:hover),
  .p-floating-nav-actions :global(a:hover) {
    color: var(--portal-ink);
  }
  .p-floating-nav-items :global(a[aria-current='page']) {
    background: var(--portal-ink);
    color: var(--portal-surface);
  }
  .p-floating-nav-toggle {
    display: none;
    align-items: center;
    height: 36px;
    padding: 0 14px;
    border: 0;
    border-radius: var(--portal-pill);
    background: transparent;
    color: var(--portal-ink);
    font: inherit;
    font-size: 14px;
    cursor: pointer;
  }
  @container floating-nav (max-width: 640px) {
    .p-floating-nav-bar {
      grid-template-columns: 1fr auto;
    }
    .p-floating-nav-toggle {
      display: inline-flex;
      grid-column: 2;
      justify-self: end;
    }
    .p-floating-nav-cluster {
      display: none;
    }
    .p-floating-nav[data-open] .p-floating-nav-cluster {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
      position: absolute;
      z-index: 1;
      top: calc(100% + 8px);
      left: 0;
      right: 0;
      padding: 8px;
      border-radius: 16px;
      background: var(--portal-surface);
      box-shadow: var(--portal-shadow-control);
    }
    .p-floating-nav[data-open] .p-floating-nav-items,
    .p-floating-nav[data-open] .p-floating-nav-actions {
      flex-direction: column;
      align-items: stretch;
    }
    .p-floating-nav[data-open] .p-floating-nav-items :global(a),
    .p-floating-nav[data-open] .p-floating-nav-actions :global(a) {
      justify-content: flex-start;
    }
  }
</style>
