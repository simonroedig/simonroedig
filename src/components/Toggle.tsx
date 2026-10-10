import { clack } from "@/lib/sound";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

/** Braun-style switch: recessed track, dented knob, springs across and turns green when on. */
export function Toggle({ checked, onChange, label }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => {
        onChange(!checked);
        clack();
      }}
      className={`group inline-flex items-center gap-3 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
        checked ? "text-ink" : "text-ink-faint hover:text-ink-soft"
      }`}
    >
      <span
        className="relative block h-[1.65rem] w-[3rem] shrink-0 rounded-full transition-[background,box-shadow] duration-300"
        style={{
          background: checked
            ? "linear-gradient(180deg, #82d973, var(--go) 55%, var(--go-deep))"
            : "linear-gradient(150deg, var(--surface-lo), var(--surface) 70%)",
          boxShadow: checked
            ? "0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent, inset 2px 2px 5px rgba(30, 90, 20, 0.45), inset -2px -2px 4px rgba(255, 255, 255, 0.3)"
            : "var(--press-xs)",
        }}
      >
        <span
          className="knob absolute top-[0.175rem] left-[0.175rem] flex h-[1.3rem] w-[1.3rem] items-center justify-center rounded-full transition-transform duration-500 ease-[var(--ease-spring)] [transform:translateX(var(--x))] group-active:[transform:translateX(var(--x))_scaleX(1.18)]"
          style={{ "--x": checked ? "1.35rem" : "0rem" } as React.CSSProperties}
        >
          <span className="knob-dent block h-[0.6rem] w-[0.6rem] rounded-full" />
        </span>
      </span>
      {label}
    </button>
  );
}
