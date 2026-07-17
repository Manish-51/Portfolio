const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Manish-51" },
  { label: "LinkedIn", href: "https://linkedin.com/in/manish-maiti/" },
  { label: "Email", href: "mailto:maitimanish1924@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ivory-100/10 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl">
            Manish<span className="text-amber-400"></span>
          </p>
          <p className="mt-2 text-sm text-ivory-100/50 max-w-xs">
            BCA (Honours) student and independent builder, crafting data-driven
            products with care.
          </p>
        </div>

        <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="focus-ring rounded text-ivory-100/60 transition-colors hover:text-amber-400"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-ivory-100/30">
        © {new Date().getFullYear()} Manish Maiti Designed & built from scratch.
      </p>
    </footer>
  );
}
