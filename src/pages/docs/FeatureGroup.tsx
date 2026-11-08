import { Navigate, useParams } from "react-router-dom";
import { ChevronDown16Regular, Open16Regular } from "@fluentui/react-icons";
import { CopyField } from "../../components/CopyField";
import { FeatureVideo } from "../../components/FeatureVideo";
import { ModBadge } from "../../components/ModBadge";
import { featureGroups, featureId, type Feature } from "../../data/features";
import { DOCS_URL } from "../../data/site";
import { localize, useLang } from "../../i18n";
import { groupIcons } from "./nav";
import { Breadcrumb, DocsHeader, DocsPage, DocsPager } from "./parts";

/** One feature, as a WinUI Gallery sample: the card, then its preference. */
function Sample({ feature: item }: { feature: Feature }) {
  const { lang, t } = useLang();
  const feature = localize(item, lang);
  return (
    <section id={featureId(item.name)} className="sample">
      <h2 className="sample__title">
        {feature.name}
        {feature.next && (
          <span className="next-badge">
            {t("Next release", "Prochaine version")}
          </span>
        )}
      </h2>
      <div className="sample__card">
        <div className="sample__stage">
          {feature.video && (
            <FeatureVideo
              className="sample__clip"
              src={feature.video}
              poster={feature.poster ?? "/shots/dark-mica.webp"}
              alt={feature.name}
            />
          )}
          <p>{feature.text}</p>
          <dl className="sample__meta">
            <div>
              <dt>{t("Mod", "Mod")}</dt>
              <dd>
                <ModBadge mod={feature.mod} />
              </dd>
            </div>
            {feature.mod === "enhanced" && (
              <div>
                <dt>{t("Default", "Par défaut")}</dt>
                <dd>
                  <span className={`default${feature.on ? " is-on" : ""}`}>
                    <span className="default__dot" aria-hidden />
                    {feature.on ? t("On", "Activée") : t("Off", "Désactivée")}
                  </span>
                </dd>
              </div>
            )}
            {feature.keys && (
              <div>
                <dt>{t("Shortcut", "Raccourci")}</dt>
                <dd>
                  <kbd>{feature.keys}</kbd>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <details className="sample__source">
          <summary>
            {feature.pref
              ? t("Preference", "Préférence")
              : t("Where to change it", "Où le changer")}
            <ChevronDown16Regular aria-hidden />
          </summary>
          <div className="sample__source-body">
            {feature.pref ? (
              <>
                <p>
                  {t(
                    <>
                      In Zen Fluent's settings, or in <code>about:config</code>:
                    </>,
                    <>
                      Dans les réglages de Zen Fluent, ou dans{" "}
                      <code>about:config</code> :
                    </>,
                  )}
                </p>
                <CopyField
                  value={feature.pref}
                  label={t("the preference", "la préférence")}
                />
              </>
            ) : (
              <p>
                {t(
                  "In Zen Fluent's settings: the gear on its card in Sine, or the settings page of Zen Fluent Enhanced.",
                  "Dans les réglages de Zen Fluent : l'engrenage de sa carte dans Sine, ou la page de paramètres de Zen Fluent Enhanced.",
                )}
              </p>
            )}
            <a href={`${DOCS_URL}/${feature.doc}`}>
              {t("Every detail on GitHub", "Tous les détails sur GitHub")}{" "}
              <Open16Regular aria-hidden />
            </a>
          </div>
        </details>
      </div>
    </section>
  );
}

export function FeatureGroup() {
  const { group: id } = useParams();
  const { lang, t } = useLang();
  const found = featureGroups.find((g) => g.id === id);
  if (!found) return <Navigate to="/docs/features" replace />;
  const group = localize(found, lang);

  const Icon = groupIcons[group.id];
  const core = group.features.filter((f) => f.mod === "core").length;
  const extras = group.features.length - core;
  const doc = group.features[0].doc;

  return (
    <DocsPage
      toc={group.features.map((f) => ({
        id: featureId(f.name),
        label: localize(f, lang).name,
      }))}>
      <Breadcrumb
        items={[
          { label: t("Docs", "Documentation"), to: "/docs" },
          { label: t("Features", "Fonctions"), to: "/docs/features" },
          { label: group.title },
        ]}
      />
      <DocsHeader
        title={group.title}
        icon={<Icon />}
        tools={
          <a className="button" href={`${DOCS_URL}/${doc}`}>
            Documentation <Open16Regular />
          </a>
        }
      />
      <p className="docs-lead">
        {group.intro} {group.features.length} {t("features", "fonctions")}
        {t(":", " :")}{" "}
        {[
          core && t(`${core} in Zen Fluent`, `${core} dans Zen Fluent`),
          extras && t(`${extras} in Enhanced`, `${extras} dans Enhanced`),
        ]
          .filter(Boolean)
          .join(t(", ", ", "))}
        .
      </p>

      {group.features.map((feature) => (
        <Sample key={feature.name} feature={feature} />
      ))}

      <DocsPager current={`/docs/features/${group.id}`} />
    </DocsPage>
  );
}
