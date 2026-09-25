import { render, screen, fireEvent } from '@testing-library/svelte';
import { it, expect, vi } from 'vitest';
import * as library from '../src/lib/index';

it('exports a reusable ColorSelector', () => {
  expect(library).toHaveProperty('ColorSelector');
});

it('selects presets and validates exact custom colors', async () => {
  const onValueChange = vi.fn();
  render(library.ColorSelector, { open: true, onValueChange });
  await fireEvent.click(screen.getByRole('button', { name: 'Blue' }));
  expect(onValueChange).toHaveBeenLastCalledWith('#5b9dff');
  await fireEvent.click(screen.getByRole('button', { name: 'Custom color' }));
  const hex = screen.getByRole('textbox', { name: 'Hex color' });
  await fireEvent.input(hex, { target: { value: '#123456' } });
  expect(onValueChange).toHaveBeenLastCalledWith('#123456');
  onValueChange.mockClear();
  await fireEvent.input(hex, { target: { value: 'invalid' } });
  expect(onValueChange).not.toHaveBeenCalled();
  expect(hex).toHaveAttribute('aria-invalid', 'true');
  await fireEvent.input(screen.getByRole('slider', { name: 'Brightness' }), {
    target: { value: '0' },
  });
  expect(onValueChange).toHaveBeenLastCalledWith('#000000');
});
