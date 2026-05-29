import { useState, useMemo, useEffect } from 'react'
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

  // Lifted theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  console.log(`[App] Render — path: "${location.pathname}", preloaderDone: ${preloaderDone}, theme: ${theme}`)

  // Memoize the particle background, but recreate if theme changes
  const particleBackground = useMemo(() => {
    console.log('[App] Creating particle background (memoized)')
    return <InteractiveParticlesBackground theme={theme} />
  }, [theme])

  return (
    <SmoothScroll>
      {/* Background Layer: Kept mounted to prevent WebGL Context Loss, hidden when not on Home */}
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

      {/* All page content at zIndex:1 — renders above the particle canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
        <CustomCursor />
        <Navbar
          onMenuToggle={() => setIsMenuOpen((p) => !p)}
          isMenuOpen={isMenuOpen}
          theme={theme}
          toggleTheme={toggleTheme}
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
