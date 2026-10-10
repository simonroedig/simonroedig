import type { ReactNode } from "react";

type Props = {
  index: string;
  kicker: string;
  title: string;
  readout: ReactNode;
  children?: ReactNode;
};

/** Section title with an engraved index and an LCD-style readout on the right. */
export function SectionHeader({ index, kicker, title, readout, children }: Props) {
  return (
    <div className="relative z-10 px-4 pt-6 pb-2 md:px-10 md:pt-10">
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="flex flex-col gap-2 md:gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 items-center gap-2 rounded-full bg-surface px-3 font-mono text-[10px] font-bold tracking-[0.2em] text-ink-faint neu-inset-xs md:text-[11px]">
              <span className="led led-on h-1.5! w-1.5!" />
              {index}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint md:text-xs">
              {kicker}
            </span>
          </div>
          <h2 className="font-display text-[2.6rem] font-bold leading-none tracking-[-0.045em] text-ink md:text-6xl lg:text-7xl">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          {children}
          <div className="hidden items-center gap-3 rounded-2xl bg-lcd px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft neu-inset-sm sm:flex md:text-[11px]">
            {readout}
          </div>
        </div>
      </div>
    </div>
  );
}
