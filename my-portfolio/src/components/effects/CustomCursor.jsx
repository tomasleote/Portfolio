import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import '../../styles/cursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const followerRef = useRef(null)
  const isTouch = useMediaQuery('(hover: none)')

  useGSAP((context, contextSafe) => {
    if (isTouch) return

    const dot = dotRef.current
    const follower = followerRef.current
    if (!dot || !follower) return

    const onMouseMove = contextSafe((e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' })
    })

    const onEnter = contextSafe(() => {
      gsap.to(follower, { scale: 2.5, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.3 })
    })

    const onLeave = contextSafe(() => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    })

    window.addEventListener('mousemove', onMouseMove)

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
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      observer.disconnect()
    }
  }, { dependencies: [isTouch] })

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
