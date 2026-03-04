import '../styles/CertificateCard.css'
import { useState } from 'react'
import PdfModal from './PdfModal'

function CertificateCard({ title, pdfUrl }) {
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
                    <iframe
                        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                        className="certificate-preview"
                        title={`${title} Preview`}
                        tabIndex="-1"
                        scrolling="no"
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
