import { Suspense, lazy, useRef } from "react";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useSectionScrollProgress } from "../../hooks/useSectionScrollProgress";
import { journeyData } from "../../data/journey";

const Section3DScene = lazy(() => import("../three/Section3DScene"));

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useSectionScrollProgress(sectionRef);

  const timelineRef = useScrollReveal<HTMLOListElement>(".timeline-item", {
    y: 60,
    stagger: 0.15,
  });

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      <Suspense fallback={null}>
        <Section3DScene section="journey" progress={progress} />
      </Suspense>

      <div className="mx-auto max-w-5xl px-6 pb-32 pt-32 relative z-10">
        <SectionHeading
          eyebrow="The Path So Far"
          title="A Journey Built On Momentum"
          description="From first-semester foundations to analyzing complex datasets with Python, SQL, and Power BI — here's how the story has unfolded so far."
        />

        <div className="relative mt-16">
          {/* Base timeline axis */}
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-500/40 via-ivory-100/10 to-emerald-400/30 md:left-1/2 md:-translate-x-1/2"
          />

          {/* Dynamic Scroll-Driven Yellow Laser Light Beam */}
          <div
            aria-hidden
            className="absolute left-[7px] top-2 w-[3px] -translate-x-[1px] bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500 shadow-[0_0_18px_#e8b872] transition-all duration-75 ease-out rounded-full md:left-1/2 md:-translate-x-1/2"
            style={{
              height: `${progress * 100}%`,
              maxHeight: "99.5%",
            }}
          >
            {/* Glowing tip head that dynamically travels down with scroll */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-3.5 w-3.5 rounded-full bg-amber-300 shadow-[0_0_20px_#e8b872] border-2 border-white animate-pulse" />
          </div>

          <ol ref={timelineRef} className="flex flex-col gap-12">
            {journeyData.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <li
                  key={milestone.id}
                  className={`timeline-item relative flex flex-col gap-4 pl-8 md:w-1/2 md:pl-0 ${
                    isEven ? "md:mr-auto md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-amber-400 bg-obsidian-950 shadow-[0_0_12px_#e8b872] md:left-auto z-20"
                    style={
                      isEven
                        ? { right: "-1.9rem" }
                        : { left: "-1.9rem" }
                    }
                  />

                  <TiltCard dataCursor="MILESTONE" className="rounded-2xl">
                    <div className="rounded-2xl border border-ivory-100/10 bg-obsidian-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:bg-obsidian-900/80">
                      <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
                        {milestone.year}
                      </span>
                      <h3 className="mt-1 font-display text-2xl">{milestone.title}</h3>
                      <p className="mt-1 text-sm font-medium text-emerald-400">
                        {milestone.organization}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ivory-100/60">
                        {milestone.description}
                      </p>
                      <div
                        className={`mt-4 flex flex-wrap gap-2 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        {milestone.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-ivory-100/15 px-3 py-1 text-xs text-ivory-100/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
