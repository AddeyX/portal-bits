import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vitest/config';
import { buildDocExamples } from './scripts/build-doc-examples.mjs';

/**
 * Vite records the dev-only `sv-agentation` import before that branch is removed,
 * so the production graph would still emit the inspector. This replaces it with
 * an empty module during build. The dev server keeps the real package.
 */
function devInspectorStub(): Plugin {
  const id = '\0portal-bits-dev-inspector';
  return {
    name: 'portal-bits-dev-inspector-stub',
    apply: 'build',
    enforce: 'pre',
    resolveId(source) {
      if (source === 'sv-agentation') return id;
    },
    load(source) {
      if (source === id) return 'export const Agentation = null;\n';
    },
  };
}

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
  plugins: [devInspectorStub(), docExamples(), sveltekit()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    server: { deps: { inline: ['bits-ui'] } },
  },
  resolve: process.env.VITEST ? { conditions: ['browser'] } : {},
});
