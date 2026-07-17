import { useMemo, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { skillsData } from "../../data/skills";
import type { SkillCategory } from "../../types";

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
    <div className="mx-auto max-w-6xl px-6 pb-32 pt-32">
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
            className={`focus-ring rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors duration-300 ${
              activeCategory === cat
                ? "border-amber-400 bg-amber-400/10 text-amber-400"
                : "border-ivory-100/15 text-ivory-100/60 hover:border-ivory-100/40"
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
          <div
            key={skill.id}
            className="skill-card group relative rounded-2xl border border-ivory-100/10 bg-obsidian-900/40 p-6 transform-gpu transition-transform duration-300 ease-out hover:scale-105 focus:scale-105 hover:border-emerald-400/40"
          >
            <div className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 transition-opacity duration-400 group-hover:opacity-100 pulse-glow" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-obsidian-800 font-mono text-xs text-amber-400">
                  {skill.icon}
                </span>
                <span className="font-medium">{skill.name}</span>
              </div>
              <span className="font-mono text-xs text-ivory-100/40">
                {skill.proficiency}%
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-obsidian-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-1000 ease-out"
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}
