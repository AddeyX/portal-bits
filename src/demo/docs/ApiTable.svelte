<script lang="ts">
  import type { ApiProp } from './reference';

  let { label, rows }: { label: string; rows: ApiProp[] } = $props();
</script>

<!-- A wide table scrolls inside its own region, which needs focus so a keyboard can reach it. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="api-scroll" role="region" aria-label="{label} table" tabindex="0">
  <table class="api-table" aria-label={label}>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th scope="col">Default</th>
        <th scope="col">Required</th>
        <th scope="col">Binding</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row (row.name)}
        <tr>
          <th scope="row"><code>{row.name}</code></th>
          <td class="api-type"><code>{row.type}</code></td>
          <td
            >{#if row.defaultValue}<code>{row.defaultValue}</code>{:else}None{/if}</td
          >
          <td>{row.required ? 'Yes' : 'No'}</td>
          <td>{row.bindable ? 'Bindable' : 'One-way'}</td>
          <td class="api-description">{row.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .api-scroll {
    max-width: 100%;
    overflow-x: auto;
    border: 1px solid var(--portal-border);
    border-radius: 16px;
    background: var(--portal-surface);
  }

  .api-scroll:focus-visible {
    outline: 2px solid var(--portal-ink);
    outline-offset: 2px;
  }

  .api-table {
    width: 100%;
    min-width: 760px;
    border-collapse: collapse;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }

  th,
  td {
    padding: 12px 14px;
    vertical-align: top;
    border-top: 1px solid var(--portal-border);
  }

  thead th {
    border-top: 0;
    color: var(--portal-muted);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  tbody th {
    font-weight: 500;
    white-space: nowrap;
  }

  code {
    font: 12px/20px var(--portal-mono);
  }

  .api-type {
    min-width: 12rem;
    max-width: 20rem;
  }

  .api-type code {
    overflow-wrap: anywhere;
  }

  .api-description {
    min-width: 14rem;
    color: var(--portal-muted);
  }
</style>
