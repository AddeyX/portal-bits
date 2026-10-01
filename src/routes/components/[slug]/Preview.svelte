<script lang="ts">
  import { ArticleCard, Button, Carousel, Dialog, FeatureCard, Input, Popover } from '$lib';
  import { ArrowUpRight, Info, Search, SlidersHorizontal } from '@lucide/svelte';
  import PreviewStage from '../../../demo/docs/PreviewStage.svelte';
  import PreviewControls from '../../../demo/docs/PreviewControls.svelte';
  import ExampleSource from '../../../demo/docs/ExampleSource.svelte';
  import FloatingNavExample from '../../../demo/examples/FloatingNavExample.svelte';
  import { componentDocs } from '../../../demo/catalog';
  import { examples, getExampleFiles, getExampleProps } from '../../../demo/examples/registry';
  import {
    variations,
    initialSettings,
    type Variation,
    type VariationSlug,
  } from '../../../demo/docs/variations';
  import { galleryAsset, galleryHref } from '../../../demo/paths';
  let { slug }: { slug: string } = $props();

  // These specimens use the full width of the stage.
  const wideStages = ['carousel', 'section-header', 'row-list', 'row', 'top-bar', 'floating-nav'];

  const key = $derived(slug as VariationSlug);
  const doc = $derived(componentDocs.find((item) => item.slug === slug));
  const entry = $derived(examples[slug]);
  const variation = $derived<Variation>(variations[key]);
  let settings = $state(initialSettings());
  const exampleProps = $derived(getExampleProps(slug, settings[key]));
  const files = $derived(getExampleFiles(slug, settings[key]));
  const unavailable = $derived(variation.unavailable?.(settings[key]) ?? {});

  let query = $state('');
  const stories = [
    {
      id: 'field',
      label: 'A field guide to small ideas',
      image: galleryAsset('/art/field.svg'),
      href: galleryHref('/components/article-card'),
    },
    {
      id: 'orbit',
      label: 'Make space for your next project',
      image: galleryAsset('/art/orbit.svg'),
      href: galleryHref('/components/article-card'),
    },
    {
      id: 'tempo',
      label: 'Find a rhythm that works',
      image: galleryAsset('/art/tempo.svg'),
      href: galleryHref('/components/article-card'),
    },
  ];
  const features = [
    {
      title: 'Start with a spark',
      description: 'Collect the little ideas worth returning to.',
      image: galleryAsset('/art/forma.svg'),
    },
    {
      title: 'Room to explore',
      description: 'Give each direction the space it needs to grow.',
      image: galleryAsset('/art/common.svg'),
    },
    {
      title: 'Bring it together',
      description: 'Turn a few good pieces into something you can share.',
      image: galleryAsset('/art/gather.svg'),
    },
  ];
</script>

{#if doc && entry}
  <div class="doc-preview">
    <PreviewStage
      label="{doc.title} preview"
      layout={wideStages.includes(slug) ? 'wide' : 'center'}
    >
      {#if !entry.fullPage}
        <entry.component {...exampleProps} />
      {:else if slug === 'portal-shell'}
        <p class="panel-copy">
          The shell is the application frame. Open it on its own so the sidebar, toolbar, and mobile
          navigation can use the viewport.
        </p>
        <Button href={galleryHref('/shell')} variant="primary">Open the shell</Button>
      {:else if slug === 'mobile-nav'}
        <p class="panel-copy">
          Mobile navigation is fixed to the bottom of the shell below 767px. The shell preview shows
          it when the viewport is narrow.
        </p>
        <Button href={galleryHref('/shell')}>Open the shell</Button>
      {:else}
        <p class="panel-copy">
          AuthFrame has no application navigation. Preview the compact panel or the wider reading
          layout.
        </p>
        <div class="demo-row">
          <Button href={galleryHref('/auth-preview')}>Open the compact layout</Button>
          <Button href={galleryHref('/auth-preview?size=reading')}>Open the reading layout</Button>
        </div>
      {/if}
    </PreviewStage>
    <PreviewControls controls={variation.controls} bind:settings={settings[key]} {unavailable} />
  </div>

  {#if slug === 'button'}
    <details class="doc-more">
      <summary>More examples</summary>
      <section class="doc-example" aria-labelledby="example-link-button">
        <h3 id="example-link-button">Link button</h3>
        <p class="panel-copy">Pass <code>href</code> to navigate. Quiet never takes a link.</p>
        <div class="doc-example-stage">
          <Button variant="green" href={galleryHref('/get-started')}
            >Get started <ArrowUpRight size={15} /></Button
          >
        </div>
      </section>
    </details>
  {:else if slug === 'input'}
    <details class="doc-more">
      <summary>More examples</summary>
      <section class="doc-example" aria-labelledby="example-input-icon">
        <h3 id="example-input-icon">Labeled field with an icon</h3>
        <div class="doc-example-stage">
          <div class="demo-field">
            <Input label="Search components" placeholder="Button, Dialog…" bind:value={query}>
              {#snippet icon()}<Search size={16} />{/snippet}
            </Input>
          </div>
        </div>
      </section>
    </details>
  {:else if slug === 'dialog'}
    <details class="doc-more">
      <summary>More examples</summary>
      <section class="doc-example" aria-labelledby="example-dialog-icon">
        <h3 id="example-dialog-icon">Icon trigger</h3>
        <p class="panel-copy">
          An icon-only trigger takes its name from <code>triggerLabel</code>.
        </p>
        <div class="doc-example-stage">
          <Dialog
            title="About this demo"
            triggerLabel="About this demo"
            triggerClass="p-button p-icon-button p-button--secondary p-button--40"
          >
            {#snippet trigger()}<Info size={17} />{/snippet}
            <p class="panel-copy">Every value here is synthetic and stays in your browser.</p>
          </Dialog>
        </div>
      </section>
    </details>
  {:else if slug === 'popover'}
    <details class="doc-more">
      <summary>More examples</summary>
      <section class="doc-example" aria-labelledby="example-popover-icon">
        <h3 id="example-popover-icon">Icon trigger</h3>
        <p class="panel-copy">The default trigger is an icon button named by <code>label</code>.</p>
        <div class="doc-example-stage">
          <Popover label="Quick filters">
            {#snippet trigger()}<SlidersHorizontal size={15} />{/snippet}
            <p class="panel-copy">Your panel content.</p>
          </Popover>
        </div>
      </section>
    </details>
  {:else if slug === 'feature-card'}
    <details class="doc-more">
      <summary>More examples</summary>
      <section class="doc-example" aria-labelledby="example-feature-grid">
        <h3 id="example-feature-grid">Three features in a grid</h3>
        <div class="doc-example-stage" data-layout="wide">
          <div class="feature-demo-grid">
            {#each features as feature (feature.title)}
              <FeatureCard {...feature} imageAlt="Colorful geometric illustration" />
            {/each}
          </div>
        </div>
      </section>
    </details>
  {:else if slug === 'carousel'}
    <details class="doc-more">
      <summary>More examples</summary>
      <section class="doc-example" aria-labelledby="example-carousel-one">
        <h3 id="example-carousel-one">One item</h3>
        <div class="doc-example-stage" data-layout="wide">
          <Carousel label="Single story" items={stories.slice(0, 1)}>
            {#snippet item(story)}
              <ArticleCard
                title={story.label}
                href={story.href}
                image={story.image}
                imageAlt="Geometric illustration"
              />
            {/snippet}
          </Carousel>
        </div>
      </section>
    </details>
  {:else if slug === 'floating-nav'}
    <details class="doc-more">
      <summary>More examples</summary>
      <section class="doc-example" aria-labelledby="example-floating-menu">
        <h3 id="example-floating-menu">Narrow width with Menu</h3>
        <p class="panel-copy">Below 640px of component width, Menu opens the same links.</p>
        <div class="doc-example-stage">
          <div class="doc-narrow-frame">
            <FloatingNavExample actions={false} />
          </div>
        </div>
      </section>
    </details>
  {/if}

  <ExampleSource {files} />

  <p class="api-line">
    {#if slug === 'button'}
      <code>variant</code> primary | secondary | green | quiet · <code>size</code> 32 | 40 | 48 · Native
      button and link props are forwarded. Quiet stays inline; size does not apply.
    {:else if slug === 'icon-button'}
      An accessible name is required. Size and variant follow Button where they apply. Quiet is
      inline text, so it is not offered here.
    {:else if slug === 'input'}
      Required <code>label</code>, visible unless <code>hideLabel</code> · Bindable
      <code>value</code> · <code>invalid</code> · Optional icon snippet · Native input props.
    {:else if slug === 'select'}
      Visible <code>label</code>, bindable string <code>value</code>, and <code>options</code>.
      Styling is an adaptation of Input.
    {:else if slug === 'checkbox'}
      Bindable boolean. The label snippet is required. Links inside the label stay usable, even when
      the checkbox is disabled.
    {:else if slug === 'toggle'}
      Bindable <code>pressed</code> state and a required accessible name.
    {:else if slug === 'toggle-group'}
      Single selection supports deselection. Arrow keys move focus. Space selects. Compact shows
      only icons, so give each item an icon; its label stays the accessible name.
    {:else if slug === 'switch'}
      Bindable <code>checked</code> state, a label, and disabled.
    {:else if slug === 'avatar'}
      Required <code>alt</code>. Missing or failed media uses the fallback.
    {:else if slug === 'badge'}
      Variants: neutral, spotlight, success. The badge is not a control.
    {:else if slug === 'dialog'}
      Bindable <code>open</code>, a title, and trigger plus children snippets.
    {:else if slug === 'popover'}
      Bindable <code>open</code>, trigger and children snippets, plus side, align, and offset.
    {:else if slug === 'tooltip'}
      Required text and a children snippet. The trigger is keyboard accessible.
    {:else if slug === 'app-card'}
      Image fallback, optional action snippet or link, favorite binding, and a spotlight variant.
      Spotlight replaces the category badge and hides the description.
    {:else if slug === 'article-card'}
      One native link. Missing media keeps the title and uses a placeholder.
    {:else if slug === 'feature-card'}
      Media, heading, and description. The card itself is not a control.
    {:else if slug === 'carousel'}
      Focus the viewport to use arrow keys, Home, or End. Navigation is immediate, including with
      reduced motion. Responsive layout is an adaptation.
    {:else if slug === 'section-header'}
      Heading, optional description, and an optional action snippet.
    {:else if slug === 'empty-state'}
      Title, description, and optional icon and action snippets.
    {:else if slug === 'alert'}
      A message string or short inline children. Mount it when the action fails.
    {:else if slug === 'row-list'}
      An unordered list. Sorting and pagination stay with the consumer. This layout is an
      adaptation.
    {:else if slug === 'row'}
      Place Row inside RowList. Cells wrap, and the hairline stays under the whole row.
    {:else if slug === 'portal-shell'}
      Snippets: brand, summary, footer, topbar, children. The consumer supplies the active URL. The
      source shows the whole shell; the gallery links to it because it needs the full viewport.
    {:else if slug === 'sidebar-nav'}
      <code>NavItem</code>: href, label, optional icon, optional count.
    {:else if slug === 'mobile-nav'}
      Same items as the sidebar. The narrow breakpoint is an adaptation.
    {:else if slug === 'top-bar'}
      Optional breadcrumb and an actions snippet for search, notices, and account controls.
    {:else if slug === 'auth-frame'}
      Required brand link and children. <code>size</code> is compact or reading. Both are adaptations.
    {:else if slug === 'floating-nav'}
      Required <code>label</code>, <code>brand</code>, and <code>items</code> snippets. Optional
      <code>actions</code>. Below 640px of component width, Menu opens the same links in a panel.
      That threshold, the selected-link fill, Escape, and outside dismissal are adaptations.
    {:else if slug === 'color-selector'}
      Five presets, a gradient, and hex input. Preset dimensions are an adaptation. Reduced motion
      still reaches the chosen color.
    {/if}
  </p>
{:else}
  <p class="panel-copy">This component does not have a preview yet.</p>
{/if}

<style>
  .doc-narrow-frame {
    width: min(100%, 360px);
  }
  .feature-demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
    gap: 24px;
  }
</style>
