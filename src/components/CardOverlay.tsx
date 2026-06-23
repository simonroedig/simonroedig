import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  meta: string;
  color: string;
  description: string;
  image?: string;
};

export function CardOverlay({ open, onClose, title, meta, color, description, image }: Props) {
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
        className="relative w-full max-w-4xl h-[85svh] md:h-[600px] flex flex-col bg-paper border-4 border-ink animate-overlay-in overflow-hidden"
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
            className="font-mono text-base md:text-lg font-bold text-ink hover:text-accent transition-colors cursor-pointer"
            aria-label="Close"
          >
            CLOSE [✕]
          </button>
        </div>

        <div className="flex-1 min-h-0 p-6 md:p-10 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 overflow-y-auto md:overflow-hidden">
          <div className={`${image ? "md:col-span-3" : "md:col-span-5"} flex flex-col min-h-0`}>
            <h3 className="font-display text-4xl md:text-6xl leading-[0.95] italic text-ink mb-6 shrink-0">
              {title}
            </h3>
            <div className="flex-1 md:overflow-y-auto md:pr-6 text-base md:text-lg leading-relaxed text-ink text-pretty styled-scrollbar space-y-4 md:space-y-6">
              {description.split('\n\n').map((paragraph, idx) => {
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
          {image && (
            <div className="md:col-span-2">
              <div
                className="w-full aspect-video border-4 border-ink grid place-items-center overflow-hidden shrink-0"
                style={{ backgroundColor: color }}
              >
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
