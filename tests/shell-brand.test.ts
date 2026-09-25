import { render, screen, fireEvent } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, it, expect } from 'vitest';
import { PortalShell } from '../src/lib/index';

const items = [{ href: '/', label: 'Overview' }];
const brand = createRawSnippet(() => ({ render: () => '<span>Acme</span>' }));

describe('PortalShell brand link', () => {
  it('uses the consumer brand, destination, and name', () => {
    render(PortalShell, { items, active: '/', brand, brandHref: '/app', brandLabel: 'Acme home' });
    expect(screen.getByRole('link', { name: 'Acme home' })).toHaveAttribute('href', '/app');
    expect(screen.queryByRole('link', { name: /portal-bits/ })).not.toBeInTheDocument();
  });

  it('takes its name from the visible brand, and names the icon-only link when collapsed', async () => {
    render(PortalShell, { items, active: '/', brand });
    expect(screen.getByRole('link', { name: 'Acme' })).toHaveAttribute('href', '/');
    await fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });
});
