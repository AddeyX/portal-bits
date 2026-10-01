import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const building = process.env.npm_lifecycle_event === 'build' || process.argv.includes('build');
const base = building ? (process.env.BASE_PATH ?? '') : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: '404.html',
    }),
    paths: {
      base,
      relative: false,
    },
    prerender: {
      handleMissingId: ({ path, message }) => {
        // Component examples link to fragments such as #overview. Those targets belong to the
        // page that copies the example, so the component pages do not define them.
        if (path.startsWith('/components/')) return;
        throw new Error(message);
      },
      handleHttpError: ({ path, message }) => {
        // The avatar demo requests a missing file so its fallback can show.
        if (path === '/missing-avatar.png') return;
        throw new Error(message);
      },
    },
  },
};

export default config;
