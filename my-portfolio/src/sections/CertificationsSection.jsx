import '../styles/CertificationsSection.css'
import CertificateCard from '../components/CertificateCard'
import { useState, useEffect } from 'react'
import o11Cert from '../assets/certifications/O11AssociateDeveloper.pdf'
import agileCert from '../assets/certifications/AgileFundamentals.pdf'
import jsCert from '../assets/certifications/jsForBeginners.pdf'
import sqlCert from '../assets/certifications/SqlForBeginners.pdf'
import restApiCert from '../assets/certifications/restApis.pdf'
import communicationCert from '../assets/certifications/communicationSkills.pdf'
import criticalThinkingCert from '../assets/certifications/criticalthinking.pdf'
import timeMasteryCert from '../assets/certifications/timeMastery.pdf'
import ethicsCert from '../assets/certifications/ethicsintheworkspace.pdf'
import chatgptCert from '../assets/certifications/chatgptforwork.pdf'

function CertificationsSection({ isActive }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const certifications = [
        { title: "Outsystems O11 Associate Developer", pdfUrl: o11Cert },
        { title: "Agile Fundamentals: Including Scrum & Kanban", pdfUrl: agileCert },
        { title: "JavaScript Basics for Beginners", pdfUrl: jsCert },
        { title: "Microsoft SQL for Beginners", pdfUrl: sqlCert },
        { title: "Introduction to REST APIs for Absolute Beginners", pdfUrl: restApiCert },
        { title: "Communication Skills Fundamentals", pdfUrl: communicationCert },
        { title: "Critical Thinking Strategies For Better Decisions", pdfUrl: criticalThinkingCert },
        { title: "Time Management Mastery: Do More, Stress Less", pdfUrl: timeMasteryCert },
        { title: "Ethics and Professionalism in the Workplace", pdfUrl: ethicsCert },
        { title: "ChatGPT for Work: The Definitive Guide to Innovate with AI", pdfUrl: chatgptCert }
    ]

    return (
        <div className="certifications-content">
            <h2 className="section-title">Certifications</h2>
            <div className="certifications-grid">
                {certifications.map((cert, index) => (
                    <CertificateCard
                        key={index}
                        title={cert.title}
                        pdfUrl={cert.pdfUrl}
                    />
                ))}
            </div>
        </div>
    )
}

export default CertificationsSection
