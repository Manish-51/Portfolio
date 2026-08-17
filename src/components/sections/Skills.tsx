import { Suspense, lazy, useMemo, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { skillsData } from "../../data/skills";
import type { SkillCategory } from "../../types";

const Section3DScene = lazy(() => import("../three/Section3DScene"));

const CATEGORIES: (SkillCategory | "All")[] = [
  "All",
  "Languages",
  "Data & BI",
  "Frontend",
  "Backend",
  "Tools & Cloud",
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>(
    "All"
  );
  const gridRef = useScrollReveal<HTMLDivElement>(".skill-card", {
    y: 30,
    stagger: 0.06,
  });

  const filtered = useMemo(() => {
    if (activeCategory === "All") return skillsData;
    return skillsData.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="relative overflow-hidden">
      <Suspense fallback={null}>
        <Section3DScene section="skills" />
      </Suspense>
      <div className="mx-auto max-w-6xl px-6 pb-32 pt-32 relative z-10">
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills Sharpened Through Real Projects"
          description="Every skill below has shipped in something real — a dashboard, a bot, an app — not just a tutorial."
        />

        <div
          role="tablist"
          aria-label="Filter skills by category"
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

        <div
          ref={gridRef}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((skill) => (
            <TiltCard key={skill.id} dataCursor="SKILL" className="skill-card rounded-2xl">
              <div className="group relative rounded-2xl border border-ivory-100/10 bg-obsidian-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/40 hover:bg-obsidian-900/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-obsidian-950/80 p-2 border border-ivory-100/15 shadow-md group-hover:border-amber-400/50 group-hover:shadow-amber-400/10 transition-all duration-300">
                      {skill.iconUrl ? (
                        <img
                          src={skill.iconUrl}
                          alt={`${skill.name} logo`}
                          className="h-full w-full object-contain filter transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerText = skill.icon;
                              parent.className =
                                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-obsidian-950/80 font-mono text-xs font-bold text-amber-400 border border-amber-400/30";
                            }
                          }}
                        />
                      ) : (
                        <span className="font-mono text-xs font-bold text-amber-400">
                          {skill.icon}
                        </span>
                      )}
                    </span>
                    <span className="font-medium text-ivory-100 group-hover:text-amber-400 transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-ivory-100/40 group-hover:text-emerald-400 transition-colors duration-300">
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-obsidian-800">
                  <div
                    className="h-full rounded-full shimmer-bar transition-all duration-1000 ease-out"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
