<script lang="ts">
  import { Progress } from 'bits-ui';
  const uid = $props.id();
  let {
    label,
    value = null,
    max = 100,
    showValue = true,
    class: className = '',
  }: {
    label: string;
    value?: number | null;
    max?: number;
    showValue?: boolean;
    class?: string;
  } = $props();
  const percent = $derived(
    value === null ? null : Math.round((Math.min(Math.max(value, 0), max) / max) * 100),
  );
</script>

<div class={`p-progress-field ${className}`}>
  <div class="p-slider-heading">
    <span id={`${uid}-label`} class="p-input-label">{label}</span>
    {#if showValue && percent !== null}<span class="p-slider-value" aria-hidden="true"
        >{percent}%</span
      >{/if}
  </div>
  <Progress.Root {value} {max} aria-labelledby={`${uid}-label`} class="p-progress">
    <span
      class="p-progress-fill"
      style:transform={percent === null ? undefined : `translateX(${percent - 100}%)`}
    ></span>
  </Progress.Root>
</div>
