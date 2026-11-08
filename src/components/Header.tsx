import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Checkmark16Regular,
  Color20Regular,
  Dismiss20Regular,
  Navigation20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import { accents, useTheme } from "../theme";
import { originOf } from "../motion";
import { GitHubIcon, Logo } from "./Icons";
import { REPO_URL } from "../data/site";

const links = [
  { to: "/", label: "Overview", end: true },
  { to: "/mods", label: "Features & mods" },
  { to: "/docs", label: "Docs" },
  { to: "/changelog", label: "Changelog" },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={(e) => toggle(originOf(e))}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      data-theme-current={theme}>
      <WeatherSunny20Regular className="theme-toggle__sun" aria-hidden />
      <WeatherMoon20Regular className="theme-toggle__moon" aria-hidden />
    </button>
  );
}

/** The site's accent, from Windows' palette: the new color grows from the
 * swatch clicked, as in Zen Fluent's welcome tour. */
function AccentPicker() {
  const { accent, setAccent } = useTheme();
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

  return (
    <div className="accent-picker" ref={rootRef}>
      <button
        type="button"
        className="icon-button"
        aria-label="Accent color"
        title="Accent color"
        aria-expanded={open}
        aria-controls="accent-flyout"
        onClick={() => setOpen((v) => !v)}>
        <Color20Regular aria-hidden />
      </button>
      {open && (
        <div
          className="accent-flyout"
          id="accent-flyout"
          role="group"
          aria-label="Accent color">
          <p className="accent-flyout__title">Accent color</p>
          <div className="accent-flyout__swatches">
            {accents.map((a) => (
              <button
                key={a.id}
                type="button"
                className="accent-swatch"
                style={{ "--swatch": a.color } as React.CSSProperties}
                aria-label={a.label}
                title={a.label}
                aria-pressed={accent === a.id}
                onClick={(e) => setAccent(a.id, originOf(e))}>
                {accent === a.id && <Checkmark16Regular aria-hidden />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
        <NavLink to="/" className="brand" aria-label="Zen Fluent, home">
          <Logo size={26} />
          <span>Zen Fluent</span>
        </NavLink>

        <nav className="site-nav" id="site-nav" aria-label="Main">
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
          <AccentPicker />
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
            Install
          </Link>
          <button
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}>
            {open ? <Dismiss20Regular /> : <Navigation20Regular />}
          </button>
        </div>
      </div>
    </header>
  );
}
