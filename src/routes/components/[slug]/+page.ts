import { error } from '@sveltejs/kit';
import { componentDocs } from '../../../demo/catalog';
import type { PageLoad } from './$types';

export function entries() {
  return componentDocs.map((item) => ({ slug: item.slug }));
}

export const load: PageLoad = ({ params }) => {
  const entry = componentDocs.find((item) => item.slug === params.slug);
  if (!entry) error(404, 'Component not found');
  return { entry };
};
