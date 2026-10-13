import { useEffect, useRef, useState, type ReactNode } from "react";
import { Marker } from "./AiText";

type Props = {
  title: string;
  children?: ReactNode;
};

/**
 * Big section title, with optional controls on the right. The green marker
 * swipes over it the first time it scrolls into view.
 */
export function SectionHeader({ title, children }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative z-10 px-5 pt-10 sm:px-8 md:px-12 md:pt-14">
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-end justify-between gap-x-8 gap-y-6">
        <h2
          ref={ref}
          className="font-display text-[2.9rem] font-extrabold leading-none tracking-[-0.05em] text-ink-strong [text-shadow:0_1px_0_var(--hl)] md:text-6xl lg:text-7xl"
        >
          {seen ? (
            <Marker delay={250} flush className="[text-shadow:none]">
              {title}
            </Marker>
          ) : (
            title
          )}
        </h2>
        {children}
      </div>
    </div>
  );
}
