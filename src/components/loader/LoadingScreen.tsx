import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsapConfig";
import { useAssetPreloader } from "../../hooks/useAssetPreloader";

interface LoadingScreenProps {
  onFinished: () => void;
}

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const { progress, isComplete } = useAssetPreloader();
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const hasExited = useRef(false);

  const quoteWrapRef = useRef<HTMLDivElement>(null);
  const quoteCharsWrapRef = useRef<HTMLParagraphElement>(null);
  const quoteSubRef = useRef<HTMLParagraphElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const nameWrapRef = useRef<HTMLDivElement>(null);
  const nameCharsWrapRef = useRef<HTMLDivElement>(null);
  const nameGhostCyanRef = useRef<HTMLDivElement>(null);
  const nameGhostMagentaRef = useRef<HTMLDivElement>(null);
  const subtitleRowRef = useRef<HTMLDivElement>(null);
  const subtitleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const finalLineRef = useRef<HTMLParagraphElement>(null);
  const progressGroupRef = useRef<HTMLDivElement>(null);
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);
  const introTlRef = useRef<gsap.core.Timeline | null>(null);
  const rainRafRef = useRef<number | null>(null);

  const NAME = "MANISH MAITI";

  // Unchanged: keeps the numeric readout in sync with real preload progress
  useEffect(() => {
    if (counterRef.current) {
      counterRef.current.textContent = String(progress).padStart(2, "0");
    }
    if (barFillRef.current) {
      barFillRef.current.style.transform = `scaleX(${progress / 100})`;
    }
  }, [progress]);

  // --- Ambience: full-viewport dust + rain, canvas-based, GPU-friendly ---
  useEffect(() => {
    const canvas = rainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const drops = reduced
      ? []
      : Array.from({ length: 90 }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          len: 10 + Math.random() * 20,
          speed: 6 + Math.random() * 8,
          o: 0.05 + Math.random() * 0.12,
        }));

    const dust = reduced
      ? []
      : Array.from({ length: 50 }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + Math.random() * 1.6,
          vy: -0.15 - Math.random() * 0.25,
          vx: (Math.random() - 0.5) * 0.15,
          o: 0.12 + Math.random() * 0.3,
        }));

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // rain — cool blue, matches the "black and blue" theme
      ctx.strokeStyle = "rgba(96,165,250,0.55)";
      ctx.lineWidth = 1;
      for (const d of drops) {
        ctx.globalAlpha = d.o;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 0.5, d.y + d.len);
        ctx.stroke();
        d.y += d.speed;
        if (d.y > h) {
          d.y = -d.len;
          d.x = Math.random() * w;
        }
      }

      // floating dust — faint, cool white/blue
      ctx.fillStyle = "rgba(191,219,254,0.8)";
      for (const p of dust) {
        ctx.globalAlpha = p.o;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -5) p.y = h + 5;
      }

      ctx.globalAlpha = 1;
      rainRafRef.current = requestAnimationFrame(draw);
    };
    rainRafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rainRafRef.current) cancelAnimationFrame(rainRafRef.current);
    };
  }, []);

  // --- Cinematic intro timeline: quote -> sweep -> name -> subtitles -> tagline ---
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const quoteChars = quoteCharsWrapRef.current?.querySelectorAll<HTMLElement>(".q-char") ?? [];
    const nameChars = nameCharsWrapRef.current?.querySelectorAll<HTMLElement>(".n-char") ?? [];
    const subtitles = subtitleRefs.current.filter(Boolean) as HTMLSpanElement[];

    const allFadeTargets = [
      quoteWrapRef.current,
      nameWrapRef.current,
      subtitleRowRef.current,
      finalLineRef.current,
      progressGroupRef.current,
    ];

    if (reduced) {
      gsap.set(allFadeTargets, { opacity: 1, y: 0, filter: "none", visibility: "visible" });
      gsap.set(quoteChars, { opacity: 1 });
      gsap.set(nameChars, { opacity: 1, y: 0, visibility: "visible" });
      gsap.set([nameGhostCyanRef.current, nameGhostMagentaRef.current], { opacity: 0, visibility: "hidden" });
      return;
    }

    gsap.set(quoteChars, { opacity: 0, y: 14, skewX: 10, filter: "blur(6px)" });
    gsap.set(nameChars, { opacity: 0, y: 24, filter: "blur(10px)" });
    gsap.set(subtitleRowRef.current, { opacity: 0, y: 10 });
    gsap.set(finalLineRef.current, { opacity: 0, y: 10 });
    gsap.set(progressGroupRef.current, { opacity: 0 });
    gsap.set(sweepRef.current, { xPercent: -120, opacity: 0 });
    gsap.set(nameWrapRef.current, { opacity: 0, scale: 0.94 });
    gsap.set([nameGhostCyanRef.current, nameGhostMagentaRef.current], { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });
    introTlRef.current = tl;

    // 0–2s: pure black beat, then quote glitches in character by character
    tl.to(quoteWrapRef.current, { opacity: 1, duration: 0.3 }, 0.5)
      .to(
        quoteChars,
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          filter: "blur(0px)",
          duration: 0.45,
          stagger: 0.02,
          ease: "power3.out",
        },
        "<"
      )
      .to(quoteSubRef.current, { opacity: 1, duration: 0.4 }, "-=0.15")
      // brief shudder for a scanline-glitch feel
      .to(quoteWrapRef.current, { x: -2, duration: 0.05, repeat: 3, yoyo: true, ease: "power1.inOut" }, "-=0.2")

      // ~3s: quote dissolves into particles
      .to(
        quoteChars,
        { opacity: 0, y: -10, scale: 0.8, filter: "blur(10px)", duration: 0.45, stagger: 0.012, ease: "power2.in" },
        "+=0.4"
      )
      .to(quoteSubRef.current, { opacity: 0, duration: 0.3 }, "<")
      .set(quoteWrapRef.current, { opacity: 0 })

      // energy sweep line across the full screen
      .set(sweepRef.current, { opacity: 1 })
      .to(sweepRef.current, { xPercent: 120, duration: 0.6, ease: "power4.inOut" })
      .to(sweepRef.current, { opacity: 0, duration: 0.2 }, "-=0.1")

      // name assembles from particles + chromatic-aberration ghosts + camera zoom/shake
      .to(nameWrapRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, "-=0.35")
      .to(
        nameChars,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.04, ease: "back.out(1.6)" },
        "<"
      )
      .fromTo(
        nameGhostCyanRef.current,
        { opacity: 0.7, x: -3 },
        { opacity: 0, x: 0, duration: 0.5, ease: "power2.out" },
        "<"
      )
      .fromTo(
        nameGhostMagentaRef.current,
        { opacity: 0.7, x: 3 },
        { opacity: 0, x: 0, duration: 0.5, ease: "power2.out" },
        "<"
      )
      .to(containerRef.current, { scale: 1.02, duration: 0.5, ease: "power2.out" }, "<")
      .to(containerRef.current, { x: 3, duration: 0.045, repeat: 5, yoyo: true, ease: "power1.inOut" }, "<+0.05")
      .to(containerRef.current, { scale: 1, duration: 0.4, ease: "power2.inOut" }, "-=0.1")

      // subtitles glitch briefly then stabilize, as one flowing row
      .to(subtitleRowRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.1")
      .fromTo(
        subtitles,
        { opacity: 0, x: -4, filter: "blur(3px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.3, stagger: 0.12, ease: "steps(3)" },
        "<"
      )

      // final tagline
      .to(finalLineRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "+=0.15")
      .to(progressGroupRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  // Exit: waits for the intro timeline to finish so nothing gets cut mid-beat,
  // then fades the whole scene and wipes it away.
  useEffect(() => {
    if (isComplete && !hasExited.current) {
      hasExited.current = true;

      const startExit = () => {
        const tl = gsap.timeline({ onComplete: onFinished });
        tl.to(barFillRef.current, { scaleX: 1, duration: 0.3, ease: "power2.out" })
          .to(
            [
              quoteWrapRef.current,
              nameWrapRef.current,
              subtitleRowRef.current,
              finalLineRef.current,
              progressGroupRef.current,
            ],
            { opacity: 0, y: -12, duration: 0.4, ease: "power2.in" },
            "-=0.1"
          )
          .to(
            containerRef.current,
            { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "power4.inOut" },
            "-=0.05"
          );
      };

      const intro = introTlRef.current;
      if (intro && intro.isActive()) {
        intro.eventCallback("onComplete", startExit);
      } else {
        startExit();
      }
    }
  }, [isComplete, onFinished]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050608]"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Full-viewport ambience: rain + dust */}
      <canvas ref={rainCanvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />

      {/* Rich glowing gradients that match the home page palette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 40% 25%, rgba(248,205,113,0.16), transparent 22%), radial-gradient(circle at 75% 20%, rgba(56,189,248,0.14), transparent 20%), radial-gradient(circle at 80% 80%, rgba(79,70,229,0.12), transparent 22%), radial-gradient(circle at 50% 110%, rgba(0,0,0,0.95), #000 82%)",
        }}
        aria-hidden
      />

      {/* Scanline distortion overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 2px, transparent 4px)",
        }}
        aria-hidden
      />

      {/* Energy sweep line for the transition beat between quote and name */}
      <div
        ref={sweepRef}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(248,205,113,0.25), rgba(255,255,255,0.9), rgba(56,189,248,0.25), transparent)",
          filter: "blur(2px)",
        }}
        aria-hidden
      />

      {/* Content sits directly on the black canvas — no card, no box */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-10 px-6 text-center">
        {/* Japanese quote */}
        <div ref={quoteWrapRef} className="flex flex-col items-center gap-3 opacity-0">
          <p
            ref={quoteCharsWrapRef}
            className="text-lg sm:text-2xl"
            style={{ fontFamily: "'Noto Sans JP', sans-serif", color: "#f8fafc" }}
          >
            {"「すべての偉大なシステムは、一つの好奇心から始まる。」".split("").map((ch, i) => (
              <span key={i} className="q-char inline-block" style={{ whiteSpace: ch === " " ? "pre" : "normal" }}>
                {ch}
              </span>
            ))}
          </p>
          <p ref={quoteSubRef} className="text-sm italic text-white/70 sm:text-base opacity-0">
            Every great system begins with a single curiosity.
          </p>
        </div>

        {/* Name reveal with self-contained chromatic-aberration ghosts (no external CSS dependency) */}
        <div ref={nameWrapRef} className="relative flex flex-col items-center gap-6 opacity-0">
          <div className="relative">
            <div
              ref={nameGhostCyanRef}
              className="pointer-events-none absolute inset-0 select-none opacity-0 text-4xl font-bold tracking-[0.08em] sm:text-6xl md:text-7xl"
              style={{ color: "rgba(255,255,255,0.15)", mixBlendMode: "screen" }}
              aria-hidden
            />
            <div
              ref={nameGhostMagentaRef}
              className="pointer-events-none absolute inset-0 select-none opacity-0 text-4xl font-bold tracking-[0.08em] sm:text-6xl md:text-7xl"
              style={{ color: "rgba(255,255,255,0.1)", mixBlendMode: "screen" }}
              aria-hidden
            />
            <div
              ref={nameCharsWrapRef}
              className="relative font-display text-4xl font-black uppercase tracking-[0.22em] text-white sm:text-6xl md:text-7xl"
              style={{ textShadow: "0 0 24px rgba(56,189,248,0.55), 0 0 60px rgba(56,189,248,0.25)" }}
            >
              {NAME.split("").map((ch, i) => (
                <span key={i} className="n-char inline-block" style={{ whiteSpace: ch === " " ? "pre" : "normal" }}>
                  {ch}
                </span>
              ))}
            </div>
          </div>

          {/* Subtitles as a single flowing row instead of a stacked block */}
          <div
            ref={subtitleRowRef}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm"
          >
            {["Data Analyst", "Business Intelligence", "Power BI Developer"].map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                <span
                  ref={(el) => {
                    subtitleRefs.current[i] = el;
                  }}
                >
                  {role}
                </span>
                {i < 2 && <span className="text-white/30">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Final tagline */}
        <p ref={finalLineRef} className="text-base italic text-white/80 sm:text-lg opacity-0">
          The Future Has Already Begun.
        </p>

        {/* Minimal HUD-style progress, no card/box around it */}
        <div ref={progressGroupRef} className="flex w-full max-w-xs flex-col items-center gap-3 opacity-0">
          <div className="flex items-baseline gap-1 font-mono text-white">
            <span ref={counterRef} className="text-2xl font-semibold tabular-nums">
              00
            </span>
            <span className="text-xs uppercase text-white/60">%</span>
          </div>
          <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <div
              ref={barFillRef}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-white/90 to-white/50"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}