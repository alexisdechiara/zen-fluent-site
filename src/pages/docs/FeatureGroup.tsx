import { Navigate, useParams } from "react-router-dom";
import { ChevronDown16Regular, Open16Regular } from "@fluentui/react-icons";
import { CopyField } from "../../components/CopyField";
import { ModBadge } from "../../components/ModBadge";
import { featureGroups, featureId, type Feature } from "../../data/features";
import { DOCS_URL } from "../../data/site";
import { groupIcons } from "./nav";
import { Breadcrumb, DocsHeader, DocsPage, DocsPager } from "./parts";

/** One feature, as a WinUI Gallery sample: the card, then its preference. */
function Sample({ feature }: { feature: Feature }) {
  return (
    <section id={featureId(feature.name)} className="sample">
      <h2 className="sample__title">
        {feature.name}
        {feature.next && <span className="next-badge">Next release</span>}
      </h2>
      <div className="sample__card">
        <div className="sample__stage">
          <p>{feature.text}</p>
          <dl className="sample__meta">
            <div>
              <dt>Mod</dt>
              <dd>
                <ModBadge mod={feature.mod} />
              </dd>
            </div>
            {feature.mod === "enhanced" && (
              <div>
                <dt>Default</dt>
                <dd>
                  <span className={`default${feature.on ? " is-on" : ""}`}>
                    <span className="default__dot" aria-hidden />
                    {feature.on ? "On" : "Off"}
                  </span>
                </dd>
              </div>
            )}
            {feature.keys && (
              <div>
                <dt>Shortcut</dt>
                <dd>
                  <kbd>{feature.keys}</kbd>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <details className="sample__source">
          <summary>
            {feature.pref ? "Preference" : "Where to change it"}
            <ChevronDown16Regular aria-hidden />
          </summary>
          <div className="sample__source-body">
            {feature.pref ? (
              <>
                <p>
                  In Zen Fluent's settings, or in <code>about:config</code>:
                </p>
                <CopyField value={feature.pref} label="the preference" />
              </>
            ) : (
              <p>
                In Zen Fluent's settings: the gear on its card in Sine, or the
                settings page of Zen Fluent Enhanced.
              </p>
            )}
            <a href={`${DOCS_URL}/${feature.doc}`}>
              Every detail on GitHub <Open16Regular aria-hidden />
            </a>
          </div>
        </details>
      </div>
    </section>
  );
}

export function FeatureGroup() {
  const { group: id } = useParams();
  const group = featureGroups.find((g) => g.id === id);
  if (!group) return <Navigate to="/docs/features" replace />;

  const Icon = groupIcons[group.id];
  const core = group.features.filter((f) => f.mod === "core").length;
  const extras = group.features.length - core;
  const doc = group.features[0].doc;

  return (
    <DocsPage
      toc={group.features.map((f) => ({
        id: featureId(f.name),
        label: f.name,
      }))}>
      <Breadcrumb
        items={[
          { label: "Docs", to: "/docs" },
          { label: "Features", to: "/docs/features" },
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
        {group.intro} {group.features.length} features:{" "}
        {[core && `${core} in Zen Fluent`, extras && `${extras} in Enhanced`]
          .filter(Boolean)
          .join(", ")}
        .
      </p>

      {group.features.map((feature) => (
        <Sample key={feature.name} feature={feature} />
      ))}

      <DocsPager current={`/docs/features/${group.id}`} />
    </DocsPage>
  );
}
