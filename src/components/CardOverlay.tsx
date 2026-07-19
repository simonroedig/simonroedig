import { useEffect } from "react";
import type { RichContentBlock } from "@/data/projects";

const contentWrapper = "mx-auto w-full max-w-4xl flex flex-col gap-8 text-center text-base md:text-lg leading-relaxed text-ink text-pretty";

const imageSizeClasses = {
  xxsmall: "max-w-[12rem]",
  xsmall: "max-w-xs",
  small: "max-w-lg",
  large: "max-w-5xl",
  xlarge: "max-w-6xl",
} as const;

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  meta: string;
  color: string;
  description: string;
  image?: string;
  richContent?: RichContentBlock[];
};

export function CardOverlay({ open, onClose, title, meta, color, description, image, richContent }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-12 bg-ink/70"
      onClick={onClose}
    >
      <div
        className="relative w-[95vw] h-[95dvh] max-w-[1600px] flex flex-col bg-paper border-4 border-ink animate-overlay-in overflow-hidden"
        style={{ boxShadow: `16px 16px 0px 0px ${color}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 md:px-6 py-3 border-b-4 border-ink"
          style={{ backgroundColor: color }}
        >
          <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-ink">
            {meta}
          </span>
          <button
            onClick={onClose}
            className="group relative flex items-center gap-2 bg-paper border-2 border-ink px-3 md:px-4 py-1 md:py-1.5 font-mono text-xs md:text-sm font-bold uppercase text-ink transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--color-ink)] active:translate-y-0 active:shadow-none cursor-pointer"
            aria-label="Close"
          >
            <span>Close</span>
            <span className="inline-block transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-125">
              ✕
            </span>
          </button>
        </div>

        <div className="flex-1 min-h-0 p-4 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 md:gap-10 overflow-y-auto md:overflow-hidden">
          {richContent ? (
             <div className="md:col-span-5 flex flex-col min-h-0">
               <div className="flex-1 md:overflow-y-auto md:pr-6 flex flex-col">
                 <div className="my-auto w-full flex flex-col items-center justify-center py-4">
                   <h3 className="font-display text-3xl sm:text-4xl md:text-6xl leading-[0.95] italic text-ink mb-6 shrink-0 text-center w-full">
                     {title}
                   </h3>
                   <div className={`${contentWrapper} items-center`}>
                    {richContent.map((block, idx) => {
                      if (block.type === 'text') {
                        return (
                          <p key={idx} className="whitespace-pre-wrap">
                            {block.content}
                          </p>
                        );
                      }
                      if (block.type === 'image') {
                       const sizeClass = block.size ? imageSizeClasses[block.size] : "max-w-4xl";
                       const imageClassName = block.noBorder
                         ? `w-full ${sizeClass} mx-auto h-auto object-cover`
                         : `w-full ${sizeClass} mx-auto h-auto border-4 border-ink object-cover`;

                        return (
                         <img key={idx} src={block.src} alt={block.alt || title} className={imageClassName} />
                        );
                      }
                      if (block.type === 'video') {
                        return (
                          <div key={idx} className="w-full max-w-4xl mx-auto aspect-video border-4 border-ink overflow-hidden shrink-0">
                            <iframe width="100%" height="100%" src={block.url} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                          </div>
                        );
                      }
                      if (block.type === 'link' || block.type === 'pdf') {
                        return (
                          <a key={idx} href={block.url} target="_blank" rel="noopener noreferrer" className="mx-auto inline-block px-4 py-2 bg-ink text-paper font-mono text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-200 border-2 border-transparent hover:border-ink hover:bg-paper hover:text-ink hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--color-ink)] active:translate-y-0 active:shadow-none">
                            {block.text || block.url}
                          </a>
                        );
                      }
                      return null;
                    })}
                   </div>
                 </div>
               </div>
             </div>
          ) : (
            <>
              <div className={`${image ? "md:col-span-3 order-2 md:order-1" : "md:col-span-5"} flex flex-col min-h-0`}>
                <div className="flex-1 md:overflow-y-auto md:pr-6 flex flex-col">
                  <div className="my-auto w-full flex flex-col py-4">
                    <h3 className="font-display text-3xl sm:text-4xl md:text-6xl leading-[0.95] italic text-ink mb-4 sm:mb-6 shrink-0 text-center w-full">
                      {title}
                    </h3>
                    <div className={contentWrapper}>
                      {description.split('\n\n').map((paragraph, idx) => {
                        if (paragraph.trim() === 'Patent') {
                          return (
                            <div key={idx} className="mx-auto inline-flex items-center gap-2 bg-accent text-paper px-4 py-2 border-4 border-ink font-mono text-sm md:text-base font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_var(--color-ink)]">
                              <span className="text-sm md:text-base">★</span>
                              <span>Patent</span>
                            </div>
                          );
                        }
                        if (paragraph.trim() === 'Patenting Next-Generation Cooktop UI') {
                          return (
                            <h4 key={idx} className="font-display text-2xl md:text-3xl italic text-ink leading-tight">
                              {paragraph}
                            </h4>
                          );
                        }
                        if (paragraph.trim().startsWith('Disclaimer:')) {
                          return (
                            <p key={idx} className="text-sm md:text-base italic text-ink/80 font-serif">
                              {paragraph}
                            </p>
                          );
                        }
                        return (
                          <p key={idx} className="whitespace-pre-wrap">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {image && (
                <div className="md:col-span-2 flex flex-col order-1 md:order-2 mb-4 md:mb-0">
                  <div className="my-auto w-full">
                    <div
                      className="w-full aspect-video border-4 border-ink grid place-items-center overflow-hidden shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      <img src={image} alt={title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
