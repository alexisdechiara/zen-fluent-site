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
  fr: { title: string; text: string; tag: string };
}

export const hotspots: Hotspot[] = [
  {
    id: "toolbar",
    x: 15.4,
    y: 2.6,
    title: "Animated toolbar icons",
    text: "WinUI's AnimatedIcon motion on WinUI timings: Back and Forward nudge while pressed, Reload turns once, the Library books hop.",
    tag: "Animations",
    href: `${DOCS_URL}/settings/animations.md`,
    fr: {
      title: "Des icônes animées",
      text: "Les mouvements AnimatedIcon de WinUI, à son rythme : Précédent et Suivant avancent d'un cran, Actualiser fait un tour, les livres de la Bibliothèque sautillent.",
      tag: "Animations",
    },
  },
  {
    id: "urlbar",
    x: 13.3,
    y: 7.6,
    title: "A URL bar that feels like Windows",
    text: "A WinUI text box with its accent line, or Edge's pill. Floating, it can be white, black, your space's color or see-through glass.",
    tag: "URL bar",
    href: `${DOCS_URL}/settings/url-bar.md`,
    fr: {
      title: "Une barre d'adresse comme sous Windows",
      text: "Une zone de texte WinUI avec sa ligne d'accent, ou la pilule d'Edge. Flottante, elle peut être blanche, noire, de la couleur de votre espace ou en verre transparent.",
      tag: "Barre d'adresse",
    },
  },
  {
    id: "essentials",
    x: 9.7,
    y: 16.9,
    title: "Essentials as WinUI cards",
    text: "Ten ways to mark the selected one, modelled on the Windows taskbar: a glow, an Arc border, a taskbar indicator… and a layout from 2 to 6 per row.",
    tag: "Essentials",
    href: `${DOCS_URL}/settings/essentials.md`,
    fr: {
      title: "Les Essentials en cartes WinUI",
      text: "Dix façons de marquer celui qui est sélectionné, inspirées de la barre des tâches : un halo, une bordure façon Arc, un indicateur de barre des tâches… et de 2 à 6 par ligne.",
      tag: "Essentials",
    },
  },
  {
    id: "folders",
    x: 3.8,
    y: 2.6,
    title: "Fluent icons everywhere",
    text: "Toolbar buttons, folders, the Library and spaces take Fluent icons. One switch brings Zen's back.",
    tag: "Icons",
    href: `${DOCS_URL}/settings/zones.md`,
    fr: {
      title: "Des icônes Fluent partout",
      text: "Les boutons de la barre d'outils, les dossiers, la Bibliothèque et les espaces prennent des icônes Fluent. Un interrupteur ramène celles de Zen.",
      tag: "Icônes",
    },
  },
  {
    id: "page",
    x: 19.5,
    y: 31.3,
    title: "A framed page",
    text: "The page sits in a card with WinUI corners and a hairline stroke. Gaps, corners and the compact mode flush are settings.",
    tag: "Window",
    href: `${DOCS_URL}/settings/window-and-menus.md`,
    fr: {
      title: "Une page encadrée",
      text: "La page est posée dans une carte aux coins WinUI, avec un fin contour. Les marges, les coins et la page bord à bord en mode compact se règlent.",
      tag: "Fenêtre",
    },
  },
  {
    id: "tab",
    x: 1.4,
    y: 49.3,
    title: "Tabs with an accent pill",
    text: "The selected tab gets WinUI's selection indicator, unloaded tabs dim to tertiary text, and the close button shows when you want it.",
    tag: "Tabs",
    href: `${DOCS_URL}/settings/tabs.md`,
    fr: {
      title: "Des onglets avec une pilule d'accent",
      text: "L'onglet sélectionné reçoit l'indicateur de sélection de WinUI, les onglets déchargés s'estompent, et le bouton de fermeture apparaît quand vous le voulez.",
      tag: "Onglets",
    },
  },
  {
    id: "material",
    x: 9.7,
    y: 75,
    title: "Mica, Mica Alt or Acrylic",
    text: "The real Windows 11 materials behind the whole window, tinted like WinUI apps, with your space's colors on top.",
    tag: "Materials",
    href: `${DOCS_URL}/settings/appearance.md`,
    fr: {
      title: "Mica, Mica Alt ou Acrylic",
      text: "Les vrais matériaux de Windows 11 derrière toute la fenêtre, teintés comme les applis WinUI, avec les couleurs de votre espace par-dessus.",
      tag: "Matériaux",
    },
  },
  {
    id: "spaces",
    x: 1.6,
    y: 97.4,
    title: "Spaces and the Library",
    text: "The space switcher and Zen's Library as WinUI lists and tabs, with Enhanced's Widgets and Focus as extra sections.",
    tag: "Sidebar",
    href: `${DOCS_URL}/settings/sidebar.md`,
    fr: {
      title: "Les espaces et la Bibliothèque",
      text: "Le sélecteur d'espaces et la Bibliothèque de Zen en listes et onglets WinUI, avec les Widgets et la Concentration d'Enhanced en sections de plus.",
      tag: "Barre latérale",
    },
  },
];
