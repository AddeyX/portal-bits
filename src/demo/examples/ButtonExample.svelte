<script lang="ts">
  import { Button } from '$lib';
  let {
    variant = 'primary',
    size = 40,
    disabled = false,
    icon = false,
  }: {
    variant?: 'primary' | 'secondary' | 'green' | 'quiet';
    size?: 32 | 40 | 48;
    disabled?: boolean;
    icon?: boolean;
  } = $props();
  let saved = $state(false);
</script>

{#snippet label()}
  {#if icon}
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg
    >
  {/if}
  {saved ? 'Changes saved' : 'Save changes'}
{/snippet}

<div class="stack">
  {#if variant === 'quiet'}
    <Button variant="quiet" {disabled} onclick={() => (saved = !saved)}>
      {@render label()}
    </Button>
  {:else}
    <Button {variant} {size} {disabled} onclick={() => (saved = !saved)}>
      {@render label()}
    </Button>
  {/if}
  <p role="status">{saved ? 'Saved' : 'Not saved yet'}</p>
</div>

<style>
  .stack {
    display: grid;
    justify-items: center;
    gap: 12px;
  }
  p {
    margin: 0;
    color: var(--portal-muted);
    font-size: 13px;
    line-height: 20px;
  }
</style>
