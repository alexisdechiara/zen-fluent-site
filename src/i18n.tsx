import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { circleTransition, type Point } from "./motion";

/**
 * English (the default) and French. Each text is written in both languages
 * where it is used: t("Overview", "Vue d'ensemble"). Data carries an `fr`
 * field (features, hotspots…). The changelog and the mods' notes come from
 * the mod's repository, in English.
 */
export type Lang = "en" | "fr";

export const languages: { id: Lang; label: string }[] = [
  { id: "en", label: "English" },
  { id: "fr", label: "Français" },
];

function readLang(): Lang {
  try {
    const saved = localStorage.getItem("zf-lang");
    if (saved === "en" || saved === "fr") return saved;
  } catch {
    /* private mode */
  }
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

/** The text in the current language: a string for strings (attributes),
 * a node for JSX. */
interface Translate {
  (en: string, fr: string): string;
  (en: ReactNode, fr: ReactNode): ReactNode;
}

interface LangValue {
  lang: Lang;
  setLang: (lang: Lang, origin?: Point | null) => void;
  t: Translate;
  /** A date in the current language. */
  date: (iso: string) => string;
}

const LangContext = createContext<LangValue>({
  lang: "en",
  setLang: () => {},
  t: ((en: ReactNode) => en) as Translate,
  date: (iso) => iso,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const initial = readLang();
    document.documentElement.lang = initial;
    return initial;
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // The new language grows from the button, as the theme does.
  const setLang = useCallback((next: Lang, origin: Point | null = null) => {
    try {
      localStorage.setItem("zf-lang", next);
    } catch {
      /* private mode: the choice lasts for this page only */
    }
    circleTransition(origin, () => {
      document.documentElement.lang = next;
      setLangState(next);
    });
  }, []);

  const t = useCallback(
    ((en: ReactNode, fr: ReactNode) => (lang === "fr" ? fr : en)) as Translate,
    [lang],
  );

  const date = useCallback(
    (iso: string) => {
      if (!iso) return "";
      const value = new Date(`${iso}T12:00:00Z`);
      if (Number.isNaN(value.getTime())) return iso;
      return value.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t, date }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

/** Picks the French of a data item when there is one. */
export function localize<T extends object>(
  item: T & { fr?: Partial<T> },
  lang: Lang,
): T {
  return lang === "fr" && item.fr ? { ...item, ...item.fr } : item;
}

/** Keep a Changelog's headings, in French. */
const kindsFr: Record<string, [string, string]> = {
  Added: ["ajout", "ajouts"],
  Changed: ["changement", "changements"],
  Fixed: ["correction", "corrections"],
  Removed: ["retrait", "retraits"],
  Deprecated: ["obsolète", "obsolètes"],
  Security: ["sécurité", "sécurité"],
};

export const kindLabel = (kind: string, count: number, lang: Lang) => {
  if (lang !== "fr") return `${count} ${kind.toLowerCase()}`;
  const [one, many] = kindsFr[kind] ?? [kind, kind];
  return `${count} ${count > 1 ? many : one}`;
};

const kindTitleFr: Record<string, string> = {
  Added: "Ajouts",
  Changed: "Changements",
  Fixed: "Corrections",
  Removed: "Retraits",
  Deprecated: "Obsolète",
  Security: "Sécurité",
};

export const kindTitle = (kind: string, lang: Lang) =>
  lang === "fr" ? (kindTitleFr[kind] ?? kind) : kind;
