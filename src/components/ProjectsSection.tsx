import { projects } from "@/data/projects";
import { CardOverlay } from "./CardOverlay";
import { SectionHeader } from "./SectionHeader";
import { Toggle } from "./Toggle";
import { RollingNumber } from "./RollingNumber";
import { LoadingImage } from "./LoadingImage";
import { IconGraduation, IconStar, IconUser } from "./icons";
import { Route } from "@/routes/index";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

// Let long camel-case names ("ConnectivityControl") wrap between words, not mid-word.
const withSoftBreaks = (title: string) =>
  title
    .split(/(?<=[a-z])(?=[A-Z])/)
    .flatMap((part, i) => (i === 0 ? [part] : [<wbr key={i} />, part]));

export function ProjectsSection() {
  const { project: openId } = Route.useSearch();
  const navigate = useNavigate({ from: Route.id });
  const openProj = projects.find((p) => p.id === openId);
  const [starredOnly, setStarredOnly] = useState(false);
  const [personal, setPersonal] = useState(true);
  const [university, setUniversity] = useState(true);

  const filteredProjects = [...projects]
    .filter((p) => (p.category === "Personal" ? personal : university))
    .filter((p) => !starredOnly || p.isStarred)
    .sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());

  const filterKey = `${starredOnly}-${personal}-${university}`;

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
      <SectionHeader title="Projects">
        <div
          className="surface raise-sm flex w-full flex-wrap items-center gap-x-6 gap-y-3 rounded-[1.6rem] px-5 py-4 sm:w-auto md:px-6"
          role="group"
          aria-label="Filter projects"
        >
          <Toggle
            label="Starred"
            icon={IconStar}
            tone="star"
            checked={starredOnly}
            onChange={setStarredOnly}
          />
          <Toggle
            label="Personal"
            icon={IconUser}
            tone="personal"
            checked={personal}
            onChange={setPersonal}
          />
          <Toggle
            label="University"
            icon={IconGraduation}
            tone="uni"
            checked={university}
            onChange={setUniversity}
          />
          <span className="lcd ml-auto inline-flex rounded-[0.6rem] px-2.5 py-1 text-sm font-extrabold tabular-nums">
            <RollingNumber value={filteredProjects.length} />
            <span className="sr-only" aria-live="polite">
              {filteredProjects.length} projects
            </span>
          </span>
        </div>
      </SectionHeader>

      {/* Grid (scrollable internally — full grid visible without page scroll on desktop) */}
      <div className="relative z-10 flex-1 overflow-y-auto styled-scrollbar px-5 pt-8 pb-12 sm:px-8 md:px-12 md:pt-10">
        {filteredProjects.length === 0 ? (
          <div className="tray mx-auto mt-6 max-w-md rounded-[1.6rem] px-6 py-8 text-center text-sm font-semibold text-ink-soft">
            Nothing on this band. Switch a category back on.
          </div>
        ) : (
          <div
            key={filterKey}
            className="mx-auto grid w-full max-w-[1600px] auto-rows-fr grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 md:gap-7 lg:grid-cols-5 xl:grid-cols-6"
          >
            {filteredProjects.map((p, index) => (
              <button
                key={p.id}
                onClick={() => setOpenId(p.id)}
                className="card group relative flex h-full flex-col rounded-[1.6rem] p-2 text-left animate-filter-card-in cursor-pointer md:rounded-[1.85rem] md:p-2.5"
                style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}
              >
                <div className="press-xs shrink-0 rounded-[1.2rem] bg-[linear-gradient(150deg,var(--surface-lo),var(--surface))] p-1.5 md:rounded-[1.4rem]">
                  <div
                    className="relative aspect-video w-full overflow-hidden rounded-[0.85rem] md:rounded-[1rem]"
                    style={{ backgroundColor: p.color }}
                  >
                    <LoadingImage
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                    />
                  </div>
                </div>

                <div className="flex min-h-0 w-full flex-1 flex-col px-1.5 pt-3 pb-1.5 md:px-2 md:pt-4">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold tabular-nums text-ink-faint">
                      {p.date}
                    </span>
                    {p.isStarred && (
                      <IconStar
                        size={13}
                        className="text-ink-soft"
                        aria-hidden={false}
                        aria-label="Starred"
                        role="img"
                      />
                    )}
                  </div>
                  <h4 className="line-clamp-2 w-full break-words font-display text-base font-extrabold leading-tight tracking-[-0.03em] text-ink-strong sm:text-lg md:text-xl">
                    {withSoftBreaks(p.title)}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs leading-snug font-medium text-ink-soft md:line-clamp-3">
                    {p.shortDescription}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
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
