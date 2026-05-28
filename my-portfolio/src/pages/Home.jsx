import { useState, useEffect, useRef } from 'react'
import AnimatedLink from '../components/ui/AnimatedLink'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '../styles/home.css'

const TITLES = ['Software Engineer', 'Full-Stack Everything', 'Bedroom DJ']

export default function Home({ preloaderDone }) {
  const [titleIndex, setTitleIndex] = useState(0)
  const containerRef = useRef(null)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const linksRef = useRef([])

  // Single useGSAP hook to manage both the initial hidden state and the entrance animation
  useGSAP(() => {
    // 1. Force elements to be hidden immediately
    gsap.set([nameRef.current, subtitleRef.current, ...linksRef.current], { opacity: 0, y: 40 })

    // 2. Only start the animation if preloader is finished
    if (!preloaderDone) return

    console.log('[Home] Preloader done — starting entrance animation')

    // 3. Disable CSS fallback animation so it doesn't conflict
    const elements = [nameRef.current, subtitleRef.current, ...linksRef.current].filter(Boolean)
    elements.forEach(el => {
      if (el) el.style.animation = 'none'
    })

    // 4. Run the entrance timeline
    const tl = gsap.timeline()
    tl.to(nameRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(linksRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12 }, '-=0.4')

    tl.eventCallback('onComplete', () => {
      console.log('[Home] ✅ Entrance animation completed successfully')
    })
  }, { dependencies: [preloaderDone], scope: containerRef })

  // Rotate subtitle every 3 seconds
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
