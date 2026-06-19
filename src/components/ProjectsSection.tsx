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
          <div className="font-mono text-[10px] md:text-xs text-accent uppercase tracking-[0.3em] mb-1">
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
              className="group text-left aspect-square bg-ink border-2 border-paper p-3 md:p-4 flex flex-col justify-between transition-all duration-150 hover:bg-paper hover:text-ink relative"
              style={{
                ["--card-shadow" as string]: p.color,
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-paper/60 group-hover:text-ink/60">
                  {p.date}
                </span>
                <span
                  className="w-3 h-3 border-2 border-paper group-hover:border-ink"
                  style={{ backgroundColor: p.color }}
                />
              </div>
              <div>
                <h4 className="font-display italic text-lg md:text-xl leading-[0.95] mb-1.5 text-pretty">
                  {p.title}
                </h4>
                <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-tight leading-snug text-paper/50 group-hover:text-ink/60 line-clamp-2">
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
          meta={`${openProj.date} · PROJECT`}
          color={openProj.color}
          description={openProj.fullDescription}
        />
      )}
    </section>
  );
}
