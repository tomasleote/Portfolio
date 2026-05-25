import React, { useState } from 'react'
import TextReveal from '../components/effects/TextReveal'
import cvFile from '../assets/CV_TomasLeote_Lisboa_2026.pdf'
import { Canvas } from '@react-three/fiber'
import ImageSlideMesh from '../components/backgrounds/ImageSlide/ImageSlideMesh'
import '../styles/about.css'

const IMAGES = [
  { url: '/data/000018.jpg', subtitle: 'Sunsent in Koh Phangan' },
  { url: '/data/000025.jpeg', subtitle: 'Ninh Bihn, Vietnam' },
  { url: '/data/000037.jpeg', subtitle: 'Cat Ba Island, Vietnam' },
  { url: '/data/0017_17.jpeg', subtitle: 'Dogs in Sapa, Vietnam' },
  { url: '/data/0024_24.jpg', subtitle: 'Ha Giang, Vietnam' },
  { url: '/data/0026_26.jpg', subtitle: 'Old lady in Cao Bang, Vietnam' },
  { url: '/data/0029_29.jpeg', subtitle: 'Ha Giang, Vietnam' },
  { url: '/data/DSC05947.jpg', subtitle: 'Project Umbra event' },
  { url: '/data/umbra (116 of 123).jpg', subtitle: 'Project Umbra event' },
  { url: '/data/zarautz.jpg', subtitle: 'Zarautz coast, Spain' },
  { url: '/data/000012.JPEG', subtitle: 'Koh Tao, Thailand' },
  { url: '/data/000032.JPEG', subtitle: 'Bich Dong Pagoda, Ninh Bihn, Vietnam' },
  { url: '/data/0012_12.JPEG', subtitle: 'Ha Long Bay, Vietnam' },
  { url: '/data/250120370032.JPEG', subtitle: 'Tonle Sap, Cambodia' },
  { url: '/data/9941a2f8-ac2d-4e3f-a01a-0f4934dc81d2.JPEG', subtitle: 'Kingsday, Amsterdam' },
  { url: '/data/A7AE16EE-FFBF-4204-8C77-6E3356604621.JPEG', subtitle: 'Project Umbra event' },
  { url: '/data/IMG_5291.JPEG', subtitle: 'Melbourne Beach, Florida' },
  { url: '/data/IMG_5292.JPEG', subtitle: 'Costa Vicentina, Portugal' },
  { url: '/data/IMG_5296.JPEG', subtitle: 'Paredes de Coura, Portugal' }
]

export default function About() {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' })

  const currentTechStack = [
    "TypeScript", "JavaScript", "Java", "React", "Angular", "Vue",
    "Outsystems", "Python", ".NET", "C", "R", "HTML", "CSS",
    "Node.js", "Figma", "GitHub"
  ]

  const calculateAge = () => {
    const birthDate = new Date(2001, 11, 13)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const age = calculateAge()

  const handleHover = ({ x, y, text }) => {
    setTooltip({ visible: true, x, y, text })
  }

  const handleHoverOut = () => {
    setTooltip(prev => ({ ...prev, visible: false }))
  }

  return (
    <main className="about-page">
      <div className="about-page__grid">
        
        {/* LEFT COLUMN: Image Slider */}
        <div className="about-page__left">
          <div className="about-page__canvas-container">
            <Canvas
              camera={{ position: [0, 0, 20], fov: 50 }}
              dpr={Math.min(window.devicePixelRatio, 1.5)}
              gl={{ antialias: false }}
            >
              <ImageSlideMesh 
                position={[0, 2, 0]} 
                scale={0.75} 
                images={IMAGES}
                onHover={handleHover}
                onHoverOut={handleHoverOut}
              />
            </Canvas>
          </div>
        </div>

        {/* RIGHT COLUMN: Bio Text */}
        <div className="about-page__right">
          <TextReveal tag="h1" className="about-page__title">About</TextReveal>

          <div className="about-page__bio">
            <TextReveal tag="p" className="about-page__paragraph" delay={0.1}>
              Hello! I'm Tomás, a {age}-year-old software developer based in Lisbon,
              and I'm someone who gets excited about bringing ideas to life, whether
              that's organizing music events, building websites and new software, or
              just figuring out how to make something work that didn't exist before.
            </TextReveal>

            <TextReveal tag="p" className="about-page__paragraph" delay={0.15}>
              Currently, I'm working as a Junior Software Developer at Minsait, where
              I'm expanding my skillset to work with low-code tools such as OutSystems.
              As part of the Low Code and Innovation team, I work on various full-stack
              projects for different clients, ensuring our applications meet web
              accessibility standards and best practices to deliver an inclusive user
              experience that everyone can enjoy.
            </TextReveal>

            <TextReveal tag="p" className="about-page__paragraph" delay={0.2}>
              During my internships at Klippa and Hospital Lusíadas, I got hands-on
              experience with both front-end and back-end development, learning how to
              create systems that people actually use every day. Throughout my bachelor's,
              I enjoyed diving into different programming languages and turning theoretical
              knowledge into working projects that I could see in action.
            </TextReveal>

            <TextReveal tag="p" className="about-page__paragraph" delay={0.25}>
              Beyond tech, I also have entrepreneurial experience from founding Project
              Umbra, a music event company that focused on bringing low-cost music events
              to the international community in Groningen. It served as a space to
              showcase local and young talents in Groningen's electronic music scene,
              where we organized 20+ events, hosting up to 700 people per event. In my
              free time, I enjoy surfing and going to the beach, watching football,
              discovering new movies and music, and DJing.
            </TextReveal>

            <TextReveal tag="p" className="about-page__paragraph" delay={0.3}>
              I bring a combination of technical expertise, entrepreneurial spirit, and
              a proven ability to thrive in diverse, international environments. With my
              adaptability to new technologies and collaborative mindset, I'm excited to
              contribute to innovative development projects in dynamic, forward-thinking
              teams.
            </TextReveal>
          </div>

          {/* Tech Stack */}
          <TextReveal className="about-page__tech-section" delay={0.35}>
            <h2 className="about-page__section-heading">Tech Stack</h2>
            <div className="about-page__tech-grid">
              {currentTechStack.map((tech, index) => (
                <span key={index} className="about-page__tech-tag">{tech}</span>
              ))}
            </div>
          </TextReveal>

          {/* Résumé Download */}
          <TextReveal className="about-page__resume-section" delay={0.4}>
            <a
              href={cvFile}
              target="_blank"
              rel="noopener noreferrer"
              className="about-page__resume-btn"
              data-cursor
            >
              ↓ Download Résumé
            </a>
          </TextReveal>
        </div>
      </div>

      {/* TOOLTIP PORTAL */}
      <div 
        className={`slider-tooltip ${tooltip.visible ? 'visible' : ''}`}
        style={{ transform: `translate(${tooltip.x}px, ${tooltip.y}px)` }}
      >
        <span className="slider-tooltip__text">{tooltip.text}</span>
      </div>
    </main>
  )
}
