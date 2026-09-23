<script lang="ts">
  import { Avatar } from 'bits-ui';
  let {
    src,
    alt,
    fallback,
    size = 40,
  }: { src?: string; alt: string; fallback?: string; size?: number } = $props();
  let initials = $derived(
    fallback ??
      alt
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join(''),
  );
</script>

<Avatar.Root class="p-avatar" style={`--avatar-size:${size}px`}>
  {#if src}<Avatar.Image {src} {alt} class="p-avatar-image" />{/if}
  <Avatar.Fallback class="p-avatar-fallback" role="img" aria-label={alt}>{initials}</Avatar.Fallback
  >
</Avatar.Root>
