import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { useContactForm } from "../../hooks/useContactForm";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const CONTACT_DETAILS = [
  { label: "Email", value: "maitimanish1924@gmail.com", href: "mailto:maitimanish1924@gmail.com" },
  { label: "Location", value: "Barasat, West Bengal, India" },
  { label: "Availability", value: "Open to internships & freelance analytics work" },
];

export default function Contact() {
  const { values, errors, status, errorMessage, handleChange, handleSubmit, reset } =
    useContactForm();
  const layoutRef = useScrollReveal<HTMLDivElement>(":scope > *", {
    y: 30,
    stagger: 0.15,
  });

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  return (
    <div className="mx-auto max-w-5xl px-6 pb-32 pt-32">
      <SectionHeading
        eyebrow="Let's Talk"
        title="Have A Project Or Opportunity In Mind?"
        description="Whether it's a data analytics role, a freelance dashboard, or just a technical chat — I'd love to hear from you."
      />

      <div ref={layoutRef} className="mt-14 grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-8">
          {CONTACT_DETAILS.map((item) => (
            <div key={item.label}>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
                {item.label}
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  className="focus-ring mt-2 block rounded text-lg text-ivory-100 hover:text-emerald-400"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 text-lg text-ivory-100">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-ivory-100/10 bg-obsidian-900/40 p-8">
          {isSuccess ? (
            <div className="flex flex-col items-start gap-4 py-10">
              <span className="font-display text-2xl text-emerald-400">
                Message sent.
              </span>
              <p className="text-sm text-ivory-100/60">
                Thanks for reaching out — I'll get back to you soon.
              </p>
              <Button variant="outline" onClick={reset}>
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-ivory-100/50">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="focus-ring mt-2 w-full rounded-lg border border-ivory-100/15 bg-obsidian-950 px-4 py-3 text-sm outline-none transition-colors focus:border-amber-400"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-ivory-100/50">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="focus-ring mt-2 w-full rounded-lg border border-ivory-100/15 bg-obsidian-950 px-4 py-3 text-sm outline-none transition-colors focus:border-amber-400"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="mobile" className="text-xs font-mono uppercase tracking-widest text-ivory-100/50">
                  Mobile
                </label>
                <input
                  id="mobile"
                  type="tel"
                  value={values.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                  aria-invalid={Boolean(errors.mobile)}
                  aria-describedby={errors.mobile ? "mobile-error" : undefined}
                  className="focus-ring mt-2 w-full rounded-lg border border-ivory-100/15 bg-obsidian-950 px-4 py-3 text-sm outline-none transition-colors focus:border-amber-400"
                  placeholder="+91 12345 67890"
                />
                {errors.mobile && (
                  <p id="mobile-error" className="mt-1 text-xs text-red-400">
                    {errors.mobile}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="text-xs font-mono uppercase tracking-widest text-ivory-100/50">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={values.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className="focus-ring mt-2 w-full rounded-lg border border-ivory-100/15 bg-obsidian-950 px-4 py-3 text-sm outline-none transition-colors focus:border-amber-400"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1 text-xs text-red-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-ivory-100/50">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="focus-ring mt-2 w-full resize-none rounded-lg border border-ivory-100/15 bg-obsidian-950 px-4 py-3 text-sm outline-none transition-colors focus:border-amber-400"
                  placeholder="Tell me a bit about the project or opportunity..."
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="mt-2 w-full disabled:opacity-60">
                {isSubmitting ? "Sending…" : "Send Message"}
              </Button>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
