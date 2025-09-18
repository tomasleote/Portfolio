import '../styles/ProjectCard.css'

function ProjectCard({ title, description, technologies, githubUrl, imageUrl }) {
    const handleCardClick = () => {
        window.open(githubUrl, '_blank')
    }

    return (
        <div className="project-card" onClick={handleCardClick}>
            <div className="project-image-container">
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className="project-image" />
                ) : (
                    <div className="project-image-placeholder"></div>
                )}
            </div>
            
            <div className="project-details">
                <h3 className="project-title">{title}</h3>
                <p className="project-description">{description}</p>
                
                <div className="project-technologies">
                    {technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard