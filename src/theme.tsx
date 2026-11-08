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

const ThemeContext = createContext<{
  theme: Theme;
  toggle: (origin?: Point | null) => void;
}>({
  theme: "light",
  toggle: () => {},
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

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (document.documentElement.dataset.theme as Theme) ??
      (media().matches ? "dark" : "light"),
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

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

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
