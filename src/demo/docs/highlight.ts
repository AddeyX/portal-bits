import type { SourceFile } from './types';

type Table = Partial<Record<SourceFile['language'], Record<string, string>>>;

// Build-time data from `scripts/build-doc-examples.mjs`. A missing file leaves every source
// escaped and readable. No highlighter runs in the browser.
const modules = import.meta.glob<Table>('./generated/highlight.json', {
  eager: true,
  import: 'default',
});
const table: Table = Object.values(modules)[0] ?? {};

/**
 * Highlighted HTML for exactly this source, or undefined. The HTML is keyed by the raw code,
 * so it never stands in for a different source string.
 */
export function highlightSource(code: string, language: SourceFile['language']) {
  const entries = table[language];
  return entries && Object.hasOwn(entries, code) ? entries[code] : undefined;
}

export type HighlightedSegment = { text: string; style?: string };

const entities: Record<string, string> = { '&lt;': '<', '&gt;': '>', '&amp;': '&' };
const decode = (text: string) => text.replace(/&(?:lt|gt|amp);/g, (entity) => entities[entity]);

/**
 * The same highlighting as plain segments, so the page renders text nodes and `style`
 * attributes instead of injecting markup. Joining the segment text gives back the exact source.
 */
export function highlightSegments(
  code: string,
  language: SourceFile['language'],
): HighlightedSegment[] | undefined {
  const html = highlightSource(code, language);
  if (html === undefined) return undefined;
  const segments: HighlightedSegment[] = [];
  for (const match of html.matchAll(/<span style="([^"]*)">([^<]*)<\/span>|([^<]+)/g)) {
    if (match[3] !== undefined) segments.push({ text: decode(match[3]) });
    else segments.push({ text: decode(match[2]), style: match[1] });
  }
  return segments;
}
