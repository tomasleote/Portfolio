import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { projects } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import ProjectRow from '../components/ui/ProjectRow'
import TextReveal from '../components/effects/TextReveal'
import AnimatedLink from '../components/ui/AnimatedLink'
import { social } from '../data/config'
import ImageModal from '../components/ImageModal'
import VideoModal from '../components/VideoModal'
import '../styles/projects.css'

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const imageRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Animate image/video in/out
  useEffect(() => {
    if (!imageRef.current || isMobile) return

    if (hoveredIndex !== null && (projects[hoveredIndex]?.imageUrl || projects[hoveredIndex]?.videoUrl)) {
      gsap.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      })
    } else {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }, [hoveredIndex, isMobile])

  const currentProject = hoveredIndex !== null ? projects[hoveredIndex] : null

  const handleImageClick = () => {
    if (currentProject) {
      setIsModalOpen(true)
    }
  }

  return (
    <main className="projects-page" onMouseLeave={() => setHoveredIndex(null)}>
      {/* Floating image/video preview (desktop only) */}
      {!isMobile && (
        <div className="projects-page__image-col">
          <div 
            ref={imageRef} 
            className="projects-page__image-wrapper" 
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
            data-cursor
          >
            {currentProject?.videoUrl ? (
              <video
                src={currentProject.videoUrl}
                className="projects-page__image"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : currentProject?.imageUrl ? (
              <img
                src={currentProject.imageUrl}
                alt={currentProject.title || ''}
                className="projects-page__image"
              />
            ) : null}
          </div>
        </div>
      )}

      {/* Project list */}
      <div className="projects-page__list-col">
        <div className="projects-page__header">
          <TextReveal tag="h1" className="projects-page__title">Projects</TextReveal>
          <TextReveal tag="span" className="projects-page__count" delay={0.2}>
            {projects.length}
          </TextReveal>
        </div>

        <div className="projects-page__list">
          {projects.map((project, index) => (
            <ProjectRow
              key={index}
              index={index}
              title={project.title}
              category={project.category}
              description={project.description}
              technologies={project.technologies}
              url={project.url}
              documentUrl={project.documentUrl}
              documentLabel={project.documentLabel}
              isExpanded={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
            />
          ))}
        </div>

        <TextReveal className="projects-page__footer" delay={0.3}>
          <AnimatedLink
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="projects-page__github-link"
          >
            View All on GitHub →
          </AnimatedLink>
        </TextReveal>
      </div>

      {/* Fullscreen Modals */}
      {currentProject?.videoUrl ? (
        <VideoModal 
          videoUrl={currentProject.videoUrl} 
          title={currentProject.title} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      ) : currentProject?.imageUrl ? (
        <ImageModal 
          imageUrl={currentProject.imageUrl} 
          title={currentProject.title} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      ) : null}
    </main>
  )
}
