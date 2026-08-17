import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsapConfig";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const isFinePointer = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (!isFinePointer) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.set(dot, { x: mouseX, y: mouseY });
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.25,
        ease: "power2.out",
      });

      // Check if target or parent has data-cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
        if (text && label) {
          gsap.to(ring, { scale: 2.4, backgroundColor: "rgba(232, 184, 114, 0.15)", borderColor: "#e8b872", duration: 0.25 });
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.2 });
        }
      } else {
        if (label) gsap.to(label, { opacity: 0, scale: 0.7, duration: 0.2 });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='tab'], input, textarea");

      if (interactive && !target?.closest("[data-cursor]")) {
        gsap.to(ring, {
          scale: 1.8,
          borderColor: "#5fd9b4",
          backgroundColor: "rgba(95, 217, 180, 0.1)",
          duration: 0.25,
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='tab'], input, textarea, [data-cursor]");

      if (interactive) {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(232, 184, 114, 0.5)",
          backgroundColor: "transparent",
          duration: 0.25,
        });
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10002] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10001] flex items-center justify-center h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/50 backdrop-blur-[1px] transition-colors duration-200"
      >
        <div
          ref={labelRef}
          className="opacity-0 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-amber-300 pointer-events-none select-none"
        >
          {cursorText}
        </div>
      </div>
    </>
  );
}