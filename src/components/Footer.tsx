import { Link } from "react-router-dom";
import { Logo } from "./Icons";
import { useLang } from "../i18n";
import {
  DOCS_URL,
  INSTALLER_DOCS_URL,
  REPO_URL,
  SINE_URL,
  VERSION,
  ZEN_URL,
} from "../data/site";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Logo size={22} />
          <p>
            Zen Fluent {VERSION} · {t("MIT license.", "Licence MIT.")}
            <br />
            {t(
              "Not affiliated with Microsoft or Zen Browser.",
              "Sans lien avec Microsoft ni avec Zen Browser.",
            )}
          </p>
        </div>
        <nav
          className="site-footer__links"
          aria-label={t("Footer", "Pied de page")}>
          <div>
            <h2>Site</h2>
            <Link to="/">{t("Overview", "Présentation")}</Link>
            <Link to="/mods">{t("Features & mods", "Fonctions et mods")}</Link>
            <Link to="/docs">Documentation</Link>
            <Link to="/changelog">{t("Changelog", "Nouveautés")}</Link>
          </div>
          <div>
            <h2>{t("Project", "Projet")}</h2>
            <a href={REPO_URL}>GitHub</a>
            <a href={`${DOCS_URL}/installation.md`}>
              {t("Installation guide", "Guide d'installation")}
            </a>
            <a href={INSTALLER_DOCS_URL}>
              {t("Windows installer", "Installateur Windows")}
            </a>
            <a href={`${REPO_URL}/issues`}>
              {t("Report an issue", "Signaler un problème")}
            </a>
          </div>
          <div>
            <h2>{t("Built on", "Construit sur")}</h2>
            <a href={ZEN_URL}>Zen Browser</a>
            <a href={SINE_URL}>Sine</a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
