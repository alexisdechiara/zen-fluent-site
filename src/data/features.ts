/**
 * Every feature of Zen Fluent (the CSS mod, "core") and Zen Fluent Enhanced
 * (the optional JavaScript mod), from docs/core.md, docs/settings/ and
 * docs/enhanced.md in the mod's repository. `doc` is relative to DOCS_URL.
 */

export type Mod = "core" | "enhanced";

export interface Feature {
  name: string;
  text: string;
  mod: Mod;
  /** Enhanced only: on when the mod is installed, or off until turned on. */
  on?: boolean;
  /** Its preference in about:config (Zen Fluent's main one for a group). */
  pref?: string;
  /** A keyboard shortcut that opens or toggles it. */
  keys?: string;
  /** Only on the development branch: comes with the next release. */
  next?: boolean;
  doc: string;
}

export interface FeatureGroup {
  id: string;
  title: string;
  intro: string;
  features: Feature[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: "look",
    title: "Look and materials",
    intro: "The window, its material and its geometry.",
    features: [
      {
        name: "Mica, Mica Alt or Acrylic",
        pref: "zen-fluent.material",
        text: "The Windows 11 material behind the sidebar and toolbars, tinted with your space's color. On Windows 11 it comes from Mica For Everyone; on Linux and macOS, from your compositor's blur.",
        mod: "core",
        doc: "settings/appearance.md",
      },
      {
        name: "WinUI 3 or Microsoft Edge style",
        pref: "zen-fluent.style",
        text: "Two complete styles: WinUI controls, corners and accent lines, or Edge's Fluent 2 geometry with a pill URL bar, raised tabs and 8 px page corners.",
        mod: "core",
        doc: "core.md#edge-style",
      },
      {
        name: "Corners, gaps and density",
        pref: "zen-fluent.corners",
        text: "WinUI or Zen corners, the gaps around the page, and WinUI's standard or compact sizing for every control.",
        mod: "core",
        doc: "settings/appearance.md",
      },
      {
        name: "Font",
        text: "Segoe UI Variable, Aptos, the system font or one of your own.",
        mod: "core",
        doc: "settings/appearance.md",
      },
      {
        name: "Expert mode",
        pref: "zen-fluent.expert",
        text: "A custom value for every size: gaps, corners, Essentials, the extensions row, the sidebar's padding.",
        mod: "core",
        doc: "settings/appearance.md",
      },
      {
        name: "Zones",
        text: "Each area (sidebar, URL bar, menus, Library…) can keep Zen's own look while the rest takes Fluent.",
        mod: "core",
        doc: "settings/zones.md",
      },
    ],
  },
  {
    id: "colors",
    title: "Colors",
    intro: "The accent, the tint, and colors that follow what you browse.",
    features: [
      {
        name: "Accent color",
        pref: "zen-fluent.accent",
        text: "The Windows accent color, seven others or any CSS color. Light or dark follows Zen.",
        mod: "core",
        doc: "settings/appearance.md",
      },
      {
        name: "Space color and tint",
        pref: "zen-fluent.space-color",
        text: "The material takes your space's color, with the tint opacity you choose.",
        mod: "core",
        doc: "settings/appearance.md",
      },
      {
        name: "Moving gradient",
        pref: "zen-fluent.gradient-animation",
        text: "The space's gradient drifts slowly behind the window.",
        mod: "core",
        doc: "settings/animations.md",
      },
      {
        name: "Icon colors",
        pref: "zen-fluent.enhanced.favicon-color",
        text: "Reads each tab's icon color, so the selected Essential's rings, borders and fills take that exact color.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
      },
      {
        name: "Adaptive accent",
        pref: "zen-fluent.enhanced.adaptive-accent",
        text: "The accent follows the site in the selected tab, from its icon. The Mica tint follows too.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
      },
      {
        name: "Site color",
        pref: "zen-fluent.enhanced.site-color",
        text: "The window takes a light, medium or strong tint of the site you read, over the space's theme.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
      },
      {
        name: "Window glow",
        pref: "zen-fluent.enhanced.window-glow",
        text: "A soft glow in the new color when you change space, theme or mode. Never when switching tabs.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
      },
      {
        name: "Folder colors",
        pref: "zen-fluent.enhanced.folder-colors",
        text: "A folder's context menu gets the Windows accent colors; each subfolder keeps its own.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
      },
    ],
  },
  {
    id: "sidebar",
    title: "Sidebar, Essentials and tabs",
    intro: "Where you spend most of your time in Zen.",
    features: [
      {
        name: "WinUI tabs",
        text: "The accent pill on the selected tab, unloaded tabs dimmed to tertiary text, animated sound bars, container colors and a slot to drop tabs in an empty folder.",
        mod: "core",
        doc: "settings/tabs.md",
      },
      {
        name: "Essentials as WinUI cards",
        text: "2 to 6 per row, ten ways to mark the selected one (glow, Arc border, taskbar pill…), icon size, labels and an open-page dot.",
        mod: "core",
        doc: "settings/essentials.md",
      },
      {
        name: "Extensions row",
        text: "Pinned extensions as a WinUI row, above the Essentials or at the bottom, with its columns, rows and badges.",
        mod: "core",
        doc: "settings/extensions.md",
      },
      {
        name: "Variants",
        text: "A fill (Solid, Standard, Tint, Outline, Subtle, Transparent, Translucent) and a shape for each component.",
        mod: "core",
        doc: "settings/variants.md",
      },
      {
        name: "Compact mode",
        text: "The sidebar slides in on hover over Acrylic, and the page can fill the whole window. Collapsed, the sidebar is a WinUI NavigationView pane.",
        mod: "core",
        doc: "settings/sidebar.md",
      },
      {
        name: "Tab hover cards",
        pref: "zen-fluent.enhanced.hover-cards",
        text: "A card beside the tab with a thumbnail, the address, the state and buttons to copy, mute, unload or close.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
      },
      {
        name: "Ctrl+Tab as Alt+Tab",
        pref: "zen-fluent.enhanced.tab-switcher",
        text: "Hold Ctrl and press Tab: the space's tabs as thumbnails, last used first, like Windows 11.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Tab",
        doc: "enhanced.md",
      },
      {
        name: "Tab numbers",
        pref: "zen-fluent.enhanced.tab-numbers",
        text: "Hold Ctrl for a moment: each tab shows the number Ctrl+1 to Ctrl+9 selects.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
      },
      {
        name: "Tab archiving",
        pref: "zen-fluent.enhanced.tab-archive",
        text: "Tabs left unused for hours are saved to an archive and closed, ready to come back; Undo is offered.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+A",
        doc: "enhanced.md",
      },
      {
        name: "Sleeping tabs and Performance",
        pref: "zen-fluent.enhanced.performance",
        text: "Inactive tabs are unloaded after a delay, as in Edge, and a panel shows the memory Zen uses.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+P",
        doc: "enhanced.md",
      },
      {
        name: "Tab notes",
        pref: "zen-fluent.enhanced.tab-notes",
        text: "Firefox's tab notes, turned on, with a list of every note.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+N",
        doc: "enhanced.md",
      },
      {
        name: "Extensions under the Essentials",
        pref: "zen-fluent.enhanced.extensions-below-essentials",
        text: "Moves the extensions row between the Essentials and the tabs, which CSS cannot do.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
      },
      {
        name: "Fluent icons in the icon picker",
        pref: "zen-fluent.enhanced.icon-picker",
        text: "142 Fluent icons for your spaces, folders and pinned tabs.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
      },
    ],
  },
  {
    id: "urlbar",
    title: "URL bar, split view and Glance",
    intro: "Getting around: the address, links and pages side by side.",
    features: [
      {
        name: "URL bar shape and accent line",
        text: "A WinUI text box or Edge's pill, with WinUI's accent line on focus.",
        mod: "core",
        doc: "settings/url-bar.md",
      },
      {
        name: "Floating URL bar",
        text: "Solid, Standard (the material), Tint (your space's color) or Translucent, over a dimmed page.",
        mod: "core",
        doc: "settings/url-bar.md",
      },
      {
        name: "Split view and Glance",
        text: "Panes with WinUI corners and an accent outline on the active one; Glance over a dimmed page with Acrylic buttons.",
        mod: "core",
        doc: "settings/window-and-menus.md",
      },
      {
        name: "Snap layouts",
        pref: "zen-fluent.enhanced.snap-layouts",
        text: "Windows 11's Snap layouts for split view: hover the maximize button and pick a layout, then Snap Assist fills it.",
        mod: "enhanced",
        on: true,
        keys: "Ctrl+Alt+Shift+Z",
        doc: "enhanced.md",
      },
      {
        name: "Breadcrumb address",
        pref: "zen-fluent.enhanced.breadcrumbs",
        text: "The address reads like File Explorer's: the site, each folder, then the page, each one a click away.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
      },
      {
        name: "Glance link preview",
        pref: "zen-fluent.enhanced.glance",
        text: "Hold Glance's key over a link: a card shows where it leads before you open it.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
      },
    ],
  },
  {
    id: "window",
    title: "Window, menus and pages",
    intro: "Everything around the page, down to Zen's own screens.",
    features: [
      {
        name: "Framed page and caption buttons",
        text: "The page in a card with WinUI corners and a hairline; caption buttons in Windows' styles.",
        mod: "core",
        doc: "settings/window-and-menus.md",
      },
      {
        name: "Menus, panels and dialogs",
        text: "WinUI flyouts for menus, the site panel, permissions, downloads and extensions, with Acrylic and Fluent shadows.",
        mod: "core",
        doc: "core.md",
      },
      {
        name: "Notifications",
        text: "Notification bars as WinUI InfoBars, permission prompts as a TeachingTip, and Zen's toasts.",
        mod: "core",
        doc: "core.md",
      },
      {
        name: "Library, Firefox sidebar and media",
        text: "Zen's Library as WinUI lists, bookmarks and history, the media card and the Picture-in-Picture player.",
        mod: "core",
        doc: "core.md",
      },
      {
        name: "Internal pages",
        text: "Zen's settings, add-ons, about:config and the new tab page in Fluent.",
        mod: "core",
        doc: "core.md",
      },
      {
        name: "Loading bar and scrollbars",
        text: "WinUI's indeterminate progress bar while a page loads, and thin scrollbars that widen on hover.",
        mod: "core",
        doc: "settings/window-and-menus.md",
      },
    ],
  },
  {
    id: "productivity",
    title: "Productivity",
    intro: "Windows' own tools, brought to the browser.",
    features: [
      {
        name: "Focus sessions",
        pref: "zen-fluent.enhanced.focus-session",
        text: "As in Windows' Clock app: a timer that can hide the sidebar, mute tabs and block distracting sites.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
      },
      {
        name: "Widgets and shelf",
        pref: "zen-fluent.enhanced.shelf",
        text: "The time, what plays, your downloads, and a shelf for links, text and images kept for later.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+W",
        doc: "enhanced.md",
      },
      {
        name: "Start page",
        pref: "zen-fluent.enhanced.start-page",
        text: "New tabs open a greeting, a search field and your top sites, as in Windows 11 and Edge.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
      },
      {
        name: "Quick window",
        pref: "zen-fluent.enhanced.quick-window",
        text: "A small window for a quick look at a link, like Arc's Little Arc.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+O",
        doc: "enhanced.md",
      },
      {
        name: "Keyboard shortcuts sheet",
        pref: "zen-fluent.enhanced.shortcut-overlay",
        text: "Every shortcut of Firefox, Zen and Zen Fluent on one card, with a search field.",
        mod: "enhanced",
        on: true,
        keys: "Ctrl+Alt+Shift+K",
        doc: "enhanced.md",
      },
      {
        name: "Command Palette actions",
        pref: "zen-fluent.enhanced.command-palette",
        text: "With the Zen Command Palette mod, its palette gets every Zen Fluent setting, preset and panel.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
      },
      {
        name: "Browsing stats",
        pref: "zen-fluent.enhanced.browsing-stats",
        text: "Time on pages, visits and top sites for today, 7 or 30 days, read from your history.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+S",
        doc: "enhanced.md",
      },
      {
        name: "Boost editor extras",
        pref: "zen-fluent.enhanced.boost-extras",
        text: "Narrow column, No motion, Hide images and Sepia tiles in Zen's Boost editor.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
      },
      {
        name: "Shortcuts",
        pref: "zen-fluent.enhanced.shortcuts",
        text: "Switch the density, the window theme or the material from the keyboard.",
        mod: "enhanced",
        on: true,
        keys: "Ctrl+Alt+Shift+D, T, M",
        doc: "enhanced.md",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings and setup",
    intro: "Where you change all of this.",
    features: [
      {
        name: "Settings in Sine",
        text: "More than a hundred settings in collapsible groups, in the gear of Zen Fluent's card.",
        mod: "core",
        doc: "settings/README.md",
      },
      {
        name: "Zen settings in one place",
        text: "Zen's own options that matter for the look (Glance, the tab preview) next to Zen Fluent's.",
        mod: "core",
        doc: "settings/zen-settings.md",
      },
      {
        name: "Settings page",
        pref: "zen-fluent.enhanced.settings-page",
        text: "A Zen Fluent page in Zen's settings, drawn like Windows Settings: an overview, themes, a drawing of the window for the variants, search, import and export.",
        mod: "enhanced",
        on: true,
        keys: "Ctrl+Alt+Shift+F",
        doc: "enhanced.md",
      },
      {
        name: "Mods",
        text: "Sine's marketplace on the settings page, with each mod's compatibility with Zen Fluent, install, update and uninstall.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
      },
      {
        name: "Quick Settings",
        pref: "zen-fluent.enhanced.quick-settings",
        text: "A Library tab with the main settings and one-click presets: Windows 11, Microsoft Edge, Taskbar, Arc, Compact.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
      },
      {
        name: "Settings per space",
        pref: "zen-fluent.enhanced.space-settings",
        text: "A space can have its own mode, style, material, accent and density, applied when you switch to it.",
        mod: "enhanced",
        on: true,
        next: true,
        doc: "enhanced.md",
      },
      {
        name: "Welcome tour",
        pref: "zen-fluent.enhanced.welcome",
        text: "At the first start, a theme, the accent and a few features to turn on, then where the settings live.",
        mod: "enhanced",
        on: true,
        next: true,
        doc: "enhanced.md",
      },
      {
        name: "French interface",
        text: "The settings page, menus, toasts and Library boards speak French when Zen does.",
        mod: "enhanced",
        on: true,
        next: true,
        doc: "enhanced.md",
      },
    ],
  },
  {
    id: "web",
    title: "Web pages and AI",
    intro: "Fluent beyond the browser's own interface.",
    features: [
      {
        name: "PDF viewer",
        pref: "zen-fluent.enhanced.pdf-viewer",
        text: "Firefox's PDF viewer with a Mica-like toolbar, WinUI fields and buttons and the accent.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
      },
      {
        name: "Fluent controls on websites",
        pref: "zen-fluent.enhanced.web-controls",
        text: "Buttons, fields, checkboxes and sliders a site leaves unstyled take the WinUI look.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
      },
      {
        name: "AI controls page",
        pref: "zen-fluent.enhanced.ai-controls",
        text: "Firefox's AI controls in Zen's settings: each AI feature available, on or blocked.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
      },
      {
        name: "AI chatbot panel",
        pref: "zen-fluent.enhanced.ai-chat",
        text: "Firefox's chatbot in the sidebar: Claude, ChatGPT, Gemini, HuggingChat or Mistral.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+X",
        doc: "enhanced.md",
      },
    ],
  },
  {
    id: "a11y",
    title: "Motion, icons and accessibility",
    intro: "WinUI's motion, Fluent icons, and the care for everyone.",
    features: [
      {
        name: "Fluent icons",
        pref: "zen-fluent.fluent-icons",
        text: "Toolbar buttons, folders, the Library and spaces take Fluent icons. Needs “Allow the mod's icons”.",
        mod: "core",
        doc: "settings/zones.md",
      },
      {
        name: "Animated icons",
        text: "WinUI's AnimatedIcon motion: Back and Forward nudge, Reload turns, the Library books hop.",
        mod: "core",
        doc: "settings/animations.md",
      },
      {
        name: "Animations",
        text: "WinUI flyout and URL bar opening animations, button fills and press scale.",
        mod: "core",
        doc: "settings/animations.md",
      },
      {
        name: "Contrast themes",
        text: "With Windows high contrast, every color switches to the system's, with visible edges and Highlight focus.",
        mod: "core",
        doc: "core.md#accessibility",
      },
      {
        name: "Reduced motion",
        text: "With reduced motion, every animation stops; controls change state without moving.",
        mod: "core",
        doc: "core.md#accessibility",
      },
      {
        name: "Keyboard focus",
        text: "WinUI's two-ring focus visual on every control, never shown on a click.",
        mod: "core",
        doc: "core.md#accessibility",
      },
    ],
  },
];

export const allFeatures = featureGroups.flatMap((g) => g.features);

/** The anchor of a feature on its group's page. */
export const featureId = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const groupOf = (feature: Feature) =>
  featureGroups.find((g) => g.features.includes(feature))!;
/** Enhanced installs Zen Fluent with it, so it has every feature. */
export const totalWithEnhanced = allFeatures.length;
export const countOf = (mod: Mod) =>
  allFeatures.filter((f) => f.mod === mod).length;
