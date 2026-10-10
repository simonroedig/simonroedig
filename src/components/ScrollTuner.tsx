import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type Props = {
  target: RefObject<HTMLDivElement | null>;
  /** How far one arrow press scrolls, in px. Defaults to ~one card. */
  step?: () => number;
};

/**
 * Horizontal scroll control styled like a radio's tuning slider:
 * a recessed groove with a raised thumb, flanked by two round keys.
 */
export function ScrollTuner({ target, step }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ ratio: 0, size: 1 });
  const drag = useRef<{ startX: number; startScroll: number } | null>(null);

  const update = useCallback(() => {
    const el = target.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({
      ratio: max > 0 ? el.scrollLeft / max : 0,
      size: el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1,
    });
  }, [target]);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target, update]);

  const scrollBy = (dir: number) => {
    const el = target.current;
    if (!el) return;
    el.scrollBy({ left: dir * (step ? step() : el.clientWidth * 0.6), behavior: "smooth" });
  };

  const onThumbDown = (e: React.PointerEvent) => {
    const el = target.current;
    if (!el) return;
    e.stopPropagation();
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft };
    // let the cards follow the thumb freely; snapping resumes on release
    el.style.scrollSnapType = "none";
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onThumbMove = (e: React.PointerEvent) => {
    const el = target.current;
    const track = trackRef.current;
    if (!drag.current || !el || !track) return;
    const usable = track.clientWidth * (1 - state.size);
    if (usable <= 0) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollLeft = drag.current.startScroll + ((e.clientX - drag.current.startX) / usable) * max;
  };

  const onThumbUp = () => {
    drag.current = null;
    if (target.current) target.current.style.scrollSnapType = "";
  };

  const onTrackDown = (e: React.PointerEvent) => {
    const el = target.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const r = track.getBoundingClientRect();
    const pos = (e.clientX - r.left) / r.width;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({
      left: Math.max(0, Math.min(1, (pos - state.size / 2) / (1 - state.size))) * max,
      behavior: "smooth",
    });
  };

  if (state.size >= 0.999) return null;

  const arrow =
    "neu-key flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-soft hover:text-ink cursor-pointer md:h-11 md:w-11";

  return (
    <div className="flex items-center gap-4 md:gap-5">
      <button type="button" aria-label="Scroll left" onClick={() => scrollBy(-1)} className={arrow}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M8.5 2.5 4 7l4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        ref={trackRef}
        onPointerDown={onTrackDown}
        className="relative h-4 flex-1 rounded-full bg-surface neu-inset-sm cursor-pointer"
        aria-hidden="true"
      >
        <div
          onPointerDown={onThumbDown}
          onPointerMove={onThumbMove}
          onPointerUp={onThumbUp}
          onPointerCancel={onThumbUp}
          className="absolute top-1/2 flex h-7 -translate-y-1/2 items-center justify-center gap-1 rounded-full neu-convex neu-raised-sm cursor-grab active:cursor-grabbing"
          style={{
            width: `${state.size * 100}%`,
            minWidth: "3.5rem",
            left: `calc(${state.ratio} * (100% - max(${state.size * 100}%, 3.5rem)))`,
            touchAction: "none",
          }}
        >
          <span className="h-3 w-[2px] rounded-full neu-inset-xs" />
          <span className="led led-on h-1.5! w-1.5!" />
          <span className="h-3 w-[2px] rounded-full neu-inset-xs" />
        </div>
      </div>
      <button type="button" aria-label="Scroll right" onClick={() => scrollBy(1)} className={arrow}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M5.5 2.5 10 7l-4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
