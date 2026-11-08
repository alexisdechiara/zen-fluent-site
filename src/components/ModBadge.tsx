import type { Mod } from "../data/features";

/** Which of the two mods a feature belongs to. */
export function ModBadge({ mod }: { mod: Mod }) {
  return mod === "core" ? (
    <span className="mod-badge mod-badge--core">Zen Fluent</span>
  ) : (
    <span className="mod-badge mod-badge--enhanced">Enhanced</span>
  );
}
