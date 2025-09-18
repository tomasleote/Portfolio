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
    <div className='portfolio-container'>
        <div className='nav'>
            <Navigation 
                activeSection={activeSection} 
                onSectionClick={handleSectionClick}
            />
        </div>
        
        <section className='main'>
            <AboutSection 
                sectionRef={aboutRef}
                isActive={activeSection === 'about'} 
            />
            <ExperienceSection 
                sectionRef={experienceRef} 
                isActive={activeSection === 'experience'} 
            />
            <ProjectsSection 
                sectionRef={projectsRef}
                isActive={activeSection === 'projects'} 
            />
        </section>
    </div>
  )
}

export default Portfolio
