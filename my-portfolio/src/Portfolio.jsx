import { useEffect, useRef, useState } from 'react'
import Navigation from './components/Navigation.jsx'
import ExperienceSection from './sections/ExperienceSection.jsx'  
import AboutSection from './sections/AboutSection.jsx'   
import ProjectsSection from './sections/ProjectsSection.jsx' 
import './styles/Portfolio.css' 

function Portfolio() {
  const [activeSection, setActiveSection] = useState('about')
  const experienceRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName)
  }

  useEffect(() => {
    const refs = {
        experience: experienceRef, 
        about: aboutRef,
        projects: projectsRef
    }

    const targetRef = refs[activeSection]

    if (targetRef && targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth'})
    }
  }, [activeSection])
  
  return (
    <div className='portfolio-wrapper'>
        <div className='navigation-column'>
            <Navigation 
                activeSection={activeSection} 
                onSectionClick={handleSectionClick}
            />
        </div>
        
        <div className='content-column'>
            <div className='section-wrapper' ref={aboutRef}>
                <div className='content-container'>
                    <AboutSection 
                        isActive={activeSection === 'about'} 
                    />
                </div>
            </div>
            
            <div className='section-wrapper' ref={experienceRef}>
                <div className='content-container'>
                    <ExperienceSection 
                        isActive={activeSection === 'experience'} 
                    />
                </div>
            </div>
            
            <div className='section-wrapper' ref={projectsRef}>
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