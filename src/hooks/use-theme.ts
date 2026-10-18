import { useCallback, useEffect, useState } from "react";

const THEME_COLORS = { light: "#dbe4ee", dark: "#1f2329" };

const setThemeColor = (dark: boolean) =>
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);

/**
 * Light/dark state backed by the `dark` class on <html> and localStorage.
 * Dark is the default; light only when a visitor picked it.
 */
export function useTheme() {
  // starts dark, like the server render, so the AM/PM switch doesn't jump on load
  const [dark, setDarkState] = useState(true);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkState(isDark);
    setThemeColor(isDark);
  }, []);

  const setDark = useCallback((next: boolean) => {
    setDarkState(next);
    document.documentElement.classList.toggle("dark", next);
    setThemeColor(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage unavailable (private mode): the switch still works for this visit
    }
  }, []);

  return [dark, setDark] as const;
}
