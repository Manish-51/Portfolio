import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, registerGsap } from "../lib/gsapConfig";

interface ScrollRevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  once?: boolean;
}

/**
 * Applies a scroll-triggered fade/slide-in reveal to elements matched
 * by `selector` inside the returned ref container.
 *
 * Uses `gsap.from` (not `fromTo`) so elements are never set to
 * opacity:0 before the ScrollTrigger fires — preventing the "invisible
 * section" bug when the trigger threshold isn't reached immediately.
 */
export function useScrollReveal<T extends HTMLElement>(
  selector = ":scope > *",
  options: ScrollRevealOptions = {}
): RefObject<T> {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    registerGsap();
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: options.y ?? 40,
        duration: options.duration ?? 0.9,
        delay: options.delay ?? 0,
        stagger: options.stagger ?? 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: options.start ?? "top 88%",
          once: options.once ?? true,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    // Refresh ScrollTrigger after layout settles so trigger positions
    // are calculated against the real document height (not a mid-render snapshot)
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);

  return containerRef;
}
