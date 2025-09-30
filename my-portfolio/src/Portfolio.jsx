import { useRef } from 'react'
import Navigation from './components/Navigation.jsx'
import TitleSection from './sections/TitleSection.jsx'
import ExperienceSection from './sections/ExperienceSection.jsx'  
import AboutSection from './sections/AboutSection.jsx'   
import ProjectsSection from './sections/ProjectsSection.jsx'
import { useMousePosition } from './hooks/useMousePosition.js'
import { useScrollSpy } from './hooks/useScrollSpy.js'
import './styles/Portfolio.css'
import './styles/SharedStyles.css' 

function Portfolio() {
  const titleRef = useRef(null)
  const experienceRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const { x, y } = useMousePosition()

  // Section IDs for scroll spy
  const sectionIds = ['title', 'about', 'experience', 'projects']
  
  // Get the active section from scroll spy
  const activeSection = useScrollSpy(sectionIds)

  const handleSectionClick = (sectionName) => {
    const refs = {
      title: titleRef,
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
    <div className='portfolio-container'>
        <Navigation 
            activeSection={activeSection} 
            onSectionClick={handleSectionClick}
        />
        
        <main className='main-content' style={backgroundStyle}>
            <section ref={titleRef} id='title' className='section'>
                <TitleSection />
            </section>
            
            <section ref={aboutRef} id='about' className='section'>
                <AboutSection isActive={activeSection === 'about'} />
            </section>
            
            <section ref={experienceRef} id='experience' className='section'>
                <ExperienceSection isActive={activeSection === 'experience'} />
            </section>
            
            <section ref={projectsRef} id='projects' className='section'>
                <ProjectsSection isActive={activeSection === 'projects'} />
            </section>
        </main>
    </div>
  )
}

export default Portfolio
