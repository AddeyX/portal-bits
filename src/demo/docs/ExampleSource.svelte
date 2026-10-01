<script lang="ts">
  import CodeBlock from './CodeBlock.svelte';
  import type { SourceFile } from './types';

  let { files }: { files: SourceFile[] } = $props();

  const id = $props.id();
  // App.svelte shows the selected settings, so it opens first.
  let selected = $state('App.svelte');
  const current = $derived(files.find((file) => file.name === selected) ?? files[0]);
</script>

<section class="doc-source" aria-labelledby="{id}-title">
  <div class="doc-source-header">
    <h2 id="{id}-title">Source</h2>
    <div class="doc-control">
      <label for="{id}-file">Source file</label>
      <select
        id="{id}-file"
        value={current.name}
        onchange={(e) => (selected = e.currentTarget.value)}
      >
        {#each files as file (file.name)}
          <option value={file.name}>{file.name}</option>
        {/each}
      </select>
    </div>
  </div>
  <CodeBlock file={current} collapsible={current.code.split('\n').length > 12} />
</section>

<style>
  .doc-source {
    margin-top: 16px;
  }

  .doc-source-header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
  }

  h2 {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--portal-muted);
  }
</style>
