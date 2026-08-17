import { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../../data/projects";

export default function ProjectHighlights() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_WIDTH = 380; // px - approximate card + gap

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? CARD_WIDTH : -CARD_WIDTH, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  };

  return (
    <div className="relative py-20">
      {/* Header row */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-amber-400 block mb-3">
              Visual Highlights
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Project Highlights.
            </h2>
          </div>

          {/* Arrow controls */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll projects left"
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                canScrollLeft
                  ? "border-ivory-100/30 text-ivory-100 hover:border-amber-400 hover:text-amber-400"
                  : "border-ivory-100/10 text-ivory-100/20 cursor-not-allowed"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M11 14L6 9L11 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll projects right"
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                canScrollRight
                  ? "border-ivory-100/30 text-ivory-100 hover:border-amber-400 hover:text-amber-400"
                  : "border-ivory-100/10 text-ivory-100/20 cursor-not-allowed"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable cards strip — bleeds to edges */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-5 overflow-x-auto scroll-smooth px-6 pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: "max(1.5rem, calc((100vw - 72rem) / 2))",
          paddingRight: "max(1.5rem, calc((100vw - 72rem) / 2))",
        }}
      >
        {projectsData.map((project) => (
          <Link
            key={project.id}
            to={project.links?.live ?? "#"}
            className="group flex-shrink-0 w-[340px] md:w-[370px] rounded-2xl overflow-hidden border border-ivory-100/10 hover:border-amber-400/60 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(232,184,114,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label={`View ${project.title}`}
          >
            {/* White logo panel */}
            <div className="relative bg-white flex items-center justify-center h-52 overflow-hidden">
              {project.logo ? (
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="w-48 h-28 object-contain transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span className="text-obsidian-950/30 font-display text-2xl">
                  {project.title}
                </span>
              )}

              {/* Tech stack pills overlay at bottom of white panel */}
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-obsidian-950 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-ivory-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card info */}
            <div className="bg-obsidian-950 px-5 py-4 border-t border-ivory-100/10">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block mb-1.5">
                {project.category}
              </span>
              <h3 className="font-display text-lg leading-snug text-ivory-100 group-hover:text-amber-300 transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
