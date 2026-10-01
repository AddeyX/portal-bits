import { render, fireEvent, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CodeBlock from '../src/demo/docs/CodeBlock.svelte';
import { installCommands, packageFacts } from '../src/demo/docs/install';
import GetStarted from '../src/routes/get-started/+page.svelte';

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

function restoreClipboard() {
  if (originalClipboard) {
    Object.defineProperty(navigator, 'clipboard', originalClipboard);
    return;
  }
  Reflect.deleteProperty(navigator, 'clipboard');
}

afterEach(() => {
  restoreClipboard();
});

const file = {
  name: 'Terminal',
  language: 'bash' as const,
  code: 'npm install portal-bits svelte bits-ui',
};

describe('CodeBlock', () => {
  it('copies the source and announces success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    render(CodeBlock, { file });
    await fireEvent.click(screen.getByRole('button', { name: 'Copy Terminal' }));
    expect(writeText).toHaveBeenCalledWith(file.code);
    expect(await screen.findByRole('status')).toHaveTextContent('Copied');
  });

  it('announces failure and keeps the source selectable when copy is rejected', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    render(CodeBlock, { file });
    await fireEvent.click(screen.getByRole('button', { name: 'Copy Terminal' }));
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Copy failed. Select and copy the code.',
    );
    const source = screen.getByText(file.code);
    expect(source).toBeVisible();
    expect(getComputedStyle(source).userSelect).not.toBe('none');
  });

  it('announces failure when the clipboard is missing', async () => {
    Reflect.deleteProperty(navigator, 'clipboard');
    render(CodeBlock, { file });
    await fireEvent.click(screen.getByRole('button', { name: 'Copy Terminal' }));
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Copy failed. Select and copy the code.',
    );
    expect(screen.getByText(file.code)).toBeVisible();
  });
});

describe('install commands', () => {
  it('builds one exact command for each package manager from package metadata', () => {
    expect(packageFacts.version).toBe('0.4.0');
    expect(packageFacts.peers).toEqual({ svelte: '^5.33.0', 'bits-ui': '^2.19.3' });
    expect(installCommands).toEqual({
      npm: 'npm install portal-bits svelte bits-ui',
      pnpm: 'pnpm add portal-bits svelte bits-ui',
      yarn: 'yarn add portal-bits svelte bits-ui',
      bun: 'bun add portal-bits svelte bits-ui',
    });
  });
});

describe('Get started', () => {
  it('copies the selected package-manager command and links each setup section', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    render(GetStarted);
    expect(document.getElementById('installation')).toHaveTextContent('Installation');
    expect(document.getElementById('basic-usage')).toHaveTextContent('Basic usage');
    expect(document.getElementById('styles')).toHaveTextContent('Styles');
    expect(document.getElementById('typescript')).toHaveTextContent('TypeScript');
    expect(screen.getByText(/svelte@\^5\.33\.0/)).toBeVisible();
    expect(screen.getByText(/bits-ui@\^2\.19\.3/)).toBeVisible();

    const select = screen.getByRole('combobox', { name: 'Package manager' });
    for (const [value, command] of Object.entries(installCommands)) {
      await fireEvent.change(select, { target: { value } });
      expect(screen.getByText(command)).toBeVisible();
      await fireEvent.click(screen.getByRole('button', { name: 'Copy Terminal' }));
      expect(writeText).toHaveBeenLastCalledWith(command);
    }
  });

  it('keeps the install command selectable when the clipboard is missing', async () => {
    Reflect.deleteProperty(navigator, 'clipboard');
    render(GetStarted);
    expect(screen.getByText(installCommands.npm)).toBeVisible();
    await fireEvent.click(screen.getByRole('button', { name: 'Copy Terminal' }));
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Copy failed. Select and copy the code.',
    );
  });
});
