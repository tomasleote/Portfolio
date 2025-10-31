import '../styles/ProjectCard.css'
import { useState } from 'react'
import ImageModal from './ImageModal'
import VideoModal from './VideoModal'

function ProjectCard({ 
    title, 
    description, 
    technologies, 
    githubUrl, 
    imageUrl, 
    videoUrl, 
    documentUrl,
    documentLabel = 'Download Document'
}) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const handleCardClick = (e) => {
        // Don't open GitHub if clicking on image/video or download button
        if (e.target.closest('.project-image-container') || e.target.closest('.document-download-btn')) {
            return;
        }
        window.open(githubUrl, '_blank');
    };

    const handleMediaClick = (e) => {
        e.stopPropagation();
        if (videoUrl) {
            setIsVideoModalOpen(true);
        } else if (imageUrl) {
            setIsImageModalOpen(true);
        }
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
    };

    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
    };

    const handleDocumentDownload = (e) => {
        e.stopPropagation();
        window.open(documentUrl, '_blank');
    };

    return (
        <>
            <div className="project-card" onClick={handleCardClick}>
                <div className="project-image-container" onClick={handleMediaClick}>
                    {videoUrl ? (
                        <video 
                            src={videoUrl} 
                            className="project-image project-video"
                            muted
                            playsInline
                        />
                    ) : imageUrl ? (
                        <img src={imageUrl} alt={title} className="project-image" />
                    ) : (
                        <div className="project-image-placeholder"></div>
                    )}
                    {videoUrl && (
                        <div className="video-play-overlay">
                            <span className="play-icon">▶</span>
                        </div>
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
                    
                    {documentUrl && (
                        <button 
                            className="document-download-btn"
                            onClick={handleDocumentDownload}
                        >
                            📄 {documentLabel}
                        </button>
                    )}
                </div>
            </div>
            
            <ImageModal 
                imageUrl={imageUrl}
                title={title}
                isOpen={isImageModalOpen}
                onClose={closeImageModal}
            />
            
            {videoUrl && (
                <VideoModal 
                    videoUrl={videoUrl}
                    title={title}
                    isOpen={isVideoModalOpen}
                    onClose={closeVideoModal}
                />
            )}
        </>
    )
}

export default ProjectCard