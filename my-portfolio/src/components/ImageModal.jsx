import { createPortal } from 'react-dom'
import '../styles/ImageModal.css'

function ImageModal({ imageUrl, title, isOpen, onClose }) {
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
            className="modal-overlay" 
            onClick={handleOverlayClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className="modal-content">
                <button 
                    className="modal-close" 
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ×
                </button>
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="modal-image"
                />
                <p className="modal-title">{title}</p>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

export default ImageModal;
