import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Magnet from '../effects/Magnet'
import '../../styles/menu.css'

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
]

export default function Menu({ isOpen, onClose }) {
  const overlayRef = useRef(null)
  const linksRef = useRef([])

  useGSAP(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.6,
        ease: 'power4.inOut',
      })
      gsap.fromTo(
        linksRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.3 }
      )
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: 'power4.inOut',
      })
    }
  }, { dependencies: [isOpen], scope: overlayRef })

  return (
    <nav ref={overlayRef} className="menu-overlay" aria-hidden={!isOpen}>
      <ul className="menu-overlay__list">
        {NAV_ITEMS.map((item, i) => (
          <li key={item.path} className="menu-overlay__item">
            <Magnet padding={40} magnetStrength={2}>
              <Link
                to={item.path}
                ref={(el) => (linksRef.current[i] = el)}
                className="menu-overlay__link"
                onClick={onClose}
              >
                <span className="menu-overlay__counter">0{i + 1}</span>
                {item.label}
              </Link>
            </Magnet>
          </li>
        ))}
      </ul>
    </nav>
  )
}
