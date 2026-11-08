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
import { Breadcrumb, DocsHeader, DocsPage, DocsPager } from "./parts";

type Filter = "all" | Mod;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "core", label: "Zen Fluent" },
  { value: "enhanced", label: "Enhanced extras" },
];

function FeatureRow({ feature, group }: { feature: Feature; group: string }) {
  return (
    <li className="feature-row">
      <div className="feature-row__head">
        <h3>
          <Link to={`/docs/features/${group}#${featureId(feature.name)}`}>
            {feature.name}
          </Link>
        </h3>
        <ModBadge mod={feature.mod} />
        {feature.next && <span className="next-badge">Next release</span>}
      </div>
      <p>{feature.text}</p>
      {(feature.mod === "enhanced" || feature.keys) && (
        <div className="feature-row__meta">
          {feature.mod === "enhanced" && (
            <span className={`default${feature.on ? " is-on" : ""}`}>
              <span className="default__dot" aria-hidden />
              {feature.on ? "On by default" : "Off by default"}
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
            (!q || `${f.name} ${f.text}`.toLowerCase().includes(q)),
        ),
      }))
      .filter((group) => group.features.length > 0);
  }, [filter, query]);

  const shown = groups.reduce((n, g) => n + g.features.length, 0);
  const toc = groups.map((g) => ({ id: g.id, label: g.title }));

  return (
    <DocsPage toc={toc}>
      <Breadcrumb
        items={[{ label: "Docs", to: "/docs" }, { label: "All features" }]}
      />
      <DocsHeader title="All features" />
      <p className="docs-lead">
        Everything Zen Fluent can do, and which of its two mods does it.
      </p>

      <div className="mods-legend">
        <section className="mods-legend__item">
          <Code20Regular className="mods-legend__icon" aria-hidden />
          <div>
            <h2>
              <ModBadge mod="core" /> {countOf("core")} features
            </h2>
            <p>
              The look, in pure CSS. It applies as soon as Sine installs it, on
              Windows, Linux and macOS, and each part has its settings.
            </p>
            <CopyField value={REPO} label="the Zen Fluent address" />
          </div>
        </section>
        <section className="mods-legend__item">
          <Sparkle20Regular className="mods-legend__icon" aria-hidden />
          <div>
            <h2>
              <ModBadge mod="enhanced" /> {totalWithEnhanced} features
            </h2>
            <p>
              Everything in Zen Fluent, which it installs with it, plus{" "}
              {countOf("enhanced")} extras for what CSS cannot do. Each extra
              has its own switch; those that change Zen the most start off.
            </p>
            <CopyField
              value={ENHANCED_URL}
              label="the Zen Fluent Enhanced address"
            />
          </div>
        </section>
      </div>

      <div className="docs__toolbar">
        <div
          className="segmented"
          role="radiogroup"
          aria-label="Show features of">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              role="radio"
              aria-checked={filter === f.value}
              className="segmented__item"
              onClick={() => setFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Search20Regular aria-hidden />
          <span className="visually-hidden">Filter features</span>
          <input
            type="search"
            placeholder="Filter features"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <p className="docs__count" aria-live="polite">
          {shown} {shown === 1 ? "feature" : "features"}
        </p>
      </div>

      {groups.length === 0 ? (
        <div className="docs__empty">
          <p>No feature matches “{query}”.</p>
          <button
            type="button"
            className="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}>
            <Dismiss16Regular /> Clear the filter
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
                {group.title} <ChevronRight16Regular aria-hidden />
              </Link>
            </h2>
            <p className="docs__group-intro">{group.intro}</p>
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
        “Next release” features are on the development branch and come with the
        next version.
      </p>

      <DocsPager current="/docs/features" />
    </DocsPage>
  );
}
