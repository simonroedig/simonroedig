import { experiences } from "@/data/experiences";
import { CardOverlay } from "./CardOverlay";
import { Route } from "@/routes/index";
import { useNavigate } from "@tanstack/react-router";

export function ExperienceSection() {
  const { experience: openId } = Route.useSearch();
  const navigate = useNavigate({ from: Route.id });
  const openExp = experiences.find((e) => e.id === openId);

  const setOpenId = (id: string | null) => {
    navigate({ search: (prev) => ({ ...prev, experience: id || undefined, project: undefined }) });
  };

  const showCardNumbers = false; // Toggle this to true to show the numbers again

  return (
    <section className="md:snap-start min-h-[100svh] md:h-screen w-full flex flex-col bg-paper border-b-4 border-ink overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-10 py-4 md:py-6 border-b-4 border-ink flex justify-between items-baseline gap-4">
        <div>
          <div className="font-mono text-[10px] md:text-xs text-accent uppercase tracking-[0.3em] mb-1">
            01 / Career
          </div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl italic leading-none text-ink">
            Experience
          </h2>
        </div>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground hidden sm:block">
          TIMELINE // {experiences.length} ROLES
        </span>
      </div>

      {/* Horizontal scroll cards */}
      <div className="flex-1 flex items-center overflow-x-auto overflow-y-hidden no-scrollbar gap-6 md:gap-10 px-4 md:px-10 py-6">
        {experiences.map((exp, i) => (
          <button
            key={exp.id}
            onClick={() => setOpenId(exp.id)}
            className="group relative text-left shrink-0 w-[260px] sm:w-[300px] md:w-[360px] h-[325px] sm:h-[375px] md:h-[450px] bg-paper border-4 border-ink p-5 md:p-6 flex flex-col justify-between transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer"
            style={{
              boxShadow: `10px 10px 0px 0px ${exp.color}`,
            }}
          >
            <div className="flex flex-col flex-1 min-h-0 w-full">
              <div className="flex items-center justify-between mb-3 md:mb-4 shrink-0">
                <span className="font-mono text-xs md:text-sm font-bold text-ink">
                  {exp.date}
                </span>
                {exp.id === "bsh" ? (
                  <div className="bg-accent text-paper px-2 py-0.5 border-2 border-ink font-mono text-[10px] md:text-xs font-bold uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_var(--color-ink)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-2">
                    <span className="text-[10px] md:text-xs">★</span>
                    <span>Patent</span>
                  </div>
                ) : showCardNumbers ? (
                  <span
                    className="font-mono text-[10px] uppercase px-2 py-0.5 border-2 border-ink"
                    style={{ backgroundColor: exp.color, color: "#000" }}
                  >
                    {String(experiences.length - i).padStart(2, "0")}
                  </span>
                ) : null}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl italic leading-[0.95] text-ink mb-1 pb-2 shrink-0 truncate">
                {exp.company}
              </h3>
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-tight text-muted-foreground mb-4 md:mb-6 shrink-0">
                {exp.role}
              </p>
              <div
                className="w-full h-32 md:h-40 border-2 border-ink mb-4 overflow-hidden shrink-0"
                style={{ backgroundColor: exp.color }}
              >
                <img
                  src={exp.image}
                  alt={exp.company}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                />
              </div>
              <p className="text-sm md:text-[15px] leading-snug text-ink shrink-0 line-clamp-2 md:line-clamp-3">
                {exp.shortDescription}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-ink flex items-center justify-between shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink group-hover:text-accent">
                Open case →
              </span>
              <div className="w-6 h-6 border-2 border-ink bg-paper grid place-items-center font-mono text-xs group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                +
              </div>
            </div>
          </button>
        ))}
        <div className="shrink-0 w-2 md:w-6" />
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
