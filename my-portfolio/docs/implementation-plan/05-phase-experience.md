# Phase 5: Experience Page

**Estimated time**: 1 day  
**Dependencies**: Phase 1 (routing) + Phase 2 (TextReveal component)  
**Goal**: Build `/experience` page with animated experience cards + certifications section below.

---

## Task 5.1: Create `src/data/experiences.js`

Extract from `src/sections/ExperienceSection.jsx`:

```js
import cvFile from '../assets/CV_TomasLeote_Lisboa_2026.pdf'

export const cvUrl = cvFile

export const experiences = [
  {
    timeframe: "Jan 2026 — Present",
    role: "Junior Software Developer",
    company: "Minsait",
    location: "Lisbon, Portugal",
    companyUrl: "https://www.minsait.com/en",
    description: "Working as part of an agile team to develop and maintain applications for various clients, focusing on delivering high-quality software solutions. Engaging in code reviews, testing, and continuous integration to ensure robust and efficient code. Collaborating with cross-functional teams to gather requirements and implement features that meet client needs.",
    technologies: ["Java", "JavaScript", "Responsive Design", "Full-Stack Development"]
  },
  {
    timeframe: "Sep 2025 — Jan 2026",
    role: "Software Developer",
    company: "Avodah Creatives",
    location: "Remote (Amsterdam, Netherlands)",
    companyUrl: "https://avodahcreatives.com/",
    description: "Led the frontend team in developing the company website from scratch using React and Tailwind CSS, and contributed to the development of their core product, a statistical interface for clients. Coordinated tasks across the frontend team and ensured timely delivery of features.",
    technologies: ["React", "Tailwind CSS", "JavaScript", "Responsive Design", "Frontend Development"]
  },
  {
    timeframe: "Sep — Dec 2024",
    role: "Software Developer Internship",
    company: "Hospital Lusíadas",
    location: "Lisbon, Portugal",
    companyUrl: "https://www.lusiadas.pt/hospitais-clinicas/hospital-lusiadas-lisboa",
    description: "Designed, implemented, and tested Front-End and Back-End solutions using Vue and .NET frameworks. Integrated RESTful APIs to connect front-end and back-end services, ensuring seamless data flow between different system components.",
    technologies: ["Vue", ".NET", "RESTful APIs", "Agile"]
  },
  {
    timeframe: "Apr — Jun 2024",
    role: "Software Development Thesis Internship",
    company: "Klippa",
    location: "Groningen, Netherlands",
    companyUrl: "https://www.klippa.com/en/home-en/",
    description: "Collaborated with senior engineers to build scalable analytics tools that supported strategic insights into platform usage for business clients. Implemented Angular, GraphQL, and Highcharts to deliver robust data visualizations.",
    technologies: ["Angular", "GraphQL", "Highcharts", "TypeScript"]
  },
  {
    timeframe: "Sep 2021 — Sep 2024",
    role: "Founder",
    company: "Project Umbra",
    location: "Groningen, Netherlands",
    companyUrl: null,
    description: "Founded and grew an event-planning business from concept to execution, demonstrating entrepreneurial initiative and business acumen while managing a team of 6 people. Successfully delivered over 20 events with up to 700 attendees.",
    technologies: ["Leadership", "Web Development", "Digital Marketing", "Project Management"]
  }
]
```

---

## Task 5.2: Create `src/data/certifications.js`

Extract from `src/sections/CertificationsSection.jsx`:

```js
import agenticAICert from '../assets/certifications/AgenticAI.pdf'
import o11Cert from '../assets/certifications/O11AssociateDeveloper.pdf'
import odcCert from '../assets/certifications/ODC.pdf'
import agileCert from '../assets/certifications/AgileFundamentals.pdf'
import jsCert from '../assets/certifications/jsForBeginners.pdf'
import sqlCert from '../assets/certifications/SqlForBeginners.pdf'
import restApiCert from '../assets/certifications/restApis.pdf'
import communicationCert from '../assets/certifications/communicationSkills.pdf'
import criticalThinkingCert from '../assets/certifications/criticalthinking.pdf'
import timeMasteryCert from '../assets/certifications/timeMastery.pdf'
import ethicsCert from '../assets/certifications/ethicsintheworkspace.pdf'
import chatgptCert from '../assets/certifications/chatgptforwork.pdf'

export const certifications = [
  { title: "Outsystems Agentic AI Specialization", pdfUrl: agenticAICert },
  { title: "Outsystems O11 Associate Developer", pdfUrl: o11Cert },
  { title: "Outsystems ODC Associate Developer", pdfUrl: odcCert },
  { title: "Agile Fundamentals: Including Scrum & Kanban", pdfUrl: agileCert },
  { title: "JavaScript Basics for Beginners", pdfUrl: jsCert },
  { title: "Microsoft SQL for Beginners", pdfUrl: sqlCert },
  { title: "Introduction to REST APIs for Absolute Beginners", pdfUrl: restApiCert },
  { title: "Communication Skills Fundamentals", pdfUrl: communicationCert },
  { title: "Critical Thinking Strategies For Better Decisions", pdfUrl: criticalThinkingCert },
  { title: "Time Management Mastery: Do More, Stress Less", pdfUrl: timeMasteryCert },
  { title: "Ethics and Professionalism in the Workplace", pdfUrl: ethicsCert },
  { title: "ChatGPT for Work: The Definitive Guide to Innovate with AI", pdfUrl: chatgptCert }
]
```

---

## Task 5.3: Refactor `src/components/ui/ExperienceCard.jsx` + update CSS

Keep the same component but add GSAP scroll-triggered entrance animation and updated styling for the near-black theme.

**ExperienceCard.jsx** (refactored):
```jsx
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
```

**Update `src/styles/ExperienceCard.css`** — rewrite to use design tokens:
```css
.exp-card {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: 8px;
  transition: background-color var(--dur-fast) ease;
  margin-bottom: var(--space-xs);
}

.exp-card--clickable { cursor: pointer; }

.exp-card:hover {
  background-color: var(--color-bg-hover);
}

.exp-card__timeframe {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding-top: 4px;
}

.exp-card__title {
  font-size: var(--fs-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
  transition: color var(--dur-fast) ease;
}

.exp-card--clickable:hover .exp-card__title {
  color: var(--color-accent);
}

.exp-card__location {
  font-size: var(--fs-sm);
  color: var(--color-accent);
  margin-bottom: var(--space-sm);
}

.exp-card__description {
  font-size: var(--fs-sm);
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-sm);
}

.exp-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.exp-card__tag {
  font-size: var(--fs-xs);
  color: var(--color-accent);
  background-color: var(--color-accent-dim);
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid rgba(100, 255, 218, 0.15);
}

@media (max-width: 768px) {
  .exp-card {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
    padding: var(--space-sm);
    border: 1px solid var(--color-border);
  }
}
```

---

## Task 5.4: Build `src/pages/Experience.jsx` + `src/styles/experience.css`

**Experience.jsx**:
```jsx
import TextReveal from '../components/effects/TextReveal'
import ExperienceCard from '../components/ui/ExperienceCard'
import CertificateCard from '../components/CertificateCard'
import Magnet from '../components/effects/Magnet'
import { experiences, cvUrl } from '../data/experiences'
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
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="experience-page__resume-anchor"
              data-cursor
            >
              View Full Résumé →
            </a>
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
            />
          ))}
        </div>

      </div>
    </main>
  )
}
```

**experience.css**:
```css
.experience-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: calc(var(--navbar-height) + var(--space-xl)) var(--page-padding)
           calc(var(--footer-height) + var(--space-xl));
}

.experience-page__content {
  max-width: 900px;
  width: 100%;
}

.experience-page__title {
  font-size: var(--fs-2xl);
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-lg);
}

.experience-page__cards {
  margin-bottom: var(--space-md);
}

.experience-page__resume-link {
  margin-top: var(--space-md);
  margin-bottom: var(--space-xl);
}

.experience-page__resume-anchor {
  font-size: var(--fs-base);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--dur-fast) ease;
  font-weight: 500;
}

.experience-page__resume-anchor:hover {
  color: var(--color-accent);
}

.experience-page__section-title {
  font-size: var(--fs-xl);
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-lg);
}

.experience-page__certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-sm);
}

@media (max-width: 768px) {
  .experience-page__certs-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Task 5.5: Update `CertificateCard.css` to use design tokens

Update the existing `CertificateCard.css` to use `var(--color-*)` tokens instead of hardcoded colors, and change backgrounds from the old navy to the new near-black palette. The component JSX itself (`CertificateCard.jsx`) can remain as-is.

---

## Verification Checklist

- [ ] Navigate to `/experience` — heading "Experience" appears with reveal animation
- [ ] All 5 experience cards render with scroll-triggered stagger animation
- [ ] Cards show timeframe, role, company, location, description, tech tags
- [ ] Clickable cards (with companyUrl) have hover highlight + open URL on click
- [ ] "View Full Résumé →" link has Magnet effect and opens PDF
- [ ] "Certifications" heading appears below experience section
- [ ] All 12 certifications render in a responsive grid
- [ ] Clicking a certification opens its PDF
- [ ] Mobile: cards stack vertically, proper spacing
- [ ] All animations respect scroll position (don't fire until elements are in view)
