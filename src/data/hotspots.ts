import { DOCS_URL } from "./site";

export interface Hotspot {
  id: string;
  /** Position on the 1280 × 800 screenshot, in percent. */
  x: number;
  y: number;
  title: string;
  text: string;
  tag: string;
  href: string;
}

export const hotspots: Hotspot[] = [
  {
    id: "toolbar",
    x: 15.6,
    y: 2.6,
    title: "Animated toolbar icons",
    text: "WinUI's AnimatedIcon motion on WinUI timings: Back and Forward nudge while pressed, Reload turns once, the Library books hop.",
    tag: "Animations",
    href: `${DOCS_URL}/settings/animations.md`,
  },
  {
    id: "urlbar",
    x: 21,
    y: 7.6,
    title: "A URL bar that feels like Windows",
    text: "A WinUI text box with its accent line, or Edge's pill. Floating, it can be white, black, your space's color or see-through glass.",
    tag: "URL bar",
    href: `${DOCS_URL}/settings/url-bar.md`,
  },
  {
    id: "essentials",
    x: 11,
    y: 13.4,
    title: "Essentials as WinUI cards",
    text: "Ten ways to mark the selected one, modelled on the Windows taskbar: a glow, an Arc border, a taskbar indicator… and a layout from 2 to 6 per row.",
    tag: "Essentials",
    href: `${DOCS_URL}/settings/essentials.md`,
  },
  {
    id: "folders",
    x: 3.2,
    y: 24.6,
    title: "Fluent icons everywhere",
    text: "Folders, the Library, spaces and toolbar buttons take Fluent icons. One switch brings Zen's back.",
    tag: "Icons",
    href: `${DOCS_URL}/settings/zones.md`,
  },
  {
    id: "page",
    x: 22.1,
    y: 34,
    title: "A framed page",
    text: "The page sits in a card with WinUI corners and a hairline stroke. Gaps, corners and the compact mode flush are settings.",
    tag: "Window",
    href: `${DOCS_URL}/settings/window-and-menus.md`,
  },
  {
    id: "tab",
    x: 3,
    y: 57.5,
    title: "Tabs with an accent pill",
    text: "The selected tab gets WinUI's selection indicator, unloaded tabs dim to tertiary text, and the close button shows when you want it.",
    tag: "Tabs",
    href: `${DOCS_URL}/settings/tabs.md`,
  },
  {
    id: "material",
    x: 11,
    y: 80,
    title: "Mica, Mica Alt or Acrylic",
    text: "The real Windows 11 materials behind the whole window, tinted like WinUI apps, with your space's colors on top.",
    tag: "Materials",
    href: `${DOCS_URL}/settings/appearance.md`,
  },
  {
    id: "spaces",
    x: 8.4,
    y: 95.6,
    title: "Spaces and the Library",
    text: "The space switcher and Zen's Library as WinUI lists and tabs, with Enhanced's Widgets and Focus as extra sections.",
    tag: "Sidebar",
    href: `${DOCS_URL}/settings/sidebar.md`,
  },
];
