import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vitest/config';
import { buildDocExamples } from './scripts/build-doc-examples.mjs';

/**
 * Checks the gallery examples and writes their build-time highlighting before modules load.
 * It runs for the gallery only. `npm run package` does not use Vite.
 */
function docExamples(): Plugin {
  return {
    name: 'portal-bits-doc-examples',
    async buildStart() {
      await buildDocExamples();
    },
    async handleHotUpdate({ file }) {
      const watched =
        /[\\/]src[\\/]demo[\\/](examples[\\/].+\.svelte|docs[\\/]consumer-source\.js|catalog\.ts)$/;
      if (watched.test(file)) await buildDocExamples();
    },
  };
}

export default defineConfig({
  plugins: [docExamples(), sveltekit()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    server: { deps: { inline: ['bits-ui'] } },
  },
  resolve: process.env.VITEST ? { conditions: ['browser'] } : {},
});
