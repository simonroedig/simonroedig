import { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; originX: number; originY: number }[] = [];
    
    // Config
    const spacing = 35; // distance between crosshairs
    const mouse = { x: -1000, y: -1000 };
    const radius = 200; // mouse repulsion radius
    
    let clearRadius = 60;
    let targetClearRadius = 60;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let x = 0; x <= canvas.width + spacing; x += spacing) {
        for (let y = 0; y <= canvas.height + spacing; y += spacing) {
          particles.push({
            x,
            y,
            originX: x,
            originY: y
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      const target = e.target as HTMLElement;
      if (target && target.closest) {
        const isInterest = target.closest('a, button, h1, h2, h3, h4, p, img, span');
        targetClearRadius = isInterest ? 180 : 60;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      clearRadius += (targetClearRadius - clearRadius) * 0.1;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Calculate distance to mouse
        const dx = mouse.x - p.originX;
        const dy = mouse.y - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let targetX = p.originX;
        let targetY = p.originY;
        let size = 2; // normal arm length
        
        if (dist < radius) {
          // Repulse
          const angle = Math.atan2(dy, dx);
          // Exponential easing for a natural magnetic feel
          const force = Math.pow((radius - dist) / radius, 1.5); 
          const push = force * 35; // slightly stronger push
          targetX = p.originX - Math.cos(angle) * push;
          targetY = p.originY - Math.sin(angle) * push;
          size = 2 + force * 6; // grow when near mouse
          
          // Center fade to create a perfectly clear halo around the cursor
          // Fades to 0 depending on the dynamic clearRadius
          const centerFade = Math.min(1, Math.pow(dist / clearRadius, 2.5));
          
          // Get darker/thicker but fade out right at the center
          const alpha = (0.12 + force * 0.35) * centerFade;
          ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
          ctx.lineWidth = 1 + force * 1.5;
        } else {
          ctx.strokeStyle = "rgba(0, 0, 0, 0.12)";
          ctx.lineWidth = 1;
        }
        
        // Spring easing to target
        p.x += (targetX - p.x) * 0.15;
        p.y += (targetY - p.y) * 0.15;
        
        ctx.beginPath();
        ctx.moveTo(p.x - size, p.y);
        ctx.lineTo(p.x + size, p.y);
        ctx.moveTo(p.x, p.y - size);
        ctx.lineTo(p.x, p.y + size);
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
