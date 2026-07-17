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
 * Applies a scroll-triggered fade/slide-in reveal to the direct children
 * of the returned ref container. Designed for section headings, cards,
 * and staggered lists.
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
      gsap.fromTo(
        targets,
        { opacity: 0, y: options.y ?? 40 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.9,
          delay: options.delay ?? 0,
          stagger: options.stagger ?? 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: options.start ?? "top 80%",
            once: options.once ?? true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);

  return containerRef;
}
