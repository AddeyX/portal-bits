<script lang="ts">
  import { Tooltip } from '$lib';
  let { text = 'short' }: { text?: 'short' | 'long' } = $props();
  const messages = {
    short: 'Keyboard navigation',
    long: 'Every control in this library supports keyboard navigation',
  };
</script>

<div class="row">
  <Tooltip text={messages[text]}>
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      ><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg
    >
  </Tooltip>
  <span>Focus the icon</span>
</div>

<style>
  .row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
  }
</style>
