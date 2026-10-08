<script lang="ts">
  import { Slider } from '$lib';
  let { disabled = false, step = 1 }: { disabled?: boolean; step?: number } = $props();
  let volume = $state(40);
</script>

<div class="field">
  <Slider
    label="Preview volume"
    bind:value={volume}
    {step}
    {disabled}
    format={(value) => `${value}%`}
  />
</div>

<style>
  .field {
    width: 320px;
    max-width: 100%;
  }
</style>
