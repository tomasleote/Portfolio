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
