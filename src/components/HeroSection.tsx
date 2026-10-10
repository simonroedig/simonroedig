import { TuningDial } from "./TuningDial";
import { ThemeSwitch } from "./ThemeSwitch";

const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/simonroedig/" },
  { label: "Github", href: "https://github.com/simonroedig" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCisvFnG8YWMEamSpQ3NiKew" },
];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function HeroSection() {
  const age = calculateAge(new Date("1999-06-25"));

  return (
    <section
      id="top"
      className="snap-start relative flex min-h-[100svh] w-full flex-col gap-4 overflow-x-hidden px-4 pt-4 pb-6 sm:px-6 md:px-10 md:pt-6 lg:h-[100svh] lg:overflow-hidden"
    >
      {/* Top bar */}
      <header
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-3 gap-y-4 animate-rise-in"
        style={{ animationDelay: "50ms" }}
      >
        <div className="order-1 flex items-center gap-3">
          <span className="led led-on animate-led-breathe" />
          <span className="font-display text-base font-bold tracking-tight text-ink md:text-lg">
            simon rödig
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint lg:inline">
            Portfolio ’26
          </span>
        </div>

        <nav className="order-3 flex w-full items-center justify-center gap-2.5 md:order-2 md:mr-2 md:ml-auto md:w-auto lg:mr-3 lg:gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="neu-key rounded-full px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink-soft hover:text-ink lg:px-5 lg:py-2.5 lg:text-xs"
            >
              {s.label}
            </a>
          ))}
          <a
            href="mailto:simonroedig@web.de"
            className="neu-key flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-accent-ink lg:px-5 lg:py-2.5 lg:text-xs"
          >
            <span className="led led-on h-1.5! w-1.5!" />
            Email
          </a>
        </nav>

        <div className="order-2 md:order-3">
          <ThemeSwitch />
        </div>
      </header>

      {/* Main */}
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-center py-2 lg:py-0">
        <div className="grid h-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Text */}
          <div className="order-2 flex flex-col gap-5 md:gap-8 lg:order-1 lg:col-span-7 [@media(max-height:820px)]:gap-5">
            <h1
              className="font-display font-bold leading-[0.86] tracking-[-0.055em] text-[clamp(3.4rem,min(12vw,17vh),10.5rem)] animate-rise-in"
              style={{ animationDelay: "150ms" }}
            >
              <span className="text-emboss block">Simon</span>
              <span className="block text-ink [text-shadow:0.03em_0.03em_0.06em_var(--sh-d),-0.02em_-0.02em_0.04em_var(--sh-l)]">
                Rödig
              </span>
            </h1>

            <div className="flex flex-col gap-3 md:gap-4">
              <p
                className="font-display text-[1.45rem] font-semibold leading-tight tracking-tight text-ink sm:text-3xl xl:text-[2.6rem] animate-rise-in"
                style={{ animationDelay: "350ms" }}
              >
                Human-Centric Design
              </p>
              <div className="animate-rise-in" style={{ animationDelay: "500ms" }}>
                <span
                  className="inline-flex items-center gap-3 rounded-2xl bg-surface px-4 py-2 font-display text-[1.45rem] font-semibold leading-tight tracking-tight text-accent-ink sm:text-3xl xl:text-[2.6rem] animate-key-press md:rounded-3xl md:px-6 md:py-3"
                  style={{ animationDelay: "700ms" }}
                >
                  <span className="led led-on" />
                  Accelerated by AI.
                </span>
              </div>
            </div>

            <div
              className="flex max-w-xl gap-4 animate-rise-in"
              style={{ animationDelay: "800ms" }}
            >
              <div className="relative w-1.5 shrink-0 rounded-full bg-surface neu-inset-xs">
                <div className="absolute inset-x-0 top-0 h-2/5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
              </div>
              <p className="text-sm font-medium leading-relaxed text-ink-soft md:text-lg">
                UX / Product Designer with the toolkit of a developer. I turn concepts into working
                prototypes, using code and AI to accelerate design, validate ideas, and build better
                products.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-3 md:gap-4 animate-rise-in"
              style={{ animationDelay: "950ms" }}
            >
              {[
                { id: "experience", n: "01", label: "Experience" },
                { id: "projects", n: "02", label: "Projects" },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => scrollToSection(b.id)}
                  className="neu-key group flex items-center gap-3 rounded-full py-2.5 pl-3 pr-5 cursor-pointer md:py-3 md:pl-3.5 md:pr-6"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] font-bold text-ink-faint neu-inset-xs transition-colors group-hover:text-accent-ink md:h-8 md:w-8">
                    {b.n}
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink md:text-xs">
                    {b.label}
                  </span>
                  <span
                    className="text-ink-faint transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Device */}
          <div
            className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end animate-rise-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative flex w-fit flex-col gap-4 rounded-[2.5rem] bg-surface p-5 [--dial:min(74vw,320px)] neu-raised-lg sm:[--dial:340px] md:gap-5 md:rounded-[3rem] md:p-7 lg:[--dial:min(400px,47vh)]">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="led led-on animate-led-breathe" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-ink-faint text-engrave">
                    On · Tuner
                  </span>
                </div>
                <span className="font-display text-xs font-bold tracking-[0.12em] text-ink-faint text-engrave">
                  SR 26
                </span>
              </div>
              <TuningDial age={age} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 mx-auto hidden w-full max-w-7xl items-center gap-3 lg:flex">
        <div className="relative flex h-9 w-5 justify-center rounded-full bg-surface neu-inset-xs">
          <span className="led led-on mt-[13px] h-1.5! w-1.5! animate-scroll-dot" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
          Scroll
        </span>
      </div>
    </section>
  );
}
