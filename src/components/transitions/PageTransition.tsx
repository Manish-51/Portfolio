import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "../../lib/gsapConfig";

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    }, el);

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }

    return () => ctx.revert();
  }, [location.pathname, location.hash]);

  return (
    <div key={`${location.pathname}${location.hash}`} ref={containerRef}>
      {children}
    </div>
  );
}
