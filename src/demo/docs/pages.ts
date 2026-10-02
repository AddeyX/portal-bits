/**
 * Every docs page as searchable data: the three guides and one page per catalog component.
 * Paths are base-free. A section `id` is the element id that exists on the rendered page.
 */
import { componentDocs, type ComponentDoc } from '../catalog';
import { guidePages } from './guides';
import { referenceFor } from './reference';
import type { DocPage } from './types';

function componentPage(item: ComponentDoc): DocPage {
  const reference = referenceFor(item.slug);
  return {
    path: `/components/${item.slug}`,
    title: item.title,
    description: item.description,
    sections: [
      // The example source sits under the "Source" heading in `div#usage`.
      { id: 'usage', title: 'Source', paragraphs: [] },
      {
        id: 'api-reference',
        title: 'API reference',
        paragraphs: [...reference.forwards, ...reference.limitations],
      },
    ],
    related: reference.related.map((slug) => `/components/${slug}`),
  };
}

const pages: DocPage[] = [...guidePages, ...componentDocs.map(componentPage)];
const byPath = new Map(pages.map((page) => [page.path, page]));

/** The page for a base-free path, or `undefined` when no such page exists. */
export function getDocPage(path: string): DocPage | undefined {
  return byPath.get(path);
}

/** Guides first, then components, in catalog order. */
export function getDocPages(): DocPage[] {
  return pages;
}
