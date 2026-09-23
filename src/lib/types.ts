import type { Component } from 'svelte';
export type NavItem = {
  href: string;
  label: string;
  icon?: Component<{ size?: number | string; strokeWidth?: number | string }>;
  count?: string;
};
