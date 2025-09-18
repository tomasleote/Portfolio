import '../styles/ExperienceCard.css'

function ExperienceCard({ timeframe, role, company, description, technologies }) {
    return (
        <div className="experience-item">
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