import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft16Filled,
  ChevronRight16Filled,
} from "@fluentui/react-icons";

interface Props {
  before: { src: string; label: string; alt: string };
  after: { src: string; label: string; alt: string };
  width: number;
  height: number;
}

/** Before / after slider: drag anywhere, or use the arrow keys on the handle. */
export function CompareSlider({ before, after, width, height }: Props) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [hinted, setHinted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const moveTo = useCallback((clientX: number) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => moveTo(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, moveTo]);

  // A short sweep the first time the slider comes into view shows it moves.
  useEffect(() => {
    const el = rootRef.current;
    if (
      !el ||
      hinted ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setHinted(true);
        el.classList.add("is-hinting");
        const frames = [38, 62, 50];
        frames.forEach((value, i) =>
          setTimeout(() => setPosition(value), 350 + i * 550),
        );
        setTimeout(
          () => el.classList.remove("is-hinting"),
          350 + frames.length * 550,
        );
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hinted]);

  return (
    <div
      ref={rootRef}
      className={`compare${dragging ? " is-dragging" : ""}`}
      style={
        {
          "--pos": `${position}%`,
          aspectRatio: `${width} / ${height}`,
        } as React.CSSProperties
      }
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        rootRef.current?.classList.remove("is-hinting");
        setDragging(true);
        moveTo(e.clientX);
        rootRef.current
          ?.querySelector<HTMLInputElement>("input")
          ?.focus({ preventScroll: true });
      }}>
      <img
        className="compare__img"
        src={after.src}
        alt={after.alt}
        width={width}
        height={height}
        draggable={false}
        loading="lazy"
      />
      <div className="compare__before" aria-hidden="false">
        <img
          className="compare__img"
          src={before.src}
          alt={before.alt}
          width={width}
          height={height}
          draggable={false}
          loading="lazy"
        />
      </div>

      <span
        className="compare__label compare__label--before"
        style={{ opacity: position < 18 ? 0 : 1 }}>
        {before.label}
      </span>
      <span
        className="compare__label compare__label--after"
        style={{ opacity: position > 82 ? 0 : 1 }}>
        {after.label}
      </span>

      <div className="compare__divider" aria-hidden>
        <span className="compare__handle">
          <ChevronLeft16Filled />
          <ChevronRight16Filled />
        </span>
      </div>

      <input
        className="compare__range"
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={position}
        aria-label={`Comparison: ${before.label} on the left, ${after.label} on the right`}
        aria-valuetext={`${Math.round(position)}% ${before.label}`}
        onChange={(e) => {
          rootRef.current?.classList.remove("is-hinting");
          setPosition(Number(e.target.value));
        }}
      />
    </div>
  );
}
