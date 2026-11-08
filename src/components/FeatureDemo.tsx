import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLang } from "../i18n";

/**
 * A feature shown as a scripted, looping demo built in HTML and CSS rather
 * than a video: a small Zen Fluent window, a cursor that moves and clicks,
 * and the feature changing the window. One loop per scene, timed in CSS
 * (styles.css, "Feature demos"); it plays only while on screen and, with
 * reduced motion, stays on its key frame. It follows the site's theme.
 */
export type DemoScene =
  "materials" | "edge" | "urlbar" | "compact" | "settings" | "quick";

function Cursor() {
  return (
    <span className="demo__cursor" aria-hidden>
      <svg viewBox="0 0 16 20" width="16" height="20">
        <path
          d="M1 1v15.5l4.2-3.9 2.7 6.1 2.6-1.1-2.7-6h5.9z"
          fill="#fff"
          stroke="#000"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="demo__click" />
    </span>
  );
}

/** The sidebar: URL field, six Essentials, four tabs. */
function Sidebar({ children }: { children?: ReactNode }) {
  return (
    <aside className="demo__side">
      <span className="demo__url" />
      <span className="demo__ess">
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </span>
      <span className="demo__tabs">
        {Array.from({ length: 4 }, (_, i) => (
          <i key={i} className={i === 1 ? "is-selected" : undefined} />
        ))}
      </span>
      {children}
    </aside>
  );
}

/** A page: a header band, a title and lines of text. */
function Page() {
  return (
    <div className="demo__page">
      <span className="demo__hero" />
      <span className="demo__line demo__line--title" />
      <span className="demo__line" />
      <span className="demo__line demo__line--short" />
      <span className="demo__cards">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

export function FeatureDemo({ scene }: { scene: DemoScene }) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const { t } = useLang();

  // Plays while at least a third of it is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`demo demo--${scene}${playing ? " is-playing" : ""}`}
      aria-hidden>
      <span className="demo__wall" />
      <div className="demo__win">
        <Sidebar />
        <Page />
      </div>

      {scene === "materials" && (
        <span className="demo__chip">
          <b>Mica</b>
          <b>Mica Alt</b>
          <b>Acrylic</b>
        </span>
      )}

      {scene === "edge" && (
        <span className="demo__chip">
          <b>WinUI 3</b>
          <b>Microsoft Edge</b>
        </span>
      )}

      {scene === "urlbar" && (
        <>
          <span className="demo__dim" />
          <span className="demo__float">
            <span className="demo__float-field">
              <span className="demo__typed">zen fluent</span>
              <span className="demo__caret" />
            </span>
            <span className="demo__results">
              <i />
              <i />
              <i />
            </span>
          </span>
        </>
      )}

      {scene === "compact" && (
        <span className="demo__overlay-side">
          <span className="demo__url" />
          <span className="demo__ess">
            {Array.from({ length: 6 }, (_, i) => (
              <i key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </span>
          <span className="demo__tabs">
            {Array.from({ length: 4 }, (_, i) => (
              <i key={i} className={i === 2 ? "is-hovered" : undefined} />
            ))}
          </span>
        </span>
      )}

      {scene === "settings" && (
        <span className="demo__settings">
          <span className="demo__settings-nav">
            <b>{t("Overview", "Aperçu")}</b>
            <i className="is-current">{t("Appearance", "Apparence")}</i>
            <i>{t("Sidebar", "Barre latérale")}</i>
            <i>{t("Variants", "Variantes")}</i>
          </span>
          <span className="demo__settings-body">
            <span className="demo__preview">
              <span className="demo__preview-side" />
              <span className="demo__preview-page" />
            </span>
            <span className="demo__row">
              {t("Rounded corners", "Coins arrondis")}
              <span className="demo__toggle" />
            </span>
            <span className="demo__row">
              {t("Accent", "Accent")}
              <span className="demo__swatches">
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>
          </span>
        </span>
      )}

      {scene === "quick" && (
        <span className="demo__quick">
          <b>{t("Quick Settings", "Paramètres rapides")}</b>
          <span className="demo__presets">
            <i>Windows 11</i>
            <i>Edge</i>
            <i>Arc</i>
            <i>Compact</i>
          </span>
        </span>
      )}

      <Cursor />
    </div>
  );
}
