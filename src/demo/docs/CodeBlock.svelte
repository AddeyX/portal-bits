<script lang="ts">
  import { Tabs } from 'bits-ui';
  import { Check, Copy } from '@lucide/svelte';
  import { highlightSegments } from './highlight';
  import type { SourceFile } from './types';

  let {
    file,
    files,
    collapsible = false,
  }: { file?: SourceFile; files?: SourceFile[]; collapsible?: boolean } = $props();

  class CopyModel {
    status = $state('');
    pending = $state(false);
    expanded = $state(false);
    timer: ReturnType<typeof setTimeout> | undefined;
    closed = false;
    generation = 0;
    source: SourceFile;

    constructor(source: SourceFile) {
      this.source = source;
    }

    destroy() {
      this.closed = true;
      if (this.timer === undefined) return;
      clearTimeout(this.timer);
      this.timer = undefined;
    }

    reset(source: SourceFile) {
      this.generation += 1;
      this.source = source;
      this.status = '';
      this.pending = false;
      this.expanded = false;
      if (this.timer === undefined) return;
      clearTimeout(this.timer);
      this.timer = undefined;
    }

    async copy() {
      if (this.pending) return;
      const generation = this.generation;
      this.pending = true;
      if (this.timer !== undefined) clearTimeout(this.timer);
      try {
        const writeText = navigator.clipboard?.writeText;
        if (!writeText) throw new Error('Clipboard unavailable');
        await writeText.call(navigator.clipboard, this.source.code);
        if (this.closed || this.generation !== generation) return;
        this.status = 'Copied';
      } catch {
        if (this.closed || this.generation !== generation) return;
        this.status = 'Copy failed. Select and copy the code.';
      } finally {
        if (this.closed || this.generation !== generation) return;
        this.pending = false;
        this.timer = setTimeout(() => {
          if (this.closed || this.generation !== generation) return;
          this.status = '';
          this.timer = undefined;
        }, 4000);
      }
    }
  }

  const sources = $derived(files?.length ? files : file ? [file] : []);
  let chosen = $state<string | undefined>(undefined);
  const current = $derived.by(() => {
    const match = sources.find((item) => item.name === chosen);
    if (match) return match;
    return sources.find((item) => item.name === 'App.svelte') ?? sources[0];
  });
  const fileKey = $derived(current ? `${current.language}:${current.name}:${current.code}` : '');
  const multiple = $derived(sources.length > 1);
  // A set of files collapses past 12 lines. A single file collapses only when asked.
  const expandable = $derived(
    current ? (multiple ? current.code.split('\n').length > 12 : collapsible) : false,
  );
  const codeId = $props.id();
  const model = new CopyModel({ name: '', language: 'svelte', code: '' });

  // Reset copy state when the selected source changes. Reading `fileKey` subscribes to its text.
  $effect(() => {
    const source = current;
    const key = fileKey;
    if (!source || !key) return;
    model.reset(source);
  });
</script>

{#snippet sourceCode(source: SourceFile)}
  <!-- Build-time segments for exactly this source. They render as text, never as markup. -->
  {@const segments = highlightSegments(source.code, source.language)}
  <div class="doc-code-scroll" class:doc-code-collapsed={expandable && !model.expanded}>
    <pre id={source.name === current?.name ? codeId : undefined}><code
        >{#if segments}{#each segments as segment, index (index)}<span style={segment.style}
              >{segment.text}</span
            >{/each}{:else}{source.code}{/if}</code
      ></pre>
  </div>
{/snippet}

{#snippet actions()}
  {#if expandable}
    <button
      class="doc-code-expand"
      type="button"
      aria-expanded={model.expanded}
      aria-controls={codeId}
      onclick={() => (model.expanded = !model.expanded)}
    >
      {model.expanded ? 'Collapse' : 'Expand'} Code
    </button>
  {/if}
  <button
    class="doc-code-copy"
    type="button"
    aria-label="Copy {current?.name}"
    data-copied={model.status === 'Copied' ? 'true' : undefined}
    onclick={() => model.copy()}
    disabled={model.pending}
  >
    {#if model.status === 'Copied'}
      <Check size={16} aria-hidden="true" />
    {:else}
      <Copy size={16} aria-hidden="true" />
    {/if}
  </button>
{/snippet}

{#if current}
  <div class="doc-code" {@attach () => () => model.destroy()}>
    {#if multiple}
      <Tabs.Root
        class="doc-code-switcher"
        value={current.name}
        onValueChange={(value) => (chosen = value)}
      >
        <div class="doc-code-toolbar">
          <Tabs.List class="doc-code-tabs" aria-label="Source files">
            {#each sources as source (source.name)}
              <Tabs.Trigger class="doc-code-tab" value={source.name}>{source.name}</Tabs.Trigger>
            {/each}
          </Tabs.List>
          <div class="doc-code-actions">
            {@render actions()}
          </div>
        </div>
        {#each sources as source (source.name)}
          <Tabs.Content class="doc-code-panel" value={source.name}>
            {@render sourceCode(source)}
          </Tabs.Content>
        {/each}
      </Tabs.Root>
    {:else}
      <div class="doc-code-toolbar">
        <p class="doc-code-name">{current.name}</p>
        <div class="doc-code-actions">
          {@render actions()}
        </div>
      </div>
      {@render sourceCode(current)}
    {/if}
    {#if model.status}
      <p
        class="doc-code-status"
        class:doc-code-status-quiet={model.status === 'Copied'}
        role="status"
      >
        {model.status}
      </p>
    {/if}
  </div>
{/if}

<style>
  /* The fill, type, and border follow the active theme tokens.
     Radius 16px and the 320px collapsed height stay gallery adaptations.
     The monospace face stays the library stack. */
  .doc-code {
    margin-top: 12px;
    background: var(--portal-soft);
    color: var(--portal-ink);
    border: 1px solid var(--portal-border);
    border-radius: var(--portal-radius);
    overflow: hidden;
  }

  .doc-code :global(.doc-code-switcher) {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .doc-code-toolbar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
    padding: 4px 8px 0 0;
  }

  .doc-code :global(.doc-code-tabs) {
    display: flex;
    align-items: flex-end;
    min-width: 0;
    overflow-x: auto;
  }

  .doc-code-name,
  .doc-code :global(.doc-code-tab) {
    margin: 0;
    border: 0;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: var(--portal-muted);
    font: 400 14px/20px var(--portal-font);
    padding: 8px 16px;
    white-space: nowrap;
  }

  .doc-code-name,
  .doc-code :global(.doc-code-tab[data-state='active']) {
    color: var(--portal-ink);
    border-bottom-color: var(--portal-ink);
  }

  .doc-code :global(.doc-code-tab) {
    cursor: pointer;
  }

  .doc-code-actions {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 4px;
    padding-bottom: 4px;
  }

  .doc-code-expand,
  .doc-code-copy {
    border: 0;
    background: transparent;
    color: var(--portal-ink);
    font: 400 14px/20px var(--portal-font);
    border-radius: 7px;
    cursor: pointer;
  }

  .doc-code-expand {
    padding: 6px 10px;
  }

  .doc-code-copy {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 8px;
    color: var(--portal-muted);
    border-radius: 6px;
  }

  .doc-code-copy[data-copied='true'] {
    color: var(--portal-ink);
  }

  .doc-code-expand:hover,
  .doc-code-copy:hover {
    background: color-mix(in srgb, var(--portal-ink) 8%, transparent);
  }

  .doc-code-expand:focus-visible,
  .doc-code-copy:focus-visible,
  .doc-code :global(.doc-code-tab:focus-visible) {
    outline: 2px solid var(--portal-ink);
    outline-offset: -2px;
  }

  .doc-code-copy:disabled {
    opacity: 0.6;
  }

  .doc-code :global(.doc-code-panel) {
    min-width: 0;
  }

  .doc-code-scroll {
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-color: var(--portal-control-border) transparent;
  }

  .doc-code-collapsed {
    max-height: 320px;
    overflow-y: auto;
  }

  .doc-code pre {
    margin: 0;
    padding: 16px 16px 20px;
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    font: 600 14px/24px var(--portal-mono);
    color: var(--portal-ink);
    overflow: visible;
    tab-size: 2;
  }

  .doc-code span {
    color: var(--shiki-light, inherit);
  }

  :global([data-portal-theme='dark']) .doc-code span {
    color: var(--shiki-dark, var(--shiki-light, inherit));
  }

  .doc-code code {
    font: inherit;
    user-select: text;
  }

  .doc-code-status {
    margin: 0;
    padding: 0 16px 12px;
    color: var(--portal-ink);
    font: 400 13px/18px var(--portal-font);
  }

  .doc-code-status-quiet {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
</style>
