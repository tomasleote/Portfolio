import './ExperienceSection.css'

function ExperienceSection({ isActive, sectionRef }) {
    const experiences = [
        {
            timeframe: "Sep — Dec 2024",
            role: "Software Developer Internship",
            company: "Hospital Lusíadas",
            description: "Designed, implemented, and tested Front-End and Back-End solutions using Vue and .NET frameworks. Integrated RESTful APIs to connect front-end and back-end services, ensuring seamless data flow between different system components. Contributed to cross-functional teams, improving efficiency across hospital workflows and emphasizing team collaboration and process automation.",
            technologies: ["Vue", ".NET", "RESTful APIs", "Agile"]
        },
        {
            timeframe: "Apr — Jun 2024", 
            role: "Software Development Thesis Internship",
            company: "Klippa",
            description: "Collaborated with senior engineers to build scalable analytics tools that supported strategic insights into platform usage for business clients. Implemented Angular, GraphQL, and Highcharts to deliver robust and customizable data visualizations for document processing, focusing on scalability and user experience.",
            technologies: ["Angular", "GraphQL", "Highcharts", "TypeScript"]
        },
        {
            timeframe: "Sep 2021 — Sep 2024",
            role: "Founder", 
            company: "Project Umbra",
            description: "Founded and grew an event-planning business from concept to execution, demonstrating entrepreneurial initiative and business acumen while managing a team of 6 people. Developed and maintained the project's web presence, handling user engagement and digital marketing. Successfully delivered over 20 events with up to 700 attendees using agile project management techniques.",
            technologies: ["Leadership", "Web Development", "Digital Marketing", "Project Management"]
        },
        {
            timeframe: "Feb — Jun 2023",
            role: "Java Developer",
            company: "DATPROF", 
            description: "Designed and implemented a Java-based multi-format data generator, supporting scalable testing frameworks for database systems. Contributed to enterprise-level data processing solutions with focus on performance and reliability.",
            technologies: ["Java", "Maven", "Database Systems", "Testing Frameworks"]
        }
    ]

    return (
        <section ref={sectionRef} className="experience-section">
            <div className="experience-content">
                {experiences.map((exp, index) => (
                    <div key={index} className="experience-item">
                        <div className="experience-timeframe">
                            {exp.timeframe}
                        </div>
                        <div className="experience-details">
                            <h3 className="experience-title">
                                {exp.role} · {exp.company}
                            </h3>
                            <p className="experience-description">
                                {exp.description}
                            </p>
                            <div className="experience-technologies">
                                {exp.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="tech-tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ExperienceSection