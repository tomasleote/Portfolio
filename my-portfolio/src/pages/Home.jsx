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
