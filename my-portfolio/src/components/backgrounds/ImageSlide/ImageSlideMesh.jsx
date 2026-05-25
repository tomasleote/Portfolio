import React, { useMemo, useRef, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import ImageSlideMaterial from './ImageSlideMaterial'

function ImageSlideGeometry() {
  const buffers = useMemo(() => {
    const positions = []
    const indices_array = []

    const numPtsX = 144
    const numPtsY = 96
    const deltaStep = 0.2

    const posXOffset = -numPtsX * deltaStep * 0.5
    const posYOffset = -numPtsY * deltaStep * 0.5

    // generate verts
    for (let y = 0; y < numPtsY; y++) {
      for (let x = 0; x < numPtsX; x++) {
        const posX = posXOffset + x * deltaStep
        const posY = posYOffset + y * deltaStep
        const posZ = 0.0

        positions.push(posX, posY, posZ)
      }
    }

    // generate indices
    for (let y = 0; y < numPtsY - 1; y++) {
      const rowIndexOffset = y * numPtsX

      for (let x = 0; x < numPtsX - 1; x++) {
        const indexCurr = rowIndexOffset + x
        const indexRight = indexCurr + 1
        const indexTop = indexCurr + numPtsX
        const indexTopRight = indexTop + 1

        indices_array.push(indexCurr, indexRight)
        indices_array.push(indexCurr, indexTop)
        indices_array.push(indexCurr, indexTopRight)
      }
    }

    // top row - needs to stitch together
    for (let x = 0; x < numPtsX - 1; x++) {
      const index0 = (numPtsY - 1) * numPtsX + x
      const index1 = index0 + 1
      indices_array.push(index0, index1)
    }

    // right col - needs to stitch together
    for (let y = 0; y < numPtsY - 1; y++) {
      const index0 = y * numPtsX + numPtsX - 1
      const index1 = index0 + numPtsX
      indices_array.push(index0, index1)
    }

    return {
      positions: new Float32Array(positions),
      indices: new Uint16Array(indices_array)
    }
  }, [])

  return (
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" count={buffers.positions.length / 3} array={buffers.positions} itemSize={3} />
      <bufferAttribute attach="index" count={buffers.indices.length} array={buffers.indices} itemSize={1} />
    </bufferGeometry>
  )
}

function ImageSlideMeshContent({ images, onHover, onHoverOut, ...props }) {
  const meshRef = useRef()
  const materialRef = useRef()

  // Extract just the URLs for the texture loader
  const urls = useMemo(() => images.map(img => img.url), [images])
  
  // Load all textures
  const textures = useLoader(THREE.TextureLoader, urls)

  // Apply filtering
  useMemo(() => {
    textures.forEach(t => {
      t.minFilter = THREE.LinearMipmapLinearFilter
    })
  }, [textures])

  const currentIdxRef = useRef(0)
  const nextIdxRef = useRef(1)
  const transitionTimer = useRef(0)
  
  const holdTime = 2.0 // Time to show an image clearly
  const fadeTime = 1.5 // Time to crossfade to the next

  useFrame((state, delta) => {
    if (!materialRef.current) return

    const t = state.clock.getElapsedTime()
    materialRef.current.uniforms.time.value = t

    transitionTimer.current += delta
    const totalCycle = holdTime + fadeTime

    let rate = 0
    if (transitionTimer.current < holdTime) {
      rate = 0 // Fully showing current texture
    } else if (transitionTimer.current < totalCycle) {
      // Smoothly interpolate from 0 to 1
      const progress = (transitionTimer.current - holdTime) / fadeTime
      rate = (1 - Math.cos(progress * Math.PI)) / 2
    } else {
      // Cycle complete, swap indices
      transitionTimer.current = 0
      currentIdxRef.current = nextIdxRef.current
      nextIdxRef.current = (nextIdxRef.current + 1) % textures.length
      rate = 0
    }

    materialRef.current.uniforms.uTexture1.value = textures[currentIdxRef.current]
    materialRef.current.uniforms.uTexture2.value = textures[nextIdxRef.current]
    materialRef.current.uniforms.rate.value = rate
  })

  const handlePointerMove = (e) => {
    e.stopPropagation() // Prevent bubbling
    if (onHover) {
      const activeSubtitle = images[currentIdxRef.current].subtitle
      onHover({ x: e.clientX, y: e.clientY, text: activeSubtitle })
    }
  }

  const handlePointerOut = (e) => {
    if (onHoverOut) onHoverOut()
  }

  return (
    <lineSegments 
      ref={meshRef} 
      {...props}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      onPointerLeave={handlePointerOut} // fallback
    >
      <ImageSlideGeometry />
      <primitive object={new ImageSlideMaterial()} ref={materialRef} attach="material" />
    </lineSegments>
  )
}

// Wrap in Suspense because useLoader is asynchronous
export default function ImageSlideMesh({ images, fallbackColor = '#333333', onHover, onHoverOut, ...props }) {
  return (
    <Suspense fallback={
      <mesh {...props}>
        <planeGeometry args={[19.2, 19.2]} />
        <meshBasicMaterial color={fallbackColor} wireframe />
      </mesh>
    }>
      <ImageSlideMeshContent images={images} onHover={onHover} onHoverOut={onHoverOut} {...props} />
    </Suspense>
  )
}
