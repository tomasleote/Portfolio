import SocialMediaIcon from '../SocialMediaIcon'
import Magnet from '../effects/Magnet'
import { socialLinks } from '../../data/config'
import '../../styles/footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__links">
        {socialLinks.map((link) => (
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
