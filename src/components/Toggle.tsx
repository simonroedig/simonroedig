import type { ComponentType } from "react";
import { clack } from "@/lib/sound";
import { litTrack, type SwitchTone } from "@/lib/switch-tones";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  icon?: ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  tone?: SwitchTone;
};

/** Braun-style switch: recessed track, dented knob, springs across and lights up in its tone when on. */
export function Toggle({ checked, onChange, label, icon: Icon, tone = "go" }: Props) {
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
        style={
          checked
            ? litTrack(tone)
            : {
                background: "linear-gradient(150deg, var(--surface-lo), var(--surface) 70%)",
                boxShadow: "var(--press-xs)",
              }
        }
      >
        <span
          className="knob absolute top-[0.175rem] left-[0.175rem] flex h-[1.3rem] w-[1.3rem] items-center justify-center rounded-full transition-transform duration-500 ease-[var(--ease-spring)] [transform:translateX(var(--x))] group-active:[transform:translateX(var(--x))_scaleX(1.18)]"
          style={{ "--x": checked ? "1.35rem" : "0rem" } as React.CSSProperties}
        >
          <span className="knob-dent block h-[0.6rem] w-[0.6rem] rounded-full" />
        </span>
      </span>
      <span className="flex items-center gap-1.5">
        {Icon && (
          <Icon
            size={15}
            className="shrink-0 transition-colors duration-300"
            style={checked ? { color: `var(--${tone}-deep)` } : undefined}
          />
        )}
        {label}
      </span>
    </button>
  );
}
