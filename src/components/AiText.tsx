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
  const markedIdx = words.flatMap((w, idx) => (marked.has(w) ? [idx] : []));
  const first = kind === "final" && markedIdx.length ? markedIdx[0] : -1;
  const last = first >= 0 ? markedIdx[markedIdx.length - 1] : -1;

  const renderWord = (word: string, i: number) => {
    // the closing sentence's own period keeps blinking, like a status light
    const blinkingDot = kind === "final" && i === words.length - 1 && word.endsWith(".");
    return (
      <span
        key={i}
        className="inline-block animate-word-in"
        style={{ animationDelay: `${ENTER_DELAY + i * step}ms` }}
      >
        {blinkingDot ? word.slice(0, -1) : word}
        {blinkingDot && (
          <span
            className="text-ai-ink"
            style={{ animation: `dot-blink 1.1s ease-in-out ${wordsDone}ms infinite` }}
          >
            .
          </span>
        )}
      </span>
    );
  };

  const withSpaces = (from: number, to: number) =>
    words.slice(from, to).flatMap((w, k) => [renderWord(w, from + k), " "]);

  if (first < 0) {
    return <span className="font-bold text-ai-ink">{withSpaces(0, words.length)}</span>;
  }

  // Closing line: the marked words get a slightly tilted highlighter swipe and
  // the text inverts on top of it.
  return (
    <span className="font-extrabold text-ink-strong">
      {withSpaces(0, first)}
      <span
        className="relative isolate mx-[0.22em] inline-block whitespace-nowrap"
        style={{ animation: `mark-ink 0.3s ease ${wordsDone + 120}ms forwards` }}
      >
        <span
          aria-hidden="true"
          className="absolute -inset-x-[0.22em] top-[0.06em] bottom-[-0.04em] -z-10 origin-left rounded-[0.22em]"
          style={{
            background: "var(--ai-mark-bg)",
            transform: "rotate(-2deg) skewX(-6deg) scaleX(0)",
            animation: `mark-swipe 0.45s var(--ease-soft) ${wordsDone}ms forwards`,
          }}
        />
        {words
          .slice(first, last + 1)
          .flatMap((w, k) =>
            k === 0 ? [renderWord(w, first + k)] : [" ", renderWord(w, first + k)],
          )}
      </span>{" "}
      {withSpaces(last + 1, words.length)}
    </span>
  );
}
