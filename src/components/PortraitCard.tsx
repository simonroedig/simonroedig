import { useEffect, useRef, useState } from "react";
import bgImage from "@/assets/bg.png";
import fgImage from "@/assets/foreground.png";

/** Layered portrait (parallax) set into a molded frame. Hover or tap reveals the age. */
export function PortraitCard({ age }: { age: number }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const apply = (x: number, y: number) => {
      if (bgRef.current)
        bgRef.current.style.transform = `scale(1.12) translate(${x * -8}px, ${y * -8}px)`;
      if (fgRef.current)
        fgRef.current.style.transform = `scale(1.06) translate(${x * 12}px, ${y * 12}px)`;
    };
    const onMove = (e: MouseEvent) => {
      const r = frameRef.current?.getBoundingClientRect();
      if (!r) return;
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

  return (
    <div className="@container w-full">
      <div
        className="surface raise-lg rounded-[2.6em] p-[1em]"
        style={{ fontSize: "calc(100cqw / 30)" }}
      >
        <div
          ref={frameRef}
          onClick={() => setTapped((t) => !t)}
          className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[1.9em] bg-surface-lo lg:cursor-default"
        >
          <img
            ref={bgRef}
            src={bgImage}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out"
            style={{ transform: "scale(1.12)" }}
          />
          <img
            ref={fgRef}
            src={fgImage}
            alt="Portrait of Simon Rödig"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out"
            style={{ transform: "scale(1.06)" }}
          />
          {/* the photo sits in a recess */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.9em]"
            style={{
              boxShadow:
                "inset 0.5em 0.6em 1.2em rgba(20, 30, 45, 0.35), inset -0.3em -0.3em 0.8em rgba(255, 255, 255, 0.18)",
            }}
          />
          <div
            className={`lcd pointer-events-none absolute right-[1.1em] bottom-[1.1em] rounded-full px-[1.1em] py-[0.5em] text-[max(0.95em,11px)] font-extrabold uppercase tracking-[0.14em] transition-all duration-500 ease-[var(--ease-spring)] ${
              tapped
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            }`}
          >
            Age {age}
          </div>
        </div>
      </div>
    </div>
  );
}
