import type { Component } from 'svelte';
import type { PreviewSettings, SourceFile } from '../docs/types';
import { layoutSource, toConsumerSource, usageTag } from '../docs/consumer-source.js';
import {
  pick,
  enabled,
  readAvatar,
  readButton,
  readContent,
  readField,
  readSelect,
  readIconButton,
  readMedia,
  readPopover,
  readRadioGroup,
  readSlider,
  readDropdownMenu,
  separatorOrientations,
  alertDialogTones,
  badgeVariants,
  articleActions,
  carouselLayouts,
} from '../docs/variations';
import ButtonExample from './ButtonExample.svelte';
import buttonSource from './ButtonExample.svelte?raw';
import IconButtonExample from './IconButtonExample.svelte';
import iconButtonSource from './IconButtonExample.svelte?raw';
import InputExample from './InputExample.svelte';
import inputSource from './InputExample.svelte?raw';
import SelectExample from './SelectExample.svelte';
import selectSource from './SelectExample.svelte?raw';
import CheckboxExample from './CheckboxExample.svelte';
import checkboxSource from './CheckboxExample.svelte?raw';
import ToggleExample from './ToggleExample.svelte';
import toggleSource from './ToggleExample.svelte?raw';
import ToggleGroupExample from './ToggleGroupExample.svelte';
import toggleGroupSource from './ToggleGroupExample.svelte?raw';
import SwitchExample from './SwitchExample.svelte';
import switchSource from './SwitchExample.svelte?raw';
import AvatarExample from './AvatarExample.svelte';
import avatarSource from './AvatarExample.svelte?raw';
import BadgeExample from './BadgeExample.svelte';
import badgeSource from './BadgeExample.svelte?raw';
import DialogExample from './DialogExample.svelte';
import dialogSource from './DialogExample.svelte?raw';
import PopoverExample from './PopoverExample.svelte';
import popoverSource from './PopoverExample.svelte?raw';
import TooltipExample from './TooltipExample.svelte';
import tooltipSource from './TooltipExample.svelte?raw';
import AppCardExample from './AppCardExample.svelte';
import appCardSource from './AppCardExample.svelte?raw';
import ArticleCardExample from './ArticleCardExample.svelte';
import articleCardSource from './ArticleCardExample.svelte?raw';
import FeatureCardExample from './FeatureCardExample.svelte';
import featureCardSource from './FeatureCardExample.svelte?raw';
import CarouselExample from './CarouselExample.svelte';
import carouselSource from './CarouselExample.svelte?raw';
import SectionHeaderExample from './SectionHeaderExample.svelte';
import sectionHeaderSource from './SectionHeaderExample.svelte?raw';
import EmptyStateExample from './EmptyStateExample.svelte';
import emptyStateSource from './EmptyStateExample.svelte?raw';
import AlertExample from './AlertExample.svelte';
import alertSource from './AlertExample.svelte?raw';
import RowListExample from './RowListExample.svelte';
import rowListSource from './RowListExample.svelte?raw';
import RowExample from './RowExample.svelte';
import rowSource from './RowExample.svelte?raw';
import PortalShellExample from './PortalShellExample.svelte';
import portalShellSource from './PortalShellExample.svelte?raw';
import SidebarNavExample from './SidebarNavExample.svelte';
import sidebarNavSource from './SidebarNavExample.svelte?raw';
import MobileNavExample from './MobileNavExample.svelte';
import mobileNavSource from './MobileNavExample.svelte?raw';
import TopBarExample from './TopBarExample.svelte';
import topBarSource from './TopBarExample.svelte?raw';
import AuthFrameExample from './AuthFrameExample.svelte';
import authFrameSource from './AuthFrameExample.svelte?raw';
import ColorSelectorExample from './ColorSelectorExample.svelte';
import colorSelectorSource from './ColorSelectorExample.svelte?raw';
import FloatingNavExample from './FloatingNavExample.svelte';
import floatingNavSource from './FloatingNavExample.svelte?raw';
import TextareaExample from './TextareaExample.svelte';
import textareaSource from './TextareaExample.svelte?raw';
import SliderExample from './SliderExample.svelte';
import sliderSource from './SliderExample.svelte?raw';
import RadioGroupExample from './RadioGroupExample.svelte';
import radioGroupSource from './RadioGroupExample.svelte?raw';
import TabsExample from './TabsExample.svelte';
import tabsSource from './TabsExample.svelte?raw';
import AccordionExample from './AccordionExample.svelte';
import accordionSource from './AccordionExample.svelte?raw';
import ProgressExample from './ProgressExample.svelte';
import progressSource from './ProgressExample.svelte?raw';
import SeparatorExample from './SeparatorExample.svelte';
import separatorSource from './SeparatorExample.svelte?raw';
import DropdownMenuExample from './DropdownMenuExample.svelte';
import dropdownMenuSource from './DropdownMenuExample.svelte?raw';
import AlertDialogExample from './AlertDialogExample.svelte';
import alertDialogSource from './AlertDialogExample.svelte?raw';

export type ExampleProps = Record<string, string | number | boolean>;

export type ExampleEntry = {
  /** Component name without the `Example` suffix. */
  title: string;
  component: Component<any>;
  /** Raw gallery source. Convert it with `toConsumerSource` before showing it. */
  source: string;
  /** Validated props for the selected settings. */
  props: (settings: PreviewSettings) => ExampleProps;
  /** The example needs the whole viewport, so the gallery links to it instead of rendering it. */
  fullPage?: boolean;
};

const none = (): ExampleProps => ({});
const fieldProps = (settings: PreviewSettings): ExampleProps => ({ ...readField(settings) });

export const examples: Record<string, ExampleEntry> = {
  button: {
    title: 'Button',
    component: ButtonExample,
    source: buttonSource,
    props: (settings) => ({ ...readButton(settings) }),
  },
  'icon-button': {
    title: 'IconButton',
    component: IconButtonExample,
    source: iconButtonSource,
    props: (settings) => ({ ...readIconButton(settings) }),
  },
  input: { title: 'Input', component: InputExample, source: inputSource, props: fieldProps },
  select: {
    title: 'Select',
    component: SelectExample,
    source: selectSource,
    props: (settings) => ({ ...readSelect(settings) }),
  },
  checkbox: {
    title: 'Checkbox',
    component: CheckboxExample,
    source: checkboxSource,
    props: fieldProps,
  },
  toggle: {
    title: 'Toggle',
    component: ToggleExample,
    source: toggleSource,
    props: (settings) => ({ disabled: enabled(settings, 'disabled') }),
  },
  'toggle-group': {
    title: 'ToggleGroup',
    component: ToggleGroupExample,
    source: toggleGroupSource,
    props: (settings) => ({
      compact: enabled(settings, 'compact'),
      disabled: enabled(settings, 'disabled'),
    }),
  },
  switch: {
    title: 'Switch',
    component: SwitchExample,
    source: switchSource,
    props: (settings) => ({ disabled: enabled(settings, 'disabled') }),
  },
  avatar: {
    title: 'Avatar',
    component: AvatarExample,
    source: avatarSource,
    props: (settings) => ({ ...readAvatar(settings) }),
  },
  badge: {
    title: 'Badge',
    component: BadgeExample,
    source: badgeSource,
    props: (settings) => ({ variant: pick(settings, 'variant', badgeVariants, 'neutral') }),
  },
  dialog: {
    title: 'Dialog',
    component: DialogExample,
    source: dialogSource,
    props: (settings) => ({ description: enabled(settings, 'description') }),
  },
  popover: {
    title: 'Popover',
    component: PopoverExample,
    source: popoverSource,
    props: (settings) => ({ ...readPopover(settings) }),
  },
  tooltip: {
    title: 'Tooltip',
    component: TooltipExample,
    source: tooltipSource,
    props: (settings) => ({ text: pick(settings, 'text', ['short', 'long'] as const, 'short') }),
  },
  'app-card': {
    title: 'AppCard',
    component: AppCardExample,
    source: appCardSource,
    props: (settings) => ({
      media: readMedia(settings),
      spotlight: enabled(settings, 'spotlight'),
      action: enabled(settings, 'action'),
    }),
  },
  'article-card': {
    title: 'ArticleCard',
    component: ArticleCardExample,
    source: articleCardSource,
    props: (settings) => ({
      media: readMedia(settings),
      actionLabel: pick(settings, 'actionLabel', articleActions, 'Read'),
    }),
  },
  'feature-card': {
    title: 'FeatureCard',
    component: FeatureCardExample,
    source: featureCardSource,
    props: (settings) => ({ media: readMedia(settings) }),
  },
  carousel: {
    title: 'Carousel',
    component: CarouselExample,
    source: carouselSource,
    props: (settings) => ({ layout: pick(settings, 'layout', carouselLayouts, 'responsive') }),
  },
  'section-header': {
    title: 'SectionHeader',
    component: SectionHeaderExample,
    source: sectionHeaderSource,
    props: (settings) => ({
      description: enabled(settings, 'description'),
      action: enabled(settings, 'action'),
    }),
  },
  'empty-state': {
    title: 'EmptyState',
    component: EmptyStateExample,
    source: emptyStateSource,
    props: (settings) => ({
      description: enabled(settings, 'description'),
      icon: enabled(settings, 'icon'),
      action: enabled(settings, 'action'),
    }),
  },
  alert: { title: 'Alert', component: AlertExample, source: alertSource, props: none },
  'row-list': {
    title: 'RowList',
    component: RowListExample,
    source: rowListSource,
    props: (settings) => ({ content: readContent(settings) }),
  },
  row: {
    title: 'Row',
    component: RowExample,
    source: rowSource,
    props: (settings) => ({ content: readContent(settings) }),
  },
  'portal-shell': {
    title: 'PortalShell',
    component: PortalShellExample,
    source: portalShellSource,
    props: none,
    fullPage: true,
  },
  'sidebar-nav': {
    title: 'SidebarNav',
    component: SidebarNavExample,
    source: sidebarNavSource,
    props: (settings) => ({ collapsed: enabled(settings, 'collapsed') }),
  },
  'mobile-nav': {
    title: 'MobileNav',
    component: MobileNavExample,
    source: mobileNavSource,
    props: none,
    fullPage: true,
  },
  'top-bar': {
    title: 'TopBar',
    component: TopBarExample,
    source: topBarSource,
    props: (settings) => ({
      breadcrumb: enabled(settings, 'breadcrumb'),
      actions: enabled(settings, 'actions'),
    }),
  },
  'auth-frame': {
    title: 'AuthFrame',
    component: AuthFrameExample,
    source: authFrameSource,
    props: none,
    fullPage: true,
  },
  'color-selector': {
    title: 'ColorSelector',
    component: ColorSelectorExample,
    source: colorSelectorSource,
    props: none,
  },
  'floating-nav': {
    title: 'FloatingNav',
    component: FloatingNavExample,
    source: floatingNavSource,
    props: (settings) => ({ actions: enabled(settings, 'actions') }),
  },
  textarea: {
    title: 'Textarea',
    component: TextareaExample,
    source: textareaSource,
    props: fieldProps,
  },
  slider: {
    title: 'Slider',
    component: SliderExample,
    source: sliderSource,
    props: (settings) => ({ ...readSlider(settings) }),
  },
  'radio-group': {
    title: 'RadioGroup',
    component: RadioGroupExample,
    source: radioGroupSource,
    props: (settings) => ({ ...readRadioGroup(settings) }),
  },
  tabs: {
    title: 'Tabs',
    component: TabsExample,
    source: tabsSource,
    props: (settings) => ({ disabled: enabled(settings, 'disabled') }),
  },
  accordion: {
    title: 'Accordion',
    component: AccordionExample,
    source: accordionSource,
    props: (settings) => ({ multiple: enabled(settings, 'multiple') }),
  },
  progress: {
    title: 'Progress',
    component: ProgressExample,
    source: progressSource,
    props: (settings) => ({
      indeterminate: enabled(settings, 'indeterminate'),
      showValue: enabled(settings, 'showValue'),
    }),
  },
  separator: {
    title: 'Separator',
    component: SeparatorExample,
    source: separatorSource,
    props: (settings) => ({
      orientation: pick(settings, 'orientation', separatorOrientations, 'horizontal'),
    }),
  },
  'dropdown-menu': {
    title: 'DropdownMenu',
    component: DropdownMenuExample,
    source: dropdownMenuSource,
    props: (settings) => ({ ...readDropdownMenu(settings) }),
  },
  'alert-dialog': {
    title: 'AlertDialog',
    component: AlertDialogExample,
    source: alertDialogSource,
    props: (settings) => ({ tone: pick(settings, 'tone', alertDialogTones, 'danger') }),
  },
};

/** The example's validated props for the selected settings. */
export function getExampleProps(slug: string, settings: PreviewSettings): ExampleProps {
  const entry = examples[slug];
  if (!entry) throw new Error(`No example for "${slug}"`);
  return entry.props(settings);
}

/**
 * The files a consumer copies: styles, an app that passes the selected settings, and the
 * complete example. Values are JSON literals on fixed prop names.
 */
export function getExampleFiles(slug: string, settings: PreviewSettings): SourceFile[] {
  const entry = examples[slug];
  if (!entry) throw new Error(`No example for "${slug}"`);
  const name = `${entry.title}Example`;
  const app = `<script lang="ts">
  import ${name} from './${name}.svelte';
</script>

${usageTag(name, entry.props(settings))}
`;
  return [
    { name: '+layout.svelte', language: 'svelte', code: layoutSource },
    { name: 'App.svelte', language: 'svelte', code: app },
    { name: `${name}.svelte`, language: 'svelte', code: toConsumerSource(entry.source) },
  ];
}
