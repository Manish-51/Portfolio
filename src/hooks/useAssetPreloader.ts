import { useEffect, useRef, useState } from "react";

interface PreloaderState {
  progress: number;
  isComplete: boolean;
}

/**
 * Simulates/tracks asset preloading (fonts + a set of image/texture URLs)
 * and reports a smooth 0-100 progress value that the LoadingScreen consumes.
 * Real image assets are loaded via the Image constructor so progress reflects
 * genuine network/decoding time, not just a fake timer.
 */
export function useAssetPreloader(assetUrls: string[] = []): PreloaderState {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let loaded = 0;
    const total = Math.max(assetUrls.length, 1);
    let cancelled = false;

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

    const bump = () => {
      loaded += 1;
      const target = Math.min(100, Math.round((loaded / total) * 100));
      animateTo(target);
    };

    const animateTo = (target: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const step = () => {
        setProgress((prev) => {
          const next = Math.min(target, prev + Math.max(1, (target - prev) * 0.18));
          if (next < target) {
            rafRef.current = requestAnimationFrame(step);
          }
          return next;
        });
      };
      step();
    };

    if (assetUrls.length === 0) {
      // No real assets declared: drive a smooth minimum-time progress bar
      // so the loader still feels intentional rather than instant/jarring.
      let fake = 0;
      const interval = setInterval(() => {
        fake += Math.random() * 14 + 6;
        if (fake >= 100) {
          fake = 100;
          clearInterval(interval);
        }
        if (!cancelled) setProgress(fake);
      }, 140);
      fontsReady.then(() => {
        if (!cancelled) {
          clearInterval(interval);
          animateTo(100);
        }
      });
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }

    assetUrls.forEach((url) => {
      const img = new Image();
      img.onload = bump;
      img.onerror = bump;
      img.src = url;
    });

    fontsReady.then(() => {
      if (!cancelled) bump();
    });

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [assetUrls]);

  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      const timeout = setTimeout(() => setIsComplete(true), 350);
      return () => clearTimeout(timeout);
    }
  }, [progress, isComplete]);

  return { progress: Math.min(100, Math.round(progress)), isComplete };
}
