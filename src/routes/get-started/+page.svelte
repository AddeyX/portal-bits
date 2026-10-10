<script lang="ts">
  import { Button, Select } from '$lib';
  import CodeBlock from '../../demo/docs/CodeBlock.svelte';
  import PreviewStage from '../../demo/docs/PreviewStage.svelte';
  import InlineText from '../../demo/docs/InlineText.svelte';
  import { guideIntros, guidePage, guideSection } from '../../demo/docs/guides';
  import { installCommands } from '../../demo/docs/install';
  import { layoutSample, pageSample } from '../../demo/get-started-sample';
  import { galleryHref } from '../../demo/paths';
  import type { SourceFile } from '../../demo/docs/types';

  const page = guidePage('/get-started');
  const intro = guideIntros['/get-started'] ?? [];
  const installation = guideSection('/get-started', 'installation');
  const basicUsage = guideSection('/get-started', 'basic-usage');
  const styles = guideSection('/get-started', 'styles');
  const typescript = guideSection('/get-started', 'typescript');

  type Manager = keyof typeof installCommands;
  const managers = Object.keys(installCommands) as Manager[];
  let manager = $state<Manager>('npm');

  const command = $derived<SourceFile>({
    name: 'Terminal',
    language: 'bash',
    code: installCommands[manager],
  });

  const layoutFile: SourceFile = {
    name: '+layout.svelte',
    language: 'svelte',
    code: layoutSample,
  };

  const pageFile: SourceFile = {
    name: '+page.svelte',
    language: 'svelte',
    code: pageSample,
  };
</script>

<article class="doc-article doc-guide">
  <h1>{page.title}</h1>
  <p class="doc-lede">{page.description}</p>
  {#each intro as paragraph (paragraph)}
    <p><InlineText text={paragraph} /></p>
  {/each}
  <h2 id={installation.id}>{installation.title}</h2>
  {#each installation.paragraphs as paragraph (paragraph)}
    <p><InlineText text={paragraph} /></p>
  {/each}
  <div class="doc-manager">
    <Select
      label="Package manager"
      options={managers.map((value) => ({ value, label: value }))}
      bind:value={() => manager, (next) => (manager = next as Manager)}
    />
  </div>
  <CodeBlock file={command} />
  <h2 id={basicUsage.id}>{basicUsage.title}</h2>
  {#each basicUsage.paragraphs as paragraph (paragraph)}
    <p><InlineText text={paragraph} /></p>
  {/each}
  <div class="doc-preview">
    <PreviewStage label="Button preview">
      <Button variant="primary">Save changes</Button>
    </PreviewStage>
  </div>
  <CodeBlock file={pageFile} />
  <h2 id={styles.id}>{styles.title}</h2>
  {#each styles.paragraphs as paragraph (paragraph)}
    <p><InlineText text={paragraph} /></p>
  {/each}
  <CodeBlock file={layoutFile} />
  <h2 id={typescript.id}>{typescript.title}</h2>
  {#each typescript.paragraphs as paragraph (paragraph)}
    <p><InlineText text={paragraph} /></p>
  {/each}
  <h2>Next steps</h2>
  <ul>
    <li><a href={galleryHref('/components')}>Browse the components</a></li>
    <li><a href={galleryHref('/foundations')}>Read the foundations</a></li>
    <li><a href={galleryHref('/motion')}>Read the motion notes</a></li>
  </ul>
</article>

<style>
  .doc-manager {
    max-width: 240px;
    margin-top: 16px;
  }
</style>
