import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import '../../styles/cursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const followerRef = useRef(null)
  const isTouch = useMediaQuery('(hover: none)')

  useEffect(() => {
    if (isTouch) return

    const dot = dotRef.current
    const follower = followerRef.current
    if (!dot || !follower) return

    // Move cursor elements
    const onMouseMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' })
    }

    // Scale up on interactive elements
    const onEnter = () => {
      gsap.to(follower, { scale: 2.5, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.3 })
    }

    const onLeave = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMouseMove)

    // Use MutationObserver to attach hover listeners to dynamic elements
    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attachListeners()
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
