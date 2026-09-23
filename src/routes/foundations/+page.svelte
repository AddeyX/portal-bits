<script lang="ts">
  import { SectionHeader, Badge, Button } from '$lib';
  import { ArrowUpRight } from '@lucide/svelte';
  const colors = [
    { name: 'Action green', hex: '#19e783', token: '--portal-green' },
    { name: 'Ink', hex: '#181818', token: '--portal-ink' },
    { name: 'White surface', hex: '#ffffff', token: '--portal-surface' },
    { name: 'Quiet canvas', hex: '#f8faff', token: '--portal-canvas' },
    { name: 'Soft border', hex: '#edeff3', token: '--portal-border' },
  ];
  const types = [
    { name: 'Section heading', size: 32, line: 40, weight: 500, text: 'A world of possibilities' },
    {
      name: 'Compact heading',
      size: 24,
      line: 32,
      weight: 500,
      text: 'Small details. Big difference.',
    },
    {
      name: 'Body large',
      size: 16,
      line: 24,
      weight: 400,
      text: 'Everything you need, right where it belongs.',
    },
    { name: 'Navigation', size: 15, line: 22, weight: 400, text: 'Find your next favorite.' },
    {
      name: 'Body / control',
      size: 14,
      line: 20,
      weight: 400,
      text: 'Discover something new today.',
    },
    {
      name: 'Supporting',
      size: 13,
      line: 18,
      weight: 400,
      text: 'A quieter layer of information.',
    },
  ];
</script>

<div class="gallery-page">
  <header class="page-intro">
    <div>
      <h1>Start with the essentials.</h1>
      <p>The small decisions that make everything feel like Portal.</p>
    </div>
    <Badge variant="success">DOM-derived</Badge>
  </header>
  <section class="gallery-surface">
    <SectionHeader
      title="A restrained palette"
      description="Soft neutrals leave room for a very particular green."
    />
    <div class="docs-content">
      <div class="swatch-grid">
        {#each colors as color (color.token)}<div>
            <div class="swatch" style:background={color.hex}></div>
            <div class="swatch-caption">
              <span>{color.name}</span><code>{color.hex}</code><code>{color.token}</code>
            </div>
          </div>{/each}
      </div>
      <p class="note">
        Source muted text is #9da3ac. This kit uses #686e78 for small text on light surfaces to
        improve contrast. Dark preview is an adaptation, not an extracted dark theme.
      </p>
    </div>
  </section>
  <section class="gallery-surface">
    <SectionHeader
      title="Quietly expressive type"
      description="Regular weight, close tracking, and a clear hierarchy."
    />
    <div class="docs-content">
      {#each types as type (type.name)}<div class="type-row">
          <span>{type.name}</span><span
            style={`font-size:${type.size}px;line-height:${type.line}px;font-weight:${type.weight};letter-spacing:-.01em`}
            >{type.text}</span
          ><code>{type.size}/{type.line} · {type.weight}</code>
        </div>{/each}
      <p class="note">
        Portal uses Roobert. This gallery bundles Inter under the SIL Open Font License as a
        predictable fallback. Supply licensed Roobert through --portal-font for closer typography.
      </p>
    </div>
  </section>
  <section class="gallery-surface">
    <SectionHeader
      title="Space, shape, depth"
      description="Room to breathe. Just enough elevation."
    />
    <div class="docs-content">
      <div class="demo-row">
        {#each [4, 8, 12, 16, 24, 32] as space (space)}<div style="min-width:60px">
            <div
              style={`height:${space}px;width:48px;background:var(--portal-green);border-radius:3px;margin-bottom:12px`}
            ></div>
            <code>{space}px</code>
          </div>{/each}
      </div>
      <div class="demo-row" style="margin-top:28px">
        <Button size={32}>32px control</Button><Button size={40}>40px control</Button><Button
          size={48}>48px control</Button
        ><Badge>100px pill radius</Badge><Badge>16px surface radius</Badge>
      </div>
      <pre>{`--portal-shadow-control:
  0 6px 10px -4px rgb(0 0 0 / 12%),
  0 0 0 1px rgb(0 0 0 / 5%);

--portal-duration: 300ms;
--portal-ease: cubic-bezier(.215,.61,.355,1);`}</pre>
    </div>
  </section>
  <section class="gallery-surface">
    <SectionHeader
      title="Evidence, not guesswork"
      description="What was measured, and where the library makes a deliberate choice."
    />
    <div class="docs-content">
      <table class="source-table">
        <thead><tr><th>Pattern</th><th>Evidence</th><th>Library treatment</th></tr></thead><tbody
          ><tr
            ><td>Buttons</td><td>Computed 32/40/48px heights; 100px radius; dual shadow</td><td
              >Source-derived sizes and variants</td
            ></tr
          ><tr
            ><td>Typography</td><td>Roobert; 13–32px sampled scale; −1% tracking</td><td
              >Inter fallback; configurable family</td
            ></tr
          ><tr
            ><td>Card surfaces</td><td>16px corners; 16/24px spacing; layered shadow</td><td
              >Preserved; neutral poster assets</td
            ></tr
          ><tr
            ><td>Chrome</td><td
              >Sidebar, top controls, compact header and bottom navigation observed</td
            ><td>Reusable composition; 767px breakpoint is an adaptation</td></tr
          ><tr
            ><td>Motion</td><td>300ms easing on sampled controls and list opacity</td><td
              >Source timing; overlay movement adapted</td
            ></tr
          ><tr
            ><td>Dark / accessibility</td><td>Full dark styles and all focus states unverified</td
            ><td>Optional dark preview and contrast improvements labeled</td></tr
          ></tbody
        >
      </table>
      <p class="note">
        Inspected September 23, 2026. Source: <a
          href="https://portal.abs.xyz/discover"
          target="_blank"
          rel="noreferrer">Abstract Portal / Discover</a
        >. Full selector and computed-style notes live in docs/portal-dom-analysis.md.
      </p>
    </div>
  </section>
</div>
