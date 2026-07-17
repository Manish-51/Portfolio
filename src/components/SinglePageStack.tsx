import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "./sections/Home";
import Journey from "./sections/Journey";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function SinglePageStack() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      scrollToHash(location.hash);
    }
  }, [location.hash]);

  return (
    <div
      id="fullpage-stack"
      className="w-full snap-y snap-mandatory scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <section id="home" className="min-h-screen snap-start scroll-mt-20">
        <Home />
      </section>

      <section id="journey" className="min-h-screen snap-start scroll-mt-20">
        <Journey />
      </section>

      <section id="skills" className="min-h-screen snap-start scroll-mt-20">
        <Skills />
      </section>

      <section id="projects" className="min-h-screen snap-start scroll-mt-20">
        <Projects />
      </section>

      <section id="certifications" className="min-h-screen snap-start scroll-mt-20">
        <Certifications />
      </section>

      <section id="contact" className="min-h-screen snap-start scroll-mt-20">
        <Contact />
      </section>
    </div>
  );
}
