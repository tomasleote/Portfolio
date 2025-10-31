import { createPortal } from 'react-dom'
import '../styles/VideoModal.css'

function VideoModal({ videoUrl, title, isOpen, onClose }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    const modalContent = (
        <div 
            className="modal-overlay video-modal-overlay" 
            onClick={handleOverlayClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className="modal-content video-modal-content">
                <button 
                    className="modal-close" 
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ×
                </button>
                <video 
                    src={videoUrl} 
                    className="modal-video"
                    controls
                    autoPlay
                    playsInline
                />
                <p className="modal-title">{title}</p>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

export default VideoModal;
