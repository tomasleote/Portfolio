import { useRef, useState, useEffect } from 'react'
import Navigation from './components/Navigation.jsx'
import MobileHeader from './components/mobile/MobileHeader.jsx'
import MobileHeroSection from './components/mobile/MobileHeroSection.jsx'
import ExperienceSection from './sections/ExperienceSection.jsx'  
import AboutSection from './sections/AboutSection.jsx'   
import ProjectsSection from './sections/ProjectsSection.jsx'
import { useMousePosition } from './hooks/useMousePosition.js'
import { useScrollSpy } from './hooks/useScrollSpy.js'
import './styles/Portfolio.css' 

function Portfolio() {
  const heroRef = useRef(null)
  const experienceRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { x, y } = useMousePosition()
  
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Section IDs for scroll spy - include hero for mobile
  const sectionIds = isMobile 
    ? ['hero', 'about', 'experience', 'projects']
    : ['about', 'experience', 'projects']
  
  // Get the active section from scroll spy
  const activeSection = useScrollSpy(sectionIds)

  const handleSectionClick = (sectionName) => {
    const refs = {
      hero: heroRef,
      experience: experienceRef, 
      about: aboutRef,
      projects: projectsRef
    }

    const targetRef = refs[sectionName]
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
  
  const handleHomeClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  // Create dynamic background style based on mouse position (disabled on mobile for performance)
  const backgroundStyle = !isMobile ? {
    background: `
      radial-gradient(600px circle at ${x}px ${y}px, 
        rgba(29, 78, 216, 0.15), 
        rgba(29, 78, 216, 0.05) 40%, 
        transparent 70%
      )
    `
  } : {}

  return (
    <div className='portfolio-wrapper' style={backgroundStyle}>
        {/* Mobile Header - Only shown on mobile */}
        {isMobile && (
            <MobileHeader
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
                onHomeClick={handleHomeClick}
                className={hasScrolled ? 'scrolled' : ''}
            />
        )}
        
        {/* Desktop Navigation - Hidden on mobile */}
        {!isMobile && (
            <div className='navigation-column'>
                <Navigation 
                    activeSection={activeSection} 
                    onSectionClick={handleSectionClick}
                />
            </div>
        )}
        
        <div className='content-column'>
            {/* Mobile Hero Section - Only on mobile */}
            {isMobile && (
                <div className='section-wrapper' ref={heroRef} id='hero'>
                    <MobileHeroSection />
                </div>
            )}
            
            <div className='section-wrapper' ref={aboutRef} id='about'>
                <div className='content-container'>
                    <AboutSection 
                        isActive={activeSection === 'about'} 
                    />
                </div>
            </div>
            
            <div className='section-wrapper' ref={experienceRef} id='experience'>
                <div className='content-container'>
                    <ExperienceSection 
                        isActive={activeSection === 'experience'} 
                    />
                </div>
            </div>
            
            <div className='section-wrapper' ref={projectsRef} id='projects'>
                <div className='content-container'>
                    <ProjectsSection 
                        isActive={activeSection === 'projects'} 
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Portfolio
