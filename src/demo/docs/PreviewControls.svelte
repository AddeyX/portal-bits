<script lang="ts">
  import { Switch } from '$lib';
  import type { PreviewControl, PreviewSettings } from './types';

  let {
    controls,
    settings = $bindable(),
    unavailable = {},
  }: {
    controls: PreviewControl[];
    settings: PreviewSettings;
    unavailable?: Record<string, string>;
  } = $props();

  const id = $props.id();

  function update(key: string, value: string | number | boolean) {
    settings = { ...settings, [key]: value };
  }

  function choose(control: Extract<PreviewControl, { kind: 'choice' }>, raw: string) {
    const option = control.options.find((item) => String(item.value) === raw);
    if (option) update(control.key, option.value);
  }
</script>

{#if controls.length}
  <fieldset class="doc-controls">
    <legend>Variations</legend>
    {#each controls as control (control.key)}
      {@const controlId = `${id}-${control.key}`}
      {@const reason = unavailable[control.key]}
      {#if control.kind === 'choice'}
        <div class="doc-control">
          <label for={controlId}>{control.label}</label>
          <select
            id={controlId}
            value={String(settings[control.key])}
            disabled={!!reason}
            aria-describedby={reason ? `${controlId}-reason` : undefined}
            onchange={(event) => choose(control, event.currentTarget.value)}
          >
            {#each control.options as option (option.value)}
              <option value={String(option.value)}>{option.label}</option>
            {/each}
          </select>
          {#if reason}<p class="doc-control-reason" id="{controlId}-reason">{reason}</p>{/if}
        </div>
      {:else}
        <div class="doc-control doc-control--switch">
          <Switch
            id={controlId}
            label={control.label}
            checked={settings[control.key] === true}
            onCheckedChange={(checked) => update(control.key, checked)}
          />
          <label for={controlId}>{control.label}</label>
        </div>
      {/if}
    {/each}
  </fieldset>
{/if}
