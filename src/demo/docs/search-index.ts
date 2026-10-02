/**
 * What search can find. One entry per page, plus one per page section. Entries come from the same
 * `DocPage` data the routes render, from the API reference metadata, and from the example source.
 *
 * Every `route` is base-free and every `fragment` is an id of a section on that page. Render a
 * result with `galleryDestination`.
 */
import { componentDocs } from '../catalog';
import { layoutSample, pageSample } from '../get-started-sample';
import { toConsumerSource } from './consumer-source.js';
import { guideIntros, plainText } from './guides';
import { getDocPages } from './pages';
import { referenceFor, type ApiProp } from './reference';

/** A piece of text a query can match, shown as the excerpt when it is the best match. */
export type Snippet = {
  text: string;
  /** A prop or binding name inside `text`. A match on the name outranks a match elsewhere. */
  name?: string;
  kind: 'body' | 'source';
};

export type SearchEntry = {
  route: string;
  fragment?: string;
  /** `route`, then `#fragment` when the entry is a section. */
  href: string;
  /** The page title. */
  title: string;
  /** The section title. Absent on a page entry. */
  section?: string;
  group: string;
  /** The page description. */
  description: string;
  /** Alternate words for the section. */
  aliases: string[];
  /** Words that stand in for the section without being in its text. */
  looseAliases: string[];
  snippets: Snippet[];
};

type Alias = Record<string, string[]>;

/** Synonyms keyed by `route#fragment`, or by `route` for a page. */
const aliases: Alias = {
  '/get-started': ['getting started', 'introduction', 'quickstart'],
  '/get-started#installation': ['setup', 'install', 'npm', 'pnpm', 'yarn', 'bun', 'package'],
  '/get-started#basic-usage': ['usage', 'import', 'quick start', 'first component'],
  '/get-started#styles': ['css', 'stylesheet', 'theme', 'design tokens'],
  '/get-started#typescript': ['types', 'typings', 'ts'],
  '/foundations#palette': ['color', 'colour', 'colors', 'contrast'],
  '/foundations#typography': ['font', 'fonts', 'type scale'],
  '/foundations#space-shape-depth': ['spacing', 'radius', 'shadow', 'elevation'],
  '/foundations#evidence': ['fidelity', 'measured', 'adaptation'],
  '/motion#easing-curve': ['easing', 'duration', 'timing', 'animation'],
  '/motion#press-and-select': ['animation', 'transition', 'feedback'],
  '/motion#enter-and-exit': ['animation', 'transition', 'overlay'],
  '/motion#reduced-motion': ['a11y', 'accessibility', 'prefers-reduced-motion'],
};

const componentAliases: Alias = {
  usage: ['example', 'code', 'source', 'snippet', 'demo'],
  'api-reference': [
    'api',
    'props',
    'properties',
    'reference',
    'attributes',
    'bindings',
    'snippets',
  ],
};

/** Words that mark text about accessibility. A section with one of them also answers "a11y". */
const accessibilityText = /accessib|\baria\b|aria-|screen reader|keyboard|focus|assistive/i;

const exampleSources = import.meta.glob('../examples/*Example.svelte', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function sourceLines(title: string): string[] {
  const raw = exampleSources[`../examples/${title}Example.svelte`];
  if (!raw) return [];
  const seen = new Set<string>();
  for (const line of toConsumerSource(raw).split('\n')) {
    const text = line.trim();
    if (text) seen.add(text);
  }
  return [...seen];
}

function codeLines(code: string): string[] {
  return [...new Set(code.split('\n').map((line) => line.trim()))].filter(Boolean);
}

function propSnippet(prop: ApiProp): Snippet {
  const facts = [prop.name];
  if (prop.bindable) facts.push(`bind:${prop.name}`);
  facts.push(prop.type);
  if (prop.required) facts.push('required');
  if (prop.bindable) facts.push('bindable');
  if (prop.defaultValue) facts.push(`default ${prop.defaultValue}`);
  return {
    name: prop.name,
    text: `${facts.join(' · ')} — ${plainText(prop.description)}`,
    kind: 'body',
  };
}

function bodySnippets(paragraphs: string[]): Snippet[] {
  return paragraphs.map((text) => ({ text: plainText(text), kind: 'body' }));
}

function apiSnippets(slug: string, paragraphs: string[]): Snippet[] {
  const reference = referenceFor(slug);
  return [
    ...[...reference.props, ...reference.snippets].map(propSnippet),
    ...bodySnippets(paragraphs),
  ];
}

function build(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const groups = new Map(componentDocs.map((item) => [`/components/${item.slug}`, item]));

  for (const page of getDocPages()) {
    const component = groups.get(page.path);
    const group = component?.group ?? 'Guides';
    const base = { route: page.path, title: page.title, group, description: page.description };

    entries.push({
      ...base,
      href: page.path,
      aliases: aliases[page.path] ?? [],
      looseAliases: [],
      snippets: bodySnippets(guideIntros[page.path] ?? []),
    });

    for (const section of page.sections) {
      const key = `${page.path}#${section.id}`;
      let snippets: Snippet[];
      if (component && section.id === 'api-reference') {
        snippets = apiSnippets(component.slug, section.paragraphs);
      } else if (component) {
        snippets = sourceLines(component.title).map((text) => ({ text, kind: 'source' }));
      } else {
        snippets = bodySnippets(section.paragraphs);
        const sample =
          key === '/get-started#basic-usage'
            ? pageSample
            : key === '/get-started#styles'
              ? layoutSample
              : '';
        snippets.push(...codeLines(sample).map((text): Snippet => ({ text, kind: 'source' })));
      }
      const curated = component ? (componentAliases[section.id] ?? []) : (aliases[key] ?? []);
      const text = snippets
        .filter((snippet) => snippet.kind === 'body')
        .map((snippet) => snippet.text)
        .join(' ');
      entries.push({
        ...base,
        href: key,
        fragment: section.id,
        section: section.title,
        aliases: curated,
        looseAliases: accessibilityText.test(text) ? ['a11y', 'accessibility'] : [],
        snippets,
      });
    }
  }
  return entries;
}

export const searchEntries: SearchEntry[] = build();

/** Every route and fragment search can send a reader to. */
export const indexedDestinations: { route: string; fragment?: string }[] = searchEntries.map(
  ({ route, fragment }) => ({ route, fragment }),
);
