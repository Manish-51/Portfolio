import { useEffect, useRef } from "react";

type Palette = "journey" | "skills" | "certifications" | "contact";

const PALETTES: Record<Palette, { a: string; b: string; c: string }> = {
  journey: { a: "rgba(212,160,90,0.55)", b: "rgba(95,217,180,0.35)", c: "rgba(232,184,114,0.25)" },
  skills: { a: "rgba(95,217,180,0.55)", b: "rgba(212,160,90,0.35)", c: "rgba(59,191,154,0.25)" },
  certifications: { a: "rgba(232,184,114,0.55)", b: "rgba(59,191,154,0.3)", c: "rgba(212,160,90,0.25)" },
  contact: { a: "rgba(59,191,154,0.55)", b: "rgba(232,184,114,0.35)", c: "rgba(95,217,180,0.25)" },
};

/**
 * A soft, drifting gradient-blob background used behind Journey, Skills,
 * Certifications and Contact. Pure CSS transforms/opacity (GPU-composited),
 * mouse-parallax via CSS vars, no layout thrash. Sits absolutely inside its
 * section (which must be `relative`), z-indexed behind the transparent
 * content so copy always stays readable.
 */
export default function SectionAurora({ palette }: { palette: Palette }) {
  const ref = useRef<HTMLDivElement>(null);
  const colors = PALETTES[palette];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const tick = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      el.style.setProperty("--px", cx.toFixed(3));
      el.style.setProperty("--py", cy.toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="section-aurora pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={
        {
          "--c1": colors.a,
          "--c2": colors.b,
          "--c3": colors.c,
        } as React.CSSProperties
      }
    >
      <span className="aurora-blob aurora-blob--one" />
      <span className="aurora-blob aurora-blob--two" />
      <span className="aurora-blob aurora-blob--three" />
      <div className="aurora-grid" />
      <div className="aurora-vignette" />
    </div>
  );
}