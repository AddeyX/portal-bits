<script lang="ts">
  import { Avatar } from '$lib';
  let { size = 40, media = 'image' }: { size?: 32 | 40 | 56; media?: 'image' | 'broken' | 'none' } =
    $props();

  // A synthetic poster as inline SVG data. Pass your own image URL as `src` instead.
  const poster = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" fill="#c5d4f6"/><circle cx="80" cy="80" r="44" fill="none" stroke="#263864" stroke-width="4"/></svg>',
  )}`;
  const sources = {
    image: poster,
    // A path your app does not serve, so the fallback initials appear.
    broken: '/missing-avatar.png',
    none: undefined,
  };
</script>

{#key media}
  <Avatar alt="Orbit Studio" src={sources[media]} {size} />
{/key}
