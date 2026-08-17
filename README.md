# Cinematic Developer Portfolio

A premium, cinematic portfolio built with **React + TypeScript + Tailwind CSS + GSAP + React Three Fiber (Three.js)**.

## Features

- Fully animated loading screen with real asset/font preloading and a clip-path reveal transition
- Interactive 3D hero (rotating wireframe icosahedron + orbiting particle field) built with React Three Fiber, with a static fallback for `prefers-reduced-motion`
- Six routed sections: **Home, Journey, Skills, Projects, Certifications, Contact**
- Scroll-triggered GSAP + ScrollTrigger reveal animations throughout
- GSAP-powered route transitions
- Responsive navbar with an animated mobile drawer menu
- Dark/light theme toggle with `localStorage` persistence and system-preference detection
- Working, validated contact form (client-side validation + simulated async submit — swap in a real endpoint any time)
- Project and certification filtering by category
- Custom cursor (auto-disabled on touch devices)
- Accessible: skip-to-content link, visible focus rings, semantic landmarks, `aria-live`/`aria-selected` where relevant, reduced-motion support

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    layout/        Navbar, Footer
    loader/         LoadingScreen
    three/          HeroScene (React Three Fiber)
    transitions/     PageTransition
    ui/              Button, SectionHeading, ThemeToggle, CustomCursor
    sections/        Home, Journey, Skills, Projects, Certifications, Contact
  context/          ThemeContext
  data/             journey.ts, skills.ts, projects.ts, certifications.ts
  hooks/            useScrollReveal, useAssetPreloader, useContactForm, useMediaQuery
  lib/              gsapConfig.ts (centralized GSAP/ScrollTrigger registration)
  types/            shared TypeScript interfaces
```

## Personalizing Content

All copy lives in `src/data/*.ts` — edit those files to update your journey, skills,
projects, and certifications without touching component code. Contact details live
directly in `src/components/sections/Contact.tsx`.

## Connecting the Contact Form to a Real Backend

`src/hooks/useContactForm.ts` currently simulates a network request. Replace the
`setTimeout` block with a real `fetch` call to your endpoint of choice (Formspree,
a serverless function, your own API, etc).

## Notes

- 3D scene and heavier animations gracefully degrade under `prefers-reduced-motion`.
- All colors/spacing are driven by the Tailwind config (`tailwind.config.ts`) — tweak
  the `obsidian`, `ivory`, `amber`, and `emerald` palettes to restyle the whole site.
