<script lang="ts">
  import {
    ArticleCard,
    FeatureCard,
    Carousel,
    Alert,
    Checkbox,
    Select,
    RowList,
    Row,
    Button,
    IconButton,
    Badge,
    Avatar,
    Input,
    Toggle,
    ToggleGroup,
    Switch,
    Dialog,
    Popover,
    Tooltip,
    EmptyState,
    AppCard,
    SectionHeader,
    SidebarNav,
    TopBar,
    ColorSelector,
    FloatingNav,
  } from '$lib';
  import {
    ArrowUpRight,
    Heart,
    Search,
    Plus,
    SlidersHorizontal,
    Info,
    Check,
    Bell,
    LayoutGrid,
    Layers,
    Component,
  } from '@lucide/svelte';
  import PreviewStage from '../../../demo/docs/PreviewStage.svelte';
  import PreviewControls from '../../../demo/docs/PreviewControls.svelte';
  import {
    variations,
    initialSettings,
    pick,
    enabled,
    readButton,
    readIconButton,
    readField,
    readAvatar,
    readPopover,
    readTooltip,
    readMedia,
    readContent,
    badgeVariants,
    badgeText,
    articleActions,
    carouselLayouts,
  } from '../../../demo/docs/variations';
  import { resolve } from '$app/paths';
  import { galleryAsset, galleryHref } from '../../../demo/paths';
  let { slug }: { slug: string } = $props();
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
  let settings = $state(initialSettings());
  const button = $derived(readButton(settings.button));
  const iconButton = $derived(readIconButton(settings['icon-button']));
  const input = $derived(readField(settings.input));
  const select = $derived(readField(settings.select));
  const checkbox = $derived(readField(settings.checkbox));
  const avatar = $derived(readAvatar(settings.avatar));
  const popover = $derived(readPopover(settings.popover));
  let activations = $state(0);
  let added = $state(false);
  let consent = $state(false);
  let category = $state('');
  let pressed = $state(false);
  let checked = $state(true);
  let selected = $state('all');
  let value = $state('');
  let query = $state('');
  let name = $state('Alex Morgan');
  let saved = $state(false);
  let dialogOpen = $state(false);
  let favorite = $state(false);
  let formError = $state('');
  let accent = $state('#19e783');
  let alertMessage = $state('');
  function activate() {
    if (!button.disabled) activations++;
  }
  function save() {
    if (!name.trim()) {
      formError = 'Enter a display name.';
      return;
    }
    formError = '';
    saved = true;
    dialogOpen = false;
  }
  const avatarSources = {
    image: galleryAsset('/art/orbit.svg'),
    broken: galleryAsset('/art/missing.svg'),
    none: undefined,
  };
  const nav = [
    { href: galleryHref('/shell'), label: 'Overview', icon: LayoutGrid },
    { href: galleryHref('/foundations'), label: 'Foundations', icon: Layers },
    { href: galleryHref('/components'), label: 'Components', icon: Component, count: '29' },
  ];
</script>

{#snippet featuredBadge()}<Badge variant="spotlight">Featured</Badge>{/snippet}
{#snippet heartIcon()}<Heart size={24} />{/snippet}
{#snippet gridIcon()}<LayoutGrid size={16} />{/snippet}
{#snippet componentIcon()}<Component size={16} />{/snippet}
{#snippet layersIcon()}<Layers size={16} />{/snippet}
{#snippet browseAction()}
  <Button variant="green" href={galleryHref('/components')}>Browse components</Button>
{/snippet}
{#snippet alertsAction()}<Button size={32}><Bell size={15} /> Alerts</Button>{/snippet}
{#snippet navBrand()}<a href={resolve('/')}>Home</a>{/snippet}
{#snippet navItems()}<a href={resolve('/get-started')} aria-current="page">Docs</a>{/snippet}
{#snippet navActions()}<a href="https://github.com/AddeyX/portal-bits">GitHub</a>{/snippet}

{#if slug === 'button'}
  <div class="doc-preview">
    <PreviewStage label="Button preview">
      <div class="demo-stack">
        {#if button.variant === 'quiet'}
          <Button variant="quiet" disabled={button.disabled} onclick={activate}
            >{#if button.icon}<Check size={15} />{/if}Save changes</Button
          >
        {:else}
          <Button
            variant={button.variant}
            size={button.size}
            disabled={button.disabled}
            onclick={activate}
            >{#if button.icon}<Check size={15} />{/if}Save changes</Button
          >
        {/if}
        <p class="demo-status" role="status">
          {activations === 0
            ? 'Not activated yet'
            : `Activated ${activations} ${activations === 1 ? 'time' : 'times'}`}
        </p>
      </div>
    </PreviewStage>
    <PreviewControls
      controls={variations.button.controls}
      bind:settings={settings.button}
      unavailable={variations.button.unavailable(settings.button)}
    />
  </div>
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
  <pre>{variations.button.code(settings.button)}</pre>
  <p class="api-line">
    <code>variant</code> primary | secondary | green | quiet · <code>size</code> 32 | 40 | 48 · Native
    button and link props are forwarded. Quiet stays inline; size does not apply.
  </p>
{:else if slug === 'icon-button'}
  <div class="doc-preview">
    <PreviewStage label="IconButton preview">
      <div class="demo-stack">
        <IconButton
          label="Add item"
          variant={iconButton.variant}
          size={iconButton.size}
          disabled={iconButton.disabled}
          onclick={() => (added = !added)}
          ><Plus size={iconButton.size === 32 ? 16 : 18} /></IconButton
        >
        <p class="demo-status" role="status">{added ? 'Added' : 'Ready'}</p>
      </div>
    </PreviewStage>
    <PreviewControls
      controls={variations['icon-button'].controls}
      bind:settings={settings['icon-button']}
    />
  </div>
  <pre>{variations['icon-button'].code(settings['icon-button'])}</pre>
  <p class="api-line">
    An accessible name is required. Size and variant follow Button where they apply. Quiet is inline
    text, so it is not offered here.
  </p>
{:else if slug === 'input'}
  <div class="doc-preview">
    <PreviewStage label="Input preview">
      <div class="demo-field">
        <Input
          label="Email"
          type="email"
          placeholder="alex@example.com"
          bind:value
          invalid={input.invalid}
          required={input.required}
          disabled={input.disabled}
          aria-describedby={input.invalid ? 'email-error' : undefined}
        />
        {#if input.invalid}
          <p id="email-error" class="demo-error">
            Enter an email address, such as alex@example.com.
          </p>
        {/if}
        <p aria-live="polite">
          {value ? `Bound value: “${value}”` : 'Type to try the bound value.'}
        </p>
      </div>
    </PreviewStage>
    <PreviewControls controls={variations.input.controls} bind:settings={settings.input} />
  </div>
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
  <pre>{variations.input.code(settings.input)}</pre>
  <p class="api-line">
    Required <code>label</code>, visible unless <code>hideLabel</code> · Bindable <code>value</code>
    ·
    <code>invalid</code> · Optional icon snippet · Native input props.
  </p>
{:else if slug === 'select'}
  <div class="doc-preview">
    <PreviewStage label="Select preview">
      <div class="demo-field">
        <Select
          label="Record category"
          bind:value={category}
          placeholder="Choose a category"
          invalid={select.invalid}
          required={select.required}
          disabled={select.disabled}
          aria-describedby={select.invalid ? 'category-error' : undefined}
          options={[
            { value: 'notes', label: 'Notes' },
            { value: 'drafts', label: 'Drafts' },
            { value: 'archived', label: 'Archived', disabled: true },
          ]}
        />
        {#if select.invalid}<p id="category-error" class="demo-error">Choose a category.</p>{/if}
        <p aria-live="polite">{category || 'No category'}</p>
      </div>
    </PreviewStage>
    <PreviewControls controls={variations.select.controls} bind:settings={settings.select} />
  </div>
  <pre>{variations.select.code(settings.select)}</pre>
  <p class="api-line">
    Visible <code>label</code>, bindable string <code>value</code>, and <code>options</code>.
    Styling is an adaptation of Input.
  </p>
{:else if slug === 'checkbox'}
  <div class="doc-preview">
    <PreviewStage label="Checkbox preview">
      <div class="demo-field">
        <Checkbox
          bind:checked={consent}
          invalid={checkbox.invalid}
          required={checkbox.required}
          disabled={checkbox.disabled}
          aria-describedby={checkbox.invalid ? 'terms-error' : undefined}
        >
          {#snippet label()}I agree to the <a href={resolve('/auth-preview')}>demo terms</a
            >.{/snippet}
        </Checkbox>
        {#if checkbox.invalid}
          <p id="terms-error" class="demo-error">Agree to the demo terms to continue.</p>
        {/if}
        <p aria-live="polite">{consent ? 'Agreed' : 'Not agreed'}</p>
      </div>
    </PreviewStage>
    <PreviewControls controls={variations.checkbox.controls} bind:settings={settings.checkbox} />
  </div>
  <pre>{variations.checkbox.code(settings.checkbox)}</pre>
  <p class="api-line">
    Bindable boolean. The label snippet is required. Links inside the label stay usable, even when
    the checkbox is disabled.
  </p>
{:else if slug === 'toggle'}
  <div class="doc-preview">
    <PreviewStage label="Toggle preview">
      <div class="demo-row">
        <Toggle
          label="Favorite example"
          bind:pressed
          disabled={enabled(settings.toggle, 'disabled')}
        >
          <Heart size={17} fill={pressed ? 'currentColor' : 'none'} />
        </Toggle>
        <span>{pressed ? 'Added to favorites' : 'Save a favorite'}</span>
      </div>
    </PreviewStage>
    <PreviewControls controls={variations.toggle.controls} bind:settings={settings.toggle} />
  </div>
  <pre>{variations.toggle.code(settings.toggle)}</pre>
  <p class="api-line">Bindable <code>pressed</code> state and a required accessible name.</p>
{:else if slug === 'toggle-group'}
  <div class="doc-preview">
    <PreviewStage label="ToggleGroup preview">
      <ToggleGroup
        label="Example category"
        bind:value={selected}
        compact={enabled(settings['toggle-group'], 'compact')}
        disabled={enabled(settings['toggle-group'], 'disabled')}
        items={[
          { value: 'all', label: 'All', icon: gridIcon },
          { value: 'apps', label: 'Apps', icon: componentIcon },
          { value: 'collections', label: 'Collections', icon: layersIcon },
        ]}
      />
      <p aria-live="polite">{selected || 'Nothing selected'}</p>
    </PreviewStage>
    <PreviewControls
      controls={variations['toggle-group'].controls}
      bind:settings={settings['toggle-group']}
    />
  </div>
  <pre>{variations['toggle-group'].code(settings['toggle-group'])}</pre>
  <p class="api-line">
    Single selection supports deselection. Arrow keys move focus. Space selects. Compact shows only
    icons, so give each item an icon; its label stays the accessible name.
  </p>
{:else if slug === 'switch'}
  <div class="doc-preview">
    <PreviewStage label="Switch preview">
      <div class="demo-row">
        <Switch
          label="Enable notifications"
          bind:checked
          disabled={enabled(settings.switch, 'disabled')}
        />
        <span>Notifications {checked ? 'on' : 'off'}</span>
      </div>
    </PreviewStage>
    <PreviewControls controls={variations.switch.controls} bind:settings={settings.switch} />
  </div>
  <pre>{variations.switch.code(settings.switch)}</pre>
  <p class="api-line">Bindable <code>checked</code> state, a label, and disabled.</p>
{:else if slug === 'avatar'}
  <div class="doc-preview">
    <PreviewStage label="Avatar preview">
      {#key avatar.media}
        <Avatar alt="Orbit Studio" src={avatarSources[avatar.media]} size={avatar.size} />
      {/key}
    </PreviewStage>
    <PreviewControls controls={variations.avatar.controls} bind:settings={settings.avatar} />
  </div>
  <pre>{variations.avatar.code(settings.avatar)}</pre>
  <p class="api-line">Required <code>alt</code>. Missing or failed media uses the fallback.</p>
{:else if slug === 'badge'}
  {@const variant = pick(settings.badge, 'variant', badgeVariants, 'neutral')}
  <div class="doc-preview">
    <PreviewStage label="Badge preview">
      <Badge {variant}>{badgeText[variant]}</Badge>
    </PreviewStage>
    <PreviewControls controls={variations.badge.controls} bind:settings={settings.badge} />
  </div>
  <pre>{variations.badge.code(settings.badge)}</pre>
  <p class="api-line">Variants: neutral, spotlight, success. The badge is not a control.</p>
{:else if slug === 'dialog'}
  <div class="doc-preview">
    <PreviewStage label="Dialog preview">
      <Dialog
        title="Make yourself at home"
        description={enabled(settings.dialog, 'description')
          ? 'Edit your display name. This example stays in your browser.'
          : ''}
        bind:open={dialogOpen}
      >
        {#snippet trigger()}Edit profile <ArrowUpRight size={15} />{/snippet}
        <form
          onsubmit={(event) => {
            event.preventDefault();
            save();
          }}
        >
          <Input
            label="Display name"
            bind:value={name}
            invalid={!!formError}
            aria-describedby={formError ? 'name-error' : undefined}
          />
          {#if formError}<Alert id="name-error" message={formError} />{/if}
          <div class="detail-actions">
            <span class="panel-copy">Local demo only</span>
            <Button variant="green" type="submit">Save profile</Button>
          </div>
        </form>
      </Dialog>
      <p aria-live="polite">
        {saved ? `Profile saved as ${name}.` : 'Try Tab, Escape, and clicking outside.'}
      </p>
    </PreviewStage>
    <PreviewControls controls={variations.dialog.controls} bind:settings={settings.dialog} />
  </div>
  <details class="doc-more">
    <summary>More examples</summary>
    <section class="doc-example" aria-labelledby="example-dialog-icon">
      <h3 id="example-dialog-icon">Icon trigger</h3>
      <p class="panel-copy">An icon-only trigger takes its name from <code>triggerLabel</code>.</p>
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
  <pre>{variations.dialog.code(settings.dialog)}</pre>
  <p class="api-line">Bindable <code>open</code>, a title, and trigger plus children snippets.</p>
{:else if slug === 'popover'}
  <div class="doc-preview">
    <PreviewStage label="Popover preview">
      <Popover
        label="Filter settings"
        side={popover.side}
        align={popover.align}
        triggerClass="p-button p-button--secondary p-button--40"
      >
        {#snippet trigger()}<SlidersHorizontal size={15} /> Filters{/snippet}
        <h3 class="panel-title">A little more control</h3>
        <p class="panel-copy">Show notifications in your personal feed.</p>
        <div class="demo-row">
          <Switch label="Popover notifications" bind:checked />
          <span>Notifications</span>
        </div>
      </Popover>
    </PreviewStage>
    <PreviewControls controls={variations.popover.controls} bind:settings={settings.popover} />
  </div>
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
  <pre>{variations.popover.code(settings.popover)}</pre>
  <p class="api-line">
    Bindable <code>open</code>, trigger and children snippets, plus side, align, and offset.
  </p>
{:else if slug === 'tooltip'}
  <div class="doc-preview">
    <PreviewStage label="Tooltip preview">
      <div class="demo-row">
        <Tooltip text={readTooltip(settings.tooltip)}><Info size={17} /></Tooltip>
        <span>Focus the icon</span>
      </div>
    </PreviewStage>
    <PreviewControls controls={variations.tooltip.controls} bind:settings={settings.tooltip} />
  </div>
  <pre>{variations.tooltip.code(settings.tooltip)}</pre>
  <p class="api-line">Required text and a children snippet. The trigger is keyboard accessible.</p>
{:else if slug === 'app-card'}
  {@const image = readMedia(settings['app-card']) === 'image'}
  <div class="doc-preview">
    <PreviewStage label="AppCard preview">
      <div class="doc-narrow">
        <AppCard
          title="Orbit Studio"
          category="Creative"
          description="Your next idea starts here."
          image={image ? galleryAsset('/art/orbit.svg') : undefined}
          imageAlt={image ? 'Orbit geometric poster' : ''}
          spotlight={enabled(settings['app-card'], 'spotlight')}
          href={enabled(settings['app-card'], 'action') ? galleryHref('/shell') : undefined}
          bind:favorite
        />
      </div>
    </PreviewStage>
    <PreviewControls
      controls={variations['app-card'].controls}
      bind:settings={settings['app-card']}
    />
  </div>
  <pre>{variations['app-card'].code(settings['app-card'])}</pre>
  <p class="api-line">
    Image fallback, optional action snippet or link, favorite binding, and a spotlight variant.
    Spotlight replaces the category badge and hides the description.
  </p>
{:else if slug === 'article-card'}
  {@const image = readMedia(settings['article-card']) === 'image'}
  <div class="doc-preview">
    <PreviewStage label="ArticleCard preview">
      <div class="doc-narrow">
        <ArticleCard
          title="A field guide to small ideas"
          href={galleryHref('/components/carousel')}
          image={image ? galleryAsset('/art/field.svg') : undefined}
          imageAlt={image ? 'Geometric illustration' : ''}
          actionLabel={pick(settings['article-card'], 'actionLabel', articleActions, 'Read')}
        />
      </div>
    </PreviewStage>
    <PreviewControls
      controls={variations['article-card'].controls}
      bind:settings={settings['article-card']}
    />
  </div>
  <pre>{variations['article-card'].code(settings['article-card'])}</pre>
  <p class="api-line">One native link. Missing media keeps the title and uses a placeholder.</p>
{:else if slug === 'feature-card'}
  {@const image = readMedia(settings['feature-card']) === 'image'}
  <div class="doc-preview">
    <PreviewStage label="FeatureCard preview">
      <div class="doc-narrow">
        <FeatureCard
          title={features[1].title}
          description={features[1].description}
          image={image ? features[1].image : undefined}
          imageAlt={image ? 'Colorful geometric illustration' : ''}
        />
      </div>
    </PreviewStage>
    <PreviewControls
      controls={variations['feature-card'].controls}
      bind:settings={settings['feature-card']}
    />
  </div>
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
  <pre>{variations['feature-card'].code(settings['feature-card'])}</pre>
  <p class="api-line">Media, heading, and description. The card itself is not a control.</p>
{:else if slug === 'carousel'}
  {@const layout = pick(settings.carousel, 'layout', carouselLayouts, 'responsive')}
  <div class="doc-preview">
    <PreviewStage label="Carousel preview" layout="wide">
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
    </PreviewStage>
    <PreviewControls controls={variations.carousel.controls} bind:settings={settings.carousel} />
  </div>
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
  <pre>{variations.carousel.code(settings.carousel)}</pre>
  <p class="api-line">
    Focus the viewport to use arrow keys, Home, or End. Navigation is immediate, including with
    reduced motion. Responsive layout is an adaptation.
  </p>
{:else if slug === 'section-header'}
  <div class="doc-preview">
    <PreviewStage label="SectionHeader preview" layout="wide">
      <SectionHeader
        title="Your collection"
        description={enabled(settings['section-header'], 'description')
          ? 'Made for you.'
          : undefined}
        action={enabled(settings['section-header'], 'action') ? featuredBadge : undefined}
      />
    </PreviewStage>
    <PreviewControls
      controls={variations['section-header'].controls}
      bind:settings={settings['section-header']}
    />
  </div>
  <pre>{variations['section-header'].code(settings['section-header'])}</pre>
  <p class="api-line">Heading, optional description, and an optional action snippet.</p>
{:else if slug === 'empty-state'}
  <div class="doc-preview">
    <PreviewStage label="EmptyState preview">
      <EmptyState
        title="Nothing saved yet"
        description={enabled(settings['empty-state'], 'description')
          ? 'Your collection starts with a single favorite.'
          : undefined}
        icon={enabled(settings['empty-state'], 'icon') ? heartIcon : undefined}
        action={enabled(settings['empty-state'], 'action') ? browseAction : undefined}
      />
    </PreviewStage>
    <PreviewControls
      controls={variations['empty-state'].controls}
      bind:settings={settings['empty-state']}
    />
  </div>
  <pre>{variations['empty-state'].code(settings['empty-state'])}</pre>
  <p class="api-line">Title, description, and optional icon and action snippets.</p>
{:else if slug === 'alert'}
  <div class="doc-preview">
    <PreviewStage label="Alert preview">
      <div class="demo-field">
        <Button
          onclick={() => (alertMessage = alertMessage ? '' : 'Enter a display name before saving.')}
          >{alertMessage ? 'Clear alert' : 'Show alert'}</Button
        >
        {#if alertMessage}<Alert message={alertMessage} />{/if}
      </div>
    </PreviewStage>
  </div>
  <pre>{variations.alert.code(settings.alert)}</pre>
  <p class="api-line">A message string or short inline children. Mount it when the action fails.</p>
{:else if slug === 'row-list'}
  <div class="doc-preview">
    <PreviewStage label="RowList preview" layout="wide">
      <RowList aria-label="Example records">
        {#if readContent(settings['row-list']) === 'short'}
          <Row>
            <a href={resolve('/auth-preview')}>Field notes</a>
            <Badge>Draft</Badge>
            <Button variant="quiet" onclick={() => (saved = !saved)}
              >{saved ? 'Saved' : 'Save'}</Button
            >
          </Row>
        {:else}
          <Row>
            <span
              >A longer synthetic record wraps naturally when the available space is narrow.</span
            >
            <Badge>Draft</Badge>
          </Row>
        {/if}
        <Row><span>A single cell can explain this record.</span></Row>
      </RowList>
    </PreviewStage>
    <PreviewControls
      controls={variations['row-list'].controls}
      bind:settings={settings['row-list']}
    />
  </div>
  <pre>{variations['row-list'].code(settings['row-list'])}</pre>
  <p class="api-line">
    An unordered list. Sorting and pagination stay with the consumer. This layout is an adaptation.
  </p>
{:else if slug === 'row'}
  <div class="doc-preview">
    <PreviewStage label="Row preview" layout="wide">
      <RowList aria-label="Example record">
        <Row>
          {#if readContent(settings.row) === 'short'}
            <span>Field notes</span>
          {:else}
            <span
              >A longer synthetic record wraps naturally when the available space is narrow.</span
            >
          {/if}
          <Badge>Ready</Badge>
        </Row>
      </RowList>
    </PreviewStage>
    <PreviewControls controls={variations.row.controls} bind:settings={settings.row} />
  </div>
  <pre>{variations.row.code(settings.row)}</pre>
  <p class="api-line">
    Place Row inside RowList. Cells wrap, and the hairline stays under the whole row.
  </p>
{:else if slug === 'portal-shell'}
  <div class="doc-preview">
    <PreviewStage label="PortalShell preview">
      <p class="panel-copy">
        The shell is the application frame. Open it on its own so the sidebar, toolbar, and mobile
        navigation can use the viewport.
      </p>
      <Button href={galleryHref('/shell')} variant="primary">Open the shell</Button>
    </PreviewStage>
  </div>
  <pre>{variations['portal-shell'].code(settings['portal-shell'])}</pre>
  <p class="api-line">
    Snippets: brand, summary, footer, topbar, children. The consumer supplies the active URL.
  </p>
{:else if slug === 'sidebar-nav'}
  <div class="doc-preview">
    <PreviewStage label="SidebarNav preview">
      <div class="chrome-slice">
        <SidebarNav
          items={nav}
          active={galleryHref('/components')}
          collapsed={enabled(settings['sidebar-nav'], 'collapsed')}
        />
      </div>
    </PreviewStage>
    <PreviewControls
      controls={variations['sidebar-nav'].controls}
      bind:settings={settings['sidebar-nav']}
    />
  </div>
  <pre>{variations['sidebar-nav'].code(settings['sidebar-nav'])}</pre>
  <p class="api-line"><code>NavItem</code>: href, label, optional icon, optional count.</p>
{:else if slug === 'mobile-nav'}
  <div class="doc-preview">
    <PreviewStage label="MobileNav preview">
      <p class="panel-copy">
        Mobile navigation is fixed to the bottom of the shell below 767px. The shell preview shows
        it when the viewport is narrow.
      </p>
      <Button href={galleryHref('/shell')}>Open the shell</Button>
    </PreviewStage>
  </div>
  <pre>{variations['mobile-nav'].code(settings['mobile-nav'])}</pre>
  <p class="api-line">Same items as the sidebar. The narrow breakpoint is an adaptation.</p>
{:else if slug === 'top-bar'}
  <div class="doc-preview">
    <PreviewStage label="TopBar preview" layout="wide">
      <div class="chrome-bar">
        <TopBar
          breadcrumb={enabled(settings['top-bar'], 'breadcrumb') ? 'Components' : undefined}
          actions={enabled(settings['top-bar'], 'actions') ? alertsAction : undefined}
        />
      </div>
    </PreviewStage>
    <PreviewControls
      controls={variations['top-bar'].controls}
      bind:settings={settings['top-bar']}
    />
  </div>
  <pre>{variations['top-bar'].code(settings['top-bar'])}</pre>
  <p class="api-line">
    Optional breadcrumb and an actions snippet for search, notices, and account controls.
  </p>
{:else if slug === 'auth-frame'}
  <div class="doc-preview">
    <PreviewStage label="AuthFrame preview">
      <p class="panel-copy">
        AuthFrame has no application navigation. Preview the compact panel or the wider reading
        layout.
      </p>
      <div class="demo-row">
        <Button href={galleryHref('/auth-preview')}>Open the compact layout</Button>
        <Button href={galleryHref('/auth-preview?size=reading')}>Open the reading layout</Button>
      </div>
    </PreviewStage>
  </div>
  <pre>{variations['auth-frame'].code(settings['auth-frame'])}</pre>
  <p class="api-line">
    Required brand link and children. <code>size</code> is compact or reading. Both are adaptations.
  </p>
{:else if slug === 'floating-nav'}
  <div class="doc-preview">
    <PreviewStage label="FloatingNav preview" layout="wide">
      <FloatingNav
        label="Example"
        brand={navBrand}
        items={navItems}
        actions={enabled(settings['floating-nav'], 'actions') ? navActions : undefined}
      />
    </PreviewStage>
    <PreviewControls
      controls={variations['floating-nav'].controls}
      bind:settings={settings['floating-nav']}
    />
  </div>
  <details class="doc-more">
    <summary>More examples</summary>
    <section class="doc-example" aria-labelledby="example-floating-menu">
      <h3 id="example-floating-menu">Narrow width with Menu</h3>
      <p class="panel-copy">Below 640px of component width, Menu opens the same links.</p>
      <div class="doc-example-stage">
        <div class="doc-narrow-frame">
          <FloatingNav label="Narrow example" brand={navBrand} items={navItems} />
        </div>
      </div>
    </section>
  </details>
  <pre>{variations['floating-nav'].code(settings['floating-nav'])}</pre>
  <p class="api-line">
    Required <code>label</code>, <code>brand</code>, and <code>items</code> snippets. Optional
    <code>actions</code>. Below 640px of component width, Menu opens the same links in a panel. That
    threshold, the selected-link fill, Escape, and outside dismissal are adaptations.
  </p>
{:else if slug === 'color-selector'}
  <div class="doc-preview">
    <PreviewStage label="ColorSelector preview">
      <div class="demo-row">
        <ColorSelector bind:value={accent} />
        <span>{accent.toUpperCase()}</span>
      </div>
    </PreviewStage>
  </div>
  <pre>{variations['color-selector'].code(settings['color-selector'])}</pre>
  <p class="api-line">
    Five presets, a gradient, and hex input. Preset dimensions are an adaptation. Reduced motion
    still reaches the chosen color.
  </p>
{:else}
  <p class="panel-copy">This component does not have a preview yet.</p>
{/if}

<style>
  .doc-narrow {
    max-width: 360px;
  }
  .doc-narrow-frame {
    width: min(100%, 360px);
  }
  .feature-demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
    gap: 24px;
  }
  .chrome-slice {
    max-width: 280px;
    padding: 12px;
    border-radius: 16px;
    background: var(--portal-canvas);
  }
  .chrome-bar {
    border: 1px solid var(--portal-border);
    border-radius: 16px;
    overflow: hidden;
    background: var(--portal-surface);
  }
</style>
