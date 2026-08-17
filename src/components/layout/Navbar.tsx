import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

interface NavItem {
  label: string;
  id: string;
  num: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "home", num: "01" },
  { label: "Journey", id: "journey", num: "02" },
  { label: "Skills", id: "skills", num: "03" },
  { label: "Projects", id: "projects", num: "04" },
  { label: "Certifications", id: "certifications", num: "05" },
  { label: "Contact", id: "contact", num: "06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll detection & Active section observer
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section plotting detection
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      const sectionIds = NAV_ITEMS.map((item) => item.id);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element) {
          const top = element.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 30);
  }, [location.pathname, location.hash]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.body.style.overflow = "";

    const scrollToSection = () => {
      const target = document.getElementById(id);
      if (target) {
        const headerOffset = 84;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    setTimeout(() => {
      if (location.pathname !== "/") {
        navigate({ pathname: "/", hash: `#${id}` });
      } else {
        scrollToSection();
        window.history.replaceState(null, "", `/#${id}`);
      }
    }, 80);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[9999] w-full bg-[#07080b] border-b border-ivory-100/10 shadow-xl shadow-black/70 transition-all duration-300 ${
        scrolled ? "py-3.5" : "py-4.5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Brand / Logo */}
        <button
          type="button"
          className="group flex items-center gap-2.5 focus-ring rounded"
          onClick={() => handleNavClick("home")}
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <span className="font-display text-xl tracking-tight text-ivory-100 group-hover:text-amber-400 transition-colors duration-300">
            Manish<span className="text-amber-400 font-bold">.</span>Maiti
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-ivory-100/10 bg-obsidian-900/60 p-1.5 shadow-inner backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`focus-ring relative flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-amber-400/15 text-amber-400 font-semibold border border-amber-400/30 shadow-[0_0_15px_rgba(232,184,114,0.18)]"
                    : "text-ivory-100/60 hover:text-ivory-100 hover:bg-white/5"
                }`}
              >
                <span className={`text-[0.65rem] ${isActive ? "text-amber-400" : "text-ivory-100/30"}`}>
                  {item.num}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Action & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => handleNavClick("contact")}
            className="focus-ring rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-amber-400 transition-all duration-300 hover:bg-amber-400 hover:text-obsidian-950 hover:shadow-[0_0_20px_rgba(232,184,114,0.35)]"
          >
            Get In Touch
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-ivory-100/15 bg-obsidian-900/80 text-ivory-100"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <div className="relative flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded bg-ivory-100 transition-transform duration-300 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded bg-ivory-100 transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded bg-ivory-100 transition-transform duration-300 ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop & Drawer */}
      {menuOpen && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-[10001] w-full sm:w-4/5 max-w-sm border-l border-ivory-100/15 bg-[#07080b] p-8 shadow-[0_0_50px_rgba(0,0,0,0.95)] transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="mb-8 flex items-center justify-between border-b border-ivory-100/10 pb-5">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="font-mono text-xs uppercase tracking-widest text-ivory-100/50 hover:text-ivory-100"
              >
                Close ✕
              </button>
            </div>

            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <li
                    key={item.id}
                    style={{ transitionDelay: `${i * 45}ms` }}
                    className={`transition-all duration-500 ${
                      menuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`focus-ring flex w-full items-center justify-between rounded-xl px-5 py-3 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-amber-400/15 text-amber-400 font-semibold border border-amber-400/30"
                          : "text-ivory-100/70 hover:bg-white/5 hover:text-ivory-100"
                      }`}
                    >
                      <span className="font-display text-xl">{item.label}</span>
                      <span className="font-mono text-xs text-amber-400/60">{item.num}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="w-full rounded-xl border border-amber-400 bg-amber-400 py-3 text-center font-mono text-xs uppercase tracking-widest font-semibold text-obsidian-950 shadow-lg shadow-amber-400/20"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
