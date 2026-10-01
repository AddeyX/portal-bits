<script lang="ts">
  import Preview from './Preview.svelte';
  import ApiTable from '../../../demo/docs/ApiTable.svelte';
  import { componentDocs } from '../../../demo/catalog';
  import { bitsUiDocs, referenceFor } from '../../../demo/docs/reference';
  import { galleryHref } from '../../../demo/paths';
  let { data } = $props();

  const reference = $derived(referenceFor(data.entry.slug));
  const bits = $derived(bitsUiDocs[data.entry.slug]);
  const related = $derived(
    reference.related.flatMap((slug) => componentDocs.find((item) => item.slug === slug) ?? []),
  );
</script>

<article class="doc-article">
  <h1>{data.entry.title}</h1>
  <p class="doc-lede">{data.entry.description}</p>
  {#key data.entry.slug}
    <Preview slug={data.entry.slug} />
  {/key}

  <section id="api-reference" class="api-reference" aria-labelledby="api-reference-title">
    <h2 id="api-reference-title">API reference</h2>
    <p>
      These tables list the props and snippets that {data.entry.title} declares. Attributes passed through
      to an element or primitive are listed under Forwarded attributes, not here.
    </p>

    <h3>Props</h3>
    <ApiTable label="{data.entry.title} props" rows={reference.props} />

    {#if reference.snippets.length}
      <h3>Snippets</h3>
      <ApiTable label="{data.entry.title} snippets" rows={reference.snippets} />
    {/if}

    <h3>Forwarded attributes</h3>
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

    <h3>Limits</h3>
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
</article>

<style>
  .api-reference {
    margin-top: 48px;
  }

  h2 {
    margin: 0 0 8px;
    font-size: 24px;
    line-height: 32px;
    font-weight: 500;
    letter-spacing: -0.4px;
  }

  h3 {
    margin: 32px 0 8px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }

  p,
  li {
    font-size: 15px;
    line-height: 24px;
    overflow-wrap: anywhere;
  }

  p {
    margin: 0 0 8px;
  }

  ul {
    margin: 0;
    padding-left: 1.2em;
  }

  li + li {
    margin-top: 6px;
  }

  a {
    color: inherit;
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
