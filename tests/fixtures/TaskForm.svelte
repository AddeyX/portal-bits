<script lang="ts">
  import { Checkbox, Select, RowList, Row, Button, Alert, AuthFrame } from '../../src/lib';
  let agreed = $state(false);
  let category = $state('');
  let attempts = $state(0);
  let { disabled = false } = $props();
</script>

<AuthFrame brandHref="#home">
  {#snippet brand()}Example Studio{/snippet}
  <form aria-label="Draft">
    <Checkbox bind:checked={agreed} {disabled} name="consent" required>
      {#snippet label()}Agree to <a href="#terms">terms</a>{/snippet}
    </Checkbox>
    <Select
      label="Category"
      bind:value={category}
      name="category"
      placeholder="Choose"
      options={[{ value: 'notes', label: 'Notes' }]}
    />
    <output>{agreed ? 'yes' : 'no'}:{category}</output>
    <Button
      type="button"
      onclick={() => {
        agreed = false;
        category = '';
      }}>Clear</Button
    >
    <RowList aria-label="Records"
      ><Row
        ><span>Draft</span><Button variant="quiet" {disabled} onclick={() => attempts++}
          >Retry</Button
        ></Row
      ></RowList
    >
    <Alert>Attempt <strong>{attempts}</strong></Alert>
  </form>
</AuthFrame>
