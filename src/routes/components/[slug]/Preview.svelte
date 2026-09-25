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
  let { slug }: { slug: string } = $props();
  const stories = [
    {
      id: 'field',
      label: 'A field guide to small ideas',
      image: '/art/field.svg',
      href: '/components/article-card',
    },
    {
      id: 'orbit',
      label: 'Make space for your next project',
      image: '/art/orbit.svg',
      href: '/components/article-card',
    },
    {
      id: 'tempo',
      label: 'Find a rhythm that works',
      image: '/art/tempo.svg',
      href: '/components/article-card',
    },
  ];
  const features = [
    {
      title: 'Start with a spark',
      description: 'Collect the little ideas worth returning to.',
      image: '/art/forma.svg',
    },
    {
      title: 'Room to explore',
      description: 'Give each direction the space it needs to grow.',
      image: '/art/common.svg',
    },
    {
      title: 'Bring it together',
      description: 'Turn a few good pieces into something you can share.',
      image: '/art/gather.svg',
    },
  ];
  let consent = $state(false);
  let category = $state('');
  let pressed = $state(false);
  let checked = $state(true);
  let selected = $state('all');
  let value = $state('');
  let name = $state('Alex Morgan');
  let saved = $state(false);
  let dialogOpen = $state(false);
  let favorite = $state(false);
  let formError = $state('');
  let accent = $state('#19e783');
  let alertMessage = $state('');
  function save() {
    if (!name.trim()) {
      formError = 'Enter a display name.';
      return;
    }
    formError = '';
    saved = true;
    dialogOpen = false;
  }
  const nav = [
    { href: '/shell', label: 'Overview', icon: LayoutGrid },
    { href: '/foundations', label: 'Foundations', icon: Layers },
    { href: '/components', label: 'Components', icon: Component, count: '29' },
  ];
</script>

{#if slug === 'button'}
  <div class="doc-preview">
    <div class="demo-row">
      <Button variant="primary" onclick={() => (saved = !saved)}
        >{saved ? 'Changes saved' : 'Save changes'}{#if saved}<Check size={15} />{/if}</Button
      >
      <Button>Secondary</Button>
      <Button variant="green" href="/foundations">Get started <ArrowUpRight size={15} /></Button>
      <Button disabled>Disabled</Button>
      <Button variant="quiet" onclick={() => (saved = !saved)}>Try again</Button>
      <Button variant="quiet" disabled>Unavailable</Button>
    </div>
    <div class="demo-row">
      <Button size={32}>Small</Button>
      <Button size={40}>Default</Button>
      <Button size={48}>Large</Button>
    </div>
  </div>
  <pre>{`<Button variant="green" size={40} onclick={save}>
  Save changes
</Button>`}</pre>
  <p class="api-line">
    <code>variant</code> primary | secondary | green | quiet · <code>size</code> 32 | 40 | 48 · Native
    button and link props are forwarded. Quiet stays inline; size does not apply.
  </p>
{:else if slug === 'icon-button'}
  <div class="doc-preview">
    <div class="demo-row">
      <IconButton label="Add item" onclick={() => (saved = !saved)}><Plus size={18} /></IconButton>
      <IconButton label="Add item, small" size={32}><Plus size={16} /></IconButton>
      <span>{saved ? 'Added' : 'Ready'}</span>
    </div>
  </div>
  <pre>{`<IconButton label="Add item"><Plus /></IconButton>`}</pre>
  <p class="api-line">
    An accessible name is required. Size and variant follow Button where they apply.
  </p>
{:else if slug === 'input'}
  <div class="doc-preview">
    <div class="demo-field">
      <Input label="Component search example" placeholder="Search something good…" bind:value>
        {#snippet icon()}<Search size={16} />{/snippet}
      </Input>
      <p aria-live="polite">
        {value ? `Searching for “${value}”` : 'Type to try the bound value.'}
      </p>
      <Input
        label="Invalid email example"
        value="not-an-email"
        invalid
        aria-describedby="email-error"
      />
      <p id="email-error">Enter an email address, such as alex@example.com.</p>
      <Input label="Disabled input example" value="Not editable" disabled />
    </div>
  </div>
  <pre>{`<Input label="Search apps" bind:value placeholder="Search…" />`}</pre>
  <p class="api-line">
    Required <code>label</code> · Bindable <code>value</code> · <code>invalid</code> · Optional icon snippet
    · Native input props.
  </p>
{:else if slug === 'select'}
  <div class="doc-preview">
    <div class="demo-field">
      <Select
        label="Record category"
        bind:value={category}
        placeholder="Choose a category"
        options={[
          { value: 'notes', label: 'Notes' },
          { value: 'drafts', label: 'Drafts' },
          { value: 'archived', label: 'Archived', disabled: true },
        ]}
      />
      <p aria-live="polite">{category || 'No category'}</p>
    </div>
  </div>
  <pre>{`<Select label="Category" bind:value placeholder="Choose a category" options={options} />`}</pre>
  <p class="api-line">
    Visible <code>label</code>, bindable string <code>value</code>, and <code>options</code>.
    Styling is an adaptation of Input.
  </p>
{:else if slug === 'checkbox'}
  <div class="doc-preview">
    <div class="demo-field">
      <Checkbox bind:checked={consent}>
        {#snippet label()}I agree to the <a href="/auth-preview?size=reading">demo terms</a
          >.{/snippet}
      </Checkbox>
      <Checkbox disabled>
        {#snippet label()}Disabled choice; <a href="/auth-preview?size=reading">demo terms</a> remain
          available.{/snippet}
      </Checkbox>
      <p aria-live="polite">{consent ? 'Agreed' : 'Not agreed'}</p>
    </div>
  </div>
  <pre>{`<Checkbox bind:checked>
  {#snippet label()}I agree to the <a href="/terms">terms</a>.{/snippet}
</Checkbox>`}</pre>
  <p class="api-line">
    Bindable boolean. The label snippet is required. Links inside the label stay usable.
  </p>
{:else if slug === 'toggle'}
  <div class="doc-preview">
    <div class="demo-row">
      <Toggle label="Favorite example" bind:pressed>
        <Heart size={17} fill={pressed ? 'currentColor' : 'none'} />
      </Toggle>
      <span>{pressed ? 'Added to favorites' : 'Save a favorite'}</span>
    </div>
  </div>
  <pre>{`<Toggle label="Favorite" bind:pressed><Heart /></Toggle>`}</pre>
  <p class="api-line">Bindable <code>pressed</code> state and a required accessible name.</p>
{:else if slug === 'toggle-group'}
  <div class="doc-preview">
    <ToggleGroup
      label="Example category"
      bind:value={selected}
      items={[
        { value: 'all', label: 'All' },
        { value: 'apps', label: 'Apps' },
        { value: 'collections', label: 'Collections' },
      ]}
    />
    <p aria-live="polite">{selected || 'Nothing selected'}</p>
  </div>
  <pre>{`<ToggleGroup label="Category" items={categories} bind:value />`}</pre>
  <p class="api-line">
    Single selection supports deselection. Arrow keys move focus. Space selects.
  </p>
{:else if slug === 'switch'}
  <div class="doc-preview">
    <div class="demo-row">
      <Switch label="Enable notifications" bind:checked />
      <span>Notifications {checked ? 'on' : 'off'}</span>
      <Switch label="Disabled switch" disabled />
    </div>
  </div>
  <pre>{`<Switch label="Notifications" bind:checked />`}</pre>
  <p class="api-line">Bindable <code>checked</code> state, a label, and disabled.</p>
{:else if slug === 'avatar'}
  <div class="doc-preview">
    <div class="demo-row">
      <Avatar alt="Ada Morgan" size={32} />
      <Avatar alt="Orbit Studio" size={40} />
      <Avatar alt="Common Ground" size={56} />
      <Avatar alt="Missing image fallback" src="/missing-avatar.png" fallback="MF" size={40} />
    </div>
  </div>
  <pre>{`<Avatar alt="Ada Morgan" src={image} fallback="AM" size={40} />`}</pre>
  <p class="api-line">Required <code>alt</code>. Missing or failed media uses the fallback.</p>
{:else if slug === 'badge'}
  <div class="doc-preview">
    <div class="demo-row">
      <Badge>Neutral</Badge>
      <Badge variant="spotlight">Featured</Badge>
      <Badge variant="success">Available</Badge>
    </div>
  </div>
  <pre>{`<Badge variant="spotlight">Featured</Badge>`}</pre>
  <p class="api-line">Variants: neutral, spotlight, success. The badge is not a control.</p>
{:else if slug === 'dialog'}
  <div class="doc-preview">
    <Dialog
      title="Make yourself at home"
      description="Edit your display name. This example stays in your browser."
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
  </div>
  <pre>{`<Dialog title="Edit profile" bind:open>
  {#snippet trigger()}Edit profile{/snippet}
  <Input label="Name" bind:value={name} />
</Dialog>`}</pre>
  <p class="api-line">Bindable <code>open</code>, a title, and trigger plus children snippets.</p>
{:else if slug === 'popover'}
  <div class="doc-preview">
    <Popover label="Filter settings" triggerClass="p-button p-button--secondary p-button--40">
      {#snippet trigger()}<SlidersHorizontal size={15} /> Filters{/snippet}
      <h3 class="panel-title">A little more control</h3>
      <p class="panel-copy">Show notifications in your personal feed.</p>
      <div class="demo-row">
        <Switch label="Popover notifications" bind:checked />
        <span>Notifications</span>
      </div>
    </Popover>
  </div>
  <pre>{`<Popover label="Filters">
  {#snippet trigger()}Filters{/snippet}
  <p>Your panel content</p>
</Popover>`}</pre>
  <p class="api-line">
    Bindable <code>open</code>, trigger and children snippets, plus side, align, and offset.
  </p>
{:else if slug === 'tooltip'}
  <div class="doc-preview">
    <div class="demo-row">
      <Tooltip text="Every control supports keyboard navigation"><Info size={17} /></Tooltip>
      <span>Focus the icon</span>
    </div>
  </div>
  <pre>{`<Tooltip text="Keyboard navigation"><Info /></Tooltip>`}</pre>
  <p class="api-line">Required text and a children snippet. The trigger is keyboard accessible.</p>
{:else if slug === 'app-card'}
  <div class="doc-preview">
    <div class="doc-narrow">
      <AppCard
        title="Orbit Studio"
        category="Creative"
        description="Your next idea starts here."
        image="/art/orbit.svg"
        imageAlt="Orbit geometric poster"
        bind:favorite
      />
    </div>
  </div>
  <pre>{`<AppCard title="Orbit" category="Creative" image={cover}
  imageAlt="Orbit poster" bind:favorite />`}</pre>
  <p class="api-line">
    Image fallback, optional action snippet, favorite binding, and a spotlight variant.
  </p>
{:else if slug === 'article-card'}
  <div class="doc-preview">
    <div class="doc-narrow">
      <ArticleCard
        title="A field guide to small ideas"
        href="/components/carousel"
        image="/art/field.svg"
        imageAlt="Geometric illustration"
      />
    </div>
  </div>
  <pre>{`<ArticleCard title="Field notes" href="/notes"
  image={cover} imageAlt="Geometric artwork" />`}</pre>
  <p class="api-line">One native link. Missing media keeps the title and uses a placeholder.</p>
{:else if slug === 'feature-card'}
  <div class="doc-preview">
    <div class="feature-demo-grid">
      {#each features as feature (feature.title)}
        <FeatureCard {...feature} imageAlt="Colorful geometric illustration" />
      {/each}
    </div>
  </div>
  <pre>{`<FeatureCard title="Room to explore"
  description="Give each idea space to grow." />`}</pre>
  <p class="api-line">Media, heading, and description. The card itself is not a control.</p>
{:else if slug === 'carousel'}
  <div class="doc-preview">
    <Carousel label="Studio journal" items={stories}>
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
  <pre>{`<Carousel label="Journal" items={stories}>
  {#snippet item(story)}
    <ArticleCard title={story.label} href={story.href} image={story.image} />
  {/snippet}
</Carousel>`}</pre>
  <p class="api-line">
    Focus the viewport to use arrow keys, Home, or End. Navigation is immediate, including with
    reduced motion. Responsive layout is an adaptation.
  </p>
{:else if slug === 'section-header'}
  <div class="doc-preview">
    <SectionHeader title="Your collection" description="Made for you.">
      {#snippet action()}<Badge variant="spotlight">Featured</Badge>{/snippet}
    </SectionHeader>
  </div>
  <pre>{`<SectionHeader title="Your collection" description="Made for you." />`}</pre>
  <p class="api-line">Heading, optional description, and an optional action snippet.</p>
{:else if slug === 'empty-state'}
  <div class="doc-preview">
    <EmptyState
      title="Nothing saved yet"
      description="Your collection starts with a single favorite."
    >
      {#snippet icon()}<Heart size={24} />{/snippet}
    </EmptyState>
  </div>
  <pre>{`<EmptyState title="Nothing saved" description="Try a favorite." />`}</pre>
  <p class="api-line">Title, description, and optional icon and action snippets.</p>
{:else if slug === 'alert'}
  <div class="doc-preview">
    <div class="demo-field">
      <Button
        onclick={() => (alertMessage = alertMessage ? '' : 'Enter a display name before saving.')}
        >{alertMessage ? 'Clear alert' : 'Show alert'}</Button
      >
      {#if alertMessage}<Alert message={alertMessage} />{/if}
    </div>
  </div>
  <pre>{`{#if error}<Alert message={error} />{/if}`}</pre>
  <p class="api-line">A message string or short inline children. Mount it when the action fails.</p>
{:else if slug === 'row-list'}
  <div class="doc-preview">
    <RowList aria-label="Example records">
      <Row>
        <a href="/auth-preview?size=reading">Field notes</a>
        <Badge>Draft</Badge>
        <Button variant="quiet" onclick={() => (saved = !saved)}>{saved ? 'Saved' : 'Save'}</Button>
      </Row>
      <Row><span>A single cell can explain this record.</span></Row>
    </RowList>
  </div>
  <pre>{`<RowList aria-label="Drafts">
  <Row><span>Field notes</span><Button variant="quiet">Retry</Button></Row>
</RowList>`}</pre>
  <p class="api-line">
    An unordered list. Sorting and pagination stay with the consumer. This layout is an adaptation.
  </p>
{:else if slug === 'row'}
  <div class="doc-preview">
    <RowList aria-label="Wrapping record">
      <Row>
        <span>A longer synthetic record wraps naturally when the available space is narrow.</span>
        <Badge>Ready</Badge>
      </Row>
    </RowList>
  </div>
  <pre>{`<Row><span>Field notes</span><Badge>Draft</Badge></Row>`}</pre>
  <p class="api-line">
    Place Row inside RowList. Cells wrap, and the hairline stays under the whole row.
  </p>
{:else if slug === 'portal-shell'}
  <div class="doc-preview">
    <p class="panel-copy">
      The shell is the application frame. Open it on its own so the sidebar, toolbar, and mobile
      navigation can use the viewport.
    </p>
    <Button href="/shell" variant="primary">Open the shell</Button>
  </div>
  <pre>{`<PortalShell items={navigation} active={pathname} bind:collapsed>
  {#snippet topbar()}
    <TopBar breadcrumb="Discover" />
  {/snippet}
  <YourPage />
</PortalShell>`}</pre>
  <p class="api-line">
    Snippets: brand, summary, footer, topbar, children. The consumer supplies the active URL.
  </p>
{:else if slug === 'sidebar-nav'}
  <div class="doc-preview">
    <div class="chrome-slice">
      <SidebarNav items={nav} active="/components" />
    </div>
  </div>
  <pre>{`<SidebarNav items={navigation} active={pathname} />`}</pre>
  <p class="api-line"><code>NavItem</code>: href, label, optional icon, optional count.</p>
{:else if slug === 'mobile-nav'}
  <div class="doc-preview">
    <p class="panel-copy">
      Mobile navigation is fixed to the bottom of the shell below 767px. The shell preview shows it
      when the viewport is narrow.
    </p>
    <Button href="/shell">Open the shell</Button>
  </div>
  <pre>{`<MobileNav items={navigation} active={pathname} />`}</pre>
  <p class="api-line">Same items as the sidebar. The narrow breakpoint is an adaptation.</p>
{:else if slug === 'top-bar'}
  <div class="doc-preview">
    <div class="chrome-bar">
      <TopBar breadcrumb="Components">
        {#snippet actions()}
          <Button size={32}><Bell size={15} /> Alerts</Button>
        {/snippet}
      </TopBar>
    </div>
  </div>
  <pre>{`<TopBar breadcrumb="Discover">
  {#snippet actions()}Your toolbar{/snippet}
</TopBar>`}</pre>
  <p class="api-line">
    Optional breadcrumb and an actions snippet for search, notices, and account controls.
  </p>
{:else if slug === 'auth-frame'}
  <div class="doc-preview">
    <p class="panel-copy">
      AuthFrame has no application navigation. Preview the compact panel or the wider reading
      layout.
    </p>
    <div class="demo-row">
      <Button href="/auth-preview">Compact</Button>
      <Button href="/auth-preview?size=reading">Reading</Button>
    </div>
  </div>
  <pre>{`<AuthFrame brandHref="/" size="compact">
  {#snippet brand()}Portal{/snippet}
  {#snippet children()}<form>…</form>{/snippet}
</AuthFrame>`}</pre>
  <p class="api-line">
    Required brand link and children. <code>size</code> is compact or reading. Both are adaptations.
  </p>
{:else if slug === 'floating-nav'}
  <div class="doc-preview">
    <FloatingNav label="Example">
      {#snippet brand()}<a href="/">Home</a>{/snippet}
      {#snippet items()}<a href="/components" aria-current="page">Docs</a>{/snippet}
      {#snippet actions()}<a href="https://github.com/AddeyX/portal-bits">GitHub</a>{/snippet}
    </FloatingNav>
  </div>
  <pre>{`<FloatingNav label="Primary">
  {#snippet brand()}<a href="/">Home</a>{/snippet}
  {#snippet items()}<a href="/docs" aria-current="page">Docs</a>{/snippet}
  {#snippet actions()}<a href="https://github.com/example">GitHub</a>{/snippet}
</FloatingNav>`}</pre>
  <p class="api-line">
    Required <code>label</code>, <code>brand</code>, and <code>items</code> snippets. Optional
    <code>actions</code>. Below 640px of component width, Menu opens the same links in a panel. That
    threshold, the selected-link fill, Escape, and outside dismissal are adaptations.
  </p>
{:else if slug === 'color-selector'}
  <div class="doc-preview">
    <div class="demo-row">
      <ColorSelector bind:value={accent} />
      <span>{accent.toUpperCase()}</span>
    </div>
  </div>
  <pre>{`<ColorSelector bind:value={accent} />`}</pre>
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
  #email-error {
    color: var(--portal-error);
  }
</style>
