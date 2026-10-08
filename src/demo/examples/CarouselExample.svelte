<script lang="ts">
  import { ArticleCard, Carousel } from '$lib';
  let { layout = 'responsive' }: { layout?: 'responsive' | 'carousel' } = $props();

  // Synthetic posters as inline SVG data. Pass your own image URLs as `image` instead.
  function poster(word: string, background: string, ink: string) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400"><rect width="640" height="400" fill="${background}"/><circle cx="440" cy="170" r="120" fill="none" stroke="${ink}" stroke-width="2" opacity=".45"/><text x="32" y="178" fill="${ink}" font-family="Arial,sans-serif" font-size="66" font-weight="500">${word}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  const stories = [
    {
      id: 'field',
      label: 'A field guide to small ideas',
      image: poster('field', '#e6ddd0', '#776749'),
      href: '#field-guide',
    },
    {
      id: 'orbit',
      label: 'Make space for your next project',
      image: poster('ORBIT', '#c5d4f6', '#263864'),
      href: '#next-project',
    },
    {
      id: 'tempo',
      label: 'Find a rhythm that works',
      image: poster('tempo', '#ded5f0', '#614984'),
      href: '#rhythm',
    },
  ];
</script>

<Carousel label="Studio journal" items={stories} {layout}>
  {#snippet item(story)}
    <ArticleCard
      title={story.label}
      href={story.href}
      image={story.image}
      imageAlt="Geometric illustration"
    />
  {/snippet}
</Carousel>
