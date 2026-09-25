<script lang="ts">
  import Preview from './Preview.svelte';
  let { data } = $props();
</script>

<article class="doc-article">
  <h1>{data.entry.title}</h1>
  <p class="doc-lede">{data.entry.description}</p>
  <Preview slug={data.entry.slug} />
</article>
