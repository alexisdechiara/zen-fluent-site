import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight16Regular,
  CursorClick20Regular,
  Dismiss16Regular,
} from "@fluentui/react-icons";
import { hotspots } from "../data/hotspots";
import { localize, useLang } from "../i18n";
import { reducedMotion } from "../motion";
import { useTheme } from "../theme";

/** The materials the hero cycles through, on screenshots of one layout
 * (the dots must stay on their spot). Light has one material for now. */
const materials = {
  dark: [
    { src: "/shots/dark-mica.webp", label: "Mica" },
    { src: "/shots/dark-mica-alt.webp", label: "Mica Alt" },
    { src: "/shots/dark-acrylic-orange.webp", label: "Acrylic" },
  ],
  light: [{ src: "/shots/light-mica.webp", label: "Mica" }],
};

const CYCLE_MS = 5200;

/**
 * The hero's browser: a Zen Fluent screenshot with pulsing dots. A dot opens
 * a popup describing that part of the browser.
 */
export function BrowserHotspots() {
  const { theme } = useTheme();
  const { lang, t } = useLang();
  const [active, setActive] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const popupId = useId();
  const found = hotspots.find((h) => h.id === active);
  const current = found ? localize(found, lang) : null;
  const shots = materials[theme];
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => setSlide(0), [theme]);

  // Mica, Mica Alt, Acrylic, slowly: never while a dot is open, the pointer
  // is over the window, the window is off screen or motion is reduced.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || shots.length < 2 || reducedMotion()) return;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(el);
    const timer = window.setInterval(() => {
      if (visible && !paused && !active && !document.hidden) {
        setSlide((i) => (i + 1) % shots.length);
      }
    }, CYCLE_MS);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [shots.length, paused, active]);
  const index = found ? hotspots.indexOf(found) : -1;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const id = active;
        setActive(null);
        rootRef.current
          ?.querySelector<HTMLButtonElement>(`[data-spot="${id}"]`)
          ?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setActive(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [active]);

  const open = (id: string) => {
    setTouched(true);
    setActive((current) => (current === id ? null : id));
  };

  const step = (delta: number) => {
    const next = hotspots[(index + delta + hotspots.length) % hotspots.length];
    setActive(next.id);
  };

  const side = current && current.x > 55 ? "left" : "right";
  const vertical = current && current.y > 55 ? "up" : "down";

  return (
    <div
      className="browser"
      ref={rootRef}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}>
      <div className="browser__frame">
        <div className="browser__screen">
          <div className="browser__canvas">
            {shots.map((shot, i) => (
              <img
                key={shot.src}
                className={`browser__shot${i === slide ? " is-shown" : ""}`}
                src={shot.src}
                alt={
                  i === 0
                    ? t(
                        "Zen Browser with Zen Fluent: Mica sidebar, Essentials as WinUI cards, WinUI tabs and a framed page",
                        "Zen Browser avec Zen Fluent : barre latérale en Mica, Essentials en cartes WinUI, onglets WinUI et page encadrée",
                      )
                    : ""
                }
                aria-hidden={i !== 0}
                width={1280}
                height={800}
                {...(i === 0
                  ? { fetchpriority: "high" }
                  : { loading: "lazy" as const })}
                draggable={false}
              />
            ))}
            {shots.length > 1 && (
              <span className="material-chip" aria-hidden>
                {shots.map((shot, i) => (
                  <span
                    key={shot.label}
                    className={i === slide ? "is-current" : undefined}>
                    {shot.label}
                  </span>
                ))}
              </span>
            )}
            {hotspots.map((spot, i) => (
              <button
                key={spot.id}
                type="button"
                data-spot={spot.id}
                className={`hotspot${active === spot.id ? " is-active" : ""}`}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  animationDelay: `${0.6 + i * 0.08}s`,
                }}
                aria-label={t(
                  `${spot.title} (${i + 1} of ${hotspots.length})`,
                  `${spot.fr.title} (${i + 1} sur ${hotspots.length})`,
                )}
                aria-expanded={active === spot.id}
                aria-controls={active === spot.id ? popupId : undefined}
                onClick={() => open(spot.id)}>
                <span className="hotspot__ring" aria-hidden />
                <span
                  className="hotspot__ring hotspot__ring--late"
                  aria-hidden
                />
                <span className="hotspot__core" aria-hidden />
              </button>
            ))}
          </div>

          {current && (
            <div
              key={current.id}
              id={popupId}
              role="dialog"
              aria-label={current.title}
              className={`hotspot-popup hotspot-popup--${side} hotspot-popup--${vertical}`}
              style={
                {
                  "--x": `${current.x}%`,
                  "--y": `${current.y}%`,
                } as React.CSSProperties
              }>
              <div className="hotspot-popup__head">
                <span className="tag">{current.tag}</span>
                <span className="hotspot-popup__count">
                  {index + 1}/{hotspots.length}
                </span>
                <button
                  type="button"
                  className="icon-button icon-button--small"
                  aria-label={t("Close", "Fermer")}
                  onClick={() => setActive(null)}>
                  <Dismiss16Regular />
                </button>
              </div>
              <h3>{current.title}</h3>
              <p>{current.text}</p>
              <div className="hotspot-popup__foot">
                <a
                  href={current.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-arrow">
                  {t("Settings on GitHub", "Les réglages sur GitHub")}{" "}
                  <ArrowRight16Regular />
                </a>
                <div className="hotspot-popup__steps">
                  <button
                    type="button"
                    className="button button--subtle button--small"
                    onClick={() => step(-1)}>
                    {t("Previous", "Précédent")}
                  </button>
                  <button
                    type="button"
                    className="button button--small"
                    onClick={() => step(1)}>
                    {t("Next", "Suivant")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <p
        className={`browser__hint${touched ? " is-hidden" : ""}`}
        aria-hidden={touched}>
        <CursorClick20Regular />{" "}
        {t(
          "Click a dot to explore the details",
          "Cliquez sur un point pour découvrir les détails",
        )}
      </p>
    </div>
  );
}
