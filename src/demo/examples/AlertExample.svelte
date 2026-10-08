<script lang="ts">
  import { Alert, Button } from '$lib';
  let message = $state('');
</script>

<div class="field">
  <Button onclick={() => (message = message ? '' : 'Enter a display name before saving.')}>
    {message ? 'Clear alert' : 'Show alert'}
  </Button>
  {#if message}<Alert {message} />{/if}
</div>

<style>
  .field {
    max-width: 340px;
  }
</style>
