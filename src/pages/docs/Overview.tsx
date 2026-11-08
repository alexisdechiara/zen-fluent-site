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
import { Breadcrumb, DocsHeader, DocsPage, DocsPager } from "./parts";

const toc = [
  { id: "two-mods", label: "Two mods, one version" },
  { id: "requirements", label: "Requirements" },
  { id: "next", label: "Next steps" },
];

export function Overview() {
  const cards = [
    {
      to: "/docs/install",
      icon: ArrowDownload20Regular,
      title: "Install",
      text: "The Windows installer, its command line, or Sine on any system.",
    },
    {
      to: "/docs/features",
      icon: Apps20Regular,
      title: "All features",
      text: `${totalWithEnhanced} features, each with its mod, default and preference.`,
    },
    {
      href: `${DOCS_URL}/settings/README.md`,
      icon: Settings20Regular,
      title: "Every setting",
      text: "Each preference with its default, one page per group, on GitHub.",
    },
    {
      to: "/mods#compatible",
      icon: PuzzlePiece20Regular,
      title: "Compatible mods",
      text: `${compatibleMods.length} popular Sine mods checked with Zen Fluent.`,
    },
  ];

  return (
    <DocsPage toc={toc}>
      <Breadcrumb items={[{ label: "Docs" }]} />
      <DocsHeader title="Zen Fluent documentation" />
      <p className="docs-lead">
        Zen Fluent gives Zen Browser the look of a Windows 11 app. Start here to
        install it, then find every feature and the setting that changes it.
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
            <li key={card.title}>
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

      <h2 id="two-mods">Two mods, one version</h2>
      <p>
        Both come from the same repository and share one version. Zen Fluent
        Enhanced installs Zen Fluent with it.
      </p>
      <div className="table-wrap">
        <table className="docs-table">
          <thead>
            <tr>
              <th scope="col">
                <span className="visually-hidden">Property</span>
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
              <th scope="row">What it is</th>
              <td>The whole look, in CSS</td>
              <td>Zen Fluent, plus extras in JavaScript</td>
            </tr>
            <tr>
              <th scope="row">Features</th>
              <td>{countOf("core")}</td>
              <td>
                {totalWithEnhanced} ({countOf("core")} + {countOf("enhanced")}{" "}
                extras)
              </td>
            </tr>
            <tr>
              <th scope="row">Switches</th>
              <td>Settings for each part</td>
              <td>One switch per extra; the boldest start off</td>
            </tr>
            <tr>
              <th scope="row">Needs</th>
              <td>Sine</td>
              <td>Sine, with “JS from unofficial sources”</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>
                <CopyField value={REPO} label="the Zen Fluent address" />
              </td>
              <td>
                <CopyField
                  value={ENHANCED_URL}
                  label="the Zen Fluent Enhanced address"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="requirements">Requirements</h2>
      <ul className="docs-list">
        <li>
          <a href={ZEN_URL}>Zen Browser</a> or Zen Twilight, version{" "}
          {ZEN_MIN_VERSION} or later.
        </li>
        <li>
          <a href={SINE_URL}>Sine</a>, Zen's mod manager. The Windows installer
          adds it for you.
        </li>
        <li>
          On Windows 11, <a href={MICA_URL}>Mica For Everyone</a> with a rule
          for Zen, for the see-through Mica and Acrylic.
        </li>
        <li>On Linux and macOS, your compositor's blur does the same.</li>
      </ul>

      <h2 id="next">Next steps</h2>
      <ul className="docs-list">
        <li>
          <Link to="/docs/install">Install Zen Fluent</Link>, with the installer
          or by hand.
        </li>
        <li>
          Browse <Link to="/docs/features">all the features</Link>, or search
          them with <kbd>Ctrl K</kbd>.
        </li>
        <li>
          Questions or a bug: open an{" "}
          <a href="https://github.com/alexisdechiara/zen-fluent/issues">
            issue on GitHub
          </a>
          .
        </li>
      </ul>

      <DocsPager current="/docs" />
    </DocsPage>
  );
}
