type Props = {
  on: boolean;
  onToggle: () => void;
  label: string;
  /** Light the track green when on (otherwise it stays neutral, like a selector). */
  green?: boolean;
};

/**
 * Small switch for use on the devices. Sized in em so it scales with the
 * device it sits on.
 */
export function DeviceSwitch({ on, onToggle, label, green = false }: Props) {
  const lit = green && on;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      title={label}
      onClick={onToggle}
      className="group relative block h-[1.9em] w-[3.4em] shrink-0 cursor-pointer rounded-full transition-[background,box-shadow] duration-300"
      style={{
        background: lit
          ? "linear-gradient(180deg, var(--go-hi), var(--go) 55%, var(--go-deep))"
          : "linear-gradient(150deg, var(--track-off), var(--surface) 90%)",
        boxShadow: lit
          ? "0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent, inset 0.12em 0.12em 0.3em rgba(45, 70, 35, 0.4), inset -0.1em -0.1em 0.25em rgba(255, 255, 255, 0.25)"
          : "var(--press-xs)",
      }}
    >
      <span
        className="knob absolute top-[0.22em] left-[0.22em] flex h-[1.46em] w-[1.46em] items-center justify-center rounded-full transition-transform duration-500 ease-[var(--ease-spring)] [transform:translateX(var(--x))] group-active:[transform:translateX(var(--x))_scaleX(1.16)]"
        style={{ "--x": on ? "1.5em" : "0em" } as React.CSSProperties}
      >
        <span className="knob-dent block h-[0.66em] w-[0.66em] rounded-full" />
      </span>
    </button>
  );
}
