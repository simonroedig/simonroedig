import { useCallback, useEffect, useRef, useState } from "react";
import bgImage from "@/assets/bg.png";
import fgImage from "@/assets/foreground.png";

const MIN_ANGLE = -135;
const MAX_ANGLE = 135;
const FREQ_MIN = 87.5;
const FREQ_MAX = 108;
const STEP = 36;
const METER_DOTS = 18;

const angleToFreq = (a: number) =>
  FREQ_MIN + ((a - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE)) * (FREQ_MAX - FREQ_MIN);
const freqToAngle = (f: number) =>
  MIN_ANGLE + ((f - FREQ_MIN) / (FREQ_MAX - FREQ_MIN)) * (MAX_ANGLE - MIN_ANGLE);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Geometry in SVG units (viewBox 0 0 220 220)
const C = 110;
const polar = (r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  // rounded so server and client render identical attribute strings
  return {
    x: Math.round((C + r * Math.cos(rad)) * 100) / 100,
    y: Math.round((C + r * Math.sin(rad)) * 100) / 100,
  };
};

type Props = { age: number };

/**
 * A Braun-inspired radio tuner. The portrait sits in the recessed centre of the
 * knob; turning the knob "tunes" through the things Simon works on.
 */
export function TuningDial({ age }: Props) {
  const stations = [
    "UX / UI Design",
    "Prototyping",
    "User Studies",
    "AI Workflows",
    "Product Engineering",
    "Web Development",
    "Music",
    `Age ${age}`,
  ];
  const stationAngle = (i: number) => -((stations.length - 1) * STEP) / 2 + i * STEP;

  const [angle, setAngle] = useState(MIN_ANGLE);
  const [dragging, setDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);
  const drag = useRef({ last: 0, travelled: 0, active: false });

  // Nearest station and how well we're tuned into it (0..1)
  let nearest = 0;
  let nearestDist = Infinity;
  stations.forEach((_, i) => {
    const d = Math.abs(angle - stationAngle(i));
    if (d < nearestDist) {
      nearestDist = d;
      nearest = i;
    }
  });
  const signal = clamp(1 - nearestDist / (STEP / 2), 0, 1);
  const locked = nearestDist < 3;
  const freq = angleToFreq(angle);

  // "Tune in" sweep on load
  useEffect(() => {
    const t = window.setTimeout(() => setAngle(stationAngle(0)), 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Parallax portrait (fine pointers only). Written straight to the DOM so
  // mouse movement doesn't re-render the whole dial.
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const apply = (x: number, y: number) => {
      if (bgRef.current)
        bgRef.current.style.transform = `scale(1.15) translate(${x * -7}px, ${y * -7}px)`;
      if (fgRef.current)
        fgRef.current.style.transform = `scale(1.08) translate(${x * 10}px, ${y * 10}px)`;
    };
    const onMove = (e: MouseEvent) => {
      const el = dialRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      apply(
        (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2),
        (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2),
      );
    };
    const onLeave = () => apply(0, 0);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const n = stations.length;
      setAngle(stationAngle(((i % n) + n) % n));
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(8);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stations.length],
  );

  const pointerAngle = (e: React.PointerEvent) => {
    const r = dialRef.current!.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    return (Math.atan2(dx, -dy) * 180) / Math.PI;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    drag.current = { last: pointerAngle(e), travelled: 0, active: true };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const a = pointerAngle(e);
    let delta = a - drag.current.last;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    drag.current.last = a;
    drag.current.travelled += Math.abs(delta);
    if (drag.current.travelled > 4) {
      if (!dragging) setDragging(true);
      setAngle((prev) => clamp(prev + delta, MIN_ANGLE, MAX_ANGLE));
    }
  };

  const onPointerUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (drag.current.travelled <= 4) {
      goTo(nearest + 1);
    } else {
      goTo(nearest);
    }
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      goTo(Math.min(nearest + 1, stations.length - 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      goTo(Math.max(nearest - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(stations.length - 1);
    }
  };

  // Static scale: minor ticks every MHz, numbers every 4 MHz
  const ticks: { deg: number; major: boolean }[] = [];
  for (let f = 88; f <= 108; f += 1) ticks.push({ deg: freqToAngle(f), major: f % 4 === 0 });

  const litDots = Math.round(signal * METER_DOTS);

  return (
    <div className="flex w-full flex-col items-center gap-[clamp(0.75rem,1.8vh,1.25rem)]">
      {/* Dial */}
      <div
        ref={dialRef}
        role="slider"
        tabIndex={0}
        aria-label="Tuning dial — what I work on"
        aria-valuemin={0}
        aria-valuemax={stations.length - 1}
        aria-valuenow={nearest}
        aria-valuetext={stations[nearest]}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className="relative aspect-square w-[var(--dial)] select-none rounded-full outline-none cursor-grab active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-8 focus-visible:ring-offset-surface"
      >
        {/* Scale */}
        <svg
          viewBox="0 0 220 220"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {ticks.map(({ deg, major }) => {
            const a = polar(major ? 89 : 91, deg);
            const b = polar(97, deg);
            return (
              <line
                key={deg}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--ink-faint)"
                strokeOpacity={major ? 0.75 : 0.35}
                strokeWidth={major ? 1.3 : 0.8}
                strokeLinecap="round"
              />
            );
          })}
          {[88, 92, 96, 100, 104, 108].map((f) => {
            const p = polar(105.5, freqToAngle(f));
            return (
              <text
                key={f}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="6.5"
                fontFamily="JetBrains Mono, monospace"
                fill="var(--ink-faint)"
              >
                {f}
              </text>
            );
          })}
          {stations.map((s, i) => {
            const p = polar(84.5, stationAngle(i));
            const active = i === nearest && locked;
            return (
              <circle
                key={s}
                cx={p.x}
                cy={p.y}
                r={active ? 1.9 : 1.3}
                fill={active ? "var(--accent)" : "var(--ink-faint)"}
                fillOpacity={active ? 1 : 0.45}
                style={{ transition: "all 0.3s ease" }}
              />
            );
          })}
          <text
            x={C}
            y={C + 99}
            textAnchor="middle"
            fontSize="6"
            letterSpacing="1.6"
            fontFamily="JetBrains Mono, monospace"
            fill="var(--ink-faint)"
          >
            MHz
          </text>
        </svg>

        {/* Knob */}
        <div
          className="absolute left-1/2 top-1/2 h-[73%] w-[73%] -translate-x-1/2 -translate-y-1/2 rounded-full neu-convex neu-raised-lg"
          style={{ touchAction: "none" }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              transform: `rotate(${angle}deg)`,
              transition: dragging ? "none" : "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {/* knurled grip */}
            <div
              className="absolute inset-[3%] rounded-full opacity-55"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg, var(--sh-l) 0deg 1.4deg, transparent 1.4deg 3.2deg, var(--sh-d) 3.2deg 4deg, transparent 4deg 6deg)",
                WebkitMask:
                  "radial-gradient(circle closest-side, transparent 0 84%, #000 85% 100%)",
                mask: "radial-gradient(circle closest-side, transparent 0 84%, #000 85% 100%)",
              }}
            />
            {/* indicator */}
            <span className="led led-on absolute left-1/2 top-[3.2%] h-2! w-2! -translate-x-1/2" />
          </div>
        </div>

        {/* Recessed portrait well */}
        <div
          className="absolute left-1/2 top-1/2 h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-surface-lo"
          style={{ touchAction: "pan-y" }}
        >
          <img
            ref={bgRef}
            src={bgImage}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 ease-out"
            style={{ transform: "scale(1.15)" }}
          />
          <img
            ref={fgRef}
            src={fgImage}
            alt="Portrait of Simon Rödig"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 ease-out"
            style={{ transform: "scale(1.08)" }}
          />
          {/* recess shading on top of the photo */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "inset 10px 10px 18px rgba(0,0,0,0.38), inset -6px -6px 14px rgba(255,255,255,0.18), inset 0 0 0 3px var(--surface-lo)",
            }}
          />
        </div>
      </div>

      {/* Signal meter */}
      <div className="flex items-center gap-3 w-[var(--dial)] max-w-full px-2" aria-hidden="true">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint text-engrave">
          Signal
        </span>
        <div className="flex flex-1 items-center justify-between rounded-full px-3 py-2 neu-inset-xs">
          {Array.from({ length: METER_DOTS }).map((_, i) => (
            <span
              key={i}
              className={`led h-[5px]! w-[5px]! ${i < litDots ? "led-on" : ""}`}
              style={{ transitionDelay: `${i * 12}ms` }}
            />
          ))}
        </div>
      </div>

      {/* LCD readout */}
      <div
        className="flex w-[var(--dial)] max-w-full items-center gap-4 rounded-2xl bg-lcd px-4 py-3 neu-inset-sm"
        aria-live="polite"
      >
        <div className="flex items-baseline gap-1.5 font-mono text-ink tabular-nums">
          <span className="text-[9px] font-bold uppercase tracking-widest text-ink-faint">FM</span>
          <span className="text-xl md:text-2xl font-bold leading-none tracking-tight">
            {freq.toFixed(1)}
          </span>
        </div>
        <div className="h-7 w-[3px] rounded-full neu-inset-xs" />
        <div className="min-w-0 flex-1">
          <div className="truncate font-mono text-[11px] md:text-xs font-bold uppercase tracking-[0.14em] text-ink">
            {signal > 0.35 ? stations[nearest] : "· · · searching"}
          </div>
          <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
            {locked ? `Station ${nearest + 1} / ${stations.length}` : "Turn to tune"}
          </div>
        </div>
        <span className={`led ${locked ? "led-on" : ""}`} title={locked ? "Tuned" : undefined} />
      </div>
    </div>
  );
}
