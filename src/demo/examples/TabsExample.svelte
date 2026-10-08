<script lang="ts">
  import { Tabs } from '$lib';
  let { disabled = false }: { disabled?: boolean } = $props();
  let current = $state('overview');
</script>

{#snippet overview()}
  <p>Three drafts are in review. The next one is due on Friday.</p>
{/snippet}
{#snippet activity()}
  <p>Sam left two comments on the cover layout this morning.</p>
{/snippet}
{#snippet settings()}
  <p>Reviews close automatically after seven days.</p>
{/snippet}

<div class="frame">
  <Tabs
    label="Project sections"
    bind:value={current}
    items={[
      { value: 'overview', label: 'Overview', content: overview },
      { value: 'activity', label: 'Activity', content: activity },
      { value: 'settings', label: 'Settings', content: settings, disabled },
    ]}
  />
</div>

<style>
  .frame {
    width: 420px;
    max-width: 100%;
  }
  p {
    margin: 0;
    color: var(--portal-muted);
  }
</style>
