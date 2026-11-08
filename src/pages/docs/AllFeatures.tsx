import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronRight16Regular,
  Code20Regular,
  Dismiss16Regular,
  Search20Regular,
  Sparkle20Regular,
} from "@fluentui/react-icons";
import { CopyField } from "../../components/CopyField";
import { ModBadge } from "../../components/ModBadge";
import {
  countOf,
  featureGroups,
  featureId,
  totalWithEnhanced,
  type Feature,
  type Mod,
} from "../../data/features";
import { ENHANCED_URL, REPO } from "../../data/site";
import { localize, useLang } from "../../i18n";
import { Breadcrumb, DocsHeader, DocsPage, DocsPager } from "./parts";

type Filter = "all" | Mod;

const filters: { value: Filter; label: [string, string] }[] = [
  { value: "all", label: ["All", "Toutes"] },
  { value: "core", label: ["Zen Fluent", "Zen Fluent"] },
  { value: "enhanced", label: ["Enhanced extras", "Extras d'Enhanced"] },
];

function FeatureRow({
  feature: item,
  group,
}: {
  feature: Feature;
  group: string;
}) {
  const { lang, t } = useLang();
  const feature = localize(item, lang);
  return (
    <li className="feature-row">
      <div className="feature-row__head">
        <h3>
          <Link to={`/docs/features/${group}#${featureId(item.name)}`}>
            {feature.name}
          </Link>
        </h3>
        <ModBadge mod={feature.mod} />
        {feature.next && (
          <span className="next-badge">
            {t("Next release", "Prochaine version")}
          </span>
        )}
      </div>
      <p>{feature.text}</p>
      {(feature.mod === "enhanced" || feature.keys) && (
        <div className="feature-row__meta">
          {feature.mod === "enhanced" && (
            <span className={`default${feature.on ? " is-on" : ""}`}>
              <span className="default__dot" aria-hidden />
              {feature.on
                ? t("On by default", "Activée par défaut")
                : t("Off by default", "Désactivée par défaut")}
            </span>
          )}
          {feature.keys && <kbd>{feature.keys}</kbd>}
        </div>
      )}
    </li>
  );
}

export function AllFeatures() {
  const [params, setParams] = useSearchParams();
  const param = params.get("mod");
  const filter: Filter =
    param === "core" || param === "enhanced" ? param : "all";
  const [query, setQuery] = useState("");
  const { lang, t } = useLang();

  const setFilter = (value: Filter) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete("mod");
    else next.set("mod", value);
    setParams(next, { replace: true });
  };

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return featureGroups
      .map((group) => ({
        ...group,
        features: group.features.filter(
          (f) =>
            (filter === "all" || f.mod === filter) &&
            (!q ||
              `${f.name} ${f.text} ${f.fr.name} ${f.fr.text}`
                .toLowerCase()
                .includes(q)),
        ),
      }))
      .filter((group) => group.features.length > 0);
  }, [filter, query]);

  const shown = groups.reduce((n, g) => n + g.features.length, 0);
  const toc = groups.map((g) => ({
    id: g.id,
    label: localize(g, lang).title,
  }));

  return (
    <DocsPage toc={toc}>
      <Breadcrumb
        items={[
          { label: t("Docs", "Documentation"), to: "/docs" },
          { label: t("All features", "Toutes les fonctions") },
        ]}
      />
      <DocsHeader title={t("All features", "Toutes les fonctions")} />
      <p className="docs-lead">
        {t(
          "Everything Zen Fluent can do, and which of its two mods does it.",
          "Tout ce que Zen Fluent sait faire, et lequel de ses deux mods le fait.",
        )}
      </p>

      <div className="mods-legend">
        <section className="mods-legend__item">
          <Code20Regular className="mods-legend__icon" aria-hidden />
          <div>
            <h2>
              <ModBadge mod="core" /> {countOf("core")}{" "}
              {t("features", "fonctions")}
            </h2>
            <p>
              {t(
                "The look, in pure CSS. It applies as soon as Sine installs it, on Windows, Linux and macOS, and each part has its settings.",
                "Le style, en pur CSS. Il s'applique dès que Sine l'installe, sous Windows, Linux et macOS, et chaque partie a ses réglages.",
              )}
            </p>
            <CopyField
              value={REPO}
              label={t("the Zen Fluent address", "l'adresse de Zen Fluent")}
            />
          </div>
        </section>
        <section className="mods-legend__item">
          <Sparkle20Regular className="mods-legend__icon" aria-hidden />
          <div>
            <h2>
              <ModBadge mod="enhanced" /> {totalWithEnhanced}{" "}
              {t("features", "fonctions")}
            </h2>
            <p>
              {t(
                `Everything in Zen Fluent, which it installs with it, plus ${countOf("enhanced")} extras for what CSS cannot do. Each extra has its own switch; those that change Zen the most start off.`,
                `Tout Zen Fluent, qu'il installe avec lui, plus ${countOf("enhanced")} extras pour ce que le CSS ne sait pas faire. Chaque extra a son interrupteur ; ceux qui changent le plus Zen sont désactivés au départ.`,
              )}
            </p>
            <CopyField
              value={ENHANCED_URL}
              label={t(
                "the Zen Fluent Enhanced address",
                "l'adresse de Zen Fluent Enhanced",
              )}
            />
          </div>
        </section>
      </div>

      <div className="docs__toolbar">
        <div
          className="segmented"
          role="radiogroup"
          aria-label={t("Show features of", "Afficher les fonctions de")}>
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              role="radio"
              aria-checked={filter === f.value}
              className="segmented__item"
              onClick={() => setFilter(f.value)}>
              {t(f.label[0], f.label[1])}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Search20Regular aria-hidden />
          <span className="visually-hidden">
            {t("Filter features", "Filtrer les fonctions")}
          </span>
          <input
            type="search"
            placeholder={t("Filter features", "Filtrer les fonctions")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <p className="docs__count" aria-live="polite">
          {shown}{" "}
          {shown === 1 ? t("feature", "fonction") : t("features", "fonctions")}
        </p>
      </div>

      {groups.length === 0 ? (
        <div className="docs__empty">
          <p>
            {t(
              `No feature matches “${query}”.`,
              `Aucune fonction ne correspond à « ${query} ».`,
            )}
          </p>
          <button
            type="button"
            className="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}>
            <Dismiss16Regular /> {t("Clear the filter", "Effacer le filtre")}
          </button>
        </div>
      ) : (
        groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            className="docs__group"
            aria-labelledby={`${group.id}-title`}>
            <h2 id={`${group.id}-title`}>
              <Link to={`/docs/features/${group.id}`}>
                {localize(group, lang).title}{" "}
                <ChevronRight16Regular aria-hidden />
              </Link>
            </h2>
            <p className="docs__group-intro">{localize(group, lang).intro}</p>
            <ul className="feature-list">
              {group.features.map((feature) => (
                <FeatureRow
                  key={feature.name}
                  feature={feature}
                  group={group.id}
                />
              ))}
            </ul>
          </section>
        ))
      )}

      <p className="docs-note">
        {t(
          "“Next release” features are on the development branch and come with the next version.",
          "Les fonctions « Prochaine version » sont sur la branche de développement et arrivent avec la prochaine version.",
        )}
      </p>

      <DocsPager current="/docs/features" />
    </DocsPage>
  );
}
