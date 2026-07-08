import TextReveal from '../components/effects/TextReveal'
import ExperienceCard from '../components/ui/ExperienceCard'
import CertificateCard from '../components/CertificateCard'
import Magnet from '../components/effects/Magnet'
import AnimatedLink from '../components/ui/AnimatedLink'
import { experiences } from '../data/experiences'
import { cvUrl } from '../data/config'
import { certifications } from '../data/certifications'
import '../styles/experience.css'

export default function Experience() {
  return (
    <main className="experience-page">
      <div className="experience-page__content">

        {/* ── Experience Section ── */}
        <TextReveal tag="h1" className="experience-page__title">Experience</TextReveal>

        <div className="experience-page__cards">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              index={index}
              timeframe={exp.timeframe}
              role={exp.role}
              company={exp.company}
              location={exp.location}
              companyUrl={exp.companyUrl}
              description={exp.description}
              technologies={exp.technologies}
            />
          ))}
        </div>

        <TextReveal className="experience-page__resume-link">
          <Magnet padding={60} magnetStrength={3}>
            <AnimatedLink
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="experience-page__resume-anchor"
              data-cursor
            >
              View Full Résumé →
            </AnimatedLink>
          </Magnet>
        </TextReveal>

        {/* ── Certifications Section ── */}
        <TextReveal tag="h2" className="experience-page__section-title" delay={0.1}>
          Certifications
        </TextReveal>

        <div className="experience-page__certs-grid">
          {certifications.map((cert, index) => (
            <CertificateCard
              key={index}
              title={cert.title}
              pdfUrl={cert.pdfUrl}
              thumb={cert.thumb}
            />
          ))}
        </div>

      </div>
    </main>
  )
}
