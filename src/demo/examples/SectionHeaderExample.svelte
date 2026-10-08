<script lang="ts">
  import { Badge, SectionHeader } from '$lib';
  let { description = true, action = true }: { description?: boolean; action?: boolean } = $props();
</script>

{#snippet featured()}<Badge variant="spotlight">Featured</Badge>{/snippet}

<SectionHeader
  title="Your collection"
  description={description ? 'Made for you.' : undefined}
  action={action ? featured : undefined}
/>
