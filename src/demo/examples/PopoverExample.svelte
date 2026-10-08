<script lang="ts">
  import { Popover, Switch } from '$lib';
  let {
    side = 'bottom',
    align = 'end',
  }: {
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
  } = $props();
  let notifications = $state(false);
</script>

<Popover
  label="Filter settings"
  {side}
  {align}
  triggerClass="p-button p-button--secondary p-button--40"
>
  {#snippet trigger()}
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
      ><path d="M10 5H3" /><path d="M12 19H3" /><path d="M14 3v4" /><path d="M16 17v4" /><path
        d="M21 12h-9"
      /><path d="M21 19h-5" /><path d="M21 5h-7" /><path d="M8 10v4" /><path d="M8 12H3" /></svg
    >
    Filters
  {/snippet}
  <h3>A little more control</h3>
  <p>Show notifications in your personal feed.</p>
  <div class="row">
    <Switch label="Popover notifications" bind:checked={notifications} />
    <span>Notifications</span>
  </div>
</Popover>

<style>
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    line-height: 23px;
    color: var(--portal-muted);
  }
  .row {
    display: flex;
    align-items: center;
    gap: 14px;
  }
</style>
