<script lang="ts">
  import { componentDocs, componentGroups } from '../../demo/catalog';
  import { galleryHref } from '../../demo/paths';
</script>

<article class="doc-article">
  <h1>Components</h1>
  <p class="doc-lede">
    Typed Svelte 5 components, with Bits UI doing the heavy lifting. Each page keeps a live example
    and the props that matter.
  </p>
  <div class="doc-index">
    {#each componentGroups as group (group)}
      <section aria-labelledby={`group-${group.toLowerCase()}`}>
        <h2 id={`group-${group.toLowerCase()}`}>{group}</h2>
        <ul>
          {#each componentDocs.filter((item) => item.group === group) as item (item.slug)}
            <li>
              <a href={galleryHref(`/components/${item.slug}`)}>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </a>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>
</article>
