export type SwitchTone = "go" | "graphite" | "star" | "personal" | "uni";

/** Track background + inset shading for a lit switch of the given tone. */
export const litTrack = (tone: SwitchTone) => ({
  background: `linear-gradient(180deg, var(--${tone}-hi), var(--${tone}) 55%, var(--${tone}-deep))`,
  boxShadow:
    "0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent, inset 0.12em 0.12em 0.3em rgba(40, 40, 50, 0.35), inset -0.1em -0.1em 0.25em rgba(255, 255, 255, 0.25)",
});
