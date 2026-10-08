import fuzzysort, { type Prepared as FuzzyTarget } from 'fuzzysort';
import { searchEntries, type SearchEntry } from './docs/search-index';

export type SearchRun = {
  text: string;
  match: boolean;
};

export type SearchHit = {
  /** Base-free route, with `#section` when the result is a section. */
  href: string;
  /** The page title. */
  title: string;
  /** The section title, when the result is a section. */
  section?: string;
  /** The page description. */
  description: string;
  group: string;
  titleRuns: SearchRun[];
  sectionRuns: SearchRun[];
  descriptionRuns: SearchRun[];
  groupRuns: SearchRun[];
  /** The text that matched in the section, or an empty list when only the page matched. */
  excerptRuns: SearchRun[];
};

/** The most results a query returns. */
export const resultLimit = 12;

const excerptLength = 150;

/** How much a match in each kind of text is worth. Headings and titles come first. */
const weight = {
  title: 1,
  heading: 1,
  alias: 0.95,
  looseAlias: 0.6,
  name: 0.85,
  description: 0.7,
  pageTitle: 0.55,
  group: 0.45,
  body: 0.45,
  source: 0.3,
};

/** Description and group matches need to be tighter than a title match to count. */
const weakFuzzyFloor = 0.4;

type Prepared = {
  entry: SearchEntry;
  title: FuzzyTarget;
  heading?: FuzzyTarget;
  description: FuzzyTarget;
  group: FuzzyTarget;
};

const prepared: Prepared[] = searchEntries.map((entry) => ({
  entry,
  title: fuzzysort.prepare(entry.title),
  heading: entry.section ? fuzzysort.prepare(entry.section) : undefined,
  description: fuzzysort.prepare(entry.description),
  group: fuzzysort.prepare(entry.group),
}));

function plain(text: string): SearchRun[] {
  return text ? [{ text, match: false }] : [];
}

function runs(text: string, indexes: readonly number[] | undefined): SearchRun[] {
  if (!indexes?.length) return plain(text);
  const matched = new Set(indexes);
  const parts: SearchRun[] = [];
  for (let index = 0; index < text.length; index += 1) {
    const match = matched.has(index);
    const last = parts[parts.length - 1];
    if (last?.match === match) last.text += text[index];
    else parts.push({ text: text[index] ?? '', match });
  }
  return parts;
}

type Found = { score: number; indexes: number[] };

/** Plain, case-insensitive match. Every word of the query must appear. */
function substring(text: string, words: string[]): Found | null {
  const lower = text.toLowerCase();
  if (lower.length !== text.length) return null;
  const indexes = new Set<number>();
  let score = 1;
  for (const [position, word] of words.entries()) {
    const at = lower.indexOf(word);
    if (at < 0) return null;
    for (let offset = 0; offset < word.length; offset += 1) indexes.add(at + offset);
    if (position === 0) {
      if (lower === word) score = 1;
      else if (at === 0) score = 0.9;
      else if (!/[a-z0-9]/.test(lower[at - 1] ?? '')) score = 0.8;
      else score = 0.6;
    }
  }
  return { score, indexes: [...indexes].sort((a, b) => a - b) };
}

function fuzzy(query: string, target: FuzzyTarget, floor = 0): Found | null {
  const result = fuzzysort.single(query, target);
  if (!result || result.score < floor) return null;
  return { score: result.score, indexes: [...result.indexes] };
}

/** A window of `text` around the first match, ending on word edges where it can. */
function excerpt(text: string, indexes: readonly number[]): SearchRun[] {
  if (text.length <= excerptLength) return runs(text, indexes);
  const first = indexes[0] ?? 0;
  let start = Math.max(0, first - 40);
  let end = Math.min(text.length, start + excerptLength);
  start = Math.max(0, end - excerptLength);
  if (start > 0) {
    const space = text.indexOf(' ', start);
    if (space >= 0 && space < first) start = space + 1;
  }
  if (end < text.length) {
    const space = text.lastIndexOf(' ', end);
    if (space > first) end = space;
  }
  const shown = text.slice(start, end);
  const inside = indexes.filter((index) => index >= start && index < end).map((i) => i - start);
  const parts = runs(shown, inside);
  if (start > 0) parts.unshift({ text: '… ', match: false });
  if (end < text.length) parts.push({ text: ' …', match: false });
  return parts;
}

type Candidate = {
  item: Prepared;
  score: number;
  order: number;
  title: Found | null;
  heading: Found | null;
  description: Found | null;
  group: Found | null;
  excerpt: SearchRun[];
};

function candidate(
  item: Prepared,
  order: number,
  query: string,
  words: string[],
): Candidate | null {
  const { entry } = item;
  const title = fuzzy(query, item.title);
  const heading = item.heading ? fuzzy(query, item.heading) : null;
  // A page entry owns the page description and group. A section entry would only repeat them.
  const description = entry.section ? null : fuzzy(query, item.description, weakFuzzyFloor);
  const group = entry.section ? null : fuzzy(query, item.group, weakFuzzyFloor);

  let score = 0;
  const take = (found: Found | null, factor: number) => {
    if (found) score = Math.max(score, found.score * factor);
  };
  if (entry.section) {
    take(heading, weight.heading);
    take(title, weight.pageTitle);
  } else {
    take(title, weight.title);
  }
  take(description, weight.description);
  take(group, weight.group);
  for (const alias of entry.aliases) take(substring(alias, words), weight.alias);
  for (const alias of entry.looseAliases) take(substring(alias, words), weight.looseAlias);

  // The best snippet is the excerpt. A name match counts as a heading-like match.
  let best: { found: Found; text: string; value: number } | null = null;
  for (const snippet of entry.snippets) {
    const named = snippet.name ? substring(snippet.name, words) : null;
    const found = substring(snippet.text, words);
    if (!found && !named) continue;
    const value = named
      ? named.score * weight.name
      : (found?.score ?? 0) * (snippet.kind === 'source' ? weight.source : weight.body);
    if (!best || value > best.value) {
      // Highlight in the snippet text, even when the name decided the score.
      best = { found: found ?? { score: 0, indexes: [] }, text: snippet.text, value };
    }
  }
  if (best) score = Math.max(score, best.value);
  if (score <= 0) return null;

  let shown: SearchRun[] = [];
  if (best) shown = excerpt(best.text, best.found.indexes);
  else if (entry.section) {
    // No snippet matched, so the section matched by heading or alias. Show its first sentence.
    const lead = entry.snippets.find((snippet) => snippet.kind === 'body');
    shown = lead ? excerpt(lead.text, []) : [];
  }
  return { item, score, order, title, heading, description, group, excerpt: shown };
}

function hit(
  entry: SearchEntry,
  found?: {
    title?: Found | null;
    heading?: Found | null;
    description?: Found | null;
    group?: Found | null;
    excerpt?: SearchRun[];
  },
): SearchHit {
  return {
    href: entry.href,
    title: entry.title,
    section: entry.section,
    description: entry.description,
    group: entry.group,
    titleRuns: runs(entry.title, found?.title?.indexes),
    sectionRuns: entry.section ? runs(entry.section, found?.heading?.indexes) : [],
    descriptionRuns: runs(entry.description, found?.description?.indexes),
    groupRuns: runs(entry.group, found?.group?.indexes),
    excerptRuns: found?.excerpt ?? [],
  };
}

export function searchDocs(query: string): SearchHit[] {
  const text = query.trim();
  if (!text) return searchEntries.filter((entry) => !entry.section).map((entry) => hit(entry));
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);

  const found = prepared
    .map((item, order) => candidate(item, order, text, words))
    .filter((item): item is Candidate => item !== null)
    .sort((a, b) => b.score - a.score || a.order - b.order);

  const seen = new Set<string>();
  const hits: SearchHit[] = [];
  for (const item of found) {
    if (seen.has(item.item.entry.href)) continue;
    seen.add(item.item.entry.href);
    hits.push(hit(item.item.entry, item));
    if (hits.length === resultLimit) break;
  }
  return hits;
}
