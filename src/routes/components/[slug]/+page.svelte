<script lang="ts">
  import Preview from './Preview.svelte';
  import ApiTable from '../../../demo/docs/ApiTable.svelte';
  import DocToc from '../../../demo/docs/DocToc.svelte';
  import { componentDocs } from '../../../demo/catalog';
  import { bitsUiDocs, referenceFor } from '../../../demo/docs/reference';
  import { galleryHref } from '../../../demo/paths';
  let { data } = $props();

  const reference = $derived(referenceFor(data.entry.slug));
  const bits = $derived(bitsUiDocs[data.entry.slug]);
  const index = $derived(componentDocs.findIndex((item) => item.slug === data.entry.slug));
  const previous = $derived(index > 0 ? componentDocs[index - 1] : undefined);
  const next = $derived(componentDocs[index + 1]);
  const toc = $derived([
    { id: 'preview', label: 'Preview', depth: 1 as const },
    { id: 'usage', label: 'Source', depth: 1 as const },
    { id: 'api-reference', label: 'API reference', depth: 1 as const },
    { id: 'api-props', label: 'Props', depth: 2 as const },
    ...(reference.snippets.length
      ? [{ id: 'api-snippets', label: 'Snippets', depth: 2 as const }]
      : []),
    { id: 'api-forwarded', label: 'Forwarded attributes', depth: 2 as const },
    { id: 'api-limits', label: 'Limits', depth: 2 as const },
  ]);
  const related = $derived(
    reference.related.flatMap((slug) => componentDocs.find((item) => item.slug === slug) ?? []),
  );
</script>

<article class="doc-article doc-article--toc">
  <h1>{data.entry.title}</h1>
  <p class="doc-lede">{data.entry.description}</p>
  <div id="preview">
    {#key data.entry.slug}
      <Preview slug={data.entry.slug} />
    {/key}
  </div>

  <section id="api-reference" class="api-reference" aria-labelledby="api-reference-title">
    <h2 id="api-reference-title">API reference</h2>
    <p>
      These tables list the props and snippets that {data.entry.title} declares. Attributes passed through
      to an element or primitive are listed under Forwarded attributes, not here.
    </p>

    <h3 id="api-props">Props</h3>
    <ApiTable label="{data.entry.title} props" rows={reference.props} />

    {#if reference.snippets.length}
      <h3 id="api-snippets">Snippets</h3>
      <ApiTable label="{data.entry.title} snippets" rows={reference.snippets} />
    {/if}

    <h3 id="api-forwarded">Forwarded attributes</h3>
    {#if reference.forwards.length}
      <ul>
        {#each reference.forwards as line (line)}<li>{line}</li>{/each}
      </ul>
    {:else}
      <p>None. {data.entry.title} forwards no attributes.</p>
    {/if}
    {#if bits}
      <p>
        The primitive underneath is a Bits UI peer dependency. Its own options are documented in the
        <a href={bits.href}>Bits UI {bits.name} documentation</a>. Only the props listed on this
        page are part of the {data.entry.title} contract. No data attributes are documented as stable.
      </p>
    {:else}
      <p>No data attributes are documented as stable.</p>
    {/if}

    <h3 id="api-limits">Limits</h3>
    <ul>
      {#each reference.limitations as line (line)}<li>{line}</li>{/each}
    </ul>

    {#if related.length}
      <h3>Related</h3>
      <ul class="api-related">
        {#each related as item (item.slug)}
          <li><a href={galleryHref(`/components/${item.slug}`)}>{item.title}</a></li>
        {/each}
      </ul>
    {/if}
  </section>

  {#if previous || next}
    <nav class="doc-pager" aria-label="Previous and next components">
      {#if previous}
        <a href={galleryHref(`/components/${previous.slug}`)} rel="prev">
          <span>Previous</span>
          <strong>{previous.title}</strong>
        </a>
      {/if}
      {#if next}
        <a href={galleryHref(`/components/${next.slug}`)} rel="next" class="doc-pager-next">
          <span>Next</span>
          <strong>{next.title}</strong>
        </a>
      {/if}
    </nav>
  {/if}

  {#key data.entry.slug}<DocToc items={toc} />{/key}
</article>

<style>
  .api-reference {
    margin-top: 48px;
  }

  .api-reference h2 {
    margin: 0 0 8px;
    font-size: 24px;
    line-height: 32px;
    font-weight: 500;
    letter-spacing: -0.4px;
  }

  .api-reference h3 {
    margin: 32px 0 8px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }

  .api-reference p,
  .api-reference li {
    font-size: 15px;
    line-height: 24px;
    overflow-wrap: anywhere;
  }

  .api-reference p {
    margin: 0 0 8px;
  }

  .api-reference ul {
    margin: 0;
    padding-left: 1.2em;
  }

  .api-reference li + li {
    margin-top: 6px;
  }

  .api-reference a {
    color: inherit;
  }

  .doc-pager {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 64px;
    padding-top: 32px;
    border-top: 1px solid var(--portal-border);
  }

  .doc-pager a {
    display: grid;
    gap: 2px;
    min-width: 0;
    padding: 16px 20px;
    border-radius: 16px;
    background: var(--portal-surface);
    color: var(--portal-ink);
    text-decoration: none;
    box-shadow: 0 0 0 1px var(--portal-border);
    transition: box-shadow var(--portal-duration) var(--portal-ease);
  }

  .doc-pager a:hover {
    box-shadow:
      0 0 0 1px var(--portal-border),
      var(--portal-shadow-surface);
  }

  .doc-pager-next {
    grid-column: 2;
    text-align: right;
  }

  .doc-pager span {
    color: var(--portal-muted);
    font-size: 13px;
    line-height: 18px;
  }

  .doc-pager strong {
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .api-related {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 20px;
    padding-left: 0;
    list-style: none;
  }

  .api-related li + li {
    margin-top: 0;
  }
</style>
