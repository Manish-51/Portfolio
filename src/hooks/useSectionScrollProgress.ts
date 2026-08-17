import { useEffect, useState, type RefObject } from "react";

export function useSectionScrollProgress<T extends HTMLElement>(ref: RefObject<T>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start line growth when element top reaches 60% of screen height
      const startOffset = windowHeight * 0.6;
      // Complete line growth when element bottom reaches 30% of screen height
      const endOffset = windowHeight * 0.3;

      const totalScrollableDistance = rect.height + (startOffset - endOffset);
      const currentPosition = startOffset - rect.top;

      if (totalScrollableDistance <= 0) {
        setProgress(1);
        return;
      }

      const rawProgress = currentPosition / totalScrollableDistance;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}
