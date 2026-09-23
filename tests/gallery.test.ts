import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Overview from '../src/routes/+page.svelte';

describe('overview composition', () => {
  it('mounts all cards with defined bindings and filters to an empty result', async () => {
    render(Overview);
    expect(
      screen.getByRole('heading', { name: 'Everything feels connected.' }),
    ).toBeInTheDocument();
    await fireEvent.input(screen.getByRole('textbox', { name: 'Search collection' }), {
      target: { value: 'no such application' },
    });
    expect(screen.getByRole('heading', { name: 'Nothing here yet' })).toBeInTheDocument();
    await fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.queryByRole('heading', { name: 'Nothing here yet' })).not.toBeInTheDocument();
  });
});
