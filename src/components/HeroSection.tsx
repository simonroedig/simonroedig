import simonPortrait from "@/assets/simon.png";

const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export function HeroSection() {
  const age = calculateAge(new Date('1999-06-25'));

  return (
    <section className="md:snap-start min-h-[100svh] w-full relative flex flex-col border-b-4 border-ink p-4 sm:p-6 md:p-10 gap-8 overflow-hidden">
      {/* Top bar */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div className="font-mono text-[10px] md:text-xs border-2 border-ink px-2 md:px-3 py-1.5 md:py-2 bg-paper brutal-shadow-sm uppercase tracking-widest font-bold">
          50.11° N · 8.68° E / GERMANY
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 md:gap-6 font-mono text-[10px] md:text-xs text-right uppercase justify-end font-bold items-center text-ink/70">
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-accent hover:border-accent border-b-2 border-transparent transition-colors pb-0.5">LinkedIn</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-accent hover:border-accent border-b-2 border-transparent transition-colors pb-0.5">Github</a>
          <a href="https://youtube.com/" target="_blank" rel="noreferrer" className="hover:text-accent hover:border-accent border-b-2 border-transparent transition-colors pb-0.5">YouTube</a>
          <a href="mailto:hello@example.com" className="hover:text-accent hover:border-accent border-b-2 border-transparent transition-colors pb-0.5">Email</a>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto py-8 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Text Section */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-10 order-2 lg:order-1 animate-brutal-in">
            <h1 className="font-display text-[clamp(4.5rem,12vw,10rem)] leading-[0.85] italic -tracking-[0.05em] text-ink drop-shadow-sm">
              Simon
              <br />
              Rödig
            </h1>

            <div className="flex flex-col gap-5">
              <p className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-balance text-ink max-w-2xl leading-tight">
                Human-Centric Design{" "}
                <br className="hidden md:block"/>
                <span className="text-accent italic font-display bg-ink text-paper px-2 py-1 inline-block mt-2 md:mt-3 -rotate-1">Accelerated by AI.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mt-2 xl:items-start items-start">
                <p className="max-w-md text-base md:text-lg border-l-[6px] border-accent pl-4 text-ink font-medium leading-relaxed">
                  UX / Product Designer with the toolkit of a developer. I move from concept to working
                  prototype, and integrate AI where it actually serves the user.
                </p>
                
                <div className="border-2 border-ink bg-accent text-accent-foreground px-4 py-3 brutal-shadow-sm font-mono text-[10px] sm:text-xs uppercase shrink-0 flex flex-col justify-center w-fit transform rotate-1 hover:rotate-0 transition-transform">
                  <span className="font-bold tracking-widest text-ink/70 mb-1">Notable</span>
                  <span className="tracking-tighter font-extrabold text-sm whitespace-nowrap">Patent · BSH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 animate-brutal-in" style={{ animationDelay: '150ms' }}>
            <div 
              className="relative w-[75vw] max-w-[320px] md:max-w-[380px] lg:w-full lg:max-w-[460px] aspect-[4/5] border-4 border-ink bg-ink group user-select-none"
              style={{ boxShadow: `-12px 12px 0px 0px var(--color-ink)` }}
            >
              {/* Added a decorative element to make the image area pop */}
              <div className="absolute -inset-4 border-2 border-ink -z-10 translate-x-[12px] -translate-y-[12px] opacity-20"></div>
              
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={simonPortrait}
                  alt="Portrait of Simon Rödig"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Age overlay on hover */}
                <div className="absolute inset-0 bg-accent/95 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <span className="font-mono text-ink text-xs md:text-sm font-bold tracking-widest uppercase mb-1">Current Status</span>
                  <span className="font-display text-[6rem] md:text-[8rem] leading-none text-ink -tracking-widest drop-shadow-sm italic">
                    {age}
                  </span>
                  <span className="font-mono text-ink text-lg md:text-xl font-bold tracking-[0.3em] uppercase mt-2">Years Old</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Bar: Scroll Indicator */}
      <div className="hidden lg:flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] font-bold text-ink/40 w-full max-w-6xl mx-auto mt-auto pb-2">
        <div className="w-12 h-[2px] bg-ink/40"></div>
        SCROLL_DOWN
      </div>
    </section>
  );
}
