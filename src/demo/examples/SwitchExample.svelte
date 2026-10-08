<script lang="ts">
  import { Switch } from '$lib';
  let { disabled = false }: { disabled?: boolean } = $props();
  let checked = $state(false);
</script>

<div class="row">
  <Switch label="Enable notifications" bind:checked {disabled} />
  <span>Notifications {checked ? 'on' : 'off'}</span>
</div>

<style>
  .row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
  }
</style>
