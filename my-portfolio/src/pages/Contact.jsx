import TextReveal from '../components/effects/TextReveal'
import '../styles/contact.css'
import AnimatedLink from '../components/ui/AnimatedLink'

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
              <AnimatedLink
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page__link"
                data-cursor
              >
                <span className="contact-page__link-arrow">↗</span>
                <span className="contact-page__link-label">{link.label}</span>
              </AnimatedLink>
            </TextReveal>
          ))}
        </div>
      </div>
    </main>
  )
}
