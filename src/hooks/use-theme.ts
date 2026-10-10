import { useCallback, useEffect, useState } from "react";

const THEME_COLORS = { light: "#dbe4ee", dark: "#1f2329" };

/** Light/dark state backed by the `dark` class on <html> and localStorage. */
export function useTheme() {
  const [dark, setDarkState] = useState(false);

  useEffect(() => {
    setDarkState(document.documentElement.classList.contains("dark"));
  }, []);

  const setDark = useCallback((next: boolean) => {
    setDarkState(next);
    document.documentElement.classList.toggle("dark", next);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? THEME_COLORS.dark : THEME_COLORS.light);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage unavailable (private mode): the switch still works for this visit
    }
  }, []);

  return [dark, setDark] as const;
}
