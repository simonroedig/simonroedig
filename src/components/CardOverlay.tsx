import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  meta: string;
  color: string;
  description: string;
};

export function CardOverlay({ open, onClose, title, meta, color, description }: Props) {
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
        className="relative w-full max-w-4xl max-h-[92svh] overflow-y-auto bg-paper border-4 border-ink animate-overlay-in"

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

        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10">
          <div className="md:col-span-3 space-y-6">
            <h3 className="font-display text-4xl md:text-6xl leading-[0.95] italic text-ink">
              {title}
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-ink text-pretty">
              {description}
            </p>
          </div>
          <div className="md:col-span-2">
            <div
              className="w-full aspect-[4/5] border-4 border-ink grid place-items-center"
              style={{ backgroundColor: color }}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60">
                IMG // {meta}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
