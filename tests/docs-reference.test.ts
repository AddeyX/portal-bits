import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen, within } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Page from '../src/routes/components/[slug]/+page.svelte';
import ApiTable from '../src/demo/docs/ApiTable.svelte';
import { componentDocs } from '../src/demo/catalog';
import { references, referenceFor, type ApiProp } from '../src/demo/docs/reference';

const componentDirectory = join(__dirname, '../src/lib/components');

function entry(slug: string) {
  return componentDocs.find((doc) => doc.slug === slug)!;
}

function all(slug: string): ApiProp[] {
  const reference = referenceFor(slug);
  return [...reference.props, ...reference.snippets];
}

function find(slug: string, name: string): ApiProp {
  const prop = all(slug).find((item) => item.name === name);
  if (!prop) throw new Error(`${slug} has no ${name}`);
  return prop;
}

/** The destructured names, defaults, and bindable markers of the real `$props()` call. */
function declaredProps(title: string) {
  const source = readFileSync(join(componentDirectory, `${title}.svelte`), 'utf8');
  const script = source.match(/<script[^>]*>([\s\S]*?)<\/script>/)![1];
  const body = script.match(/let\s*\{([\s\S]*?)\}\s*(?::[\s\S]*?)?=\s*\$props\(\)/)![1];
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of body) {
    if (char === '(' || char === '[' || char === '{') depth++;
    if (char === ')' || char === ']' || char === '}') depth--;
    if (char === ',' && depth === 0) {
      parts.push(current);
      current = '';
    } else current += char;
  }
  parts.push(current);
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith('...')) return { name: '...', rest: true, bindable: false };
      const [left, ...right] = part.split(/=(.*)/s);
      const name = left.split(':')[0].trim();
      const expression = right.join('').trim();
      const bindable = expression.startsWith('$bindable');
      const literal = bindable ? expression.replace(/^\$bindable\(([\s\S]*)\)$/, '$1') : expression;
      return { name, rest: false, bindable, literal: literal || undefined };
    });
}

describe('component reference coverage', () => {
  it('has exactly one reference per catalog slug', () => {
    expect(references.map((item) => item.slug).sort()).toEqual(
      componentDocs.map((doc) => doc.slug).sort(),
    );
    expect(references).toHaveLength(38);
  });

  it.each(componentDocs)('$slug resolves, and a missing slug fails loudly', ({ slug }) => {
    expect(referenceFor(slug).slug).toBe(slug);
    expect(() => referenceFor(`${slug}-missing`)).toThrow(/reference/i);
  });

  it.each(references)('$slug has complete rows and valid cross-references', (reference) => {
    const names = all(reference.slug).map((item) => item.name);
    expect(new Set(names).size).toBe(names.length);
    for (const item of all(reference.slug)) {
      expect(item.name, reference.slug).toMatch(/^[a-zA-Z][\w-]*$/);
      expect(item.type.trim(), `${reference.slug}.${item.name} type`).not.toBe('');
      expect(item.description.trim(), `${reference.slug}.${item.name} description`).not.toBe('');
      expect(typeof item.defaultValue).toBe('string');
      if (item.required) {
        expect(item.defaultValue, `${reference.slug}.${item.name} required default`).toBe('');
      }
    }
    for (const slug of reference.related) {
      expect(slug, reference.slug).not.toBe(reference.slug);
      expect(
        componentDocs.some((doc) => doc.slug === slug),
        `${reference.slug} -> ${slug}`,
      ).toBe(true);
    }
    for (const line of [...reference.forwards, ...reference.limitations]) {
      expect(line.trim(), reference.slug).not.toBe('');
    }
    expect(reference.limitations.length, `${reference.slug} limits`).toBeGreaterThan(0);
  });

  it('keeps every snippet row typed as a Snippet', () => {
    for (const reference of references) {
      for (const snippet of reference.snippets) {
        expect(snippet.type, `${reference.slug}.${snippet.name}`).toMatch(/Snippet/);
      }
      for (const prop of reference.props) {
        expect(prop.type, `${reference.slug}.${prop.name}`).not.toMatch(/^Snippet/);
      }
    }
  });
});

describe('references follow the component declarations', () => {
  it.each(componentDocs)(
    '$title lists every destructured prop with its default',
    ({ slug, title }) => {
      const declared = declaredProps(title);
      const documented = all(slug);
      const named = declared.filter((item) => !item.rest);
      expect(documented.map((item) => item.name).sort(), `${title} names`).toEqual(
        named.map((item) => item.name).sort(),
      );
      for (const source of named) {
        const row = documented.find((item) => item.name === source.name)!;
        expect(row.bindable, `${title}.${source.name} bindable`).toBe(source.bindable);
        const literal = source.literal;
        if (literal === undefined) {
          expect(row.defaultValue, `${title}.${source.name} has no default`).toBe('');
        } else if (/^(?:-?\d+|true|false)$/.test(literal)) {
          expect(row.defaultValue, `${title}.${source.name}`).toBe(literal);
        } else if (/^'[^' ]*'$/.test(literal)) {
          const text = literal.slice(1, -1);
          expect(row.defaultValue, `${title}.${source.name}`).toBe(text === '' ? '""' : text);
        }
      }
      const forwardsRest = declared.some((item) => item.rest);
      expect(referenceFor(slug).forwards.length > 0, `${title} forwards`).toBe(forwardsRest);
    },
  );
});

describe('pinned contracts', () => {
  it('Button defaults to secondary at 40 and quiet excludes href and child', () => {
    expect(find('button', 'variant').defaultValue).toBe('secondary');
    expect(find('button', 'size').defaultValue).toBe('40');
    const { limitations } = referenceFor('button');
    const quiet = limitations.find((line) => /quiet/i.test(line));
    expect(quiet).toMatch(/href/);
    expect(quiet).toMatch(/child/);
    expect(find('button', 'children').type).toMatch(/Snippet/);
  });

  it('Dialog documents its title, trigger, and theme API', () => {
    const names = all('dialog').map((item) => item.name);
    for (const name of [
      'title',
      'description',
      'open',
      'trigger',
      'children',
      'triggerLabel',
      'triggerClass',
      'theme',
    ]) {
      expect(names).toContain(name);
    }
    expect(find('dialog', 'title').required).toBe(true);
    expect(find('dialog', 'open').bindable).toBe(true);
    expect(
      referenceFor('dialog')
        .snippets.map((item) => item.name)
        .sort(),
    ).toEqual(['children', 'trigger']);
  });

  it('Avatar includes decorative and requires alt', () => {
    expect(find('avatar', 'decorative').defaultValue).toBe('false');
    expect(find('avatar', 'alt').required).toBe(true);
  });

  it('Select is a single-choice dropdown', () => {
    const text = referenceFor('select').limitations.join(' ');
    expect(text).toMatch(/single/i);
    expect(text).toMatch(/multiple/i);
    expect(text).toMatch(/adaptation/i);
    expect(find('select', 'options').required).toBe(true);
    expect(find('select', 'options').type).toContain('SelectOption');
    expect(all('select').map((item) => item.name)).not.toContain('multiple');
  });

  it('Carousel requires its item snippet and unique item ids', () => {
    expect(find('carousel', 'item').required).toBe(true);
    expect(referenceFor('carousel').snippets.map((item) => item.name)).toEqual(['item']);
    expect(find('carousel', 'items').type).toMatch(/id: string/);
    expect(find('carousel', 'layout').defaultValue).toBe('responsive');
  });

  it('TopBar exposes breadcrumb and actions, and owns no account or notification state', () => {
    const reference = referenceFor('top-bar');
    expect(reference.props.map((item) => item.name)).toEqual(['breadcrumb']);
    expect(reference.snippets.map((item) => item.name)).toEqual(['actions']);
    const names = all('top-bar').map((item) => item.name.toLowerCase());
    expect(names.some((name) => /account|notification|user|search/.test(name))).toBe(false);
    const limits = reference.limitations.join(' ');
    expect(limits).toMatch(/account/i);
    expect(limits).toMatch(/notification/i);
  });

  it('labels the fixed breakpoints and presets that were never measured as adaptations', () => {
    expect(referenceFor('floating-nav').limitations.join(' ')).toMatch(/adaptation/i);
    expect(referenceFor('carousel').limitations.join(' ')).toMatch(/adaptation/i);
    expect(referenceFor('color-selector').limitations.join(' ')).toMatch(/adaptation/i);
  });
});

describe('API reference page', () => {
  it('renders props, snippets, forwarded attributes, and limits for Button', () => {
    render(Page, { data: { entry: entry('button') } });
    const section = document.getElementById('api-reference')!;
    expect(section).toBeInTheDocument();
    expect(within(section).getByRole('heading', { level: 2, name: 'API reference' })).toBeVisible();

    const props = within(section).getByRole('table', { name: 'Button props' });
    expect(
      within(props)
        .getAllByRole('columnheader')
        .map((cell) => cell.textContent),
    ).toEqual(['Name', 'Type', 'Default', 'Required', 'Binding', 'Description']);
    const variant = within(props).getByRole('row', { name: /^variant/ });
    expect(variant).toHaveTextContent('secondary');
    expect(within(props).getByRole('row', { name: /^size/ })).toHaveTextContent('40');

    expect(within(section).getByRole('table', { name: 'Button snippets' })).toBeInTheDocument();
    expect(within(section).getByRole('heading', { name: 'Forwarded attributes' })).toBeVisible();
    expect(within(section).getByRole('heading', { name: 'Limits' })).toBeVisible();
    expect(
      within(section).getByRole('link', { name: 'Bits UI Button documentation' }),
    ).toHaveAttribute('href', 'https://bits-ui.com/docs/components/button');
  });

  it('links Bits UI documentation only for components built on a primitive', () => {
    render(Page, { data: { entry: entry('badge') } });
    expect(screen.queryByRole('link', { name: /Bits UI/ })).not.toBeInTheDocument();
  });

  it('keeps the use-site source under #usage, before the reference', () => {
    render(Page, { data: { entry: entry('button') } });
    const usage = document.getElementById('usage')!;
    expect(usage).toBeInTheDocument();
    expect(within(usage).getByRole('tablist', { name: 'Source files' })).toBeInTheDocument();
    const reference = document.getElementById('api-reference')!;
    expect(
      usage.compareDocumentPosition(reference) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('omits the Snippets table when a component has none', () => {
    render(Page, { data: { entry: entry('avatar') } });
    expect(screen.queryByRole('table', { name: 'Avatar snippets' })).not.toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Avatar props' })).toBeInTheDocument();
  });

  it('renders a reference for every catalog entry', () => {
    for (const doc of componentDocs) {
      const { unmount } = render(Page, { data: { entry: doc } });
      expect(document.getElementById('api-reference'), doc.slug).toBeInTheDocument();
      expect(
        screen.getByRole('table', { name: `${doc.title} props` }),
        `${doc.slug} props table`,
      ).toBeInTheDocument();
      unmount();
    }
  });
});

describe('ApiTable', () => {
  const rows: ApiProp[] = [
    {
      name: 'value',
      type: "'a' | 'b'",
      defaultValue: '',
      required: false,
      bindable: true,
      description: 'The value.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: '""',
      required: true,
      bindable: false,
      description: 'The label.',
    },
  ];

  it('is a semantic table inside a labeled, focusable scroll region', () => {
    render(ApiTable, { label: 'Demo props', rows });
    const region = screen.getByRole('region', { name: 'Demo props table' });
    expect(region).toHaveAttribute('tabindex', '0');
    const table = within(region).getByRole('table', { name: 'Demo props' });
    expect(within(table).getAllByRole('columnheader')).toHaveLength(6);
    for (const header of within(table).getAllByRole('columnheader')) {
      expect(header).toHaveAttribute('scope', 'col');
    }
    const [valueRow, labelRow] = within(table).getAllByRole('row').slice(1);
    expect(within(valueRow).getByRole('rowheader')).toHaveTextContent('value');
    expect(valueRow).toHaveTextContent('Bindable');
    expect(valueRow).toHaveTextContent('None');
    expect(labelRow).toHaveTextContent('Yes');
    expect(labelRow).toHaveTextContent('""');
  });
});
