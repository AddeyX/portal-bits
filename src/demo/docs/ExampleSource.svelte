<script lang="ts">
  import CodeBlock from './CodeBlock.svelte';
  import type { SourceFile } from './types';

  let { files }: { files: SourceFile[] } = $props();

  const id = $props.id();
</script>

<section class="doc-source" aria-labelledby="{id}-title">
  <h2 id="{id}-title">Source</h2>
  <CodeBlock {files} />
</section>

<style>
  .doc-source {
    margin-top: 16px;
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
