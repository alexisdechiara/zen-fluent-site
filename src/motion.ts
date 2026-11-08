import type { MouseEvent } from "react";
import { flushSync } from "react-dom";

/** WinUI's timings (ms) and its decelerating curve. */
export const DURATION = { fast: 167, normal: 250, slow: 333 } as const;

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export interface Point {
  x: number;
  y: number;
}

/** Where the pointer clicked, or the middle of the element (keyboard). */
export function originOf(event: MouseEvent<HTMLElement>): Point {
  if (event.clientX || event.clientY) {
    return { x: event.clientX, y: event.clientY };
  }
  const rect = event.currentTarget.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

/**
 * Runs `update` (a theme or an accent change) in a view transition: the new
 * look grows as a circle from `origin`, as Zen Fluent's welcome tour does.
 * Without view transitions, or with reduced motion, it just applies.
 */
export function circleTransition(origin: Point | null, update: () => void) {
  const root = document.documentElement;
  if (!("startViewTransition" in document) || reducedMotion()) {
    update();
    return;
  }
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  root.style.setProperty("--vt-x", `${x}px`);
  root.style.setProperty("--vt-y", `${y}px`);
  root.style.setProperty("--vt-r", `${Math.ceil(radius)}px`);
  root.classList.add("is-vt");
  const transition = document.startViewTransition(() => flushSync(update));
  transition.finished.finally(() => root.classList.remove("is-vt"));
}
