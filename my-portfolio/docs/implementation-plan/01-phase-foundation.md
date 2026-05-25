# Phase 1: Foundation & Infrastructure

**Estimated time**: 1–2 days  
**Dependencies**: None (this is the first phase)  
**Goal**: Install deps, set up routing, design system, layout shell (Navbar, Menu, Footer, SmoothScroll).

---

## Task 1.1: Install Dependencies

```bash
npm install react-router-dom gsap @gsap/react lenis @react-three/fiber @react-three/drei three simplex-noise
```

---

## Task 1.2: Add Google Font

**File**: `index.html`

Add this inside `<head>`, before the Font Awesome link:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Also update the `<title>` and `<meta description>` if desired.

---

## Task 1.3: Rewrite `src/index.css`

Replace the entire file with the design tokens from `00-overview.md` plus:

```css
/* === DESIGN TOKENS === */
:root {
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

  --font-body: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --fs-xs: clamp(0.7rem, 0.7vw, 0.8rem);
  --fs-sm: clamp(0.85rem, 0.9vw, 1rem);
  --fs-base: clamp(1rem, 1vw, 1.1rem);
  --fs-lg: clamp(1.2rem, 1.5vw, 1.5rem);
  --fs-xl: clamp(1.8rem, 3vw, 3rem);
  --fs-2xl: clamp(2.5rem, 5vw, 5rem);
  --fs-hero: clamp(3rem, 7vw, 7rem);

  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  --page-padding: clamp(1.5rem, 5vw, 6rem);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 0.2s;
  --dur-normal: 0.4s;
  --dur-slow: 0.8s;

  --navbar-height: 60px;
  --footer-height: 60px;
  --content-max-width: 1200px;

  color-scheme: dark only;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

/* === GLOBAL RESET === */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  width: 100%;
  height: 100%;
  background-color: var(--color-bg);
}

body {
  width: 100%;
  min-height: 100%;
  font-family: var(--font-body);
  font-size: var(--fs-base);
  line-height: 1.6;
  color: var(--color-text-primary);
  background-color: var(--color-bg);
  overflow-x: hidden;
}

#root {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

a {
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color var(--dur-fast) ease;
}

a:hover {
  color: var(--color-accent);
}

button {
  font-family: var(--font-body);
  cursor: pointer;
  border: none;
  background: none;
  color: inherit;
}

img, video {
  max-width: 100%;
  display: block;
}

/* === SCROLLBAR === */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: var(--color-text-muted);
  border-radius: 3px;
}
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-text-muted) transparent;
}

/* === SELECTION === */
::selection {
  background-color: var(--color-accent-dim);
  color: var(--color-accent);
}
```

---

## Task 1.4: Create `src/hooks/useMediaQuery.js`

This replaces the 5+ duplicate `isMobile` useState/useEffect patterns scattered across the codebase.

```jsx
import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)

    mql.addEventListener('change', handler)
    setMatches(mql.matches)

    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
```

**Usage throughout the app**:
```jsx
const isMobile = useMediaQuery('(max-width: 768px)')
const isTouch = useMediaQuery('(hover: none)')
const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
```

---

## Task 1.5: Create `src/components/layout/SmoothScroll.jsx`

```jsx
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for Lenis RAF loop (more efficient than separate rAF)
    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

No CSS file needed for this component.

---

## Task 1.6: Create `src/components/layout/Navbar.jsx` + `src/styles/navbar.css`

**Navbar.jsx**:
```jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

export default function Navbar({ onMenuToggle, isMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__logo">
        Tomás Leote Falcão
      </Link>
      <button
        className={`navbar__menu-btn ${isMenuOpen ? 'navbar__menu-btn--open' : ''}`}
        onClick={onMenuToggle}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>
    </header>
  )
}
```

**navbar.css**:
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--page-padding);
  z-index: 100;
  transition: background-color var(--dur-normal) ease,
              backdrop-filter var(--dur-normal) ease;
}

.navbar--scrolled {
  background-color: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.navbar__logo {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: color var(--dur-fast) ease;
}

.navbar__logo:hover {
  color: var(--color-accent);
}

.navbar__menu-btn {
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 8px 0;
  transition: color var(--dur-fast) ease;
}

.navbar__menu-btn:hover {
  color: var(--color-text-primary);
}

.navbar__menu-btn--open {
  color: var(--color-text-primary);
}
```

---

## Task 1.7: Create `src/components/layout/Menu.jsx` + `src/styles/menu.css`

**Menu.jsx**:
```jsx
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
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

  useEffect(() => {
    if (isOpen) {
      // Animate overlay in
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.6,
        ease: 'power4.inOut',
      })
      // Stagger links in
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
  }, [isOpen])

  return (
    <nav ref={overlayRef} className="menu-overlay" aria-hidden={!isOpen}>
      <ul className="menu-overlay__list">
        {NAV_ITEMS.map((item, i) => (
          <li key={item.path} className="menu-overlay__item">
            <Link
              to={item.path}
              ref={(el) => (linksRef.current[i] = el)}
              className="menu-overlay__link"
              onClick={onClose}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

**menu.css**:
```css
.menu-overlay {
  position: fixed;
  inset: 0;
  background-color: var(--color-bg);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: inset(0 0 100% 0);
}

.menu-overlay__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  text-align: center;
}

.menu-overlay__item {
  overflow: hidden;
}

.menu-overlay__link {
  font-size: var(--fs-2xl);
  font-weight: 600;
  color: var(--color-text-secondary);
  text-decoration: none;
  display: block;
  padding: var(--space-xs) var(--space-md);
  transition: color var(--dur-fast) ease;
  letter-spacing: -0.02em;
}

.menu-overlay__link:hover {
  color: var(--color-white);
}

@media (max-width: 768px) {
  .menu-overlay__link {
    font-size: var(--fs-xl);
  }
}
```

---

## Task 1.8: Create `src/components/layout/Footer.jsx` + `src/styles/footer.css`

The footer is **fixed to the bottom** and visible on **every page**.

**Footer.jsx**:
```jsx
import SocialMediaIcon from '../SocialMediaIcon'
import '../../styles/footer.css'

const SOCIAL_LINKS = [
  { icon: 'fa-linkedin-in', url: 'https://www.linkedin.com/in/tom%C3%A1s-leote-falc%C3%A3o-a81860266/', label: 'LinkedIn' },
  { icon: 'fa-github', url: 'https://github.com/tomasleote', label: 'GitHub' },
  { icon: 'fa-envelope', url: 'mailto:tomas.leote@gmail.com', label: 'Email' },
  { icon: 'fa-spotify', url: 'https://open.spotify.com/user/11123207778?si=95bcfbeef7aa4209', label: 'Spotify' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__links">
        {SOCIAL_LINKS.map((link) => (
          <SocialMediaIcon
            key={link.label}
            icon={link.icon}
            url={link.url}
            label={link.label}
          />
        ))}
      </div>
    </footer>
  )
}
```

**footer.css**:
```css
.site-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--footer-height);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  background: linear-gradient(to top, var(--color-bg) 60%, transparent);
  padding: 0 var(--page-padding);
  pointer-events: none;
}

.site-footer__links {
  display: flex;
  gap: 20px;
  align-items: center;
  pointer-events: auto;
}

@media (max-width: 768px) {
  .site-footer {
    height: 50px;
  }
  .site-footer__links {
    gap: 16px;
  }
}
```

---

## Task 1.9: Extract Data Files

Create `src/data/` directory with data extracted from current sections.

**`src/data/projects.js`** — Copy the `projects` array from `src/sections/ProjectsSection.jsx` (lines 30–110). Keep all asset imports at the top. Export the array as default.

**`src/data/experiences.js`** — Copy the `experiences` array from `src/sections/ExperienceSection.jsx` (lines 20–66). Keep the CV import. Export both.

**`src/data/certifications.js`** — Copy the `certifications` array from `src/sections/CertificationsSection.jsx` (lines 31–44). Keep all PDF imports. Export the array.

---

## Task 1.10: Create Page Shells

Create 5 placeholder pages in `src/pages/`. Each is a minimal component:

```jsx
// Example: src/pages/Home.jsx
export default function Home() {
  return (
    <main className="page page--home">
      <h1>Home</h1>
    </main>
  )
}
```

Do the same for `About.jsx`, `Experience.jsx`, `Projects.jsx`, `Contact.jsx`.

---

## Task 1.11: Rewrite `src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

---

## Task 1.12: Rewrite `src/App.jsx`

```jsx
import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SmoothScroll from './components/layout/SmoothScroll'
import Navbar from './components/layout/Navbar'
import Menu from './components/layout/Menu'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <SmoothScroll>
      <Navbar onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </SmoothScroll>
  )
}

export default App
```

---

## Task 1.13: Update `vercel.json`

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Verification Checklist

- [ ] `npm install` succeeds with no errors
- [ ] `npm run dev` starts without errors
- [ ] Navigating to `/`, `/about`, `/experience`, `/projects`, `/contact` renders the correct placeholder page
- [ ] Navbar is visible and fixed on every page
- [ ] "Menu" button opens the full-screen overlay with animated links
- [ ] Clicking a menu link navigates to the correct page and closes the menu
- [ ] Footer with social icons is visible at the bottom of every page
- [ ] Social icon links open in new tabs to the correct URLs
- [ ] Smooth scroll is active (test by scrolling — should feel buttery, not jerky)
- [ ] Background is near-black (#0a0a0a)
- [ ] Font is Inter (check in DevTools → Computed → font-family)
- [ ] No console errors
- [ ] `npm run build` succeeds
