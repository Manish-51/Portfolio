import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsapConfig";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isFinePointer = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (!isFinePointer) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power3.out",
      });
      ringPos.x = e.clientX;
      ringPos.y = e.clientY;
    };

    const onEnterInteractive = () => gsap.to(ring, { scale: 1.8, duration: 0.25 });
    const onLeaveInteractive = () => gsap.to(ring, { scale: 1, duration: 0.25 });

    window.addEventListener("mousemove", onMove);
    const interactiveEls = document.querySelectorAll("a, button, [role='tab']");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/50"
      />
    </>
  );
}