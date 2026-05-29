import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import SmoothScroll from './components/layout/SmoothScroll'
import Navbar from './components/layout/Navbar'
import Menu from './components/layout/Menu'
import Footer from './components/layout/Footer'
import InteractiveParticlesBackground from './components/backgrounds/InteractiveParticles/InteractiveParticles'
import Preloader from './components/backgrounds/Preloader'
import CustomCursor from './components/effects/CustomCursor'
import PageTransition from './components/effects/PageTransition'
import AppRoutes from './router/AppRoutes'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
        <Navbar
          onMenuToggle={() => setIsMenuOpen((p) => !p)}
          isMenuOpen={isMenuOpen}
        />
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <PageTransition>
          <AppRoutes location={location} preloaderDone={preloaderDone} />
        </PageTransition>

        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
