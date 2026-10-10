/**
 * Tiny synthesized UI sounds (no audio files): detent ticks for the tuner,
 * a "clack" for switches and a soft "thock" for keys. Everything is created
 * lazily on the first user interaction, so browsers allow playback.
 */

type Listener = () => void;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noise: AudioBuffer | null = null;
let enabled = true;
let lastTick = 0;
const listeners = new Set<Listener>();

const STORAGE_KEY = "sound";

// Browsers only allow audio after a user gesture, so stay silent until then
// (e.g. during the tuner's intro sweep).
let unlocked = false;

if (typeof window !== "undefined") {
  try {
    enabled = localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    // storage unavailable: keep the default
  }
  const unlock = () => {
    unlocked = true;
  };
  window.addEventListener("pointerdown", unlock, { once: true, capture: true });
  window.addEventListener("keydown", unlock, { once: true, capture: true });
}

function audio() {
  if (typeof window === "undefined" || !unlocked) return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
    noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.08), ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function burst(c: AudioContext, at: number, freq: number, q: number, peak: number, decay: number) {
  const src = c.createBufferSource();
  src.buffer = noise;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = freq;
  bp.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(peak, at + 0.0015);
  g.gain.exponentialRampToValueAtTime(0.0001, at + decay);
  src.connect(bp).connect(g).connect(master!);
  src.start(at);
  src.stop(at + decay + 0.02);
}

function body(c: AudioContext, at: number, from: number, to: number, peak: number, decay: number) {
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(from, at);
  osc.frequency.exponentialRampToValueAtTime(to, at + decay);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(peak, at + 0.003);
  g.gain.exponentialRampToValueAtTime(0.0001, at + decay);
  osc.connect(g).connect(master!);
  osc.start(at);
  osc.stop(at + decay + 0.02);
}

const emit = () => listeners.forEach((l) => l());

/** One detent of a tuning wheel. */
export function tick(strength = 1) {
  if (!enabled) return;
  const now = performance.now();
  if (now - lastTick < 28) return;
  lastTick = now;
  const c = audio();
  if (!c) return;
  const t = c.currentTime;
  burst(c, t, 3400, 1.4, 0.22 * strength, 0.03);
  body(c, t, 1400, 700, 0.05 * strength, 0.025);
  emit();
}

/** A toggle switch snapping over. */
export function clack() {
  if (!enabled) return;
  const c = audio();
  if (!c) return;
  const t = c.currentTime;
  burst(c, t, 2200, 1.1, 0.3, 0.04);
  body(c, t, 520, 180, 0.12, 0.06);
  burst(c, t + 0.045, 3000, 1.6, 0.14, 0.03);
  emit();
}

/** A soft key press. */
export function thock() {
  if (!enabled) return;
  const c = audio();
  if (!c) return;
  const t = c.currentTime;
  body(c, t, 260, 110, 0.16, 0.09);
  burst(c, t, 1800, 0.9, 0.08, 0.035);
  emit();
}

export function isSoundEnabled() {
  return enabled;
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // ignore
  }
}

/** Notified whenever a sound plays (used to pulse the speaker grille). */
export function onSound(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
