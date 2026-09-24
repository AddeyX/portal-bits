<script lang="ts">
  import { SectionHeader, Button, Switch, Toggle, Dialog, Popover, Badge } from '$lib';
  import { Heart, Play, ArrowUpRight } from '@lucide/svelte';
  let end = $state(false);
  let checked = $state(false);
  let pressed = $state(false);
</script>

<div class="gallery-page">
  <header class="page-intro">
    <div>
      <h1>Small moments. Lasting feel.</h1>
      <p>Responsive feedback, a gentle arrival, and a little less friction.</p>
    </div>
    <Badge>Motion lab</Badge>
  </header>
  <section class="gallery-surface">
    <SectionHeader title="The easing curve" description="Quick to respond. Soft on arrival." />
    <div class="docs-content">
      <div class="motion-stage">
        <Button onclick={() => (end = !end)}><Play size={15} /> Replay</Button>
        <div class="motion-track"><div class="motion-dot" data-end={end}></div></div>
      </div>
      <div class="motion-facts">
        <div><span>Duration</span><strong>300ms</strong></div>
        <div><span>Easing</span><strong>cubic-bezier(.215, .61, .355, 1)</strong></div>
        <div><span>Evidence</span><strong>Sampled controls & list opacity</strong></div>
      </div>
      <p class="note">
        The moving dot visualizes the measured curve. It is a demonstration, not a motion copied
        from the source.
      </p>
    </div>
  </section>
  <section class="gallery-surface">
    <SectionHeader
      title="Feedback you can feel"
      description="Every interaction resolves to a clear state."
    />
    <div class="docs-content">
      <div class="demo-section">
        <div>
          <h2>Press & select</h2>
          <p>Color, shadow, and thumb travel. No unnecessary bounce.</p>
        </div>
        <div>
          <div class="demo-row">
            <Button variant="green" onclick={() => (pressed = !pressed)}
              >{pressed ? 'Saved' : 'Save to collection'}</Button
            ><Toggle label="Motion favorite" bind:pressed
              ><Heart size={18} fill={pressed ? 'currentColor' : 'none'} /></Toggle
            ><Switch label="Motion switch" bind:checked />
          </div>
          <p class="note">
            Source curve; toggle fill, press shadow, and switch travel are adapted behaviors.
          </p>
        </div>
      </div>
      <div class="demo-section">
        <div>
          <h2>Enter & exit</h2>
          <p>Subtle travel, with focus managed by Bits UI.</p>
        </div>
        <div>
          <div class="demo-row">
            <Dialog
              title="A little breathing room"
              description="This overlay uses the source easing with an adapted 8px entry. Escape closes it and returns focus."
              >{#snippet trigger()}Open dialog <ArrowUpRight size={15} />{/snippet}
              <p class="panel-copy">
                Try opening and closing quickly. The final state should always follow your last
                action.
              </p></Dialog
            ><Popover
              label="Motion popover"
              triggerClass="p-button p-button--secondary p-button--40"
              >{#snippet trigger()}Open popover{/snippet}
              <h3 class="panel-title">Right where you need it.</h3>
              <p class="panel-copy">
                Collision-aware positioning, a short entrance, and Escape to dismiss.
              </p></Popover
            >
          </div>
          <p class="note">
            Entry: 300ms. Exit: 160ms. Distances, exit duration, and blur are adaptations; not
            measured source values.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="gallery-surface">
    <SectionHeader
      title="Motion should never get in the way"
      description="Respect the person, not just the animation."
    />
    <div class="docs-content">
      <table class="source-table">
        <thead><tr><th>Condition</th><th>Behavior</th></tr></thead><tbody
          ><tr
            ><td>Reduced motion</td><td
              >Nonessential transitions and animations resolve immediately through
              prefers-reduced-motion.</td
            ></tr
          ><tr
            ><td>Rapid input</td><td
              >State follows the latest action. CSS transitions reverse without queuing handlers.</td
            ></tr
          ><tr
            ><td>Keyboard navigation</td><td
              >Visible focus stays distinct from hover. Dialog focus is contained and restored.</td
            ></tr
          ><tr
            ><td>Touch</td><td
              >Actions remain available without hover. Cards expose persistent controls.</td
            ></tr
          ></tbody
        >
      </table>
      <pre>{`@media (prefers-reduced-motion: reduce) {
  .p-theme * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}</pre>
    </div>
  </section>
</div>
