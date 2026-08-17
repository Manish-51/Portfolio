import { Suspense, lazy, useMemo, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { certificationsData } from "../../data/certifications";
import type { CertificationCategory } from "../../types";

const Section3DScene = lazy(() => import("../three/Section3DScene"));

const CATEGORIES: (CertificationCategory | "All")[] = [
  "All",
  "Data & Analytics",
  "Development",
  "Cloud",
  "Academic",
];

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>(
    "All"
  );
  const listRef = useScrollReveal<HTMLDivElement>(".cert-card", {
    y: 30,
    stagger: 0.08,
  });

  const filtered = useMemo(() => {
    if (activeCategory === "All") return certificationsData;
    return certificationsData.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="relative overflow-hidden">
      <Suspense fallback={null}>
        <Section3DScene section="certifications" />
      </Suspense>
      <div className="mx-auto max-w-5xl px-6 pb-32 pt-32 relative z-10">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications & Academic Standing"
          description="A mix of completed academic milestones and certifications currently in progress as part of a structured analytics roadmap."
        />

        <div
          role="tablist"
          aria-label="Filter certifications by category"
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

        <div ref={listRef} className="mt-12 flex flex-col gap-5">
          {filtered.map((cert) => (
            <TiltCard key={cert.id} dataCursor="CERT" className="cert-card rounded-2xl">
              <div className="flex flex-col gap-4 rounded-2xl border border-ivory-100/10 bg-obsidian-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:bg-obsidian-900/80 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-display text-xl">{cert.title}</h3>
                  <p className="mt-1 text-sm font-medium text-emerald-400">{cert.issuer}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-ivory-100/15 px-3 py-1 text-xs text-ivory-100/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 text-left md:items-end md:text-right">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-ivory-100/50">
                      {cert.date}
                    </span>
                    {cert.credentialId && (
                      <p className="mt-1 font-mono text-xs text-ivory-100/30">
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                  {cert.certificateUrl && (
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="VERIFY"
                      className="focus-ring inline-flex rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 transition-all hover:bg-amber-400 hover:text-obsidian-950 hover:shadow-[0_0_15px_rgba(232,184,114,0.3)]"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
