import { render, screen, fireEvent } from '@testing-library/svelte';
import { createRawSnippet, tick } from 'svelte';
import { describe, it, expect } from 'vitest';
import { FloatingNav } from '../src/lib/index';

const brand = createRawSnippet(() => ({
  render: () => '<a href="/" aria-label="portal-bits home">portal</a>',
}));
const items = createRawSnippet(() => ({
  render: () => '<a href="/components" aria-current="page">Docs</a>',
}));
const actions = createRawSnippet(() => ({
  render: () => '<a href="https://github.com/AddeyX/portal-bits">GitHub</a>',
}));

describe('FloatingNav', () => {
  it('exports and lays out brand, docs, and an external action as anchors', () => {
    render(FloatingNav, {
      label: 'Primary',
      brand,
      items,
      actions,
    });
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'portal-bits home' })).toHaveAttribute('href', '/');
    const docs = screen.getByRole('link', { name: 'Docs' });
    expect(docs).toHaveAttribute('href', '/components');
    expect(docs).toHaveAttribute('aria-current', 'page');
    expect(docs.querySelector('button')).toBeNull();
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/AddeyX/portal-bits',
    );
  });

  it('opens from Menu, closes on Escape, and closes on an outside pointer', async () => {
    render(FloatingNav, {
      label: 'Primary',
      brand,
      items,
      actions,
    });
    const menu = screen.getByRole('button', { name: 'Menu', hidden: true });
    expect(menu).toHaveAttribute('aria-expanded', 'false');
    await fireEvent.click(menu);
    await tick();
    expect(menu).toHaveAttribute('aria-expanded', 'true');
    expect(menu).toHaveTextContent('Close');
    await fireEvent.keyDown(document, { key: 'Escape' });
    await tick();
    expect(menu).toHaveAttribute('aria-expanded', 'false');
    await fireEvent.click(menu);
    await tick();
    await fireEvent.pointerDown(document.body);
    await tick();
    expect(menu).toHaveAttribute('aria-expanded', 'false');
  });
});
