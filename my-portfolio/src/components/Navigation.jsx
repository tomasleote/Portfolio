import '../styles/Navigation.css'

function Navigation({ activeSection, onSectionClick }) {

    return (
        <nav className="sidebar-nav">
            <div className="nav-header">
                <h1>Tomás Leote Falcão</h1>
                <h3>Software Developer</h3>
            </div>
            
            <div className="nav-buttons">
                <button
                    className={activeSection === 'about' ? 'active' : 'inactive'}
                    onClick={() => onSectionClick('about')}
                > 
                    About
                </button>
                <button
                    className={activeSection === 'experience' ? 'active' : 'inactive'}
                    onClick={() => onSectionClick('experience')}
                >
                    Experience
                </button>
                <button 
                    className={activeSection === 'projects' ? 'active' : 'inactive'}
                    onClick={() => onSectionClick('projects')}
                > 
                    Projects 
                </button>
            </div>
        </nav>
    )
}

export default Navigation
