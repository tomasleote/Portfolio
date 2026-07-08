import '../styles/CertificateCard.css'
import { useState } from 'react'
import PdfModal from './PdfModal'

function CertificateCard({ title, pdfUrl, thumb }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="certificate-card" onClick={handleCardClick}>
                <div className="certificate-preview-container">
                    <img
                        src={thumb}
                        className="certificate-preview"
                        alt={`${title} preview`}
                        loading="lazy"
                    />
                    <div className="certificate-overlay">
                        <span className="expand-icon">⤢</span>
                    </div>
                </div>

                <div className="certificate-details">
                    <h3 className="certificate-title">{title}</h3>
                </div>
            </div>

            <PdfModal
                pdfUrl={pdfUrl}
                title={title}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    )
}

export default CertificateCard
