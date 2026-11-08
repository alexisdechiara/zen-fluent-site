import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft16Filled,
  ChevronRight16Filled,
} from "@fluentui/react-icons";
import { reducedMotion } from "../motion";

interface Props {
  before: { src: string; label: string; alt: string };
  after: { src: string; label: string; alt: string };
  width: number;
  height: number;
  /** Called when an image fails to load (the pair is missing). */
  onMissing?: () => void;
  /** Where the handle starts, in percent of the width. */
  start?: number;
}

/** Where the handle starts its wipe, before scrolling: mostly Zen. */
const WIPE_FROM = 92;

/** Before / after slider: drag anywhere, or use the arrow keys on the handle. */
export function CompareSlider({
  before,
  after,
  width,
  height,
  onMissing,
  start = 50,
}: Props) {
  const [position, setPosition] = useState(start);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
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

  // Scrolling into view wipes Zen's look away, down to `start`; the first
  // drag or key hands the handle over. No wipe with reduced motion.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || touched || reducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when its top enters the bottom of the screen, 1 when it is centered
      const progress = Math.min(
        1,
        Math.max(0, (viewport - rect.top) / (viewport / 2 + rect.height / 2)),
      );
      const eased = 1 - Math.pow(1 - progress, 3);
      setPosition(WIPE_FROM + (start - WIPE_FROM) * eased);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [touched, start]);

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
        setTouched(true);
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
        onError={onMissing}
      />
      <div className="compare__before" aria-hidden="false">
        <img
          className="compare__img"
          src={before.src}
          alt={before.alt}
          width={width}
          height={height}
          draggable={false}
          onError={onMissing}
        />
      </div>

      <span
        className="compare__label compare__label--before"
        style={{ opacity: position < 8 ? 0 : 1 }}>
        {before.label}
      </span>
      <span
        className="compare__label compare__label--after"
        style={{ opacity: position > 92 ? 0 : 1 }}>
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
          setTouched(true);
          setPosition(Number(e.target.value));
        }}
      />
    </div>
  );
}
