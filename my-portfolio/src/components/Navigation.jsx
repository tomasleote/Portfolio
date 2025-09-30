import '../styles/Navigation.css'
import SocialMediaIcon from './SocialMediaIcon'

function Navigation({ activeSection, onSectionClick }) {

    return (
        <nav className="top-nav">
            <div className="nav-container">
                <div className="nav-logo">
                    <h2 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        TLF
                    </h2>
                </div>
                
                <div className="nav-buttons">
                    <button
                        className={activeSection === 'title' ? 'active' : 'inactive'}
                        onClick={() => onSectionClick('title')}
                    > 
                        Home
                    </button>
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
                
                <div className="social-links">
                    <SocialMediaIcon 
                        icon="fa-linkedin-in" 
                        url="https://www.linkedin.com/in/tom%C3%A1s-leote-falc%C3%A3o-a81860266/" 
                        label="LinkedIn" 
                    />
                    <SocialMediaIcon 
                        icon="fa-github" 
                        url="https://github.com/tomasleote" 
                        label="GitHub" 
                    />
                    <SocialMediaIcon 
                        icon="fa-envelope" 
                        url="mailto:tomas.leote@gmail.com" 
                        label="Email" 
                    />
                    <SocialMediaIcon 
                        icon="fa-spotify" 
                        url="https://open.spotify.com/user/11123207778?si=95bcfbeef7aa4209" 
                        label="Spotify" 
                    />
                </div>
            </div>
        </nav>
    )
}

export default Navigation
