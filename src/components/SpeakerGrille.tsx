import { useEffect, useRef, useState } from "react";
import { clack, isSoundEnabled, onSound, setSoundEnabled } from "@/lib/sound";
import { DeviceSwitch } from "./DeviceSwitch";
import { useCursorLight } from "@/hooks/use-cursor-light";

/** Perforated speaker panel with the sound switch. It thumps along whenever a UI sound plays. */
export function SpeakerGrille() {
  const panelRef = useCursorLight<HTMLDivElement>();
  const pulseRef = useRef<HTMLDivElement>(null);
  const [sound, setSound] = useState(true);

  useEffect(() => setSound(isSoundEnabled()), []);

  // Thumps along with the UI sounds like a level meter: every sound lifts the
  // level a little and it eases back down. Fast tuning (many clicks a second)
  // becomes a steady glow instead of a strobe.
  useEffect(() => {
    let level = 0;
    let shown = 0;
    let frame = 0;
    let last = 0;
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      level *= Math.exp(-dt / 0.26); // falls back within about half a second
      shown += (level - shown) * Math.min(1, dt * 11); // and never jumps
      if (pulseRef.current) pulseRef.current.style.opacity = shown.toFixed(3);
      frame = shown > 0.004 || level > 0.004 ? requestAnimationFrame(draw) : 0;
      if (!frame && pulseRef.current) pulseRef.current.style.opacity = "0";
    };
    const stop = onSound(() => {
      level = Math.min(0.7, level + 0.22);
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    });
    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  }, []);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    if (next) {
      setSoundEnabled(true);
      clack();
    } else {
      clack();
      setSoundEnabled(false);
    }
  };

  return (
    <div className="@container h-full w-full">
      <div
        ref={panelRef}
        className="surface raise-md relative h-full rounded-[2.6em] p-[1.7em]"
        style={{ fontSize: "calc(100cqw / 24)" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.2em]">
          <div className="grille absolute inset-0" />
          <div
            ref={pulseRef}
            className="grille absolute inset-0 opacity-0 [--hl:transparent] [--sd:rgba(45,60,85,0.75)]"
          />
        </div>
        <div className="surface raise-sm absolute right-[1.2em] bottom-[1.2em] flex items-center gap-[0.7em] rounded-full py-[0.45em] pr-[0.45em] pl-[1em]">
          <span
            className={`text-[max(0.85em,9px)] font-extrabold uppercase tracking-[0.16em] transition-colors ${sound ? "text-ink" : "text-ink-faint"}`}
          >
            Sound
          </span>
          <DeviceSwitch on={sound} onToggle={toggleSound} label="Click sounds" tone="graphite" />
        </div>
      </div>
    </div>
  );
}
