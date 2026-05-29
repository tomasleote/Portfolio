// src/components/ui/Marquee.jsx
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { techStack } from '../../data/config'
import '../../styles/marquee.css'

function TechIcon({ item }) {
  const className = item.lib === 'fa' ? `fab ${item.icon}` : item.icon
  return (
    <div className="marquee__item" aria-hidden="true">
      <i className={`marquee__icon ${className}`} />
      <span className="marquee__label">{item.name}</span>
    </div>
  )
}

export default function Marquee() {
  const trackRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      trackRef.current,
      { xPercent: 0 },
      { xPercent: -50, duration: 25, ease: 'none', repeat: -1 }
    )
  }, { scope: trackRef })

  // Duplicate the list so the -50% wrap is seamless.
  const items = [...techStack, ...techStack]

  return (
    <div className="marquee" role="marquee" aria-label="Tech stack">
      <div ref={trackRef} className="marquee__track">
        {items.map((item, i) => (
          <TechIcon key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}
