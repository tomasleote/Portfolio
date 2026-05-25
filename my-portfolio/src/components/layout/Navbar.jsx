import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/navbar.css'

export default function Navbar({ onMenuToggle, isMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__logo">
        Tomás Leote Falcão
      </Link>
      <button
        className={`navbar__menu-btn ${isMenuOpen ? 'navbar__menu-btn--open' : ''}`}
        onClick={onMenuToggle}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>
    </header>
  )
}
