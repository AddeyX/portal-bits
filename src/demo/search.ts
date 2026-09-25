import fuzzysort from 'fuzzysort';
import { componentDocs } from './catalog';

export type SearchRun = {
  text: string;
  match: boolean;
};

export type SearchHit = {
  href: string;
  title: string;
  description: string;
  group: string;
  titleRuns: SearchRun[];
  descriptionRuns: SearchRun[];
  groupRuns: SearchRun[];
};

type Entry = {
  href: string;
  title: string;
  description: string;
  group: string;
};

const entries: Entry[] = [
  {
    href: '/foundations',
    title: 'Foundations',
    description: 'The small decisions that hold the library together.',
    group: 'Guides',
  },
  {
    href: '/motion',
    title: 'Motion',
    description: 'Responsive feedback, a gentle arrival, and a little less friction.',
    group: 'Guides',
  },
  ...componentDocs.map((item) => ({
    href: `/components/${item.slug}`,
    title: item.title,
    description: item.description,
    group: item.group,
  })),
];

const prepared = fuzzysort.snapshot(entries, {
  keys: ['title', 'description', 'group'],
});

function plain(text: string): SearchRun[] {
  return [{ text, match: false }];
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

function hit(
  entry: Entry,
  title?: readonly number[],
  description?: readonly number[],
  group?: readonly number[],
): SearchHit {
  return {
    href: entry.href,
    title: entry.title,
    description: entry.description,
    group: entry.group,
    titleRuns: runs(entry.title, title),
    descriptionRuns: runs(entry.description, description),
    groupRuns: runs(entry.group, group),
  };
}

export function searchDocs(query: string): SearchHit[] {
  const text = query.trim();
  if (!text) return entries.map((entry) => hit(entry));
  return fuzzysort
    .go(text, prepared, { threshold: 0, limit: 0 })
    .map((result) => hit(result.obj, result[0]?.indexes, result[1]?.indexes, result[2]?.indexes));
}
