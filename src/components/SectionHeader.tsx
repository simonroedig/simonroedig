import type { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};

/** Big section title, with optional controls on the right. */
export function SectionHeader({ title, children }: Props) {
  return (
    <div className="relative z-10 px-5 pt-10 sm:px-8 md:px-12 md:pt-14">
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-end justify-between gap-x-8 gap-y-6">
        <h2 className="font-display text-[2.9rem] font-extrabold leading-none tracking-[-0.05em] text-ink-strong [text-shadow:0_1px_0_var(--hl)] md:text-6xl lg:text-7xl">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
