<script lang="ts">
  import { Slider } from 'bits-ui';
  const uid = $props.id();
  let {
    label,
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    name,
    format = (current: number) => String(current),
    class: className = '',
  }: {
    label: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    name?: string;
    format?: (value: number) => string;
    class?: string;
  } = $props();
</script>

<div class={`p-slider-field ${className}`}>
  <div class="p-slider-heading">
    <span id={`${uid}-label`} class="p-input-label">{label}</span>
    <output class="p-slider-value" aria-hidden="true">{format(value)}</output>
  </div>
  <Slider.Root type="single" bind:value {min} {max} {step} {disabled} class="p-slider">
    <span class="p-slider-track"><Slider.Range class="p-slider-range" /></span>
    <Slider.Thumb
      index={0}
      aria-labelledby={`${uid}-label`}
      aria-valuetext={format(value)}
      class="p-slider-thumb"
    />
  </Slider.Root>
  {#if name}<input type="hidden" {name} {value} />{/if}
</div>
