import '../styles/ExperienceCard.css'

function ExperienceCard({ timeframe, role, company, companyUrl, description, technologies }) {
    const handleCardClick = () => {
        if (companyUrl) {
            window.open(companyUrl, '_blank')
        }
    }

    return (
        <div 
            className={`experience-item ${companyUrl ? 'clickable' : ''}`}
            onClick={handleCardClick}
        >
            <div className="experience-timeframe">
                {timeframe}
            </div>
            <div className="experience-details">
                <h3 className="experience-title">
                    {role} · {company}
                </h3>
                <p className="experience-description">
                    {description}
                </p>
                <div className="experience-technologies">
                    {technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExperienceCard