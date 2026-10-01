<script lang="ts">
  import type { SourceFile } from './types';

  let { file, collapsible = false }: { file: SourceFile; collapsible?: boolean } = $props();

  class CopyModel {
    status = $state('');
    pending = $state(false);
    expanded = $state(false);
    timer: ReturnType<typeof setTimeout> | undefined;
    closed = false;
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

    async copy() {
      if (this.pending) return;
      this.pending = true;
      if (this.timer !== undefined) clearTimeout(this.timer);
      try {
        const writeText = navigator.clipboard?.writeText;
        if (!writeText) throw new Error('Clipboard unavailable');
        await writeText.call(navigator.clipboard, this.source.code);
        if (this.closed) return;
        this.status = 'Copied';
      } catch {
        if (this.closed) return;
        this.status = 'Copy failed. Select and copy the code.';
      } finally {
        if (this.closed) return;
        this.pending = false;
        this.timer = setTimeout(() => {
          if (this.closed) return;
          this.status = '';
          this.timer = undefined;
        }, 4000);
      }
    }
  }

  const fileKey = $derived(`${file.language}:${file.name}:${file.code}`);
</script>

{#key fileKey}
  {@const model = new CopyModel(file)}
  <div class="doc-code" {@attach () => () => model.destroy()}>
    <div class="doc-code-toolbar">
      <p class="doc-code-name">{file.name}</p>
      <div class="doc-code-actions">
        {#if collapsible}
          <button type="button" onclick={() => (model.expanded = !model.expanded)}>
            {model.expanded ? 'Collapse' : 'Expand'}
            {file.name}
          </button>
        {/if}
        <button type="button" onclick={() => model.copy()} disabled={model.pending}>
          Copy {file.name}
        </button>
      </div>
    </div>
    <pre class:doc-code-collapsed={collapsible && !model.expanded}><code>{file.code}</code></pre>
    {#if model.status}
      <p class="doc-code-status" role="status" aria-live="polite">{model.status}</p>
    {/if}
  </div>
{/key}

<style>
  .doc-code-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .doc-code-name {
    margin: 0;
    font-size: 12px;
    line-height: 20px;
    color: var(--portal-muted);
  }

  .doc-code-actions {
    display: flex;
    gap: 8px;
  }

  .doc-code-actions button {
    font: 12px/20px var(--portal-mono);
    color: var(--portal-ink);
    background: transparent;
    border: 1px solid var(--portal-border);
    border-radius: 8px;
    padding: 4px 8px;
  }

  .doc-code-actions button:disabled {
    opacity: 0.6;
  }

  .doc-code pre {
    max-width: 100%;
  }

  .doc-code code {
    user-select: text;
  }

  .doc-code-collapsed {
    max-height: 160px;
  }

  .doc-code-status {
    margin: 8px 0 0;
    font-size: 13px;
    line-height: 20px;
  }
</style>
