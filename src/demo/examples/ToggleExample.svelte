<script lang="ts">
  import { Toggle } from '$lib';
  let { disabled = false }: { disabled?: boolean } = $props();
  let pressed = $state(false);
</script>

<div class="row">
  <Toggle label="Favorite example" bind:pressed {disabled}>
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill={pressed ? 'currentColor' : 'none'}
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      ><path
        d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
      /></svg
    >
  </Toggle>
  <span>{pressed ? 'Added to favorites' : 'Save a favorite'}</span>
</div>

<style>
  .row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
  }
</style>
