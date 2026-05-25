import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../../styles/ExperienceCard.css'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceCard({
  timeframe, role, company, location, companyUrl, description, technologies, index
}) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [index])

  const handleClick = () => {
    if (companyUrl) window.open(companyUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      ref={cardRef}
      className={`exp-card ${companyUrl ? 'exp-card--clickable' : ''}`}
      onClick={handleClick}
      data-cursor={companyUrl ? '' : undefined}
    >
      <div className="exp-card__timeframe">{timeframe}</div>
      <div className="exp-card__body">
        <h3 className="exp-card__title">{role} · {company}</h3>
        <p className="exp-card__location">{location}</p>
        <p className="exp-card__description">{description}</p>
        <div className="exp-card__tags">
          {technologies.map((tech, i) => (
            <span key={i} className="exp-card__tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
