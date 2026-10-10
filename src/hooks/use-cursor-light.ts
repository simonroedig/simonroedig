import { useEffect, useRef } from "react";

const clamp = (v: number) => Math.min(1, Math.max(-1, v));

/**
 * "The cursor is the lamp": shifts an element's raised shadow so it falls
 * away from the pointer, as if the light source moved with it. Writes the
 * shadow straight to the element (no re-renders) and falls back to the
 * element's own shadow when the pointer leaves or on touch devices.
 */
export function useCursorLight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    el.style.transition = "box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const dx = clamp((x - (r.left + r.width / 2)) / (window.innerWidth / 2));
      const dy = clamp((y - (r.top + r.height / 2)) / (window.innerHeight / 2));
      // default light is top left; the cursor pulls it around a little
      const sx = Math.round(24 - dx * 18);
      const sy = Math.round(28 - dy * 18);
      const hx = Math.round(-16 + dx * 9);
      const hy = Math.round(-16 + dy * 9);
      el.style.boxShadow = [
        `${hx}px ${hy}px 38px var(--hl)`,
        `${sx}px ${sy}px 58px var(--sd)`,
        `${Math.round(sx / 5)}px ${Math.round(sy / 5)}px 14px var(--sd-soft)`,
        "inset 1px 1px 0 var(--hl-edge)",
        "inset -1px -1px 0 var(--sd-edge)",
      ].join(", ");
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      el.style.boxShadow = "";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return ref;
}
