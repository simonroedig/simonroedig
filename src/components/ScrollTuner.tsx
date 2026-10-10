import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { thock, tick } from "@/lib/sound";
import { IconChevronLeft, IconChevronRight } from "./icons";

type Props = {
  target: RefObject<HTMLDivElement | null>;
  /** Width of one card incl. gap, in px. */
  step: () => number;
};

/**
 * Horizontal scroll control styled like an equalizer fader: a recessed
 * groove with scale marks and a ribbed knob. Clicks once per card.
 */
export function ScrollTuner({ target, step }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const drag = useRef<{ startX: number; startScroll: number } | null>(null);
  const lastIndex = useRef(0);

  const update = useCallback(() => {
    const el = target.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 4);
    setRatio(max > 0 ? el.scrollLeft / max : 0);
    const index = Math.round(el.scrollLeft / step());
    if (index !== lastIndex.current) {
      lastIndex.current = index;
      tick(0.8);
    }
  }, [target, step]);

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
    thock();
    target.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  const knobWidth = 56;

  const onKnobDown = (e: React.PointerEvent) => {
    const el = target.current;
    if (!el) return;
    e.stopPropagation();
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft };
    // let the cards follow the knob freely; snapping resumes on release
    el.style.scrollSnapType = "none";
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onKnobMove = (e: React.PointerEvent) => {
    const el = target.current;
    const track = trackRef.current;
    if (!drag.current || !el || !track) return;
    const usable = track.clientWidth - knobWidth;
    if (usable <= 0) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollLeft = drag.current.startScroll + ((e.clientX - drag.current.startX) / usable) * max;
  };

  const onKnobUp = () => {
    drag.current = null;
    if (target.current) target.current.style.scrollSnapType = "";
  };

  const onTrackDown = (e: React.PointerEvent) => {
    const el = target.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const r = track.getBoundingClientRect();
    const pos = (e.clientX - r.left - knobWidth / 2) / (r.width - knobWidth);
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.max(0, Math.min(1, pos)) * max, behavior: "smooth" });
  };

  if (!scrollable) return null;

  const arrow =
    "key flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] text-ink-soft hover:text-ink cursor-pointer md:h-12 md:w-12";
  const ticks =
    "pointer-events-none absolute inset-x-[28px] h-2 opacity-45 bg-[repeating-linear-gradient(90deg,var(--ink-faint)_0_1px,transparent_1px_14px)]";

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <button type="button" aria-label="Scroll left" onClick={() => scrollBy(-1)} className={arrow}>
        <IconChevronLeft size={18} />
      </button>
      <div
        ref={trackRef}
        onPointerDown={onTrackDown}
        className="relative h-14 flex-1 cursor-pointer"
        aria-hidden="true"
      >
        <div className={`${ticks} top-0`} />
        <div className={`${ticks} bottom-0`} />
        <div className="press-xs absolute inset-x-0 top-1/2 h-[7px] -translate-y-1/2 rounded-full bg-[var(--track-off)]" />
        <div
          onPointerDown={onKnobDown}
          onPointerMove={onKnobMove}
          onPointerUp={onKnobUp}
          onPointerCancel={onKnobUp}
          className="absolute top-1/2 flex h-9 -translate-y-1/2 items-center justify-center gap-[6px] rounded-[0.7rem] cursor-grab active:cursor-grabbing"
          style={{
            width: knobWidth,
            left: `calc(${ratio} * (100% - ${knobWidth}px))`,
            touchAction: "none",
            background: "linear-gradient(150deg, var(--fader-hi), var(--fader-lo))",
            boxShadow:
              "2px 3px 6px var(--sd), -1px -1px 2px var(--hl), inset 1px 1px 0 var(--hl-edge)",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-4 w-[2px] rounded-full bg-[var(--grip)] shadow-[1px_0_0_var(--hl-edge)]"
            />
          ))}
        </div>
      </div>
      <button type="button" aria-label="Scroll right" onClick={() => scrollBy(1)} className={arrow}>
        <IconChevronRight size={18} />
      </button>
    </div>
  );
}
