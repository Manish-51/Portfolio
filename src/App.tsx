import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingScreen from "./components/loader/LoadingScreen";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/ui/CustomCursor";
import PageTransition from "./components/transitions/PageTransition";
import SinglePageStack from "./components/SinglePageStack";
import Journey from "./components/sections/Journey";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import ProjectDetail from "./components/sections/ProjectDetail";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";

function AppShell() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        <PageTransition>
          <Routes>
            <Route path="/" element={<SinglePageStack />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <div className="grain" aria-hidden />
    </BrowserRouter>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-amber-400 focus:px-4 focus:py-2 focus:text-obsidian-950"
      >
        Skip to content
      </a>
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
      <div
        className={`transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={loading}
      >
        <AppShell />
      </div>
    </ThemeProvider>
  );
}
