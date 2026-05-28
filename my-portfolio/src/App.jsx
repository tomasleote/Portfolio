import { useState, useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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

  console.log(`[App] Render — path: "${location.pathname}", preloaderDone: ${preloaderDone}`)

  // Memoize the particle background so it never gets destroyed by parent re-renders
  const particleBackground = useMemo(() => {
    console.log('[App] Creating particle background (memoized)')
    return <InteractiveParticlesBackground />
  }, [])

  return (
    <SmoothScroll>
      {/* Background Layer: Only shown on Home page */}
      {location.pathname === '/' && particleBackground}

      {/* All page content at zIndex:1 — renders above the particle canvas */}
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
            <Route path="/" element={<Home />} />
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
