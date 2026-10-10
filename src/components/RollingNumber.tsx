/** Odometer-style number: each digit rolls from top to bottom when it changes. */
export function RollingNumber({ value, digits = 2 }: { value: number; digits?: number }) {
  const chars = String(value).padStart(digits, "0").split("");
  return (
    <span className="inline-flex overflow-hidden" aria-hidden="true">
      {chars.map((c, i) => {
        const d = Number(c);
        return (
          <span key={i} className="relative inline-block h-[1.2em] w-[0.65em] leading-[1.2em]">
            {/* 9 at the top, 0 at the bottom: counting up slides the strip downwards */}
            <span
              className="absolute inset-x-0 top-0 flex flex-col items-center transition-transform duration-700 ease-[var(--ease-spring)]"
              style={{ transform: `translateY(${-(9 - d) * 1.2}em)` }}
            >
              {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((n) => (
                <span key={n} className="h-[1.2em]">
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
