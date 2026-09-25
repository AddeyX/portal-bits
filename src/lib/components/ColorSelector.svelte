<script lang="ts">
  import { Check, Palette } from '@lucide/svelte';
  import Popover from './Popover.svelte';
  import { normalizeHex, toHsv, fromHsv, accentForeground } from '../internal/color';

  let {
    value = $bindable('#19e783'),
    open = $bindable(false),
    label = 'Accent color',
    theme = 'light',
    onValueChange,
  }: {
    value?: string;
    open?: boolean;
    label?: string;
    theme?: 'light' | 'dark';
    onValueChange?: (value: string) => void;
  } = $props();
  const presets = [
    { name: 'Green', color: '#19e783' },
    { name: 'Blue', color: '#5b9dff' },
    { name: 'Violet', color: '#a78bfa' },
    { name: 'Rose', color: '#fb7185' },
    { name: 'Amber', color: '#fbbf24' },
  ];
  const id = $props.id();
  let custom = $state(false);
  let hsv = $state({ h: 151, s: 89, v: 91 });
  let draft = $state('');
  let selected = $derived(normalizeHex(value) ?? '#19e783');
  let customSelected = $derived(!presets.some((preset) => preset.color === selected));
  function choose(color: string) {
    value = color;
    onValueChange?.(color);
  }
  function showCustom() {
    hsv = toHsv(selected);
    draft = selected;
    custom = true;
  }
  function updateColor() {
    draft = fromHsv(hsv.h, hsv.s, hsv.v);
    choose(draft);
  }
  function editHex(event: Event) {
    draft = (event.currentTarget as HTMLInputElement).value;
    const color = normalizeHex(draft);
    if (color) {
      hsv = toHsv(color);
      choose(color);
    }
  }
  function move(event: PointerEvent) {
    const target = event.currentTarget as HTMLButtonElement;
    const rect = target.getBoundingClientRect();
    hsv.s = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    hsv.v = Math.max(0, Math.min(100, 100 - ((event.clientY - rect.top) / rect.height) * 100));
    updateColor();
  }
</script>

<Popover bind:open {label} {theme}>
  {#snippet trigger()}<Palette size={18} /><span
      class="p-color-indicator"
      style:background={selected}
    ></span>{/snippet}
  <div class="p-color-heading"><strong>{label}</strong><span>{selected.toUpperCase()}</span></div>
  <div class="p-color-presets" role="group" aria-label="Color presets">
    {#each presets as preset (preset.name)}
      <button
        type="button"
        class="p-color-swatch"
        style:background={preset.color}
        style:color={accentForeground(preset.color)}
        aria-label={preset.name}
        aria-pressed={selected === preset.color}
        onclick={() => {
          custom = false;
          choose(preset.color);
        }}
      >
        {#if selected === preset.color}<Check size={18} />{/if}
      </button>
    {/each}
    <button
      type="button"
      class="p-color-swatch p-color-rainbow"
      aria-label="Custom color"
      aria-pressed={customSelected}
      aria-expanded={custom}
      aria-controls={`${id}-custom`}
      onclick={showCustom}
    >
      {#if customSelected}<Check size={18} />{/if}
    </button>
  </div>
  {#if custom}
    <div id={`${id}-custom`} class="p-color-custom">
      <button
        type="button"
        class="p-color-plane"
        aria-label="Color gradient; use sliders below for keyboard adjustment"
        style:--hue={`hsl(${hsv.h} 100% 50%)`}
        onpointerdown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          move(event);
        }}
        onpointermove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event);
        }}
      >
        <span style:left={`${hsv.s}%`} style:top={`${100 - hsv.v}%`} style:background={selected}
        ></span>
      </button>
      <label class="p-color-field"
        >Hue<input
          class="p-color-hue"
          type="range"
          min="0"
          max="360"
          step="1"
          bind:value={hsv.h}
          oninput={updateColor}
        /></label
      >
      <div class="p-color-channels">
        <label class="p-color-field"
          >Saturation<input
            type="range"
            min="0"
            max="100"
            step="1"
            bind:value={hsv.s}
            oninput={updateColor}
          /></label
        >
        <label class="p-color-field"
          >Brightness<input
            type="range"
            min="0"
            max="100"
            step="1"
            bind:value={hsv.v}
            oninput={updateColor}
          /></label
        >
      </div>
      <label class="p-color-field"
        >Hex color<input
          class="p-input"
          value={draft}
          oninput={editHex}
          spellcheck="false"
          aria-invalid={!normalizeHex(draft)}
          aria-describedby={!normalizeHex(draft) ? `${id}-error` : undefined}
        /></label
      >
      {#if !normalizeHex(draft)}<p id={`${id}-error`} class="p-color-error">
          Enter a 3- or 6-digit hex color.
        </p>{/if}
    </div>
  {/if}
</Popover>
