<script lang="ts">
  import { ArticleCard } from '$lib';
  let {
    media = 'image',
    actionLabel = 'Read',
  }: { media?: 'image' | 'fallback'; actionLabel?: 'Read' | 'Open' } = $props();

  // A synthetic poster as inline SVG data. Pass your own image URL as `image` instead.
  const poster = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400"><rect width="640" height="400" fill="#e6ddd0"/><circle cx="370" cy="170" r="120" fill="none" stroke="#776749" stroke-width="2" opacity=".45"/><text x="32" y="178" fill="#776749" font-family="Arial,sans-serif" font-size="66" font-weight="500">field</text></svg>',
  )}`;
</script>

<div class="narrow">
  <ArticleCard
    title="A field guide to small ideas"
    href="#field-guide"
    image={media === 'image' ? poster : undefined}
    imageAlt={media === 'image' ? 'Geometric illustration' : ''}
    {actionLabel}
  />
</div>

<style>
  .narrow {
    max-width: 360px;
  }
</style>
