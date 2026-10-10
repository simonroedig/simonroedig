import { useCallback, useRef } from "react";
import { experiences } from "@/data/experiences";
import { CardOverlay } from "./CardOverlay";
import { SectionHeader } from "./SectionHeader";
import { ScrollTuner } from "./ScrollTuner";
import { IconArrowUpRight } from "./icons";
import { LoadingImage } from "./LoadingImage";
import { Route } from "@/routes/index";
import { useNavigate } from "@tanstack/react-router";

export function ExperienceSection() {
  const { experience: openId } = Route.useSearch();
  const navigate = useNavigate({ from: Route.id });
  const openExp = experiences.find((e) => e.id === openId);
  const scrollRef = useRef<HTMLDivElement>(null);

  const setOpenId = (id: string | null) => {
    navigate({
      search: (prev) => ({ ...prev, experience: id || undefined, project: undefined }),
      resetScroll: false,
    });
  };

  const showCardNumbers = false; // Toggle this to true to show the numbers again

  const cardStep = useCallback(() => {
    const first = scrollRef.current?.firstElementChild as HTMLElement | null;
    return first ? first.getBoundingClientRect().width + 40 : 400;
  }, []);

  return (
    <section
      id="experience"
      className="md:snap-start flex min-h-[100svh] w-full flex-col overflow-x-hidden md:h-screen lg:overflow-hidden"
    >
      <SectionHeader title="Experience" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center">
        {/* Horizontal scroll cards */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory items-stretch gap-7 overflow-x-auto overflow-y-hidden px-5 pt-12 pb-20 no-scrollbar scroll-px-5 sm:px-8 sm:scroll-px-8 md:gap-10 md:pt-14 md:pb-24 md:[padding-inline:max(3rem,calc((100%_-_1600px)/2))] md:[scroll-padding-inline:max(3rem,calc((100%_-_1600px)/2))]"
        >
          {experiences.map((exp, i) => (
            <button
              key={exp.id}
              onClick={() => setOpenId(exp.id)}
              className="card group relative flex h-[58vh] w-[82vw] shrink-0 snap-start flex-col rounded-[2.25rem] p-5 text-left cursor-pointer sm:h-[420px] sm:w-[320px] md:h-[470px] md:w-[380px] md:p-6 lg:h-[min(54vh,620px)] lg:w-[calc(min(54vh,620px)*0.92)] lg:max-w-[540px]"
            >
              <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
                <span className="press-xs rounded-full px-3.5 py-1.5 text-xs font-bold tabular-nums text-ink-soft">
                  {exp.date}
                </span>
                {exp.id === "bsh" ? (
                  <span className="lcd rounded-full px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em]">
                    Patent
                  </span>
                ) : showCardNumbers ? (
                  <span className="text-xs font-bold text-ink-faint">
                    {String(experiences.length - i).padStart(2, "0")}
                  </span>
                ) : null}
              </div>

              <h3 className="w-full shrink-0 truncate pb-1 font-display text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink-strong sm:text-3xl md:text-[clamp(1.9rem,2.6vw,2.5rem)]">
                {exp.company}
              </h3>
              <p className="mb-5 shrink-0 text-[11px] font-bold uppercase leading-snug tracking-[0.1em] text-ink-faint md:text-xs">
                {exp.role}
              </p>

              <div className="press-sm min-h-[100px] w-full flex-1 rounded-[1.6rem] bg-[linear-gradient(150deg,var(--surface-lo),var(--surface))] p-2 md:p-2.5">
                <div
                  className="relative h-full w-full overflow-hidden rounded-[1.15rem]"
                  style={{ backgroundColor: exp.color }}
                >
                  <LoadingImage
                    src={exp.image}
                    alt={exp.company}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                  />
                </div>
              </div>

              <div className="mt-5 flex shrink-0 items-end gap-4">
                <p className="line-clamp-2 flex-1 text-sm font-medium leading-snug text-ink-soft md:line-clamp-3 md:text-[15px]">
                  {exp.shortDescription}
                </p>
                <span
                  aria-hidden="true"
                  className="key flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] text-ink-faint group-hover:text-ink group-hover:[box-shadow:var(--press-sm)]"
                >
                  <IconArrowUpRight size={16} />
                </span>
              </div>
            </button>
          ))}
          <div className="w-1 shrink-0 md:w-4" />
        </div>

        {/* pulled up into the scroller's bottom padding, which only exists for the card shadows */}
        <div className="relative mx-auto -mt-10 w-full max-w-3xl px-5 pb-10 sm:px-8 md:-mt-14 md:px-12 md:pb-12">
          <ScrollTuner target={scrollRef} step={cardStep} />
        </div>
      </div>

      {openExp && (
        <CardOverlay
          open={!!openExp}
          onClose={() => setOpenId(null)}
          title={openExp.company}
          meta={`${openExp.date} · ${openExp.role}`}
          color={openExp.color}
          description={openExp.fullDescription}
        />
      )}
    </section>
  );
}
