<script lang="ts">
  import { FeatureCard } from '$lib';
  let { media = 'image' }: { media?: 'image' | 'fallback' } = $props();

  // A synthetic poster as inline SVG data. Pass your own image URL as `image` instead.
  const poster = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400"><rect width="640" height="400" fill="#d8ec86"/><circle cx="440" cy="30" r="135" fill="none" stroke="#244a31" stroke-width="38" opacity=".22"/><circle cx="440" cy="310" r="135" fill="none" stroke="#244a31" stroke-width="38" opacity=".22"/><text x="32" y="178" fill="#244a31" font-family="Arial,sans-serif" font-size="66" font-weight="500">common</text></svg>',
  )}`;
</script>

<div class="narrow">
  <FeatureCard
    title="Room to explore"
    description="Give each direction the space it needs to grow."
    image={media === 'image' ? poster : undefined}
    imageAlt={media === 'image' ? 'Colorful geometric illustration' : ''}
  />
</div>

<style>
  .narrow {
    max-width: 360px;
  }
</style>
