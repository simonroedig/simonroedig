import { HeroRadio } from "./HeroRadio";
import { PortraitCard } from "./PortraitCard";
import { SpeakerGrille } from "./SpeakerGrille";
import { IconArrowDown, IconGithub, IconLinkedIn, IconMail, IconYoutube } from "./icons";
import { thock } from "@/lib/sound";

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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/simonroedig/", Icon: IconLinkedIn },
  { label: "GitHub", href: "https://github.com/simonroedig", Icon: IconGithub },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCisvFnG8YWMEamSpQ3NiKew",
    Icon: IconYoutube,
  },
  { label: "Email", href: "mailto:simonroedig@web.de", Icon: IconMail },
];

const scrollToSection = (id: string) => {
  thock();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function HeroSection() {
  const age = calculateAge(new Date("1999-06-25"));

  return (
    <section
      id="top"
      className="snap-start relative flex min-h-[100svh] w-full overflow-x-hidden px-5 pt-10 pb-14 sm:px-8 md:px-12 lg:h-[100svh] lg:overflow-hidden lg:py-0"
    >
      <div className="hero-grid mx-auto w-full max-w-7xl content-center gap-x-14 gap-y-10 lg:gap-y-8">
        {/* Intro */}
        <div className="[grid-area:intro] lg:self-end">
          <div
            className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.24em] text-ink-soft animate-rise-in"
            style={{ animationDelay: "80ms" }}
          >
            Product Designer
            <span className="h-[3px] w-10 rounded-full press-xs" />
          </div>
          <h1
            className="mt-4 font-display text-[clamp(3.6rem,min(16vw,7.5rem),8.75rem)] lg:text-[clamp(3.6rem,9vw,8.75rem)] font-extrabold leading-[0.88] tracking-[-0.055em] text-ink-strong animate-rise-in [text-shadow:0_1px_0_var(--hl),0_0.05em_0.1em_var(--sd-soft)] md:mt-6"
            style={{ animationDelay: "160ms" }}
          >
            Simon
            <br />
            Rödig
          </h1>
          <p
            className="mt-5 font-display text-[clamp(1.6rem,3.1vw,2.6rem)] font-bold leading-tight tracking-[-0.03em] text-ink animate-rise-in md:mt-7"
            style={{ animationDelay: "260ms" }}
          >
            From concept to code.
          </p>
        </div>

        {/* Device stack */}
        <div className="flex justify-center [grid-area:stage] lg:justify-end">
          <div className="@container relative aspect-[100/102] w-full max-w-[600px] lg:aspect-[100/86] lg:max-w-[min(700px,calc((100svh-4rem)/0.86))]">
            <div
              className="absolute right-0 top-[56%] h-[26%] w-[40%] animate-pop-in lg:top-0 lg:h-[27%] lg:w-[45%]"
              style={{ animationDelay: "250ms" }}
            >
              <SpeakerGrille />
            </div>
            <div
              className="absolute right-0 top-0 w-[48%] animate-pop-in lg:right-[2%] lg:top-[14%] lg:w-[53%]"
              style={{ animationDelay: "380ms" }}
            >
              <PortraitCard age={age} />
            </div>
            <div
              className="absolute left-0 top-[4%] w-[60%] animate-pop-in lg:top-[2%] lg:w-[49%]"
              style={{ animationDelay: "520ms" }}
            >
              <HeroRadio />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="[grid-area:body] lg:self-start">
          <p
            className="max-w-xl text-base font-medium leading-relaxed text-ink-soft animate-rise-in md:text-lg"
            style={{ animationDelay: "380ms" }}
          >
            I design new products end to end — from research and first concepts through interaction
            and UI design to prototypes and implementation. Being a developer as well, I can judge
            feasibility early, speak engineering&rsquo;s language and use AI where it genuinely
            speeds up the process.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-5 animate-rise-in md:mt-10"
            style={{ animationDelay: "480ms" }}
          >
            <div className="flex gap-4">
              {[
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => scrollToSection(b.id)}
                  className="key group flex h-12 items-center gap-2.5 rounded-2xl px-5 text-sm font-bold text-ink cursor-pointer md:h-14 md:px-6"
                >
                  {b.label}
                  <IconArrowDown
                    size={16}
                    className="text-ink-faint transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-y-0.5"
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  onClick={() => thock()}
                  className="key flex h-12 w-12 items-center justify-center rounded-2xl text-ink-soft hover:text-ink md:h-14 md:w-14"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
