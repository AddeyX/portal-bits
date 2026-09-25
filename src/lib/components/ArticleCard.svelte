<script lang="ts">
  import Button from './Button.svelte';
  let {
    title,
    href,
    image,
    imageAlt = '',
    actionLabel = 'Read',
    headingLevel = 3,
  }: {
    title: string;
    href: string;
    image?: string;
    imageAlt?: string;
    actionLabel?: string;
    headingLevel?: 2 | 3 | 4;
  } = $props();
  let failedSrc = $state('');
</script>

<article class="p-article-card">
  <div class="p-article-media">
    {#if image && image !== failedSrc}
      <img src={image} alt={imageAlt} loading="lazy" onerror={() => (failedSrc = image ?? '')} />
    {:else}<div class="p-article-placeholder" aria-hidden="true"></div>{/if}
  </div>
  <svelte:element this={`h${headingLevel}`} class="p-article-title">{title}</svelte:element>
  <div class="p-article-action">
    <Button {href} size={32} variant="primary" aria-label={`${actionLabel} ${title}`}
      >{actionLabel}<span aria-hidden="true">↗</span></Button
    >
  </div>
</article>

<style>
  .p-article-card {
    min-width: 0;
    height: 100%;
    color: var(--portal-ink);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--portal-space-4);
  }
  .p-article-media {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 32px;
    background: var(--portal-soft);
  }
  img,
  .p-article-placeholder {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .p-article-placeholder {
    background: linear-gradient(135deg, var(--portal-soft), var(--portal-border));
  }
  .p-article-title {
    margin: 0;
    font-size: 24px;
    line-height: 28px;
    font-weight: 400;
    letter-spacing: -0.24px;
    overflow-wrap: anywhere;
  }
  .p-article-action {
    margin-top: auto;
  }
</style>
