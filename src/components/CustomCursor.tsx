import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const pointerRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const arrowSvg = arrowRef.current;
    const pointerSvg = pointerRef.current;
    const textSvg = textRef.current;
    if (!cursor || !arrowSvg || !pointerSvg || !textSvg) return;

    cursor.style.display = "block";

    // Hide native cursor globally
    const style = document.createElement("style");
    style.textContent = "@media(pointer:fine){*{cursor:none!important}}";
    document.head.appendChild(style);

    let visible = false;
    let lastTarget: EventTarget | null = null;
    let currentType = "default";

    const svgs: Record<string, SVGSVGElement> = {
      default: arrowSvg,
      pointer: pointerSvg,
      text: textSvg,
    };

    const setCursorType = (type: string) => {
      if (type === currentType) return;
      svgs[currentType].style.display = "none";
      svgs[type].style.display = "block";
      currentType = type;
    };

    /** Detect cursor type via DOM heuristics (no getComputedStyle needed). */
    const detectType = (el: HTMLElement): string => {
      const tag = el.tagName;

      // Text inputs → I-beam
      if (
        tag === "TEXTAREA" ||
        (tag === "INPUT" &&
          !["button", "submit", "reset", "checkbox", "radio", "file", "range", "color", "image"].includes(
            (el as HTMLInputElement).type
          )) ||
        el.getAttribute("contenteditable") === "true"
      ) {
        return "text";
      }

      // Clickable elements → pointer hand
      if (
        el.closest(
          'a, button, [role="button"], select, summary, label[for], [class*="cursor-pointer"]'
        )
      ) {
        return "pointer";
      }

      return "default";
    };

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;

      if (!visible) {
        cursor.style.opacity = "1";
        visible = true;
      }

      // Only recompute cursor type when hovering a new element
      if (e.target !== lastTarget) {
        lastTarget = e.target;
        const target = e.target as HTMLElement;
        if (target && target.closest) {
          setCursorType(detectType(target));
        }
      }
    };

    const onMouseLeave = () => {
      cursor.style.opacity = "0";
      visible = false;
      lastTarget = null;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      style.remove();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        willChange: "transform",
      }}
    >
      {/* Default arrow — hotspot at tip (0,0) */}
      <svg
        ref={arrowRef}
        width="20"
        height="24"
        viewBox="0 0 14 20"
        fill="none"
        style={{ display: "block" }}
      >
        <path
          d="M0,0 L0,17 L4.5,13 L7.5,19 L10,17.5 L7,12 L13,12 Z"
          fill="white"
        />
      </svg>

      {/* Pointer hand — hotspot at fingertip center */}
      <svg
        ref={pointerRef}
        width="19"
        height="24"
        viewBox="0 0 15 20"
        fill="none"
        style={{ display: "none", transform: "translate(-6.5px, -1px)" }}
      >
        <rect x="4.5" y="0" width="4" height="11.5" rx="2" fill="white" />
        <rect x="10" y="6" width="3.5" height="5" rx="1.75" fill="white" />
        <rect x="0" y="8" width="13.5" height="10" rx="3.5" fill="white" />
      </svg>

      {/* I-beam text cursor — hotspot at center */}
      <svg
        ref={textRef}
        width="14"
        height="22"
        viewBox="0 0 14 22"
        fill="none"
        style={{ display: "none", transform: "translate(-7px, -11px)" }}
      >
        <rect x="1" y="0" width="12" height="2.5" rx="1" fill="white" />
        <rect x="5.5" y="0" width="3" height="22" fill="white" />
        <rect x="1" y="19.5" width="12" height="2.5" rx="1" fill="white" />
      </svg>
    </div>
  );
}
