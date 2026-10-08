<script lang="ts">
  import { Button, TopBar } from '$lib';
  let { breadcrumb = true, actions = true }: { breadcrumb?: boolean; actions?: boolean } = $props();
</script>

{#snippet alerts()}
  <Button size={32}>
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      ><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path
        d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
      /></svg
    >
    Alerts
  </Button>
{/snippet}

<div class="bar">
  <TopBar
    breadcrumb={breadcrumb ? 'Components' : undefined}
    actions={actions ? alerts : undefined}
  />
</div>

<style>
  .bar {
    border: 1px solid var(--portal-border);
    border-radius: 16px;
    overflow: hidden;
    background: var(--portal-surface);
  }
</style>
