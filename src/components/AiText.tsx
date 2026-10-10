import { useEffect, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Types the text out like a streaming AI answer, with a blinking caret.
 * The untyped rest is already laid out (invisible), so lines never jump.
 */
export function TypeText({ text, speed = 24 }: { text: string; speed?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(text.length);
      return;
    }
    setCount(0);
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span aria-hidden="true">
      {text.slice(0, count)}
      <span className="relative inline-block w-0">
        <span
          className={`absolute left-[0.06em] top-[-0.85em] h-[1.05em] w-[0.11em] rounded-full bg-current ${
            count >= text.length ? "animate-caret" : ""
          }`}
        />
      </span>
      <span className="opacity-0">{text.slice(count)}</span>
    </span>
  );
}

/** The closing line: words resolve out of a blur one by one, then a status dot blinks. */
export function RevealText({ text, step = 80 }: { text: string; step?: number }) {
  const words = text.split(" ");
  const end = words.length * step;
  return (
    <span aria-hidden="true">
      {words.map((word, i) => (
        <span key={i}>
          <span
            className="inline-block animate-word-in"
            style={{ animationDelay: `${i * step}ms` }}
          >
            {word}
          </span>{" "}
        </span>
      ))}
      <span
        className="inline-block h-[0.45em] w-[0.45em] rounded-full bg-go align-middle shadow-[0_0_0.5em_var(--go)]"
        style={{
          animation: `dot-in 0.35s var(--ease-spring) ${end}ms both, dot-blink 1.1s ease-in-out ${end + 350}ms infinite`,
        }}
      />
    </span>
  );
}
