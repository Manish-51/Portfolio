import { Suspense, lazy, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useSectionScrollProgress } from "../../hooks/useSectionScrollProgress";
import { projectsData } from "../../data/projects";
import type { ProjectCategory } from "../../types";
import ProjectHighlights from "./ProjectHighlights";

const Section3DScene = lazy(() => import("../three/Section3DScene"));

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "Data Analytics",
  "Finance & Trading",
  "AI / ML",
  "Web App",
  "Mobile",
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useSectionScrollProgress(sectionRef);

  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>(
    "All"
  );
  const gridRef = useScrollReveal<HTMLDivElement>(".project-card", {
    y: 40,
    stagger: 0.08,
  });

  const filtered = useMemo(() => {
    if (activeCategory === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      <Suspense fallback={null}>
        <Section3DScene section="projects" progress={progress} />
      </Suspense>

      <div className="mx-auto max-w-6xl px-6 pb-32 pt-32 relative z-10">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects That Turned Learning Into Shipping"
          description="A mix of structured SQL datasets, Python-driven analytics, and Power BI dashboards — each one engineered to solve real-world problems and be genuinely used."
        />
      </div>

      {/* Visual Highlights carousel — full-bleed, outside inner padding */}
      <ProjectHighlights />

      <div className="mx-auto max-w-6xl px-6 pb-32 relative z-10">

        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`focus-ring rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? "border-amber-400 bg-amber-400/15 text-amber-400 shadow-[0_0_15px_rgba(232,184,114,0.2)]"
                  : "border-ivory-100/15 text-ivory-100/60 hover:border-ivory-100/40 hover:text-ivory-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="mt-12 grid gap-6 md:grid-cols-2">
          {filtered.map((project) => (
            <TiltCard key={project.id} dataCursor="PROJECT" className="project-card rounded-2xl">
              <article
                id={project.id}
                className={`group relative h-full overflow-hidden rounded-2xl border border-ivory-100/10 bg-gradient-to-br ${project.accent} p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/50 hover:shadow-[0_25px_60px_rgba(232,184,114,0.12)]`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/10 via-transparent to-emerald-400/10 opacity-0 transition duration-500 ease-out group-hover:opacity-100" />
                <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-amber-400/20 blur-3xl opacity-0 transition duration-500 ease-out group-hover:opacity-100" />
                <div className="absolute -left-10 -top-10 h-20 w-20 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition duration-500 ease-out group-hover:opacity-100" />

                
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-widest text-ivory-100/50">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-ivory-100/40">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl group-hover:text-amber-300 transition-colors duration-300">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ivory-100/70">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-ivory-100/15 bg-obsidian-950/40 px-3 py-1 text-xs text-ivory-100/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.links && (
                      <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest">
                        {project.links.live && (
                          <Link
                            to={project.links.live}
                            data-cursor="LIVE"
                            className="focus-ring rounded text-amber-400 hover:underline font-semibold"
                          >
                            Open project →
                          </Link>
                        )}
                        {project.media?.some((item) => item.type === "file") && (
                          <a
                            href={project.media?.find((item) => item.type === "file")?.src}
                            download={project.media?.find((item) => item.type === "file")?.src.split("/").pop()}
                            rel="noopener noreferrer"
                            data-cursor="DOWNLOAD"
                            className="focus-ring rounded text-emerald-300 hover:text-emerald-200 hover:underline"
                          >
                            Download PBIX →
                          </a>
                        )}
                        {project.links.repo && (
                          <a
                            href={project.links.repo}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="CODE"
                            className="focus-ring rounded text-ivory-100/60 hover:text-ivory-100 hover:underline"
                          >
                            Source →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-ivory-100/50">
            No projects in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
