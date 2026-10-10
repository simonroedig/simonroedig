import { projects } from "@/data/projects";
import { CardOverlay } from "./CardOverlay";
import { SectionHeader } from "./SectionHeader";
import { Route } from "@/routes/index";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type FilterType = "All" | "Starred" | "Personal" | "University";

// Let long camel-case names ("ConnectivityControl") wrap between words, not mid-word.
const withSoftBreaks = (title: string) =>
  title
    .split(/(?<=[a-z])(?=[A-Z])/)
    .flatMap((part, i) => (i === 0 ? [part] : [<wbr key={i} />, part]));

export function ProjectsSection() {
  const { project: openId } = Route.useSearch();
  const navigate = useNavigate({ from: Route.id });
  const openProj = projects.find((p) => p.id === openId);
  const [filter, setFilter] = useState<FilterType>("All");

  const filteredProjects = [...projects]
    .filter((p) => {
      if (filter === "All") return true;
      if (filter === "Starred") return p.isStarred;
      return p.category === filter;
    })
    .sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());

  const setOpenId = (id: string | null) => {
    navigate({
      search: (prev) => ({ ...prev, project: id || undefined, experience: undefined }),
      resetScroll: false,
    });
  };

  return (
    <section
      id="projects"
      className="md:snap-start flex min-h-[100svh] w-full flex-col overflow-x-hidden text-ink md:h-screen lg:overflow-hidden"
    >
      <SectionHeader
        index="02"
        kicker="Lab"
        title="Projects"
        readout={
          <>
            <span className="led led-on h-1.5! w-1.5!" />
            Index
            <span className="font-bold text-ink">
              {String(filteredProjects.length).padStart(2, "0")}
            </span>
            Entries
          </>
        }
      />

      {/* Band selector */}
      <div className="relative z-10 px-4 pt-4 md:px-10 md:pt-6">
        <div className="mx-auto flex w-full max-w-[1600px] items-center gap-4 overflow-x-auto px-1 py-3 no-scrollbar md:gap-5">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint text-engrave md:text-xs">
            Band
          </span>
          <div className="groove hidden w-8 shrink-0 bg-surface sm:block" />
          <div
            className="flex shrink-0 gap-3 md:gap-4"
            role="radiogroup"
            aria-label="Filter projects"
          >
            {(["All", "Starred", "Personal", "University"] as FilterType[]).map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setFilter(f)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] cursor-pointer md:gap-2.5 md:px-5 md:py-2.5 md:text-xs ${
                    active
                      ? "bg-surface text-ink [box-shadow:var(--neu-in-sm)] transition-[box-shadow,color] duration-300"
                      : "neu-key text-ink-faint hover:text-ink"
                  }`}
                >
                  <span className={`led h-1.5! w-1.5! ${active ? "led-on" : ""}`} />
                  {f === "Starred" ? "★ Starred" : f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid (scrollable internally — full grid visible without page scroll on desktop) */}
      <div className="relative z-10 flex-1 overflow-y-auto styled-scrollbar px-4 pt-6 pb-10 md:px-10 md:pt-8">
        <div
          key={filter}
          className="mx-auto grid w-full max-w-[1600px] auto-rows-fr grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 md:gap-7 lg:grid-cols-5 xl:grid-cols-6"
        >
          {filteredProjects.map((p, index) => (
            <button
              key={p.id}
              onClick={() => setOpenId(p.id)}
              className="group relative flex h-full flex-col rounded-[1.5rem] p-2 text-left neu-card-sm animate-filter-card-in cursor-pointer md:rounded-[1.75rem] md:p-2.5"
              style={
                {
                  animationDelay: `${Math.min(index, 12) * 35}ms`,
                  "--led": p.color,
                } as React.CSSProperties
              }
            >
              <div className="shrink-0 rounded-[1.15rem] p-1.5 neu-inset-xs md:rounded-[1.35rem]">
                <div
                  className="aspect-video w-full overflow-hidden rounded-[0.8rem] md:rounded-[0.95rem]"
                  style={{ backgroundColor: p.color }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                  />
                </div>
              </div>

              <div className="flex min-h-0 w-full flex-1 flex-col px-1.5 pt-3 pb-1.5 md:px-2 md:pt-4">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] font-bold tracking-[0.15em] text-ink-faint md:text-[10px]">
                    {p.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {p.isStarred && (
                      <span
                        className="text-[11px] leading-none text-accent-ink"
                        aria-label="Starred"
                      >
                        ★
                      </span>
                    )}
                    <span className="led led-color h-1.5! w-1.5!" aria-hidden="true" />
                  </span>
                </div>
                <h4 className="line-clamp-2 w-full break-words font-display text-base font-bold leading-tight tracking-[-0.025em] text-ink sm:text-lg md:text-xl">
                  {withSoftBreaks(p.title)}
                </h4>
                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-ink-soft md:line-clamp-3 md:text-xs">
                  {p.shortDescription}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {openProj && (
        <CardOverlay
          open={!!openProj}
          onClose={() => setOpenId(null)}
          title={openProj.title}
          meta={`${openProj.date} · ${openProj.title.toUpperCase()}`}
          color={openProj.color}
          description={openProj.fullDescription}
          image={openProj.image}
          richContent={openProj.richContent}
        />
      )}
    </section>
  );
}
