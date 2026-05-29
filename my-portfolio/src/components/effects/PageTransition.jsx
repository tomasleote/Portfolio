import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function PageTransition({ children }) {
  const location = useLocation()
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const isFirstRender = useRef(true)

  useGSAP(() => {
    // Skip animation on first render (preloader handles that); ensure content visible.
    if (isFirstRender.current) {
      isFirstRender.current = false
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 1, y: 0 })
      }
      return
    }

    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current,
      { scaleY: 0, transformOrigin: 'bottom center' },
      { scaleY: 1, duration: 0.5, ease: 'power4.inOut' }
    )
      .add(() => window.scrollTo(0, 0))
      .to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.5,
        ease: 'power4.inOut'
      })
      .fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
  }, { dependencies: [location.pathname] })

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
          transform: 'scaleY(0)',
          pointerEvents: 'none',
        }}
      />
      <div ref={contentRef}>
        {children}
      </div>
    </>
  )
}
