import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import { Button, Switch, Toggle, ToggleGroup, Avatar, Input } from '../src/lib/index';

describe('public control contracts', () => {
  it('does not execute disabled actions', async () => {
    const onclick = vi.fn();
    render(Button, { disabled: true, 'aria-label': 'Save', onclick });
    screen.getByRole('button', { name: 'Save' }).click();
    expect(onclick).not.toHaveBeenCalled();
  });
  it('switch exposes changed checked state', async () => {
    render(Switch, { label: 'Notifications' });
    const control = screen.getByRole('switch', { name: 'Notifications' });
    await fireEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
  });
  it('favorite toggle exposes its pressed state', async () => {
    render(Toggle, { label: 'Favorite' });
    const control = screen.getByRole('button', { name: 'Favorite' });
    await fireEvent.click(control);
    expect(control).toHaveAttribute('aria-pressed', 'true');
  });
  it('single selection keeps exactly one chosen category', async () => {
    render(ToggleGroup, {
      label: 'Category',
      value: 'all',
      items: [
        { value: 'all', label: 'All' },
        { value: 'games', label: 'Games' },
      ],
    });
    await fireEvent.click(screen.getByRole('radio', { name: 'Games' }));
    expect(screen.getByRole('radio', { name: 'Games' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'All' })).toHaveAttribute('aria-checked', 'false');
  });
  it('avatar without image provides a named fallback', () => {
    render(Avatar, { alt: 'Ada Morgan', fallback: 'AM' });
    expect(screen.getByRole('img', { name: 'Ada Morgan' })).toHaveTextContent('AM');
  });
  it('invalid input preserves native value and error semantics', async () => {
    render(Input, { label: 'Email', invalid: true, value: 'wrong' });
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveValue('wrong');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
  it('a decorative avatar stays out of the accessibility tree', () => {
    const { container } = render(Avatar, { alt: 'Ada Morgan', decorative: true });
    expect(screen.queryByRole('img', { name: 'Ada Morgan' })).not.toBeInTheDocument();
    expect(container.querySelector('.p-avatar')).toHaveAttribute('aria-hidden', 'true');
  });
  it('input labels are visible unless hidden, and name the field either way', () => {
    render(Input, { label: 'Email' });
    expect(screen.getByText('Email')).toHaveClass('p-input-label');
    render(Input, { label: 'Search apps', hideLabel: true });
    expect(screen.getByRole('textbox', { name: 'Search apps' })).toBeInTheDocument();
    expect(screen.getByText('Search apps')).toHaveClass('p-sr-only');
  });
});
