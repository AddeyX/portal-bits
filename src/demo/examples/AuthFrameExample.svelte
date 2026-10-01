<script lang="ts">
  import { AuthFrame, Button, Input, SectionHeader } from '$lib';
  let title = $state('');
</script>

<!-- size="reading" selects the wider layout for documents. -->
<AuthFrame size="compact" brandHref="#home">
  {#snippet brand()}<span>Example Studio</span>{/snippet}
  <SectionHeader title="Create a draft" description="Synthetic form. Nothing is sent or stored." />
  <form onsubmit={(event) => event.preventDefault()}>
    <Input label="Draft title" bind:value={title} required name="title" />
    <Button variant="green" type="submit">Save draft</Button>
  </form>
</AuthFrame>
