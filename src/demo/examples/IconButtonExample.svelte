<script lang="ts">
  import { IconButton } from '$lib';
  let {
    variant = 'secondary',
    size = 40,
    disabled = false,
  }: {
    variant?: 'primary' | 'secondary' | 'green';
    size?: 32 | 40 | 48;
    disabled?: boolean;
  } = $props();
  let added = $state(false);
</script>

<div class="stack">
  <IconButton label="Add item" {variant} {size} {disabled} onclick={() => (added = !added)}>
    <svg
      width={size === 32 ? 16 : 18}
      height={size === 32 ? 16 : 18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg
    >
  </IconButton>
  <p role="status">{added ? 'Added' : 'Ready'}</p>
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
