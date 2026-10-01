<script lang="ts">
  import { Badge } from '$lib';
  let { variant = 'neutral' }: { variant?: 'neutral' | 'spotlight' | 'success' } = $props();
  const text = { neutral: 'Neutral', spotlight: 'Featured', success: 'Available' };
</script>

<Badge {variant}>{text[variant]}</Badge>
