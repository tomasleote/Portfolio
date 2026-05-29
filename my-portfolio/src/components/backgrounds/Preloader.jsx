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
