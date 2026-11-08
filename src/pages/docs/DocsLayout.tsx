import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ChevronDown16Regular,
  Dismiss16Regular,
  Navigation20Regular,
  Open16Regular,
  Search20Regular,
} from "@fluentui/react-icons";
import { ModBadge } from "../../components/ModBadge";
import {
  allFeatures,
  featureGroups,
  featureId,
  groupOf,
  totalWithEnhanced,
} from "../../data/features";
import { DOCS_URL, REPO_URL } from "../../data/site";
import { localize, useLang } from "../../i18n";
import { docPages } from "./nav";

/** The docs: a NavigationView pane on the left, the page beside it. */
export function DocsLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(true);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { lang, t } = useLang();

  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [location.pathname, location.hash]);

  // Ctrl+K (or Cmd+K) jumps to the search field, as in most docs.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        requestAnimationFrame(() => searchRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = query.trim().toLowerCase();
  const results = q
    ? allFeatures.filter((f) =>
        `${f.name} ${f.text} ${f.fr.name} ${f.fr.text} ${f.pref ?? ""}`
          .toLowerCase()
          .includes(q),
      )
    : [];
  const current = localize(
    docPages.find((p) => p.to === location.pathname) ?? docPages[0],
    lang,
  );

  return (
    <div className="container docs-shell">
      <button
        type="button"
        className="button docs-menu-toggle"
        aria-expanded={open}
        aria-controls="docs-pane"
        onClick={() => setOpen((v) => !v)}>
        {open ? <Dismiss16Regular /> : <Navigation20Regular />}
        <span>{open ? t("Close", "Fermer") : current.title}</span>
      </button>

      <aside
        id="docs-pane"
        className={`docs-pane${open ? " is-open" : ""}`}
        aria-label="Documentation">
        <label className="search-box docs-search">
          <Search20Regular aria-hidden />
          <span className="visually-hidden">
            {t("Search the docs", "Rechercher dans la documentation")}
          </span>
          <input
            ref={searchRef}
            type="search"
            placeholder={t(
              "Search the docs",
              "Rechercher dans la documentation",
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setQuery("")}
          />
          <kbd aria-hidden>Ctrl K</kbd>
        </label>

        {q ? (
          <div className="docs-results" aria-live="polite">
            <p className="docs-pane__heading">
              {results.length}{" "}
              {results.length === 1
                ? t("result", "résultat")
                : t("results", "résultats")}
            </p>
            {results.length === 0 ? (
              <p className="docs-results__empty">
                {t(
                  `No feature matches “${query}”.`,
                  `Aucune fonction ne correspond à « ${query} ».`,
                )}
              </p>
            ) : (
              <ul>
                {results.map((feature) => {
                  const f = localize(feature, lang);
                  const group = localize(groupOf(feature), lang);
                  return (
                    <li key={f.name}>
                      <Link
                        to={`/docs/features/${group.id}#${featureId(feature.name)}`}>
                        <span className="docs-results__name">
                          {f.name} <ModBadge mod={f.mod} />
                        </span>
                        <small>{group.title}</small>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : (
          <nav className="docs-nav">
            {docPages.slice(0, 2).map((page) => (
              <NavLink
                key={page.to}
                to={page.to}
                end
                className="docs-nav__item">
                <page.icon aria-hidden />
                <span className="docs-nav__label">
                  {localize(page, lang).title}
                </span>
              </NavLink>
            ))}

            <button
              type="button"
              className="docs-nav__group"
              aria-expanded={featuresOpen}
              onClick={() => setFeaturesOpen((v) => !v)}>
              {t("Features", "Fonctions")}
              <ChevronDown16Regular aria-hidden />
            </button>
            {featuresOpen && (
              <div className="docs-nav__children">
                {docPages.slice(2).map((page) => (
                  <NavLink
                    key={page.to}
                    to={page.to}
                    end
                    className="docs-nav__item">
                    <page.icon aria-hidden />
                    <span className="docs-nav__label">
                      {localize(page, lang).title}
                    </span>
                    <span className="docs-nav__count">
                      {page.to === "/docs/features"
                        ? totalWithEnhanced
                        : featureGroups.find((g) => page.to.endsWith(g.id))
                            ?.features.length}
                    </span>
                  </NavLink>
                ))}
              </div>
            )}

            <p className="docs-pane__heading">{t("Reference", "Référence")}</p>
            <a
              className="docs-nav__item"
              href={`${DOCS_URL}/settings/README.md`}>
              {t("Every setting", "Tous les réglages")}{" "}
              <Open16Regular className="docs-nav__external" aria-hidden />
            </a>
            <Link className="docs-nav__item" to="/mods#compatible">
              {t("Compatible mods", "Mods compatibles")}
            </Link>
            <Link className="docs-nav__item" to="/changelog">
              {t("Changelog", "Nouveautés")}
            </Link>
            <a className="docs-nav__item" href={REPO_URL}>
              {t("Source code", "Code source")}{" "}
              <Open16Regular className="docs-nav__external" aria-hidden />
            </a>
          </nav>
        )}
      </aside>

      <div className="docs-content">
        <Outlet />
      </div>
    </div>
  );
}
