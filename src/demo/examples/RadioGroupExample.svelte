<script lang="ts">
  import { RadioGroup } from '$lib';
  let {
    orientation = 'vertical',
    disabled = false,
    hints = true,
  }: { orientation?: 'vertical' | 'horizontal'; disabled?: boolean; hints?: boolean } = $props();
  let cadence = $state('weekly');
</script>

<div class="stack">
  <RadioGroup
    label="Digest cadence"
    bind:value={cadence}
    {orientation}
    {disabled}
    options={[
      { value: 'daily', label: 'Daily', description: hints ? 'Every morning at 8:00.' : undefined },
      {
        value: 'weekly',
        label: 'Weekly',
        description: hints ? 'Monday mornings, one summary.' : undefined,
      },
      { value: 'never', label: 'Never', description: hints ? 'Only in-app updates.' : undefined },
    ]}
  />
  <p aria-live="polite">Selected: {cadence}</p>
</div>

<style>
  .stack {
    display: grid;
    gap: 16px;
    width: 360px;
    max-width: 100%;
  }
  p {
    margin: 0;
    color: var(--portal-muted);
    font-size: 13px;
  }
</style>
