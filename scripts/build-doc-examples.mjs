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
// Token colors only. The block fill comes from the portal tokens, not this file.
const midnightFile = join(root, 'scripts/serendipity-midnight.json');
const highlightTheme = 'Serendipity Midnight light/Serendipity Midnight';

/**
 * Same Midnight hues, darkened so each role stays readable on the light surface.
 * Near-white text becomes ink. Blue, cyan, gold, and salmon stay distinct.
 * This map is an adaptation.
 */
const lightForeground = {
  '#707070': '#6a6f7e',
  '#5ba2d0': '#1a5f96',
  '#eeeeee': '#24262e',
  '#e6e6e6': '#24262e',
  '#b0e2fd': '#0e748c',
  '#ee8679': '#c43d2e',
  '#8d8f9e': '#5c6170',
  '#dee0ef': '#3a3f50',
  '#e3d891': '#8a6414',
};

/** @param {any} midnight */
function lightThemeFrom(midnight) {
  const theme = structuredClone(midnight);
  theme.name = 'Serendipity Midnight light';
  theme.type = 'light';
  /** @param {string} color */
  const map = (color) => {
    const next = /** @type {Record<string, string>} */ (lightForeground)[color.toLowerCase()];
    if (!next) throw new Error(`No light syntax color for ${color}`);
    return next;
  };
  for (const rule of theme.tokenColors ?? []) {
    const color = rule.settings?.foreground;
    if (typeof color === 'string') rule.settings.foreground = map(color);
  }
  const foreground = theme.colors?.['editor.foreground'];
  if (typeof foreground === 'string') theme.colors['editor.foreground'] = map(foreground);
  return theme;
}

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

/** @param {string | undefined} color */
function isColor(color) {
  return typeof color === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(color);
}

/**
 * Light color is the default. Dark color is a variable the block reads under the dark theme.
 * @param {{ content: string, htmlStyle?: Record<string, string> }} token
 */
function tokenHtml({ content, htmlStyle = {} }) {
  const text = escapeHtml(content);
  const styles = [];
  if (isColor(htmlStyle.color)) styles.push(`--shiki-light:${htmlStyle.color}`);
  if (isColor(htmlStyle['--shiki-dark'])) styles.push(`--shiki-dark:${htmlStyle['--shiki-dark']}`);
  for (const name of ['font-style', 'font-weight', 'text-decoration']) {
    if (htmlStyle[name]) styles.push(`${name}:${htmlStyle[name]}`);
  }
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
  const reusable = previous.theme === highlightTheme ? previous : {};
  /** @type {Record<string, Record<string, string>>} */
  const table = {};
  /** @type {{ language: SourceLanguage, code: string, filename: string }[]} */
  const missing = [];
  for (const { language = 'svelte', code, filename } of sources) {
    table[language] ??= {};
    const known = Object.hasOwn(reusable[language] ?? {}, code)
      ? reusable[language][code]
      : undefined;
    if (typeof known === 'string') table[language][code] = known;
    else missing.push({ language, code, filename });
  }

  if (missing.length) {
    const midnight = JSON.parse(await readFile(midnightFile, 'utf8'));
    const themes = { light: lightThemeFrom(midnight), dark: midnight };
    if (`${themes.light.name}/${themes.dark.name}` !== highlightTheme) {
      throw new Error(`Highlight themes are ${themes.light.name}/${themes.dark.name}`);
    }
    const { createHighlighter, createJavaScriptRegexEngine } = await import('shiki');
    const highlighter = await createHighlighter({
      themes: [themes.light, themes.dark],
      langs: Object.values(grammars),
      engine: createJavaScriptRegexEngine(),
    });
    try {
      for (const { language, code, filename } of missing) {
        try {
          const { tokens } = highlighter.codeToTokens(code, {
            lang: grammars[language],
            themes,
          });
          const text = tokens.map((line) => line.map((token) => token.content).join('')).join('\n');
          if (text !== code) throw new Error('Highlighted text differs from the source');
          table[language][code] = tokens.map((line) => line.map(tokenHtml).join('')).join('\n');
        } catch (error) {
          // The source stays readable and escaped. Only invalid source fails generation.
          console.warn(`Highlighting skipped for ${filename}: ${String(error)}`);
        }
      }
    } finally {
      highlighter.dispose();
    }
  }

  const next = `${JSON.stringify({ theme: highlightTheme, ...table })}\n`;
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
