import { useCallback, useEffect, useRef, useState } from "react";
import { clack, tick } from "@/lib/sound";
import { useTheme } from "@/hooks/use-theme";
import { useCursorLight } from "@/hooks/use-cursor-light";
import { DeviceSwitch } from "./DeviceSwitch";
import { CaptionFade } from "./AiText";
// The path from idea to product, told in first person. `ai` is where AI
// speeds up each stage (shown in AI Boost mode).
const STATIONS = [
  {
    name: "Concepts",
    caption: "I research, ideate and shape concepts.",
    ai: "AI helps me research and explore more ideas, faster.",
  },
  {
    name: "Prototypes",
    caption: "I build physical and digital prototypes.",
    ai: "I let AI build first prototypes, so we test sooner.",
  },
  {
    name: "User Studies",
    caption: "I run user studies and iterate on UX/UI.",
    ai: "AI speeds up my study analysis and iterations.",
  },
  {
    name: "Product",
    caption: "I implement it, from frontend to backend.",
    ai: "I ship faster with AI-assisted engineering.",
  },
];
const AI_INTRO = "Where I bring in AI:";
const AI_FINAL = "I bring AI into every stage and help the whole team move faster.";
const AI_FINAL_MARK = ["every", "stage"];

// AI Boost scan timing
const INTRO_MS = 2800; // intro line while the tuner returns to the start
const DWELL_MS = 2800; // time to read each stage
const GLIDE_MS = 1000; // a slow glide to the next stage
const FINAL_HOLD_MS = 7500; // closing line stays up, then AI Boost switches itself off
const LAST = STATIONS.length - 1;

const NAME_STEP = 10.5; // em between station names on the LCD scale
const NAME_SIZE = 1.4; // em, station name font size
const DEG_PER_STATION = 110; // roller rotation per station
const DRAG_GAIN = 1.5; // a full swipe across the roller moves ~1.5 stations
const RIDGES = 46;
const RIDGE_STEP = 360 / RIDGES;

// Dial geometry, in tenths of an em (SVG viewBox 0 0 240 240)
const C = 120;
const polar = (r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: Math.round((C + r * Math.cos(rad)) * 100) / 100,
    y: Math.round((C + r * Math.sin(rad)) * 100) / 100,
  };
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const nameOpacity = (i: number, p: number) => clamp(1 - Math.abs(i - p) * 0.78, 0.16, 1);

/** Ridges travel around a vertical cylinder; only the front half is visible. */
const ridgeStyle = (i: number, angle: number) => {
  const phi = ((((i * RIDGE_STEP - angle) % 360) + 540) % 360) - 180; // 0 = front
  const c = Math.cos((phi * Math.PI) / 180);
  if (c <= 0.02) return { opacity: "0", left: "50%", transform: "translateX(-50%)" };
  return {
    opacity: String(Math.round(Math.pow(c, 0.7) * 1000) / 1000),
    left: `${Math.round((50 + 49 * Math.sin((phi * Math.PI) / 180)) * 100) / 100}%`,
    transform: `translateX(-50%) scaleX(${Math.round((0.35 + c * 0.65) * 1000) / 1000})`,
  };
};

// The radio starts on the last station and sweeps to the first on load.
const START = STATIONS.length - 1;

/**
 * A Braun-style radio that tunes through the product process. "AI Boost"
 * scans the whole band and shows where AI speeds up each stage; the AM/PM
 * selector switches between light and dark mode.
 */
export function HeroRadio() {
  const [dark, setDark] = useTheme();
  const panelRef = useCursorLight<HTMLDivElement>();
  const [station, setStation] = useState(START);
  const [ai, setAi] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [aiPhase, setAiPhase] = useState<"intro" | "stages" | "final">("stages");
  const spring = useRef({ k: 170, c: 17 });
  const scanTimers = useRef<number[]>([]);

  const pos = useRef(START);
  const rawPos = useRef(START);
  const vel = useRef(0);
  const target = useRef<number | null>(null);
  const raf = useRef(0);
  const lastDetent = useRef(Math.floor((START * DEG_PER_STATION) / RIDGE_STEP));
  const drag = useRef<{ x: number; t: number; active: boolean } | null>(null);
  const wheelTimer = useRef(0);

  const rollerRef = useRef<HTMLDivElement>(null);
  const ridgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const namesRef = useRef<HTMLDivElement>(null);
  const nameRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const scaleRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGGElement>(null);

  /** Push the current tuning position into the DOM (no React re-render). */
  const paint = useCallback(() => {
    const p = pos.current;
    const angle = p * DEG_PER_STATION;

    if (namesRef.current) namesRef.current.style.transform = `translateX(${-p * NAME_STEP}em)`;
    if (scaleRef.current) scaleRef.current.style.transform = `translateX(${-p * NAME_STEP}em)`;
    nameRefs.current.forEach((el, i) => {
      if (el) el.style.opacity = String(nameOpacity(i, p));
    });
    if (ringRef.current) ringRef.current.setAttribute("transform", `rotate(${p * 22} ${C} ${C})`);

    ridgeRefs.current.forEach((el, i) => {
      if (el) Object.assign(el.style, ridgeStyle(i, angle));
    });

    const detent = Math.floor(angle / RIDGE_STEP);
    if (detent !== lastDetent.current) {
      lastDetent.current = detent;
      tick(0.7 + Math.min(Math.abs(vel.current) * 0.4, 0.5));
    }

    const nearest = clamp(Math.round(p), 0, LAST);
    setStation((s) => (s === nearest ? s : nearest));
  }, []);

  /** Springy settle towards `target`, slightly underdamped for a little bounce. */
  const animate = useCallback(() => {
    cancelAnimationFrame(raf.current);
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const goal = target.current;
      if (goal === null) return;
      const force = -spring.current.k * (pos.current - goal) - spring.current.c * vel.current;
      vel.current += force * dt;
      pos.current += vel.current * dt;
      paint();
      if (Math.abs(pos.current - goal) < 0.0008 && Math.abs(vel.current) < 0.002) {
        pos.current = goal;
        vel.current = 0;
        paint();
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [paint]);

  /** Tune to a station: snappy by default, a slow glide for the AI Boost scan. */
  const tuneTo = useCallback(
    (i: number, glide = false) => {
      spring.current = glide ? { k: 55, c: 13.5 } : { k: 170, c: 17 };
      target.current = clamp(i, 0, LAST);
      animate();
    },
    [animate],
  );

  const stopScan = useCallback(() => {
    scanTimers.current.forEach(clearTimeout);
    scanTimers.current = [];
    setScanning(false);
    setAiPhase("stages");
  }, []);

  /**
   * AI Boost: an intro line while the tuner returns to the start, then a slow
   * pass through every stage, then the closing line. Fixed timeline, so it
   * runs the same way no matter where the tuner was.
   */
  const runScan = useCallback(() => {
    stopScan();
    setScanning(true);
    setAiPhase("intro");
    tuneTo(0);
    const at = (ms: number, fn: () => void) => scanTimers.current.push(window.setTimeout(fn, ms));
    let t = INTRO_MS;
    at(t, () => setAiPhase("stages"));
    t += DWELL_MS;
    for (let i = 1; i <= LAST; i++) {
      at(t, () => tuneTo(i, true));
      t += GLIDE_MS + DWELL_MS;
    }
    at(t, () => {
      setScanning(false);
      setAiPhase("final");
    });
    at(t + FINAL_HOLD_MS, () => {
      setAi(false);
      setAiPhase("stages");
      clack();
    });
  }, [stopScan, tuneTo]);

  // Intro: sweep across the band and settle on "Concept"
  useEffect(() => {
    paint();
    const t = window.setTimeout(() => tuneTo(0), 700);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf.current);
      scanTimers.current.forEach(clearTimeout);
    };
  }, [paint, tuneTo]);

  // Rubber band past both ends of the band
  const setPos = (raw: number) => {
    rawPos.current = raw;
    pos.current = raw < 0 ? raw * 0.3 : raw > LAST ? LAST + (raw - LAST) * 0.3 : raw;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    stopScan();
    cancelAnimationFrame(raf.current);
    target.current = null;
    vel.current = 0;
    rawPos.current = pos.current;
    drag.current = { x: e.clientX, t: performance.now(), active: true };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = rollerRef.current;
    if (!d?.active || !el) return;
    const now = performance.now();
    const dx = e.clientX - d.x;
    // the surface follows the finger: arc length -> rotation -> stations
    const deg = (dx / (el.clientWidth / 2)) * (180 / Math.PI) * DRAG_GAIN;
    const delta = -deg / DEG_PER_STATION;
    setPos(rawPos.current + delta);
    vel.current = delta / Math.max(0.001, (now - d.t) / 1000);
    d.x = e.clientX;
    d.t = now;
    paint();
  };

  const onPointerUp = () => {
    if (!drag.current?.active) return;
    drag.current = null;
    const fling = clamp(vel.current * 0.12, -1, 1);
    tuneTo(Math.round(pos.current + fling));
  };

  // Mouse wheel / trackpad over the roller
  useEffect(() => {
    const el = rollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopScan();
      cancelAnimationFrame(raf.current);
      target.current = null;
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      setPos(clamp(pos.current + d * 0.0035, -0.25, LAST + 0.25));
      vel.current = 0;
      paint();
      clearTimeout(wheelTimer.current);
      wheelTimer.current = window.setTimeout(() => tuneTo(Math.round(pos.current)), 140);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [paint, tuneTo, stopScan]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    stopScan();
    const current = Math.round(target.current ?? pos.current);
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      tuneTo(current + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      tuneTo(current - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      tuneTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      tuneTo(LAST);
    }
  };

  const toggleTheme = () => {
    setDark(!dark);
    clack();
  };

  const toggleAi = () => {
    const next = !ai;
    setAi(next);
    clack();
    if (next) runScan();
    else stopScan();
  };

  const current = STATIONS[station];
  const finale = ai && aiPhase === "final";
  const captionProps = !ai
    ? { id: `plain-${station}`, text: current.caption, kind: "plain" as const }
    : aiPhase === "intro"
      ? { id: "ai-intro", text: AI_INTRO, kind: "ai" as const }
      : finale
        ? { id: "ai-final", text: AI_FINAL, kind: "final" as const, highlight: AI_FINAL_MARK }
        : { id: `ai-${station}`, text: current.ai, kind: "ai" as const };

  return (
    <div className="@container w-full">
      <div
        ref={panelRef}
        className="surface raise-lg relative overflow-hidden rounded-[3.2em] px-[2em] pt-[2em] pb-[2em]"
        style={{ fontSize: "calc(100cqw / 28)" }}
      >
        {/* Dial */}
        <div className="relative mx-auto aspect-square w-[24em]">
          {/* Outer ring with fine scale */}
          <div className="surface raise-md absolute left-1/2 top-1/2 h-[21em] w-[21em] -translate-x-1/2 -translate-y-1/2 rounded-full">
            <svg
              viewBox="0 0 240 240"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <g ref={ringRef} transform={`rotate(${START * 22} ${C} ${C})`}>
                {Array.from({ length: 120 }).map((_, i) => {
                  const major = i % 10 === 0;
                  const a = polar(major ? 98 : 101, i * 3);
                  const b = polar(108, i * 3);
                  return (
                    <line
                      key={i}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="var(--ink-faint)"
                      strokeOpacity={major ? 0.55 : 0.28}
                      strokeWidth={major ? 1.4 : 0.9}
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>
            </svg>
          </div>

          {/* AI Boost: red ring lighting up around the display */}
          <div
            className={`absolute left-1/2 top-1/2 h-[19em] w-[19em] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700 ${ai ? "opacity-100" : "opacity-0"}`}
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--ai) 46%, transparent) 62%, transparent 96%)",
            }}
          />

          {/* Bezel */}
          <div
            className="absolute left-1/2 top-1/2 h-[13.2em] w-[13.2em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(150deg,var(--knob-hi),var(--knob-lo))] transition-[box-shadow] duration-700"
            style={{
              boxShadow: ai
                ? "var(--raise-sm), 0 0 1.4em 0.3em color-mix(in srgb, var(--ai) 45%, transparent)"
                : "var(--raise-sm), 0 0 0 0 transparent",
            }}
          />

          {/* Analog LCD */}
          <div
            className="lcd absolute left-1/2 top-1/2 h-[11.2em] w-[11.2em] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full transition-[filter] duration-700"
            style={{ filter: ai ? "brightness(1.05)" : "none" }}
          >
            {/* Tuning view (fades away for the AI Boost finale) */}
            <div
              className={`absolute inset-0 transition-[opacity,filter] duration-500 ${finale ? "opacity-0 blur-[4px]" : "opacity-100 blur-0"}`}
            >
              <div
                className={`absolute right-[calc(50%+0.55em)] top-[1.1em] text-[0.8em] font-extrabold tracking-[0.12em] transition-opacity duration-300 ${
                  ai ? (scanning ? "animate-pulse opacity-100" : "opacity-100") : "opacity-[0.16]"
                }`}
                style={ai ? { color: "var(--ai-deep)" } : undefined}
              >
                AI
              </div>
              <div className="absolute left-[calc(50%+0.55em)] top-[1.05em] text-[0.95em] font-bold tabular-nums opacity-75">
                {station + 1}
              </div>
              {/* scrolling scale */}
              <div
                className="absolute inset-x-0 top-[3em] h-[1.1em]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent, #000 30%, #000 70%, transparent)",
                  maskImage: "linear-gradient(90deg, transparent, #000 30%, #000 70%, transparent)",
                }}
              >
                <div
                  ref={scaleRef}
                  className="absolute left-1/2 top-0 h-full w-0"
                  style={{ transform: `translateX(${-START * NAME_STEP}em)` }}
                >
                  {Array.from({ length: (LAST + 2) * 8 + 1 }).map((_, i) => {
                    const x = (i / 8 - 1) * NAME_STEP;
                    const major = i % 8 === 0;
                    return (
                      <span
                        key={i}
                        className="absolute bottom-0 w-[0.08em] rounded-full bg-lcd-ink"
                        style={{
                          left: `${x}em`,
                          height: major ? "100%" : "45%",
                          opacity: major ? 0.7 : 0.35,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              {/* station names */}
              <div className="absolute inset-x-0 top-[4.55em] h-[2.4em]">
                <div
                  ref={namesRef}
                  className="absolute left-1/2 top-0 h-full w-0"
                  style={{ transform: `translateX(${-START * NAME_STEP}em)` }}
                >
                  {STATIONS.map((s, i) => (
                    <span
                      key={s.name}
                      ref={(el) => {
                        nameRefs.current[i] = el;
                      }}
                      className="absolute top-0 -translate-x-1/2 whitespace-nowrap font-bold leading-[1.5] tracking-[-0.02em]"
                      style={{
                        fontSize: `${NAME_SIZE}em`,
                        left: `${(i * NAME_STEP) / NAME_SIZE}em`,
                        opacity: nameOpacity(i, START),
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute inset-x-0 top-[7.6em] flex justify-center gap-[0.9em] text-[0.95em] font-extrabold tracking-[0.12em]">
                <span className={`transition-opacity ${dark ? "opacity-25" : "opacity-80"}`}>
                  AM
                </span>
                <span className={`transition-opacity ${dark ? "opacity-80" : "opacity-25"}`}>
                  PM
                </span>
              </div>
              {/* needle */}
              <div className="absolute left-1/2 top-[0.4em] h-[4.6em] w-[0.14em] -translate-x-1/2 rounded-full bg-needle shadow-[0_0_0.3em_rgba(212,80,63,0.5)]" />
            </div>

            {/* AI Boost finale: every stage, enhanced by Simon + AI */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center transition-[opacity,filter] duration-500 ${finale ? "opacity-100 blur-0 delay-200" : "pointer-events-none opacity-0 blur-[4px]"}`}
              aria-hidden={!finale}
            >
              <div
                className="mb-[0.55em] text-[0.72em] font-extrabold uppercase tracking-[0.2em]"
                style={{ color: "var(--ai-deep)" }}
              >
                Simon + AI
              </div>
              <ul className="flex flex-col items-start gap-[0.1em]">
                {STATIONS.map((s, i) => (
                  <li
                    key={s.name}
                    className="flex items-center gap-[0.4em] text-[0.95em] font-bold leading-[1.3]"
                    style={
                      finale
                        ? { animation: `word-in 0.5s var(--ease-soft) ${350 + i * 150}ms both` }
                        : undefined
                    }
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="h-[0.8em] w-[0.8em] shrink-0"
                      style={{ color: "var(--ai-deep)" }}
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6.4 4.8 9 10 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="relative z-10 mx-auto mt-[0.2em] h-[2.6em] max-w-[22em] text-center text-[max(1.05em,10px)] font-semibold leading-tight text-ink-soft">
          <span className="sr-only" aria-live="polite">
            {captionProps.text}
          </span>
          <CaptionFade {...captionProps} />
        </p>

        {/* Lower, wavy layer */}
        <div className="relative -mx-[2em] -mb-[2em] mt-[0.4em] px-[2em] pt-[2.4em] pb-[2em]">
          <svg
            viewBox="0 0 280 60"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-0 h-[6em] w-full drop-shadow-[0_-0.25em_0.35em_var(--sd-soft)]"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="radio-wave" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--surface-hi)" />
                <stop offset="1" stopColor="var(--surface)" />
              </linearGradient>
            </defs>
            <path
              d="M0 26 C 50 6, 95 8, 140 20 S 230 36, 280 14 L 280 60 L 0 60 Z"
              fill="url(#radio-wave)"
            />
            <path
              d="M0 26 C 50 6, 95 8, 140 20 S 230 36, 280 14"
              fill="none"
              stroke="var(--hl)"
              strokeWidth="1.2"
            />
          </svg>
          <div className="absolute inset-x-0 top-[5.9em] bottom-0 bg-[linear-gradient(180deg,var(--surface),var(--surface-lo))]" />

          <div className="relative">
            <div className="text-center text-[max(0.95em,9px)] font-extrabold uppercase tracking-[0.24em] text-ink">
              Tuner
            </div>

            {/* Roller */}
            <div className="press-sm mt-[0.8em] rounded-[1.6em] bg-[linear-gradient(150deg,var(--surface-lo),var(--surface))] p-[0.55em]">
              <div
                ref={rollerRef}
                role="slider"
                tabIndex={0}
                aria-label="Tuner: from idea to product"
                aria-valuemin={0}
                aria-valuemax={LAST}
                aria-valuenow={station}
                aria-valuetext={current.name}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onKeyDown={onKeyDown}
                className="relative h-[4.2em] cursor-grab select-none overflow-hidden rounded-[1.15em] outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-go/60"
                style={{
                  touchAction: "pan-y",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.35), transparent 35%, transparent 70%, var(--sd-soft)), linear-gradient(90deg, var(--surface-lo) 0%, var(--surface) 18%, var(--knob-hi) 50%, var(--surface) 82%, var(--surface-lo) 100%)",
                  boxShadow: "0 0.15em 0.4em var(--sd-soft)",
                }}
              >
                {Array.from({ length: RIDGES }).map((_, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      ridgeRefs.current[i] = el;
                    }}
                    className="pointer-events-none absolute top-[12%] bottom-[12%] w-[0.22em] rounded-full"
                    style={{
                      ...ridgeStyle(i, START * DEG_PER_STATION),
                      background: "linear-gradient(90deg, var(--sd) 0 45%, var(--hl) 55% 100%)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-[1.4em] grid grid-cols-[1.3fr_1fr] gap-[0.9em]">
              <div className="tray flex items-center justify-between gap-[0.6em] rounded-[1.3em] py-[0.75em] pr-[0.75em] pl-[1em]">
                <span
                  className={`whitespace-nowrap text-[max(0.9em,9px)] font-extrabold uppercase tracking-[0.12em] transition-colors ${ai ? "text-ai-ink" : "text-ink-soft"}`}
                >
                  AI Boost
                </span>
                <DeviceSwitch on={ai} onToggle={toggleAi} label="AI Boost" tone="ai" />
              </div>
              <div className="tray flex items-center justify-center gap-[0.55em] rounded-[1.3em] px-[0.75em] py-[0.75em] text-[max(0.9em,9px)] font-extrabold tracking-[0.08em]">
                <span className={`transition-colors ${dark ? "text-ink-faint" : "text-ink"}`}>
                  AM
                </span>
                <DeviceSwitch on={dark} onToggle={toggleTheme} label="Dark mode (PM)" />
                <span className={`transition-colors ${dark ? "text-ink" : "text-ink-faint"}`}>
                  PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
