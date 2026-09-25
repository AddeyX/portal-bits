<script lang="ts">
  import { page } from '$app/state';
  import { AuthFrame, SectionHeader, Input, Checkbox, Select, Button, Alert } from '$lib';
  import { Aperture } from '@lucide/svelte';
  let size: 'compact' | 'reading' = $derived(
    page.url.searchParams.get('size') === 'reading' ? 'reading' : 'compact',
  );
  let title = $state('');
  let category = $state('');
  let agreed = $state(false);
  let error = $state('');
</script>

<AuthFrame {size} brandHref="/components">
  {#snippet brand()}<Aperture size={27} /><span>Example Studio</span>{/snippet}
  {#if size === 'reading'}
    <SectionHeader
      title="Demo terms"
      description="Synthetic reading content. No account or network calls."
    />
    <p>
      This frame leaves the document structure to its consumer. Use it for a short task or a page of
      reading.
    </p>
    <p>
      The brand above returns to the component gallery. This preview uses Inter as its font
      fallback.
    </p>
    <a href="/auth-preview">Back to the form</a>
  {:else}
    <SectionHeader
      title="Create a draft"
      description="Synthetic form. Nothing is sent or stored."
    />
    <form
      onsubmit={(event) => {
        event.preventDefault();
        error = 'This demo cannot save drafts. Try again to repeat the local action.';
      }}
    >
      <Input label="Draft title" bind:value={title} required name="title" />
      <Select
        label="Category"
        bind:value={category}
        name="category"
        required
        placeholder="Choose a category"
        options={[
          { value: 'notes', label: 'Notes' },
          { value: 'ideas', label: 'Ideas' },
        ]}
      />
      <Checkbox bind:checked={agreed} required name="terms">
        {#snippet label()}I agree to the <a href="/auth-preview?size=reading">demo terms</a
          >.{/snippet}
      </Checkbox>
      {#if error}<Alert message={error} />{/if}
      <Button type="submit" variant="primary">Create draft</Button>
      {#if error}<Button variant="quiet" onclick={() => (error = '')}>Clear message</Button>{/if}
    </form>
  {/if}
  <p class="p-description">Adaptation · unmeasured layout and controls · Inter fallback</p>
</AuthFrame>

<style>
  form {
    display: grid;
    gap: 16px;
  }
</style>
