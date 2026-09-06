import { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Config
    const spacing = 35;
    const radius = 200;
    const radiusSq = radius * radius;
    const mouse = { x: -1000, y: -1000 };

    let animationFrameId = 0;
    let isAnimating = false;
    let idleTimer = 0;
    let clearRadius = 60;
    let targetClearRadius = 60;

    let particles: { x: number; y: number; originX: number; originY: number }[] = [];

    // --- Helpers ---

    const initParticles = () => {
      particles = [];
      for (let x = 0; x <= canvas.width + spacing; x += spacing) {
        for (let y = 0; y <= canvas.height + spacing; y += spacing) {
          particles.push({ x, y, originX: x, originY: y });
        }
      }
    };

    /** Draw all particles at their rest positions in a single batched stroke. */
    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      const size = 2;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x = p.originX;
        p.y = p.originY;
        ctx.moveTo(p.x - size, p.y);
        ctx.lineTo(p.x + size, p.y);
        ctx.moveTo(p.x, p.y - size);
        ctx.lineTo(p.x, p.y + size);
      }
      ctx.stroke();
    };

    const startAnimation = () => {
      if (isAnimating) return;
      isAnimating = true;
      animationFrameId = requestAnimationFrame(draw);
    };

    const stopAnimation = () => {
      if (!isAnimating) return;
      isAnimating = false;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
      drawStatic();
    };

    const scheduleIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        mouse.x = -1000;
        mouse.y = -1000;
        // Let particles spring back to origin, then freeze
        window.setTimeout(stopAnimation, 500);
      }, 2000);
    };

    // --- Animated draw (runs only while mouse is active) ---

    const draw = () => {
      if (!isAnimating) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clearRadius += (targetClearRadius - clearRadius) * 0.1;

      // --- Pass 1: batch all unaffected particles in one stroke ---
      ctx.strokeStyle = "rgba(0, 0, 0, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      const affected: number[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouse.x - p.originX;
        const dy = mouse.y - p.originY;
        // Squared distance — avoids sqrt for ~95% of particles
        if (dx * dx + dy * dy < radiusSq) {
          affected.push(i);
          continue;
        }

        // Spring back toward origin
        p.x += (p.originX - p.x) * 0.15;
        p.y += (p.originY - p.y) * 0.15;

        const size = 2;
        ctx.moveTo(p.x - size, p.y);
        ctx.lineTo(p.x + size, p.y);
        ctx.moveTo(p.x, p.y - size);
        ctx.lineTo(p.x, p.y + size);
      }
      ctx.stroke();

      // --- Pass 2: draw affected particles individually (variable style) ---
      for (let j = 0; j < affected.length; j++) {
        const p = particles[affected[j]];
        const dx = mouse.x - p.originX;
        const dy = mouse.y - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const angle = Math.atan2(dy, dx);
        const force = Math.pow((radius - dist) / radius, 1.5);
        const push = force * 35;
        const targetX = p.originX - Math.cos(angle) * push;
        const targetY = p.originY - Math.sin(angle) * push;
        const size = 2 + force * 6;

        const centerFade = Math.min(1, Math.pow(dist / clearRadius, 2.5));
        const alpha = (0.12 + force * 0.35) * centerFade;

        p.x += (targetX - p.x) * 0.15;
        p.y += (targetY - p.y) * 0.15;

        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.lineWidth = 1 + force * 1.5;
        ctx.beginPath();
        ctx.moveTo(p.x - size, p.y);
        ctx.lineTo(p.x + size, p.y);
        ctx.moveTo(p.x, p.y - size);
        ctx.lineTo(p.x, p.y + size);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // --- Event handlers ---

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      if (isAnimating) {
        // Redraw immediately after resize
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(draw);
      } else {
        drawStatic();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Skip on touch devices
      if (window.matchMedia("(pointer: coarse)").matches) return;

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const target = e.target as HTMLElement;
      if (target && target.closest) {
        const isInterest = target.closest("a, button, h1, h2, h3, h4, p, img, span");
        targetClearRadius = isInterest ? 180 : 60;
      }

      startAnimation();
      scheduleIdle();
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      clearTimeout(idleTimer);
      // Let particles settle, then stop
      window.setTimeout(stopAnimation, 600);
    };

    // --- Init ---

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    resize(); // draws static grid

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
