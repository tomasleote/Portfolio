import SocialMediaIcon from '../SocialMediaIcon'
import Magnet from '../effects/Magnet'
import '../../styles/footer.css'

const SOCIAL_LINKS = [
  { icon: 'fa-linkedin-in', url: 'https://www.linkedin.com/in/tom%C3%A1s-leote-falc%C3%A3o-a81860266/', label: 'LinkedIn' },
  { icon: 'fa-github', url: 'https://github.com/tomasleote', label: 'GitHub' },
  { icon: 'fa-envelope', url: 'mailto:tomas.leote@gmail.com', label: 'Email' },
  { icon: 'fa-spotify', url: 'https://open.spotify.com/user/11123207778?si=95bcfbeef7aa4209', label: 'Spotify' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__links">
        {SOCIAL_LINKS.map((link) => (
          <Magnet key={link.label} padding={20} magnetStrength={2}>
            <SocialMediaIcon
              icon={link.icon}
              url={link.url}
              label={link.label}
            />
          </Magnet>
        ))}
      </div>
    </footer>
  )
}
