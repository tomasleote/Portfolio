import SocialMediaIcon from '../SocialMediaIcon'
import '../../styles/MobileHeroSection.css'

function MobileHeroSection() {
    return (
        <section className="mobile-hero-section">
            <div className="mobile-hero-content">
                <div className="mobile-hero-text">
                    <h1 className="mobile-hero-title">
                        Tomás Leote Falcão
                    </h1>
                    <p className="mobile-hero-subtitle">Software Developer</p>
                    <p className="mobile-hero-tagline">
                        Building digital experiences with modern web technologies
                    </p>
                </div>
                
                <div className="mobile-hero-social">
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
                
                <div className="mobile-hero-scroll-indicator">
                    <span>Scroll to explore</span>
                    <div className="scroll-arrow">↓</div>
                </div>
            </div>
        </section>
    )
}

export default MobileHeroSection
