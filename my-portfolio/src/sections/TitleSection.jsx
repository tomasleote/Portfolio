import ScrollReveal from '../components/ScrollReveal'
import '../styles/TitleSection.css'

function TitleSection() {
    return (
        <div className="title-section">
            <div className="title-content">
                <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    containerClassName="main-title"
                    textClassName="title-text"
                >
                    Tomás Leote Falcão
                </ScrollReveal>
                <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={3}
                    blurStrength={8}
                    containerClassName="subtitle"
                    textClassName="subtitle-text"
                >
                    Software Developer
                </ScrollReveal>
            </div>
        </div>
    )
}

export default TitleSection
