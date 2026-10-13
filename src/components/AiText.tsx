import { type ReactNode, useEffect, useRef, useState } from "react";

export type CaptionKind = "plain" | "ai" | "final";

type Props = {
  /** Changes whenever a new caption should take over. */
  id: string;
  text: string;
  kind: CaptionKind;
  /** A phrase of the text that gets the green marker swipe once the words are in. */
  highlight?: string;
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

/**
 * The green highlighter: a slightly tilted swipe behind a few words, drawn
 * from left to right after `delay` ms, with the text inverting on top. Deep
 * enough to cover descenders (the "g" in "stage").
 */
export function Marker({
  delay,
  children,
  className = "",
  flush = false,
}: {
  delay: number;
  children: ReactNode;
  className?: string;
  /** No side margins: the text keeps its place (e.g. a heading on the page's edge). */
  flush?: boolean;
}) {
  return (
    <span
      className={`relative isolate inline-block whitespace-nowrap ${flush ? "" : "mx-[0.2em]"} ${className}`}
      style={{ animation: `mark-ink 0.3s ease ${delay + 120}ms forwards` }}
    >
      <span
        aria-hidden="true"
        className="absolute -inset-x-[0.24em] top-[0.02em] bottom-[-0.2em] -z-10 origin-left rounded-[0.24em]"
        style={{
          background: "var(--ai-mark-bg)",
          transform: "rotate(-2deg) skewX(-6deg) scaleX(0)",
          animation: `mark-swipe 0.5s var(--ease-soft) ${delay}ms forwards`,
        }}
      />
      {children}
    </span>
  );
}

function Caption({ text, kind, highlight }: Item) {
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
  // where the marked phrase sits among the words (-1: none)
  const marked = highlight ? highlight.split(" ") : [];
  let first = -1;
  for (let i = 0; marked.length && i + marked.length <= words.length; i++) {
    if (marked.every((w, k) => words[i + k] === w)) {
      first = i;
      break;
    }
  }
  const last = first >= 0 ? first + marked.length - 1 : -1;

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

  const weight = kind === "final" ? "font-extrabold" : "font-bold";
  if (first < 0) {
    return <span className={`${weight} text-ink-strong`}>{withSpaces(0, words.length)}</span>;
  }

  return (
    <span className={`${weight} text-ink-strong`}>
      {withSpaces(0, first)}
      <Marker delay={wordsDone}>
        {words
          .slice(first, last + 1)
          .flatMap((w, k) =>
            k === 0 ? [renderWord(w, first + k)] : [" ", renderWord(w, first + k)],
          )}
      </Marker>{" "}
      {withSpaces(last + 1, words.length)}
    </span>
  );
}
