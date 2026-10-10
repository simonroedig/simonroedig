import { useEffect } from "react";
import type { RichContentBlock } from "@/data/projects";

const contentWrapper =
  "mx-auto w-full max-w-4xl flex flex-col gap-8 text-center text-base md:text-lg leading-relaxed text-ink-soft text-pretty";

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

const linkClass =
  "neu-key mx-auto inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.12em] text-ink hover:text-accent-ink";

export function CardOverlay({
  open,
  onClose,
  title,
  meta,
  color,
  description,
  image,
  richContent,
}: Props) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 lg:p-14"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] backdrop-blur-xl animate-backdrop-in" />

      <div
        className="relative flex h-full w-full max-w-[1500px] flex-col overflow-hidden rounded-[2rem] bg-surface neu-raised-lg animate-overlay-in md:rounded-[2.75rem]"
        style={{ "--led": color } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-3 pt-3 pb-3 md:gap-8 md:px-6 md:pt-5 md:pb-4">
          <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-lcd px-4 py-2.5 neu-inset-sm md:px-5">
            <span className="led led-color" aria-hidden="true" />
            <span className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink-soft md:text-xs">
              {meta}
            </span>
          </div>
          <button
            onClick={onClose}
            className="neu-key group flex shrink-0 items-center gap-2.5 rounded-full py-2 pr-2 pl-4 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink-soft hover:text-ink cursor-pointer md:py-2.5 md:pr-2.5 md:pl-5 md:text-xs"
            aria-label="Close"
          >
            <span className="hidden sm:inline">Close</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full neu-inset-xs transition-colors group-hover:text-accent-ink md:h-8 md:w-8">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:rotate-90"
                aria-hidden="true"
              >
                <path
                  d="M1 1l8 8M9 1L1 9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="groove mx-5 shrink-0 md:mx-8" />

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto p-5 styled-scrollbar sm:gap-6 sm:p-7 md:grid-cols-5 md:gap-10 md:overflow-hidden md:p-10">
          {richContent ? (
            <div className="flex min-h-0 flex-col md:col-span-5">
              <div className="flex flex-1 flex-col styled-scrollbar md:overflow-y-auto md:px-4">
                <div className="my-auto flex w-full flex-col items-center justify-center py-4">
                  <h3 className="mb-8 w-full shrink-0 text-center font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] text-ink sm:text-5xl md:text-7xl">
                    {title}
                  </h3>
                  <div className={`${contentWrapper} items-center`}>
                    {richContent.map((block, idx) => {
                      if (block.type === "text") {
                        return (
                          <p key={idx} className="whitespace-pre-wrap">
                            {block.content}
                          </p>
                        );
                      }
                      if (block.type === "image") {
                        const sizeClass = block.size ? imageSizeClasses[block.size] : "max-w-4xl";
                        if (block.noBorder) {
                          return (
                            <img
                              key={idx}
                              src={block.src}
                              alt={block.alt || title}
                              loading="lazy"
                              className={`mx-auto h-auto w-full ${sizeClass} object-cover`}
                            />
                          );
                        }
                        return (
                          <div
                            key={idx}
                            className={`mx-auto w-full ${sizeClass} rounded-[1.5rem] p-2 neu-inset-sm md:rounded-[1.9rem] md:p-3`}
                          >
                            <img
                              src={block.src}
                              alt={block.alt || title}
                              loading="lazy"
                              className="h-auto w-full rounded-[1.05rem] object-cover md:rounded-[1.3rem]"
                            />
                          </div>
                        );
                      }
                      if (block.type === "video") {
                        return (
                          <div
                            key={idx}
                            className="mx-auto w-full max-w-4xl shrink-0 rounded-[1.5rem] p-2 neu-inset-sm md:rounded-[1.9rem] md:p-3"
                          >
                            <div className="aspect-video w-full overflow-hidden rounded-[1.05rem] md:rounded-[1.3rem]">
                              <iframe
                                width="100%"
                                height="100%"
                                src={block.url}
                                title={title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>
                        );
                      }
                      if (block.type === "link" || block.type === "pdf") {
                        return (
                          <a
                            key={idx}
                            href={block.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                          >
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
              <div
                className={`${image ? "order-2 md:order-1 md:col-span-3" : "md:col-span-5"} flex min-h-0 flex-col`}
              >
                <div className="flex flex-1 flex-col styled-scrollbar md:overflow-y-auto md:px-4">
                  <div className="my-auto flex w-full flex-col py-4">
                    <h3 className="mb-6 w-full shrink-0 text-center font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] text-ink sm:mb-8 sm:text-5xl md:text-7xl">
                      {title}
                    </h3>
                    <div className={contentWrapper}>
                      {description.split("\n\n").map((paragraph, idx) => {
                        if (paragraph.trim() === "Patent") {
                          return (
                            <div
                              key={idx}
                              className="mx-auto inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-[0.15em] text-accent-ink neu-raised-sm md:text-base"
                            >
                              <span className="led led-on" />
                              <span aria-hidden="true">★</span>
                              <span>Patent</span>
                            </div>
                          );
                        }
                        if (paragraph.trim() === "Patenting Next-Generation Cooktop UI") {
                          return (
                            <h4
                              key={idx}
                              className="font-display text-2xl font-bold leading-tight tracking-[-0.03em] text-ink md:text-3xl"
                            >
                              {paragraph}
                            </h4>
                          );
                        }
                        if (paragraph.trim().startsWith("Disclaimer:")) {
                          return (
                            <p
                              key={idx}
                              className="mx-auto rounded-2xl px-5 py-4 text-sm italic text-ink-faint neu-inset-xs md:text-base"
                            >
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
                <div className="order-1 mb-4 flex flex-col md:order-2 md:col-span-2 md:mb-0">
                  <div className="my-auto w-full rounded-[1.5rem] p-2 neu-inset-sm md:rounded-[1.9rem] md:p-3">
                    <div
                      className="grid aspect-video w-full shrink-0 place-items-center overflow-hidden rounded-[1.05rem] md:rounded-[1.3rem]"
                      style={{ backgroundColor: color }}
                    >
                      <img src={image} alt={title} className="h-full w-full object-cover" />
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
