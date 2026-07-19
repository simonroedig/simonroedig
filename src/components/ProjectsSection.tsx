import { projects } from "@/data/projects";
import { CardOverlay } from "./CardOverlay";
import { Route } from "@/routes/index";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type FilterType = 'All' | 'Starred' | 'Personal' | 'University';

export function ProjectsSection() {
  const { project: openId } = Route.useSearch();
  const navigate = useNavigate({ from: Route.id });
  const openProj = projects.find((p) => p.id === openId);
  const [filter, setFilter] = useState<FilterType>('All');

  const filteredProjects = [...projects]
    .filter(p => {
      if (filter === 'All') return true;
      if (filter === 'Starred') return p.isStarred;
      return p.category === filter;
    })
    .sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());

  const setOpenId = (id: string | null) => {
    navigate({ search: (prev) => ({ ...prev, project: id || undefined, experience: undefined }) });
  };

  return (
    <section className="md:snap-start min-h-[100svh] md:h-screen w-full flex flex-col text-ink overflow-x-hidden lg:overflow-hidden">
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
          INDEX // {filteredProjects.length} ENTRIES
        </span>
      </div>

      {/* Filter Bar */}
      <div className="border-b-4 border-ink px-4 md:px-10 py-3 md:py-4 flex items-center gap-3 md:gap-5 overflow-x-auto styled-scrollbar bg-[#151515]">
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-paper/80 font-bold shrink-0 mr-1 md:mr-2">Filter:</span>
        {(['All', 'Starred', 'Personal', 'University'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 md:px-4 md:py-2 border-2 transition-all font-mono text-[10px] md:text-xs uppercase tracking-widest shrink-0 cursor-pointer ${
              filter === f 
                ? 'bg-transparent border-paper text-paper shadow-[4px_4px_0px_0px_var(--color-paper)] font-bold -translate-y-1' 
                : 'bg-transparent border-paper/35 text-paper/85 hover:border-paper hover:text-paper hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--color-paper)] font-medium'
            }`}
          >
            {f === 'Starred' ? '★ Starred' : f}
          </button>
        ))}
      </div>

      {/* Grid (scrollable internally — full grid visible without page scroll on desktop) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div key={filter} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 pb-6">
          {filteredProjects.map((p, index) => (
            <button
              key={p.id}
              onClick={() => setOpenId(p.id)}
              className="group text-left aspect-square bg-paper border-4 border-ink p-3 md:p-4 flex flex-col transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer relative overflow-hidden animate-filter-card-in"
              style={{
                animationDelay: `${Math.min(index, 12) * 35}ms`,
                animationFillMode: "both",
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
                <h4 className="font-display italic text-lg sm:text-xl md:text-2xl leading-[0.95] pb-2 text-ink truncate w-full">
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
