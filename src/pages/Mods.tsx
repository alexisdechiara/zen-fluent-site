import {
  ArchiveArrowBack24Regular,
  Apps24Regular,
  CheckmarkCircle16Filled,
  ColorBackground24Regular,
  DocumentText16Regular,
  Open16Regular,
  Search24Regular,
  Settings24Regular,
  SlideLayout24Regular,
  Sparkle24Regular,
  Timer24Regular,
} from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { SectionHead } from "../components/SectionHead";
import { GitHubIcon } from "../components/Icons";
import { compatibleMods, docsAnchor } from "../data/mods";
import { DOCS_URL, ENHANCED_URL } from "../data/site";
import { CopyField } from "../components/CopyField";
import { FeatureDemo, type DemoScene } from "../components/FeatureDemo";
import { localize, useLang } from "../i18n";

const showcase: {
  title: string;
  text: string;
  image: string;
  alt: string;
  doc: string;
  demo: DemoScene;
  fr: { title: string; text: string; alt: string };
}[] = [
  {
    title: "The Microsoft Edge look",
    text: "A second complete style, from Edge and Fluent 2: a pill address bar, light cards for Essentials and the selected tab, and the page in its frame. Enhanced's Quick Settings switch between Windows 11 and Edge in one click.",
    image: "edge",
    demo: "edge",
    alt: "Zen Browser in Zen Fluent's Microsoft Edge style",
    doc: "settings/appearance.md",
    fr: {
      title: "Le style Microsoft Edge",
      text: "Un second style complet, venu d'Edge et de Fluent 2 : une barre d'adresse en pilule, des cartes claires pour les Essentials et l'onglet sélectionné, et la page dans son cadre. Les Paramètres rapides d'Enhanced passent de Windows 11 à Edge en un clic.",
      alt: "Zen Browser dans le style Microsoft Edge de Zen Fluent",
    },
  },
  {
    title: "A URL bar that feels like Windows",
    text: "A WinUI text box with its accent line, or Edge's pill. Floating, it can be white or black, the window's material, your space's color or see-through glass, and the page behind it dims.",
    image: "urlbar",
    demo: "urlbar",
    alt: "The floating URL bar over a dimmed page",
    doc: "settings/url-bar.md",
    fr: {
      title: "Une barre d'adresse comme sous Windows",
      text: "Une zone de texte WinUI avec sa ligne d'accent, ou la pilule d'Edge. Flottante, elle peut être blanche ou noire, du matériau de la fenêtre, de la couleur de votre espace ou en verre transparent, et la page derrière s'assombrit.",
      alt: "La barre d'adresse flottante sur une page assombrie",
    },
  },
  {
    title: "Compact mode, done right",
    text: "The sidebar slides in on hover with an Acrylic background, a hint shows where it hides, and the page can fill the whole window.",
    image: "compact",
    demo: "compact",
    alt: "Compact mode with the sidebar shown on hover",
    doc: "settings/sidebar.md",
    fr: {
      title: "Le mode compact, bien fait",
      text: "La barre latérale glisse au survol sur un fond Acrylic, un repère montre où elle se cache, et la page peut remplir toute la fenêtre.",
      alt: "Le mode compact avec la barre latérale affichée au survol",
    },
  },
  {
    title: "Split view and Glance",
    text: "Panes with WinUI corners and an accent outline on the active one; Glance opens over a dimmed page with round Acrylic buttons.",
    image: "split",
    demo: "split",
    alt: "Split view with two pages side by side",
    doc: "settings/window-and-menus.md",
    fr: {
      title: "Vue partagée et Glance",
      text: "Des volets aux coins WinUI avec un contour d'accent sur l'actif ; Glance s'ouvre sur une page assombrie avec des boutons ronds en Acrylic.",
      alt: "La vue partagée avec deux pages côte à côte",
    },
  },
  {
    title: "Zen's Library in Fluent",
    text: "Downloads, history, spaces and media as WinUI lists, with Enhanced's Widgets, Focus and Quick settings as extra tabs.",
    image: "library",
    demo: "library",
    alt: "Zen's Library drawn as WinUI lists",
    doc: "settings/sidebar.md",
    fr: {
      title: "La Bibliothèque de Zen en Fluent",
      text: "Téléchargements, historique, espaces et médias en listes WinUI, avec les Widgets, la Concentration et les Paramètres rapides d'Enhanced en onglets de plus.",
      alt: "La Bibliothèque de Zen dessinée en listes WinUI",
    },
  },
  {
    title: "Settings for every part",
    text: "More than 200 settings in collapsible groups, in Sine's dialog or in Enhanced's own settings page: fills and shapes per component, Essentials, extensions row, animations, and an expert mode.",
    image: "sine",
    demo: "groups",
    alt: "Zen Fluent's settings in Sine",
    doc: "settings/essentials.md",
    fr: {
      title: "Des réglages pour chaque partie",
      text: "Plus de 200 réglages en groupes repliables, dans la boîte de dialogue de Sine ou dans la page de paramètres d'Enhanced : remplissages et formes par composant, Essentials, rangée d'extensions, animations, et un mode expert.",
      alt: "Les réglages de Zen Fluent dans Sine",
    },
  },
];

const enhanced = [
  {
    icon: Search24Regular,
    title: "Command Palette actions",
    text: "With the Zen Command Palette mod, every Zen Fluent setting, preset and panel from one search box.",
    fr: {
      title: "Actions de la Command Palette",
      text: "Avec le mod Zen Command Palette, chaque réglage, thème et panneau de Zen Fluent depuis un seul champ de recherche.",
    },
  },
  {
    icon: Apps24Regular,
    title: "Widgets and shelf",
    text: "The time, what plays, your downloads and a shelf for links, in the Library.",
    fr: {
      title: "Widgets et étagère",
      text: "L'heure, ce qui joue, vos téléchargements et une étagère pour vos liens, dans la Bibliothèque.",
    },
  },
  {
    icon: Timer24Regular,
    title: "Focus sessions",
    text: "A timer that hides the sidebar, mutes tabs and blocks distracting sites.",
    fr: {
      title: "Sessions de concentration",
      text: "Un minuteur qui masque la barre latérale, coupe le son des onglets et bloque les sites qui distraient.",
    },
  },
  {
    icon: ColorBackground24Regular,
    title: "Site color",
    text: "The window takes a tint of the site you read, over your space's theme.",
    fr: {
      title: "Couleur du site",
      text: "La fenêtre prend une teinte du site que vous lisez, par-dessus le thème de votre espace.",
    },
  },
  {
    icon: SlideLayout24Regular,
    title: "Tab switcher and snap layouts",
    text: "Alt+Tab-like previews, and Windows' layouts for split view.",
    fr: {
      title: "Sélecteur d'onglets et dispositions d'ancrage",
      text: "Des aperçus façon Alt+Tab, et les dispositions de Windows pour la vue partagée.",
    },
  },
  {
    icon: ArchiveArrowBack24Regular,
    title: "Tab archive",
    text: "Tabs left alone are archived, ready to come back.",
    fr: {
      title: "Archive des onglets",
      text: "Les onglets délaissés sont archivés, prêts à revenir.",
    },
  },
  {
    icon: Settings24Regular,
    title: "A real settings page",
    text: "Zen Fluent's settings drawn like Windows' Settings app, with themes and Sine's marketplace.",
    fr: {
      title: "Une vraie page de paramètres",
      text: "Les réglages de Zen Fluent dessinés comme l'appli Paramètres de Windows, avec des thèmes et la boutique de Sine.",
    },
  },
  {
    icon: Sparkle24Regular,
    title: "And more",
    text: "Hover cards, tab notes, a start page, a quick window, PDF and AI tools.",
    fr: {
      title: "Et plus encore",
      text: "Cartes de survol, notes d'onglets, une page de démarrage, une fenêtre rapide, des outils PDF et IA.",
    },
  },
];

export function Mods() {
  const { lang, t } = useLang();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="rise">
            {t(
              "Every part of Zen, redrawn",
              "Chaque partie de Zen, redessinée",
            )}
          </h1>
          <p
            className="page-hero__lead rise"
            style={{ animationDelay: "120ms" }}>
            {t(
              "Zen Fluent styles the whole browser: sidebar, tabs, Essentials, URL bar, menus, dialogs, settings and Zen's own tools.",
              "Zen Fluent habille tout le navigateur : barre latérale, onglets, Essentials, barre d'adresse, menus, boîtes de dialogue, réglages et les outils de Zen.",
            )}
          </p>
          <nav
            className="page-hero__jump rise"
            style={{ animationDelay: "180ms" }}
            aria-label={t("On this page", "Sur cette page")}>
            <a href="#look">{t("The look", "Le style")}</a>
            <a href="#enhanced">Enhanced</a>
            <a href="#compatible">{t("Compatible mods", "Mods compatibles")}</a>
          </nav>
        </div>
      </section>

      <section
        className="section section--tight"
        id="look"
        aria-label={t("The look", "Le style")}>
        <div className="container showcase">
          {showcase.map((entry, i) => {
            const item = localize(entry, lang);
            return (
              <Reveal
                key={entry.image}
                className={`showcase__row${i % 2 ? " is-flipped" : ""}`}>
                <div className="showcase__text">
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                  <a
                    className="link-arrow"
                    href={`${DOCS_URL}/${item.doc}`}
                    target="_blank"
                    rel="noreferrer">
                    {t("Settings on GitHub", "Les réglages sur GitHub")}{" "}
                    <Open16Regular />
                  </a>
                </div>
                <figure className="showcase__media" title={item.alt}>
                  <FeatureDemo scene={item.demo} />
                </figure>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section
        className="section section--band"
        id="enhanced"
        aria-labelledby="enhanced-title">
        <div className="container">
          <SectionHead title="Zen Fluent Enhanced" id="enhanced-title">
            {t(
              "Optional features on top of the look, in JavaScript. Each one has its own switch and leaves nothing behind when turned off.",
              "Des fonctions optionnelles en plus du style, en JavaScript. Chacune a son interrupteur et ne laisse rien derrière elle une fois désactivée.",
            )}
          </SectionHead>
          <div className="enhanced-grid">
            {enhanced.map((entry, i) => {
              const { icon: Icon, title, text } = localize(entry, lang);
              return (
                <Reveal
                  key={entry.title}
                  className="card enhanced-card"
                  delay={(i % 4) * 50}>
                  <Icon className="enhanced-card__icon" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              );
            })}
          </div>
          <p className="section-cta">
            <Link className="button" to="/docs/features?mod=enhanced">
              {t(
                "Everything Enhanced adds, with its defaults",
                "Tout ce qu'ajoute Enhanced, avec ses valeurs par défaut",
              )}
            </Link>
          </p>
          <Reveal className="enhanced-install">
            <p>
              {t(
                <>
                  Install it from Sine with this address, then turn on{" "}
                  <strong>JS from unofficial sources</strong>:
                </>,
                <>
                  Installez-le depuis Sine avec cette adresse, puis activez{" "}
                  <strong>JS from unofficial sources</strong> :
                </>,
              )}
            </p>
            <CopyField
              value={ENHANCED_URL}
              label={t(
                "the Zen Fluent Enhanced address",
                "l'adresse de Zen Fluent Enhanced",
              )}
            />
          </Reveal>
        </div>
      </section>

      <section
        className="section"
        id="compatible"
        aria-labelledby="compatible-title">
        <div className="container">
          <SectionHead
            title={t(
              <>
                Works with{" "}
                <span className="count-pill">{compatibleMods.length}</span> mods
                you already use
              </>,
              <>
                Fonctionne avec{" "}
                <span className="count-pill">{compatibleMods.length}</span> mods
                que vous utilisez déjà
              </>,
            )}
            id="compatible-title">
            {t(
              "Zen Fluent carries rules for these mods so they blend in. Install any of them from Sine's marketplace.",
              "Zen Fluent embarque des règles pour que ces mods s'intègrent. Installez-les depuis la boutique de Sine. Leurs descriptions sont en anglais.",
            )}
          </SectionHead>

          <ul className="mods-grid">
            {compatibleMods.map((mod, i) => (
              <Reveal
                as="li"
                key={mod.id}
                className="card compat-card"
                delay={(i % 3) * 50}>
                <div className="compat-card__head">
                  <span className="compat-card__avatar" aria-hidden>
                    {mod.name.replace(/^Zen\s*/i, "").charAt(0)}
                  </span>
                  <div>
                    <h3>{mod.name}</h3>
                    <a
                      className="compat-card__repo"
                      href={`https://github.com/${mod.repo}`}
                      target="_blank"
                      rel="noreferrer">
                      {mod.repo}
                    </a>
                  </div>
                  <span className="status">
                    <CheckmarkCircle16Filled />{" "}
                    {mod.status === "partial"
                      ? t("Works, with a limit", "Fonctionne, avec une limite")
                      : t("Works", "Fonctionne")}
                  </span>
                </div>
                <p className="compat-card__summary">{mod.summary}</p>
                <p className="compat-card__tested">
                  {t(
                    `Checked with Zen Fluent ${mod.tested.zenFluent} and ${mod.name} ${mod.tested.version}`,
                    `Vérifié avec Zen Fluent ${mod.tested.zenFluent} et ${mod.name} ${mod.tested.version}`,
                  )}
                </p>
                <div className="compat-card__links">
                  <a
                    href={`https://github.com/${mod.repo}`}
                    target="_blank"
                    rel="noreferrer">
                    <GitHubIcon size={14} /> {t("The mod", "Le mod")}
                  </a>
                  <a
                    href={`${DOCS_URL}/compatibility.md#${docsAnchor(mod.name)}`}
                    target="_blank"
                    rel="noreferrer">
                    <DocumentText16Regular />{" "}
                    {t("What Zen Fluent does", "Ce que fait Zen Fluent")}
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="fine-print">
            {t(
              "A mod not listed has not been checked yet: it may work fine. Zen Fluent Enhanced's settings page shows the whole marketplace with each mod's status.",
              "Un mod absent de la liste n'a pas encore été vérifié : il fonctionne peut-être très bien. La page de paramètres de Zen Fluent Enhanced montre toute la boutique avec l'état de chaque mod.",
            )}
          </p>
        </div>
      </section>
    </>
  );
}
