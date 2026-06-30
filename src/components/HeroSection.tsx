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
    <section className="snap-start h-[100svh] w-full relative flex flex-col border-b-4 border-ink p-4 sm:p-6 md:p-10 gap-3 sm:gap-8 overflow-hidden">
      {/* Top bar */}
      <div className="flex justify-center md:justify-end items-start shrink-0 w-full mb-2">
        <div className="flex flex-wrap justify-center gap-1 md:gap-3 font-mono text-[11px] md:text-sm uppercase font-bold items-center">
          <a href="https://www.linkedin.com/in/simonroedig/" target="_blank" rel="noreferrer" className="px-2 md:px-3 py-1.5 md:py-2 border-2 border-transparent hover:border-ink hover:bg-paper transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--color-ink)] text-ink">LinkedIn</a>
          <a href="https://github.com/simonroedig" target="_blank" rel="noreferrer" className="px-2 md:px-3 py-1.5 md:py-2 border-2 border-transparent hover:border-ink hover:bg-paper transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--color-ink)] text-ink">Github</a>
          <a href="https://www.youtube.com/channel/UCisvFnG8YWMEamSpQ3NiKew" target="_blank" rel="noreferrer" className="px-2 md:px-3 py-1.5 md:py-2 border-2 border-transparent hover:border-ink hover:bg-paper transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--color-ink)] text-ink">YouTube</a>
          <a href="mailto:simonroedig@web.de" className="px-2 md:px-3 py-1.5 md:py-2 border-2 border-ink bg-ink text-paper transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--color-accent)]">Email</a>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto py-2 lg:py-0 relative z-10 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-center h-full">
          
          {/* Text Section */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-6 md:gap-10 order-2 lg:order-1 animate-brutal-in shrink-0">
            <h1 className="font-display text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] italic -tracking-[0.05em] text-ink drop-shadow-sm">
              Simon
              <br />
              Rödig
            </h1>

            <div className="flex flex-col gap-3 md:gap-5">
              <p className="text-[1.35rem] sm:text-3xl lg:text-5xl font-bold tracking-tight text-ink max-w-2xl leading-tight">
                <span className="whitespace-nowrap">Human-Centric Design</span>
                <br />
                <span className="text-accent italic font-display bg-ink text-paper px-2 md:px-2 md:py-1 inline-block mt-1.5 md:mt-3 -rotate-1">Accelerated by AI.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-6 mt-1 md:mt-2 xl:items-start items-start">
                <p className="max-w-md text-sm md:text-lg border-l-[4px] md:border-l-[6px] border-ink pl-3 md:pl-4 text-ink font-medium leading-snug md:leading-relaxed">
                  UX / Product Designer with the toolkit of a developer. I move from concept to working
                  prototype, and integrate AI where it actually serves the user.
                </p>
                
                <div className="border-2 border-ink bg-ink text-paper px-3 py-2 md:px-4 md:py-3 brutal-shadow-sm font-mono text-[10px] sm:text-xs uppercase shrink-0 flex flex-col justify-center w-fit transform rotate-1 hover:rotate-0 transition-transform">
                  <span className="font-bold tracking-widest text-paper/70 mb-0.5 md:mb-1">Notable</span>
                  <span className="tracking-tighter font-extrabold text-xs md:text-sm whitespace-nowrap text-paper">Patent · BSH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 animate-brutal-in min-h-0" style={{ animationDelay: '150ms' }}>
            <div 
              className="relative w-auto h-[28vh] sm:h-[35vh] lg:h-auto lg:w-full lg:max-w-[460px] aspect-[4/5] border-2 md:border-4 border-ink bg-ink group user-select-none shrink-0"
              style={{ boxShadow: `-8px 8px 0px 0px var(--color-ink)` }}
            >
              {/* Added a decorative element to make the image area pop */}
              <div className="absolute -inset-2 md:-inset-4 border-2 border-ink -z-10 translate-x-[8px] md:translate-x-[12px] -translate-y-[8px] md:-translate-y-[12px] opacity-20"></div>
              
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={simonPortrait}
                  alt="Portrait of Simon Rödig"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Conservative age pop-up */}
                <div 
                  className="absolute bottom-4 right-4 md:bottom-6 md:right-6 border-2 border-ink bg-paper px-3 py-1.5 md:py-2 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-20 pointer-events-none"
                  style={{ boxShadow: `4px 4px 0px 0px var(--color-ink)` }}
                >
                  <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-ink whitespace-nowrap">
                    <span className="text-ink/60 mr-2">AGE</span>{age}
                  </span>
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
