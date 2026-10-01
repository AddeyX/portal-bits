// Checks the gallery examples and writes build-time highlighting for their source.
// The gallery imports the output as data. Shiki never reaches the browser.
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'svelte/compiler';
import {
  consumerProblems,
  installCommands,
  layoutSource,
  pageSource,
  toConsumerSource,
} from '../src/demo/docs/consumer-source.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const examplesDirectory = join(root, 'src/demo/examples');
export const outputFile = join(root, 'src/demo/docs/generated/highlight.json');
const catalogFile = join(root, 'src/demo/catalog.ts');

/**
 * @typedef {'svelte' | 'typescript' | 'css' | 'bash'} SourceLanguage
 * @typedef {{ slug: string | undefined, filename: string, code: string, language?: SourceLanguage }} ExampleSource
 */

/** Shiki grammar names. Only these grammars load. */
const grammars = /** @type {const} */ ({
  svelte: 'svelte',
  typescript: 'typescript',
  css: 'css',
  bash: 'shellscript',
});
const theme = 'github-light';

/** Slug and component name for every catalog entry. */
async function readCatalog() {
  const text = await readFile(catalogFile, 'utf8');
  const entries = [...text.matchAll(/slug:\s*'([^']+)',\s*title:\s*'([^']+)'/g)].map((match) => ({
    slug: match[1],
    title: match[2],
  }));
  if (entries.length === 0) throw new Error(`No catalog entries found in ${catalogFile}`);
  return entries;
}

/**
 * The consumer source of every example, plus the shared setup files.
 * @returns {Promise<ExampleSource[]>}
 */
export async function collectExampleSources() {
  const sources = /** @type {ExampleSource[]} */ ([]);
  for (const { slug, title } of await readCatalog()) {
    const filename = `${title}Example.svelte`;
    const raw = await readFile(join(examplesDirectory, filename), 'utf8');
    sources.push({ slug, filename, code: toConsumerSource(raw), language: 'svelte' });
  }
  sources.push({ slug: undefined, filename: '+layout.svelte', code: layoutSource });
  sources.push({ slug: undefined, filename: '+page.svelte', code: pageSource });
  for (const [manager, code] of Object.entries(installCommands)) {
    sources.push({ slug: undefined, filename: `${manager} command`, code, language: 'bash' });
  }
  return sources;
}

/**
 * Throw, naming the file and slug, when a source cannot run for a consumer.
 * Compilation proves the markup and script parse. It does not prove packaging or full types.
 * @param {ExampleSource} source
 */
export function checkSource({ slug, filename, code, language = 'svelte' }) {
  if (language !== 'svelte') return;
  const label = `${filename} (${slug ?? 'shared'})`;
  const problems = consumerProblems(code);
  if (problems.length) throw new Error(`${label}: ${problems.join('; ')}`);
  try {
    compile(code, { filename, generate: 'server' });
  } catch (error) {
    throw new Error(`${label}: ${error instanceof Error ? error.message : String(error)}`, {
      cause: error,
    });
  }
}

/** @param {string} text */
function escapeHtml(text) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/**
 * @param {{ content: string, color?: string, fontStyle?: number }} token
 */
function tokenHtml({ content, color, fontStyle = 0 }) {
  const text = escapeHtml(content);
  const styles = [];
  if (color && /^#[0-9a-fA-F]{3,8}$/.test(color)) styles.push(`color:${color}`);
  if (fontStyle & 1) styles.push('font-style:italic');
  if (fontStyle & 2) styles.push('font-weight:bold');
  if (fontStyle & 4) styles.push('text-decoration:underline');
  return styles.length ? `<span style="${styles.join(';')}">${text}</span>` : text;
}

/** @param {string} path */
async function readTable(path) {
  try {
    const parsed = JSON.parse(await readFile(path, 'utf8'));
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Write highlight data for every example. Existing entries are reused, so a build with no
 * source changes never starts Shiki.
 * @param {{ output?: string }} [options]
 */
export async function buildDocExamples({ output = outputFile } = {}) {
  const sources = await collectExampleSources();
  for (const source of sources) checkSource(source);

  const previous = await readTable(output);
  /** @type {Record<string, Record<string, string>>} */
  const table = {};
  /** @type {{ language: SourceLanguage, code: string, filename: string }[]} */
  const missing = [];
  for (const { language = 'svelte', code, filename } of sources) {
    table[language] ??= {};
    const known = Object.hasOwn(previous[language] ?? {}, code)
      ? previous[language][code]
      : undefined;
    if (typeof known === 'string') table[language][code] = known;
    else missing.push({ language, code, filename });
  }

  if (missing.length) {
    const { createHighlighter, createJavaScriptRegexEngine } = await import('shiki');
    const highlighter = await createHighlighter({
      themes: [theme],
      langs: Object.values(grammars),
      engine: createJavaScriptRegexEngine(),
    });
    try {
      for (const { language, code, filename } of missing) {
        try {
          const lines = highlighter.codeToTokensBase(code, { lang: grammars[language], theme });
          const text = lines.map((line) => line.map((token) => token.content).join('')).join('\n');
          if (text !== code) throw new Error('Highlighted text differs from the source');
          table[language][code] = lines.map((line) => line.map(tokenHtml).join('')).join('\n');
        } catch (error) {
          // The source stays readable and escaped. Only invalid source fails generation.
          console.warn(`Highlighting skipped for ${filename}: ${String(error)}`);
        }
      }
    } finally {
      highlighter.dispose();
    }
  }

  const next = `${JSON.stringify(table)}\n`;
  let current = '';
  try {
    current = await readFile(output, 'utf8');
  } catch {
    // The file does not exist yet.
  }
  if (next === current) return { written: false, count: sources.length };
  await mkdir(dirname(output), { recursive: true });
  const temporary = `${output}.${process.pid}.tmp`;
  await writeFile(temporary, next);
  await rename(temporary, output);
  return { written: true, count: sources.length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildDocExamples()
    .then(({ written, count }) => {
      console.log(`${written ? 'Wrote' : 'Kept'} highlighting for ${count} sources.`);
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    });
}
