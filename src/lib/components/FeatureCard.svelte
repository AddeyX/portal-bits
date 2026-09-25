<script lang="ts">
  let {
    title,
    description,
    image,
    imageAlt = '',
    headingLevel = 3,
  }: {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    headingLevel?: 2 | 3 | 4;
  } = $props();
  let failedSrc = $state('');
</script>

<article class="p-feature-card">
  <div class="p-feature-media">
    {#if image && image !== failedSrc}
      <img src={image} alt={imageAlt} loading="lazy" onerror={() => (failedSrc = image ?? '')} />
    {:else}<div class="p-feature-placeholder" aria-hidden="true"></div>{/if}
  </div>
  <div class="p-feature-copy">
    <svelte:element this={`h${headingLevel}`} class="p-feature-title">{title}</svelte:element>
    <p>{description}</p>
  </div>
</article>

<style>
  .p-feature-card {
    min-width: 0;
    padding: var(--portal-space-6);
    border-radius: 32px;
    background: var(--portal-soft);
    color: var(--portal-ink);
    display: flex;
    flex-direction: column;
    gap: var(--portal-space-6);
  }
  .p-feature-media {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: var(--portal-radius);
    background: var(--portal-surface);
  }
  img,
  .p-feature-placeholder {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left;
  }
  .p-feature-placeholder {
    background: linear-gradient(135deg, var(--portal-surface), var(--portal-border));
  }
  .p-feature-copy {
    display: grid;
    gap: var(--portal-space-2);
    overflow-wrap: anywhere;
  }
  .p-feature-title {
    margin: 0;
    font-size: 24px;
    line-height: 32px;
    font-weight: 400;
    letter-spacing: -0.24px;
  }
  p {
    margin: 0;
    font-size: 16px;
    line-height: 24px;
    color: var(--portal-muted);
  }
</style>
