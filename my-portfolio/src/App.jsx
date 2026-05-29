import { useState, useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import SmoothScroll from './components/layout/SmoothScroll'
import Navbar from './components/layout/Navbar'
import Menu from './components/layout/Menu'
import Footer from './components/layout/Footer'
import InteractiveParticlesBackground from './components/backgrounds/InteractiveParticles/InteractiveParticles'
import Preloader from './components/backgrounds/Preloader'
import CustomCursor from './components/effects/CustomCursor'
import PageTransition from './components/effects/PageTransition'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

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
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home preloaderDone={preloaderDone} />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageTransition>

        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
