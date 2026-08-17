import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Persists scroll positions across SPA navigations.
 * Module-level so it survives route unmounts.
 */
const scrollHistory = new Map<string, number>();

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navType = useNavigationType(); // "PUSH" | "POP" | "REPLACE"

  // ── Save scroll position as the user scrolls ──────────────────────────────
  useEffect(() => {
    const path = location.pathname;
    const save = () => scrollHistory.set(path, window.scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [location.pathname]);

  // ── Restore or reset scroll position on navigation ────────────────────────
  useEffect(() => {
    if (navType === "POP") {
      // Browser back / forward — restore exact saved position.
      // Double rAF: frame 1 lets React paint the new page,
      // frame 2 lets GSAP ScrollTrigger set up its instances.
      // After restoring scroll we immediately refresh ScrollTrigger so
      // every section that's already above the viewport snaps to visible.
      const saved = scrollHistory.get(location.pathname) ?? 0;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: saved, behavior: "instant" as ScrollBehavior });
          // Refresh so already-passed triggers fire and sections become visible
          try {
            ScrollTrigger.refresh();
          } catch {
            // ScrollTrigger may not be registered yet on very first load
          }
        });
      });
      return;
    }

    // Forward navigation (PUSH / REPLACE):
    // Hash links are handled by SinglePageStack's scrollToHash — don't interfere.
    if (location.hash) return;

    // New page with no anchor → start at the top.
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.hash, navType]);

  return (
    <div key={`${location.pathname}${location.hash}`}>
      {children}
    </div>
  );
}
