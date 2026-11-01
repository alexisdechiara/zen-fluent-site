import { marked } from "marked";
import raw from "./CHANGELOG.md?raw";

export type ChangeKind =
  "Added" | "Changed" | "Fixed" | "Removed" | "Deprecated" | "Security";

export interface Release {
  version: string;
  date: string;
  sections: { kind: string; html: string; count: number }[];
}

marked.use({ gfm: true });

/** Parses Keep a Changelog markdown: `## [x.y.z] - date`, then `### Kind`. */
function parse(markdown: string): Release[] {
  const releases: Release[] = [];
  const blocks = markdown.split(/^## /m).slice(1);
  for (const block of blocks) {
    const head = block.match(/^\[?([^\]\s]+)\]?\s*(?:-\s*(\S+))?/);
    if (!head || head[1].toLowerCase() === "unreleased") continue;
    const body = block.slice(block.indexOf("\n") + 1);
    const sections = body
      .split(/^### /m)
      .slice(1)
      .map((part) => {
        const kind = part.slice(0, part.indexOf("\n")).trim();
        const content = part
          .slice(part.indexOf("\n") + 1)
          // Drop the link reference definitions at the end of the file.
          .replace(/^\[[^\]]+\]:\s+\S+\s*$/gm, "")
          .trim();
        return {
          kind,
          html: marked.parse(content, { async: false }) as string,
          count: (content.match(/^- /gm) ?? []).length,
        };
      })
      .filter((s) => s.html.trim())
      // A release can list the same kind twice (one block per mod): merge them.
      .reduce<Release["sections"]>((merged, section) => {
        const same = merged.find((m) => m.kind === section.kind);
        if (same) {
          same.html += section.html;
          same.count += section.count;
        } else merged.push(section);
        return merged;
      }, []);
    releases.push({ version: head[1], date: head[2] ?? "", sections });
  }
  return releases;
}

export const releases = parse(raw);
export const latest = releases[0];

export function formatDate(iso: string) {
  if (!iso) return "";
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
