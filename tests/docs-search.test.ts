import { fireEvent, render, screen } from '@testing-library/svelte';
import { tick } from 'svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { componentDocs } from '../src/demo/catalog';
import { getDocPage, getDocPages } from '../src/demo/docs/pages';
import { indexedDestinations } from '../src/demo/docs/search-index';
import { searchDocs } from '../src/demo/search';
import SiteHeader from '../src/routes/SiteHeader.svelte';
import Foundations from '../src/routes/foundations/+page.svelte';
import GetStarted from '../src/routes/get-started/+page.svelte';
import Motion from '../src/routes/motion/+page.svelte';
import ComponentPage from '../src/routes/components/[slug]/+page.svelte';

const site = vi.hoisted(() => ({ base: '', pathname: '/get-started' }));
const navigation = vi.hoisted(() => ({ goto: vi.fn() }));

vi.mock('$app/paths', () => ({
  resolve: (path: string) => `${site.base}${path}`,
  asset: (path: string) => `${site.base}${path}`,
}));
vi.mock('$app/navigation', () => navigation);
vi.mock('$app/state', () => ({
  page: {
    get url() {
      return new URL(`http://localhost${site.base}${site.pathname}`);
    },
  },
}));

function matched(parts: { text: string; match: boolean }[]) {
  return parts.filter((part) => part.match).map((part) => part.text);
}

beforeEach(() => {
  site.base = '';
  site.pathname = '/get-started';
  navigation.goto.mockReset();
});

describe('searchDocs', () => {
  it('lists one result per page in catalog order when the query is blank', () => {
    const results = searchDocs('  ');
    expect(results.map((hit) => hit.href)).toEqual([
      '/get-started',
      '/foundations',
      '/motion',
      ...componentDocs.map((item) => `/components/${item.slug}`),
    ]);
    expect(results.every((hit) => matched(hit.titleRuns).length === 0)).toBe(true);
    expect(results.every((hit) => hit.section === undefined)).toBe(true);
  });

  it('ranks a fuzzy title match and bolds the matched characters', () => {
    const button = searchDocs('btn').find((hit) => hit.href === '/components/button');
    expect(button).toBeDefined();
    expect(searchDocs('btn')[0]?.href).toBe('/components/button');
    expect(button?.titleRuns.map((run) => run.text).join('')).toBe('Button');
    expect(
      matched(button?.titleRuns ?? [])
        .join('')
        .toLowerCase(),
    ).toContain('b');
    expect(button?.titleRuns.some((run) => run.match)).toBe(true);
  });

  it('ranks the page first for a misspelled component name', () => {
    expect(searchDocs('buton')[0]?.href).toBe('/components/button');
    expect(searchDocs('chekbox')[0]?.href).toBe('/components/checkbox');
  });

  it('bolds a description match and a group match', () => {
    const button = searchDocs('pill').find((hit) => hit.href === '/components/button');
    expect(matched(button?.descriptionRuns ?? []).join('')).toBe('Pill');
    const grouped = searchDocs('Buttons').find((hit) => hit.href === '/components/button');
    expect(matched(grouped?.groupRuns ?? []).join('')).toBe('Buttons');
  });

  it('returns no hits when nothing matches', () => {
    expect(searchDocs('zzzzzzzz')).toEqual([]);
  });

  it('finds a guide section by its heading', () => {
    const first = searchDocs('installation')[0];
    expect(first?.href).toBe('/get-started#installation');
    expect(first?.section).toBe('Installation');
    expect(matched(first?.sectionRuns ?? []).join('')).toBe('Installation');
    expect(searchDocs('typescript')[0]?.href).toBe('/get-started#typescript');
  });

  it('finds a section by an alias', () => {
    expect(searchDocs('setup').some((hit) => hit.href === '/get-started#installation')).toBe(true);
    expect(searchDocs('a11y').some((hit) => hit.href === '/motion#reduced-motion')).toBe(true);
  });

  it('finds guide prose inside its section and bolds it in the excerpt', () => {
    const tokens = searchDocs('tokens').find((hit) => hit.href === '/get-started#styles');
    expect(tokens).toBeDefined();
    expect(matched(tokens?.excerptRuns ?? []).join('')).toBe('tokens');
    expect(searchDocs('bounce').some((hit) => hit.href === '/motion#press-and-select')).toBe(true);
  });

  it('finds public props, limits, and bindings in the API reference', () => {
    expect(
      searchDocs('hideLabel').some((hit) => hit.href === '/components/input#api-reference'),
    ).toBe(true);
    const required = searchDocs('required');
    expect(required.some((hit) => hit.href === '/components/icon-button#api-reference')).toBe(true);
    expect(searchDocs('quiet').some((hit) => hit.href === '/components/button#api-reference')).toBe(
      true,
    );
    expect(searchDocs('sideOffset').some((hit) => hit.href.endsWith('#api-reference'))).toBe(true);
    const side = searchDocs('sideOffset').find((hit) => hit.href.endsWith('#api-reference'));
    expect(side?.section).toBe('API reference');
    expect(
      matched(side?.excerptRuns ?? [])
        .join('')
        .toLowerCase(),
    ).toBe('sideoffset');
    expect(searchDocs('bindable').some((hit) => hit.href.endsWith('#api-reference'))).toBe(true);
  });

  it('finds relevant example source in the usage section', () => {
    const usage = searchDocs('aria-describedby').find(
      (hit) => hit.href === '/components/input#usage',
    );
    expect(usage?.section).toBe('Source');
    expect(matched(usage?.excerptRuns ?? []).join('')).toBe('aria-describedby');
  });

  it('favors a heading match over a body match', () => {
    const hits = searchDocs('styles');
    expect(hits[0]?.href).toBe('/get-started#styles');
  });

  it('lists each destination once and caps a query at twelve results', () => {
    for (const query of ['a', 'e', 'label', 'props', 'the']) {
      const hrefs = searchDocs(query).map((hit) => hit.href);
      expect(new Set(hrefs).size).toBe(hrefs.length);
      expect(hrefs.length).toBeLessThanOrEqual(12);
    }
  });

  it('keeps every result URL base-free and drawn from the index', () => {
    const known = new Set<string>(
      indexedDestinations.map(({ route, fragment }) => (fragment ? `${route}#${fragment}` : route)),
    );
    for (const query of ['../evil', '/portal-bits', 'https://example.com#x', 'button', 'props']) {
      for (const hit of searchDocs(query)) {
        expect(known.has(hit.href)).toBe(true);
        expect(hit.href.startsWith('/portal-bits')).toBe(false);
      }
    }
  });
});

describe('search index', () => {
  it('points every indexed fragment at an existing page section', () => {
    expect(indexedDestinations.length).toBeGreaterThan(componentDocs.length);
    for (const { route, fragment } of indexedDestinations) {
      const page = getDocPage(route);
      expect(page, route).toBeDefined();
      if (fragment) {
        expect(
          page?.sections.map((section) => section.id),
          `${route}#${fragment}`,
        ).toContain(fragment);
      }
    }
  });

  it('has one page per catalog entry and guide', () => {
    expect(getDocPages().map((page) => page.path)).toEqual([
      '/get-started',
      '/foundations',
      '/motion',
      ...componentDocs.map((item) => `/components/${item.slug}`),
    ]);
  });

  function expectGuideRendered(path: string, container: HTMLElement) {
    const page = getDocPage(path);
    expect(page?.sections.length).toBeGreaterThan(0);
    for (const section of page?.sections ?? []) {
      expect(document.getElementById(section.id), section.id).not.toBeNull();
      expect(container.textContent).toContain(section.title);
      for (const paragraph of section.paragraphs) {
        expect(container.textContent).toContain(paragraph.replaceAll('`', ''));
      }
    }
  }

  it('renders every Get started section id and paragraph', () => {
    expectGuideRendered('/get-started', render(GetStarted).container);
  });

  it('renders every Foundations section id and paragraph', () => {
    expectGuideRendered('/foundations', render(Foundations).container);
  });

  it('renders every Motion section id and paragraph', () => {
    expectGuideRendered('/motion', render(Motion).container);
  });
});

describe('component pages', () => {
  it.each(['input', 'popover', 'floating-nav'])('renders the indexed sections of %s', (slug) => {
    const entry = componentDocs.find((item) => item.slug === slug)!;
    render(ComponentPage, { data: { entry } });
    for (const section of getDocPage(`/components/${slug}`)?.sections ?? []) {
      expect(document.getElementById(section.id), section.id).not.toBeNull();
    }
    expect(document.getElementById('usage')).toHaveTextContent('Source');
    expect(document.getElementById('api-reference')).toHaveTextContent('API reference');
  });
});

describe('search results in the header', () => {
  async function openSearch(query: string) {
    render(SiteHeader);
    await fireEvent.click(screen.getByRole('button', { name: 'Search docs' }));
    await tick();
    await fireEvent.input(screen.getByRole('textbox', { name: 'Search docs' }), {
      target: { value: query },
    });
    await tick();
    return screen.getByRole('list', { name: 'Search results' });
  }

  it('links a section result with the hash after the route', async () => {
    const list = await openSearch('installation');
    const link = list.querySelector('a');
    expect(link).toHaveAttribute('href', '/get-started#installation');
    expect(link).toHaveTextContent('Installation');
  });

  it('puts the gallery base before the route and the hash after it', async () => {
    site.base = '/portal-bits';
    const list = await openSearch('installation');
    const link = list.querySelector('a');
    expect(link).toHaveAttribute('href', '/portal-bits/get-started#installation');
    await fireEvent.click(link!);
    expect(navigation.goto).toHaveBeenCalledWith('/portal-bits/get-started#installation');
  });

  it('leaves modified clicks to the browser', async () => {
    site.base = '/portal-bits';
    const list = await openSearch('installation');
    const link = list.querySelector('a')!;
    // Record what the handler did, then stop jsdom from trying to navigate.
    const prevented: boolean[] = [];
    const record = (event: Event) => {
      prevented.push(event.defaultPrevented);
      event.preventDefault();
    };
    document.addEventListener('click', record);
    for (const init of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { button: 1 }]) {
      const event = new MouseEvent('click', { bubbles: true, cancelable: true, ...init });
      link.dispatchEvent(event);
    }
    document.removeEventListener('click', record);
    expect(prevented).toEqual([false, false, false, false]);
    expect(navigation.goto).not.toHaveBeenCalled();
  });

  it('never turns the query into a path', async () => {
    site.base = '/portal-bits';
    const list = await openSearch('button');
    const links = [...list.querySelectorAll('a')];
    expect(links.length).toBeGreaterThan(1);
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^\/portal-bits\/[a-z-]+(\/[a-z-]+)?(#[a-z-]+)?$/);
    }
  });

  it('renders a markup-like query as text', async () => {
    render(SiteHeader);
    await fireEvent.click(screen.getByRole('button', { name: 'Search docs' }));
    await tick();
    await fireEvent.input(screen.getByRole('textbox', { name: 'Search docs' }), {
      target: { value: '<img src=x onerror=alert(1)>../button' },
    });
    await tick();
    expect(screen.getByText('No matches')).toBeInTheDocument();
    expect(document.querySelector('img')).toBeNull();
  });
});
