<script lang="ts">
  import { Button, EmptyState } from '$lib';
  let {
    description = true,
    icon = true,
    action = false,
  }: { description?: boolean; icon?: boolean; action?: boolean } = $props();
</script>

{#snippet heart()}
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    ><path
      d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
    /></svg
  >
{/snippet}
{#snippet browse()}
  <Button variant="green" href="#browse-components">Browse components</Button>
{/snippet}

<EmptyState
  title="Nothing saved yet"
  description={description ? 'Your collection starts with a single favorite.' : undefined}
  icon={icon ? heart : undefined}
  action={action ? browse : undefined}
/>
