import { describe, expect, it } from 'vitest';
import { componentDocs } from '../src/demo/catalog';
import { searchDocs } from '../src/demo/search';

function matched(parts: { text: string; match: boolean }[]) {
  return parts.filter((part) => part.match).map((part) => part.text);
}

describe('searchDocs', () => {
  it('lists guides and components in catalog order when the query is blank', () => {
    const results = searchDocs('  ');
    expect(results.map((hit) => hit.href)).toEqual([
      '/get-started',
      '/foundations',
      '/motion',
      ...componentDocs.map((item) => `/components/${item.slug}`),
    ]);
    expect(results.every((hit) => matched(hit.titleRuns).length === 0)).toBe(true);
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

  it('bolds a description match and a group match', () => {
    const button = searchDocs('pill').find((hit) => hit.href === '/components/button');
    expect(matched(button?.descriptionRuns ?? []).join('')).toBe('Pill');
    const grouped = searchDocs('Buttons').find((hit) => hit.href === '/components/button');
    expect(matched(grouped?.groupRuns ?? []).join('')).toBe('Buttons');
  });

  it('returns no hits when nothing matches', () => {
    expect(searchDocs('zzzzzzzz')).toEqual([]);
  });
});
