<script lang="ts">
  import { Badge, Button, Row, RowList } from '$lib';
  let { content = 'short' }: { content?: 'short' | 'wrapping' } = $props();
  let saved = $state(false);
</script>

<RowList aria-label="Example records">
  {#if content === 'short'}
    <Row>
      <a href="#field-notes">Field notes</a>
      <Badge>Draft</Badge>
      <Button variant="quiet" onclick={() => (saved = !saved)}>{saved ? 'Saved' : 'Save'}</Button>
    </Row>
  {:else}
    <Row>
      <span>A longer synthetic record wraps naturally when the available space is narrow.</span>
      <Badge>Draft</Badge>
    </Row>
  {/if}
  <Row><span>A single cell can explain this record.</span></Row>
</RowList>
