import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, it, expect, vi } from 'vitest';
import * as library from '../src/lib/index';

const text = (value: string) => createRawSnippet(() => ({ render: () => `<p>${value}</p>` }));

describe('0.5 primitives', () => {
  it('exports every new primitive', () => {
    for (const name of [
      'Textarea',
      'Slider',
      'RadioGroup',
      'Tabs',
      'Accordion',
      'Progress',
      'Separator',
      'DropdownMenu',
      'AlertDialog',
    ]) {
      expect(library).toHaveProperty(name);
    }
  });

  it('labels a textarea, marks it invalid, and forwards native attributes', () => {
    render(library.Textarea, { label: 'Note', invalid: true, maxlength: 20, value: 'Hi' });
    const field = screen.getByRole('textbox', { name: 'Note' });
    expect(field.tagName).toBe('TEXTAREA');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAttribute('maxlength', '20');
    expect(field).toHaveAttribute('rows', '4');
    expect(field).toHaveValue('Hi');
  });

  it('selects a radio option through its label and names it without the hint', async () => {
    render(library.RadioGroup, {
      label: 'Cadence',
      name: 'cadence',
      value: 'daily',
      options: [
        { value: 'daily', label: 'Daily', description: 'Every morning.' },
        { value: 'weekly', label: 'Weekly' },
      ],
    });
    expect(screen.getByRole('radiogroup', { name: 'Cadence' })).toBeInTheDocument();
    const daily = screen.getByRole('radio', { name: 'Daily' });
    expect(daily).toHaveAttribute('aria-checked', 'true');
    expect(daily).toHaveAccessibleDescription('Every morning.');
    await fireEvent.click(screen.getByRole('radio', { name: 'Weekly' }));
    expect(screen.getByRole('radio', { name: 'Weekly' })).toHaveAttribute('aria-checked', 'true');
    expect(daily).toHaveAttribute('aria-checked', 'false');
  });

  it('names the slider thumb, formats its value, and steps with arrow keys', async () => {
    render(library.Slider, {
      label: 'Volume',
      value: 40,
      step: 10,
      name: 'volume',
      format: (value: number) => `${value}%`,
    });
    const thumb = screen.getByRole('slider', { name: 'Volume' });
    expect(thumb).toHaveAttribute('aria-valuetext', '40%');
    await fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    await waitFor(() => expect(thumb).toHaveAttribute('aria-valuenow', '50'));
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(document.querySelector('input[name="volume"]')).toHaveValue('50');
  });

  it('switches tab panels and starts on the first enabled tab', async () => {
    render(library.Tabs, {
      label: 'Sections',
      items: [
        { value: 'a', label: 'Alpha', content: text('First panel'), disabled: true },
        { value: 'b', label: 'Beta', content: text('Second panel') },
        { value: 'c', label: 'Gamma', content: text('Third panel') },
      ],
    });
    expect(screen.getByRole('tablist', { name: 'Sections' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true');
    await fireEvent.mouseDown(screen.getByRole('tab', { name: 'Gamma' }));
    await fireEvent.click(screen.getByRole('tab', { name: 'Gamma' }));
    expect(screen.getByRole('tab', { name: 'Gamma' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Third panel');
  });

  it('opens one accordion section at a time unless multiple', async () => {
    const items = [
      { value: 'a', title: 'First', content: text('One') },
      { value: 'b', title: 'Second', content: text('Two') },
    ];
    const { unmount } = render(library.Accordion, { items, headingLevel: 2 });
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2);
    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });
    await fireEvent.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');
    await fireEvent.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(first).toHaveAttribute('aria-expanded', 'false');
    unmount();

    render(library.Accordion, { items, multiple: true, value: ['a'] });
    await fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('reports progress, clamps the label, and supports indeterminate', () => {
    const { unmount } = render(library.Progress, { label: 'Upload', value: 140 });
    const bar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(bar).toHaveAttribute('aria-valuemax', '100');
    expect(screen.getByText('100%')).toBeInTheDocument();
    unmount();
    render(library.Progress, { label: 'Preparing' });
    const busy = screen.getByRole('progressbar', { name: 'Preparing' });
    expect(busy).toHaveAttribute('data-indeterminate');
    expect(screen.queryByText(/%$/)).not.toBeInTheDocument();
  });

  it('hides a decorative separator and announces a semantic one', () => {
    const { container, unmount } = render(library.Separator);
    expect(container.querySelector('.p-separator')).toHaveAttribute('role', 'none');
    unmount();
    render(library.Separator, { decorative: false, orientation: 'vertical' });
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('runs a dropdown action and skips disabled items', async () => {
    const rename = vi.fn();
    const remove = vi.fn();
    render(library.DropdownMenu, {
      label: 'Actions',
      open: true,
      trigger: text('More'),
      items: [
        { label: 'Rename', onSelect: rename, shortcut: 'R' },
        { type: 'separator' },
        { label: 'Delete', onSelect: remove, tone: 'danger', disabled: true },
      ],
    });
    expect(screen.getByRole('button', { name: 'Actions' })).toBeInTheDocument();
    const items = await screen.findAllByRole('menuitem');
    expect(items).toHaveLength(2);
    expect(items[1]).toHaveAttribute('data-disabled');
    expect(items[1]).toHaveClass('p-menu-item--danger');
    await fireEvent.click(items[0]);
    expect(rename).toHaveBeenCalledOnce();
    expect(remove).not.toHaveBeenCalled();
  });

  it('confirms an alert dialog, closes it, and paints danger', async () => {
    const onConfirm = vi.fn();
    render(library.AlertDialog, {
      open: true,
      title: 'Delete draft?',
      description: 'This cannot be undone.',
      confirmLabel: 'Delete draft',
      tone: 'danger',
      onConfirm,
    });
    const dialog = await screen.findByRole('alertdialog', { name: 'Delete draft?' });
    expect(dialog).toHaveAccessibleDescription('This cannot be undone.');
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    const confirm = screen.getByRole('button', { name: 'Delete draft' });
    expect(confirm).toHaveClass('p-button--danger');
    await fireEvent.click(confirm);
    expect(onConfirm).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
  });
});
