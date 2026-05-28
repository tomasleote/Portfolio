import React, { Component, useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import StreamParticleMaterial from './ParticleMaterial'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

// ─── Error Boundary for WebGL ───────────────────────────────────────────────────
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[CanvasErrorBoundary] WebGL Canvas crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      console.warn('[CanvasErrorBoundary] Rendering fallback (transparent div)')
      return <div style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
    }
    return this.props.children
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────────
const rand  = (min, max) => min + Math.random() * (max - min)

const DURATION = 25.0        // Slower movement for a graceful stream

function ParticleStream({ isMobile }) {
  const PARTICLE_COUNT = isMobile ? 4000 : 20000
  const pointsRef   = useRef()
  const materialRef = useRef()
  const mouseWorld   = useRef(new THREE.Vector3(0, 100, 0)) // off-screen initially
  const { camera }   = useThree()

  console.log(`[ParticleStream] Initializing with ${PARTICLE_COUNT} particles (mobile: ${isMobile})`)

  // ── Generate all particle attributes ──────────────────────────────────────
  const buffers = useMemo(() => {
    console.log('[ParticleStream] Generating particle buffers...')
    const offset    = new Float32Array(PARTICLE_COUNT)
    const startPos  = new Float32Array(PARTICLE_COUNT * 3)
    const control1  = new Float32Array(PARTICLE_COUNT * 3)
    const control2  = new Float32Array(PARTICLE_COUNT * 3)
    const endPos    = new Float32Array(PARTICLE_COUNT * 3)
    const sizes     = new Float32Array(PARTICLE_COUNT)
    const colors    = new Float32Array(PARTICLE_COUNT * 3)
    const speeds    = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Time offset — stagger particles across the full duration
      offset[i] = (i / PARTICLE_COUNT) * DURATION

      // Speed variation: 0.6x – 1.4x of base speed
      speeds[i] = rand(0.2, 1.4)

      // ── Bezier path design ─────────────────────────────────────────────────
      // Start: Top-left area (blue circle)
      startPos[i3]     = rand(-13, -9)
      startPos[i3 + 1] = rand(3, 7)
      startPos[i3 + 2] = rand(-3, 1)

      // Control point 1: Pulls strongly down to create the deep valley
      control1[i3]     = rand(-6, -2)
      control1[i3 + 1] = rand(-16, -10)
      control1[i3 + 2] = rand(-4, 4)

      // Control point 2: Pulls strongly up to create the peak near the text
      control2[i3]     = rand(2, 6)
      control2[i3 + 1] = rand(6, 12)
      control2[i3 + 2] = rand(-2, 0)

      // End: Middle-right / lower-middle area
      endPos[i3]     = rand(9, 13)
      endPos[i3 + 1] = rand(-4, 0)
      endPos[i3 + 2] = rand(-3, 1)

      // Size: small dots, subtle variation
      sizes[i] = rand(0.15, 0.6)

      // Color: white with slight brightness variation for depth
      const b = rand(0.55, 1.0)
      colors[i3]     = b
      colors[i3 + 1] = b
      colors[i3 + 2] = b
    }

    console.log('[ParticleStream] Buffers generated successfully')
    return { offset, startPos, control1, control2, endPos, sizes, colors, speeds }
  }, [])

  // ── Track mouse position and project to world space ───────────────────────
  useEffect(() => {
    const handlePointerMove = (e) => {
      // Convert screen coords to normalized device coordinates [-1, 1]
      const ndcX = (e.clientX / window.innerWidth)  * 2 - 1
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1

      // Project onto the z=0 plane in world space
      // Camera is at z=10 looking at origin, fov=60
      const halfH = Math.tan((60 * Math.PI / 180) / 2) * 10
      const halfW = halfH * (window.innerWidth / window.innerHeight)

      mouseWorld.current.set(
        ndcX * halfW,
        ndcY * halfH,
        0
      )
    }

    const handlePointerLeave = () => {
      // Move mouse off-screen so repulsion stops
      mouseWorld.current.set(0, 100, 0)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  // ── Animation loop ────────────────────────────────────────────────────────
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
      materialRef.current.uniforms.uMouse.value.copy(mouseWorld.current)
    }
  })

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position"  count={PARTICLE_COUNT} array={buffers.startPos} itemSize={3} />
        <bufferAttribute attach="attributes-aOffset"   count={PARTICLE_COUNT} array={buffers.offset}   itemSize={1} />
        <bufferAttribute attach="attributes-aStartPos" count={PARTICLE_COUNT} array={buffers.startPos} itemSize={3} />
        <bufferAttribute attach="attributes-aControl1" count={PARTICLE_COUNT} array={buffers.control1} itemSize={3} />
        <bufferAttribute attach="attributes-aControl2" count={PARTICLE_COUNT} array={buffers.control2} itemSize={3} />
        <bufferAttribute attach="attributes-aEndPos"   count={PARTICLE_COUNT} array={buffers.endPos}   itemSize={3} />
        <bufferAttribute attach="attributes-aSize"     count={PARTICLE_COUNT} array={buffers.sizes}    itemSize={1} />
        <bufferAttribute attach="attributes-aColor"    count={PARTICLE_COUNT} array={buffers.colors}   itemSize={3} />
        <bufferAttribute attach="attributes-aSpeed"    count={PARTICLE_COUNT} array={buffers.speeds}   itemSize={1} />
      </bufferGeometry>
      <primitive object={new StreamParticleMaterial()} ref={materialRef} attach="material" />
    </points>
  )
}

// ─── Exported Background Component ──────────────────────────────────────────────
export default function InteractiveParticlesBackground() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  console.log('[InteractiveParticlesBackground] Rendering Canvas wrapper (mobile:', isMobile, ')')

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%', height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          dpr={isMobile ? Math.min(window.devicePixelRatio, 1.5) : 1}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
        >
          <ParticleStream isMobile={isMobile} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}
