import '../styles/ProjectCard.css'
import { useState } from 'react'
import ImageModal from './ImageModal'

function ProjectCard({ title, description, technologies, githubUrl, imageUrl }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (e) => {
        // Don't open GitHub if clicking on image
        if (e.target.closest('.project-image-container')) {
            return;
        }
        window.open(githubUrl, '_blank');
    };

    const handleImageClick = (e) => {
        e.stopPropagation();
        if (imageUrl) {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="project-card" onClick={handleCardClick}>
                <div className="project-image-container" onClick={handleImageClick}>
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
            
            <ImageModal 
                imageUrl={imageUrl}
                title={title}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    )
}

export default ProjectCard