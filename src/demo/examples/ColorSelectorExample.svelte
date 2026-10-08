<script lang="ts">
  import { ColorSelector } from '$lib';
  let accent = $state('#19e783');
</script>

<div class="row">
  <ColorSelector bind:value={accent} />
  <span>{accent.toUpperCase()}</span>
</div>

<style>
  .row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
  }
</style>
