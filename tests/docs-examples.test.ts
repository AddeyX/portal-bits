import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { compile } from 'svelte/compiler';
import { render, screen, fireEvent, within } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CodeBlock from '../src/demo/docs/CodeBlock.svelte';
import Preview from '../src/routes/components/[slug]/Preview.svelte';
import { componentDocs } from '../src/demo/catalog';
import { initialSettings } from '../src/demo/docs/variations';
import { consumerProblems, installCommands, layoutSource } from '../src/demo/docs/consumer-source';
import { highlightSegments, highlightSource } from '../src/demo/docs/highlight';
import { examples, getExampleFiles } from '../src/demo/examples/registry';
import { collectExampleSources } from '../scripts/build-doc-examples.mjs';
import { choose } from './helpers/select';

const exampleDirectory = join(__dirname, '../src/demo/examples');
const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
  else Reflect.deleteProperty(navigator, 'clipboard');
});

describe('example registry', () => {
  it('has one example file per catalog component and nothing else', () => {
    const files = readdirSync(exampleDirectory)
      .filter((name) => name.endsWith('Example.svelte'))
      .sort();
    expect(files).toEqual(componentDocs.map((doc) => `${doc.title}Example.svelte`).sort());
    expect(Object.keys(examples).sort()).toEqual(componentDocs.map((doc) => doc.slug).sort());
  });

  it.each(componentDocs)('$slug has a complete consumer file set', ({ slug, title }) => {
    const files = getExampleFiles(slug, initialSettings()[slug as keyof typeof initialSettings]);
    expect(files.map((file) => file.name)).toEqual([
      '+layout.svelte',
      'App.svelte',
      `${title}Example.svelte`,
    ]);
    const example = files[2];
    expect(example.code).toBe(
      readFileSync(join(exampleDirectory, `${title}Example.svelte`), 'utf8').replace(
        /(\bfrom\s+)(['"])\$lib\2/g,
        '$1$2portal-bits$2',
      ),
    );
    expect(files[0].code).toBe(layoutSource);
    expect(files[1].code).toContain(`import ${title}Example from './${title}Example.svelte';`);
    for (const file of files) {
      expect(consumerProblems(file.code), `${slug} ${file.name}`).toEqual([]);
      expect(() => compile(file.code, { filename: file.name, generate: 'server' })).not.toThrow();
    }
  });

  it('converts only the exact $lib import specifier', () => {
    const buttonSource = readFileSync(join(exampleDirectory, 'ButtonExample.svelte'), 'utf8');
    expect(buttonSource).toContain("from '$lib'");
    const [, , example] = getExampleFiles('button', {});
    expect(example.code).toContain("from 'portal-bits'");
    expect(example.code).not.toContain('$lib');
    expect(consumerProblems("import { x } from '$lib/internal/color';")).not.toEqual([]);
    expect(consumerProblems("import { resolve } from '$app/paths';")).not.toEqual([]);
    expect(consumerProblems('<img src="/art/orbit.svg" alt="" />')).not.toEqual([]);
  });

  it('keeps examples out of the published package', () => {
    const manifest = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));
    expect(manifest.files).toEqual(['dist']);
    expect(Object.values(manifest.exports).join(' ')).not.toMatch(/demo|example|highlight/i);
    expect(readFileSync(join(__dirname, '../.gitignore'), 'utf8')).toContain(
      'src/demo/docs/generated/',
    );
  });
});

describe('example generator', () => {
  it('reports the file and slug of an invalid example', async () => {
    const sources = await collectExampleSources();
    expect(sources.filter((source) => source.slug)).toHaveLength(componentDocs.length);
    const bad = { slug: 'broken', filename: 'BrokenExample.svelte', code: '<div>{#if}</div>' };
    const { checkSource } = await import('../scripts/build-doc-examples.mjs');
    expect(() => checkSource(bad)).toThrow(/BrokenExample\.svelte.*broken/s);
  });
});

describe('highlighting', () => {
  it('highlights static example source from build-time data', () => {
    for (const { slug } of componentDocs) {
      const [, , example] = getExampleFiles(slug, {});
      const html = highlightSource(example.code, 'svelte');
      expect(html, slug).toContain('--shiki-light:');
      expect(html, slug).toContain('--shiki-dark:');
      expect(
        html!
          .replace(/<[^>]+>/g, '')
          .replaceAll('&lt;', '<')
          .replaceAll('&gt;', '>'),
      ).toContain('portal-bits');
    }
    expect(highlightSource(layoutSource, 'svelte')).toBeDefined();
    for (const command of Object.values(installCommands)) {
      expect(highlightSource(command, 'bash')).toBeDefined();
    }
  });

  it('decodes highlighted segments back to the exact source', () => {
    for (const { slug } of componentDocs) {
      const [, , example] = getExampleFiles(slug, {});
      const segments = highlightSegments(example.code, 'svelte')!;
      expect(segments.map((segment) => segment.text).join(''), slug).toBe(example.code);
      expect(segments.some((segment) => segment.style?.includes('--shiki-light:'))).toBe(true);
      expect(segments.some((segment) => segment.style?.includes('--shiki-dark:'))).toBe(true);
    }
    expect(highlightSegments('<b>unknown</b>', 'svelte')).toBeUndefined();
  });

  it('never reuses highlighted HTML for a different source string', () => {
    const [, , example] = getExampleFiles('badge', {});
    expect(highlightSource(`${example.code}\n`, 'svelte')).toBeUndefined();
    expect(highlightSource(example.code, 'css')).toBeUndefined();
    expect(highlightSource('constructor', 'svelte')).toBeUndefined();
    expect(highlightSource('toString', 'bash')).toBeUndefined();
  });

  it('keeps unmatched source escaped and readable', () => {
    const code = '<script>alert("x")</script><b>bold</b>';
    const { container } = render(CodeBlock, {
      file: { name: 'Dynamic.svelte', language: 'svelte', code },
    });
    expect(container.querySelector('code')).toHaveTextContent(code);
    expect(container.querySelector('code script, code b, code span')).toBeNull();
  });

  it('renders highlighted source with the exact raw text', () => {
    const [, , example] = getExampleFiles('badge', {});
    const { container } = render(CodeBlock, {
      file: { name: 'BadgeExample.svelte', language: 'svelte', code: example.code },
    });
    const code = container.querySelector('code')!;
    expect(code.querySelector('span')).not.toBeNull();
    expect(code.textContent).toBe(example.code);
  });
});

describe('component source', () => {
  it('generates the selected settings in App.svelte and copies the exact raw file', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(Preview, { slug: 'button' });

    await choose('Variant', 'green');
    await choose('Size', '48px');
    await fireEvent.click(screen.getByRole('switch', { name: 'Disabled' }));

    const expected = getExampleFiles('button', {
      variant: 'green',
      size: 48,
      disabled: true,
      icon: false,
    });
    const app = expected.find((file) => file.name === 'App.svelte')!;
    expect(app.code).toContain('variant={"green"}');
    expect(app.code).toContain('size={48}');
    expect(app.code).toContain('disabled={true}');

    const tabs = screen.getByRole('tablist', { name: 'Source files' });
    await fireEvent.click(within(tabs).getByRole('tab', { name: 'App.svelte' }));
    await fireEvent.click(screen.getByRole('button', { name: 'Copy App.svelte' }));
    expect(writeText).toHaveBeenLastCalledWith(app.code);

    const specimen = within(screen.getByRole('region', { name: 'Button preview' })).getByRole(
      'button',
    );
    expect(specimen).toBeDisabled();
    expect(specimen).toHaveClass('p-button--green', 'p-button--48');

    const example = expected.find((file) => file.name === 'ButtonExample.svelte')!;
    await fireEvent.click(within(tabs).getByRole('tab', { name: 'ButtonExample.svelte' }));
    await fireEvent.click(screen.getByRole('button', { name: 'Copy ButtonExample.svelte' }));
    expect(writeText).toHaveBeenLastCalledWith(example.code);
  });

  it('lists every file and expands long source with an accessible button', async () => {
    render(Preview, { slug: 'dialog' });
    const tabs = screen.getByRole('tablist', { name: 'Source files' });
    expect(screen.queryByRole('button', { name: 'Expand Code' })).toBeNull();
    expect(
      within(tabs)
        .getAllByRole('tab')
        .map((tab) => tab.textContent),
    ).toEqual(['+layout.svelte', 'App.svelte', 'DialogExample.svelte']);
    expect(within(tabs).getByRole('tab', { name: 'App.svelte' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await fireEvent.click(within(tabs).getByRole('tab', { name: 'DialogExample.svelte' }));
    const expand = screen.getByRole('button', { name: 'Expand Code' });
    expect(expand).toHaveAttribute('aria-expanded', 'false');
    await fireEvent.click(expand);
    expect(screen.getByRole('button', { name: 'Collapse Code' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('never executes displayed source', async () => {
    const { container } = render(Preview, { slug: 'badge' });
    expect(container.querySelectorAll('.doc-code script')).toHaveLength(0);
  });
});
