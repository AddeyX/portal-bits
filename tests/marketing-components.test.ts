import { render, screen, fireEvent, within } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, it, expect } from 'vitest';
import * as library from '../src/lib/index';

const items = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
  { id: 'three', label: 'Three' },
];
const item = createRawSnippet<[(typeof items)[number]]>((value) => ({
  render: () => `<a href="#${value().id}">${value().label}</a>`,
}));

describe('content cards', () => {
  it('exports the three compositions', () => {
    for (const name of ['ArticleCard', 'FeatureCard', 'Carousel'])
      expect(library).toHaveProperty(name);
  });
  it('keeps article navigation usable after image failure and retries a new URL', async () => {
    const { rerender } = render(library.ArticleCard, {
      title: 'Field notes',
      href: '#notes',
      image: '/missing.svg',
      imageAlt: 'Field artwork',
      headingLevel: 2,
    });
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Field notes');
    const link = screen.getByRole('link', { name: 'Read Field notes' });
    expect(link).toHaveAttribute('href', '#notes');
    expect(link.querySelector('button')).toBeNull();
    await fireEvent.error(screen.getByRole('img'));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(link).toBeInTheDocument();
    await rerender({ image: '/new.svg' });
    expect(screen.getByRole('img')).toHaveAttribute('src', '/new.svg');
  });
  it('keeps feature copy after failed media and handles absent imagery', async () => {
    const { rerender } = render(library.FeatureCard, {
      title: 'Make room',
      description: 'Ideas grow here.',
      image: '/missing.svg',
      imageAlt: 'Shapes',
    });
    await fireEvent.error(screen.getByRole('img'));
    expect(screen.getByRole('article')).toHaveTextContent('Ideas grow here.');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    await rerender({ image: '/replacement.svg' });
    expect(screen.getByRole('img')).toHaveAttribute('src', '/replacement.svg');
    await rerender({ image: undefined });
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('carousel', () => {
  it('changes selection by dot and keeps the activated control focused', async () => {
    render(library.Carousel, { label: 'Stories', items, item });
    const dot = screen.getByRole('button', { name: 'Go to slide 2: Two' });
    dot.focus();
    await fireEvent.click(dot);
    expect(dot).toHaveAttribute('aria-current', 'true');
    expect(dot).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Go to slide 1: One' })).not.toHaveAttribute(
      'aria-current',
    );
    expect(
      within(screen.getByRole('group', { name: '2 of 3: Two' })).getByRole('link'),
    ).toHaveAttribute('href', '#two');
  });
  it('clamps keyboard navigation and leaves nested link keystrokes alone', async () => {
    render(library.Carousel, { label: 'Stories', items, item });
    const viewport = screen.getByRole('group', { name: 'Stories slides' });
    await fireEvent.keyDown(viewport, { key: 'End' });
    const last = screen.getByRole('button', { name: 'Go to slide 3: Three' });
    expect(last).toHaveAttribute('aria-current', 'true');
    await fireEvent.keyDown(viewport, { key: 'ArrowRight' });
    expect(last).toHaveAttribute('aria-current', 'true');
    await fireEvent.keyDown(screen.getByRole('link', { name: 'Three' }), { key: 'Home' });
    expect(last).toHaveAttribute('aria-current', 'true');
    await fireEvent.keyDown(viewport, { key: 'Home' });
    await fireEvent.keyDown(viewport, { key: 'ArrowLeft' });
    expect(screen.getByRole('button', { name: 'Go to slide 1: One' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    await fireEvent.keyDown(viewport, { key: 'ArrowRight' });
    expect(screen.getByRole('button', { name: 'Go to slide 2: Two' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });
  it('resets on item replacement and omits controls for empty or single collections', async () => {
    const { rerender } = render(library.Carousel, { label: 'Stories', items, item });
    await fireEvent.click(screen.getByRole('button', { name: 'Go to slide 3: Three' }));
    await rerender({ items: items.slice(0, 2) });
    expect(screen.getByRole('button', { name: 'Go to slide 1: One' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    await rerender({ items: items.slice(0, 1) });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'One' })).toBeInTheDocument();
    await rerender({ items: [] });
    expect(screen.queryByRole('group')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
  it('tracks native scroll selection using slide geometry', async () => {
    render(library.Carousel, { label: 'Stories', items, item });
    const viewport = screen.getByRole('group', { name: 'Stories slides' });
    // jsdom has no layout: supply geometry, retaining real scroll handler and state.
    Object.defineProperty(viewport, 'clientWidth', { value: 300 });
    Object.defineProperty(viewport, 'scrollWidth', { value: 900 });
    screen
      .getAllByRole('listitem')
      .forEach((slide, i) => Object.defineProperty(slide, 'offsetLeft', { value: i * 300 }));
    viewport.scrollLeft = 300;
    await fireEvent.scroll(viewport);
    expect(screen.getByRole('button', { name: 'Go to slide 2: Two' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });
});
