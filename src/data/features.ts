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
  /** A short clip recorded in Zen (public/clips/*.mp4), and its still. */
  video?: string;
  poster?: string;
  doc: string;
  /** Its name and text in French. */
  fr: { name: string; text: string };
}

export interface FeatureGroup {
  id: string;
  title: string;
  intro: string;
  features: Feature[];
  fr: { title: string; intro: string };
}

export const featureGroups: FeatureGroup[] = [
  {
    id: "look",
    title: "Look and materials",
    intro: "The window, its material and its geometry.",
    fr: {
      title: "Style et matériaux",
      intro: "La fenêtre, son matériau et sa géométrie.",
    },
    features: [
      {
        name: "Mica, Mica Alt or Acrylic",
        pref: "zen-fluent.material",
        text: "The Windows 11 material behind the sidebar and toolbars, tinted with your space's color. On Windows 11 it comes from Mica For Everyone; on Linux and macOS, from your compositor's blur.",
        mod: "core",
        doc: "settings/appearance.md",
        fr: {
          name: "Mica, Mica Alt ou Acrylic",
          text: "Le matériau de Windows 11 derrière la barre latérale et les barres d'outils, teinté de la couleur de votre espace. Sous Windows 11 il vient de Mica For Everyone ; sous Linux et macOS, du flou de votre compositeur.",
        },
      },
      {
        name: "WinUI 3 or Microsoft Edge style",
        pref: "zen-fluent.style",
        text: "Two complete styles: WinUI controls, corners and accent lines, or Edge's Fluent 2 geometry with a pill URL bar, raised tabs and 8 px page corners.",
        mod: "core",
        doc: "core.md#edge-style",
        fr: {
          name: "Style WinUI 3 ou Microsoft Edge",
          text: "Deux styles complets : les contrôles, coins et lignes d'accent de WinUI, ou la géométrie Fluent 2 d'Edge avec une barre d'adresse en pilule, des onglets surélevés et des coins de page de 8 px.",
        },
      },
      {
        name: "Corners, gaps and density",
        pref: "zen-fluent.corners",
        text: "WinUI or Zen corners, the gaps around the page, and WinUI's standard or compact sizing for every control.",
        mod: "core",
        doc: "settings/appearance.md",
        fr: {
          name: "Coins, marges et densité",
          text: "Les coins de WinUI ou de Zen, les marges autour de la page, et la taille standard ou compacte de WinUI pour chaque contrôle.",
        },
      },
      {
        name: "Font",
        text: "Segoe UI Variable, Aptos, the system font or one of your own.",
        mod: "core",
        doc: "settings/appearance.md",
        fr: {
          name: "Police",
          text: "Segoe UI Variable, Aptos, la police du système ou l'une des vôtres.",
        },
      },
      {
        name: "Expert mode",
        pref: "zen-fluent.expert",
        text: "A custom value for every size: gaps, corners, Essentials, the extensions row, the sidebar's padding.",
        mod: "core",
        doc: "settings/appearance.md",
        fr: {
          name: "Mode expert",
          text: "Une valeur personnalisée pour chaque taille : marges, coins, Essentials, rangée d'extensions, marges intérieures de la barre latérale.",
        },
      },
      {
        name: "Zones",
        text: "Each area (sidebar, URL bar, menus, Library…) can keep Zen's own look while the rest takes Fluent.",
        mod: "core",
        doc: "settings/zones.md",
        fr: {
          name: "Zones",
          text: "Chaque zone (barre latérale, barre d'adresse, menus, Bibliothèque…) peut garder le style de Zen pendant que le reste passe en Fluent.",
        },
      },
    ],
  },
  {
    id: "colors",
    title: "Colors",
    intro: "The accent, the tint, and colors that follow what you browse.",
    fr: {
      title: "Couleurs",
      intro:
        "L'accent, la teinte, et des couleurs qui suivent ce que vous lisez.",
    },
    features: [
      {
        name: "Accent color",
        pref: "zen-fluent.accent",
        text: "The Windows accent color, seven others or any CSS color. Light or dark follows Zen.",
        mod: "core",
        doc: "settings/appearance.md",
        fr: {
          name: "Couleur d'accent",
          text: "La couleur d'accent de Windows, sept autres ou n'importe quelle couleur CSS. Clair ou sombre suit Zen.",
        },
      },
      {
        name: "Space color and tint",
        pref: "zen-fluent.space-color",
        text: "The material takes your space's color, with the tint opacity you choose.",
        mod: "core",
        doc: "settings/appearance.md",
        fr: {
          name: "Couleur de l'espace et teinte",
          text: "Le matériau prend la couleur de votre espace, avec l'opacité de teinte que vous choisissez.",
        },
      },
      {
        name: "Moving gradient",
        pref: "zen-fluent.gradient-animation",
        text: "The space's gradient drifts slowly behind the window.",
        mod: "core",
        doc: "settings/animations.md",
        fr: {
          name: "Dégradé animé",
          text: "Le dégradé de l'espace dérive lentement derrière la fenêtre.",
        },
      },
      {
        name: "Icon colors",
        pref: "zen-fluent.enhanced.favicon-color",
        text: "Reads each tab's icon color, so the selected Essential's rings, borders and fills take that exact color.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
        fr: {
          name: "Couleurs des icônes",
          text: "Lit la couleur de l'icône de chaque onglet : les anneaux, bordures et remplissages de l'Essential sélectionné prennent exactement cette couleur.",
        },
      },
      {
        name: "Adaptive accent",
        pref: "zen-fluent.enhanced.adaptive-accent",
        text: "The accent follows the site in the selected tab, from its icon. The Mica tint follows too.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
        fr: {
          name: "Accent adaptatif",
          text: "L'accent suit le site de l'onglet sélectionné, d'après son icône. La teinte Mica suit aussi.",
        },
      },
      {
        name: "Site color",
        pref: "zen-fluent.enhanced.site-color",
        text: "The window takes a light, medium or strong tint of the site you read, over the space's theme.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
        fr: {
          name: "Couleur du site",
          text: "La fenêtre prend une teinte légère, moyenne ou forte du site que vous lisez, par-dessus le thème de l'espace.",
        },
      },
      {
        name: "Window glow",
        pref: "zen-fluent.enhanced.window-glow",
        text: "A soft glow in the new color when you change space, theme or mode. Never when switching tabs.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
        fr: {
          name: "Lueur de la fenêtre",
          text: "Une douce lueur de la nouvelle couleur quand vous changez d'espace, de thème ou de mode. Jamais en changeant d'onglet.",
        },
      },
      {
        name: "Folder colors",
        pref: "zen-fluent.enhanced.folder-colors",
        text: "A folder's context menu gets the Windows accent colors; each subfolder keeps its own.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
        fr: {
          name: "Couleurs des dossiers",
          text: "Le menu contextuel d'un dossier propose les couleurs d'accent de Windows ; chaque sous-dossier garde la sienne.",
        },
      },
    ],
  },
  {
    id: "sidebar",
    title: "Sidebar, Essentials and tabs",
    intro: "Where you spend most of your time in Zen.",
    fr: {
      title: "Barre latérale, Essentials et onglets",
      intro: "Là où vous passez le plus de temps dans Zen.",
    },
    features: [
      {
        name: "WinUI tabs",
        text: "The accent pill on the selected tab, unloaded tabs dimmed to tertiary text, animated sound bars, container colors and a slot to drop tabs in an empty folder.",
        mod: "core",
        doc: "settings/tabs.md",
        fr: {
          name: "Onglets WinUI",
          text: "La pilule d'accent sur l'onglet sélectionné, les onglets déchargés estompés, des barres de son animées, les couleurs des conteneurs et un emplacement pour déposer des onglets dans un dossier vide.",
        },
      },
      {
        name: "Essentials as WinUI cards",
        text: "2 to 6 per row, ten ways to mark the selected one (glow, Arc border, taskbar pill…), icon size, labels and an open-page dot.",
        mod: "core",
        doc: "settings/essentials.md",
        fr: {
          name: "Les Essentials en cartes WinUI",
          text: "De 2 à 6 par ligne, dix façons de marquer celui qui est sélectionné (halo, bordure façon Arc, pilule de barre des tâches…), la taille des icônes, des libellés et un point pour les pages ouvertes.",
        },
      },
      {
        name: "Extensions row",
        text: "Pinned extensions as a WinUI row, above the Essentials or at the bottom, with its columns, rows and badges.",
        mod: "core",
        doc: "settings/extensions.md",
        fr: {
          name: "Rangée d'extensions",
          text: "Les extensions épinglées en rangée WinUI, au-dessus des Essentials ou en bas, avec ses colonnes, ses lignes et ses badges.",
        },
      },
      {
        name: "Variants",
        text: "A fill (Solid, Standard, Tint, Outline, Subtle, Transparent, Translucent) and a shape for each component.",
        mod: "core",
        doc: "settings/variants.md",
        fr: {
          name: "Variantes",
          text: "Un remplissage (Solid, Standard, Tint, Outline, Subtle, Transparent, Translucent) et une forme pour chaque composant.",
        },
      },
      {
        name: "Compact mode",
        text: "The sidebar slides in on hover over Acrylic, and the page can fill the whole window. Collapsed, the sidebar is a WinUI NavigationView pane.",
        mod: "core",
        doc: "settings/sidebar.md",
        fr: {
          name: "Mode compact",
          text: "La barre latérale glisse au survol, sur fond Acrylic, et la page peut remplir toute la fenêtre. Repliée, la barre latérale devient un volet NavigationView de WinUI.",
        },
      },
      {
        name: "Tab hover cards",
        pref: "zen-fluent.enhanced.hover-cards",
        text: "A card beside the tab with a thumbnail, the address, the state and buttons to copy, mute, unload or close.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
        fr: {
          name: "Cartes de survol des onglets",
          text: "Une carte à côté de l'onglet, avec une miniature, l'adresse, l'état et des boutons pour copier, couper le son, décharger ou fermer.",
        },
      },
      {
        name: "Ctrl+Tab as Alt+Tab",
        pref: "zen-fluent.enhanced.tab-switcher",
        text: "Hold Ctrl and press Tab: the space's tabs as thumbnails, last used first, like Windows 11.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Tab",
        doc: "enhanced.md",
        fr: {
          name: "Ctrl+Tab comme Alt+Tab",
          text: "Maintenez Ctrl et appuyez sur Tab : les onglets de l'espace en miniatures, du plus récent au plus ancien, comme dans Windows 11.",
        },
      },
      {
        name: "Tab numbers",
        pref: "zen-fluent.enhanced.tab-numbers",
        text: "Hold Ctrl for a moment: each tab shows the number Ctrl+1 to Ctrl+9 selects.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
        fr: {
          name: "Numéros d'onglets",
          text: "Maintenez Ctrl un instant : chaque onglet affiche le numéro que Ctrl+1 à Ctrl+9 sélectionne.",
        },
      },
      {
        name: "Tab archiving",
        pref: "zen-fluent.enhanced.tab-archive",
        text: "Tabs left unused for hours are saved to an archive and closed, ready to come back; Undo is offered.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+A",
        doc: "enhanced.md",
        fr: {
          name: "Archivage des onglets",
          text: "Les onglets inutilisés depuis des heures sont rangés dans une archive puis fermés, prêts à revenir ; une annulation est proposée.",
        },
      },
      {
        name: "Sleeping tabs and Performance",
        pref: "zen-fluent.enhanced.performance",
        text: "Inactive tabs are unloaded after a delay, as in Edge, and a panel shows the memory Zen uses.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+P",
        doc: "enhanced.md",
        fr: {
          name: "Onglets en veille et Performances",
          text: "Les onglets inactifs sont déchargés après un délai, comme dans Edge, et un panneau montre la mémoire utilisée par Zen.",
        },
      },
      {
        name: "Tab notes",
        pref: "zen-fluent.enhanced.tab-notes",
        text: "Firefox's tab notes, turned on, with a list of every note.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+N",
        doc: "enhanced.md",
        fr: {
          name: "Notes d'onglets",
          text: "Les notes d'onglets de Firefox, activées, avec la liste de toutes les notes.",
        },
      },
      {
        name: "Extensions under the Essentials",
        pref: "zen-fluent.enhanced.extensions-below-essentials",
        text: "Moves the extensions row between the Essentials and the tabs, which CSS cannot do.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
        fr: {
          name: "Extensions sous les Essentials",
          text: "Place la rangée d'extensions entre les Essentials et les onglets, ce que le CSS ne sait pas faire.",
        },
      },
      {
        name: "Fluent icons in the icon picker",
        pref: "zen-fluent.enhanced.icon-picker",
        text: "142 Fluent icons for your spaces, folders and pinned tabs.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
        fr: {
          name: "Icônes Fluent dans le sélecteur d'icônes",
          text: "142 icônes Fluent pour vos espaces, dossiers et onglets épinglés.",
        },
      },
    ],
  },
  {
    id: "urlbar",
    title: "URL bar, split view and Glance",
    intro: "Getting around: the address, links and pages side by side.",
    fr: {
      title: "Barre d'adresse, vue partagée et Glance",
      intro: "Se déplacer : l'adresse, les liens et les pages côte à côte.",
    },
    features: [
      {
        name: "URL bar shape and accent line",
        text: "A WinUI text box or Edge's pill, with WinUI's accent line on focus.",
        mod: "core",
        doc: "settings/url-bar.md",
        fr: {
          name: "Forme de la barre d'adresse et ligne d'accent",
          text: "Une zone de texte WinUI ou la pilule d'Edge, avec la ligne d'accent de WinUI au focus.",
        },
      },
      {
        name: "Floating URL bar",
        text: "Solid, Standard (the material), Tint (your space's color) or Translucent, over a dimmed page.",
        mod: "core",
        doc: "settings/url-bar.md",
        fr: {
          name: "Barre d'adresse flottante",
          text: "Solid, Standard (le matériau), Tint (la couleur de votre espace) ou Translucent, sur une page assombrie.",
        },
      },
      {
        name: "Split view and Glance",
        text: "Panes with WinUI corners and an accent outline on the active one; Glance over a dimmed page with Acrylic buttons.",
        mod: "core",
        doc: "settings/window-and-menus.md",
        fr: {
          name: "Vue partagée et Glance",
          text: "Des volets aux coins WinUI avec un contour d'accent sur l'actif ; Glance sur une page assombrie avec des boutons Acrylic.",
        },
      },
      {
        name: "Snap layouts",
        pref: "zen-fluent.enhanced.snap-layouts",
        text: "Windows 11's Snap layouts for split view: hover the maximize button and pick a layout, then Snap Assist fills it.",
        mod: "enhanced",
        on: true,
        keys: "Ctrl+Alt+Shift+Z",
        doc: "enhanced.md",
        fr: {
          name: "Dispositions d'ancrage",
          text: "Les dispositions d'ancrage de Windows 11 pour la vue partagée : survolez le bouton Agrandir, choisissez une disposition, puis l'Assistant d'ancrage la remplit.",
        },
      },
      {
        name: "Breadcrumb address",
        pref: "zen-fluent.enhanced.breadcrumbs",
        text: "The address reads like File Explorer's: the site, each folder, then the page, each one a click away.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
        fr: {
          name: "Adresse en fil d'Ariane",
          text: "L'adresse se lit comme dans l'Explorateur de fichiers : le site, chaque dossier, puis la page, chacun à un clic.",
        },
      },
      {
        name: "Glance link preview",
        pref: "zen-fluent.enhanced.glance",
        text: "Hold Glance's key over a link: a card shows where it leads before you open it.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
        fr: {
          name: "Aperçu des liens Glance",
          text: "Maintenez la touche de Glance sur un lien : une carte montre où il mène avant de l'ouvrir.",
        },
      },
    ],
  },
  {
    id: "window",
    title: "Window, menus and pages",
    intro: "Everything around the page, down to Zen's own screens.",
    fr: {
      title: "Fenêtre, menus et pages",
      intro: "Tout ce qui entoure la page, jusqu'aux écrans de Zen.",
    },
    features: [
      {
        name: "Framed page and caption buttons",
        text: "The page in a card with WinUI corners and a hairline; caption buttons in Windows' styles.",
        mod: "core",
        doc: "settings/window-and-menus.md",
        fr: {
          name: "Page encadrée et boutons de fenêtre",
          text: "La page dans une carte aux coins WinUI avec un fin contour ; les boutons de fenêtre dans les styles de Windows.",
        },
      },
      {
        name: "Menus, panels and dialogs",
        text: "WinUI flyouts for menus, the site panel, permissions, downloads and extensions, with Acrylic and Fluent shadows.",
        mod: "core",
        doc: "core.md",
        fr: {
          name: "Menus, panneaux et boîtes de dialogue",
          text: "Des menus volants WinUI pour les menus, le panneau du site, les permissions, les téléchargements et les extensions, avec Acrylic et les ombres Fluent.",
        },
      },
      {
        name: "Notifications",
        text: "Notification bars as WinUI InfoBars, permission prompts as a TeachingTip, and Zen's toasts.",
        mod: "core",
        doc: "core.md",
        fr: {
          name: "Notifications",
          text: "Les barres de notification en InfoBar WinUI, les demandes de permission en TeachingTip, et les toasts de Zen.",
        },
      },
      {
        name: "Library, Firefox sidebar and media",
        text: "Zen's Library as WinUI lists, bookmarks and history, the media card and the Picture-in-Picture player.",
        mod: "core",
        doc: "core.md",
        fr: {
          name: "Bibliothèque, barre latérale de Firefox et médias",
          text: "La Bibliothèque de Zen en listes WinUI, les marque-pages et l'historique, la carte média et le lecteur Picture-in-Picture.",
        },
      },
      {
        name: "Internal pages",
        text: "Zen's settings, add-ons, about:config and the new tab page in Fluent.",
        mod: "core",
        doc: "core.md",
        fr: {
          name: "Pages internes",
          text: "Les paramètres de Zen, les modules, about:config et la page Nouvel onglet en Fluent.",
        },
      },
      {
        name: "Loading bar and scrollbars",
        text: "WinUI's indeterminate progress bar while a page loads, and thin scrollbars that widen on hover.",
        mod: "core",
        doc: "settings/window-and-menus.md",
        fr: {
          name: "Barre de chargement et barres de défilement",
          text: "La barre de progression indéterminée de WinUI pendant le chargement d'une page, et des barres de défilement fines qui s'élargissent au survol.",
        },
      },
    ],
  },
  {
    id: "productivity",
    title: "Productivity",
    intro: "Windows' own tools, brought to the browser.",
    fr: {
      title: "Productivité",
      intro: "Les outils de Windows, dans le navigateur.",
    },
    features: [
      {
        name: "Focus sessions",
        pref: "zen-fluent.enhanced.focus-session",
        text: "As in Windows' Clock app: a timer that can hide the sidebar, mute tabs and block distracting sites.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
        fr: {
          name: "Sessions de concentration",
          text: "Comme dans l'appli Horloge de Windows : un minuteur qui peut masquer la barre latérale, couper le son des onglets et bloquer les sites qui distraient.",
        },
      },
      {
        name: "Widgets and shelf",
        pref: "zen-fluent.enhanced.shelf",
        text: "The time, what plays, your downloads, and a shelf for links, text and images kept for later.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+W",
        doc: "enhanced.md",
        fr: {
          name: "Widgets et étagère",
          text: "L'heure, ce qui joue, vos téléchargements, et une étagère pour garder liens, textes et images.",
        },
      },
      {
        name: "Start page",
        pref: "zen-fluent.enhanced.start-page",
        text: "New tabs open a greeting, a search field and your top sites, as in Windows 11 and Edge.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
        fr: {
          name: "Page de démarrage",
          text: "Les nouveaux onglets ouvrent un message d'accueil, un champ de recherche et vos sites favoris, comme dans Windows 11 et Edge.",
        },
      },
      {
        name: "Quick window",
        pref: "zen-fluent.enhanced.quick-window",
        text: "A small window for a quick look at a link, like Arc's Little Arc.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+O",
        doc: "enhanced.md",
        fr: {
          name: "Fenêtre rapide",
          text: "Une petite fenêtre pour jeter un œil à un lien, comme Little Arc d'Arc.",
        },
      },
      {
        name: "Keyboard shortcuts sheet",
        pref: "zen-fluent.enhanced.shortcut-overlay",
        text: "Every shortcut of Firefox, Zen and Zen Fluent on one card, with a search field.",
        mod: "enhanced",
        on: true,
        keys: "Ctrl+Alt+Shift+K",
        doc: "enhanced.md",
        fr: {
          name: "Aide-mémoire des raccourcis",
          text: "Tous les raccourcis de Firefox, Zen et Zen Fluent sur une carte, avec un champ de recherche.",
        },
      },
      {
        name: "Command Palette actions",
        pref: "zen-fluent.enhanced.command-palette",
        text: "With the Zen Command Palette mod, its palette gets every Zen Fluent setting, preset and panel.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
        fr: {
          name: "Actions de la Command Palette",
          text: "Avec le mod Zen Command Palette, sa palette reçoit chaque réglage, thème et panneau de Zen Fluent.",
        },
      },
      {
        name: "Browsing stats",
        pref: "zen-fluent.enhanced.browsing-stats",
        text: "Time on pages, visits and top sites for today, 7 or 30 days, read from your history.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+Shift+S",
        doc: "enhanced.md",
        fr: {
          name: "Statistiques de navigation",
          text: "Le temps passé, les visites et les sites les plus vus aujourd'hui, sur 7 ou 30 jours, d'après votre historique.",
        },
      },
      {
        name: "Boost editor extras",
        pref: "zen-fluent.enhanced.boost-extras",
        text: "Narrow column, No motion, Hide images and Sepia tiles in Zen's Boost editor.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
        fr: {
          name: "Extras de l'éditeur Boost",
          text: "Les tuiles Colonne étroite, Sans mouvement, Masquer les images et Sépia dans l'éditeur Boost de Zen.",
        },
      },
      {
        name: "Shortcuts",
        pref: "zen-fluent.enhanced.shortcuts",
        text: "Switch the density, the window theme or the material from the keyboard.",
        mod: "enhanced",
        on: true,
        keys: "Ctrl+Alt+Shift+D, T, M",
        doc: "enhanced.md",
        fr: {
          name: "Raccourcis",
          text: "Changez la densité, le thème de la fenêtre ou le matériau au clavier.",
        },
      },
    ],
  },
  {
    id: "settings",
    title: "Settings and setup",
    intro: "Where you change all of this.",
    fr: {
      title: "Réglages et installation",
      intro: "Là où tout cela se règle.",
    },
    features: [
      {
        name: "Settings in Sine",
        text: "More than a hundred settings in collapsible groups, in the gear of Zen Fluent's card.",
        mod: "core",
        doc: "settings/README.md",
        fr: {
          name: "Réglages dans Sine",
          text: "Plus d'une centaine de réglages en groupes repliables, dans l'engrenage de la carte de Zen Fluent.",
        },
      },
      {
        name: "Zen settings in one place",
        text: "Zen's own options that matter for the look (Glance, the tab preview) next to Zen Fluent's.",
        mod: "core",
        doc: "settings/zen-settings.md",
        fr: {
          name: "Les réglages de Zen au même endroit",
          text: "Les options de Zen qui comptent pour le style (Glance, l'aperçu des onglets) à côté de celles de Zen Fluent.",
        },
      },
      {
        name: "Settings page",
        pref: "zen-fluent.enhanced.settings-page",
        text: "A Zen Fluent page in Zen's settings, drawn like Windows Settings: an overview, themes, a drawing of the window for the variants, search, import and export.",
        mod: "enhanced",
        on: true,
        keys: "Ctrl+Alt+Shift+F",
        doc: "enhanced.md",
        fr: {
          name: "Page de paramètres",
          text: "Une page Zen Fluent dans les paramètres de Zen, dessinée comme les Paramètres de Windows : un aperçu, des thèmes, un dessin de la fenêtre pour les variantes, une recherche, l'import et l'export.",
        },
      },
      {
        name: "Mods",
        text: "Sine's marketplace on the settings page, with each mod's compatibility with Zen Fluent, install, update and uninstall.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
        fr: {
          name: "Mods",
          text: "La boutique de Sine sur la page de paramètres, avec la compatibilité de chaque mod avec Zen Fluent, l'installation, la mise à jour et la désinstallation.",
        },
      },
      {
        name: "Quick Settings",
        pref: "zen-fluent.enhanced.quick-settings",
        text: "A Library tab with the main settings and one-click presets: Windows 11, Microsoft Edge, Taskbar, Arc, Compact.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
        fr: {
          name: "Paramètres rapides",
          text: "Un onglet de la Bibliothèque avec les réglages principaux et des thèmes en un clic : Windows 11, Microsoft Edge, Barre des tâches, Arc, Compact.",
        },
      },
      {
        name: "Settings per space",
        pref: "zen-fluent.enhanced.space-settings",
        text: "A space can have its own mode, style, material, accent and density, applied when you switch to it.",
        mod: "enhanced",
        on: true,
        next: true,
        doc: "enhanced.md",
        fr: {
          name: "Réglages par espace",
          text: "Un espace peut avoir son propre mode, style, matériau, accent et sa densité, appliqués quand vous y passez.",
        },
      },
      {
        name: "Welcome tour",
        pref: "zen-fluent.enhanced.welcome",
        text: "At the first start, a theme, the accent and a few features to turn on, then where the settings live.",
        mod: "enhanced",
        on: true,
        next: true,
        doc: "enhanced.md",
        fr: {
          name: "Visite de bienvenue",
          text: "Au premier démarrage, un thème, l'accent et quelques fonctions à activer, puis où trouver les réglages.",
        },
      },
      {
        name: "French interface",
        text: "The settings page, menus, toasts and Library boards speak French when Zen does.",
        mod: "enhanced",
        on: true,
        next: true,
        doc: "enhanced.md",
        fr: {
          name: "Interface en français",
          text: "La page de paramètres, les menus, les toasts et les panneaux de la Bibliothèque parlent français quand Zen le fait.",
        },
      },
    ],
  },
  {
    id: "web",
    title: "Web pages and AI",
    intro: "Fluent beyond the browser's own interface.",
    fr: {
      title: "Pages web et IA",
      intro: "Fluent au-delà de l'interface du navigateur.",
    },
    features: [
      {
        name: "PDF viewer",
        pref: "zen-fluent.enhanced.pdf-viewer",
        text: "Firefox's PDF viewer with a Mica-like toolbar, WinUI fields and buttons and the accent.",
        mod: "enhanced",
        on: true,
        doc: "enhanced.md",
        fr: {
          name: "Lecteur PDF",
          text: "Le lecteur PDF de Firefox avec une barre d'outils façon Mica, des champs et boutons WinUI et l'accent.",
        },
      },
      {
        name: "Fluent controls on websites",
        pref: "zen-fluent.enhanced.web-controls",
        text: "Buttons, fields, checkboxes and sliders a site leaves unstyled take the WinUI look.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
        fr: {
          name: "Contrôles Fluent sur les sites",
          text: "Les boutons, champs, cases à cocher et curseurs qu'un site ne stylise pas prennent le style WinUI.",
        },
      },
      {
        name: "AI controls page",
        pref: "zen-fluent.enhanced.ai-controls",
        text: "Firefox's AI controls in Zen's settings: each AI feature available, on or blocked.",
        mod: "enhanced",
        on: false,
        doc: "enhanced.md",
        fr: {
          name: "Page des contrôles d'IA",
          text: "Les contrôles d'IA de Firefox dans les paramètres de Zen : chaque fonction d'IA disponible, activée ou bloquée.",
        },
      },
      {
        name: "AI chatbot panel",
        pref: "zen-fluent.enhanced.ai-chat",
        text: "Firefox's chatbot in the sidebar: Claude, ChatGPT, Gemini, HuggingChat or Mistral.",
        mod: "enhanced",
        on: false,
        keys: "Ctrl+Alt+X",
        doc: "enhanced.md",
        fr: {
          name: "Panneau d'assistant IA",
          text: "L'assistant de Firefox dans la barre latérale : Claude, ChatGPT, Gemini, HuggingChat ou Mistral.",
        },
      },
    ],
  },
  {
    id: "a11y",
    title: "Motion, icons and accessibility",
    intro: "WinUI's motion, Fluent icons, and the care for everyone.",
    fr: {
      title: "Mouvement, icônes et accessibilité",
      intro:
        "Les animations de WinUI, les icônes Fluent, et une attention pour chacun.",
    },
    features: [
      {
        name: "Fluent icons",
        pref: "zen-fluent.fluent-icons",
        text: "Toolbar buttons, folders, the Library and spaces take Fluent icons. Needs “Allow the mod's icons”.",
        mod: "core",
        doc: "settings/zones.md",
        fr: {
          name: "Icônes Fluent",
          text: "Les boutons de la barre d'outils, les dossiers, la Bibliothèque et les espaces prennent des icônes Fluent. Demande « Allow the mod's icons ».",
        },
      },
      {
        name: "Animated icons",
        text: "WinUI's AnimatedIcon motion: Back and Forward nudge, Reload turns, the Library books hop.",
        mod: "core",
        doc: "settings/animations.md",
        fr: {
          name: "Icônes animées",
          text: "Les mouvements AnimatedIcon de WinUI : Précédent et Suivant avancent d'un cran, Actualiser tourne, les livres de la Bibliothèque sautillent.",
        },
      },
      {
        name: "Animations",
        text: "WinUI flyout and URL bar opening animations, button fills and press scale.",
        mod: "core",
        doc: "settings/animations.md",
        fr: {
          name: "Animations",
          text: "Les animations d'ouverture des menus volants et de la barre d'adresse de WinUI, le remplissage des boutons et leur enfoncement.",
        },
      },
      {
        name: "Contrast themes",
        text: "With Windows high contrast, every color switches to the system's, with visible edges and Highlight focus.",
        mod: "core",
        doc: "core.md#accessibility",
        fr: {
          name: "Thèmes de contraste",
          text: "Avec le contraste élevé de Windows, chaque couleur passe à celle du système, avec des bords visibles et un focus en surbrillance.",
        },
      },
      {
        name: "Reduced motion",
        text: "With reduced motion, every animation stops; controls change state without moving.",
        mod: "core",
        doc: "core.md#accessibility",
        fr: {
          name: "Animations réduites",
          text: "Avec les animations réduites, tout s'arrête ; les contrôles changent d'état sans bouger.",
        },
      },
      {
        name: "Keyboard focus",
        text: "WinUI's two-ring focus visual on every control, never shown on a click.",
        mod: "core",
        doc: "core.md#accessibility",
        fr: {
          name: "Focus au clavier",
          text: "L'indicateur de focus à deux anneaux de WinUI sur chaque contrôle, jamais affiché au clic.",
        },
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
