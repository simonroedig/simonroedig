import { useLayoutEffect, useRef, useState } from "react";
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

// Desktop device stack, relative to the radio's width R: how much of the
// speaker peeks out to the right, and its size and position.
const SPEAKER_VISIBLE = 0.42;
const SPEAKER_WIDTH = 0.72;

type Stage = { width: number; height: number; radio: number; offset: number };

/**
 * On desktop, sizes the radio so it is exactly as tall as the text column
 * (from "Product Designer" down to the bottom of the buttons).
 */
function useStageFit() {
  const introRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const radioRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage | null>(null);

  useLayoutEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const fit = () => {
      const intro = introRef.current;
      const body = bodyRef.current;
      const column = columnRef.current;
      const radio = radioRef.current;
      if (!desktop.matches || !intro || !body || !column || !radio || !radio.offsetWidth) {
        setStage(null);
        return;
      }
      const textHeight = body.getBoundingClientRect().bottom - intro.getBoundingClientRect().top;
      const ratio = radio.offsetHeight / radio.offsetWidth;
      const maxRadio = column.clientWidth / (1 + SPEAKER_VISIBLE);
      const radioWidth = Math.min(textHeight / ratio, maxRadio);
      const next = {
        radio: Math.round(radioWidth),
        width: Math.round(radioWidth * (1 + SPEAKER_VISIBLE)),
        height: Math.round(radioWidth * ratio),
        // when the column is too narrow for full height, centre it on the text instead
        offset: Math.max(0, Math.round((textHeight - radioWidth * ratio) / 2)),
      };
      setStage((prev) =>
        prev &&
        Math.abs(prev.radio - next.radio) < 1 &&
        Math.abs(prev.height - next.height) < 1 &&
        prev.offset === next.offset
          ? prev
          : next,
      );
    };
    fit();
    const ro = new ResizeObserver(fit);
    [introRef, bodyRef, columnRef, radioRef].forEach((r) => r.current && ro.observe(r.current));
    desktop.addEventListener("change", fit);
    return () => {
      ro.disconnect();
      desktop.removeEventListener("change", fit);
    };
  }, []);

  return { introRef, bodyRef, columnRef, radioRef, stage };
}

const scrollToSection = (id: string) => {
  thock();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function HeroSection() {
  const age = calculateAge(new Date("1999-06-25"));
  const { introRef, bodyRef, columnRef, radioRef, stage } = useStageFit();

  return (
    <section
      id="top"
      className="snap-start relative flex min-h-[100svh] w-full overflow-x-hidden px-5 pt-10 pb-14 sm:px-8 md:px-12 lg:h-[100svh] lg:overflow-hidden lg:py-0"
    >
      <div className="hero-grid mx-auto w-full max-w-7xl content-center gap-x-16 gap-y-10 lg:gap-y-9">
        {/* Intro: portrait + name */}
        <div ref={introRef} className="[grid-area:intro] lg:self-end">
          <div
            className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.24em] text-ink-soft animate-rise-in"
            style={{ animationDelay: "80ms" }}
          >
            Product Designer
            <span className="press-xs h-[3px] w-10 rounded-full" />
          </div>

          <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-6 sm:gap-x-7 md:mt-8 lg:gap-x-9">
            <div
              className="w-[6.75rem] animate-pop-in sm:w-[8.5rem] md:row-span-2 md:w-[11rem] lg:w-[min(14rem,16vw)]"
              style={{ animationDelay: "200ms" }}
            >
              <PortraitCard age={age} />
            </div>
            <h1
              className="font-display text-[clamp(3rem,14vw,4.6rem)] font-extrabold leading-[0.88] tracking-[-0.055em] text-ink-strong animate-rise-in [text-shadow:0_1px_0_var(--hl),0_0.05em_0.1em_var(--sd-soft)] sm:text-[5.25rem] md:self-end md:text-[6rem] lg:text-[clamp(4.5rem,7.2vw,7.5rem)]"
              style={{ animationDelay: "160ms" }}
            >
              Simon
              <br />
              Rödig
            </h1>
            <p
              className="col-span-2 font-display text-[clamp(1.6rem,6.5vw,2rem)] font-bold leading-tight tracking-[-0.03em] text-ink animate-rise-in md:col-span-1 md:col-start-2 md:self-start md:text-[2.1rem] lg:text-[clamp(1.75rem,2.6vw,2.4rem)]"
              style={{ animationDelay: "260ms" }}
            >
              From idea to product.
            </p>
          </div>
        </div>

        {/* Body */}
        <div ref={bodyRef} className="[grid-area:body] lg:self-start">
          <p
            className="max-w-xl text-base font-medium leading-relaxed text-ink-soft animate-rise-in md:text-lg"
            style={{ animationDelay: "380ms" }}
          >
            I take new products from the first idea to the finished implementation: research and
            concepts, prototypes and user studies, refined through UX and UI iterations. Being a
            developer as well, I can judge feasibility early, speak engineering&rsquo;s language and
            use AI where it genuinely speeds up the process.
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

        {/* Devices: radio in front of its speaker */}
        <div
          ref={columnRef}
          className="flex justify-center [grid-area:stage] lg:items-start lg:justify-end"
        >
          <div
            className="@container relative aspect-[100/120] w-full max-w-[560px] sm:aspect-[100/104] lg:max-w-[min(600px,calc((100svh-5rem)/1.04))]"
            style={
              stage
                ? {
                    width: stage.width,
                    height: stage.height,
                    marginTop: stage.offset,
                    maxWidth: "none",
                    aspectRatio: "auto",
                  }
                : undefined
            }
          >
            <div
              className="absolute right-0 top-[9%] h-[76%] w-[38%] animate-pop-in sm:w-[48%]"
              style={{
                animationDelay: "300ms",
                ...(stage && {
                  width: stage.radio * SPEAKER_WIDTH,
                  top: "12%",
                  height: "72%",
                }),
              }}
            >
              <SpeakerGrille />
            </div>
            <div
              ref={radioRef}
              className="absolute left-0 top-0 w-[72%] animate-pop-in sm:w-[64%]"
              style={{ animationDelay: "450ms", ...(stage && { width: stage.radio }) }}
            >
              <HeroRadio />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
