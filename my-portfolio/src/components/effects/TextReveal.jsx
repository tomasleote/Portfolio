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
