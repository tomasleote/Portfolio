import { useState, useEffect, useRef } from 'react'
import AnimatedLink from '../components/ui/AnimatedLink'
import gsap from 'gsap'
import '../styles/home.css'

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

    console.log('[Home] Starting entrance animation (3s delay)')

    // Cancel the CSS fallback animations so GSAP can take over cleanly
    const elements = [nameRef.current, subtitleRef.current, ...linksRef.current].filter(Boolean)
    elements.forEach(el => {
      if (el) el.style.animation = 'none'
    })

    // Set initial hidden state via GSAP (replaces CSS animation start)
    gsap.set(nameRef.current, { opacity: 0, y: 60 })
    gsap.set(subtitleRef.current, { opacity: 0, y: 40 })
    gsap.set(linksRef.current, { opacity: 0, y: 30 })

    const tl = gsap.timeline({ delay: 3 })

    tl.to(nameRef.current,
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .to(subtitleRef.current,
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .to(linksRef.current,
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12 },
      '-=0.4'
    )

    tl.eventCallback('onComplete', () => {
      console.log('[Home] ✅ Entrance animation completed successfully')
    })

    // ── Safety fallback: if GSAP animation never fires, force-show content ──
    const safetyTimer = setTimeout(() => {
      if (nameRef.current && parseFloat(getComputedStyle(nameRef.current).opacity) < 0.1) {
        console.warn('[Home] ⚠️ Safety timeout hit (8s) — forcing content visible')
        tl.kill()
        gsap.set(elements, { opacity: 1, y: 0 })
      }
    }, 8000)

    return () => {
      clearTimeout(safetyTimer)
    }
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
    </main>
  )
}
