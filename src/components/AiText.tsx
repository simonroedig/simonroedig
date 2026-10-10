import { useEffect, useRef, useState } from "react";

export type CaptionKind = "plain" | "ai" | "final";

type Props = {
  /** Changes whenever a new caption should take over. */
  id: string;
  text: string;
  kind: CaptionKind;
  /** Words to underline with the marker in the closing line. */
  highlight?: string[];
};

type Item = Props;

/**
 * Caption that blurs out while the next one blurs in. Every word is laid out
 * from the start (just invisible), so line breaks never jump while the text
 * appears. Both layers keep their React keys, so a caption that is fading
 * out never restarts its own entrance animation.
 */
export function CaptionFade(props: Props) {
  const { id } = props;
  const [leaving, setLeaving] = useState<Item | null>(null);
  const shown = useRef<Item>(props);
  const latest = useRef<Item>(props);
  latest.current = props;

  useEffect(() => {
    if (shown.current.id === id) return;
    setLeaving(shown.current);
    shown.current = latest.current;
    const t = window.setTimeout(() => setLeaving(null), 450);
    return () => clearTimeout(t);
  }, [id]);

  return (
    <span className="relative block h-full w-full" aria-hidden="true">
      {leaving && leaving.id !== id && (
        <span key={leaving.id} className="absolute inset-x-0 top-0 animate-caption-out">
          <Caption {...leaving} />
        </span>
      )}
      <span key={id} className="absolute inset-x-0 top-0">
        <Caption {...props} />
      </span>
    </span>
  );
}

const ENTER_DELAY = 140; // let the outgoing caption start fading first

function Caption({ text, kind, highlight = [] }: Item) {
  if (kind === "plain") {
    return (
      <span className="inline-block animate-word-in" style={{ animationDelay: `${ENTER_DELAY}ms` }}>
        {text}
      </span>
    );
  }

  const step = kind === "final" ? 85 : 55;
  const words = text.split(" ");
  const wordsDone = ENTER_DELAY + words.length * step + 400;
  const marked = new Set(highlight);
  const markedIdx = words.flatMap((w, i) => (marked.has(w) ? [i] : []));
  const firstMarked = markedIdx[0] ?? 0;
  const lastMarked = markedIdx[markedIdx.length - 1] ?? -1;

  return (
    <span className={kind === "final" ? "font-extrabold text-ink-strong" : "font-bold text-ai-ink"}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        // the closing sentence's own period keeps blinking, like a status light
        const blinkingDot = kind === "final" && isLast && word.endsWith(".");
        const body = blinkingDot ? word.slice(0, -1) : word;
        const mark = kind === "final" && marked.has(word);
        return (
          <span key={i}>
            <span
              className="relative inline-block animate-word-in"
              style={{ animationDelay: `${ENTER_DELAY + i * step}ms` }}
            >
              {body}
              {blinkingDot && (
                <span
                  className="text-ai"
                  style={{
                    animation: `dot-blink 1.1s ease-in-out ${wordsDone}ms infinite`,
                  }}
                >
                  .
                </span>
              )}
              {mark && (
                <span
                  className="absolute -bottom-[0.06em] left-0 h-[0.14em] origin-left rounded-full bg-ai"
                  style={{
                    // bridge the space to the next marked word so the stroke reads as one line
                    right: i < lastMarked ? "-0.3em" : 0,
                    transform: "scaleX(0)",
                    animation: `marker-draw 0.35s var(--ease-soft) ${wordsDone + (i - firstMarked) * 160}ms forwards`,
                  }}
                />
              )}
            </span>{" "}
          </span>
        );
      })}
    </span>
  );
}
