import { useEffect, useState } from "react";
import tags from "../data/tags.json";
import { ChevronDown16Regular, Open16Regular } from "@fluentui/react-icons";
import { formatDate, releases } from "../data/changelog";
import { REPO_URL } from "../data/site";

const kindClass = (kind: string) => `kind kind--${kind.toLowerCase()}`;

export function Changelog() {
  const [current, setCurrent] = useState<string | undefined>(
    releases[0]?.version,
  );

  // Highlight the release being read in the side list.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0])
          setCurrent(
            visible[0].target.getAttribute("data-version") ?? undefined,
          );
      },
      { rootMargin: "-90px 0px -60% 0px" },
    );
    document
      .querySelectorAll("[data-version]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // The two latest releases open; older ones fold to a preview.
  const [expanded, setExpanded] = useState(
    () => new Set(releases.slice(0, 2).map((r) => r.version)),
  );
  const expand = (version: string, open = true) =>
    setExpanded((set) => {
      const next = new Set(set);
      if (open) next.add(version);
      else next.delete(version);
      return next;
    });

  const go = (version: string) => {
    expand(version);
    document
      .getElementById(`v${version}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow rise">Changelog</p>
          <h1 className="rise" style={{ animationDelay: "60ms" }}>
            What's new
          </h1>
          <p
            className="page-hero__lead rise"
            style={{ animationDelay: "120ms" }}>
            Every release of Zen Fluent and Zen Fluent Enhanced: both mods share
            one version. Sine offers each update on its own.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container changelog">
          <aside className="changelog__nav" aria-label="Releases">
            <ul>
              {releases.map((r) => (
                <li key={r.version}>
                  <a
                    href={`#v${r.version}`}
                    className={current === r.version ? "is-current" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      go(r.version);
                    }}>
                    <span>{r.version}</span>
                    <small>{formatDate(r.date)}</small>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="changelog__list">
            {releases.map((release, i) => (
              <article
                key={release.version}
                id={`v${release.version}`}
                data-version={release.version}
                className="release">
                <div className="release__rail" aria-hidden>
                  <span
                    className={`release__dot${i === 0 ? " is-latest" : ""}`}
                  />
                </div>
                <div className="card release__card">
                  <header className="release__head">
                    <h2>Version {release.version}</h2>
                    {i === 0 && (
                      <span className="badge badge--accent">Latest</span>
                    )}
                    <time dateTime={release.date}>
                      {formatDate(release.date)}
                    </time>
                    {(tags as string[]).includes(`v${release.version}`) && (
                      <a
                        className="release__source"
                        href={`${REPO_URL}/tree/v${release.version}`}
                        target="_blank"
                        rel="noreferrer">
                        Source <Open16Regular />
                      </a>
                    )}
                  </header>
                  <div className="release__summary">
                    {release.sections.map((s) => (
                      <span key={s.kind} className={kindClass(s.kind)}>
                        {s.count} {s.kind.toLowerCase()}
                      </span>
                    ))}
                  </div>
                  <div
                    className={`release__body${expanded.has(release.version) ? "" : " is-folded"}`}
                    id={`body-${release.version}`}>
                    {release.sections.map((section) => (
                      <section key={section.kind} className="release__section">
                        <h3 className={kindClass(section.kind)}>
                          {section.kind}
                        </h3>
                        <div
                          className="prose"
                          dangerouslySetInnerHTML={{ __html: section.html }}
                        />
                      </section>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="button button--subtle release__toggle"
                    aria-expanded={expanded.has(release.version)}
                    aria-controls={`body-${release.version}`}
                    onClick={() =>
                      expand(release.version, !expanded.has(release.version))
                    }>
                    {expanded.has(release.version)
                      ? "Show less"
                      : `Show all ${release.sections.reduce((n, s) => n + s.count, 0)} changes`}
                    <ChevronDown16Regular />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
