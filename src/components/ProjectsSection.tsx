import { useState } from "react";
import { projects } from "@/data/projects";
import { CardOverlay } from "./CardOverlay";

export function ProjectsSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openProj = projects.find((p) => p.id === openId);

  return (
    <section className="md:snap-start min-h-[100svh] md:h-screen w-full flex flex-col bg-ink text-paper overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-10 py-4 md:py-6 border-b-4 border-paper flex justify-between items-baseline gap-4">
        <div>
          <div className="font-mono text-[10px] md:text-xs text-paper uppercase tracking-[0.3em] mb-1">
            02 / Lab
          </div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl italic leading-none text-paper">
            Projects
          </h2>
        </div>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-paper/50 hidden sm:block">
          INDEX // {projects.length} ENTRIES
        </span>
      </div>

      {/* Grid (scrollable internally — full grid visible without page scroll on desktop) */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpenId(p.id)}
              className="group text-left aspect-square bg-ink border-2 border-paper flex flex-col justify-between transition-all duration-150 hover:border-paper relative overflow-hidden cursor-pointer"
              style={{
                ["--card-shadow" as string]: p.color,
              }}
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 w-full h-full z-0 opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 ease-out">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-ink/60 group-hover:bg-transparent transition-colors duration-300 z-0"></div>

              {/* Content overlay */}
              <div className="relative z-10 w-full h-full p-3 md:p-4 flex flex-col justify-between bg-gradient-to-t from-ink/90 via-ink/20 to-ink/60 group-hover:from-ink/90 group-hover:via-ink/40 group-hover:to-transparent">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-paper/80 font-bold group-hover:text-paper drop-shadow-md">
                    {p.date}
                  </span>
                  <span
                    className="w-3 h-3 border-2 border-paper flex-shrink-0"
                    style={{ backgroundColor: p.color }}
                  />
                </div>
                <div>
                  <h4 className="font-display italic text-lg md:text-xl leading-[0.95] mb-1.5 text-balance text-paper drop-shadow-lg shadow-black">
                    {p.title}
                  </h4>
                  <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-tight leading-snug text-paper/80 group-hover:text-paper drop-shadow-md shadow-black line-clamp-2">
                    {p.shortDescription}
                  </p>
                </div>
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
          meta={`${openProj.date} · PROJECT`}
          color={openProj.color}
          description={openProj.fullDescription}
          image={openProj.image}
        />
      )}
    </section>
  );
}
