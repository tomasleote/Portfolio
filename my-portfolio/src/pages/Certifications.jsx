import TextReveal from '../components/effects/TextReveal'
import CertificateCard from '../components/CertificateCard'
import { certifications } from '../data/certifications'
import '../styles/certifications.css'

export default function Certifications() {
  return (
    <main className="certifications-page">
      <div className="certifications-page__content">

        <TextReveal tag="h1" className="certifications-page__title">Certifications</TextReveal>

        <div className="certifications-page__grid">
          {certifications.map((cert, index) => (
            <CertificateCard
              key={index}
              title={cert.title}
              pdfUrl={cert.pdfUrl}
              verifyUrl={cert.verifyUrl}
              thumb={cert.thumb}
            />
          ))}
        </div>

      </div>
    </main>
  )
}
