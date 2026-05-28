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
      console.log('[PageTransition] First render — skipping transition, ensuring content visible')
      // Explicitly set content visible on first load
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 1, y: 0 })
      }
      return
    }

    console.log('[PageTransition] Navigating to:', location.pathname)

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
