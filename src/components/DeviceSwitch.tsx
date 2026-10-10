import { litTrack, type SwitchTone } from "@/lib/switch-tones";

type Props = {
  on: boolean;
  onToggle: () => void;
  label: string;
  /** Color family of the lit track. Without it the switch stays neutral, like a selector. */
  tone?: SwitchTone;
};

const offTrack = {
  background: "linear-gradient(150deg, var(--track-off), var(--surface) 90%)",
  boxShadow: "var(--press-xs)",
};

/**
 * Small switch for use on the devices. Sized in em so it scales with the
 * device it sits on.
 */
export function DeviceSwitch({ on, onToggle, label, tone }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      title={label}
      onClick={onToggle}
      className="group relative block h-[1.9em] w-[3.4em] shrink-0 cursor-pointer rounded-full transition-[background,box-shadow] duration-300"
      style={tone && on ? litTrack(tone) : offTrack}
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
