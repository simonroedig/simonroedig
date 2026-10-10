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

  useEffect(
    () =>
      onSound(() => {
        pulseRef.current?.animate([{ opacity: 0.9 }, { opacity: 0 }], {
          duration: 220,
          easing: "ease-out",
        });
      }),
    [],
  );

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
