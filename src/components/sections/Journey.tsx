import SectionHeading from "../ui/SectionHeading";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { journeyData } from "../../data/journey";

export default function Journey() {
  const timelineRef = useScrollReveal<HTMLDivElement>(".timeline-item", {
    y: 60,
    stagger: 0.15,
  });

  return (
    <div className="mx-auto max-w-5xl px-6 pb-32 pt-32">
      <SectionHeading
        eyebrow="The Path So Far"
        title="A Journey Built On Momentum"
        description="From first-semester foundations to analyzing complex datasets with Python, SQL, and Power BI — here's how the story has unfolded so far."
      />

      <div ref={timelineRef} className="relative mt-16">
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-500 via-ivory-100/20 to-emerald-400/40 md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="flex flex-col gap-12">
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
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-amber-400 bg-obsidian-950 md:left-auto"
                  style={
                    isEven
                      ? { right: "-1.9rem" }
                      : { left: "-1.9rem" }
                  }
                />
                <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
                  {milestone.year}
                </span>
                <h3 className="font-display text-2xl">{milestone.title}</h3>
                <p className="text-sm font-medium text-emerald-400">
                  {milestone.organization}
                </p>
                <p className="text-sm leading-relaxed text-ivory-100/60">
                  {milestone.description}
                </p>
                <div
                  className={`flex flex-wrap gap-2 ${
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
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
