import data from "./compatible-mods.json";

export interface CompatibleMod {
  name: string;
  id: string;
  repo: string;
  status: "supported" | "partial" | "conflict";
  summary: string;
  tested: { zenFluent: string; version: string };
}

const all = (data as { mods: CompatibleMod[] }).mods;

/** Only the mods that work with Zen Fluent (conflicting ones are left out). */
export const compatibleMods = all
  .filter((mod) => mod.status === "supported" || mod.status === "partial")
  .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

/** GitHub's heading anchor for a mod's section in docs/compatibility.md. */
export function docsAnchor(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/ /g, "-");
}
