<script lang="ts">
  import { Separator } from '$lib';
  let { orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' } = $props();
</script>

<div class="card" data-orientation={orientation}>
  <div>
    <strong>Studio plan</strong>
    <span>Five seats, shared drafts</span>
  </div>
  <Separator {orientation} />
  <nav aria-label="Plan links">
    <a href="#billing">Billing</a>
    <Separator orientation="vertical" />
    <a href="#seats">Seats</a>
    <Separator orientation="vertical" />
    <a href="#history">History</a>
  </nav>
</div>

<style>
  .card {
    display: grid;
    gap: 16px;
    width: 360px;
    max-width: 100%;
    font-size: 14px;
  }
  .card[data-orientation='vertical'] {
    display: flex;
    align-items: center;
    width: auto;
  }
  div > div {
    display: grid;
    gap: 2px;
  }
  strong {
    font-weight: 500;
  }
  span {
    color: var(--portal-muted);
  }
  nav {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 20px;
  }
  a {
    color: inherit;
  }
</style>
