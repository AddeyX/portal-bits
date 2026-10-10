import { render, screen, fireEvent } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, it, expect } from 'vitest';
import * as library from '../src/lib/index';
import { choose, shown } from './helpers/select';

const label = createRawSnippet(() => ({
  render: () => '<span>Accept <a href="#terms">terms</a></span>',
}));

describe('task and record component contracts', () => {
  it('exports all task and record components', () => {
    for (const name of ['AuthFrame', 'Checkbox', 'Select', 'Alert', 'RowList', 'Row']) {
      expect(library).toHaveProperty(name);
    }
  });
  it('keeps quiet actions as buttons without a fixed size', () => {
    render(library.Button, { variant: 'quiet', size: 48, 'aria-label': 'Retry' });
    expect(screen.getByRole('button', { name: 'Retry' })).not.toHaveClass('p-button--48');
  });
  it('toggles through its label while leaving links independent', async () => {
    render(library.Checkbox, { label });
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    screen.getByText('Accept').closest('label')!.click();
    await fireEvent.click(screen.getByRole('link', { name: 'terms' }));
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
    await fireEvent.keyDown(checkbox, { key: ' ' });
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });
  it('keeps disabled label links enabled', async () => {
    render(library.Checkbox, { label, disabled: true, invalid: true });
    const checkbox = screen.getByRole('checkbox');
    screen.getByText('Accept').closest('label')!.click();
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('link')).toHaveAttribute('href', '#terms');
    expect(screen.getByRole('link')).not.toHaveAttribute('tabindex', '-1');
  });
  it.each([undefined, 'consent'])('validates required checkbox with name %s', async (name) => {
    const { container } = render(library.Checkbox, { label, required: true, name });
    const input = container.querySelector('input')!;
    expect(input.checkValidity()).toBe(false);
    await fireEvent.click(screen.getByRole('checkbox'));
    expect(input.checkValidity()).toBe(true);
  });
  it('uses visible select label, keeps empty option available, and validates it', async () => {
    const { container } = render(library.Select, {
      label: 'Category',
      name: 'category',
      required: true,
      invalid: true,
      placeholder: 'Choose category',
      options: [
        { value: 'art', label: 'Art' },
        { value: 'music', label: 'Music', disabled: true },
      ],
    });
    const select = screen.getByRole('combobox', { name: 'Category' });
    const input = container.querySelector('input[name="category"]') as HTMLInputElement;
    expect(screen.getByLabelText('Category')).toBe(select);
    expect(input.checkValidity()).toBe(false);
    expect(select).toHaveAttribute('aria-invalid', 'true');
    await fireEvent.pointerDown(select, { button: 0, ctrlKey: false, pointerType: 'mouse' });
    expect(screen.getByRole('option', { name: 'Choose category' })).not.toBeDisabled();
    expect(screen.getByRole('option', { name: 'Music' })).toHaveAttribute('aria-disabled', 'true');
    await fireEvent.pointerUp(screen.getByRole('option', { name: 'Art' }), {
      pointerType: 'mouse',
    });
    expect(input).toHaveValue('art');
    expect(input.checkValidity()).toBe(true);
    await fireEvent.pointerDown(select, { button: 0, ctrlKey: false, pointerType: 'mouse' });
    await fireEvent.pointerUp(screen.getByRole('option', { name: 'Choose category' }), {
      pointerType: 'mouse',
    });
    expect(input).toHaveValue('');
    expect(input.checkValidity()).toBe(false);
  });
  it('sizes the select trigger to the longest label unless sizing is dynamic', async () => {
    const options = [
      { value: 'art', label: 'Art' },
      { value: 'research', label: 'Shared research notes' },
    ];
    const { rerender } = render(library.Select, {
      label: 'Category',
      placeholder: 'Pick',
      options,
    });
    const select = screen.getByRole('combobox', { name: 'Category' });
    const sizers = [...select.querySelectorAll('.p-select-sizer')];
    expect(select).toHaveClass('p-select--stable');
    expect(sizers.map((sizer) => sizer.textContent)).toEqual([
      'Pick',
      'Art',
      'Shared research notes',
    ]);
    expect(sizers.every((sizer) => sizer.getAttribute('aria-hidden') === 'true')).toBe(true);
    await rerender({ sizing: 'dynamic' });
    expect(select).toHaveClass('p-select--dynamic');
    expect(select.querySelector('.p-select-sizer')).toBeNull();
    expect(select.querySelector('.p-select-text')).toHaveTextContent('Pick');
  });
  it('announces updated messages in a paragraph', async () => {
    const { rerender } = render(library.Alert, { message: 'Try again.' });
    expect(screen.getByRole('alert').tagName).toBe('P');
    await rerender({ message: 'Choose a category.' });
    expect(screen.getByRole('alert')).toHaveTextContent('Choose a category.');
  });
});

import TaskForm from './fixtures/TaskForm.svelte';

it('binds both controls, submits their values, and accepts parent updates', async () => {
  render(TaskForm);
  const form = screen.getByRole('form') as HTMLFormElement;
  expect(new FormData(form).has('consent')).toBe(false);
  await fireEvent.click(screen.getByRole('checkbox'));
  await choose('Category', 'Notes');
  expect(screen.getByRole('status')).toHaveTextContent('yes:notes');
  expect([...new FormData(form).entries()]).toEqual([
    ['consent', 'on'],
    ['category', 'notes'],
  ]);
  await fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
  expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
  expect(shown('Category')).toBe('Choose');
});

it('composes semantic records, inline alert snippets, and consumer branding', async () => {
  render(TaskForm);
  expect(screen.getByRole('list', { name: 'Records' }).tagName).toBe('UL');
  expect(screen.getByRole('listitem').tagName).toBe('LI');
  expect(screen.getByRole('link', { name: 'Example Studio' })).toHaveAttribute('href', '#home');
  await fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Attempt 1');
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});

it('blocks disabled quiet actions and omits disabled consent from submission', async () => {
  render(TaskForm, { disabled: true });
  screen.getByRole('button', { name: 'Retry' }).click();
  expect(screen.getByRole('alert')).toHaveTextContent('Attempt 0');
  expect(new FormData(screen.getByRole('form') as HTMLFormElement).has('consent')).toBe(false);
});
