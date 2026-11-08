import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Checkmark16Regular,
  Dismiss20Regular,
  LocalLanguage20Regular,
  Navigation20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import { useTheme } from "../theme";
import { languages, useLang } from "../i18n";
import { originOf } from "../motion";
import { GitHubIcon, Logo } from "./Icons";
import { REPO_URL } from "../data/site";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useLang();
  const label =
    theme === "dark"
      ? t("Switch to light theme", "Passer au thème clair")
      : t("Switch to dark theme", "Passer au thème sombre");
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={(e) => toggle(originOf(e))}
      aria-label={label}
      title={label}
      data-theme-current={theme}>
      <WeatherSunny20Regular className="theme-toggle__sun" aria-hidden />
      <WeatherMoon20Regular className="theme-toggle__moon" aria-hidden />
    </button>
  );
}

/** English or French: a WinUI menu flyout; the new language grows from
 * the item clicked, as the theme does. */
function LangPicker() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        rootRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const label = t("Language", "Langue");
  return (
    <div className="lang-picker" ref={rootRef}>
      <button
        type="button"
        className="icon-button lang-picker__button"
        aria-label={label}
        title={label}
        aria-expanded={open}
        aria-controls="lang-flyout"
        onClick={() => setOpen((v) => !v)}>
        <LocalLanguage20Regular aria-hidden />
        <span aria-hidden>{lang.toUpperCase()}</span>
      </button>
      {open && (
        <div
          className="lang-flyout"
          id="lang-flyout"
          role="menu"
          aria-label={label}>
          {languages.map((l) => (
            <button
              key={l.id}
              type="button"
              role="menuitemradio"
              aria-checked={lang === l.id}
              lang={l.id}
              className="lang-flyout__item"
              onClick={(e) => {
                setOpen(false);
                if (l.id !== lang) setLang(l.id, originOf(e));
              }}>
              {l.label}
              {lang === l.id && <Checkmark16Regular aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLang();

  const links = [
    { to: "/", label: t("Overview", "Présentation"), end: true },
    { to: "/mods", label: t("Features & mods", "Fonctions et mods") },
    { to: "/docs", label: t("Docs", "Documentation") },
    { to: "/changelog", label: t("Changelog", "Nouveautés") },
  ];

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="container site-header__inner">
        <NavLink
          to="/"
          className="brand"
          aria-label={t("Zen Fluent, home", "Zen Fluent, accueil")}>
          <Logo size={26} />
          <span>Zen Fluent</span>
        </NavLink>

        <nav
          className="site-nav"
          id="site-nav"
          aria-label={t("Main", "Principale")}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className="site-nav__link">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <LangPicker />
          <ThemeToggle />
          <a
            className="button button--subtle github-link"
            href={REPO_URL}
            target="_blank"
            rel="noreferrer">
            <GitHubIcon size={16} />
            <span>GitHub</span>
          </a>
          <Link
            className="button button--accent header-install"
            to={{ pathname: "/", hash: "#install" }}>
            {t("Install", "Installer")}
          </Link>
          <button
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={
              open
                ? t("Close menu", "Fermer le menu")
                : t("Open menu", "Ouvrir le menu")
            }
            onClick={() => setOpen((v) => !v)}>
            {open ? <Dismiss20Regular /> : <Navigation20Regular />}
          </button>
        </div>
      </div>
    </header>
  );
}
