import { projects } from "@/data/projects";
import { CardOverlay } from "./CardOverlay";
import { Route } from "@/routes/index";
import { useNavigate } from "@tanstack/react-router";

export function ProjectsSection() {
  const { project: openId } = Route.useSearch();
  const navigate = useNavigate({ from: Route.id });
  const openProj = projects.find((p) => p.id === openId);

  const setOpenId = (id: string | null) => {
    navigate({ search: (prev) => ({ ...prev, project: id || undefined, experience: undefined }) });
  };

  return (
    <section className="md:snap-start min-h-[100svh] md:h-screen w-full flex flex-col bg-paper text-ink overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-10 py-4 md:py-6 border-b-4 border-ink flex justify-between items-baseline gap-4">
        <div>
          <div className="font-mono text-[10px] md:text-xs text-ink uppercase tracking-[0.3em] mb-1">
            02 / Lab
          </div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl italic leading-none text-ink">
            Projects
          </h2>
        </div>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-ink/50 hidden sm:block">
          INDEX // {projects.length} ENTRIES
        </span>
      </div>

      {/* Grid (scrollable internally — full grid visible without page scroll on desktop) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 pb-6">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpenId(p.id)}
              className="group text-left aspect-square bg-paper border-4 border-ink p-3 md:p-4 flex flex-col transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer relative overflow-hidden"
              style={{
                boxShadow: `8px 8px 0px 0px ${p.color}`,
              }}
            >
              {/* Image Container */}
              <div 
                className="w-full aspect-video border-2 border-ink overflow-hidden shrink-0 mb-3 md:mb-4"
                style={{ backgroundColor: p.color }}
              >
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Content area */}
              <div className="flex flex-col flex-1 min-h-0 w-full justify-start">
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-ink/50 font-bold mb-1">
                  {p.date}
                </span>
                <h4 className="font-display italic text-xl md:text-2xl leading-[0.95] mb-1.5 md:mb-2 text-ink truncate w-full">
                  {p.title}
                </h4>
                <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-tight leading-snug text-ink/80 line-clamp-2 md:line-clamp-3">
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
