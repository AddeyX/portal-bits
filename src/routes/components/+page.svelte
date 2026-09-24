<script lang="ts">
  import {
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
  } from '@lucide/svelte';
  let pressed = $state(false);
  let checked = $state(true);
  let selected = $state('all');
  let value = $state('');
  let name = $state('Alex Morgan');
  let saved = $state(false);
  let dialogOpen = $state(false);
  let favorite = $state(false);
  let formError = $state('');
  function save() {
    if (!name.trim()) {
      formError = 'Enter a display name.';
      return;
    }
    formError = '';
    saved = true;
    dialogOpen = false;
  }
</script>

<div class="gallery-page">
  <header class="page-intro">
    <div>
      <h1>Good parts. Ready to use.</h1>
      <p>Typed Svelte 5 components, with Bits UI doing the heavy lifting.</p>
    </div>
    <Badge>18 exports</Badge>
  </header>
  <nav class="doc-links" aria-label="Component sections">
    {#each ['Buttons', 'Inputs', 'Selection', 'Identity', 'Overlays', 'Cards', 'Chrome'] as section (section)}<a
        href={`#${section.toLowerCase()}`}>{section}</a
      >{/each}
  </nav>
  <section class="gallery-surface">
    <div class="demo-section" id="buttons">
      <div>
        <h2>Buttons</h2>
        <p>Soft elevation. Pill geometry. Three distinct intentions.</p>
      </div>
      <div class="demo-preview">
        <div class="demo-row">
          <Button variant="primary" onclick={() => (saved = !saved)}
            >{saved ? 'Changes saved' : 'Save changes'}{#if saved}<Check size={15} />{/if}</Button
          ><Button>Secondary</Button><Button variant="green" href="/foundations"
            >Get started <ArrowUpRight size={15} /></Button
          ><Button disabled>Disabled</Button>
        </div>
        <div class="demo-row">
          <Button size={32}>Small</Button><Button size={40}>Default</Button><Button size={48}
            >Large</Button
          ><IconButton label="Add item" onclick={() => (saved = !saved)}
            ><Plus size={18} /></IconButton
          >
        </div>
        <pre>{`<Button variant="green" size={40} onclick={save}>
  Save changes
</Button>
<IconButton label="Add item"><Plus /></IconButton>`}</pre>
        <div class="api-line">
          <code>variant</code> primary | secondary | green · <code>size</code> 32 | 40 | 48 · Native button/link
          props forwarded.
        </div>
      </div>
    </div>
    <div class="demo-section" id="inputs">
      <div>
        <h2>Inputs</h2>
        <p>Keep the field quiet. Make the purpose clear.</p>
      </div>
      <div class="demo-preview">
        <div class="demo-field">
          <span class="demo-label">Search the collection</span><Input
            label="Component search example"
            placeholder="Search something good…"
            bind:value>{#snippet icon()}<Search size={16} />{/snippet}</Input
          >
          <p aria-live="polite">
            {value ? `Searching for “${value}”` : 'Type to try the bound value.'}
          </p>
          <Input
            label="Invalid email example"
            value="not-an-email"
            invalid
            aria-describedby="email-error"
          />
          <p id="email-error" style="color:var(--portal-error)">
            Enter an email address, such as alex@example.com.
          </p>
          <Input label="Disabled input example" value="Not editable" disabled />
        </div>
        <pre>{`<Input label="Search apps" bind:value placeholder="Search…" />`}</pre>
        <div class="api-line">
          Required <code>label</code> · Bindable <code>value</code> · <code>invalid</code> · Optional
          icon snippet · Native input props.
        </div>
      </div>
    </div>
    <div class="demo-section" id="selection">
      <div>
        <h2>Selection</h2>
        <p>State that reads at a glance, with or without motion.</p>
      </div>
      <div class="demo-preview">
        <div class="demo-row">
          <Toggle label="Favorite example" bind:pressed
            ><Heart size={17} fill={pressed ? 'currentColor' : 'none'} /></Toggle
          ><span>{pressed ? 'Added to favorites' : 'Save a favorite'}</span>
        </div>
        <div class="demo-row">
          <Switch label="Enable notifications" bind:checked /><span
            >Notifications {checked ? 'on' : 'off'}</span
          ><Switch label="Disabled switch" disabled />
        </div>
        <div class="demo-row">
          <ToggleGroup
            label="Example category"
            bind:value={selected}
            items={[
              { value: 'all', label: 'All' },
              { value: 'apps', label: 'Apps' },
              { value: 'collections', label: 'Collections' },
            ]}
          />
        </div>
        <pre>{`<Switch label="Notifications" bind:checked />
<Toggle label="Favorite" bind:pressed><Heart /></Toggle>
<ToggleGroup label="Category" items={categories} bind:value />`}</pre>
        <div class="api-line">
          Single-selection group supports deselection; empty value means no filter. Arrow keys move
          focus. Space selects.
        </div>
      </div>
    </div>
    <div class="demo-section" id="identity">
      <div>
        <h2>Identity</h2>
        <p>A recognizable face. A little context.</p>
      </div>
      <div class="demo-preview">
        <div class="demo-row">
          <Avatar alt="Ada Morgan" size={32} /><Avatar alt="Orbit Studio" size={40} /><Avatar
            alt="Common Ground"
            size={56}
          /><Avatar
            alt="Missing image fallback"
            src="/missing-avatar.png"
            fallback="MF"
            size={40}
          />
        </div>
        <div class="demo-row">
          <Badge>Neutral</Badge><Badge variant="spotlight">Featured</Badge><Badge variant="success"
            >Available</Badge
          >
        </div>
        <pre>{`<Avatar alt="Ada Morgan" src={image} fallback="AM" size={40} />
<Badge variant="spotlight">Featured</Badge>`}</pre>
        <div class="api-line">
          Avatar handles missing/failed media. <code>alt</code> required. Badge variants: neutral, spotlight,
          success.
        </div>
      </div>
    </div>
    <div class="demo-section" id="overlays">
      <div>
        <h2>Overlays</h2>
        <p>The right amount of focus. Keyboard behavior included.</p>
      </div>
      <div class="demo-preview">
        <div class="demo-row">
          <Dialog
            title="Make yourself at home"
            description="Edit your display name. This example stays in your browser."
            bind:open={dialogOpen}
            >{#snippet trigger()}Edit profile <ArrowUpRight size={15} />{/snippet}
            <form
              onsubmit={(e) => {
                e.preventDefault();
                save();
              }}
            >
              <Input
                label="Display name"
                bind:value={name}
                invalid={!!formError}
                aria-describedby={formError ? 'name-error' : undefined}
              />{#if formError}<p id="name-error" role="alert" style="color:var(--portal-error)">
                  {formError}
                </p>{/if}
              <div class="detail-actions">
                <span class="panel-copy">Local demo only</span><Button variant="green" type="submit"
                  >Save profile</Button
                >
              </div>
            </form></Dialog
          ><Popover label="Filter settings" triggerClass="p-button p-button--secondary p-button--40"
            >{#snippet trigger()}<SlidersHorizontal size={15} /> Filters{/snippet}
            <h3 class="panel-title">A little more control</h3>
            <p class="panel-copy">Show notifications in your personal feed.</p>
            <div class="demo-row">
              <Switch label="Popover notifications" bind:checked /><span>Notifications</span>
            </div></Popover
          ><Tooltip text="Every control supports keyboard navigation"><Info size={17} /></Tooltip>
        </div>
        <p aria-live="polite">
          {saved ? `Profile saved as ${name}.` : 'Try Tab, Escape, and clicking outside.'}
        </p>
        <pre>{`<Dialog title="Edit profile" bind:open>
  {#snippet trigger()}Edit profile{/snippet}
  <Input label="Name" bind:value={name} />
</Dialog>
<Popover label="Filters">
  {#snippet trigger()}Filters{/snippet}
  <p>Your panel content</p>
</Popover>`}</pre>
        <div class="api-line">
          Dialog/Popover: bindable <code>open</code>, trigger + children snippets, optional
          <code>theme</code>. Popover: side/align/sideOffset. Tooltip: required text, children
          snippet.
        </div>
      </div>
    </div>
    <div class="demo-section" id="cards">
      <div>
        <h2>Compositions</h2>
        <p>Primitives that work better together.</p>
      </div>
      <div class="demo-preview">
        <div style="max-width:360px">
          <AppCard
            title="Orbit Studio"
            category="Creative"
            description="Your next idea starts here."
            image="/art/orbit.svg"
            imageAlt="Orbit geometric poster"
            bind:favorite
          />
        </div>
        <EmptyState
          title="Nothing saved yet"
          description="Your collection starts with a single favorite."
          >{#snippet icon()}<Heart size={24} />{/snippet}</EmptyState
        >
        <pre>{`<AppCard title="Orbit" category="Creative" image={cover}
  imageAlt="Orbit poster" bind:favorite />
<SectionHeader title="Your collection" description="Made for you." />
<EmptyState title="Nothing saved" description="Try a favorite." />`}</pre>
        <div class="api-line">
          AppCard: image fallback, optional action snippet/href, favorite binding, spotlight
          variant. SectionHeader and EmptyState accept action snippets.
        </div>
      </div>
    </div>
    <div class="demo-section" id="chrome">
      <div>
        <h2>Chrome</h2>
        <p>The frame is part of the system, too.</p>
      </div>
      <div class="demo-preview">
        <p>
          This gallery uses the exported PortalShell, SidebarNav, TopBar, and MobileNav. Collapse
          the sidebar on desktop, or resize to see bottom navigation.
        </p>
        <pre>{`<PortalShell items={navigation} active={pathname} bind:collapsed>
  {#snippet summary()}Your summary card{/snippet}
  {#snippet topbar()}
    <TopBar breadcrumb="Discover">
      {#snippet actions()}Your toolbar{/snippet}
    </TopBar>
  {/snippet}
  <YourPage />
</PortalShell>`}</pre>
        <div class="api-line">
          <code>NavItem</code>: href, label, optional icon component/count. Shell snippets: brand,
          summary, footer, topbar, children. Active URL is supplied by the consumer.
        </div>
      </div>
    </div>
  </section>
</div>
