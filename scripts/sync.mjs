// Pulls the changelog and the compatible mods list from the mod's repository
// so every Vercel build shows the latest release. Falls back to the committed
// copies in src/data/ when GitHub cannot be reached.
import { writeFile } from "node:fs/promises";

const RAW = "https://raw.githubusercontent.com/alexisdechiara/zen-fluent/main";
const files = [
  ["CHANGELOG.md", "src/data/CHANGELOG.md"],
  ["enhanced/settings/compatible-mods.json", "src/data/compatible-mods.json"],
];

const API =
  "https://api.github.com/repos/alexisdechiara/zen-fluent/tags?per_page=100";
files.push([API, "src/data/tags.json"]);

for (const [remote, local] of files) {
  try {
    const url = remote.startsWith("https:") ? remote : `${RAW}/${remote}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    let out = text;
    if (local.endsWith("tags.json"))
      out =
        JSON.stringify(
          JSON.parse(text).map((t) => t.name),
          null,
          2,
        ) + "\n";
    else if (local.endsWith(".json")) JSON.parse(text);
    await writeFile(local, out);
    console.log(`sync: ${local} updated`);
  } catch (error) {
    console.warn(`sync: ${local} kept the committed copy (${error.message})`);
  }
}
