import { render, screen, fireEvent, within } from '@testing-library/svelte';
import { tick } from 'svelte';
import { describe, it, expect } from 'vitest';
import Preview from '../src/routes/components/[slug]/Preview.svelte';
import Page from '../src/routes/components/[slug]/+page.svelte';
import { componentDocs } from '../src/demo/catalog';
import { variations, quote, type VariationSlug } from '../src/demo/docs/variations';

function buttonStage() {
  return screen.getByRole('region', { name: 'Button preview' });
}

describe('Button variations', () => {
  it('shows one specimen whose props follow the controls', async () => {
    render(Preview, { slug: 'button' });
    const stage = buttonStage();
    expect(within(stage).getAllByRole('button')).toHaveLength(1);

    const variant = screen.getByRole('combobox', { name: 'Variant' });
    const size = screen.getByRole('combobox', { name: 'Size' });
    expect(stage).not.toContainElement(variant);
    await fireEvent.change(variant, { target: { value: 'green' } });
    await fireEvent.change(size, { target: { value: '48' } });

    const specimen = within(stage).getByRole('button');
    expect(specimen).toHaveClass('p-button--green', 'p-button--48');
    expect(screen.getByText(/size=\{48\}/)).toBeInTheDocument();

    const status = within(stage).getByRole('status');
    await fireEvent.click(specimen);
    expect(status).toHaveTextContent('Activated 1 time');

    await fireEvent.click(screen.getByRole('switch', { name: 'Disabled' }));
    const disabled = within(stage).getByRole('button');
    expect(disabled).toBeDisabled();
    await fireEvent.click(disabled);
    disabled.click();
    await tick();
    expect(status).toHaveTextContent('Activated 1 time');
  });

  it('keeps the final settings after fast toggles', async () => {
    render(Preview, { slug: 'button' });
    const toggle = screen.getByRole('switch', { name: 'Disabled' });
    for (let i = 0; i < 5; i++) toggle.click();
    const variant = screen.getByRole('combobox', { name: 'Variant' });
    fireEvent.change(variant, { target: { value: 'secondary' } });
    fireEvent.change(variant, { target: { value: 'quiet' } });
    fireEvent.change(variant, { target: { value: 'green' } });
    await tick();

    expect(toggle).toHaveAttribute('aria-checked', 'true');
    const specimen = within(buttonStage()).getByRole('button');
    expect(specimen).toBeDisabled();
    expect(specimen).toHaveClass('p-button--green');
    expect(variant).toHaveValue('green');
  });

  it('disables Size for quiet and explains why', async () => {
    render(Preview, { slug: 'button' });
    await fireEvent.change(screen.getByRole('combobox', { name: 'Variant' }), {
      target: { value: 'quiet' },
    });
    const size = screen.getByRole('combobox', { name: 'Size' });
    expect(size).toBeDisabled();
    expect(size).toHaveAccessibleDescription(/does not apply/i);
    const specimen = within(buttonStage()).getByRole('button');
    expect(specimen.tagName).toBe('BUTTON');
    expect(specimen).toHaveClass('p-button--quiet');
    expect(specimen).not.toHaveAttribute('href');
  });

  it('keeps link behavior in a separate labeled example', () => {
    render(Preview, { slug: 'button' });
    expect(within(buttonStage()).queryByRole('link')).toBeNull();
    const more = screen.getByText('More examples').closest('details')!;
    const example = within(more).getByRole('region', { name: 'Link button' });
    expect(within(example).getByRole('link', { name: /Get started/ })).toHaveAttribute('href');
  });
});

describe('curated variations', () => {
  it('covers every catalog entry', () => {
    expect(Object.keys(variations).sort()).toEqual(componentDocs.map((doc) => doc.slug).sort());
  });

  it.each(componentDocs.map((doc) => doc.slug as VariationSlug))(
    '%s keeps its controls outside one specimen region',
    (slug) => {
      render(Preview, { slug });
      const stages = screen.getAllByRole('region', { name: / preview$/ });
      expect(stages).toHaveLength(1);
      for (const control of variations[slug].controls) {
        const role = control.kind === 'choice' ? 'combobox' : 'switch';
        const element = screen.getByRole(role, { name: control.label });
        expect(stages[0]).not.toContainElement(element);
      }
    },
  );

  it('keeps numeric option values as numbers', async () => {
    render(Preview, { slug: 'avatar' });
    await fireEvent.change(screen.getByRole('combobox', { name: 'Size' }), {
      target: { value: '56' },
    });
    expect(screen.getByText(/size=\{56\}/)).toBeInTheDocument();
    expect(screen.queryByText(/size="56"/)).toBeNull();
  });

  it('gives compact ToggleGroup items an icon and a name', async () => {
    render(Preview, { slug: 'toggle-group' });
    await fireEvent.click(screen.getByRole('switch', { name: 'Compact' }));
    for (const name of ['All', 'Apps', 'Collections']) {
      const item = screen.getByRole('radio', { name });
      expect(item.querySelector('svg')).not.toBeNull();
      expect(item).not.toHaveTextContent(name);
    }
  });

  it('escapes attribute values in example code', () => {
    expect(quote('a "b" {c} <d> & e')).toBe('"a &quot;b&quot; &#123;c&#125; &lt;d&gt; &amp; e"');
  });

  it('leaves full-page components as launch links', () => {
    render(Preview, { slug: 'portal-shell' });
    const stage = screen.getByRole('region', { name: 'PortalShell preview' });
    expect(within(stage).getByRole('link', { name: 'Open the shell' })).toHaveAttribute('href');
    expect(within(stage).queryByRole('navigation')).toBeNull();
  });

  it('resets settings when the slug changes', async () => {
    const entry = (slug: string) => componentDocs.find((doc) => doc.slug === slug)!;
    const { rerender } = render(Page, { data: { entry: entry('button') } });
    await fireEvent.change(screen.getByRole('combobox', { name: 'Variant' }), {
      target: { value: 'green' },
    });
    expect(screen.getByRole('combobox', { name: 'Variant' })).toHaveValue('green');
    await rerender({ data: { entry: entry('icon-button') } });
    expect(screen.getByRole('combobox', { name: 'Variant' })).toHaveValue('secondary');
    await rerender({ data: { entry: entry('button') } });
    expect(screen.getByRole('combobox', { name: 'Variant' })).toHaveValue('primary');
  });
});
