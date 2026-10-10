import { useRef } from "react";
import { experiences } from "@/data/experiences";
import { CardOverlay } from "./CardOverlay";
import { SectionHeader } from "./SectionHeader";
import { ScrollTuner } from "./ScrollTuner";
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

  const cardStep = () => {
    const first = scrollRef.current?.firstElementChild as HTMLElement | null;
    return first ? first.getBoundingClientRect().width + 40 : 400;
  };

  return (
    <section
      id="experience"
      className="md:snap-start flex min-h-[100svh] w-full flex-col overflow-x-hidden md:h-screen lg:overflow-hidden"
    >
      <SectionHeader
        index="01"
        kicker="Career"
        title="Experience"
        readout={
          <>
            <span className="led led-on h-1.5! w-1.5!" />
            Timeline
            <span className="font-bold text-ink">
              {String(experiences.length).padStart(2, "0")}
            </span>
            Roles
          </>
        }
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center">
        {/* Horizontal scroll cards */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory items-stretch gap-7 overflow-x-auto overflow-y-hidden px-5 py-10 no-scrollbar scroll-px-5 md:gap-10 md:px-10 md:py-12 md:scroll-px-10"
        >
          {experiences.map((exp, i) => (
            <button
              key={exp.id}
              onClick={() => setOpenId(exp.id)}
              className="group relative flex h-[56vh] w-[80vw] shrink-0 snap-start flex-col rounded-[2rem] p-4 text-left neu-card cursor-pointer sm:h-[400px] sm:w-[310px] md:h-[460px] md:w-[370px] md:rounded-[2.25rem] md:p-5 lg:h-[min(58vh,640px)] lg:w-[calc(min(58vh,640px)*0.82)] lg:max-w-[540px]"
              style={{ "--led": exp.color } as React.CSSProperties}
            >
              <div className="mb-3 flex shrink-0 items-center justify-between md:mb-4">
                <span className="rounded-full px-3 py-1.5 font-mono text-[10px] font-bold tracking-wide text-ink-soft neu-inset-xs md:text-xs">
                  {exp.date}
                </span>
                {exp.id === "bsh" ? (
                  <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-accent-ink neu-raised-xs md:text-[11px]">
                    <span aria-hidden="true">★</span>
                    Patent
                  </span>
                ) : showCardNumbers ? (
                  <span className="font-mono text-[10px] text-ink-faint">
                    {String(experiences.length - i).padStart(2, "0")}
                  </span>
                ) : (
                  <span className="led led-color mr-1" aria-hidden="true" />
                )}
              </div>

              <h3 className="w-full shrink-0 truncate pb-1 font-display text-2xl font-bold leading-[1.05] tracking-[-0.035em] text-ink sm:text-3xl md:text-[2.4rem]">
                {exp.company}
              </h3>
              <p className="mb-4 shrink-0 font-mono text-[10px] uppercase leading-snug tracking-[0.08em] text-ink-faint md:mb-5 md:text-[11px]">
                {exp.role}
              </p>

              <div className="mb-4 min-h-[100px] w-full flex-1 rounded-[1.4rem] p-2 neu-inset-sm md:rounded-[1.6rem] md:p-2.5">
                <div
                  className="h-full w-full overflow-hidden rounded-[1rem] md:rounded-[1.15rem]"
                  style={{ backgroundColor: exp.color }}
                >
                  <img
                    src={exp.image}
                    alt={exp.company}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                  />
                </div>
              </div>

              <div className="flex shrink-0 items-end gap-4">
                <p className="line-clamp-2 flex-1 text-sm leading-snug text-ink-soft md:line-clamp-3 md:text-[15px]">
                  {exp.shortDescription}
                </p>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-faint neu-raised-sm transition-all duration-300 group-hover:text-accent-ink group-hover:[box-shadow:var(--neu-in-sm)]"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M4 10 10 4M5 4h5v5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </button>
          ))}
          <div className="w-1 shrink-0 md:w-4" />
        </div>

        <div className="mx-auto w-full max-w-3xl px-5 pb-8 md:px-10 md:pb-10">
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
