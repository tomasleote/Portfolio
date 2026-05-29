import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import SmoothScroll from './components/layout/SmoothScroll'
import Layout from './components/layout/Layout'
import InteractiveParticlesBackground from './components/backgrounds/InteractiveParticles/InteractiveParticles'
import Preloader from './components/backgrounds/Preloader'
import CustomCursor from './components/effects/CustomCursor'
import AppRoutes from './router/AppRoutes'

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const location = useLocation()
  const { theme } = useTheme()

  const particleBackground = useMemo(() => {
    return <InteractiveParticlesBackground theme={theme} />
  }, [theme])

  return (
    <SmoothScroll>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: location.pathname === '/' ? 1 : 0,
          visibility: location.pathname === '/' ? 'visible' : 'hidden',
          transition: 'opacity 0.6s ease, visibility 0.6s'
        }}
      >
        {particleBackground}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
        <CustomCursor />
        <Layout>
          <AppRoutes location={location} preloaderDone={preloaderDone} />
        </Layout>
      </div>
    </SmoothScroll>
  )
}

export default App
