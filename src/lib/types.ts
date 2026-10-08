import type { Component, Snippet } from 'svelte';
export type NavItem = {
  href: string;
  label: string;
  icon?: Component<{ size?: number | string; strokeWidth?: number | string }>;
  count?: string;
};

export type SelectOption = { value: string; label: string; disabled?: boolean };

export type TabItem = { value: string; label: string; content: Snippet; disabled?: boolean };

export type AccordionItem = { value: string; title: string; content: Snippet; disabled?: boolean };

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type MenuEntry =
  | {
      type?: 'item';
      label: string;
      onSelect?: () => void;
      icon?: Component<{ size?: number | string }>;
      shortcut?: string;
      tone?: 'neutral' | 'danger';
      disabled?: boolean;
    }
  | { type: 'separator' };
