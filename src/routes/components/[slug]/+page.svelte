<script lang="ts">
  import Preview from './Preview.svelte';
  let { data } = $props();
</script>

<article class="doc-article">
  <h1>{data.entry.title}</h1>
  <p class="doc-lede">{data.entry.description}</p>
  {#key data.entry.slug}
    <Preview slug={data.entry.slug} />
  {/key}
</article>
