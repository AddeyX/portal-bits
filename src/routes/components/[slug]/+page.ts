import { error } from '@sveltejs/kit';
import { componentDocs } from '../../../demo/catalog';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const entry = componentDocs.find((item) => item.slug === params.slug);
  if (!entry) error(404, 'Component not found');
  return { entry };
};
