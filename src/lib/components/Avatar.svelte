<script lang="ts">
  import { Avatar } from 'bits-ui';
  let {
    src,
    alt,
    fallback,
    size = 40,
    decorative = false,
  }: {
    src?: string;
    alt: string;
    fallback?: string;
    size?: number;
    decorative?: boolean;
  } = $props();
  let initials = $derived(
    fallback ??
      alt
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join(''),
  );
</script>

<Avatar.Root
  class="p-avatar"
  style={`--avatar-size:${size}px`}
  aria-hidden={decorative || undefined}
>
  {#if src}<Avatar.Image {src} alt={decorative ? '' : alt} class="p-avatar-image" />{/if}
  <Avatar.Fallback
    class="p-avatar-fallback"
    role={decorative ? undefined : 'img'}
    aria-label={decorative ? undefined : alt}>{initials}</Avatar.Fallback
  >
</Avatar.Root>
