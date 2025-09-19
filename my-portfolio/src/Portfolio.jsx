import { useRef } from 'react'
import Navigation from './components/Navigation.jsx'
import ExperienceSection from './sections/ExperienceSection.jsx'  
import AboutSection from './sections/AboutSection.jsx'   
import ProjectsSection from './sections/ProjectsSection.jsx'
import { useMousePosition } from './hooks/useMousePosition.js'
import { useScrollSpy } from './hooks/useScrollSpy.js'
import './styles/Portfolio.css' 

function Portfolio() {
  const experienceRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const { x, y } = useMousePosition()

  // Section IDs for scroll spy
  const sectionIds = ['about', 'experience', 'projects']
  
  // Get the active section from scroll spy
  const activeSection = useScrollSpy(sectionIds)

  const handleSectionClick = (sectionName) => {
    const refs = {
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
  
  // Create dynamic background style based on mouse position
  const backgroundStyle = {
    background: `
      radial-gradient(600px circle at ${x}px ${y}px, 
        rgba(29, 78, 216, 0.15), 
        rgba(29, 78, 216, 0.05) 40%, 
        transparent 70%
      )
    `
  }

  return (
    <div className='portfolio-wrapper' style={backgroundStyle}>
        <div className='navigation-column'>
            <Navigation 
                activeSection={activeSection} 
                onSectionClick={handleSectionClick}
            />
        </div>
        
        <div className='content-column'>
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
