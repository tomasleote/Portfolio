import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import '../../styles/projectRow.css'

export default function ProjectRow({
  title,
  category,
  description,
  technologies,
  url,
  documentUrl,
  documentLabel,
  isExpanded,
  onHover,
  index,
}) {
  const detailsRef = useRef(null)
  const arrowRef = useRef(null)

  useEffect(() => {
    if (isExpanded) {
      gsap.to(detailsRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      })
      gsap.to(arrowRef.current, { rotation: 45, duration: 0.3 })
    } else {
      gsap.to(detailsRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
      })
      gsap.to(arrowRef.current, { rotation: 0, duration: 0.3 })
    }
  }, [isExpanded])

  const handleClick = () => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleDocClick = (e) => {
    e.stopPropagation()
    window.open(documentUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className={`project-row ${isExpanded ? 'project-row--expanded' : ''}`}
      onMouseEnter={onHover}
      onClick={handleClick}
      data-cursor
    >
      <div className="project-row__header">
        <span ref={arrowRef} className="project-row__arrow">→</span>
        <span className="project-row__title">{title}</span>
        <span className="project-row__category">{category}</span>
      </div>

      <div ref={detailsRef} className="project-row__details">
        <p className="project-row__description">{description}</p>
        
        {documentUrl && (
          <button 
            className="project-row__doc-btn" 
            onClick={handleDocClick}
            data-cursor
          >
            ↓ {documentLabel || "Download PDF"}
          </button>
        )}

        <div className="project-row__tags">
          {technologies.map((tech, i) => (
            <span key={i} className="project-row__tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
