import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Dismiss20Regular,
  Navigation20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import { useTheme } from "../theme";
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
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      data-theme-current={theme}>
      <WeatherSunny20Regular className="theme-toggle__sun" aria-hidden />
      <WeatherMoon20Regular className="theme-toggle__moon" aria-hidden />
    </button>
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
