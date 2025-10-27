import MobileMenu from './MobileMenu'
import '../../styles/MobileHeader.css'

function MobileHeader({ activeSection, onSectionClick, onHomeClick }) {
    return (
        <header className="mobile-header">
            <div className="mobile-header-content">
                <div className="mobile-logo" onClick={onHomeClick}>
                    <span className="logo-text">TLF</span>
                </div>
                
                <MobileMenu 
                    activeSection={activeSection}
                    onSectionClick={onSectionClick}
                />
            </div>
        </header>
    )
}

export default MobileHeader
