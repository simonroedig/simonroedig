import simonPortrait from "@/assets/simon.png";

export function HeroSection() {
  return (
    <section className="md:snap-start min-h-[100svh] w-full relative flex flex-col border-b-4 border-ink p-4 sm:p-6 md:p-10 gap-6 md:gap-4 overflow-hidden">
      {/* Top bar */}
      <div className="flex flex-wrap justify-between items-start gap-3">
        <div className="font-mono text-[10px] md:text-xs border-2 border-ink px-2 md:px-3 py-1.5 md:py-2 bg-paper brutal-shadow-sm uppercase tracking-widest">
          50.11° N · 8.68° E / GERMANY
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 md:gap-5 font-mono text-[10px] md:text-xs text-right uppercase justify-end">
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-accent underline underline-offset-4 decoration-2">LinkedIn</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-accent underline underline-offset-4 decoration-2">Github</a>
          <a href="https://youtube.com/" target="_blank" rel="noreferrer" className="hover:text-accent underline underline-offset-4 decoration-2">YouTube</a>
          <a href="mailto:hello@example.com" className="hover:text-accent underline underline-offset-4 decoration-2">Email</a>
        </div>
      </div>

      {/* Name + photo */}
      <div className="relative animate-brutal-in flex-1 flex flex-col lg:flex-row lg:items-center lg:gap-8 justify-center min-h-0">
        <h1 className="font-display text-[clamp(3rem,15vw,11rem)] leading-[0.85] italic -tracking-[0.04em] text-ink min-w-0 flex-1">
          Simon
          <br />
          Rödig
        </h1>

        {/* Photo block - desktop inline */}
        <div
          className="hidden lg:block shrink-0 w-[22vw] max-w-[280px] aspect-[4/5] border-4 border-ink bg-ink"
          style={{ boxShadow: `14px 14px 0px 0px var(--color-accent)` }}
        >
          <img
            src={simonPortrait}
            alt="Portrait of Simon Rödig"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Bottom: slogan + bio + patent */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end">
        <div className="md:col-span-7 min-w-0">
          <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-balance mb-3 text-ink">
            Human-Centric Design{" "}
            <span className="text-accent italic font-display">Accelerated by AI</span>.
          </p>
          <p className="max-w-xl text-sm md:text-base leading-snug border-l-4 border-ink pl-3 md:pl-4 py-1 text-ink">
            UX / Product Designer with the toolkit of a developer. I move from concept to working
            prototype, and integrate AI where it actually serves the user.
          </p>
        </div>
        <div className="md:col-span-5 flex flex-col gap-2 md:items-end min-w-0">
          <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
            Notable
          </div>
          <div className="border-2 border-ink bg-accent text-accent-foreground px-3 py-2 brutal-shadow-sm font-mono text-[10px] sm:text-xs uppercase tracking-tighter inline-block">
            Patent · BSH Hausgeräte
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest mt-2 text-muted-foreground">
            <div className="w-12 h-px bg-ink"></div>
            SCROLL_
          </div>
        </div>
      </div>
    </section>
  );
}
