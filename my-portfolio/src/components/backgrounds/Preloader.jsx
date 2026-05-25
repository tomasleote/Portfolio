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
