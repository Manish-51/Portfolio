import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import { projectsData } from "../../data/projects";

export default function ProjectDetail() {
  const { id } = useParams();

  const project = useMemo(
    () => projectsData.find((item) => item.id === id),
    [id]
  );

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-6 pb-32 pt-32">
        <SectionHeading
          eyebrow="Project not found"
          title="No matching project"
          description="The project you tried to open does not exist. Please select another project from the list."
        />
        <div className="mt-10 text-center">
          <Link
            to="/projects"
            className="focus-ring inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/20"
          >
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-32 pt-32">
      <SectionHeading
        eyebrow="Project Detail"
        title={project.title}
        description={project.summary}
      />

      <div className="mt-10 rounded-3xl border border-ivory-100/10 bg-obsidian-900/80 p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-400/80">
              {project.category}
            </p>
            <p className="mt-2 text-sm text-ivory-100/70">{project.year}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tech) => (
              <span
                key={`${project.id}-${tech}`}
                className="rounded-full border border-ivory-100/15 bg-ivory-100/5 px-3 py-1 text-[11px] text-ivory-100/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-ivory-100/70">
          {project.description}
        </p>

        {project.media && (
          <div className="mt-8 space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-400/80">
              Project previews
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              {project.media
                .filter((item) => item.type !== "file")
                .map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-3xl border border-ivory-100/10 bg-black/20"
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt={item.alt ?? item.label}
                        className="h-72 w-full object-cover"
                      />
                    ) : (
                      <video
                        controls
                        src={item.src}
                        className="h-72 w-full bg-black object-cover"
                      />
                    )}
                    <div className="border-t border-ivory-100/10 bg-obsidian-950/80 px-4 py-3 text-xs text-ivory-100/70">
                      {item.label}
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.media
                .filter((item) => item.type === "file")
                .map((item) => (
                  <a
                    key={item.id}
                    href={item.src}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex items-center rounded-full border border-ivory-100/15 bg-obsidian-900/80 px-4 py-2 text-xs font-semibold text-amber-300 transition hover:border-amber-400/40"
                  >
                    {item.label}
                  </a>
                ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="focus-ring inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/20"
          >
            Back to all projects
          </Link>
          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex rounded-full border border-ivory-100/15 bg-obsidian-900/80 px-5 py-3 text-sm font-semibold text-ivory-100/80 transition hover:border-amber-400/40"
            >
              View source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
