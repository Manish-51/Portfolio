import { Suspense, lazy, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../../lib/gsapConfig";
import Button from "../ui/Button";
import TiltCard from "../ui/TiltCard";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { projectsData } from "../../data/projects";

const HeroScene = lazy(() => import("../three/HeroScene"));

const STRENGTHS = [
  {
    title: "Analytics-First Thinking",
    body: "Every project starts from the data — CSV to insight to a dashboard someone can actually act on.",
    icon: "📊",
  },
  {
    title: "Full-Stack Craft",
    body: "From Django backends to animated React front-ends, I ship the whole slice, not just a layer.",
    icon: "⚡",
  },
  {
    title: "Portfolio-Driven Learning",
    body: "Coursework becomes artifacts — reports, dashboards, and apps — not just grades.",
    icon: "🎓",
  },
];

const METRICS = [
  { label: "Data Projects Shipped", value: "10+" },
  { label: "BCA Semester CGPA", value: "7.7+" },
  { label: "Core Tech Stack", value: "Python · SQL · Power BI" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useScrollReveal<HTMLDivElement>();
  const strengthsRef = useScrollReveal<HTMLDivElement>();
  const metricsRef = useScrollReveal<HTMLDivElement>();
  const featured = projectsData.filter((p) => p.featured);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".hero-word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.08, ease: "power4.out", delay: 0.15 }
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.9, ease: "power3.out" }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden px-6"
      >
        <Suspense fallback={<div className="absolute inset-0 bg-radial-fade" />}>
          <HeroScene />
        </Suspense>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-950/40 to-obsidian-950" />

        <div className="relative z-10 mx-auto max-w-4xl pt-16">
          <p className="hero-sub mb-6 font-mono text-xs uppercase tracking-[0.4em] text-amber-400">
            Data Analyst | BCA (Honours) Student
          </p>
          <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
            {["Turning", "Data", "Into", "Decisions,"].map((word) => (
              <span key={word} className="reveal-mask mr-4">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
            <br />
            {["And", "Code", "Into"].map((word) => (
              <span key={word} className="reveal-mask mr-4">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
            <span className="reveal-mask">
              <span className="hero-word liquid-gradient-text inline-block italic font-semibold">
                Craft.
              </span>
            </span>
          </h1>
          <p className="hero-sub mt-8 max-w-xl text-lg text-ivory-100/60 leading-relaxed">
            I'm Manish Maiti — a BCA (Honours) student at Brainware University 
            turning raw data into strategic value through advanced Python analytics,
             robust SQL databases, and compelling Power BI visualizations.
          </p>
          <div className="hero-cta mt-10 flex flex-wrap gap-4">
            <Link to="/#projects">
              <Button variant="primary">View Projects</Button>
            </Link>
            <Link to="/#contact">
              <Button variant="outline">Get In Touch</Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ivory-100/40 animate-pulseSlow">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]">
            Scroll
          </span>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-16">
        <div
          ref={metricsRef}
          className="grid gap-6 sm:grid-cols-3 rounded-2xl border border-ivory-100/10 bg-obsidian-900/40 p-6 backdrop-blur-md"
        >
          {METRICS.map((m) => (
            <div key={m.label} className="text-center sm:text-left">
              <p className="font-display text-3xl md:text-4xl text-amber-400 font-bold">{m.value}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-ivory-100/50">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div ref={strengthsRef} className="grid gap-8 md:grid-cols-3">
          {STRENGTHS.map((s) => (
            <TiltCard key={s.title} dataCursor="INSIGHT">
              <div className="h-full rounded-2xl border border-ivory-100/10 bg-obsidian-900/40 p-8 transition-colors duration-300 hover:border-amber-400/40 hover:bg-obsidian-900/70">
                <span className="text-2xl mb-3 block">{s.icon}</span>
                <h3 className="font-display text-xl text-amber-400">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory-100/60">
                  {s.body}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-4xl">Selected Work</h2>
          <Link
            to="/#projects"
            data-cursor="ALL"
            className="focus-ring rounded font-mono text-xs uppercase tracking-widest text-amber-400 hover:underline"
          >
            All Projects →
          </Link>
        </div>
        <div ref={featuredRef} className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <TiltCard key={project.id} dataCursor="PROJECT">
              <div
                className={`group relative h-full overflow-hidden rounded-2xl border border-ivory-100/10 bg-gradient-to-br ${project.accent} p-8 transition-all duration-500 hover:border-amber-400/40`}
              >
                <span className="font-mono text-xs uppercase tracking-widest text-ivory-100/50">
                  {project.category} · {project.year}
                </span>
                <h3 className="mt-3 font-display text-2xl">{project.title}</h3>
                <p className="mt-3 text-sm text-ivory-100/70">{project.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-ivory-100/15 px-3 py-1 text-xs text-ivory-100/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>
    </div>
  );
}
