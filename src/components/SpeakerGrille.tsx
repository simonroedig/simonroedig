import { useEffect, useRef } from "react";
import { onSound } from "@/lib/sound";

/** Perforated speaker panel. It thumps along whenever a UI sound plays. */
export function SpeakerGrille() {
  const pulseRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="@container h-full w-full">
      <div
        className="surface raise-md relative h-full rounded-[2.4em] p-[1.6em]"
        style={{ fontSize: "calc(100cqw / 28)" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1em]">
          <div className="grille absolute inset-0" />
          <div
            ref={pulseRef}
            className="grille absolute inset-0 opacity-0 [--hl:transparent] [--sd:rgba(45,60,85,0.75)]"
          />
        </div>
      </div>
    </div>
  );
}
