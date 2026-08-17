import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "./sections/Home";
import Journey from "./sections/Journey";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";

function scrollToHash(hash: string, smooth = true) {
  const id = hash.replace(/^#/, "");
  if (!id) return;
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: smooth ? "smooth" : "instant",
    });
  }
}

export default function SinglePageStack() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Immediate attempt
      requestAnimationFrame(() => {
        scrollToHash(location.hash, true);
      });
      // Second attempt after 120ms to account for asynchronous 3D canvas and dynamic layouts
      const timer = setTimeout(() => {
        scrollToHash(location.hash, true);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <div
      id="fullpage-stack"
      className="w-full"
    >
      <section id="home" className="min-h-screen scroll-mt-24">
        <Home />
      </section>

      <section id="journey" className="min-h-screen scroll-mt-24">
        <Journey />
      </section>

      <section id="skills" className="min-h-screen scroll-mt-24">
        <Skills />
      </section>

      <section id="projects" className="min-h-screen scroll-mt-24">
        <Projects />
      </section>

      <section id="certifications" className="min-h-screen scroll-mt-24">
        <Certifications />
      </section>

      <section id="contact" className="min-h-screen scroll-mt-24">
        <Contact />
      </section>
    </div>
  );
}
