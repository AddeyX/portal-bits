import { render, screen, fireEvent } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, it, expect, vi } from 'vitest';
import DocsFrame from '../src/routes/DocsFrame.svelte';

vi.mock('$app/state', () => ({
  page: { url: new URL('http://localhost/components/button') },
}));

const children = createRawSnippet(() => ({ render: () => '<p>Page body</p>' }));

describe('docs frame', () => {
  it('names the current page in a collapsible docs menu', async () => {
    render(DocsFrame, { children });
    const toggle = screen.getByRole('button', { name: /Browse docs\s*Button/ });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    const links = document.getElementById(toggle.getAttribute('aria-controls')!);
    expect(links).toContainElement(screen.getByRole('link', { name: 'Button' }));
    await fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Documentation' })).toHaveAttribute(
      'data-open',
      'true',
    );
    await fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
