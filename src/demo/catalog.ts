export type ComponentDoc = {
  slug: string;
  title: string;
  description: string;
  group: string;
};

export const componentGroups = [
  'Buttons',
  'Inputs',
  'Selection',
  'Identity',
  'Overlays',
  'Cards',
  'Content',
  'Chrome',
] as const;

export const componentDocs: ComponentDoc[] = [
  {
    slug: 'button',
    title: 'Button',
    group: 'Buttons',
    description: 'Pill controls for the main action, a quieter alternative, and inline text.',
  },
  {
    slug: 'icon-button',
    title: 'IconButton',
    group: 'Buttons',
    description: 'An icon-only action with a required accessible name.',
  },
  {
    slug: 'input',
    title: 'Input',
    group: 'Inputs',
    description: 'A labeled field with invalid, disabled, and bound values.',
  },
  {
    slug: 'select',
    title: 'Select',
    group: 'Inputs',
    description: 'A native single-choice menu styled like the text field.',
  },
  {
    slug: 'checkbox',
    title: 'Checkbox',
    group: 'Selection',
    description: 'A labeled boolean. Links inside the label stay independent.',
  },
  {
    slug: 'toggle',
    title: 'Toggle',
    group: 'Selection',
    description: 'A pressable control for a single on or off state.',
  },
  {
    slug: 'toggle-group',
    title: 'ToggleGroup',
    group: 'Selection',
    description: 'One selected item at a time, with arrow-key movement.',
  },
  {
    slug: 'switch',
    title: 'Switch',
    group: 'Selection',
    description: 'A labeled on or off switch, including a disabled state.',
  },
  {
    slug: 'avatar',
    title: 'Avatar',
    group: 'Identity',
    description: 'A face, initials, or a fallback when the image is missing.',
  },
  {
    slug: 'badge',
    title: 'Badge',
    group: 'Identity',
    description: 'A short noninteractive label for status and emphasis.',
  },
  {
    slug: 'dialog',
    title: 'Dialog',
    group: 'Overlays',
    description: 'A focused panel with a title, Escape, and focus restoration.',
  },
  {
    slug: 'popover',
    title: 'Popover',
    group: 'Overlays',
    description: 'An anchored panel for a small amount of extra control.',
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    group: 'Overlays',
    description: 'A short hint on hover and keyboard focus.',
  },
  {
    slug: 'app-card',
    title: 'AppCard',
    group: 'Cards',
    description: 'A collection card with media, a favorite, and an optional action.',
  },
  {
    slug: 'article-card',
    title: 'ArticleCard',
    group: 'Cards',
    description: 'An editorial card with media, a title, and one link.',
  },
  {
    slug: 'feature-card',
    title: 'FeatureCard',
    group: 'Cards',
    description: 'A feature with media, a heading, and a short description.',
  },
  {
    slug: 'carousel',
    title: 'Carousel',
    group: 'Content',
    description: 'A horizontal collection with native scrolling and named controls.',
  },
  {
    slug: 'section-header',
    title: 'SectionHeader',
    group: 'Content',
    description: 'A heading, a description, and an optional action.',
  },
  {
    slug: 'empty-state',
    title: 'EmptyState',
    group: 'Content',
    description: 'A quiet explanation when a collection has nothing to show.',
  },
  {
    slug: 'alert',
    title: 'Alert',
    group: 'Content',
    description: 'A message announced when an action needs attention.',
  },
  {
    slug: 'row-list',
    title: 'RowList',
    group: 'Content',
    description: 'A list of records. Each row supplies its own cells.',
  },
  {
    slug: 'row',
    title: 'Row',
    group: 'Content',
    description: 'One record. Cells share the row and wrap when space runs out.',
  },
  {
    slug: 'portal-shell',
    title: 'PortalShell',
    group: 'Chrome',
    description: 'The application frame: sidebar, toolbar, and page content.',
  },
  {
    slug: 'sidebar-nav',
    title: 'SidebarNav',
    group: 'Chrome',
    description: 'Desktop navigation with an active item and an optional count.',
  },
  {
    slug: 'mobile-nav',
    title: 'MobileNav',
    group: 'Chrome',
    description: 'The same destinations, arranged for a narrow viewport.',
  },
  {
    slug: 'top-bar',
    title: 'TopBar',
    group: 'Chrome',
    description: 'A breadcrumb and a row of toolbar actions.',
  },
  {
    slug: 'auth-frame',
    title: 'AuthFrame',
    group: 'Chrome',
    description: 'A centered brand and panel, compact or reading width.',
  },
  {
    slug: 'color-selector',
    title: 'ColorSelector',
    group: 'Chrome',
    description: 'Five presets, a gradient, and an exact hex value.',
  },
  {
    slug: 'floating-nav',
    title: 'FloatingNav',
    group: 'Chrome',
    description: 'A white pill bar. Narrow widths open the same links in a menu panel.',
  },
];

export const guideLinks = [
  { href: '/get-started', label: 'Get started' },
  { href: '/foundations', label: 'Foundations' },
  { href: '/motion', label: 'Motion' },
] as const;

export function isDocsPath(pathname: string) {
  return (
    pathname === '/get-started' ||
    pathname === '/foundations' ||
    pathname === '/motion' ||
    pathname === '/components' ||
    pathname.startsWith('/components/')
  );
}

export function galleryTitle(pathname: string) {
  if (pathname === '/') return 'Home';
  if (pathname === '/shell') return 'Shell';
  if (pathname === '/get-started') return 'Get started';
  if (pathname === '/foundations') return 'Foundations';
  if (pathname === '/motion') return 'Motion';
  if (pathname === '/auth-preview') return 'Auth preview';
  if (pathname === '/components') return 'Components';
  const slug = pathname.startsWith('/components/') ? pathname.slice('/components/'.length) : '';
  return componentDocs.find((item) => item.slug === slug)?.title ?? 'portal-bits';
}
