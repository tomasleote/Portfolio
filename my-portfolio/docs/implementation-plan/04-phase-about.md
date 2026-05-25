# Phase 4: About Page

**Estimated time**: 1 day  
**Dependencies**: Phase 1 (routing) + Phase 2 (TextReveal component)  
**Goal**: Build `/about` page with scroll-triggered animated text reveals, tech stack display, and résumé download.

---

## Task 4.1: Build `src/pages/About.jsx` + `src/styles/about.css`

The About page displays the existing bio text from `AboutSection.jsx` — but with animated reveals so each paragraph "appears" as you scroll, not dumped like a Word doc.

**About.jsx**:
```jsx
import TextReveal from '../components/effects/TextReveal'
import cvFile from '../assets/CV_TomasLeote_Lisboa_2026.pdf'
import '../styles/about.css'

export default function About() {
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

  return (
    <main className="about-page">
      <div className="about-page__content">
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
    </main>
  )
}
```

**about.css**:
```css
.about-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: calc(var(--navbar-height) + var(--space-xl)) var(--page-padding)
           calc(var(--footer-height) + var(--space-xl));
}

.about-page__content {
  max-width: 700px;
  width: 100%;
}

.about-page__title {
  font-size: var(--fs-2xl);
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-lg);
}

.about-page__bio {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.about-page__paragraph {
  font-size: var(--fs-base);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

/* Tech Stack */
.about-page__section-heading {
  font-size: var(--fs-lg);
  font-weight: 600;
  color: var(--color-white);
  margin-top: var(--space-xl);
  margin-bottom: var(--space-md);
}

.about-page__tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.about-page__tech-tag {
  font-size: var(--fs-xs);
  color: var(--color-accent);
  background-color: var(--color-accent-dim);
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid rgba(100, 255, 218, 0.15);
  transition: background-color var(--dur-fast) ease,
              transform var(--dur-fast) ease;
}

.about-page__tech-tag:hover {
  background-color: rgba(100, 255, 218, 0.2);
  transform: translateY(-2px);
}

/* Résumé Download */
.about-page__resume-section {
  margin-top: var(--space-xl);
}

.about-page__resume-btn {
  display: inline-block;
  font-size: var(--fs-base);
  font-weight: 500;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  padding: 14px 32px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color var(--dur-fast) ease,
              color var(--dur-fast) ease,
              transform var(--dur-fast) ease;
}

.about-page__resume-btn:hover {
  background-color: var(--color-accent-dim);
  color: var(--color-white);
  transform: translateY(-2px);
}

/* Mobile */
@media (max-width: 768px) {
  .about-page {
    padding-top: calc(var(--navbar-height) + var(--space-lg));
  }
  .about-page__title {
    font-size: var(--fs-xl);
  }
  .about-page__paragraph {
    font-size: var(--fs-sm);
  }
}
```

---

## Verification Checklist

- [ ] Navigate to `/about` — heading "About" appears with reveal animation
- [ ] Scrolling down reveals each paragraph one by one with slide-up + clip animation
- [ ] Text is readable, centered column, max-width ~700px
- [ ] Tech stack tags display in a wrapping flex grid
- [ ] Tech tags have subtle hover effect (lift + darken)
- [ ] "↓ Download Résumé" button is visible below tech stack
- [ ] Clicking résumé button opens the PDF in a new tab
- [ ] Custom cursor scales up on the résumé button (via `data-cursor`)
- [ ] Mobile: text is readable, proper padding, no horizontal overflow
- [ ] Age is calculated dynamically (currently {age})
