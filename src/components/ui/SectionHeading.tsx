interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
      <span className="text-xs font-mono uppercase tracking-[0.35em] text-amber-400">
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-ivory-100/60 text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
