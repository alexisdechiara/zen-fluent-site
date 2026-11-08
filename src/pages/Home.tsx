import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownload20Regular,
  ArrowRight16Regular,
  Checkmark16Regular,
  ChevronRight16Regular,
  Code20Regular,
} from "@fluentui/react-icons";
import { BrowserHotspots } from "../components/BrowserHotspots";
import { CompareSlider } from "../components/CompareSlider";
import { CopyField } from "../components/CopyField";
import { FeatureVideo } from "../components/FeatureVideo";
import { InstallerDemo } from "../components/InstallerDemo";
import { kindLabel, localize, useLang } from "../i18n";
import { ModBadge } from "../components/ModBadge";
import { Reveal } from "../components/Reveal";
import { releases } from "../data/changelog";
import { compare } from "../data/compare";
import { countOf, totalWithEnhanced, type Mod } from "../data/features";
import { compatibleMods } from "../data/mods";
import {
  ENHANCED_URL,
  INSTALLER_DOCS_URL,
  INSTALLER_URL,
  MICA_URL,
  REPO,
  SINE_URL,
  VERSION,
  ZEN_MIN_VERSION,
  ZEN_URL,
} from "../data/site";
import { useTheme } from "../theme";

/** Changelog counts always read in this order. */
const kindOrder = [
  "Added",
  "Changed",
  "Fixed",
  "Removed",
  "Deprecated",
  "Security",
];

/** A heading in two parts: the claim, then what follows it on its own line. */
function SplitHeading({ lead, rest }: { lead: string; rest: string }) {
  return (
    <>
      {lead} <span className="heading-rest">{rest}</span>
    </>
  );
}

const highlights: {
  title: string;
  text: string;
  image: string;
  /** The part of the screenshot the card zooms on. */
  focus: string;
  zoom: number;
  alt: string;
  mod: Mod;
  group: string;
  /** A clip recorded in Zen (public/clips), shown instead of the still. */
  video?: string;
  fr: { title: string; text: string; alt: string };
}[] = [
  {
    title: "Mica, Mica Alt or Acrylic",
    text: "The Windows 11 material behind the whole window, tinted with your space's color.",
    image: "dark-mica-alt",
    focus: "0% 0%",
    zoom: 3.4,
    alt: "Zen Fluent with the Mica Alt material in dark mode",
    fr: {
      title: "Mica, Mica Alt ou Acrylic",
      text: "Le matériau de Windows 11 derrière toute la fenêtre, teinté de la couleur de votre espace.",
      alt: "Zen Fluent avec le matériau Mica Alt en mode sombre",
    },
    mod: "core",
    group: "look",
  },
  {
    title: "Or the Microsoft Edge look",
    text: "A second complete style: Edge's pill address bar, raised tabs and framed page.",
    image: "edge",
    focus: "0% 0%",
    zoom: 3.4,
    alt: "Zen Fluent's Microsoft Edge style",
    fr: {
      title: "Ou le style Microsoft Edge",
      text: "Un second style complet : la barre d'adresse en pilule d'Edge, des onglets surélevés et une page encadrée.",
      alt: "Le style Microsoft Edge de Zen Fluent",
    },
    mod: "core",
    group: "look",
  },
  {
    title: "A URL bar like Windows'",
    text: "A WinUI text box or a pill; floating, it takes the material, your space's color or glass.",
    image: "urlbar",
    focus: "72% 11%",
    zoom: 1.85,
    alt: "The floating URL bar over a dimmed page",
    fr: {
      title: "Une barre d'adresse comme sous Windows",
      text: "Une zone de texte WinUI ou une pilule ; flottante, elle prend le matériau, la couleur de votre espace ou du verre.",
      alt: "La barre d'adresse flottante sur une page assombrie",
    },
    mod: "core",
    group: "urlbar",
  },
  {
    title: "Compact mode, done right",
    text: "The sidebar slides in over Acrylic and the page fills the whole window.",
    image: "compact",
    focus: "0% 0%",
    zoom: 2.9,
    alt: "Compact mode with the sidebar shown on hover",
    fr: {
      title: "Le mode compact, bien fait",
      text: "La barre latérale glisse sur un fond Acrylic et la page remplit toute la fenêtre.",
      alt: "Le mode compact avec la barre latérale affichée au survol",
    },
    mod: "core",
    group: "sidebar",
  },
  {
    title: "A settings page like Windows Settings",
    text: "Every setting in Zen's settings, with themes, a drawing of the window and Sine's mods.",
    image: "settings-page",
    focus: "83% 17%",
    zoom: 1.43,
    alt: "Zen Fluent Enhanced's settings page",
    fr: {
      title: "Une page de paramètres comme les Paramètres de Windows",
      text: "Chaque réglage dans les paramètres de Zen, avec des thèmes, un dessin de la fenêtre et les mods de Sine.",
      alt: "La page de paramètres de Zen Fluent Enhanced",
    },
    mod: "enhanced",
    group: "settings",
  },
  {
    title: "Quick Settings and presets",
    text: "Windows 11, Edge, Taskbar, Arc or Compact in one click, from Zen's Library.",
    image: "quick-settings",
    focus: "0% 0%",
    zoom: 2.6,
    alt: "Quick Settings in Zen's Library",
    fr: {
      title: "Paramètres rapides et thèmes",
      text: "Windows 11, Edge, Barre des tâches, Arc ou Compact en un clic, depuis la Bibliothèque de Zen.",
      alt: "Les Paramètres rapides dans la Bibliothèque de Zen",
    },
    mod: "enhanced",
    group: "settings",
  },
];

const mods: {
  mod: Mod;
  lead: string;
  rest: string;
  text: string;
  points: string[];
  link: string;
  linkLabel: string;
  image: string;
  alt: string;
  fr: {
    lead: string;
    rest: string;
    text: string;
    points: string[];
    linkLabel: string;
    alt: string;
  };
}[] = [
  {
    mod: "core",
    lead: "Zen Fluent.",
    rest: "The whole look, in CSS.",
    text: "It applies as soon as Sine installs it, on Windows, Linux and macOS, and every part of it has its settings.",
    points: [
      "Mica, Mica Alt and Acrylic",
      "WinUI 3 or Microsoft Edge style",
      "Your accent, corners and density",
      "More than a hundred settings",
      "Each area can keep Zen's look",
      "Contrast themes, reduced motion",
    ],
    link: "/docs/features?mod=core",
    linkLabel: `All ${countOf("core")} Zen Fluent features`,
    image: "zen-corners-violet",
    alt: "Zen Fluent with Zen's corners and a violet accent",
    fr: {
      lead: "Zen Fluent.",
      rest: "Tout le style, en CSS.",
      text: "Il s'applique dès que Sine l'installe, sous Windows, Linux et macOS, et chaque partie a ses réglages.",
      points: [
        "Mica, Mica Alt et Acrylic",
        "Style WinUI 3 ou Microsoft Edge",
        "Votre accent, vos coins et votre densité",
        "Plus d'une centaine de réglages",
        "Chaque zone peut garder le style de Zen",
        "Thèmes de contraste, animations réduites",
      ],
      linkLabel: `Les ${countOf("core")} fonctions de Zen Fluent`,
      alt: "Zen Fluent avec les coins de Zen et un accent violet",
    },
  },
  {
    mod: "enhanced",
    lead: "Zen Fluent Enhanced.",
    rest: `All of the above, and ${countOf("enhanced")} extras.`,
    text: "Optional, for what CSS cannot do. It installs Zen Fluent with it, and each extra has its own switch.",
    points: [
      "A settings page, Quick Settings",
      "Site color, adaptive accent",
      "Hover cards, Ctrl+Tab as Alt+Tab",
      "Tab archiving, sleeping tabs",
      "Snap layouts, focus sessions",
      "Widgets, a start page",
    ],
    link: "/docs/features",
    linkLabel: `All ${totalWithEnhanced} Enhanced features`,
    image: "settings-page",
    alt: "Zen Fluent Enhanced's settings page in Zen's settings",
    fr: {
      lead: "Zen Fluent Enhanced.",
      rest: `Tout ce qui précède, plus ${countOf("enhanced")} extras.`,
      text: "Optionnel, pour ce que le CSS ne sait pas faire. Il installe Zen Fluent avec lui, et chaque extra a son interrupteur.",
      points: [
        "Une page de paramètres, les Paramètres rapides",
        "Couleur du site, accent adaptatif",
        "Cartes de survol, Ctrl+Tab comme Alt+Tab",
        "Archivage des onglets, onglets en veille",
        "Dispositions d'ancrage, sessions de concentration",
        "Widgets, une page de démarrage",
      ],
      linkLabel: `Les ${totalWithEnhanced} fonctions d'Enhanced`,
      alt: "La page de paramètres de Zen Fluent Enhanced dans les paramètres de Zen",
    },
  },
];

export function Home() {
  const { theme } = useTheme();
  const { lang, t, date: formatDate } = useLang();
  const pair = compare[theme] ?? compare.light;
  const [compareMissing, setCompareMissing] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="container hero__split">
          <h1 className="rise">
            {t("The Windows\u00a011 look", "Le style de Windows\u00a011")}{" "}
            <span className="heading-rest">
              {t("for Zen Browser", "pour Zen Browser")}
            </span>
          </h1>
          <div className="hero__aside rise" style={{ animationDelay: "80ms" }}>
            <p className="hero__lead">
              {t(
                "Zen Fluent redraws every part of Zen with Windows' own design: Mica and Acrylic backgrounds, WinUI controls, Fluent icons. Or the Microsoft Edge look.",
                "Zen Fluent redessine chaque partie de Zen avec le design de Windows : fonds Mica et Acrylic, contrôles WinUI, icônes Fluent. Ou le style de Microsoft Edge.",
              )}
            </p>
            <div className="hero__actions">
              <a
                className="button button--accent button--large"
                href={INSTALLER_URL}>
                <ArrowDownload20Regular />{" "}
                {t("Download for Windows", "Télécharger pour Windows")}
              </a>
              <a className="button button--large" href="#install">
                {t("Other ways to install", "Autres façons d'installer")}
              </a>
            </div>
            <p className="hero__note">
              {t(
                `Installs Zen Fluent and Enhanced · v${VERSION} · Free and open source`,
                `Installe Zen Fluent et Enhanced · v${VERSION} · Gratuit et open source`,
              )}
            </p>
          </div>
        </div>
        <div className="hero__window rise" style={{ animationDelay: "160ms" }}>
          <div className="aurora" aria-hidden />
          <div className="container hero__window-inner">
            <BrowserHotspots />
          </div>
        </div>
      </section>

      <section
        className="section section--statement"
        aria-label={t("In short", "En bref")}>
        <div className="container">
          <Reveal as="p" className="statement">
            {t(
              <>
                Not a new color scheme. Zen Fluent follows{" "}
                <mark className="chip chip--accent">WinUI's own rules</mark> for
                materials, controls, corners and motion in{" "}
                <mark className="chip">every part of the browser</mark> from the
                sidebar and tabs to menus, dialogs and Zen's own pages.
              </>,
              <>
                Pas une simple palette de couleurs. Zen Fluent suit{" "}
                <mark className="chip chip--accent">les règles de WinUI</mark>{" "}
                pour les matériaux, les contrôles, les coins et le mouvement,
                dans <mark className="chip">chaque partie du navigateur</mark>,
                de la barre latérale et des onglets aux menus, aux boîtes de
                dialogue et aux pages de Zen.
              </>,
            )}
          </Reveal>
        </div>
      </section>

      {!compareMissing && (
        <section className="section" aria-labelledby="compare-title">
          <div className="container">
            <div className="section-head section-head--center">
              <h2 id="compare-title">
                <SplitHeading
                  lead={t("Same Zen.", "Le même Zen.")}
                  rest={t("Drawn by Windows.", "Dessiné par Windows.")}
                />
              </h2>
              <p className="section-head__lead">
                {t(
                  "Scroll or drag the handle to compare Zen's default look with Zen Fluent: same window, same tabs, same page.",
                  "Faites défiler ou glissez la poignée pour comparer le style par défaut de Zen avec Zen Fluent : même fenêtre, mêmes onglets, même page.",
                )}
              </p>
            </div>
            <Reveal className="compare-wrap">
              <CompareSlider
                key={theme}
                start={12}
                width={pair.width}
                height={pair.height}
                before={{
                  src: pair.before,
                  label: "Zen",
                  alt: t(
                    "Zen Browser with its default look",
                    "Zen Browser avec son style par défaut",
                  ),
                }}
                after={{
                  src: pair.after,
                  label: "Zen + Zen Fluent",
                  alt: t(
                    "The same window with Zen Fluent",
                    "La même fenêtre avec Zen Fluent",
                  ),
                }}
                onMissing={() => setCompareMissing(true)}
              />
              <ul className="compare-notes">
                <li>
                  {t(
                    "WinUI text box URL bar",
                    "Barre d'adresse en zone de texte WinUI",
                  )}
                </li>
                <li>
                  {t(
                    "Accent pill on the selected tab",
                    "Pilule d'accent sur l'onglet sélectionné",
                  )}
                </li>
                <li>{t("Fluent icons", "Icônes Fluent")}</li>
                <li>
                  {t(
                    "WinUI cards for Essentials",
                    "Essentials en cartes WinUI",
                  )}
                </li>
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="features-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="features-title">
              <SplitHeading
                lead={t(
                  "Every part of Zen, redrawn.",
                  "Chaque partie de Zen, redessinée.",
                )}
                rest={t("Down to the details.", "Jusque dans les détails.")}
              />
            </h2>
            <Link className="button" to="/docs/features">
              {t(
                `All ${totalWithEnhanced} features`,
                `Les ${totalWithEnhanced} fonctions`,
              )}{" "}
              <ArrowRight16Regular />
            </Link>
          </div>
          <ul className="highlights">
            {highlights.map((entry, i) => {
              const item = localize(entry, lang);
              return (
                <Reveal
                  as="li"
                  key={entry.image}
                  className="highlight"
                  delay={(i % 3) * 60}>
                  <Link
                    className="highlight__frame"
                    to={`/docs/features/${item.group}`}
                    aria-label={t(
                      `${item.title}: learn more`,
                      `${item.title} : en savoir plus`,
                    )}>
                    <span
                      className="highlight__shot"
                      style={
                        {
                          "--focus": item.focus,
                          "--zoom": item.zoom,
                        } as React.CSSProperties
                      }>
                      {item.video ? (
                        <FeatureVideo
                          src={item.video}
                          poster={`/shots/${item.image}.webp`}
                          alt={item.alt}
                        />
                      ) : (
                        <img
                          src={`/shots/${item.image}.webp`}
                          alt={item.alt}
                          width={1280}
                          height={800}
                          loading="lazy"
                        />
                      )}
                    </span>
                  </Link>
                  <div className="highlight__text">
                    <h3>
                      {item.title} <ModBadge mod={item.mod} />
                    </h3>
                    <p>{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        className="section"
        aria-label={t("The two mods", "Les deux mods")}>
        <div className="container feature-rows">
          {mods.map((entry, i) => {
            const item = localize(entry, lang);
            return (
              <Reveal
                key={entry.mod}
                className={`feature-row-split${i % 2 ? " is-flipped" : ""}`}>
                <div className="feature-row-split__text">
                  <ModBadge mod={item.mod} />
                  <h2>
                    <SplitHeading lead={item.lead} rest={item.rest} />
                  </h2>
                  <p>{item.text}</p>
                  <ul className="capabilities">
                    {item.points.map((point) => (
                      <li key={point}>
                        <Checkmark16Regular aria-hidden /> {point}
                      </li>
                    ))}
                  </ul>
                  <Link className="link-arrow" to={item.link}>
                    {item.linkLabel} <ChevronRight16Regular />
                  </Link>
                </div>
                <figure className="product-crop">
                  <img
                    src={`/shots/${item.image}.webp`}
                    alt={item.alt}
                    width={1280}
                    height={800}
                    loading="lazy"
                  />
                </figure>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section" id="install" aria-labelledby="install-title">
        <div className="container">
          <Reveal className="install-panel">
            <div className="install-panel__cell install-panel__intro">
              <h2 id="install-title">
                <SplitHeading
                  lead={t(
                    "Install in two minutes.",
                    "Installé en deux minutes.",
                  )}
                  rest={t(
                    "On Windows, Linux and macOS.",
                    "Sous Windows, Linux et macOS.",
                  )}
                />
              </h2>
              <ul className="install-panel__facts">
                <li>
                  <strong>
                    {t(
                      `Zen ${ZEN_MIN_VERSION} or later`,
                      `Zen ${ZEN_MIN_VERSION} ou plus récent`,
                    )}
                  </strong>
                  {t(
                    "Zen Browser or Zen Twilight.",
                    "Zen Browser ou Zen Twilight.",
                  )}
                </li>
                <li>
                  <strong>
                    {t("Mica on Windows 11", "Mica sous Windows 11")}
                  </strong>
                  {t(
                    <>
                      Comes from <a href={MICA_URL}>Mica For Everyone</a>, with
                      a rule for Zen.
                    </>,
                    <>
                      Vient de <a href={MICA_URL}>Mica For Everyone</a>, avec
                      une règle pour Zen.
                    </>,
                  )}
                </li>
                <li>
                  <strong>
                    {t("Blur on Linux and macOS", "Flou sous Linux et macOS")}
                  </strong>
                  {t("From your compositor.", "Celui de votre compositeur.")}
                </li>
                <li>
                  <strong>{t("Your other mods", "Vos autres mods")}</strong>
                  <Link to="/mods#compatible">
                    {t(
                      `${compatibleMods.length} popular mods checked`,
                      `${compatibleMods.length} mods populaires vérifiés`,
                    )}
                  </Link>
                  .
                </li>
              </ul>
            </div>

            <div className="install-panel__cell">
              <InstallerDemo />
              <h3>{t("The installer", "L'installateur")}</h3>
              <p className="install-panel__kind">
                {t("Recommended on Windows", "Recommandé sous Windows")}
              </p>
              <ol className="install__steps">
                <li>
                  {t(
                    "Close Zen and run ZenFluentSetup.exe.",
                    "Fermez Zen et lancez ZenFluentSetup.exe.",
                  )}
                </li>
                <li>
                  {t(
                    "Pick Zen Browser or Zen Twilight, then a profile.",
                    "Choisissez Zen Browser ou Zen Twilight, puis un profil.",
                  )}
                </li>
                <li>
                  {t(
                    "Pick Zen Fluent or Zen Fluent Enhanced, then Install.",
                    "Choisissez Zen Fluent ou Zen Fluent Enhanced, puis Installer.",
                  )}
                </li>
              </ol>
              <a className="button button--accent" href={INSTALLER_URL}>
                <ArrowDownload20Regular />{" "}
                {t(
                  "Download ZenFluentSetup.exe",
                  "Télécharger ZenFluentSetup.exe",
                )}
              </a>
              <p className="install__note">
                {t(
                  "Windows 10 and 11. It installs Sine too.",
                  "Windows 10 et 11. Il installe aussi Sine.",
                )}{" "}
                <a href={INSTALLER_DOCS_URL}>
                  {t("What it does", "Ce qu'il fait")}
                </a>
              </p>
            </div>

            <div className="install-panel__cell">
              <span className="icon-tile" aria-hidden>
                <Code20Regular />
              </span>
              <h3>{t("By hand, with Sine", "À la main, avec Sine")}</h3>
              <p className="install-panel__kind">
                {t("Any system", "Tout système")}
              </p>
              <ol className="install__steps">
                <li>
                  {t(
                    <>
                      Install <a href={ZEN_URL}>Zen Browser</a>, then{" "}
                      <a href={SINE_URL}>Sine</a>.
                    </>,
                    <>
                      Installez <a href={ZEN_URL}>Zen Browser</a>, puis{" "}
                      <a href={SINE_URL}>Sine</a>.
                    </>,
                  )}
                </li>
                <li>
                  {t(
                    "Zen settings › Sine Mods › install from GitHub:",
                    "Paramètres de Zen › Sine Mods › installer depuis GitHub :",
                  )}
                  <CopyField
                    value={REPO}
                    label={t(
                      "the Zen Fluent address",
                      "l'adresse de Zen Fluent",
                    )}
                  />
                </li>
                <li>
                  {t(
                    <>
                      Gear on Zen Fluent's card ›{" "}
                      <strong>Allow the mod's icons</strong>.
                    </>,
                    <>
                      Engrenage de la carte de Zen Fluent ›{" "}
                      <strong>Allow the mod's icons</strong>.
                    </>,
                  )}
                </li>
              </ol>
              <details className="install__more">
                <summary>
                  {t("Add Zen Fluent Enhanced", "Ajouter Zen Fluent Enhanced")}
                </summary>
                <p>
                  {t(
                    <>
                      Check <strong>JS from unofficial sources</strong> in
                      Sine's settings, then install:
                    </>,
                    <>
                      Cochez <strong>JS from unofficial sources</strong> dans
                      les réglages de Sine, puis installez :
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
              </details>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="latest-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="latest-title">
              <SplitHeading
                lead={t("The latest.", "Les dernières versions.")}
                rest={t(
                  "One version for both mods.",
                  "Une version pour les deux mods.",
                )}
              />
            </h2>
            <Link className="button" to="/changelog">
              {t("Changelog", "Nouveautés")} <ArrowRight16Regular />
            </Link>
          </div>
          <ul className="releases-row">
            {releases.slice(0, 3).map((release) => (
              <li key={release.version}>
                <Link
                  className="release-note"
                  to={{ pathname: "/changelog", hash: `#v${release.version}` }}>
                  <time dateTime={release.date}>
                    {formatDate(release.date)}
                  </time>
                  <h3>Version {release.version}</h3>
                  <p>
                    {[...release.sections]
                      .sort(
                        (a, b) =>
                          kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind),
                      )
                      .map((s) => kindLabel(s.kind, s.count, lang))
                      .join(" · ")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="closing" aria-labelledby="closing-title">
        <div className="aurora aurora--closing" aria-hidden />
        <div className="container closing__inner">
          <h2 id="closing-title">
            <SplitHeading
              lead={t("The Windows 11 look", "Le style de Windows 11")}
              rest={t("for Zen Browser", "pour Zen Browser")}
            />
          </h2>
          <div className="hero__actions">
            <a
              className="button button--accent button--large"
              href={INSTALLER_URL}>
              <ArrowDownload20Regular />{" "}
              {t("Download for Windows", "Télécharger pour Windows")}
            </a>
            <Link className="button button--large" to="/docs">
              {t("Read the docs", "Lire la documentation")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
