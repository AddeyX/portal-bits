<script lang="ts">
  import { Badge, Row, RowList } from '$lib';
  let { content = 'wrapping' }: { content?: 'short' | 'wrapping' } = $props();
</script>

<RowList aria-label="Example record">
  <Row>
    {#if content === 'short'}
      <span>Field notes</span>
    {:else}
      <span>A longer synthetic record wraps naturally when the available space is narrow.</span>
    {/if}
    <Badge>Ready</Badge>
  </Row>
</RowList>
