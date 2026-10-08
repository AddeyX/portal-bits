<script lang="ts">
  import { Separator } from 'bits-ui';
  let {
    orientation = 'horizontal',
    decorative = true,
    class: className = '',
  }: {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
    class?: string;
  } = $props();
</script>

<Separator.Root {orientation} {decorative} class={`p-separator ${className}`} />
