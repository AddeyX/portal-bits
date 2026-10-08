// Plain JavaScript so Node scripts and the gallery share one definition.

/** The package name consumers import from. */
export const packageName = 'portal-bits';

const packages = `${packageName} svelte bits-ui @lucide/svelte`;

/** @type {Record<'npm' | 'pnpm' | 'yarn' | 'bun', string>} */
export const installCommands = {
  npm: `npm install ${packages}`,
  pnpm: `pnpm add ${packages}`,
  yarn: `yarn add ${packages}`,
  bun: `bun add ${packages}`,
};

/** Source for the first component a consumer renders. */
export const pageSource = `<script lang="ts">
  import { Button } from 'portal-bits';
</script>

<Button variant="primary">Save changes</Button>`;

/** Source that sets up the library styles in a consumer app. */
export const layoutSource = `<script lang="ts">
  import 'portal-bits/styles.css';
  import 'portal-bits/tokens.css';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

{@render children()}
`;

/**
 * Turn gallery source into consumer source. Only the exact `$lib` import specifier changes.
 * @param {string} source
 */
export function toConsumerSource(source) {
  return source.replace(/(\bfrom\s+)(['"])\$lib\2/g, `$1$2${packageName}$2`);
}

/** Specifiers a consumer can resolve after running the documented install command. */
const allowedSpecifiers = [
  /^portal-bits$/,
  /^portal-bits\/(styles|tokens)\.css$/,
  /^svelte$/,
  /^svelte\/[a-z-]+$/,
  /^@lucide\/svelte$/,
  /^\.\/[A-Za-z]+Example\.svelte$/,
];

const galleryOnly = [
  /\$lib/,
  /\$app\//,
  /\bgallery(Asset|Href|Path)\b/,
  /\/art\//,
  /\bdemo\//,
  /\binternal\//,
  /['"]\.\.\//,
];

/**
 * Problems that stop a source file from running outside the gallery.
 * @param {string} source consumer source
 * @returns {string[]}
 */
export function consumerProblems(source) {
  const problems = [];
  for (const match of source.matchAll(/\b(?:from|import)\s+(['"])([^'"]+)\1/g)) {
    const specifier = match[2];
    if (!allowedSpecifiers.some((pattern) => pattern.test(specifier))) {
      problems.push(`Unresolved import "${specifier}"`);
    }
  }
  for (const pattern of galleryOnly) {
    if (pattern.test(source)) problems.push(`Gallery-only reference ${pattern}`);
  }
  return problems;
}

const identifier = /^[A-Za-z_$][\w$]*$/;

/**
 * A usage tag with fixed prop names and JSON literal values.
 * @param {string} name component name
 * @param {Record<string, string | number | boolean>} props
 */
export function usageTag(name, props) {
  const attributes = Object.entries(props).map(([key, value]) => {
    if (!identifier.test(key)) throw new Error(`Invalid prop name "${key}"`);
    return `${key}={${JSON.stringify(value)}}`;
  });
  return `<${[name, ...attributes].join(' ')} />`;
}
