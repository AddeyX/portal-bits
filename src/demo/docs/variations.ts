import type { PreviewControl, PreviewSettings } from './types';

export type Variation = {
  defaults: PreviewSettings;
  controls: PreviewControl[];
  /** Controls that do not apply to the current settings, keyed by control, with the reason. */
  unavailable?: (settings: PreviewSettings) => Record<string, string>;
  code: (settings: PreviewSettings) => string;
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

const entities: Record<string, string> = {
  '&': '&amp;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;',
  '{': '&#123;',
  '}': '&#125;',
};

/** A double-quoted attribute value that stays literal in Svelte markup. */
export function quote(value: string) {
  return `"${value.replace(/[&"<>{}]/g, (char) => entities[char])}"`;
}

function tag(name: string, attributes: (string | false)[], children?: string) {
  const open = [name, ...attributes.filter(Boolean)].join(' ');
  if (children === undefined) return `<${open} />`;
  return `<${open}>\n  ${children.replaceAll('\n', '\n  ')}\n</${name}>`;
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
export const badgeText = { neutral: 'Neutral', spotlight: 'Featured', success: 'Available' };

export const popoverSides = ['top', 'right', 'bottom', 'left'] as const;
export const popoverAligns = ['start', 'center', 'end'] as const;
export function readPopover(settings: PreviewSettings) {
  return {
    side: pick(settings, 'side', popoverSides, 'bottom'),
    align: pick(settings, 'align', popoverAligns, 'end'),
  };
}

export const tooltipText = {
  short: 'Keyboard navigation',
  long: 'Every control in this library supports keyboard navigation',
};
export function readTooltip(settings: PreviewSettings) {
  return tooltipText[pick(settings, 'text', ['short', 'long'] as const, 'short')];
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

function fixed(code: string): Variation {
  return { defaults: {}, controls: [], code: () => code };
}

export const variations = {
  button: {
    defaults: buttonDefaults,
    controls: buttonControls,
    unavailable: (settings): Record<string, string> =>
      readButton(settings).variant === 'quiet'
        ? { size: 'Size does not apply to quiet. Quiet stays inline with the text around it.' }
        : {},
    code: (settings) => {
      const { variant, size, disabled, icon } = readButton(settings);
      return tag(
        'Button',
        [
          `variant=${quote(variant)}`,
          variant !== 'quiet' && `size={${size}}`,
          disabled && 'disabled',
          'onclick={save}',
        ],
        `${icon ? '<Check /> ' : ''}Save changes`,
      );
    },
  },
  'icon-button': {
    defaults: { variant: 'secondary', size: 40, disabled: false },
    controls: [
      choice('variant', 'Variant', iconButtonVariants),
      choice('size', 'Size', buttonSizes, (value) => `${value}px`),
      flag('disabled', 'Disabled'),
    ],
    code: (settings) => {
      const { variant, size, disabled } = readIconButton(settings);
      return tag(
        'IconButton',
        [
          'label="Add item"',
          `variant=${quote(variant)}`,
          `size={${size}}`,
          disabled && 'disabled',
          'onclick={add}',
        ],
        '<Plus />',
      );
    },
  },
  input: {
    defaults: fieldDefaults,
    controls: fieldControls,
    code: (settings) => {
      const { invalid, disabled, required } = readField(settings);
      const input = tag('Input', [
        'label="Email"',
        'type="email"',
        'bind:value',
        invalid && 'invalid',
        invalid && 'aria-describedby="email-error"',
        required && 'required',
        disabled && 'disabled',
      ]);
      return invalid
        ? `${input}\n<p id="email-error">Enter an email address, such as alex@example.com.</p>`
        : input;
    },
  },
  select: {
    defaults: fieldDefaults,
    controls: fieldControls,
    code: (settings) => {
      const { invalid, disabled, required } = readField(settings);
      const select = tag('Select', [
        'label="Record category"',
        'bind:value',
        'placeholder="Choose a category"',
        '{options}',
        invalid && 'invalid',
        invalid && 'aria-describedby="category-error"',
        required && 'required',
        disabled && 'disabled',
      ]);
      return invalid ? `${select}\n<p id="category-error">Choose a category.</p>` : select;
    },
  },
  checkbox: {
    defaults: fieldDefaults,
    controls: fieldControls,
    code: (settings) => {
      const { invalid, disabled, required } = readField(settings);
      const checkbox = tag(
        'Checkbox',
        [
          'bind:checked',
          invalid && 'invalid',
          invalid && 'aria-describedby="terms-error"',
          required && 'required',
          disabled && 'disabled',
        ],
        '{#snippet label()}I agree to the <a href="/terms">demo terms</a>.{/snippet}',
      );
      return invalid
        ? `${checkbox}\n<p id="terms-error">Agree to the demo terms to continue.</p>`
        : checkbox;
    },
  },
  toggle: {
    defaults: { disabled: false },
    controls: [flag('disabled', 'Disabled')],
    code: (settings) =>
      tag(
        'Toggle',
        ['label="Favorite example"', 'bind:pressed', enabled(settings, 'disabled') && 'disabled'],
        '<Heart />',
      ),
  },
  'toggle-group': {
    defaults: { compact: false, disabled: false },
    controls: [flag('compact', 'Compact'), flag('disabled', 'Disabled')],
    code: (settings) =>
      tag('ToggleGroup', [
        'label="Example category"',
        '{items}',
        'bind:value',
        enabled(settings, 'compact') && 'compact',
        enabled(settings, 'disabled') && 'disabled',
      ]),
  },
  switch: {
    defaults: { disabled: false },
    controls: [flag('disabled', 'Disabled')],
    code: (settings) =>
      tag('Switch', [
        'label="Enable notifications"',
        'bind:checked',
        enabled(settings, 'disabled') && 'disabled',
      ]),
  },
  avatar: {
    defaults: { size: 40, media: 'image' },
    controls: [
      choice('size', 'Size', avatarSizes, (value) => `${value}px`),
      choice('media', 'Media', avatarMedia, (value) =>
        value === 'image' ? 'Image' : value === 'broken' ? 'Failed image' : 'No image',
      ),
    ],
    code: (settings) => {
      const { size, media } = readAvatar(settings);
      return tag('Avatar', [
        'alt="Orbit Studio"',
        media === 'image' && 'src={image}',
        media === 'broken' && 'src="/art/missing.svg"',
        `size={${size}}`,
      ]);
    },
  },
  badge: {
    defaults: { variant: 'neutral' },
    controls: [choice('variant', 'Variant', badgeVariants)],
    code: (settings) => {
      const variant = pick(settings, 'variant', badgeVariants, 'neutral');
      return `<Badge variant=${quote(variant)}>${badgeText[variant]}</Badge>`;
    },
  },
  dialog: {
    defaults: { description: true },
    controls: [flag('description', 'Description')],
    code: (settings) =>
      tag(
        'Dialog',
        [
          'title="Make yourself at home"',
          enabled(settings, 'description') &&
            'description="Edit your display name. This example stays in your browser."',
          'bind:open',
        ],
        '{#snippet trigger()}Edit profile{/snippet}\n<Input label="Display name" bind:value={name} />',
      ),
  },
  popover: {
    defaults: { side: 'bottom', align: 'end' },
    controls: [choice('side', 'Side', popoverSides), choice('align', 'Align', popoverAligns)],
    code: (settings) => {
      const { side, align } = readPopover(settings);
      return tag(
        'Popover',
        [
          'label="Filter settings"',
          `side=${quote(side)}`,
          `align=${quote(align)}`,
          'triggerClass="p-button p-button--secondary p-button--40"',
        ],
        '{#snippet trigger()}<SlidersHorizontal /> Filters{/snippet}\n<p>Your panel content</p>',
      );
    },
  },
  tooltip: {
    defaults: { text: 'short' },
    controls: [
      choice('text', 'Text', ['short', 'long'], (value) => (value === 'short' ? 'Short' : 'Long')),
    ],
    code: (settings) => tag('Tooltip', [`text=${quote(readTooltip(settings))}`], '<Info />'),
  },
  'app-card': {
    defaults: { media: 'image', spotlight: false, action: false },
    controls: [mediaControl, flag('spotlight', 'Spotlight'), flag('action', 'Show action')],
    code: (settings) =>
      tag('AppCard', [
        'title="Orbit Studio"',
        'category="Creative"',
        'description="Your next idea starts here."',
        readMedia(settings) === 'image' && 'image={cover}',
        readMedia(settings) === 'image' && 'imageAlt="Orbit geometric poster"',
        enabled(settings, 'spotlight') && 'spotlight',
        enabled(settings, 'action') && 'href="/apps/orbit"',
        'bind:favorite',
      ]),
  },
  'article-card': {
    defaults: { media: 'image', actionLabel: 'Read' },
    controls: [mediaControl, choice('actionLabel', 'Action label', articleActions)],
    code: (settings) =>
      tag('ArticleCard', [
        'title="A field guide to small ideas"',
        'href="/notes"',
        readMedia(settings) === 'image' && 'image={cover}',
        readMedia(settings) === 'image' && 'imageAlt="Geometric illustration"',
        `actionLabel=${quote(pick(settings, 'actionLabel', articleActions, 'Read'))}`,
      ]),
  },
  'feature-card': {
    defaults: { media: 'image' },
    controls: [mediaControl],
    code: (settings) =>
      tag('FeatureCard', [
        'title="Room to explore"',
        'description="Give each direction the space it needs to grow."',
        readMedia(settings) === 'image' && 'image={cover}',
        readMedia(settings) === 'image' && 'imageAlt="Colorful geometric illustration"',
      ]),
  },
  carousel: {
    defaults: { layout: 'responsive' },
    controls: [
      choice('layout', 'Layout', carouselLayouts, (value) =>
        value === 'responsive' ? 'Responsive' : 'Carousel',
      ),
    ],
    code: (settings) =>
      tag(
        'Carousel',
        [
          'label="Studio journal"',
          '{items}',
          `layout=${quote(pick(settings, 'layout', carouselLayouts, 'responsive'))}`,
        ],
        '{#snippet item(story)}\n  <ArticleCard title={story.label} href={story.href} image={story.image} />\n{/snippet}',
      ),
  },
  'section-header': {
    defaults: { description: true, action: true },
    controls: [flag('description', 'Description'), flag('action', 'Action')],
    code: (settings) => {
      const attributes = [
        'title="Your collection"',
        enabled(settings, 'description') && 'description="Made for you."',
      ];
      return enabled(settings, 'action')
        ? tag(
            'SectionHeader',
            attributes,
            '{#snippet action()}<Badge variant="spotlight">Featured</Badge>{/snippet}',
          )
        : tag('SectionHeader', attributes);
    },
  },
  'empty-state': {
    defaults: { description: true, icon: true, action: false },
    controls: [flag('description', 'Description'), flag('icon', 'Icon'), flag('action', 'Action')],
    code: (settings) => {
      const attributes = [
        'title="Nothing saved yet"',
        enabled(settings, 'description') &&
          'description="Your collection starts with a single favorite."',
      ];
      const children = [
        enabled(settings, 'icon') && '{#snippet icon()}<Heart />{/snippet}',
        enabled(settings, 'action') &&
          '{#snippet action()}<Button variant="green" href="/components">Browse components</Button>{/snippet}',
      ].filter(Boolean);
      return children.length
        ? tag('EmptyState', attributes, children.join('\n'))
        : tag('EmptyState', attributes);
    },
  },
  alert: fixed('{#if error}<Alert message={error} />{/if}'),
  'row-list': {
    defaults: { content: 'short' },
    controls: [contentControl],
    code: (settings) =>
      tag(
        'RowList',
        ['aria-label="Example records"'],
        readContent(settings) === 'short'
          ? '<Row><a href="/notes">Field notes</a><Badge>Draft</Badge></Row>'
          : '<Row>\n  <span>A longer synthetic record wraps naturally when space is narrow.</span>\n  <Badge>Draft</Badge>\n</Row>',
      ),
  },
  row: {
    defaults: { content: 'wrapping' },
    controls: [contentControl],
    code: (settings) =>
      readContent(settings) === 'short'
        ? '<Row><span>Field notes</span><Badge>Ready</Badge></Row>'
        : tag(
            'Row',
            [],
            '<span>A longer synthetic record wraps naturally when space is narrow.</span>\n<Badge>Ready</Badge>',
          ),
  },
  'portal-shell': fixed(`<PortalShell items={navigation} active={pathname} bind:collapsed>
  {#snippet topbar()}
    <TopBar breadcrumb="Discover" />
  {/snippet}
  <YourPage />
</PortalShell>`),
  'sidebar-nav': {
    defaults: { collapsed: false },
    controls: [flag('collapsed', 'Collapsed')],
    code: (settings) =>
      tag('SidebarNav', [
        '{items}',
        'active={pathname}',
        enabled(settings, 'collapsed') && 'collapsed',
      ]),
  },
  'mobile-nav': fixed('<MobileNav items={navigation} active={pathname} />'),
  'top-bar': {
    defaults: { breadcrumb: true, actions: true },
    controls: [flag('breadcrumb', 'Breadcrumb'), flag('actions', 'Actions')],
    code: (settings) => {
      const attributes = [enabled(settings, 'breadcrumb') && 'breadcrumb="Components"'];
      return enabled(settings, 'actions')
        ? tag(
            'TopBar',
            attributes,
            '{#snippet actions()}<Button size={32}><Bell /> Alerts</Button>{/snippet}',
          )
        : tag('TopBar', attributes);
    },
  },
  'auth-frame': fixed(`<AuthFrame brandHref="/" size="compact">
  {#snippet brand()}Portal{/snippet}
  {#snippet children()}<form>…</form>{/snippet}
</AuthFrame>`),
  'floating-nav': {
    defaults: { actions: true },
    controls: [flag('actions', 'Actions')],
    code: (settings) =>
      tag(
        'FloatingNav',
        ['label="Example"'],
        [
          '{#snippet brand()}<a href="/">Home</a>{/snippet}',
          '{#snippet items()}<a href="/docs" aria-current="page">Docs</a>{/snippet}',
          enabled(settings, 'actions') &&
            '{#snippet actions()}<a href="https://github.com/example">GitHub</a>{/snippet}',
        ]
          .filter(Boolean)
          .join('\n'),
      ),
  },
  'color-selector': fixed('<ColorSelector bind:value={accent} />'),
} satisfies Record<string, Variation>;

export type VariationSlug = keyof typeof variations;

/** Fresh settings for every preview, copied so edits never touch the defaults. */
export function initialSettings() {
  return Object.fromEntries(
    Object.entries(variations).map(([slug, variation]) => [slug, { ...variation.defaults }]),
  ) as Record<VariationSlug, PreviewSettings>;
}
