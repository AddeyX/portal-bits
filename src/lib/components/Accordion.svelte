<script lang="ts">
  import { Accordion } from 'bits-ui';
  import { ChevronDown } from '@lucide/svelte';
  import type { AccordionItem } from '../types';
  let {
    items,
    value = $bindable([]),
    multiple = false,
    headingLevel = 3,
    class: className = '',
  }: {
    items: AccordionItem[];
    value?: string[];
    multiple?: boolean;
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    class?: string;
  } = $props();
</script>

{#snippet rows()}
  {#each items as item (item.value)}
    <Accordion.Item value={item.value} disabled={item.disabled} class="p-accordion-item">
      <Accordion.Header level={headingLevel} class="p-accordion-header">
        <Accordion.Trigger class="p-accordion-trigger">
          <span>{item.title}</span>
          <span class="p-accordion-chevron" aria-hidden="true"><ChevronDown size={16} /></span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content class="p-accordion-content">
        <div class="p-accordion-body">{@render item.content()}</div>
      </Accordion.Content>
    </Accordion.Item>
  {/each}
{/snippet}

{#if multiple}
  <Accordion.Root type="multiple" bind:value class={`p-accordion ${className}`}>
    {@render rows()}
  </Accordion.Root>
{:else}
  <Accordion.Root
    type="single"
    bind:value={() => value[0] ?? '', (next) => (value = next ? [next] : [])}
    class={`p-accordion ${className}`}
  >
    {@render rows()}
  </Accordion.Root>
{/if}
