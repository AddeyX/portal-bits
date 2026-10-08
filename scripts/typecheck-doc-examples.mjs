// Type-checks every gallery example as a consumer would use it, in a temporary Svelte project
// outside this repository. It needs `npm run package` first, because the fixture installs the
// built package. This verifies the examples. It does not stand in for a consumer test of the
// package, which is a separate script.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
if (!existsSync(join(root, 'dist/index.js'))) {
  console.error('Run `npm run package` first. The fixture installs the built package.');
  process.exit(1);
}

const server = await createServer({
  root,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, watch: null },
});
/** @type {string | undefined} */
let fixture;
try {
  const { examples, getExampleFiles } = await server.ssrLoadModule(
    '/src/demo/examples/registry.ts',
  );
  const { variations } = await server.ssrLoadModule('/src/demo/docs/variations.ts');

  fixture = await mkdtemp(join(tmpdir(), 'portal-bits-examples-'));
  await mkdir(join(fixture, 'node_modules/@lucide'), { recursive: true });
  const modules = join(root, 'node_modules');
  for (const [name, target] of [
    ['svelte', join(modules, 'svelte')],
    ['bits-ui', join(modules, 'bits-ui')],
    ['@lucide/svelte', join(modules, '@lucide/svelte')],
    ['portal-bits', root],
  ]) {
    await symlink(target, join(fixture, 'node_modules', name), 'dir');
  }
  await writeFile(join(fixture, 'package.json'), '{"type":"module","private":true}\n');
  await writeFile(
    join(fixture, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        strict: true,
        target: 'esnext',
        module: 'esnext',
        moduleResolution: 'bundler',
        verbatimModuleSyntax: true,
        isolatedModules: true,
        skipLibCheck: true,
        types: [],
      },
      include: ['src/**/*'],
    }),
  );

  // A real consumer gets this from Vite's client types.
  await mkdir(join(fixture, 'src'), { recursive: true });
  await writeFile(join(fixture, 'src/ambient.d.ts'), "declare module '*.css';\n");

  let apps = 0;
  for (const slug of Object.keys(examples)) {
    const directory = join(fixture, 'src', slug);
    await mkdir(directory, { recursive: true });
    const variants = [variations[slug].defaults];
    // Each choice and each flag on its own, so every literal reaches a prop.
    for (const control of variations[slug].controls) {
      const values =
        control.kind === 'choice' ? control.options.map((option) => option.value) : [true, false];
      for (const value of values) {
        variants.push({ ...variations[slug].defaults, [control.key]: value });
      }
    }
    for (const [index, settings] of variants.entries()) {
      apps++;
      for (const file of getExampleFiles(slug, settings)) {
        const name =
          file.name === 'App.svelte' ? `App-${index}.svelte` : file.name.replace('+', '');
        await writeFile(join(directory, name), file.code);
      }
    }
  }

  const bin = join(root, 'node_modules/svelte-check/bin/svelte-check');
  const result = spawnSync(
    process.execPath,
    [
      bin,
      '--workspace',
      fixture,
      '--tsconfig',
      join(fixture, 'tsconfig.json'),
      '--fail-on-warnings',
    ],
    { stdio: 'inherit', cwd: fixture },
  );
  console.log(`Checked ${Object.keys(examples).length} examples and ${apps} usage files.`);
  process.exitCode = result.status ?? 1;
} finally {
  await server.close();
  if (fixture) await rm(fixture, { recursive: true, force: true });
}
