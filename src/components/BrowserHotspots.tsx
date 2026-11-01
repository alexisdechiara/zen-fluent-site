import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight16Regular,
  CursorClick20Regular,
  Dismiss16Regular,
} from "@fluentui/react-icons";
import { hotspots } from "../data/hotspots";
import { useTheme } from "../theme";

/**
 * The hero's browser: a Zen Fluent screenshot with pulsing dots. A dot opens
 * a popup describing that part of the browser.
 */
export function BrowserHotspots() {
  const { theme } = useTheme();
  const [active, setActive] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const popupId = useId();
  const current = hotspots.find((h) => h.id === active) ?? null;
  const index = current ? hotspots.indexOf(current) : -1;

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
    <div className="browser" ref={rootRef}>
      <div className="browser__frame">
        <div className="browser__screen">
          <div className="browser__canvas">
            <img
              src={
                theme === "dark"
                  ? "/shots/dark-mica.webp"
                  : "/shots/light-mica.webp"
              }
              alt="Zen Browser with Zen Fluent: Mica sidebar, Essentials as WinUI cards, WinUI tabs and a framed page"
              width={1280}
              height={800}
              {...{ fetchpriority: "high" }}
              draggable={false}
            />
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
                aria-label={`${spot.title} (${i + 1} of ${hotspots.length})`}
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
                  aria-label="Close"
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
                  Settings <ArrowRight16Regular />
                </a>
                <div className="hotspot-popup__steps">
                  <button
                    type="button"
                    className="button button--subtle button--small"
                    onClick={() => step(-1)}>
                    Previous
                  </button>
                  <button
                    type="button"
                    className="button button--small"
                    onClick={() => step(1)}>
                    Next
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
        <CursorClick20Regular /> Click a dot to explore the details
      </p>
    </div>
  );
}
