import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

interface NavItem {
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "Journey", id: "journey" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 24);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (id: string) => {
    const scrollToSection = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: `#${id}` });
    } else {
      scrollToSection();
      window.history.replaceState(null, "", `/#${id}`);
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] w-full bg-obsidian-950 border-b border-ivory-100/10 shadow-lg shadow-black/30 transition-all duration-500 md:bg-transparent md:border-none md:shadow-none">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <button
          type="button"
          className="font-display text-lg tracking-wide text-ivory-100 focus-ring rounded"
          onClick={() => {
            handleNavClick("home");
            setMenuOpen(false);
          }}
        >
          Manish<span className="text-amber-400"> </span>Maiti
        </button>

        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="focus-ring relative rounded px-1 text-sm transition-colors duration-300 text-ivory-100/70 hover:text-amber-400 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-amber-400 after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        <button
          className="focus-ring md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`block h-px w-6 bg-ivory-100 transition-transform duration-300 ${
              menuOpen ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ivory-100 transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-px w-6 bg-ivory-100 transition-transform duration-300 ${
              menuOpen ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <button
          type="button"
          className="md:hidden fixed inset-0 z-40 bg-black/70"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div
        className={`md:hidden fixed inset-y-0 right-0 z-50 w-4/5 max-w-sm bg-obsidian-950/95 shadow-2xl shadow-black/40 transition-transform duration-500 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between overflow-hidden">
          <ul className="flex flex-col gap-3 p-8 pt-10 font-display text-3xl">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item.id}
                style={{ transitionDelay: `${i * 40}ms` }}
                className={`transition-all duration-500 ${
                  menuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="focus-ring block w-full rounded-lg py-3 px-4 text-left text-2xl text-ivory-100 transition hover:bg-white/5"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="p-8 pt-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
