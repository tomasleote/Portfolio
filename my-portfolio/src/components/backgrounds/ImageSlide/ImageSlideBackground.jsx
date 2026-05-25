import React from 'react'
import { Canvas } from '@react-three/fiber'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import ImageSlideMesh from './ImageSlideMesh'

export default function ImageSlideBackground() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Increased scale and adjusted for new horizontal 3:2 rectangle shape
  const scale = isMobile ? 0.25 : 0.35

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%', height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        dpr={isMobile ? Math.min(window.devicePixelRatio, 1.5) : 1}
        gl={{ antialias: false }}
      >
        {/* Left slide - pushed to left edge, higher up */}
        <ImageSlideMesh 
          position={[-11, 4.5, 0]} 
          scale={scale} 
          url1="/data/000018.jpg" 
          url2="/data/000025.jpeg" 
          fallbackColor="#ff0000"
        />

        {/* Right slide - pushed to right edge, lower down */}
        <ImageSlideMesh 
          position={[11, -4.5, 0]} 
          scale={scale} 
          url1="/data/000037.jpeg" 
          url2="/data/0017_17.jpeg" 
          fallbackColor="#0000ff"
        />
      </Canvas>
    </div>
  )
}
