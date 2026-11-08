import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { circleTransition, type Point } from "./motion";

export type Theme = "light" | "dark";

/** Windows' accent colors; "blue" is the site's own (Windows' default). */
export const accents = [
  { id: "blue", label: "Blue", color: "#0078d4" },
  { id: "violet", label: "Violet", color: "#8764b8" },
  { id: "mint", label: "Mint", color: "#00b294" },
  { id: "orange", label: "Orange", color: "#ca5010" },
  { id: "pink", label: "Pink", color: "#e3008c" },
  { id: "graphite", label: "Graphite", color: "#69797e" },
] as const;

export type Accent = (typeof accents)[number]["id"];

const ThemeContext = createContext<{
  theme: Theme;
  toggle: (origin?: Point | null) => void;
  accent: Accent;
  setAccent: (accent: Accent, origin?: Point | null) => void;
}>({
  theme: "light",
  toggle: () => {},
  accent: "blue",
  setAccent: () => {},
});

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode: the choice lasts for this page only */
  }
}

function readSaved(): Theme | null {
  const saved = read("zf-theme");
  return saved === "light" || saved === "dark" ? saved : null;
}

function readAccent(): Accent {
  const saved = read("zf-accent");
  return accents.find((a) => a.id === saved)?.id ?? "blue";
}

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (document.documentElement.dataset.theme as Theme) ??
      (media().matches ? "dark" : "light"),
  );
  const [accent, setAccentState] = useState<Accent>(() => {
    const saved = readAccent();
    document.documentElement.dataset.accent = saved;
    return saved;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
  }, [accent]);

  // Follow the system until the visitor picks a theme.
  useEffect(() => {
    const query = media();
    const onChange = () => {
      if (!readSaved()) setTheme(query.matches ? "dark" : "light");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // The new look grows from the button clicked (motion.ts).
  const toggle = useCallback(
    (origin: Point | null = null) => {
      const next = theme === "dark" ? "light" : "dark";
      save("zf-theme", next);
      circleTransition(origin, () => {
        document.documentElement.dataset.theme = next;
        setTheme(next);
      });
    },
    [theme],
  );

  const setAccent = useCallback((next: Accent, origin: Point | null = null) => {
    save("zf-accent", next);
    circleTransition(origin, () => {
      document.documentElement.dataset.accent = next;
      setAccentState(next);
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
