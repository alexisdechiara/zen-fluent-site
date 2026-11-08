import { Link } from "react-router-dom";
import { useLang } from "../i18n";

export function NotFound() {
  const { t } = useLang();
  return (
    <section className="page-hero page-hero--center">
      <div className="container">
        <h1>{t("This page is not here", "Cette page n'existe pas")}</h1>
        <p className="page-hero__lead">
          {t(
            "Error 404: the link may be old, or the page moved.",
            "Erreur 404 : le lien est peut-être ancien, ou la page a changé de place.",
          )}
        </p>
        <Link className="button button--accent" to="/">
          {t("Back to the overview", "Retour à la présentation")}
        </Link>
      </div>
    </section>
  );
}
