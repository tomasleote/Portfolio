import { useState } from 'react'
import '../../styles/MobileMenu.css'

function MobileMenu({ activeSection, onSectionClick }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleSectionClick = (section) => {
        onSectionClick(section)
        setIsOpen(false) // Close menu after clicking
    }

    return (
        <>
            {/* Hamburger Button */}
            <button 
                className={`hamburger ${isOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <nav className="mobile-nav">
                        <button
                            className={`mobile-nav-item ${activeSection === 'hero' ? 'active' : ''}`}
                            onClick={() => handleSectionClick('hero')}
                        >
                            Home
                        </button>
                        <button
                            className={`mobile-nav-item ${activeSection === 'about' ? 'active' : ''}`}
                            onClick={() => handleSectionClick('about')}
                        >
                            About
                        </button>
                        <button
                            className={`mobile-nav-item ${activeSection === 'experience' ? 'active' : ''}`}
                            onClick={() => handleSectionClick('experience')}
                        >
                            Experience
                        </button>
                        <button
                            className={`mobile-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
                            onClick={() => handleSectionClick('projects')}
                        >
                            Projects
                        </button>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default MobileMenu
