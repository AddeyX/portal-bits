<script lang="ts">
  import { AppCard } from '$lib';
  let {
    media = 'image',
    spotlight = false,
    action = false,
  }: { media?: 'image' | 'fallback'; spotlight?: boolean; action?: boolean } = $props();
  let favorite = $state(false);

  // A synthetic poster as inline SVG data. Pass your own image URL as `image` instead.
  const poster = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400"><rect width="640" height="400" fill="#c5d4f6"/><circle cx="370" cy="170" r="120" fill="none" stroke="#263864" stroke-width="2" opacity=".45"/><text x="32" y="178" fill="#263864" font-family="Arial,sans-serif" font-size="66" font-weight="500">ORBIT</text></svg>',
  )}`;
</script>

<div class="narrow">
  <AppCard
    title="Orbit Studio"
    category="Creative"
    description="Your next idea starts here."
    image={media === 'image' ? poster : undefined}
    imageAlt={media === 'image' ? 'Orbit geometric poster' : ''}
    {spotlight}
    href={action ? '#open-orbit' : undefined}
    bind:favorite
  />
</div>

<style>
  .narrow {
    max-width: 360px;
  }
</style>
