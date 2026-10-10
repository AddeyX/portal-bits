import { fireEvent, screen } from '@testing-library/svelte';

/** Opens the named Select and picks an option the way a mouse does. */
export async function choose(name: string, option: string) {
  await fireEvent.pointerDown(screen.getByRole('combobox', { name }), {
    button: 0,
    ctrlKey: false,
    pointerType: 'mouse',
  });
  await fireEvent.pointerUp(screen.getByRole('option', { name: option }), {
    pointerType: 'mouse',
  });
}

/** The label the named Select trigger shows. */
export function shown(name: string) {
  return screen.getByRole('combobox', { name }).querySelector('.p-select-text')?.textContent;
}
