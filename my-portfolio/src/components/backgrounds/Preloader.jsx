import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../../styles/preloader.css'

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null)
  const textRef = useRef(null)
  const [show, setShow] = useState(true)
  const completedRef = useRef(false)

  useEffect(() => {
    console.log('[Preloader] Mounted, starting GSAP timeline')

    const finish = () => {
      if (completedRef.current) return // prevent double-fire
      completedRef.current = true
      console.log('[Preloader] Completing — hiding overlay and calling onComplete')
      setShow(false)
      onComplete?.()
    }

    const tl = gsap.timeline({ onComplete: finish })

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

    // ── Safety timeout: force-complete if GSAP timeline never finishes ──
    const safetyTimer = setTimeout(() => {
      if (!completedRef.current) {
        console.warn('[Preloader] ⚠️ Safety timeout hit (5s) — force-completing preloader')
        tl.kill()
        finish()
      }
    }, 5000)

    return () => {
      clearTimeout(safetyTimer)
      tl.kill()
    }
  }, [])

  if (!show) return null

  return (
    <div ref={overlayRef} className="preloader">
      <span ref={textRef} className="preloader__text">Loading...</span>
    </div>
  )
}
