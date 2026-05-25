# Phase 3: Projects Page (itssharl.ee/work style)

**Estimated time**: 1.5 days  
**Dependencies**: Phase 1 (routing). Does NOT need Phase 2.  
**Goal**: Build `/projects` page with itssharl.ee/work interaction: vertical list of project rows. Hover → image appears on the left + row expands to show description.

---

## Reference Behavior (itssharl.ee/work)

1. Page shows a header ("Work") + project count
2. Project list is a vertical stack of rows separated by thin horizontal borders
3. Each row shows: `→` arrow, project name (large), category (smaller)
4. On hover:
   - The row highlights (text brightens)
   - Arrow rotates 45°
   - Row expands below to reveal a description
   - On the LEFT side of the viewport, the project's image fades in (large, ~40% width)
5. Only one project is expanded at a time
6. On mobile: no floating image, rows are full-width and still expandable

---

## Task 3.1: Create `src/data/projects.js`

Extract ALL project data from `src/sections/ProjectsSection.jsx` (lines 30–110).

```js
// src/data/projects.js
import avodahWebsite from '../assets/avodahWebsite.png'
import papaLeguasWebsite from '../assets/papaLeguasWebsite.png'
import portfolioWebsite from '../assets/portfolioWebsite.png'
import thesisDemoVid from '../assets/thesisDemoVid.mp4'
import thesisPdf from '../assets/thesis.pdf'
import dataGenPic from '../assets/dataGenPic.png'
import stockSimPic from '../assets/stockSim.png'
import flightLogisticsPic from '../assets/FlightLogisticsSimulation.png'
import lotrSimPic from '../assets/lotrSimulator.png'
import budgetTrackerPic from '../assets/budgetTracker.png'
import findADayPic from '../assets/findADay.png'

export const projects = [
  {
    title: "FindADay",
    category: "Web App",
    description: "FindADay was born out of the frustration of trying to coordinate a group trip where no one could agree on a date. I couldn't find a tool that made it easy, so I built one. FindADay is a scheduling tool with no accounts required. Whether you're planning a dinner or a vacation, just create a link, collect availability, and let the integrated heatmap show you exactly when everyone is free.",
    technologies: ["React", "Firebase", "Tailwind CSS", "Vercel", "Google Places API"],
    url: "https://findaday.cc",
    imageUrl: findADayPic,
  },
  {
    title: "Avodah Creatives",
    category: "Website",
    description: "A modern, responsive website designed and developed for Avodah Creatives as a freelance project. Built with React and styled using Tailwind CSS, the site features a clean and professional design that showcases the creative agency's portfolio and services with smooth animations and an intuitive user experience.",
    technologies: ["React", "Tailwind CSS", "Responsive Design", "Modern UI/UX"],
    url: "https://avodahcreatives.com/",
    imageUrl: avodahWebsite,
  },
  {
    title: "Thesis: Analytics Dashboard",
    category: "Full Stack",
    description: "A comprehensive analytics dashboard developed during a full-time internship at Klippa for my bachelor's thesis. Built with Angular, GraphQL, and Highcharts to provide scalable data visualizations and strategic insights into platform usage for business clients.",
    technologies: ["Angular", "GraphQL", "Highcharts", "TypeScript", "Data Visualization"],
    url: "https://www.klippa.com/en/home-en/",
    imageUrl: null, // uses video instead
    videoUrl: thesisDemoVid,
    documentUrl: thesisPdf,
    documentLabel: "Download Thesis PDF",
  },
  {
    title: "Budget Tracker",
    category: "Full Stack",
    description: "A comprehensive full-stack budget tracker application built with React and Node.js, implementing strict MVC architecture patterns for scalable personal finance management. Features transaction management, budget planning, financial analytics, and data import/export capabilities.",
    technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Express.js"],
    url: "https://github.com/tomasleote/budget_tracker",
    imageUrl: budgetTrackerPic,
  },
  {
    title: "Monte do Papa Léguas",
    category: "Website",
    description: "A professional hotel website developed using Wix as per client requirements to enable easy future updates by staff members. Integrated Hey Travel booking system for seamless reservation management. The project focused on creating an intuitive user experience while implementing comprehensive SEO strategies.",
    technologies: ["Wix", "Hey Travel Integration", "SEO Optimization", "Web Design"],
    url: "https://www.montedopapaleguas.pt/",
    imageUrl: papaLeguasWebsite,
  },
  {
    title: "Portfolio Website",
    category: "Website",
    description: "A modern, interactive portfolio website built with React and Vite, featuring a responsive design that adapts seamlessly between desktop and mobile experiences. Implements smooth animations, magnetic hover effects, and dynamic content transitions.",
    technologies: ["React", "Vite", "CSS3", "Responsive Design", "Animation"],
    url: "https://github.com/tomasleote/Portfolio",
    imageUrl: portfolioWebsite,
  },
  {
    title: "Data Generator",
    category: "Desktop App",
    description: "A Java-based synthetic data generator that can generate thousands of unique values per second with different format requirements. Features a modular pipeline architecture with composable generators, mathematical formula support, and a user-friendly C# interface.",
    technologies: ["Java", "C#", "Swing", "Maven", "Mathematical Expressions"],
    url: "https://github.com/tomasleote/multiFormatDataGenerator",
    imageUrl: dataGenPic,
  },
  {
    title: "Stock Market Simulator",
    category: "Networking",
    description: "A networking and messaging project that simulates a real-time stock market environment with automated trading bots. Traders communicate with the Stock Market through a networking module, sending messages to a PriorityBlockingQueue for processing.",
    technologies: ["Java", "Networking", "PriorityBlockingQueue", "Message Queues"],
    url: "https://github.com/tomasleote/stockMarket_simulator",
    imageUrl: stockSimPic,
  },
  {
    title: "Flight Logistics Simulator",
    category: "Simulation",
    description: "A comprehensive flight logistics simulation system that models airline operations, route optimization, and resource management. Features dynamic flight scheduling, passenger management, and real-time logistics coordination.",
    technologies: ["Java", "Simulation", "Algorithm Design", "Data Structures"],
    url: "https://github.com/tomasleote/flightLogisticsSimulator",
    imageUrl: flightLogisticsPic,
  },
  {
    title: "LOTR Simulator",
    category: "Game Dev",
    description: "An interactive simulation game based on the Lord of the Rings universe, featuring character management, quest systems, and strategic gameplay mechanics. Implements object-oriented design patterns with rich storytelling elements.",
    technologies: ["Java", "OOP Design", "Game Development", "Simulation"],
    url: "https://github.com/tomasleote/lotrSimulator",
    imageUrl: lotrSimPic,
  },
  {
    title: "Op Shell",
    category: "Systems",
    description: "A custom shell implementation project demonstrating command-line interface development and system programming concepts. Built to explore shell functionality, command parsing, and process management in a Unix-like environment.",
    technologies: ["C", "Unix", "System Programming", "Command Line"],
    url: "https://github.com/tomasleote/op-shell",
    imageUrl: null,
  },
]
```

---

## Task 3.2: Create `src/components/ui/ProjectRow.jsx` + `src/styles/projectRow.css`

**ProjectRow.jsx**:
```jsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import '../../styles/projectRow.css'

export default function ProjectRow({
  title,
  category,
  description,
  technologies,
  url,
  isExpanded,
  onHover,
  onLeave,
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
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className={`project-row ${isExpanded ? 'project-row--expanded' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
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
        <div className="project-row__tags">
          {technologies.map((tech, i) => (
            <span key={i} className="project-row__tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
```

**projectRow.css**:
```css
.project-row {
  border-top: 1px solid var(--color-border);
  padding: var(--space-md) 0;
  cursor: pointer;
  transition: background-color var(--dur-fast) ease;
}

.project-row:last-child {
  border-bottom: 1px solid var(--color-border);
}

.project-row:hover {
  background-color: var(--color-bg-hover);
}

.project-row__header {
  display: flex;
  align-items: baseline;
  gap: var(--space-md);
}

.project-row__arrow {
  font-size: var(--fs-lg);
  color: var(--color-text-muted);
  transition: color var(--dur-fast) ease;
  display: inline-block;
  flex-shrink: 0;
}

.project-row:hover .project-row__arrow {
  color: var(--color-accent);
}

.project-row__title {
  font-size: var(--fs-xl);
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: color var(--dur-fast) ease;
  letter-spacing: -0.02em;
}

.project-row:hover .project-row__title {
  color: var(--color-white);
}

.project-row__category {
  font-size: var(--fs-sm);
  color: var(--color-text-muted);
  margin-left: auto;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-row__details {
  height: 0;
  opacity: 0;
  overflow: hidden;
  padding-left: calc(var(--fs-lg) + var(--space-md)); /* align with title */
}

.project-row__description {
  font-size: var(--fs-sm);
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 600px;
  margin-top: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.project-row__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--space-xs);
}

.project-row__tag {
  font-size: var(--fs-xs);
  color: var(--color-accent);
  background-color: var(--color-accent-dim);
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid rgba(100, 255, 218, 0.15);
}

/* Mobile */
@media (max-width: 768px) {
  .project-row__header {
    flex-wrap: wrap;
    gap: var(--space-sm);
  }
  .project-row__title {
    font-size: var(--fs-lg);
  }
  .project-row__category {
    width: 100%;
    margin-left: calc(var(--fs-lg) + var(--space-sm));
  }
  .project-row__details {
    padding-left: 0;
  }
}
```

---

## Task 3.3: Build `src/pages/Projects.jsx` + `src/styles/projects.css`

**Projects.jsx**:
```jsx
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { projects } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import ProjectRow from '../components/ui/ProjectRow'
import TextReveal from '../components/effects/TextReveal'
import '../styles/projects.css'

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const imageRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Animate image in/out
  useEffect(() => {
    if (!imageRef.current || isMobile) return

    if (hoveredIndex !== null && projects[hoveredIndex]?.imageUrl) {
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

  const currentImage = hoveredIndex !== null ? projects[hoveredIndex]?.imageUrl : null

  return (
    <main className="projects-page">
      {/* Floating image preview (desktop only) */}
      {!isMobile && (
        <div className="projects-page__image-col">
          <div ref={imageRef} className="projects-page__image-wrapper">
            {currentImage && (
              <img
                src={currentImage}
                alt={projects[hoveredIndex]?.title || ''}
                className="projects-page__image"
              />
            )}
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
              isExpanded={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        <TextReveal className="projects-page__footer" delay={0.3}>
          <a
            href="https://github.com/tomasleote"
            target="_blank"
            rel="noopener noreferrer"
            className="projects-page__github-link"
          >
            View All on GitHub →
          </a>
        </TextReveal>
      </div>
    </main>
  )
}
```

**projects.css**:
```css
.projects-page {
  display: flex;
  min-height: 100vh;
  padding-top: calc(var(--navbar-height) + var(--space-lg));
  padding-bottom: calc(var(--footer-height) + var(--space-lg));
}

/* Left column: floating image */
.projects-page__image-col {
  position: sticky;
  top: calc(var(--navbar-height) + var(--space-lg));
  width: 40%;
  height: calc(100vh - var(--navbar-height) - var(--space-lg) * 2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md) var(--page-padding);
}

.projects-page__image-wrapper {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 16 / 10;
  border-radius: 8px;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.95);
}

.projects-page__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Right column: project list */
.projects-page__list-col {
  flex: 1;
  padding: 0 var(--page-padding);
  min-width: 0;
}

.projects-page__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
}

.projects-page__title {
  font-size: var(--fs-2xl);
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.03em;
}

.projects-page__count {
  font-size: var(--fs-xl);
  color: var(--color-text-muted);
  font-weight: 300;
}

.projects-page__footer {
  margin-top: var(--space-lg);
  padding-bottom: var(--space-lg);
}

.projects-page__github-link {
  font-size: var(--fs-base);
  color: var(--color-text-secondary);
  transition: color var(--dur-fast) ease;
}

.projects-page__github-link:hover {
  color: var(--color-accent);
}

/* Mobile: single column, no floating image */
@media (max-width: 768px) {
  .projects-page {
    flex-direction: column;
    padding: calc(var(--navbar-height) + var(--space-md)) var(--page-padding) calc(var(--footer-height) + var(--space-md));
  }
  .projects-page__image-col {
    display: none;
  }
  .projects-page__list-col {
    padding: 0;
  }
}
```

---

## Verification Checklist

- [ ] Navigate to `/projects` — page renders with heading + count
- [ ] All 11 projects are listed as rows separated by borders
- [ ] Hovering a row: title brightens, arrow rotates 45°, description expands below
- [ ] Hovering a project with an image: image fades in on the left column
- [ ] Moving hover to another project: image cross-fades to the new project's image
- [ ] Mouse leaving all rows: image fades out
- [ ] Clicking a row opens the project URL in a new tab
- [ ] Mobile: no floating image column, rows expand normally full-width
- [ ] TextReveal animation works on the heading and footer link
- [ ] Thesis project row still provides access to video/document (may open modal or link)
- [ ] No layout shift or jank when rows expand/collapse
- [ ] Custom cursor scales up when hovering rows (via `data-cursor` attribute)
