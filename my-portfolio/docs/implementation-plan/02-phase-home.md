# Phase 2: Home Page + WebGL Background + Custom Cursor + Page Transitions

**Estimated time**: 2 days  
**Dependencies**: Phase 1 complete  
**Goal**: Build the hero home page with MorphBlob WebGL background, preloader, custom cursor, and page transition animations.

---

## Task 2.1: Create `src/components/backgrounds/MorphBlob.jsx`

A full-screen WebGL background using React Three Fiber. Renders an organic wireframe blob animated by simplex noise.

```jsx
import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MathUtils, Vector2 } from 'three'
import { createNoise3D } from 'simplex-noise'
import { useMediaQuery } from '../../hooks/useMediaQuery'

function Blob({ mouseRef }) {
  const mesh = useRef()
  const noise3D = useMemo(() => createNoise3D(), [])
  const basePositions = useRef(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const geo = mesh.current.geometry
    const positions = geo.attributes.position

    // Store original positions on first frame
    if (!basePositions.current) {
      basePositions.current = new Float32Array(positions.array)
    }

    const time = clock.getElapsedTime() * 0.25

    for (let i = 0; i < positions.count; i++) {
      const ix = i * 3
      const bx = basePositions.current[ix]
      const by = basePositions.current[ix + 1]
      const bz = basePositions.current[ix + 2]

      // 3D simplex noise displacement
      const noise = noise3D(
        bx * 1.2 + time * 0.6,
        by * 1.2 + time * 0.4,
        bz * 1.2 + time * 0.5
      )
      const displacement = noise * 0.35

      // Displace along the vertex normal (radial direction from center)
      const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1
      positions.array[ix]     = bx + (bx / len) * displacement
      positions.array[ix + 1] = by + (by / len) * displacement
      positions.array[ix + 2] = bz + (bz / len) * displacement
    }
    positions.needsUpdate = true

    // Subtle mouse-follow rotation (lerped for smoothness)
    const mx = mouseRef.current?.x || 0
    const my = mouseRef.current?.y || 0
    mesh.current.rotation.x = MathUtils.lerp(mesh.current.rotation.x, my * 0.3, 0.03)
    mesh.current.rotation.y = MathUtils.lerp(mesh.current.rotation.y, mx * 0.3, 0.03)
  })

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[2.2, 18]} />
      <meshBasicMaterial
        color="#1a2a3a"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  )
}

export default function MorphBlob() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const mouseRef = useRef({ x: 0, y: 0 })

  // Mobile fallback: simple CSS gradient (no WebGL)
  if (isMobile) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1,
        background: 'radial-gradient(ellipse at 50% 50%, #0d1520 0%, #0a0a0a 70%)'
      }} />
    )
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: -1 }}
      onMouseMove={(e) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Blob mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
```

**Key performance details**:
- `dpr={[1, 1.5]}` — caps pixel ratio so it doesn't render at 3x on retina
- `antialias: false` — wireframe doesn't benefit from AA
- `icosahedronGeometry args={[2.2, 18]}` — 18 subdivisions is enough detail without tanking perf
- Mobile gets a CSS gradient fallback, no WebGL

---

## Task 2.2: Create `src/components/backgrounds/Preloader.jsx` + `src/styles/preloader.css`

**Preloader.jsx**:
```jsx
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../../styles/preloader.css'

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null)
  const textRef = useRef(null)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShow(false)
        onComplete?.()
      }
    })

    // Text pulse animation while loading
    tl.fromTo(textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
    // Wait a minimum time for WebGL to init
    .to({}, { duration: 1.5 })
    // Fade out text
    .to(textRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
    // Slide overlay up
    .to(overlayRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power4.inOut'
    })
  }, [])

  if (!show) return null

  return (
    <div ref={overlayRef} className="preloader">
      <span ref={textRef} className="preloader__text">Loading...</span>
    </div>
  )
}
```

**preloader.css**:
```css
.preloader {
  position: fixed;
  inset: 0;
  background-color: var(--color-bg);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preloader__text {
  font-size: var(--fs-sm);
  color: var(--color-text-secondary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 300;
}
```

---

## Task 2.3: Create `src/components/effects/CustomCursor.jsx` + `src/styles/cursor.css`

**CustomCursor.jsx**:
```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import '../../styles/cursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const followerRef = useRef(null)
  const isTouch = useMediaQuery('(hover: none)')

  useEffect(() => {
    if (isTouch) return

    const dot = dotRef.current
    const follower = followerRef.current
    if (!dot || !follower) return

    // Move cursor elements
    const onMouseMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' })
    }

    // Scale up on interactive elements
    const onEnter = () => {
      gsap.to(follower, { scale: 2.5, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.3 })
    }

    const onLeave = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMouseMove)

    // Use MutationObserver to attach hover listeners to dynamic elements
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
      observer.disconnect()
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
```

**cursor.css**:
```css
/* Hide default cursor globally when custom cursor is active */
@media (hover: hover) {
  * {
    cursor: none !important;
  }
}

.cursor-dot {
  position: fixed;
  top: -4px;
  left: -4px;
  width: 8px;
  height: 8px;
  background-color: var(--color-white);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  mix-blend-mode: difference;
}

.cursor-follower {
  position: fixed;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99998;
  mix-blend-mode: difference;
}
```

---

## Task 2.4: Create `src/components/effects/PageTransition.jsx`

```jsx
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

export default function PageTransition({ children }) {
  const location = useLocation()
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip animation on first render (preloader handles that)
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const tl = gsap.timeline()

    // 1. Overlay sweeps in from bottom
    tl.fromTo(overlayRef.current,
      { scaleY: 0, transformOrigin: 'bottom center' },
      { scaleY: 1, duration: 0.5, ease: 'power4.inOut' }
    )
    // 2. Scroll to top
    .add(() => window.scrollTo(0, 0))
    // 3. Overlay sweeps out to top
    .to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 0.5,
      ease: 'power4.inOut'
    })
    // 4. Content fades in
    .fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
  }, [location.pathname])

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
          scaleY: 0,
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

---

## Task 2.5: Create `src/components/effects/TextReveal.jsx` + `src/styles/textReveal.css`

Reusable component used across About, Experience, and other pages. Created in Phase 2 so subsequent phases can use it.

**TextReveal.jsx**:
```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.fromTo(el,
      {
        y,
        opacity: 0,
        clipPath: 'inset(0 0 100% 0)',
      },
      {
        y: 0,
        opacity: 1,
        clipPath: 'inset(0 0 0% 0)',
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [delay, duration, y])

  return (
    <Tag ref={ref} className={`text-reveal ${className}`}>
      {children}
    </Tag>
  )
}
```

**textReveal.css**:
```css
.text-reveal {
  will-change: transform, opacity, clip-path;
}
```

---

## Task 2.6: Build `src/pages/Home.jsx` + `src/styles/home.css`

**Home.jsx**:
```jsx
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import '../../styles/home.css'

const TITLES = ['Software Engineer', 'Full-Stack Everything', 'Bedroom DJ']

export default function Home() {
  const [titleIndex, setTitleIndex] = useState(0)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const linksRef = useRef([])
  const hasAnimated = useRef(false)

  // Entrance animation (once)
  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const tl = gsap.timeline({ delay: 2.5 }) // delay accounts for preloader

    tl.fromTo(nameRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(linksRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12 },
      '-=0.4'
    )
  }, [])

  // Rotate subtitle every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="home">
      <div className="home__content">
        <h1 ref={nameRef} className="home__name">
          Tomás Leote Falcão
        </h1>
        <p ref={subtitleRef} key={titleIndex} className="home__subtitle">
          {TITLES[titleIndex]}
        </p>
        <nav className="home__links">
          <Link to="/about" ref={(el) => (linksRef.current[0] = el)} className="home__link">
            → About Me
          </Link>
          <Link to="/projects" ref={(el) => (linksRef.current[1] = el)} className="home__link">
            → Projects
          </Link>
          <Link to="/experience" ref={(el) => (linksRef.current[2] = el)} className="home__link">
            → Experience
          </Link>
        </nav>
      </div>
    </main>
  )
}
```

**home.css**:
```css
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--page-padding);
  padding-bottom: calc(var(--footer-height) + var(--space-md));
}

.home__content {
  text-align: center;
  max-width: 900px;
}

.home__name {
  font-size: var(--fs-hero);
  font-weight: 700;
  color: var(--color-white);
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: var(--space-sm);
}

.home__subtitle {
  font-size: var(--fs-lg);
  color: var(--color-accent);
  font-weight: 400;
  margin-bottom: var(--space-lg);
  min-height: 1.8em;
  animation: subtitleFade 0.6s ease-out;
}

@keyframes subtitleFade {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.home__links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.home__link {
  font-size: var(--fs-base);
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-xs) var(--space-md);
  transition: color var(--dur-fast) ease, transform var(--dur-fast) ease;
  letter-spacing: 0.02em;
}

.home__link:hover {
  color: var(--color-white);
  transform: translateX(8px);
}

@media (max-width: 768px) {
  .home__name {
    font-size: clamp(2rem, 10vw, 3.5rem);
  }
  .home__subtitle {
    font-size: var(--fs-base);
  }
}
```

---

## Task 2.7: Update `src/App.jsx` to integrate Phase 2 components

Add Preloader, MorphBlob, CustomCursor, and PageTransition to the App:

```jsx
import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SmoothScroll from './components/layout/SmoothScroll'
import Navbar from './components/layout/Navbar'
import Menu from './components/layout/Menu'
import Footer from './components/layout/Footer'
import MorphBlob from './components/backgrounds/MorphBlob'
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

  return (
    <SmoothScroll>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <MorphBlob />
      <CustomCursor />
      <Navbar
        onMenuToggle={() => setIsMenuOpen((p) => !p)}
        isMenuOpen={isMenuOpen}
      />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <PageTransition>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageTransition>

      <Footer />
    </SmoothScroll>
  )
}

export default App
```

---

## Verification Checklist

- [ ] Home page fills viewport, name is large and centered
- [ ] Rotating subtitle changes every 3s with fade animation
- [ ] MorphBlob renders behind content — organic wireframe blob "breathing"
- [ ] Blob reacts subtly to mouse movement
- [ ] Mobile shows CSS gradient fallback instead of WebGL
- [ ] Preloader shows "Loading..." then animates away
- [ ] Custom cursor shows dot + follower circle on desktop
- [ ] Cursor scales up when hovering links/buttons
- [ ] Cursor is hidden on touch devices
- [ ] `mix-blend-mode: difference` inverts cursor color against content
- [ ] Clicking nav links triggers page transition (overlay sweep)
- [ ] CTA links on home page navigate correctly
- [ ] No console errors or WebGL warnings
- [ ] Performance: smooth 60fps on desktop, no jank on mobile
