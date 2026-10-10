import { useEffect, useRef, useState } from "react";
import bgImage from "@/assets/bg.png";
import fgImage from "@/assets/foreground.png";
import { useCursorLight } from "@/hooks/use-cursor-light";

/**
 * Layered portrait set into a molded frame. The cursor acts as a lamp: the
 * card's shadow follows it and a soft glare slides over the photo, with only
 * a hint of depth between the two photo layers. Hover or tap reveals the age.
 */
export function PortraitCard({ age }: { age: number }) {
  const cardRef = useCursorLight<HTMLDivElement>();
  const frameRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let frame = 0;
    let mx = 0;
    let my = 0;
    const paint = () => {
      frame = 0;
      const r = frameRef.current?.getBoundingClientRect();
      if (!r) return;
      const x = (mx - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const y = (my - (r.top + r.height / 2)) / (window.innerHeight / 2);
      if (bgRef.current)
        bgRef.current.style.transform = `scale(1.08) translate(${x * -3}px, ${y * -3}px)`;
      if (fgRef.current)
        fgRef.current.style.transform = `scale(1.04) translate(${x * 4}px, ${y * 4}px)`;
      if (glareRef.current) {
        const gx = Math.min(130, Math.max(-30, ((mx - r.left) / r.width) * 100));
        const gy = Math.min(130, Math.max(-30, ((my - r.top) / r.height) * 100));
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.32), rgba(255,255,255,0) 55%)`;
      }
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (bgRef.current) bgRef.current.style.transform = "scale(1.08)";
      if (fgRef.current) fgRef.current.style.transform = "scale(1.04)";
      if (glareRef.current) glareRef.current.style.opacity = "0";
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="@container w-full">
      <div
        ref={cardRef}
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
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out"
            style={{ transform: "scale(1.08)" }}
          />
          <img
            ref={fgRef}
            src={fgImage}
            alt="Portrait of Simon Rödig"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out"
            style={{ transform: "scale(1.04)" }}
          />
          {/* glare from the "lamp" */}
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500"
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
