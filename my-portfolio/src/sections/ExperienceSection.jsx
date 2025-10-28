import '../styles/ExperienceSection.css'
import ExperienceCard from '../components/ExperienceCard'
import Magnet from '../components/effects/Magnet'
import cvFile from '../assets/CV_TomasLeote_Groningen_2025.pdf'
import { useState, useEffect } from 'react'

function ExperienceSection({ isActive }) {
    const [isMobile, setIsMobile] = useState(false)
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => window.removeEventListener('resize', checkMobile)
    }, [])
    
    const experiences = [
        {
            timeframe: "Sep 2024 — Present",
            role: "Freelance Frontend Developer",
            company: "Avodah Creatives",
            companyUrl: "https://avodahcreatives.com/",
            description: "Developing and maintaining frontend solutions for a creative agency as a freelance developer. Building responsive websites and client dashboards using modern web technologies, focusing on creating intuitive user interfaces and seamless user experiences. Collaborating with the team to deliver high-quality digital products that meet client requirements and business objectives.",
            technologies: ["React", "Tailwind CSS", "JavaScript", "Responsive Design", "Frontend Development"]
        },
        {
            timeframe: "Sep — Dec 2024",
            role: "Software Developer Internship",
            company: "Hospital Lusíadas",
            companyUrl: "https://www.lusiadas.pt/hospitais-clinicas/hospital-lusiadas-lisboa",
            description: "Designed, implemented, and tested Front-End and Back-End solutions using Vue and .NET frameworks. Integrated RESTful APIs to connect front-end and back-end services, ensuring seamless data flow between different system components. Contributed to cross-functional teams, improving efficiency across hospital workflows and emphasizing team collaboration and process automation.",
            technologies: ["Vue", ".NET", "RESTful APIs", "Agile"]
        },
        {
            timeframe: "Apr — Jun 2024", 
            role: "Software Development Thesis Internship",
            company: "Klippa",
            companyUrl: "https://www.klippa.com/en/home-en/",
            description: "Collaborated with senior engineers to build scalable analytics tools that supported strategic insights into platform usage for business clients. Implemented Angular, GraphQL, and Highcharts to deliver robust and customizable data visualizations for document processing, focusing on scalability and user experience.",
            technologies: ["Angular", "GraphQL", "Highcharts", "TypeScript"]
        },
        {
            timeframe: "Sep 2021 — Sep 2024",
            role: "Founder", 
            company: "Project Umbra",
            companyUrl: null,
            description: "Founded and grew an event-planning business from concept to execution, demonstrating entrepreneurial initiative and business acumen while managing a team of 6 people. Developed and maintained the project's web presence, handling user engagement and digital marketing. Successfully delivered over 20 events with up to 700 attendees using agile project management techniques.",
            technologies: ["Leadership", "Web Development", "Digital Marketing", "Project Management"]
        }
    ]

    return (
        <div className="experience-content">
            <h2 className="section-title">Experience</h2>
            {experiences.map((exp, index) => (
                isMobile ? (
                    <ExperienceCard
                        key={index}
                        timeframe={exp.timeframe}
                        role={exp.role}
                        company={exp.company}
                        companyUrl={exp.companyUrl}
                        description={exp.description}
                        technologies={exp.technologies}
                    />
                ) : (
                    <Magnet 
                        key={index}
                        padding={50}
                        magnetStrength={10}
                        wrapperClassName="magnet-wrapper"
                    >
                        <ExperienceCard
                            timeframe={exp.timeframe}
                            role={exp.role}
                            company={exp.company}
                            companyUrl={exp.companyUrl}
                            description={exp.description}
                            technologies={exp.technologies}
                        />
                    </Magnet>
                )
            ))}
            
            <div className="section-link">
                <a 
                    href={cvFile}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-all-link"
                >
                    View Full Résumé →
                </a>
            </div>
        </div>
    )
}

export default ExperienceSection
