import { useEffect, useRef } from "react";

/**
 * Perforated "speaker grille" background.
 * Every dot is a hole punched into the surface. The cursor acts like a light
 * behind the panel that glows through nearby holes, and every click sends a
 * sound wave rippling through the grille.
 */
export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Config
    const spacing = 28;
    const holeR = 2.1;
    const lightRadius = 170;
    const lightRadiusSq = lightRadius * lightRadius;
    const rippleSpeed = 0.75; // px per ms
    const rippleBand = 30;
    const rippleLife = 1700;

    let dpr = 1;
    let width = 0;
    let height = 0;
    let points: { x: number; y: number }[] = [];
    let animationFrameId = 0;
    let isAnimating = false;
    let idleTimer = 0;

    const mouse = { x: -9999, y: -9999, strength: 0, target: 0 };
    const ripples: { x: number; y: number; t0: number }[] = [];

    const staticLayer = document.createElement("canvas");
    const holeSprite = document.createElement("canvas");
    const glowSprite = document.createElement("canvas");

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        hole: cs.getPropertyValue("--hole").trim() || "rgba(92,82,70,0.32)",
        light: cs.getPropertyValue("--sh-l").trim() || "rgba(255,255,255,0.95)",
        accent: cs.getPropertyValue("--accent").trim() || "#f0611d",
      };
    };

    /** Pre-render one recessed hole and one glowing hole so frames are just blits. */
    const buildSprites = () => {
      const { hole, light, accent } = readColors();

      const hs = Math.ceil((holeR * 2 + 4) * dpr);
      holeSprite.width = hs;
      holeSprite.height = hs;
      const h = holeSprite.getContext("2d")!;
      h.scale(dpr, dpr);
      const c = hs / dpr / 2;
      // light rim on the lower right edge of the hole
      h.fillStyle = light;
      h.beginPath();
      h.arc(c + 0.8, c + 0.8, holeR, 0, Math.PI * 2);
      h.fill();
      // the hole itself
      h.fillStyle = hole;
      h.beginPath();
      h.arc(c, c, holeR, 0, Math.PI * 2);
      h.fill();

      const gs = Math.ceil(26 * dpr);
      glowSprite.width = gs;
      glowSprite.height = gs;
      const g = glowSprite.getContext("2d")!;
      g.scale(dpr, dpr);
      const gc = 13;
      const halo = g.createRadialGradient(gc, gc, 0, gc, gc, gc);
      halo.addColorStop(0, hexToRgba(accent, 0.55));
      halo.addColorStop(0.35, hexToRgba(accent, 0.18));
      halo.addColorStop(1, hexToRgba(accent, 0));
      g.fillStyle = halo;
      g.fillRect(0, 0, gc * 2, gc * 2);
      const core = g.createRadialGradient(gc - 0.6, gc - 0.6, 0, gc, gc, holeR + 0.6);
      core.addColorStop(0, "#ffe7d6");
      core.addColorStop(0.55, accent);
      core.addColorStop(1, hexToRgba(accent, 0.85));
      g.fillStyle = core;
      g.beginPath();
      g.arc(gc, gc, holeR + 0.6, 0, Math.PI * 2);
      g.fill();
    };

    const buildStaticLayer = () => {
      staticLayer.width = canvas.width;
      staticLayer.height = canvas.height;
      const s = staticLayer.getContext("2d")!;
      const hs = holeSprite.width / dpr;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        s.drawImage(holeSprite, Math.round((p.x - hs / 2) * dpr), Math.round((p.y - hs / 2) * dpr));
      }
    };

    const initPoints = () => {
      points = [];
      const offsetX = ((width % spacing) / 2) | 0;
      const offsetY = ((height % spacing) / 2) | 0;
      for (let x = offsetX; x <= width + spacing; x += spacing) {
        for (let y = offsetY; y <= height + spacing; y += spacing) {
          points.push({ x, y });
        }
      }
    };

    const drawStatic = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(staticLayer, 0, 0);
    };

    const draw = (now: number) => {
      if (!isAnimating) return;

      mouse.strength += (mouse.target - mouse.strength) * 0.12;
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].t0 > rippleLife) ripples.splice(i, 1);
      }

      drawStatic();

      const gs = glowSprite.width;
      const half = gs / 2;
      const hasMouse = mouse.strength > 0.01;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        let intensity = 0;

        if (hasMouse) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < lightRadiusSq) {
            const f = 1 - Math.sqrt(dSq) / lightRadius;
            intensity = f * f * mouse.strength;
          }
        }

        for (let r = 0; r < ripples.length; r++) {
          const rp = ripples[r];
          const age = now - rp.t0;
          const front = age * rippleSpeed;
          const dx = rp.x - p.x;
          const dy = rp.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const off = (d - front) / rippleBand;
          if (off > -2 && off < 2) {
            const life = 1 - age / rippleLife;
            const v = Math.exp(-off * off) * life * life;
            if (v > intensity) intensity = v;
          }
        }

        if (intensity > 0.02) {
          ctx.globalAlpha = Math.min(1, intensity);
          ctx.drawImage(glowSprite, Math.round(p.x * dpr - half), Math.round(p.y * dpr - half));
        }
      }
      ctx.globalAlpha = 1;

      if (mouse.target === 0 && mouse.strength < 0.01 && ripples.length === 0) {
        isAnimating = false;
        animationFrameId = 0;
        drawStatic();
        return;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const startAnimation = () => {
      if (isAnimating) return;
      isAnimating = true;
      animationFrameId = requestAnimationFrame(draw);
    };

    const rebuild = () => {
      buildSprites();
      buildStaticLayer();
      if (!isAnimating) drawStatic();
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      initPoints();
      rebuild();
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion || coarsePointer.matches) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.target = 1;
      startAnimation();
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        mouse.target = 0;
      }, 2200);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (reducedMotion) return;
      ripples.push({ x: e.clientX, y: e.clientY, t0: performance.now() });
      if (ripples.length > 4) ripples.shift();
      startAnimation();
    };

    const handleMouseLeave = () => {
      mouse.target = 0;
      clearTimeout(idleTimer);
    };

    // Re-render when the theme class on <html> flips.
    const themeObserver = new MutationObserver(rebuild);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    resize();

    return () => {
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" />
  );
}

function hexToRgba(color: string, alpha: number) {
  const hex = color.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return color;
  const n = parseInt(hex, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
