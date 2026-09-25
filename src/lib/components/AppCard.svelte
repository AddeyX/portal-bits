<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Heart, ArrowUpRight } from '@lucide/svelte';
  import Toggle from './Toggle.svelte';
  import Badge from './Badge.svelte';
  import Button from './Button.svelte';
  import Avatar from './Avatar.svelte';
  let {
    title,
    category,
    description,
    image,
    imageAlt = '',
    favorite = $bindable(false),
    spotlight = false,
    href,
    action,
    children,
  }: {
    title: string;
    category: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    favorite?: boolean;
    spotlight?: boolean;
    href?: string;
    action?: Snippet;
    children?: Snippet;
  } = $props();
  let failedSrc = $state('');
</script>

<article class={`p-app-card ${spotlight ? 'p-app-card--spotlight' : ''}`}>
  {#if image && failedSrc !== image}<img
      class="p-app-cover"
      src={image}
      alt={imageAlt}
      onerror={() => (failedSrc = image)}
    />{:else}<div class="p-app-fallback" aria-hidden="true">{title.slice(0, 1)}</div>{/if}
  <div class="p-app-card-top">
    {#if spotlight}<Badge variant="spotlight">Featured</Badge>{:else}<Badge>{category}</Badge
      >{/if}<Toggle label={`Favorite ${title}`} bind:pressed={favorite} class="p-favorite"
      ><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></Toggle
    >
  </div>
  <div class="p-app-card-info">
    <Avatar alt={title} size={42} decorative />
    <div class="p-app-card-copy">
      <h3>{title}</h3>
      <p>{category}</p>
    </div>
    {#if action}{@render action()}{:else if href}<Button
        {href}
        size={32}
        aria-label={`Explore ${title}`}><ArrowUpRight size={16} /></Button
      >{/if}
  </div>
  {#if description && !spotlight}<p class="p-app-card-description">
      {description}
    </p>{/if}{@render children?.()}
</article>
