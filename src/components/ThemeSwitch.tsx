import { useEffect, useState } from "react";

const syncThemeColor = (dark: boolean) =>
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? "#2a2b2f" : "#e9e6e0");

/** Braun-style slide switch that flips the panel between white and anthracite. */
export function ThemeSwitch() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    syncThemeColor(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    syncThemeColor(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage unavailable (private mode) — the switch still works for this visit
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={toggle}
      className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-1 cursor-pointer"
    >
      <span className="relative block h-7 w-[3.25rem] rounded-full bg-surface neu-inset-sm">
        <span
          className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full neu-convex neu-raised-xs transition-transform duration-500 ease-[var(--ease-soft)]"
          style={{ transform: dark ? "translateX(1.5rem)" : "translateX(0)" }}
        >
          <span className={`led h-1.5! w-1.5! ${dark ? "led-on" : ""}`} />
        </span>
      </span>
      <span className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint text-engrave w-8 text-left">
        {dark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
