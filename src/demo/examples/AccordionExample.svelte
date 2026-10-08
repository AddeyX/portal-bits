<script lang="ts">
  import { Accordion } from '$lib';
  let { multiple = false }: { multiple?: boolean } = $props();
  let open = $state(['shipping']);
</script>

{#snippet shipping()}
  Orders leave the studio within two working days. You get a note when yours is on its way.
{/snippet}
{#snippet returns()}
  Send anything back within 30 days. Prints need to arrive flat and unframed.
{/snippet}
{#snippet care()}
  Keep prints out of direct sun. A dry cloth is all the cleaning they need.
{/snippet}

<div class="frame">
  <Accordion
    bind:value={open}
    {multiple}
    items={[
      { value: 'shipping', title: 'When will my order ship?', content: shipping },
      { value: 'returns', title: 'Can I return a print?', content: returns },
      { value: 'care', title: 'How do I look after it?', content: care },
    ]}
  />
</div>

<style>
  .frame {
    width: 480px;
    max-width: 100%;
  }
</style>
