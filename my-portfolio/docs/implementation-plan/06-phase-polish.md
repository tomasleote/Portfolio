# Phase 6: Contact Page + Final Polish + Cleanup

**Estimated time**: 1.5 days  
**Dependencies**: All previous phases complete  
**Goal**: Build `/contact` page, add AnimatedLink component, polish all micro-interactions, delete old files, responsive QA, Lighthouse audit.

---

## Task 6.1: Build `src/pages/Contact.jsx` + `src/styles/contact.css`

**Contact.jsx**:
```jsx
import TextReveal from '../components/effects/TextReveal'
import '../styles/contact.css'

const CONTACT_LINKS = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tom%C3%A1s-leote-falc%C3%A3o-a81860266/',
    external: true,
  },
  {
    label: 'GitHub',
    url: 'https://github.com/tomasleote',
    external: true,
  },
  {
    label: 'Spotify',
    url: 'https://open.spotify.com/user/11123207778?si=95bcfbeef7aa4209',
    external: true,
  },
]

export default function Contact() {
  return (
    <main className="contact-page">
      <div className="contact-page__content">
        <TextReveal tag="h1" className="contact-page__title">Contact</TextReveal>

        <TextReveal tag="p" className="contact-page__subtitle" delay={0.1}>
          Want to work together or just say hi? Feel free to reach out.
        </TextReveal>

        <TextReveal className="contact-page__email-section" delay={0.2}>
          <a
            href="mailto:tomas.leote@gmail.com"
            className="contact-page__email"
            data-cursor
          >
            tomas.leote@gmail.com
          </a>
        </TextReveal>

        <div className="contact-page__links">
          {CONTACT_LINKS.map((link, i) => (
            <TextReveal key={link.label} delay={0.3 + i * 0.08}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page__link"
                data-cursor
              >
                <span className="contact-page__link-arrow">↗</span>
                <span className="contact-page__link-label">{link.label}</span>
              </a>
            </TextReveal>
          ))}
        </div>
      </div>
    </main>
  )
}
```

**contact.css**:
```css
.contact-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--page-padding);
  padding-bottom: calc(var(--footer-height) + var(--space-lg));
}

.contact-page__content {
  text-align: center;
  max-width: 600px;
}

.contact-page__title {
  font-size: var(--fs-2xl);
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-md);
}

.contact-page__subtitle {
  font-size: var(--fs-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
  line-height: 1.6;
}

.contact-page__email-section {
  margin-bottom: var(--space-xl);
}

.contact-page__email {
  font-size: var(--fs-xl);
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: none;
  transition: opacity var(--dur-fast) ease;
  letter-spacing: -0.02em;
}

.contact-page__email:hover {
  opacity: 0.7;
}

.contact-page__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  align-items: center;
}

.contact-page__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--fs-lg);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--dur-fast) ease, transform var(--dur-fast) ease;
  padding: var(--space-xs) var(--space-sm);
}

.contact-page__link:hover {
  color: var(--color-white);
  transform: translateX(6px);
}

.contact-page__link-arrow {
  font-size: 0.8em;
  transition: transform var(--dur-fast) ease;
}

.contact-page__link:hover .contact-page__link-arrow {
  transform: translate(3px, -3px);
}

@media (max-width: 768px) {
  .contact-page__email {
    font-size: var(--fs-lg);
  }
}
```

---

## Task 6.2: Create `src/components/ui/AnimatedLink.jsx` + `src/styles/animatedLink.css`

A reusable link component with an underline that slides in from the left on hover.

**AnimatedLink.jsx**:
```jsx
import { Link } from 'react-router-dom'
import '../../styles/animatedLink.css'

export default function AnimatedLink({ to, href, children, className = '', ...props }) {
  const classes = `animated-link ${className}`

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  )
}
```

**animatedLink.css**:
```css
.animated-link {
  position: relative;
  display: inline-block;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--dur-fast) ease;
}

.animated-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-accent);
  transition: width var(--dur-normal) var(--ease-out);
}

.animated-link:hover {
  color: var(--color-white);
}

.animated-link:hover::after {
  width: 100%;
}
```

Use this component in the Home page CTAs, Experience résumé link, Projects GitHub link, and Contact links for consistency.

---

## Task 6.3: Polish Micro-interactions

### Navbar enhancements
- Ensure the backdrop blur transition is smooth
- Logo should have subtle color transition on hover

### Menu enhancements
- Wrap each menu link in `<Magnet>` component for magnetic hover effect
- Add a counter/number next to each menu item (01, 02, 03, 04, 05)

### Footer enhancements
- Wrap each social icon in `<Magnet>` component
- Verify gradient fade looks good against all page backgrounds

### Button/Link hover effects
- All `data-cursor` elements should trigger the cursor scale-up
- Tech tags: subtle translateY(-2px) on hover
- Project rows: border-color transition on hover (border goes from `var(--color-border)` to `var(--color-text-muted)`)

### Page transition timing
- Ensure the transition overlay doesn't flash on fast navigation
- Ensure scroll resets to top on each page change

---

## Task 6.4: Delete Old Files

Delete ALL files listed in the "Files to DELETE" section of `00-overview.md`. Complete list:

```
src/Portfolio.jsx
src/styles/Portfolio.css
src/styles/App.css
src/sections/AboutSection.jsx
src/sections/ExperienceSection.jsx
src/sections/ProjectsSection.jsx
src/sections/CertificationsSection.jsx
src/styles/AboutSection.css
src/styles/ExperienceSection.css
src/styles/ProjectsSection.css
src/styles/CertificationsSection.css
src/components/Navigation.jsx
src/styles/Navigation.css
src/components/mobile/MobileHeader.jsx
src/components/mobile/MobileHeroSection.jsx
src/components/mobile/MobileMenu.jsx
src/styles/MobileHeader.css
src/styles/MobileHeroSection.css
src/styles/MobileMenu.css
src/components/ProjectCard.jsx
src/styles/ProjectCard.css
src/hooks/useScrollSpy.js
```

After deletion, verify `npm run build` still succeeds — no import references to deleted files remain.

---

## Task 6.5: Responsive QA

Test every page at these breakpoints:

| Breakpoint | Device Type |
|---|---|
| 360px | Small mobile (Galaxy S, iPhone SE) |
| 480px | Standard mobile |
| 768px | Tablet portrait |
| 1024px | Tablet landscape / small laptop |
| 1440px | Desktop |
| 1920px | Large desktop |

### Checklist per breakpoint:
- [ ] Navbar: logo + menu button visible, properly spaced
- [ ] Menu overlay: links readable, properly sized
- [ ] Home: name + subtitle centered, CTA links visible
- [ ] Projects: rows don't overflow, expandable on mobile
- [ ] About: paragraphs readable, no horizontal overflow
- [ ] Experience: cards stack on mobile, tags wrap properly
- [ ] Contact: email link readable, social links accessible
- [ ] Footer: icons visible, not overlapping content
- [ ] No horizontal scroll on any page
- [ ] Custom cursor hidden on touch devices

### Mobile-specific:
- [ ] MorphBlob shows CSS gradient fallback (no WebGL)
- [ ] No `:hover` effects that interfere with touch
- [ ] Tap targets are at least 44px × 44px
- [ ] Footer doesn't cover last content item

---

## Task 6.6: Performance Audit

Run these checks:

```bash
npm run build
npx serve dist
```

### Lighthouse targets (all 4 categories ≥ 90):
- [ ] **Performance** ≥ 90
- [ ] **Accessibility** ≥ 90
- [ ] **Best Practices** ≥ 90
- [ ] **SEO** ≥ 90

### Performance checklist:
- [ ] WebGL Canvas doesn't cause frame drops (check Chrome DevTools → Performance)
- [ ] No memory leaks (GSAP ScrollTrigger instances are properly killed on unmount)
- [ ] Lenis doesn't fight with native scroll behavior
- [ ] Images are appropriately sized (no 2MB PNGs served to mobile)
- [ ] Font is preloaded (Inter from Google Fonts)
- [ ] Build size is reasonable (< 500KB gzipped excluding assets)

### Final deployment:
- [ ] Push to GitHub
- [ ] Verify Vercel deployment
- [ ] Test all routes work in production (including direct URL access via rewrites)
- [ ] Test Open Graph meta tags

---

## Verification Checklist (Final)

- [ ] All 5 pages render correctly: Home, About, Experience, Projects, Contact
- [ ] Page transitions work smoothly between all routes
- [ ] Custom cursor works on desktop, hidden on mobile
- [ ] MorphBlob WebGL background renders on desktop, CSS fallback on mobile
- [ ] Preloader shows on initial load, then animates away
- [ ] Navbar is fixed, blurs on scroll
- [ ] Menu opens/closes with animation, links navigate correctly
- [ ] Footer with social icons is visible on ALL pages
- [ ] All text animations trigger on scroll (TextReveal)
- [ ] Projects page: hover shows image on left + row expands
- [ ] About page: paragraphs animate in on scroll
- [ ] Experience page: cards animate in on scroll, certifications grid works
- [ ] Contact page: email link works, social links open in new tabs
- [ ] No console errors in production build
- [ ] No references to deleted old files
- [ ] Lighthouse ≥ 90 on all categories
- [ ] Responsive at all breakpoints (360–1920px)
