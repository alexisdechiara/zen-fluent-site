import { Link } from "react-router-dom";
import {
  Apps20Regular,
  ArrowDownload20Regular,
  ChevronRight16Regular,
  PuzzlePiece20Regular,
  Settings20Regular,
} from "@fluentui/react-icons";
import { CopyField } from "../../components/CopyField";
import { ModBadge } from "../../components/ModBadge";
import { countOf, totalWithEnhanced } from "../../data/features";
import { compatibleMods } from "../../data/mods";
import {
  DOCS_URL,
  ENHANCED_URL,
  MICA_URL,
  REPO,
  SINE_URL,
  ZEN_MIN_VERSION,
  ZEN_URL,
} from "../../data/site";
import { useLang } from "../../i18n";
import { Breadcrumb, DocsHeader, DocsPage, DocsPager } from "./parts";

export function Overview() {
  const { t } = useLang();
  const toc = [
    {
      id: "two-mods",
      label: t("Two mods, one version", "Deux mods, une version"),
    },
    { id: "requirements", label: t("Requirements", "Prérequis") },
    { id: "next", label: t("Next steps", "Et ensuite") },
  ];
  const cards = [
    {
      to: "/docs/install",
      icon: ArrowDownload20Regular,
      title: t("Install", "Installation"),
      text: t(
        "The Windows installer, its command line, or Sine on any system.",
        "L'installateur Windows, sa ligne de commande, ou Sine sur tout système.",
      ),
    },
    {
      to: "/docs/features",
      icon: Apps20Regular,
      title: t("All features", "Toutes les fonctions"),
      text: t(
        `${totalWithEnhanced} features, each with its mod, default and preference.`,
        `${totalWithEnhanced} fonctions, chacune avec son mod, sa valeur par défaut et sa préférence.`,
      ),
    },
    {
      href: `${DOCS_URL}/settings/README.md`,
      icon: Settings20Regular,
      title: t("Every setting", "Tous les réglages"),
      text: t(
        "Each preference with its default, one page per group, on GitHub.",
        "Chaque préférence avec sa valeur par défaut, une page par groupe, sur GitHub.",
      ),
    },
    {
      to: "/mods#compatible",
      icon: PuzzlePiece20Regular,
      title: t("Compatible mods", "Mods compatibles"),
      text: t(
        `${compatibleMods.length} popular Sine mods checked with Zen Fluent.`,
        `${compatibleMods.length} mods Sine populaires vérifiés avec Zen Fluent.`,
      ),
    },
  ];

  return (
    <DocsPage toc={toc}>
      <Breadcrumb items={[{ label: t("Docs", "Documentation") }]} />
      <DocsHeader
        title={t("Zen Fluent documentation", "Documentation de Zen Fluent")}
      />
      <p className="docs-lead">
        {t(
          "Zen Fluent gives Zen Browser the look of a Windows 11 app. Start here to install it, then find every feature and the setting that changes it.",
          "Zen Fluent donne à Zen Browser l'allure d'une appli Windows 11. Commencez ici pour l'installer, puis retrouvez chaque fonction et le réglage qui la change.",
        )}
      </p>

      <ul className="doc-cards">
        {cards.map(({ icon: Icon, ...card }) => {
          const body = (
            <>
              <span className="icon-tile" aria-hidden>
                <Icon />
              </span>
              <span className="doc-card__title">
                {card.title} <ChevronRight16Regular aria-hidden />
              </span>
              <span className="doc-card__text">{card.text}</span>
            </>
          );
          return (
            <li key={card.to ?? card.href}>
              {card.to ? (
                <Link className="doc-card" to={card.to}>
                  {body}
                </Link>
              ) : (
                <a className="doc-card" href={card.href}>
                  {body}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <h2 id="two-mods">
        {t("Two mods, one version", "Deux mods, une version")}
      </h2>
      <p>
        {t(
          "Both come from the same repository and share one version. Zen Fluent Enhanced installs Zen Fluent with it.",
          "Les deux viennent du même dépôt et partagent une version. Zen Fluent Enhanced installe Zen Fluent avec lui.",
        )}
      </p>
      <div className="table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th scope="col">
                <span className="visually-hidden">
                  {t("Property", "Propriété")}
                </span>
              </th>
              <th scope="col">
                <ModBadge mod="core" />
              </th>
              <th scope="col">
                <ModBadge mod="enhanced" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{t("What it is", "Ce que c'est")}</th>
              <td>{t("The whole look, in CSS", "Tout le style, en CSS")}</td>
              <td>
                {t(
                  "Zen Fluent, plus extras in JavaScript",
                  "Zen Fluent, plus des extras en JavaScript",
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">{t("Features", "Fonctions")}</th>
              <td>{countOf("core")}</td>
              <td>
                {totalWithEnhanced} ({countOf("core")} + {countOf("enhanced")}{" "}
                extras)
              </td>
            </tr>
            <tr>
              <th scope="row">{t("Switches", "Interrupteurs")}</th>
              <td>
                {t("Settings for each part", "Des réglages pour chaque partie")}
              </td>
              <td>
                {t(
                  "One switch per extra; the boldest start off",
                  "Un interrupteur par extra ; les plus marquants sont désactivés au départ",
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">{t("Needs", "Nécessite")}</th>
              <td>Sine</td>
              <td>
                {t(
                  "Sine, with “JS from unofficial sources”",
                  "Sine, avec « JS from unofficial sources »",
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">{t("Address", "Adresse")}</th>
              <td>
                <CopyField
                  value={REPO}
                  label={t("the Zen Fluent address", "l'adresse de Zen Fluent")}
                />
              </td>
              <td>
                <CopyField
                  value={ENHANCED_URL}
                  label={t(
                    "the Zen Fluent Enhanced address",
                    "l'adresse de Zen Fluent Enhanced",
                  )}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="requirements">{t("Requirements", "Prérequis")}</h2>
      <ul className="docs-list">
        <li>
          {t(
            <>
              <a href={ZEN_URL}>Zen Browser</a> or Zen Twilight, version{" "}
              {ZEN_MIN_VERSION} or later.
            </>,
            <>
              <a href={ZEN_URL}>Zen Browser</a> ou Zen Twilight, version{" "}
              {ZEN_MIN_VERSION} ou plus récente.
            </>,
          )}
        </li>
        <li>
          {t(
            <>
              <a href={SINE_URL}>Sine</a>, Zen's mod manager. The Windows
              installer adds it for you.
            </>,
            <>
              <a href={SINE_URL}>Sine</a>, le gestionnaire de mods de Zen.
              L'installateur Windows l'ajoute pour vous.
            </>,
          )}
        </li>
        <li>
          {t(
            <>
              On Windows 11, <a href={MICA_URL}>Mica For Everyone</a> with a
              rule for Zen, for the see-through Mica and Acrylic.
            </>,
            <>
              Sous Windows 11, <a href={MICA_URL}>Mica For Everyone</a> avec une
              règle pour Zen, pour la transparence de Mica et d'Acrylic.
            </>,
          )}
        </li>
        <li>
          {t(
            "On Linux and macOS, your compositor's blur does the same.",
            "Sous Linux et macOS, le flou de votre compositeur fait de même.",
          )}
        </li>
      </ul>

      <h2 id="next">{t("Next steps", "Et ensuite")}</h2>
      <ul className="docs-list">
        <li>
          {t(
            <>
              <Link to="/docs/install">Install Zen Fluent</Link>, with the
              installer or by hand.
            </>,
            <>
              <Link to="/docs/install">Installez Zen Fluent</Link>, avec
              l'installateur ou à la main.
            </>,
          )}
        </li>
        <li>
          {t(
            <>
              Browse <Link to="/docs/features">all the features</Link>, or
              search them with <kbd>Ctrl K</kbd>.
            </>,
            <>
              Parcourez <Link to="/docs/features">toutes les fonctions</Link>,
              ou cherchez-les avec <kbd>Ctrl K</kbd>.
            </>,
          )}
        </li>
        <li>
          {t(
            <>
              Questions or a bug: open an{" "}
              <a href="https://github.com/alexisdechiara/zen-fluent/issues">
                issue on GitHub
              </a>
              .
            </>,
            <>
              Une question ou un bug : ouvrez une{" "}
              <a href="https://github.com/alexisdechiara/zen-fluent/issues">
                issue sur GitHub
              </a>
              .
            </>,
          )}
        </li>
      </ul>

      <DocsPager current="/docs" />
    </DocsPage>
  );
}
