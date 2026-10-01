/**
 * Public API reference for every catalog component.
 *
 * Each row is written from the component's `$props()` declaration in `src/lib/components`. An
 * empty `defaultValue` means the component declares no default. A default that is an empty string
 * is written as `""`. `tests/docs-reference.test.ts` compares these rows with the declarations.
 */
export type ApiProp = {
  name: string;
  type: string;
  defaultValue: string;
  required: boolean;
  bindable: boolean;
  description: string;
};

export type ComponentReference = {
  slug: string;
  props: ApiProp[];
  snippets: ApiProp[];
  forwards: string[];
  limitations: string[];
  related: string[];
};

type Options = { def?: string; required?: boolean; bindable?: boolean };

function prop(name: string, type: string, description: string, options: Options = {}): ApiProp {
  return {
    name,
    type,
    defaultValue: options.def ?? '',
    required: options.required ?? false,
    bindable: options.bindable ?? false,
    description,
  };
}

const className = prop('class', 'string', 'Extra classes, added after the component classes.', {
  def: '""',
});
const theme = prop(
  'theme',
  "'light' | 'dark'",
  'Theme scope for the portaled content. Portaled content does not inherit the page scope.',
  { def: 'light' },
);

/** Components built on a Bits UI primitive, with the matching Bits UI documentation page. */
export const bitsUiDocs: Record<string, { name: string; href: string }> = {
  button: { name: 'Button', href: 'https://bits-ui.com/docs/components/button' },
  avatar: { name: 'Avatar', href: 'https://bits-ui.com/docs/components/avatar' },
  toggle: { name: 'Toggle', href: 'https://bits-ui.com/docs/components/toggle' },
  'toggle-group': {
    name: 'Toggle Group',
    href: 'https://bits-ui.com/docs/components/toggle-group',
  },
  switch: { name: 'Switch', href: 'https://bits-ui.com/docs/components/switch' },
  checkbox: { name: 'Checkbox', href: 'https://bits-ui.com/docs/components/checkbox' },
  dialog: { name: 'Dialog', href: 'https://bits-ui.com/docs/components/dialog' },
  popover: { name: 'Popover', href: 'https://bits-ui.com/docs/components/popover' },
  tooltip: { name: 'Tooltip', href: 'https://bits-ui.com/docs/components/tooltip' },
};

export const references: ComponentReference[] = [
  {
    slug: 'button',
    props: [
      prop(
        'variant',
        "'primary' | 'secondary' | 'green' | 'quiet'",
        'Visual style. Quiet is inline text with an underline.',
        { def: 'secondary' },
      ),
      prop('size', '32 | 40 | 48', 'Height in pixels. It does not apply to quiet.', { def: '40' }),
      className,
    ],
    snippets: [prop('children', 'Snippet', 'The label or content.')],
    forwards: [
      'Primary, secondary, and green accept every Bits UI `Button.Root` prop. That includes `href`, which renders an anchor, plus `type`, `disabled`, `child`, `ref`, native attributes, and event handlers.',
      'Quiet accepts native button attributes and handlers. It renders a `button` with `type="button"` unless you set `type`.',
    ],
    limitations: [
      'Quiet does not accept `href` or `child`, and `size` does not apply. Use your own anchor for navigation. Quiet is an adaptation; its spacing and underline were not measured.',
      '`variant` is the only prop that changes the render path. A `variant` value outside the four listed fails type checking.',
      'Disabled quiet actions stay visible and do not fire.',
    ],
    related: ['icon-button', 'toggle'],
  },
  {
    slug: 'icon-button',
    props: [
      prop(
        'label',
        'string',
        'The accessible name. It is set as `aria-label` because the button has no visible text.',
        { required: true },
      ),
      className,
    ],
    snippets: [],
    forwards: [
      'Every Button prop: `variant`, `size`, `href`, `type`, `disabled`, `children`, native attributes, and handlers. `variant` and `size` keep their Button defaults.',
    ],
    limitations: [
      'The type accepts `variant="quiet"`, but quiet is inline text and the gallery does not offer it here.',
      'Supply the icon as `children`. The component does not render an icon itself.',
    ],
    related: ['button'],
  },
  {
    slug: 'input',
    props: [
      prop('label', 'string', 'The visible label, tied to the field with `for`.', {
        required: true,
      }),
      prop('hideLabel', 'boolean', 'Keeps the label for assistive technology only.', {
        def: 'false',
      }),
      prop('invalid', 'boolean', 'Sets `aria-invalid`. Render the error text yourself.', {
        def: 'false',
      }),
      prop('value', 'string', 'The field value.', { def: '""', bindable: true }),
      prop('id', 'string', 'The input id. A stable id is generated when you omit it.', {
        def: 'Generated id',
      }),
      className,
    ],
    snippets: [prop('icon', 'Snippet', 'A leading icon inside the field.')],
    forwards: [
      'Native input attributes except `value`: `type`, `name`, `placeholder`, `disabled`, `required`, `autocomplete`, `aria-*`, and handlers. They land on the `input` element.',
    ],
    limitations: [
      'The wrapper `div` takes no attributes. Pass layout classes to a parent.',
      '`value` is typed as a string, whatever the input `type`.',
    ],
    related: ['select', 'checkbox'],
  },
  {
    slug: 'select',
    props: [
      prop('label', 'string', 'The visible label, tied to the select with `for`.', {
        required: true,
      }),
      prop('value', 'string', 'The selected option value. Empty means none selected.', {
        def: '""',
        bindable: true,
      }),
      prop(
        'options',
        'SelectOption[]',
        'Choices as `{ value, label, disabled? }`. Values must be unique.',
        { required: true },
      ),
      prop(
        'placeholder',
        'string',
        'Adds an enabled empty option with this text, so the choice can return to empty.',
      ),
      prop('invalid', 'boolean', 'Sets `aria-invalid`. Render the error text yourself.', {
        def: 'false',
      }),
      prop('id', 'string', 'The select id. A stable id is generated when you omit it.', {
        def: 'Generated id',
      }),
      className,
    ],
    snippets: [],
    forwards: [
      'Native select attributes except `value`, `multiple`, `children`, and `size`: `name`, `required`, `disabled`, `form`, `aria-*`, and handlers. They land on the `select` element.',
    ],
    limitations: [
      'A native single-choice select. Multiple selection, search, and custom popups are not supported.',
      'Reserve the empty value for the placeholder. An option with an empty value collides with it.',
      'Opening, typeahead, and form participation are the browser behavior. The styling is an adaptation of Input.',
    ],
    related: ['input', 'toggle-group'],
  },
  {
    slug: 'checkbox',
    props: [
      prop('checked', 'boolean', 'The checked state.', { def: 'false', bindable: true }),
      prop('invalid', 'boolean', 'Sets `aria-invalid`. Render the error text yourself.', {
        def: 'false',
      }),
      prop('id', 'string', 'The control id. A stable id is generated when you omit it.', {
        def: 'Generated id',
      }),
      prop(
        'name',
        'string',
        'Submits the checked value under this name. Unchecked boxes submit nothing.',
      ),
      prop('required', 'boolean', 'Takes part in native form validation, even without `name`.', {
        def: 'false',
      }),
      prop('disabled', 'boolean', 'Disables the box only. Links in the label stay usable.', {
        def: 'false',
      }),
      prop('form', 'string', 'The id of the form that owns the control.'),
      className,
    ],
    snippets: [
      prop('label', 'Snippet', 'The label content. It may contain links, which stay independent.', {
        required: true,
      }),
    ],
    forwards: [
      'Bits UI `Checkbox.Root` props except `children`, `child`, `indeterminate`, and `onIndeterminateChange`: `value`, `readonly`, `onCheckedChange`, `ref`, native button attributes, and handlers.',
    ],
    limitations: [
      'No indeterminate state, description text, or option groups.',
      'Checkbox is an adaptation. Its dimensions and behavior were not measured.',
    ],
    related: ['switch', 'toggle'],
  },
  {
    slug: 'toggle',
    props: [
      prop('label', 'string', 'The accessible name, set as `aria-label`.', { required: true }),
      prop('pressed', 'boolean', 'Whether the toggle is on.', { def: 'false', bindable: true }),
      className,
    ],
    snippets: [],
    forwards: [
      'Bits UI `Toggle.Root` props: `disabled`, `onPressedChange`, `ref`, `children`, `child`, native button attributes, and handlers. Content passed as `children` is the visible face.',
    ],
    limitations: [
      'The name comes from `label`, not from `children`, so icon-only content stays named.',
      'A single on or off state. For one choice among several, use ToggleGroup.',
    ],
    related: ['toggle-group', 'switch'],
  },
  {
    slug: 'toggle-group',
    props: [
      prop('label', 'string', 'The accessible name of the group.', { required: true }),
      prop(
        'items',
        '{ value: string; label: string; icon?: Snippet; disabled?: boolean }[]',
        'The choices. `label` is the accessible name even when compact hides it.',
        { required: true },
      ),
      prop('value', 'string', 'The selected item value. Empty means none selected.', {
        def: '""',
        bindable: true,
      }),
      prop('disabled', 'boolean', 'Disables every item.', { def: 'false' }),
      prop('compact', 'boolean', 'Shows icons only. Give each item an `icon`.', { def: 'false' }),
    ],
    snippets: [],
    forwards: [],
    limitations: [
      'Single selection only. Pressing the selected item clears `value`.',
      'No `onValueChange` callback. Bind `value`.',
      'No attributes are forwarded to the group or its items.',
    ],
    related: ['toggle', 'select'],
  },
  {
    slug: 'switch',
    props: [
      prop('label', 'string', 'The accessible name, set as `aria-label`.', { required: true }),
      prop('checked', 'boolean', 'Whether the switch is on.', { def: 'false', bindable: true }),
    ],
    snippets: [],
    forwards: [
      'Bits UI `Switch.Root` props except `children` and `child`: `disabled`, `required`, `name`, `value`, `onCheckedChange`, `ref`, native button attributes, and handlers.',
    ],
    limitations: [
      'The label is not visible. Place a visible label next to the switch yourself.',
      'The thumb and track markup are fixed.',
    ],
    related: ['checkbox', 'toggle'],
  },
  {
    slug: 'avatar',
    props: [
      prop('src', 'string', 'The image URL. When it is missing or fails, the fallback shows.'),
      prop('alt', 'string', 'The accessible name. Also the source of the default initials.', {
        required: true,
      }),
      prop(
        'fallback',
        'string',
        'Text for the fallback. Without it, the first letters of the first two words of `alt`.',
      ),
      prop('size', 'number', 'Width and height in pixels.', { def: '40' }),
      prop(
        'decorative',
        'boolean',
        'Removes the avatar from the accessibility tree. Use it when nearby text names the same thing.',
        { def: 'false' },
      ),
    ],
    snippets: [],
    forwards: [],
    limitations: [
      'The component forwards no attributes, so it takes no `class`. Size it with `size`.',
      'Initials come from `alt` unless you supply `fallback`. Names that begin with a symbol give odd initials.',
    ],
    related: ['badge', 'app-card'],
  },
  {
    slug: 'badge',
    props: [
      prop('variant', "'neutral' | 'spotlight' | 'success'", 'Visual emphasis.', {
        def: 'neutral',
      }),
    ],
    snippets: [prop('children', 'Snippet', 'The label text.')],
    forwards: [],
    limitations: [
      'Not interactive. It renders a `span` and takes no attributes.',
      'The variant colors are fixed. They do not follow the accent.',
    ],
    related: ['avatar', 'app-card'],
  },
  {
    slug: 'dialog',
    props: [
      prop('open', 'boolean', 'Whether the dialog is open.', { def: 'false', bindable: true }),
      prop('title', 'string', 'The dialog heading. It names the dialog.', { required: true }),
      prop(
        'description',
        'string',
        'Supporting text under the heading. It is omitted when empty.',
        {
          def: '""',
        },
      ),
      prop(
        'triggerLabel',
        'string',
        'Sets `aria-label` on the trigger. Use it when the trigger content is an icon.',
      ),
      prop(
        'triggerClass',
        'string',
        'Replaces the trigger classes. The default is a secondary 40px button.',
        { def: 'Secondary 40px button' },
      ),
      theme,
    ],
    snippets: [
      prop(
        'trigger',
        'Snippet',
        'The trigger content. Without it, no trigger renders; bind `open`.',
      ),
      prop('children', 'Snippet', 'The dialog body.'),
    ],
    forwards: [],
    limitations: [
      'Only `open` of Bits UI `Dialog.Root` is wrapped. Its other options and callbacks are not exposed.',
      'The close button is always present and named "Close dialog".',
      '`triggerLabel` replaces the visible trigger text as the accessible name.',
    ],
    related: ['popover', 'tooltip'],
  },
  {
    slug: 'popover',
    props: [
      prop('open', 'boolean', 'Whether the popover is open.', { def: 'false', bindable: true }),
      prop(
        'label',
        'string',
        'Names the trigger and the popover content. Both use it as `aria-label`.',
        { required: true },
      ),
      prop('align', "'start' | 'center' | 'end'", 'Alignment against the trigger.', {
        def: 'end',
      }),
      prop('side', "'top' | 'right' | 'bottom' | 'left'", 'Preferred side of the trigger.', {
        def: 'bottom',
      }),
      prop('sideOffset', 'number', 'Distance from the trigger in pixels.', { def: '12' }),
      theme,
      prop(
        'triggerClass',
        'string',
        'Replaces the trigger classes. The default is a secondary 40px icon button.',
        { def: 'Secondary 40px icon button' },
      ),
    ],
    snippets: [
      prop('trigger', 'Snippet', 'The trigger content, usually an icon.', { required: true }),
      prop('children', 'Snippet', 'The popover content.'),
    ],
    forwards: [],
    limitations: [
      'Only `open` of Bits UI `Popover.Root` is wrapped. Other root options and callbacks are not exposed.',
      'Collision padding is fixed at 16px.',
      '`label` replaces the visible trigger text as the accessible name.',
    ],
    related: ['dialog', 'tooltip', 'color-selector'],
  },
  {
    slug: 'tooltip',
    props: [
      prop('text', 'string', 'The tooltip text. It is also the trigger name.', { required: true }),
      theme,
    ],
    snippets: [prop('children', 'Snippet', 'The trigger content, usually an icon.')],
    forwards: [],
    limitations: [
      'The trigger is always a secondary 40px icon button. Do not use it to wrap other controls.',
      'Placement, delay, and Provider options are fixed: 8px offset and a 300ms open delay.',
      'Tooltip text is plain text. Do not put interactive content in it.',
    ],
    related: ['popover', 'dialog'],
  },
  {
    slug: 'app-card',
    props: [
      prop('title', 'string', 'The app name. It is the heading and names the favorite control.', {
        required: true,
      }),
      prop(
        'category',
        'string',
        'The category shown under the title, and in the badge unless `spotlight` is on.',
        {
          required: true,
        },
      ),
      prop('description', 'string', 'Supporting text. It is hidden when `spotlight` is on.'),
      prop('image', 'string', 'The cover image URL. A failed load shows the title initial.'),
      prop('imageAlt', 'string', 'Alt text for the cover image.', { def: '""' }),
      prop('favorite', 'boolean', 'The favorite state of the heart control.', {
        def: 'false',
        bindable: true,
      }),
      prop('spotlight', 'boolean', 'Shows a Featured badge and hides the description.', {
        def: 'false',
      }),
      prop('href', 'string', 'Renders an Explore link button. Ignored when `action` is given.'),
    ],
    snippets: [
      prop('action', 'Snippet', 'Replaces the Explore link button.'),
      prop('children', 'Snippet', 'Extra content below the description.'),
    ],
    forwards: [],
    limitations: [
      'The heading is always an `h3`.',
      'The favorite control is separate from the card. The card has no click handler.',
      'The "Featured" and "Explore" strings are English text inside the component.',
    ],
    related: ['article-card', 'feature-card'],
  },
  {
    slug: 'article-card',
    props: [
      prop('title', 'string', 'The heading. It is rendered as text, not HTML.', { required: true }),
      prop('href', 'string', 'The destination of the single action link.', { required: true }),
      prop(
        'image',
        'string',
        'The media URL. A failed load keeps the media region with a placeholder.',
      ),
      prop('imageAlt', 'string', 'Alt text for the media. Empty marks it decorative.', {
        def: '""',
      }),
      prop(
        'actionLabel',
        'string',
        'The action text. The link name is the action label followed by the title.',
        { def: 'Read' },
      ),
      prop('headingLevel', '2 | 3 | 4', 'The heading level of the title.', { def: '3' }),
    ],
    snippets: [],
    forwards: [],
    limitations: [
      'One native link carries the whole action. The card has no nested buttons or click handler.',
      'Intrinsic height, image fitting, and the placeholder art are adaptations.',
    ],
    related: ['feature-card', 'carousel'],
  },
  {
    slug: 'feature-card',
    props: [
      prop('title', 'string', 'The heading.', { required: true }),
      prop('description', 'string', 'The supporting text.', { required: true }),
      prop(
        'image',
        'string',
        'The media URL. A failed load keeps the media region with a placeholder.',
      ),
      prop('imageAlt', 'string', 'Alt text for the media. Empty marks it decorative.', {
        def: '""',
      }),
      prop('headingLevel', '2 | 3 | 4', 'The heading level of the title.', { def: '3' }),
    ],
    snippets: [],
    forwards: [],
    limitations: [
      'Not a control. It has no link, button, or selection state.',
      'The 4:3 media ratio, the inner radius, and the placeholder art are adaptations.',
    ],
    related: ['article-card', 'carousel'],
  },
  {
    slug: 'carousel',
    props: [
      prop(
        'label',
        'string',
        'Names the carousel region. The viewport and pagination groups add a suffix to it.',
        {
          required: true,
        },
      ),
      prop(
        'items',
        'T[] where T extends { id: string; label: string }',
        'The slides. Each `id` must be unique and stable. Each `label` describes the slide for assistive technology.',
        { required: true },
      ),
      prop(
        'layout',
        "'responsive' | 'carousel'",
        'Responsive becomes a three-column grid at 48rem of component width. Carousel always scrolls.',
        { def: 'responsive' },
      ),
    ],
    snippets: [
      prop('item', 'Snippet<[T]>', 'Renders one slide. It receives the item.', { required: true }),
    ],
    forwards: [],
    limitations: [
      'Arrow keys, Home, and End work only while the viewport itself has focus. Nested controls keep their own keys.',
      'No autoplay, looping, bound index, or custom drag. Navigation is immediate, including with reduced motion.',
      'An empty `items` renders no viewport. One item renders no pagination.',
      'Changing item ids or their order resets to the first slide. The 48rem threshold is an adaptation.',
      'Keyboard navigation is left to right.',
    ],
    related: ['article-card', 'feature-card'],
  },
  {
    slug: 'section-header',
    props: [
      prop('title', 'string', 'The heading, rendered as an `h2`.', { required: true }),
      prop('description', 'string', 'Supporting text under the heading.'),
    ],
    snippets: [prop('action', 'Snippet', 'A control placed beside the heading.')],
    forwards: [],
    limitations: ['The heading level is fixed at `h2`.'],
    related: ['empty-state', 'row-list'],
  },
  {
    slug: 'empty-state',
    props: [
      prop('title', 'string', 'The heading, rendered as an `h3`.', { required: true }),
      prop('description', 'string', 'Supporting text under the heading.'),
    ],
    snippets: [
      prop('icon', 'Snippet', 'A decorative icon above the heading.'),
      prop('action', 'Snippet', 'A control below the description.'),
    ],
    forwards: [],
    limitations: [
      'The heading level is fixed at `h3`.',
      'The icon is not given a name. Keep it decorative.',
    ],
    related: ['section-header', 'alert'],
  },
  {
    slug: 'alert',
    props: [prop('message', 'string', 'The text. Supply it or `children`, not both.'), className],
    snippets: [
      prop('children', 'Snippet', 'Short inline content. Supply it or `message`, not both.'),
    ],
    forwards: [
      'Native paragraph attributes except `children` and `role`: `id`, `aria-*`, `data-*`, and handlers. They land on the `p` element.',
    ],
    limitations: [
      'The type requires exactly one of `message` or `children`.',
      '`role` is fixed at `alert`. Mount the component when an action fails, and remove it when cleared.',
      'No dismiss button, icon, or heading. Alert is an adaptation.',
    ],
    related: ['empty-state', 'input'],
  },
  {
    slug: 'row-list',
    props: [className],
    snippets: [prop('children', 'Snippet', 'The rows. Place Row elements here.')],
    forwards: [
      'Native `ul` attributes: `id`, `aria-label`, `aria-labelledby`, `data-*`, and handlers.',
    ],
    limitations: [
      'Rows do not imply navigation or selection. Sorting, pagination, and column headers stay with you.',
      'The wrapping layout is an adaptation.',
    ],
    related: ['row'],
  },
  {
    slug: 'row',
    props: [className],
    snippets: [prop('children', 'Snippet', 'The cells of the row.')],
    forwards: ['Native `li` attributes: `id`, `aria-*`, `data-*`, and handlers.'],
    limitations: [
      'Place Row inside RowList. Outside a list, an `li` has no list semantics.',
      'Link styling in cells belongs to you.',
    ],
    related: ['row-list'],
  },
  {
    slug: 'portal-shell',
    props: [
      prop(
        'items',
        'NavItem[]',
        'Navigation items as `{ href, label, icon?, count? }`. The sidebar and mobile bar share them.',
        { required: true },
      ),
      prop('active', 'string', 'The `href` of the current item. Compared with exact equality.', {
        required: true,
      }),
      prop('collapsed', 'boolean', 'Whether the sidebar shows icons only.', {
        def: 'false',
        bindable: true,
      }),
      prop('brandHref', 'string', 'The destination of the brand link.', { def: '/' }),
      prop(
        'brandLabel',
        'string',
        'The brand link name. Without it, the visible brand names the link, or "Home" when collapsed.',
      ),
    ],
    snippets: [
      prop('brand', 'Snippet', 'Replaces the default "portalbits" wordmark.'),
      prop('summary', 'Snippet', 'Content under the brand. Hidden when collapsed.'),
      prop('footer', 'Snippet', 'Content at the foot of the sidebar. Hidden when collapsed.'),
      prop('topbar', 'Snippet', 'The toolbar above the page content.'),
      prop('children', 'Snippet', 'The page content, inside `main`.'),
    ],
    forwards: [],
    limitations: [
      'The consumer supplies `active`. The shell reads no URL.',
      'The skip link targets a fixed `main` with the id `main-content`.',
      'The mobile navigation appears at narrow widths. That breakpoint is an adaptation.',
      'The shell needs the full viewport. The gallery links to it instead of embedding it.',
    ],
    related: ['sidebar-nav', 'mobile-nav', 'top-bar'],
  },
  {
    slug: 'sidebar-nav',
    props: [
      prop('items', 'NavItem[]', 'Navigation items as `{ href, label, icon?, count? }`.', {
        required: true,
      }),
      prop('active', 'string', 'The `href` of the current item. It gets `aria-current="page"`.', {
        required: true,
      }),
      prop('collapsed', 'boolean', 'Shows icons only. Each link keeps its name and a title.', {
        def: 'false',
      }),
    ],
    snippets: [],
    forwards: [],
    limitations: [
      'The `nav` is always named "Main navigation".',
      'The count is hidden when collapsed.',
      'Every item is a plain anchor. Client routing belongs to your router.',
    ],
    related: ['mobile-nav', 'portal-shell'],
  },
  {
    slug: 'mobile-nav',
    props: [
      prop('items', 'NavItem[]', 'Navigation items as `{ href, label, icon?, count? }`.', {
        required: true,
      }),
      prop('active', 'string', 'The `href` of the current item. It gets `aria-current="page"`.', {
        required: true,
      }),
    ],
    snippets: [],
    forwards: [],
    limitations: [
      'The `nav` is always named "Mobile navigation".',
      '`count` is not shown. Only the icon and label render.',
      'The narrow breakpoint is an adaptation.',
    ],
    related: ['sidebar-nav', 'portal-shell'],
  },
  {
    slug: 'top-bar',
    props: [
      prop('breadcrumb', 'string', 'The current location. "Overview" shows when it is omitted.'),
    ],
    snippets: [prop('actions', 'Snippet', 'Your controls, such as search or an account menu.')],
    forwards: [],
    limitations: [
      'TopBar owns no account or notification state. Supply those controls in `actions`.',
      'The breadcrumb is one string, not a trail of links.',
    ],
    related: ['portal-shell', 'floating-nav'],
  },
  {
    slug: 'auth-frame',
    props: [
      prop('size', "'compact' | 'reading'", 'Panel width: 28rem or 40rem at most.', {
        def: 'compact',
      }),
      prop('brandHref', 'string', 'The destination of the brand link.', { required: true }),
      className,
    ],
    snippets: [
      prop('brand', 'Snippet', 'The mark and name inside the brand link.', { required: true }),
      prop('children', 'Snippet', 'The panel content, such as a form.', { required: true }),
    ],
    forwards: [
      'Native `div` attributes: `id`, `aria-*`, `data-*`, and handlers. They land on the outer frame.',
    ],
    limitations: [
      'No top bar, skip link, footer, or `main` landmark. You own the content semantics and form structure.',
      'Both sizes are adaptations. The gallery previews them on their own pages.',
    ],
    related: ['portal-shell'],
  },
  {
    slug: 'color-selector',
    props: [
      prop('value', 'string', 'The accent as a hex color. Invalid values show the default green.', {
        def: '#19e783',
        bindable: true,
      }),
      prop('open', 'boolean', 'Whether the popover is open.', { def: 'false', bindable: true }),
      prop('label', 'string', 'Names the trigger, the popover, and its heading.', {
        def: 'Accent color',
      }),
      theme,
      prop(
        'onValueChange',
        '(value: string) => void',
        'Called with a normalized six-digit hex string after each user change.',
      ),
    ],
    snippets: [],
    forwards: [],
    limitations: [
      'The component sets no CSS. Apply `--portal-accent` and persist the value yourself.',
      'Five fixed presets plus a custom gradient. Alpha is not supported.',
      'The presets and gradient dimensions are an adaptation.',
      'Selecting a color keeps the popover open.',
    ],
    related: ['popover'],
  },
  {
    slug: 'floating-nav',
    props: [
      prop('label', 'string', 'Names the `nav` landmark.', { required: true }),
      prop('open', 'boolean', 'Whether the narrow-width menu is open.', {
        def: 'false',
        bindable: true,
      }),
    ],
    snippets: [
      prop('brand', 'Snippet', 'The leading mark, usually a home link.', { required: true }),
      prop('items', 'Snippet', 'The middle links. Each destination is one anchor.', {
        required: true,
      }),
      prop('actions', 'Snippet', 'An optional trailing group, such as a repository link.'),
    ],
    forwards: [],
    limitations: [
      'Below 640px of component width the links move into a Menu panel. The 640px threshold is an adaptation.',
      'Escape and an outside pointer press close the menu. Both are adaptations. The source site did not close on Escape.',
      'Focus trapping and scroll locking are not provided.',
      'The Menu and Close button text is English text inside the component.',
    ],
    related: ['top-bar', 'portal-shell'],
  },
];

const bySlug = new Map(references.map((reference) => [reference.slug, reference]));

/** The reference for a catalog slug. A missing reference is a documentation bug, so it throws. */
export function referenceFor(slug: string): ComponentReference {
  const reference = bySlug.get(slug);
  if (!reference) throw new Error(`No API reference exists for "${slug}".`);
  return reference;
}
