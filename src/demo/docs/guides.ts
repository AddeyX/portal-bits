/**
 * Prose for the three guide pages. The guide routes render these sections, and search indexes the
 * same text, so a result always matches what the page says. Wrap code in backticks. `InlineText`
 * renders it as `<code>` and search drops the backticks.
 *
 * Swatches, motion demos, tables, and code samples stay in the routes.
 */
import { guideDocs } from '../catalog';
import { packageFacts } from './install';
import type { DocPage, DocSection } from './types';

export type InlinePart = { text: string; code: boolean };

/** Split `text` on backticks. Odd-numbered pieces are code. An unpaired backtick stays text. */
export function inlineParts(text: string): InlinePart[] {
  const pieces = text.split('`');
  if (pieces.length % 2 === 0) return [{ text, code: false }];
  return pieces
    .map((piece, index) => ({ text: piece, code: index % 2 === 1 }))
    .filter((part) => part.text !== '');
}

/** The text a reader sees, without code markers. */
export function plainText(text: string): string {
  return inlineParts(text)
    .map((part) => part.text)
    .join('');
}

const guideMeta = new Map(guideDocs.map((guide) => [guide.href, guide]));

function page(path: string, sections: DocPage['sections'], related: DocPage['related']): DocPage {
  const meta = guideMeta.get(path);
  if (!meta) throw new Error(`No guide is listed for "${path}".`);
  return { path, title: meta.label, description: meta.description, sections, related };
}

/** Paragraphs between a guide's lede and its first heading. Search treats them as page text. */
export const guideIntros: Record<string, string[]> = {
  '/get-started': [
    'portal-bits is a Svelte 5 component library. Bits UI supplies the interaction. The components ship with their measured styles. `svelte` and `bits-ui` stay peers.',
  ],
  '/foundations': [],
  '/motion': [],
};

export const guidePages: DocPage[] = [
  page(
    '/get-started',
    [
      {
        id: 'installation',
        title: 'Installation',
        paragraphs: [
          `This repository is version ${packageFacts.version}. It supports \`svelte@${packageFacts.peers.svelte}\` and \`bits-ui@${packageFacts.peers['bits-ui']}\`.`,
          'The command installs `portal-bits` together with the `svelte` and `bits-ui` peers. A project that already uses Svelte should keep a `svelte` release inside the supported range, and add `bits-ui` in its supported range.',
        ],
      },
      {
        id: 'basic-usage',
        title: 'Basic usage',
        paragraphs: [
          'Import a component in a page and render it. Load the styles from the layout.',
        ],
      },
      {
        id: 'styles',
        title: 'Styles',
        paragraphs: [
          'Load the styles once, in the root layout. `styles.css` is the component styling, and it already imports `tokens.css`. The layout example also imports `tokens.css` so the token file stays visible. That second import is not a separate requirement.',
          '`tokens.css` defines color, type, and space. `--portal-font` names Roobert, then Inter, then a system font. The package ships no font files. This gallery bundles Inter.',
        ],
      },
      {
        id: 'typescript',
        title: 'TypeScript',
        paragraphs: [
          'Types ship with the package. `NavItem` is a navigation item. `SelectOption` is a select choice. Each component export types its own props.',
        ],
      },
    ],
    ['/components', '/foundations', '/motion'],
  ),
  page(
    '/foundations',
    [
      {
        id: 'palette',
        title: 'A restrained palette',
        paragraphs: [
          'Soft neutrals leave room for a very particular green.',
          'Source muted text is #9da3ac. This kit uses #686e78 for small text on light surfaces to improve contrast. Input, Select, Checkbox, and Switch edges use #878e98 instead of the source #edeff3 so each control is visible at 3:1; dividers keep #edeff3. Dark preview is an adaptation. It is not inspired by a measured dark theme.',
        ],
      },
      {
        id: 'typography',
        title: 'Quietly expressive type',
        paragraphs: [
          'Regular weight, close tracking, and a clear hierarchy.',
          'The measured family is Roobert. This gallery bundles Inter under the SIL Open Font License as a predictable fallback. Supply licensed Roobert through --portal-font for closer typography.',
        ],
      },
      {
        id: 'space-shape-depth',
        title: 'Space, shape, depth',
        paragraphs: ['Room to breathe. Just enough elevation.'],
      },
      {
        id: 'evidence',
        title: 'Evidence, not guesswork',
        paragraphs: ['What was measured, and where the library makes a deliberate choice.'],
      },
    ],
    ['/get-started', '/motion'],
  ),
  page(
    '/motion',
    [
      {
        id: 'easing-curve',
        title: 'The easing curve',
        paragraphs: [
          'Quick to respond. Soft on arrival.',
          'The moving dot visualizes the measured curve. It is a demonstration, not a motion copied from the source.',
        ],
      },
      {
        id: 'feedback',
        title: 'Feedback you can feel',
        paragraphs: ['Every interaction resolves to a clear state.'],
      },
      {
        id: 'press-and-select',
        title: 'Press & select',
        paragraphs: [
          'Color, shadow, and thumb travel. No unnecessary bounce.',
          'Source curve; toggle fill, press shadow, and switch travel are adapted behaviors.',
        ],
      },
      {
        id: 'enter-and-exit',
        title: 'Enter & exit',
        paragraphs: [
          'Subtle travel, with focus managed by Bits UI.',
          'Entry: 300ms. Exit: 160ms. Distances, exit duration, and blur are adaptations; not measured source values.',
        ],
      },
      {
        id: 'reduced-motion',
        title: 'Motion should never get in the way',
        paragraphs: ['Respect the person, not just the animation.'],
      },
    ],
    ['/foundations', '/components'],
  ),
];

/** A guide page. A route that asks for a guide that does not exist is a bug, so this throws. */
export function guidePage(path: string): DocPage {
  const found = guidePages.find((item) => item.path === path);
  if (!found) throw new Error(`No guide exists at "${path}".`);
  return found;
}

/** One section of a guide, by id. */
export function guideSection(path: string, id: string): DocSection {
  const found = guidePage(path).sections.find((item) => item.id === id);
  if (!found) throw new Error(`The guide at "${path}" has no section "${id}".`);
  return found;
}
