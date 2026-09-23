import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
export default defineConfig({
  plugins: [sveltekit()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    server: { deps: { inline: ['bits-ui'] } },
  },
  resolve: process.env.VITEST ? { conditions: ['browser'] } : {},
});
