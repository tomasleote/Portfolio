import { useState, useEffect, useRef } from 'react'

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const animationFrame = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Cancel any pending animation frame
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      
      // Use requestAnimationFrame for smooth updates
      animationFrame.current = requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        })
      })
    }

    // Add event listener to window for global mouse tracking
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup function to remove event listener and cancel animation frame
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [])

  return mousePosition
}
