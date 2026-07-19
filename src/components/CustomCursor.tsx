import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeviceSupported, setIsDeviceSupported] = useState(true);
  
  useEffect(() => {
    // Only run on devices with a fine pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsDeviceSupported(false);
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother following
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
        
        // Check if hovering a clickable element
        const target = e.target as HTMLElement;
        const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                            target.closest('a') !== null ||
                            target.closest('button') !== null ||
                            target.closest('[role="button"]') !== null;
        
        setIsPointer(isClickable);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isDeviceSupported || !isVisible) return null;

  return (
    <>
      <style>{`
        /* Hide default cursor on desktop when our custom cursor is active */
        @media (pointer: fine) {
          body * {
            cursor: none !important;
          }
        }
      `}</style>
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-transform ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isPointer ? 2.5 : 1})`,
          width: '20px',
          height: '20px',
          backgroundColor: 'white',
          mixBlendMode: 'difference',
          transitionDuration: '50ms' // Subtle spring effect
        }}
      />
    </>
  );
}
