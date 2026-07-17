import { Suspense, lazy, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../../lib/gsapConfig";
import Button from "../ui/Button";

// Three.js + React Three Fiber are the heaviest dependencies in the bundle.
// Loading the hero scene lazily keeps the initial JS payload small and lets
// the rest of the page become interactive immediately.
const HeroScene = lazy(() => import("../three/HeroScene"));
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { projectsData } from "../../data/projects";

const STRENGTHS = [
  {
    title: "Analytics-First Thinking",
    body: "Every project starts from the data — CSV to insight to a dashboard someone can actually act on.",
  },
  {
    title: "Full-Stack Craft",
    body: "From Django backends to animated React front-ends, I ship the whole slice, not just a layer.",
  },
  {
    title: "Portfolio-Driven Learning",
    body: "Coursework becomes artifacts — reports, dashboards, and apps — not just grades.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useScrollReveal<HTMLDivElement>();
  const strengthsRef = useScrollReveal<HTMLDivElement>();
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

        <div className="relative z-10 mx-auto max-w-4xl">
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
              <span className="hero-word gradient-text inline-block italic">
                Craft.
              </span>
            </span>
          </h1>
          <p className="hero-sub mt-8 max-w-xl text-lg text-ivory-100/60">
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

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div ref={strengthsRef} className="grid gap-8 md:grid-cols-3">
          {STRENGTHS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-ivory-100/10 bg-obsidian-900/40 p-8 transition-colors duration-300 hover:border-amber-400/40"
            >
              <h3 className="font-display text-xl text-amber-400">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory-100/60">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-4xl">Selected Work</h2>
          <Link
            to="/projects"
            className="focus-ring rounded font-mono text-xs uppercase tracking-widest text-amber-400 hover:underline"
          >
            All Projects →
          </Link>
        </div>
        <div ref={featuredRef} className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-2xl border border-ivory-100/10 bg-gradient-to-br ${project.accent} p-8 transition-transform duration-500 hover:-translate-y-1`}
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
          ))}
        </div>
      </section>
    </div>
  );
}
