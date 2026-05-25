# Portfolio Rebuild — Master Implementation Plan

> **Goal**: Rebuild [tomasleotefalcao.vercel.app](https://tomasleotefalcao.vercel.app/) to match the polish, interactivity, and professionalism of [itssharl.ee](https://itssharl.ee/).

---

## Decisions

| Question | Decision |
|---|---|
| Color scheme | **Near-black** dark mode, similar to itssharl.ee |
| Architecture | **Multi-page** with React Router |
| Hero | Keep **rotating titles** ("Software Engineer", "Full-Stack Everything", "Bedroom DJ") |
| Contact | Simple page with links. **Social icons persist at bottom on ALL pages** |

---

## Pages

| Page | Route | Content Summary |
|---|---|---|
| **Home** | `/` | Full-screen hero: name, rotating subtitle, MorphBlob WebGL background, CTA links → About, Projects, Experience |
| **About** | `/about` | Animated bio paragraphs (current text), tech stack tags, downloadable résumé |
| **Experience** | `/experience` | Experience timeline cards (itssharl.ee-inspired style) + Certifications grid |
| **Projects** | `/projects` | itssharl.ee/work-style: vertical project list, hover → image appears on left + description expands |
| **Contact** | `/contact` | Simple: email link + social media links prominently displayed |

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Core** | React 19 + Vite 7 | Already in place, modern, fast HMR |
| **Routing** | react-router-dom v7 | Multi-page with animated transitions |
| **Animation** | GSAP 3 + @gsap/react | Industry-standard timeline animation, ScrollTrigger for scroll-based reveals |
| **Smooth Scroll** | Lenis | Buttery smooth scroll, integrates with GSAP ScrollTrigger |
| **WebGL** | @react-three/fiber + @react-three/drei + three | Declarative Three.js for the MorphBlob background |
| **Noise** | simplex-noise | Vertex displacement for the organic blob effect |
| **Typography** | Inter (Google Fonts) | Modern, variable-weight, excellent readability |
| **Styling** | Vanilla CSS (per-component files) | Keep current approach, just refactor |

### Install Command

```bash
npm install react-router-dom gsap @gsap/react lenis @react-three/fiber @react-three/drei three simplex-noise
```

---

## Design Tokens

These CSS custom properties go in `src/index.css` and are used across ALL components:

```css
:root {
  /* ── Colors ── */
  --color-bg: #0a0a0a;
  --color-bg-elevated: #111111;
  --color-bg-hover: #1a1a1a;
  --color-text-primary: #f0f0f0;
  --color-text-secondary: #777777;
  --color-text-muted: #444444;
  --color-accent: #64ffda;
  --color-accent-dim: rgba(100, 255, 218, 0.12);
  --color-border: #222222;
  --color-white: #ffffff;

  /* ── Typography ── */
  --font-body: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --fs-xs: clamp(0.7rem, 0.7vw, 0.8rem);
  --fs-sm: clamp(0.85rem, 0.9vw, 1rem);
  --fs-base: clamp(1rem, 1vw, 1.1rem);
  --fs-lg: clamp(1.2rem, 1.5vw, 1.5rem);
  --fs-xl: clamp(1.8rem, 3vw, 3rem);
  --fs-2xl: clamp(2.5rem, 5vw, 5rem);
  --fs-hero: clamp(3rem, 7vw, 7rem);

  /* ── Spacing ── */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  --page-padding: clamp(1.5rem, 5vw, 6rem);

  /* ── Animation ── */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 0.2s;
  --dur-normal: 0.4s;
  --dur-slow: 0.8s;

  /* ── Layout ── */
  --navbar-height: 60px;
  --footer-height: 60px;
  --content-max-width: 1200px;
}
```

---

## New File Structure

```
src/
├── main.jsx                              (modify — add BrowserRouter)
├── App.jsx                               (rewrite — router + layout shell)
├── index.css                             (rewrite — design tokens + global reset)
│
├── pages/
│   ├── Home.jsx                          [NEW]
│   ├── About.jsx                         [NEW]
│   ├── Experience.jsx                    [NEW]
│   ├── Projects.jsx                      [NEW]
│   └── Contact.jsx                       [NEW]
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx                    [NEW]
│   │   ├── Menu.jsx                      [NEW]
│   │   ├── Footer.jsx                    [NEW]
│   │   └── SmoothScroll.jsx              [NEW]
│   ├── effects/
│   │   ├── CustomCursor.jsx              [NEW]
│   │   ├── PageTransition.jsx            [NEW]
│   │   ├── TextReveal.jsx                [NEW]
│   │   └── Magnet.jsx                    (keep existing)
│   ├── backgrounds/
│   │   ├── MorphBlob.jsx                 [NEW]
│   │   ├── Preloader.jsx                 [NEW]
│   │   └── PixelBlast.jsx               (keep as optional)
│   ├── ui/
│   │   ├── ProjectRow.jsx                [NEW]
│   │   ├── ExperienceCard.jsx            (refactor)
│   │   ├── CertificateCard.jsx           (keep)
│   │   ├── SocialMediaIcon.jsx           (keep)
│   │   └── AnimatedLink.jsx              [NEW]
│   └── modals/
│       ├── ImageModal.jsx                (keep)
│       ├── VideoModal.jsx                (keep)
│       └── PdfModal.jsx                  (keep)
│
├── hooks/
│   ├── useMousePosition.js               (keep)
│   └── useMediaQuery.js                  [NEW]
│
├── data/
│   ├── projects.js                       [NEW] — extracted project data
│   ├── experiences.js                    [NEW] — extracted experience data
│   └── certifications.js                [NEW] — extracted certification data
│
├── styles/
│   ├── navbar.css                        [NEW]
│   ├── menu.css                          [NEW]
│   ├── footer.css                        [NEW]
│   ├── cursor.css                        [NEW]
│   ├── home.css                          [NEW]
│   ├── about.css                         [NEW]
│   ├── experience.css                    [NEW]
│   ├── projects.css                      [NEW]
│   ├── contact.css                       [NEW]
│   ├── preloader.css                     [NEW]
│   ├── projectRow.css                    [NEW]
│   ├── textReveal.css                    [NEW]
│   ├── animatedLink.css                  [NEW]
│   ├── ExperienceCard.css                (refactor existing)
│   ├── CertificateCard.css               (keep)
│   ├── SocialMediaIcon.css               (keep)
│   ├── ImageModal.css                    (keep)
│   ├── VideoModal.css                    (keep)
│   └── PdfModal.css                      (keep)
│
└── assets/                               (keep all existing)
```

---

## Files to DELETE After Migration (Phase 6)

```
src/Portfolio.jsx
src/styles/Portfolio.css
src/styles/App.css
src/sections/AboutSection.jsx
src/sections/ExperienceSection.jsx
src/sections/ProjectsSection.jsx
src/sections/CertificationsSection.jsx
src/styles/AboutSection.css
src/styles/ExperienceSection.css
src/styles/ProjectsSection.css
src/styles/CertificationsSection.css
src/components/Navigation.jsx
src/styles/Navigation.css
src/components/mobile/MobileHeader.jsx
src/components/mobile/MobileHeroSection.jsx
src/components/mobile/MobileMenu.jsx
src/styles/MobileHeader.css
src/styles/MobileHeroSection.css
src/styles/MobileMenu.css
src/components/ProjectCard.jsx
src/styles/ProjectCard.css
src/hooks/useScrollSpy.js
```

---

## Phase Dependency Graph

```
Phase 1 (Foundation)
  │
  ├── Phase 2 (Home + WebGL + Cursor + Transitions)
  │     │
  │     ├── Phase 4 (About)     ← needs TextReveal from Phase 2
  │     └── Phase 5 (Experience) ← needs TextReveal from Phase 2
  │
  ├── Phase 3 (Projects)         ← only needs routing from Phase 1
  │
  └── Phase 6 (Contact + Polish) ← must be LAST
```

**Phase 1 must be completed first.** Phase 3 can start after Phase 1. Phases 4 & 5 need Phase 2. Phase 6 is always last.

---

## Phase Documents

Each phase has its own detailed document:

1. [Phase 1: Foundation & Infrastructure](./01-phase-foundation.md)
2. [Phase 2: Home Page + WebGL + Cursor + Transitions](./02-phase-home.md)
3. [Phase 3: Projects Page](./03-phase-projects.md)
4. [Phase 4: About Page](./04-phase-about.md)
5. [Phase 5: Experience Page](./05-phase-experience.md)
6. [Phase 6: Contact + Final Polish](./06-phase-polish.md)
