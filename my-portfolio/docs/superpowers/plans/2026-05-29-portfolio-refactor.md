# Portfolio Structural Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the portfolio for maintainability and correctness — centralize config, introduce a ThemeProvider + Layout + router config, standardize all animations on `useGSAP`, repair the Certifications section, and add a tech-stack marquee plus modal entrance animations.

**Architecture:** A single `ThemeProvider` (React Context) owns theme state and the `data-theme` attribute, eliminating the current duplicate state between `App` and `Navbar`. A `Layout` component encapsulates `Navbar` + `Menu` + `Footer` + `PageTransition`; routing moves to a dedicated `AppRoutes` component. All static metadata lives in `src/data/config.js`. Every animation uses the `@gsap/react` `useGSAP` hook, which auto-reverts tweens and ScrollTriggers — no manual GSAP cleanup anywhere.

**Tech Stack:** React 19, react-router-dom 7, GSAP 3.15 + `@gsap/react` 2.1, Lenis, Three.js (untouched). Font Awesome 6.4 (already via CDN) + Devicon (CDN, added in Task 11) for marquee icons.

**Verification policy (per user):** No test framework is introduced. Each task is verified with `npm run lint` and `npm run build` from the `my-portfolio/` directory, plus a manual/visual check in `npm run dev` where behavior is visual. There are no "write a failing test" steps.

**Working directory for all commands:** `my-portfolio/`

---

## File Structure

**New files:**
- `src/data/config.js` — all static metadata (name, email, social URLs, CV url, footer/contact links, tech stack for marquee).
- `src/context/ThemeContext.jsx` — `ThemeProvider` + `useTheme` hook.
- `src/router/AppRoutes.jsx` — `<Routes>` extraction.
- `src/components/layout/Layout.jsx` — wraps Navbar + Menu + Footer + PageTransition; owns `isMenuOpen`.
- `src/components/ui/Marquee.jsx` — infinite horizontal tech-stack marquee (GSAP/useGSAP).
- `src/styles/marquee.css` — marquee styles.

**Modified files:**
- `src/main.jsx` — wrap app in `ThemeProvider`.
- `src/App.jsx` — remove local theme state; compose `Layout` + `AppRoutes`; consume `useTheme`.
- `src/components/layout/Navbar.jsx` — consume `useTheme`; drop duplicate state; logo from config.
- `src/data/experiences.js` — remove `cvUrl` (moves to config).
- `src/pages/Experience.jsx` — import `cvUrl` from config.
- `src/pages/Contact.jsx` — email + links from config.
- `src/components/layout/Footer.jsx` — social links from config.
- `src/pages/Home.jsx` — name from config; render `<Marquee>`.
- `src/pages/Projects.jsx` — "View all on GitHub" url from config; useGSAP conversion; modal wiring unchanged.
- GSAP conversions: `Menu.jsx`, `PageTransition.jsx`, `Preloader.jsx`, `ProjectRow.jsx`, `ExperienceCard.jsx`, `TextReveal.jsx`, `CustomCursor.jsx`.
- Modal animations: `ImageModal.jsx`, `VideoModal.jsx`, `PdfModal.jsx`.
- `index.html` — add Devicon CDN stylesheet.
- Certifications repair: file(s) determined during Task 13 diagnosis.

**Untouched (intentionally):** `SmoothScroll.jsx` (uses `gsap.ticker`, not tweens — `useGSAP` does not apply), `Magnet.jsx` / `AnimatedLink.jsx` (pure CSS), `InteractiveParticles/*` (WebGL/R3F).

---

## Task 1: Create centralized config

**Files:**
- Create: `src/data/config.js`

- [ ] **Step 1: Create the config module**

```javascript
// src/data/config.js
// Centralized static metadata. No hardcoded contact/social info should live in components.
import cvFile from '../assets/CV_TomasLeote_Lisboa_2026.pdf'

export const personal = {
  name: 'Tomás Leote Falcão',
  email: 'tomas.leote@gmail.com',
}

export const social = {
  linkedin: 'https://www.linkedin.com/in/tom%C3%A1s-leote-falc%C3%A3o-a81860266/',
  github: 'https://github.com/tomasleote',
  spotify: 'https://open.spotify.com/user/11123207778?si=95bcfbeef7aa4209',
}

// CV PDF — bundled asset. All references go through config.
export const cvUrl = cvFile

// Footer social icons (Font Awesome brand classes, rendered as `fab fa-...`).
export const socialLinks = [
  { icon: 'fa-linkedin-in', url: social.linkedin, label: 'LinkedIn' },
  { icon: 'fa-github', url: social.github, label: 'GitHub' },
  { icon: 'fa-envelope', url: `mailto:${personal.email}`, label: 'Email' },
  { icon: 'fa-spotify', url: social.spotify, label: 'Spotify' },
]

// Contact page links.
export const contactLinks = [
  { label: 'LinkedIn', url: social.linkedin, external: true },
  { label: 'GitHub', url: social.github, external: true },
]

// Tech stack for the Home marquee.
// lib: 'fa' => Font Awesome brand icon (rendered `fab <icon>`)
//      'devicon' => Devicon (rendered as the icon class directly)
export const techStack = [
  { name: 'React', icon: 'fa-react', lib: 'fa' },
  { name: 'JavaScript', icon: 'fa-js', lib: 'fa' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain', lib: 'devicon' },
  { name: 'Node.js', icon: 'fa-node-js', lib: 'fa' },
  { name: 'Java', icon: 'fa-java', lib: 'fa' },
  { name: 'Vue', icon: 'fa-vuejs', lib: 'fa' },
  { name: 'Angular', icon: 'fa-angular', lib: 'fa' },
  { name: 'Three.js', icon: 'devicon-threejs-original', lib: 'devicon' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain', lib: 'devicon' },
  { name: 'Vite', icon: 'devicon-vitejs-plain', lib: 'devicon' },
  { name: 'GraphQL', icon: 'devicon-graphql-plain', lib: 'devicon' },
  { name: 'Firebase', icon: 'devicon-firebase-plain', lib: 'devicon' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', lib: 'devicon' },
  { name: 'Git', icon: 'fa-git-alt', lib: 'fa' },
]
```

- [ ] **Step 2: Verify build/lint**

Run: `npm run lint` and `npm run build`
Expected: PASS. (Module is not yet imported anywhere, so this only checks the asset import path resolves.)

- [ ] **Step 3: Commit**

```bash
git add my-portfolio/src/data/config.js
git commit -m "feat: add centralized config module for static metadata"
```

---

## Task 2: Migrate Footer, Contact, Experience, Projects, Navbar logo, Home name to config

This task removes every hardcoded contact/social string from components. Do all edits, then verify once.

**Files:**
- Modify: `src/components/layout/Footer.jsx`
- Modify: `src/pages/Contact.jsx`
- Modify: `src/data/experiences.js`
- Modify: `src/pages/Experience.jsx`
- Modify: `src/pages/Projects.jsx`

- [ ] **Step 1: Footer — use `socialLinks` from config**

Replace the `SOCIAL_LINKS` constant and its definition. New `Footer.jsx`:

```jsx
import SocialMediaIcon from '../SocialMediaIcon'
import Magnet from '../effects/Magnet'
import { socialLinks } from '../../data/config'
import '../../styles/footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__links">
        {socialLinks.map((link) => (
          <Magnet key={link.label} padding={20} magnetStrength={2}>
            <SocialMediaIcon
              icon={link.icon}
              url={link.url}
              label={link.label}
            />
          </Magnet>
        ))}
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Contact — use `personal.email` + `contactLinks`**

New `Contact.jsx` (replace the file body's `CONTACT_LINKS` and hardcoded email):

```jsx
import TextReveal from '../components/effects/TextReveal'
import '../styles/contact.css'
import AnimatedLink from '../components/ui/AnimatedLink'
import { personal, contactLinks } from '../data/config'

export default function Contact() {
  return (
    <main className="contact-page">
      <div className="contact-page__content">
        <TextReveal tag="h1" className="contact-page__title">Contact</TextReveal>

        <TextReveal tag="p" className="contact-page__subtitle" delay={0.1}>
          Want to work together, have me build a website for you, or just say hi? Feel free to reach out.
        </TextReveal>

        <TextReveal className="contact-page__email-section" delay={0.2}>
          <a
            href={`mailto:${personal.email}`}
            className="contact-page__email"
            data-cursor
          >
            {personal.email}
          </a>
        </TextReveal>

        <div className="contact-page__links">
          {contactLinks.map((link, i) => (
            <TextReveal key={link.label} delay={0.3 + i * 0.08}>
              <AnimatedLink
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page__link"
                data-cursor
              >
                <span className="contact-page__link-arrow">↗</span>
                <span className="contact-page__link-label">{link.label}</span>
              </AnimatedLink>
            </TextReveal>
          ))}
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: experiences.js — remove `cvUrl` (now owned by config)**

Replace the top of `src/data/experiences.js`. Delete these two lines:

```javascript
import cvFile from '../assets/CV_TomasLeote_Lisboa_2026.pdf'

export const cvUrl = cvFile
```

The file now starts directly with `export const experiences = [`.

- [ ] **Step 4: Experience.jsx — import `cvUrl` from config**

Change the import line:

```jsx
import { experiences } from '../data/experiences'
import { cvUrl } from '../data/config'
```

(Replaces the previous `import { experiences, cvUrl } from '../data/experiences'`.)

- [ ] **Step 5: Projects.jsx — "View all on GitHub" url from config**

Add to imports:

```jsx
import { social } from '../data/config'
```

Change the GitHub link href:

```jsx
<AnimatedLink
  href={social.github}
  target="_blank"
  rel="noopener noreferrer"
  className="projects-page__github-link"
>
  View All on GitHub →
</AnimatedLink>
```

- [ ] **Step 6: Verify build/lint**

Run: `npm run lint` and `npm run build`
Expected: PASS. No remaining references to the old `cvUrl` export from `experiences`.

Also run a grep to confirm no hardcoded contact info remains in components:
Run: `git grep -n "tomas.leote@gmail.com\|linkedin.com/in/tom\|open.spotify.com/user" -- "my-portfolio/src/components" "my-portfolio/src/pages"`
Expected: NO matches (all moved to `config.js`).

- [ ] **Step 7: Commit**

```bash
git add my-portfolio/src/components/layout/Footer.jsx my-portfolio/src/pages/Contact.jsx my-portfolio/src/data/experiences.js my-portfolio/src/pages/Experience.jsx my-portfolio/src/pages/Projects.jsx
git commit -m "refactor: source all contact/social/CV data from config"
```

---

## Task 3: ThemeProvider context

**Files:**
- Create: `src/context/ThemeContext.jsx`

- [ ] **Step 1: Create the context + provider + hook**

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
```

- [ ] **Step 2: Verify build/lint**

Run: `npm run lint` and `npm run build`
Expected: PASS (not yet imported).

- [ ] **Step 3: Commit**

```bash
git add my-portfolio/src/context/ThemeContext.jsx
git commit -m "feat: add ThemeProvider context for global theme state"
```

---

## Task 4: Wire ThemeProvider; remove duplicate theme state from App + Navbar

This is a single atomic change (per "No Partial Commits"): provider mounted, and BOTH consumers (App, Navbar) migrated together.

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/layout/Navbar.jsx`

- [ ] **Step 1: Mount the provider in main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
```

- [ ] **Step 2: App.jsx — consume `useTheme`, drop local theme state**

Replace the theme-related lines. Remove the `useEffect` import if no longer used elsewhere (it is no longer needed in App after this change). New top + body of `App.jsx` (routing/layout still inline here — replaced in Tasks 5–6):

```jsx
import { useState, useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import SmoothScroll from './components/layout/SmoothScroll'
import Navbar from './components/layout/Navbar'
import Menu from './components/layout/Menu'
import Footer from './components/layout/Footer'
import InteractiveParticlesBackground from './components/backgrounds/InteractiveParticles/InteractiveParticles'
import Preloader from './components/backgrounds/Preloader'
import CustomCursor from './components/effects/CustomCursor'
import PageTransition from './components/effects/PageTransition'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [preloaderDone, setPreloaderDone] = useState(false)
  const location = useLocation()
  const { theme } = useTheme()

  const particleBackground = useMemo(() => {
    return <InteractiveParticlesBackground theme={theme} />
  }, [theme])

  return (
    <SmoothScroll>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: location.pathname === '/' ? 1 : 0,
          visibility: location.pathname === '/' ? 'visible' : 'hidden',
          transition: 'opacity 0.6s ease, visibility 0.6s'
        }}
      >
        {particleBackground}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
        <CustomCursor />
        <Navbar
          onMenuToggle={() => setIsMenuOpen((p) => !p)}
          isMenuOpen={isMenuOpen}
        />
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <PageTransition>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home preloaderDone={preloaderDone} />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageTransition>

        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
```

Note: the `console.log` lines from the original are intentionally dropped during this refactor.

- [ ] **Step 3: Navbar.jsx — consume `useTheme`; drop duplicate state + props; logo from config**

```jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { personal } from '../../data/config'
import '../../styles/navbar.css'

export default function Navbar({ onMenuToggle, isMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__logo">
        {personal.name}
      </Link>

      <div className="navbar__actions">
        <button
          className="navbar__theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          data-cursor
        >
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>

        <button
          className={`navbar__menu-btn ${isMenuOpen ? 'navbar__menu-btn--open' : ''}`}
          onClick={onMenuToggle}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          data-cursor
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Verify build/lint + manual theme check**

Run: `npm run lint` and `npm run build`
Expected: PASS.

Run: `npm run dev`, open the site, click the theme toggle.
Expected: theme flips dark↔light, persists on reload (single source of truth — no flicker/conflict between Navbar and App).

- [ ] **Step 5: Commit**

```bash
git add my-portfolio/src/main.jsx my-portfolio/src/App.jsx my-portfolio/src/components/layout/Navbar.jsx
git commit -m "refactor: move theme state into ThemeProvider, remove duplication"
```

---

## Task 5: Extract routing into AppRoutes

**Files:**
- Create: `src/router/AppRoutes.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create AppRoutes**

```jsx
// src/router/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Experience from '../pages/Experience'
import Projects from '../pages/Projects'
import Contact from '../pages/Contact'

export default function AppRoutes({ location, preloaderDone }) {
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home preloaderDone={preloaderDone} />} />
      <Route path="/about" element={<About />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}
```

- [ ] **Step 2: App.jsx — use AppRoutes**

Remove the five page imports (`Home`, `About`, `Experience`, `Projects`, `Contact`) and the `Routes, Route` named imports (keep `useLocation`). Add `import AppRoutes from './router/AppRoutes'`. Replace the `<Routes>…</Routes>` block inside `<PageTransition>`:

```jsx
        <PageTransition>
          <AppRoutes location={location} preloaderDone={preloaderDone} />
        </PageTransition>
```

The import line becomes:

```jsx
import { useLocation } from 'react-router-dom'
```

- [ ] **Step 3: Verify build/lint + navigation check**

Run: `npm run lint` and `npm run build`
Expected: PASS.

Run: `npm run dev`, navigate between all 5 routes via Navbar/Menu links.
Expected: every route renders; `key={location.pathname}` still drives the PageTransition remount (the sweep animation still plays on navigation).

- [ ] **Step 4: Commit**

```bash
git add my-portfolio/src/router/AppRoutes.jsx my-portfolio/src/App.jsx
git commit -m "refactor: extract routing into AppRoutes config component"
```

---

## Task 6: Layout wrapper (Navbar + Menu + Footer + PageTransition)

**Files:**
- Create: `src/components/layout/Layout.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Layout (owns isMenuOpen, wraps chrome + transition)**

```jsx
// src/components/layout/Layout.jsx
import { useState } from 'react'
import Navbar from './Navbar'
import Menu from './Menu'
import Footer from './Footer'
import PageTransition from '../effects/PageTransition'

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Navbar
        onMenuToggle={() => setIsMenuOpen((p) => !p)}
        isMenuOpen={isMenuOpen}
      />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <PageTransition>{children}</PageTransition>

      <Footer />
    </>
  )
}
```

- [ ] **Step 2: App.jsx — compose Layout around AppRoutes**

`App.jsx` no longer manages `isMenuOpen` or imports Navbar/Menu/Footer/PageTransition. New `App.jsx`:

```jsx
import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import SmoothScroll from './components/layout/SmoothScroll'
import Layout from './components/layout/Layout'
import InteractiveParticlesBackground from './components/backgrounds/InteractiveParticles/InteractiveParticles'
import Preloader from './components/backgrounds/Preloader'
import CustomCursor from './components/effects/CustomCursor'
import AppRoutes from './router/AppRoutes'

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const location = useLocation()
  const { theme } = useTheme()

  const particleBackground = useMemo(() => {
    return <InteractiveParticlesBackground theme={theme} />
  }, [theme])

  return (
    <SmoothScroll>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: location.pathname === '/' ? 1 : 0,
          visibility: location.pathname === '/' ? 'visible' : 'hidden',
          transition: 'opacity 0.6s ease, visibility 0.6s'
        }}
      >
        {particleBackground}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
        <CustomCursor />
        <Layout>
          <AppRoutes location={location} preloaderDone={preloaderDone} />
        </Layout>
      </div>
    </SmoothScroll>
  )
}

export default App
```

- [ ] **Step 3: Verify build/lint + full nav + menu check**

Run: `npm run lint` and `npm run build`
Expected: PASS.

Run: `npm run dev`. Verify: menu opens/closes (state moved to Layout), navigation works, footer renders on all pages, page-transition sweep still plays. The particle background still shows only on `/` (App still controls it).
Expected: all behaviors identical to pre-refactor — no broken navigation state, no CSS scope changes (class names unchanged).

- [ ] **Step 4: Commit**

```bash
git add my-portfolio/src/components/layout/Layout.jsx my-portfolio/src/App.jsx
git commit -m "refactor: encapsulate navbar/menu/footer/transition in Layout"
```

---

## GSAP Standardization (Tasks 7–12)

Each conversion replaces a raw `useEffect` + `gsap` block with `useGSAP` from `@gsap/react`. `useGSAP` auto-reverts all tweens and ScrollTriggers created in its context — so any manual `.kill()` / `ScrollTrigger.getAll().kill()` cleanup is removed. Non-GSAP cleanup (event listeners, observers, intervals) is retained, returned from the `useGSAP` callback where applicable.

## Task 7: Convert Menu.jsx to useGSAP

**Files:**
- Modify: `src/components/layout/Menu.jsx`

- [ ] **Step 1: Replace useEffect with useGSAP**

```jsx
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Magnet from '../effects/Magnet'
import '../../styles/menu.css'

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
]

export default function Menu({ isOpen, onClose }) {
  const overlayRef = useRef(null)
  const linksRef = useRef([])

  useGSAP(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.6,
        ease: 'power4.inOut',
      })
      gsap.fromTo(
        linksRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.3 }
      )
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: 'power4.inOut',
      })
    }
  }, { dependencies: [isOpen], scope: overlayRef })

  return (
    <nav ref={overlayRef} className="menu-overlay" aria-hidden={!isOpen}>
      <ul className="menu-overlay__list">
        {NAV_ITEMS.map((item, i) => (
          <li key={item.path} className="menu-overlay__item">
            <Magnet padding={40} magnetStrength={2}>
              <Link
                to={item.path}
                ref={(el) => (linksRef.current[i] = el)}
                className="menu-overlay__link"
                onClick={onClose}
              >
                <span className="menu-overlay__counter">0{i + 1}</span>
                {item.label}
              </Link>
            </Magnet>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

- [ ] **Step 2: Verify build/lint + menu animation**

Run: `npm run lint` and `npm run build` → PASS.
Run: `npm run dev`, toggle the menu repeatedly.
Expected: open (clip reveal + staggered links) and close (clip hide) animations play identically to before; no console errors.

- [ ] **Step 3: Commit**

```bash
git add my-portfolio/src/components/layout/Menu.jsx
git commit -m "refactor: convert Menu animations to useGSAP"
```

---

## Task 8: Convert PageTransition.jsx to useGSAP

**Files:**
- Modify: `src/components/effects/PageTransition.jsx`

- [ ] **Step 1: Replace useEffect with useGSAP (refs are explicit, no scope needed)**

```jsx
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function PageTransition({ children }) {
  const location = useLocation()
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const isFirstRender = useRef(true)

  useGSAP(() => {
    // Skip animation on first render (preloader handles that); ensure content visible.
    if (isFirstRender.current) {
      isFirstRender.current = false
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 1, y: 0 })
      }
      return
    }

    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current,
      { scaleY: 0, transformOrigin: 'bottom center' },
      { scaleY: 1, duration: 0.5, ease: 'power4.inOut' }
    )
      .add(() => window.scrollTo(0, 0))
      .to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.5,
        ease: 'power4.inOut'
      })
      .fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
  }, { dependencies: [location.pathname] })

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--color-bg)',
          zIndex: 98,
          transformOrigin: 'bottom center',
          transform: 'scaleY(0)',
          pointerEvents: 'none',
        }}
      />
      <div ref={contentRef}>
        {children}
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify build/lint + transition**

Run: `npm run lint` and `npm run build` → PASS.
Run: `npm run dev`, navigate between routes.
Expected: first load shows content immediately (no sweep); subsequent navigations play the overlay sweep + content fade; scroll resets to top.

- [ ] **Step 3: Commit**

```bash
git add my-portfolio/src/components/effects/PageTransition.jsx
git commit -m "refactor: convert PageTransition to useGSAP"
```

---

## Task 9: Convert Preloader.jsx to useGSAP

**Files:**
- Modify: `src/components/backgrounds/Preloader.jsx`

- [ ] **Step 1: Replace useEffect with useGSAP; replace manual setTimeout/kill with gsap.delayedCall**

Rationale: `useGSAP` reverts the timeline automatically on unmount (the component unmounts when `show` becomes false), so no manual `tl.kill()` is needed. The safety fallback and the resize nudge use `gsap.delayedCall` (also auto-reverted by the context) instead of `setTimeout`.

```jsx
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '../../styles/preloader.css'

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null)
  const textRef = useRef(null)
  const [show, setShow] = useState(true)
  const completedRef = useRef(false)

  useGSAP(() => {
    const finish = () => {
      if (completedRef.current) return
      completedRef.current = true
      setShow(false)
      onComplete?.()
      // Wake up the R3F canvas so the initial frame paints.
      gsap.delayedCall(0.05, () => window.dispatchEvent(new Event('resize')))
    }

    const tl = gsap.timeline({ onComplete: finish })
    tl.fromTo(textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
      .to({}, { duration: 1.5 })
      .to(textRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
      .to(overlayRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power4.inOut'
      })

    // Safety fallback: force-complete if the timeline never finishes.
    gsap.delayedCall(5, () => {
      if (!completedRef.current) finish()
    })
  }, { scope: overlayRef })

  if (!show) return null

  return (
    <div ref={overlayRef} className="preloader">
      <span ref={textRef} className="preloader__text">Loading...</span>
    </div>
  )
}
```

- [ ] **Step 2: Verify build/lint + preloader on reload**

Run: `npm run lint` and `npm run build` → PASS.
Run: `npm run dev`, hard-reload the page.
Expected: "Loading..." fades in, holds, overlay slides up, then content/particles appear (resize nudge fires). No double-fire of onComplete.

- [ ] **Step 3: Commit**

```bash
git add my-portfolio/src/components/backgrounds/Preloader.jsx
git commit -m "refactor: convert Preloader to useGSAP with auto-cleanup"
```

---

## Task 10: Convert ProjectRow.jsx, ExperienceCard.jsx, TextReveal.jsx, Projects.jsx, CustomCursor.jsx to useGSAP

Five conversions. Verify once at the end (they are independent components but share the GSAP-standardization goal).

**Files:**
- Modify: `src/components/ui/ProjectRow.jsx`
- Modify: `src/components/ui/ExperienceCard.jsx`
- Modify: `src/components/effects/TextReveal.jsx`
- Modify: `src/pages/Projects.jsx`
- Modify: `src/components/effects/CustomCursor.jsx`

- [ ] **Step 1: ProjectRow.jsx — useGSAP with scope ref on root**

```jsx
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '../../styles/projectRow.css'

export default function ProjectRow({
  title,
  category,
  description,
  technologies,
  url,
  documentUrl,
  documentLabel,
  isExpanded,
  onHover,
  index,
}) {
  const rootRef = useRef(null)
  const detailsRef = useRef(null)
  const arrowRef = useRef(null)

  useGSAP(() => {
    if (isExpanded) {
      gsap.to(detailsRef.current, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' })
      gsap.to(arrowRef.current, { rotation: 45, duration: 0.3 })
    } else {
      gsap.to(detailsRef.current, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' })
      gsap.to(arrowRef.current, { rotation: 0, duration: 0.3 })
    }
  }, { dependencies: [isExpanded], scope: rootRef })

  const handleClick = () => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleDocClick = (e) => {
    e.stopPropagation()
    window.open(documentUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      ref={rootRef}
      className={`project-row ${isExpanded ? 'project-row--expanded' : ''}`}
      onMouseEnter={onHover}
      onClick={handleClick}
      data-cursor
    >
      <div className="project-row__header">
        <span ref={arrowRef} className="project-row__arrow">→</span>
        <span className="project-row__title">{title}</span>
        <span className="project-row__category">{category}</span>
      </div>

      <div ref={detailsRef} className="project-row__details">
        <p className="project-row__description">{description}</p>

        {documentUrl && (
          <button
            className="project-row__doc-btn"
            onClick={handleDocClick}
            data-cursor
          >
            ↓ {documentLabel || "Download PDF"}
          </button>
        )}

        <div className="project-row__tags">
          {technologies.map((tech, i) => (
            <span key={i} className="project-row__tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: ExperienceCard.jsx — useGSAP, remove manual ScrollTrigger cleanup**

```jsx
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '../../styles/ExperienceCard.css'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceCard({
  timeframe, role, company, location, companyUrl, description, technologies, index
}) {
  const cardRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    )
  }, { dependencies: [index], scope: cardRef })

  const handleClick = () => {
    if (companyUrl) window.open(companyUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      ref={cardRef}
      className={`exp-card ${companyUrl ? 'exp-card--clickable' : ''}`}
      onClick={handleClick}
      data-cursor={companyUrl ? '' : undefined}
    >
      <div className="exp-card__timeframe">{timeframe}</div>
      <div className="exp-card__body">
        <h3 className="exp-card__title">{role} · {company}</h3>
        <p className="exp-card__location">{location}</p>
        <p className="exp-card__description">{description}</p>
        <div className="exp-card__tags">
          {technologies.map((tech, i) => (
            <span key={i} className="exp-card__tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: TextReveal.jsx — useGSAP, remove manual ScrollTrigger cleanup**

```jsx
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '../../styles/textReveal.css'

gsap.registerPlugin(ScrollTrigger)

export default function TextReveal({
  children,
  tag: Tag = 'div',
  className = '',
  delay = 0,
  duration = 1,
  y = 60,
}) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.fromTo(ref.current,
      { y, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
      {
        y: 0,
        opacity: 1,
        clipPath: 'inset(0 0 0% 0)',
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { dependencies: [delay, duration, y], scope: ref })

  return (
    <Tag ref={ref} className={`text-reveal ${className}`}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 4: Projects.jsx — convert hover image animation to useGSAP**

Change imports at the top: replace `import { useState, useRef, useEffect } from 'react'` with:

```jsx
import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
```

(Keep the existing `import { social } from '../data/config'` added in Task 2.)

Replace the `useEffect(() => { ... }, [hoveredIndex, isMobile])` block with:

```jsx
  useGSAP(() => {
    if (!imageRef.current || isMobile) return

    if (hoveredIndex !== null && (projects[hoveredIndex]?.imageUrl || projects[hoveredIndex]?.videoUrl)) {
      gsap.to(imageRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' })
    } else {
      gsap.to(imageRef.current, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' })
    }
  }, { dependencies: [hoveredIndex, isMobile], scope: imageRef })
```

(The rest of `Projects.jsx` — modal wiring, JSX — is unchanged.)

- [ ] **Step 5: CustomCursor.jsx — useGSAP with contextSafe handlers + returned cleanup**

The GSAP tweens auto-revert; the DOM listeners + MutationObserver are torn down in the returned cleanup (non-GSAP cleanup, which `useGSAP` supports and runs on revert).

```jsx
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import '../../styles/cursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const followerRef = useRef(null)
  const isTouch = useMediaQuery('(hover: none)')

  useGSAP((context, contextSafe) => {
    if (isTouch) return

    const dot = dotRef.current
    const follower = followerRef.current
    if (!dot || !follower) return

    const onMouseMove = contextSafe((e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' })
    })

    const onEnter = contextSafe(() => {
      gsap.to(follower, { scale: 2.5, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.3 })
    })

    const onLeave = contextSafe(() => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    })

    window.addEventListener('mousemove', onMouseMove)

    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attachListeners()
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      observer.disconnect()
    }
  }, { dependencies: [isTouch] })

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
```

- [ ] **Step 6: Verify build/lint + visual checks**

Run: `npm run lint` and `npm run build` → PASS.
Run: `npm run dev` and verify:
- Projects page: row expand/collapse animates; hovering a row fades the preview image in/out (desktop).
- Experience page: cards fade up on scroll into view.
- Any page: TextReveal headings reveal on scroll.
- Desktop cursor: dot/follower track the mouse and scale on hover over links/buttons.
Expected: all behaviors match pre-refactor; no console errors; no lingering animations after navigating away.

- [ ] **Step 7: Commit**

```bash
git add my-portfolio/src/components/ui/ProjectRow.jsx my-portfolio/src/components/ui/ExperienceCard.jsx my-portfolio/src/components/effects/TextReveal.jsx my-portfolio/src/pages/Projects.jsx my-portfolio/src/components/effects/CustomCursor.jsx
git commit -m "refactor: convert remaining animations to useGSAP, drop manual cleanup"
```

- [ ] **Step 8: Confirm no raw GSAP useEffect remains (except SmoothScroll ticker)**

Run: `git grep -n "useEffect" -- "my-portfolio/src/components" "my-portfolio/src/pages"`
Expected: matches only in `Navbar.jsx` (scroll listener — not a GSAP animation), `SmoothScroll.jsx` (Lenis/ticker), and `Magnet.jsx` (CSS transform, non-GSAP). No `gsap.to`/`gsap.timeline`/`ScrollTrigger` inside any `useEffect`.

Run: `git grep -n "killTweensOf\|ScrollTrigger.getAll().forEach\|tl.kill" -- "my-portfolio/src"`
Expected: NO matches (all manual GSAP cleanup removed).

---

## Task 11: Add Devicon CDN

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add the Devicon stylesheet after the Font Awesome link**

In `index.html`, immediately after the Font Awesome `<link>` (line 11), add:

```html
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
```

- [ ] **Step 2: Verify build + icon availability**

Run: `npm run build` → PASS.
Run: `npm run dev`, open devtools, in the console run `getComputedStyle(document.querySelector('body')).fontFamily` is not needed — instead temporarily inspect that an element with class `devicon-react-original` renders a glyph. (Full visual confirmation happens in Task 12.)
Expected: stylesheet loads (Network tab 200).

- [ ] **Step 3: Commit**

```bash
git add my-portfolio/index.html
git commit -m "chore: add Devicon CDN for tech-stack marquee icons"
```

---

## Task 12: Home tech-stack Marquee

**Files:**
- Create: `src/components/ui/Marquee.jsx`
- Create: `src/styles/marquee.css`
- Modify: `src/pages/Home.jsx`
- Modify: `src/styles/home.css`

- [ ] **Step 1: Create the Marquee component (infinite scroll via useGSAP)**

Implementation: render the `techStack` items twice back-to-back inside a track, then animate the track from `0` to `-50%` on an infinite linear timeline. Because the content is duplicated, wrapping at `-50%` is seamless. Uses `gsap.fromTo` with `repeat: -1`.

```jsx
// src/components/ui/Marquee.jsx
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { techStack } from '../../data/config'
import '../../styles/marquee.css'

function TechIcon({ item }) {
  const className = item.lib === 'fa' ? `fab ${item.icon}` : item.icon
  return (
    <div className="marquee__item" aria-hidden="true">
      <i className={`marquee__icon ${className}`} />
      <span className="marquee__label">{item.name}</span>
    </div>
  )
}

export default function Marquee() {
  const trackRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      trackRef.current,
      { xPercent: 0 },
      { xPercent: -50, duration: 25, ease: 'none', repeat: -1 }
    )
  }, { scope: trackRef })

  // Duplicate the list so the -50% wrap is seamless.
  const items = [...techStack, ...techStack]

  return (
    <div className="marquee" role="marquee" aria-label="Tech stack">
      <div ref={trackRef} className="marquee__track">
        {items.map((item, i) => (
          <TechIcon key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create marquee.css**

```css
/* src/styles/marquee.css */
.marquee {
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
}

.marquee__track {
  display: flex;
  width: max-content;
  gap: var(--space-lg);
  will-change: transform;
}

.marquee__item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-shrink: 0;
  color: var(--color-text-secondary);
  transition: color var(--dur-fast) ease;
}

.marquee__item:hover {
  color: var(--color-accent);
}

.marquee__icon {
  font-size: 1.6rem;
  line-height: 1;
}

.marquee__label {
  font-size: var(--fs-sm);
  font-weight: 500;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .marquee__track {
    gap: var(--space-md);
  }
  .marquee__icon {
    font-size: 1.3rem;
  }
}
```

- [ ] **Step 3: Render Marquee at the bottom of Home**

In `Home.jsx`: add `import Marquee from '../components/ui/Marquee'` and `import { personal } from '../data/config'`. Replace the hardcoded name with `{personal.name}`, and add the marquee after `home__content`.

Updated `Home.jsx` return (and name import); the `useGSAP` entrance logic is unchanged:

```jsx
import { useState, useEffect, useRef } from 'react'
import AnimatedLink from '../components/ui/AnimatedLink'
import Marquee from '../components/ui/Marquee'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { personal } from '../data/config'
import '../styles/home.css'

const TITLES = ['Software Engineer', 'Full-Stack Everything', 'Bedroom DJ']

export default function Home({ preloaderDone }) {
  const [titleIndex, setTitleIndex] = useState(0)
  const containerRef = useRef(null)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const linksRef = useRef([])

  useGSAP(() => {
    gsap.set([nameRef.current, subtitleRef.current, ...linksRef.current], { opacity: 0, y: 40 })
    if (!preloaderDone) return

    const elements = [nameRef.current, subtitleRef.current, ...linksRef.current].filter(Boolean)
    elements.forEach((el) => { if (el) el.style.animation = 'none' })

    const tl = gsap.timeline()
    tl.to(nameRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(linksRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12 }, '-=0.4')
  }, { dependencies: [preloaderDone], scope: containerRef })

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="home" ref={containerRef}>
      <div className="home__content">
        <h1 ref={nameRef} className="home__name">
          {personal.name}
        </h1>
        <p ref={subtitleRef} className="home__subtitle">
          {TITLES[titleIndex]}
        </p>
        <nav className="home__links">
          <AnimatedLink to="/about" ref={(el) => (linksRef.current[0] = el)} className="home__link">
            → About Me
          </AnimatedLink>
          <AnimatedLink to="/projects" ref={(el) => (linksRef.current[1] = el)} className="home__link">
            → Projects
          </AnimatedLink>
          <AnimatedLink to="/experience" ref={(el) => (linksRef.current[2] = el)} className="home__link">
            → Experience
          </AnimatedLink>
        </nav>
      </div>

      <div className="home__marquee">
        <Marquee />
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Position the marquee at the bottom of Home**

`.home` is currently a centered flex column. Add a bottom-anchored marquee wrapper. Append to `home.css`:

```css
.home {
  position: relative;
  flex-direction: column;
}

.home__marquee {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(var(--footer-height) + var(--space-md));
}

@media (max-width: 768px) {
  .home__marquee {
    bottom: calc(var(--footer-height) + var(--space-sm));
  }
}
```

Note: `.home` already sets `align-items: center; justify-content: center;` — adding `flex-direction: column` keeps the hero content centered while the absolutely-positioned marquee anchors to the bottom (out of flex flow). Verify the hero remains vertically centered after this change.

- [ ] **Step 5: Verify build/lint + marquee visual**

Run: `npm run lint` and `npm run build` → PASS.
Run: `npm run dev` on `/`.
Expected: a seamless, infinitely scrolling row of tech icons + labels sits near the bottom of the Home hero, with faded left/right edges. FA icons (React, JS, Node, Java, Vue, Angular, Git) and Devicon icons (TypeScript, Three.js, Tailwind, Vite, GraphQL, Firebase, PostgreSQL) all render as glyphs (no empty boxes). Hero text stays centered.

- [ ] **Step 6: Commit**

```bash
git add my-portfolio/src/components/ui/Marquee.jsx my-portfolio/src/styles/marquee.css my-portfolio/src/pages/Home.jsx my-portfolio/src/styles/home.css
git commit -m "feat: add infinite tech-stack marquee to Home"
```

---

## Task 13: Repair the Certifications section (diagnose then fix)

This is a genuine defect — the certs "no longer render/scroll." The certs source files (`Experience.jsx`, `experience.css`, `CertificateCard.jsx`, `certifications.js`) have not changed in git history, so the regression is environmental (introduced by the broader layout/scroll changes). Diagnose first, then apply the targeted fix. Use the `superpowers:systematic-debugging` skill.

**Files:**
- Investigate: `src/pages/Experience.jsx`, `src/styles/experience.css`, `src/components/CertificateCard.jsx`, `src/styles/CertificateCard.css`, `src/components/layout/SmoothScroll.jsx`, `src/components/effects/PageTransition.jsx`
- Fix: file(s) determined by diagnosis (most-likely candidates enumerated below)

- [ ] **Step 1: Reproduce and characterize**

Run: `npm run dev`, navigate to `/experience`, scroll to the bottom.
Record which of these is true:
  - (A) The "Certifications" heading and/or cards are present in the DOM but invisible (opacity 0 / clipped).
  - (B) The cards are in the DOM and visible but the page won't scroll far enough to reach them.
  - (C) The cards render but the PDF `<iframe>` previews are blank.
  - (D) The cards are absent from the DOM entirely.

Use devtools: inspect `.experience-page__certs-grid` and a `.certificate-card`; check computed `opacity`, `clip-path`, the element's bounding rect, and whether `body`/`.experience-page` height encloses them.

- [ ] **Step 2: Apply the fix matching the symptom**

Most-likely root cause and fix (A is the leading hypothesis): the `TextReveal` "Certifications" heading and on-scroll reveals start at `opacity: 0` + clipped and depend on `ScrollTrigger`. After the Lenis smooth-scroll + layout changes, `ScrollTrigger` positions can be computed before the page/iframes settle, so triggers below the fold never fire. Fix by refreshing ScrollTrigger once the layout/Lenis are ready.

Add a one-time `ScrollTrigger.refresh()` after mount and after Lenis scroll syncs. In `SmoothScroll.jsx`, inside the existing `useEffect`, after `lenis.on('scroll', ScrollTrigger.update)`, add:

```jsx
    // Recalculate trigger positions once layout + Lenis are wired up.
    ScrollTrigger.refresh()
    const refreshOnLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', refreshOnLoad)
```

and in that effect's cleanup add `window.removeEventListener('load', refreshOnLoad)`.

  - If symptom is (B) — page can't scroll to the certs — inspect for a fixed/`overflow: hidden` ancestor or a height cap introduced by the layout overlay; remove/relax it so `.experience-page` content height is fully scrollable. Verify the App background layer and `PageTransition` overlay both have `pointer-events: none` (they do) and are not clipping page height.
  - If symptom is (C) — blank iframe previews — verify the PDF asset URLs resolve in the Network tab; if blocked by the iframe sandbox/view params, adjust the `src` query in `CertificateCard.jsx`.
  - If symptom is (D) — cards absent — check the `certifications` import/array length at runtime (`console.log(certifications.length)`); fix the data import.

Apply only the change(s) that the diagnosis confirms. Do not apply speculative fixes for symptoms that aren't present.

- [ ] **Step 3: Verify the certifications render and scroll**

Run: `npm run dev`, go to `/experience`, scroll down.
Expected: the "Certifications" heading reveals on scroll, all 12 certificate cards render with PDF previews, the grid is reachable by scrolling, and clicking a card opens its `PdfModal`.

- [ ] **Step 4: Commit**

```bash
git add my-portfolio/src/components/layout/SmoothScroll.jsx
# plus any other file the diagnosis required
git commit -m "fix: restore Certifications rendering/scroll on Experience page"
```

---

## Task 14: Modal scale-up / fade-in entrance animation

Add a GSAP scale-up + fade-in entrance to all three modals (`ImageModal`, `VideoModal`, `PdfModal`). They currently mount instantly (`if (!isOpen) return null`). The entrance animates the overlay opacity and the content scale on mount. (Exit remains instant unmount — spec asks for scale-up/fade-in entrance only.)

**Files:**
- Modify: `src/components/ImageModal.jsx`
- Modify: `src/components/VideoModal.jsx`
- Modify: `src/components/PdfModal.jsx`

- [ ] **Step 1: ImageModal.jsx — animate on mount with useGSAP**

```jsx
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '../styles/ImageModal.css'

function ImageModal({ imageUrl, title, isOpen, onClose }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useGSAP(() => {
    if (!overlayRef.current || !contentRef.current) return
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      .fromTo(contentRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.1'
      )
  }, { dependencies: [isOpen], scope: overlayRef })

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }

  const modalContent = (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div ref={contentRef} className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <img src={imageUrl} alt={title} className="modal-image" />
        <p className="modal-title">{title}</p>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default ImageModal
```

- [ ] **Step 2: VideoModal.jsx — same pattern, preserving its extra classNames**

```jsx
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '../styles/VideoModal.css'

function VideoModal({ videoUrl, title, isOpen, onClose }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useGSAP(() => {
    if (!overlayRef.current || !contentRef.current) return
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      .fromTo(contentRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.1'
      )
  }, { dependencies: [isOpen], scope: overlayRef })

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }

  const modalContent = (
    <div
      ref={overlayRef}
      className="modal-overlay video-modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div ref={contentRef} className="modal-content video-modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <video src={videoUrl} className="modal-video" controls autoPlay playsInline />
        <p className="modal-title">{title}</p>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default VideoModal
```

- [ ] **Step 3: PdfModal.jsx — same pattern, preserving its extra classNames**

```jsx
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '../styles/PdfModal.css'

function PdfModal({ pdfUrl, title, isOpen, onClose }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useGSAP(() => {
    if (!overlayRef.current || !contentRef.current) return
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      .fromTo(contentRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.1'
      )
  }, { dependencies: [isOpen], scope: overlayRef })

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }

  const modalContent = (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div ref={contentRef} className="modal-content pdf-modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <iframe src={`${pdfUrl}#view=FitH`} title={title} className="modal-pdf" />
        <p className="modal-title">{title}</p>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default PdfModal
```

- [ ] **Step 4: Verify build/lint + modal animations**

Run: `npm run lint` and `npm run build` → PASS.
Run: `npm run dev`. Open: a certificate (PdfModal) on `/experience`; a project image (ImageModal) and the thesis video (VideoModal) on `/projects`.
Expected: each modal fades the overlay in and scales the content up from 0.85→1 on open; close (overlay click / × / Escape) still works.

- [ ] **Step 5: Commit**

```bash
git add my-portfolio/src/components/ImageModal.jsx my-portfolio/src/components/VideoModal.jsx my-portfolio/src/components/PdfModal.jsx
git commit -m "feat: add scale-up/fade-in entrance animation to all modals"
```

---

## Task 15: Final full-app verification

- [ ] **Step 1: Lint + production build**

Run: `npm run lint` → no errors.
Run: `npm run build` → succeeds.

- [ ] **Step 2: Manual smoke test (dev + preview)**

Run: `npm run dev`. Walk through:
- Preloader plays on load; particles appear on Home.
- Theme toggle flips and persists; no flicker.
- All 5 routes navigate with the page-transition sweep; menu open/close animates.
- Home marquee scrolls seamlessly with all icons rendering.
- Experience: cards reveal on scroll; **Certifications render, scroll into view, and open in PdfModal**.
- Projects: row expand + hover preview; image/video modals animate open.
- Footer social links work on every page; Contact email/links work.

Run: `npm run build && npm run preview` and re-check Home + Experience quickly against the production bundle.

- [ ] **Step 3: Confirm constraints satisfied**

- No new runtime dependencies added (check `git diff main -- my-portfolio/package.json` — should be empty; Devicon/FA are CDN `<link>`s).
- `git grep -n "killTweensOf" -- my-portfolio/src` → no matches.
- No hardcoded contact/social info in components (re-run the Task 2 grep).

---

## Self-Review (completed by plan author)

**Spec coverage:**
- GSAP standardization → Tasks 7–10, 12, 14 (every animated component on `useGSAP`); Task 10 Step 8 grep proves no raw-GSAP `useEffect` remains. ✓
- ThemeProvider → Tasks 3–4. ✓
- Layout wrapper → Task 6. ✓
- Router config file → Task 5. ✓
- Centralized config → Tasks 1–2 (+ usages in 4, 5, 12). ✓
- Modal scale-up/fade-in → Task 14 (all three modals). ✓
- Home marquee (GSAP/useGSAP, tech logos) → Tasks 11–12. ✓
- Certifications defect → Task 13. ✓

**Constraints:**
- No dependency bloat → CDN links only; `package.json` unchanged (Task 15 Step 3). ✓
- No inline config → Task 2 grep gate. ✓
- No manual cleanup → manual GSAP cleanup removed in Tasks 9, 10; Task 10 Step 8 + Task 15 grep gates. ✓
- No breaking changes → class names preserved (CSS scoping intact); `key={location.pathname}` preserved in AppRoutes; nav verified each task. ✓
- No partial commits → ThemeProvider lands with both consumers in one commit (Task 4). ✓

**Execution order** matches the spec: config (1–2) → ThemeProvider + Layout + Router (3–6) → GSAP standardize (7–12, includes marquee deps) → Certifications (13) → Modal animations (14) → final verify (15). Note: marquee (12) is sequenced with its Devicon dep (11) right after GSAP standardization and before the certs fix; this respects the spec's "Implement Marquee and Modal animations" final phase while keeping GSAP work contiguous.

**Type/name consistency:** `useTheme()` returns `{ theme, toggleTheme }` (defined Task 3, consumed Tasks 4); `AppRoutes` props `{ location, preloaderDone }` (defined Task 5, consumed Task 6); config exports `personal`, `social`, `cvUrl`, `socialLinks`, `contactLinks`, `techStack` (defined Task 1, consumed 2/4/12) — all consistent.
