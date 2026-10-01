import type { PreviewControl, PreviewSettings } from './types';

export type Variation = {
  defaults: PreviewSettings;
  controls: PreviewControl[];
  /** Controls that do not apply to the current settings, keyed by control, with the reason. */
  unavailable?: (settings: PreviewSettings) => Record<string, string>;
};

/** The setting when it is one of the allowed values, otherwise the fallback. */
export function pick<T extends string | number>(
  settings: PreviewSettings,
  key: string,
  allowed: readonly T[],
  fallback: T,
): T {
  const value = settings[key];
  return allowed.find((option) => option === value) ?? fallback;
}

export function enabled(settings: PreviewSettings, key: string) {
  return settings[key] === true;
}

function choice(
  key: string,
  label: string,
  values: readonly (string | number)[],
  format: (value: string | number) => string = String,
): PreviewControl {
  return {
    key,
    label,
    kind: 'choice',
    options: values.map((value) => ({ label: format(value), value })),
  };
}

function flag(key: string, label: string): PreviewControl {
  return { key, label, kind: 'boolean' };
}

const media = ['image', 'fallback'] as const;
const mediaControl = choice('media', 'Media', media, (value) =>
  value === 'image' ? 'Image' : 'Fallback',
);
const contentLengths = ['short', 'wrapping'] as const;
const contentControl = choice('content', 'Content', contentLengths, (value) =>
  value === 'short' ? 'Short' : 'Wrapping',
);

export const buttonVariants = ['primary', 'secondary', 'green', 'quiet'] as const;
export const buttonSizes = [32, 40, 48] as const;
export const buttonDefaults: PreviewSettings = {
  variant: 'primary',
  size: 40,
  disabled: false,
  icon: false,
};
export const buttonControls: PreviewControl[] = [
  {
    key: 'variant',
    label: 'Variant',
    kind: 'choice',
    options: ['primary', 'secondary', 'green', 'quiet'].map((value) => ({ label: value, value })),
  },
  {
    key: 'size',
    label: 'Size',
    kind: 'choice',
    options: [32, 40, 48].map((value) => ({ label: `${value}px`, value })),
  },
  { key: 'disabled', label: 'Disabled', kind: 'boolean' },
  { key: 'icon', label: 'Show icon', kind: 'boolean' },
];
export function readButton(settings: PreviewSettings) {
  return {
    variant: pick(settings, 'variant', buttonVariants, 'primary'),
    size: pick(settings, 'size', buttonSizes, 40),
    disabled: enabled(settings, 'disabled'),
    icon: enabled(settings, 'icon'),
  };
}

export const iconButtonVariants = ['primary', 'secondary', 'green'] as const;
export function readIconButton(settings: PreviewSettings) {
  return {
    variant: pick(settings, 'variant', iconButtonVariants, 'secondary'),
    size: pick(settings, 'size', buttonSizes, 40),
    disabled: enabled(settings, 'disabled'),
  };
}

export function readField(settings: PreviewSettings) {
  return {
    invalid: enabled(settings, 'invalid'),
    disabled: enabled(settings, 'disabled'),
    required: enabled(settings, 'required'),
  };
}

export const avatarSizes = [32, 40, 56] as const;
export const avatarMedia = ['image', 'broken', 'none'] as const;
export function readAvatar(settings: PreviewSettings) {
  return {
    size: pick(settings, 'size', avatarSizes, 40),
    media: pick(settings, 'media', avatarMedia, 'image'),
  };
}

export const badgeVariants = ['neutral', 'spotlight', 'success'] as const;

export const popoverSides = ['top', 'right', 'bottom', 'left'] as const;
export const popoverAligns = ['start', 'center', 'end'] as const;
export function readPopover(settings: PreviewSettings) {
  return {
    side: pick(settings, 'side', popoverSides, 'bottom'),
    align: pick(settings, 'align', popoverAligns, 'end'),
  };
}

export function readMedia(settings: PreviewSettings) {
  return pick(settings, 'media', media, 'image');
}

export const articleActions = ['Read', 'Open'] as const;

export const carouselLayouts = ['responsive', 'carousel'] as const;

export function readContent(settings: PreviewSettings) {
  return pick(settings, 'content', contentLengths, 'short');
}

const fieldControls = [
  flag('invalid', 'Invalid'),
  flag('disabled', 'Disabled'),
  flag('required', 'Required'),
];
const fieldDefaults = { invalid: false, disabled: false, required: false };

export const variations = {
  button: {
    defaults: buttonDefaults,
    controls: buttonControls,
    unavailable: (settings): Record<string, string> =>
      readButton(settings).variant === 'quiet'
        ? { size: 'Size does not apply to quiet. Quiet stays inline with the text around it.' }
        : {},
  },
  'icon-button': {
    defaults: { variant: 'secondary', size: 40, disabled: false },
    controls: [
      choice('variant', 'Variant', iconButtonVariants),
      choice('size', 'Size', buttonSizes, (value) => `${value}px`),
      flag('disabled', 'Disabled'),
    ],
  },
  input: { defaults: fieldDefaults, controls: fieldControls },
  select: { defaults: fieldDefaults, controls: fieldControls },
  checkbox: { defaults: fieldDefaults, controls: fieldControls },
  toggle: { defaults: { disabled: false }, controls: [flag('disabled', 'Disabled')] },
  'toggle-group': {
    defaults: { compact: false, disabled: false },
    controls: [flag('compact', 'Compact'), flag('disabled', 'Disabled')],
  },
  switch: { defaults: { disabled: false }, controls: [flag('disabled', 'Disabled')] },
  avatar: {
    defaults: { size: 40, media: 'image' },
    controls: [
      choice('size', 'Size', avatarSizes, (value) => `${value}px`),
      choice('media', 'Media', avatarMedia, (value) =>
        value === 'image' ? 'Image' : value === 'broken' ? 'Failed image' : 'No image',
      ),
    ],
  },
  badge: {
    defaults: { variant: 'neutral' },
    controls: [choice('variant', 'Variant', badgeVariants)],
  },
  dialog: { defaults: { description: true }, controls: [flag('description', 'Description')] },
  popover: {
    defaults: { side: 'bottom', align: 'end' },
    controls: [choice('side', 'Side', popoverSides), choice('align', 'Align', popoverAligns)],
  },
  tooltip: {
    defaults: { text: 'short' },
    controls: [
      choice('text', 'Text', ['short', 'long'], (value) => (value === 'short' ? 'Short' : 'Long')),
    ],
  },
  'app-card': {
    defaults: { media: 'image', spotlight: false, action: false },
    controls: [mediaControl, flag('spotlight', 'Spotlight'), flag('action', 'Show action')],
  },
  'article-card': {
    defaults: { media: 'image', actionLabel: 'Read' },
    controls: [mediaControl, choice('actionLabel', 'Action label', articleActions)],
  },
  'feature-card': { defaults: { media: 'image' }, controls: [mediaControl] },
  carousel: {
    defaults: { layout: 'responsive' },
    controls: [
      choice('layout', 'Layout', carouselLayouts, (value) =>
        value === 'responsive' ? 'Responsive' : 'Carousel',
      ),
    ],
  },
  'section-header': {
    defaults: { description: true, action: true },
    controls: [flag('description', 'Description'), flag('action', 'Action')],
  },
  'empty-state': {
    defaults: { description: true, icon: true, action: false },
    controls: [flag('description', 'Description'), flag('icon', 'Icon'), flag('action', 'Action')],
  },
  alert: { defaults: {}, controls: [] },
  'row-list': { defaults: { content: 'short' }, controls: [contentControl] },
  row: { defaults: { content: 'wrapping' }, controls: [contentControl] },
  'portal-shell': { defaults: {}, controls: [] },
  'sidebar-nav': { defaults: { collapsed: false }, controls: [flag('collapsed', 'Collapsed')] },
  'mobile-nav': { defaults: {}, controls: [] },
  'top-bar': {
    defaults: { breadcrumb: true, actions: true },
    controls: [flag('breadcrumb', 'Breadcrumb'), flag('actions', 'Actions')],
  },
  'auth-frame': { defaults: {}, controls: [] },
  'floating-nav': { defaults: { actions: true }, controls: [flag('actions', 'Actions')] },
  'color-selector': { defaults: {}, controls: [] },
} satisfies Record<string, Variation>;

export type VariationSlug = keyof typeof variations;

/** Fresh settings for every preview, copied so edits never touch the defaults. */
export function initialSettings() {
  return Object.fromEntries(
    Object.entries(variations).map(([slug, variation]) => [slug, { ...variation.defaults }]),
  ) as Record<VariationSlug, PreviewSettings>;
}
