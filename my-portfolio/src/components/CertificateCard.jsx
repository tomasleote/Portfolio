import '../styles/CertificateCard.css'
import { useState } from 'react'
import PdfModal from './PdfModal'

function CertificateCard({ title, pdfUrl, verifyUrl, thumb }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        if (verifyUrl) {
            window.open(verifyUrl, '_blank', 'noopener,noreferrer');
            return;
        }
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
                        <span className="expand-icon">{verifyUrl ? '↗' : '⤢'}</span>
                    </div>
                </div>

                <div className="certificate-details">
                    <h3 className="certificate-title">{title}</h3>
                </div>
            </div>

            {pdfUrl && (
                <PdfModal
                    pdfUrl={pdfUrl}
                    title={title}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </>
    )
}

export default CertificateCard
