import '../styles/ProjectsSection.css'
import ProjectCard from '../components/ProjectCard'

function ProjectsSection({ isActive, sectionRef }) {
    const projects = [
        {
            title: "Budget Tracker",
            description: "A comprehensive full-stack budget tracker application built with React and Node.js, implementing strict MVC architecture patterns for scalable personal finance management. Features transaction management, budget planning, financial analytics, and data import/export capabilities with real-time updates.",
            technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Express.js"],
            githubUrl: "https://github.com/tomasleote/budget_tracker",
            imageUrl: null
        },
        {
            title: "Multi-Format Data Generator",
            description: "A Java-based synthetic data generator that can generate thousands of unique values per second with different format requirements. Features a modular pipeline architecture with composable generators, mathematical formula support, and a user-friendly C# interface for defining data generation requirements.",
            technologies: ["Java", "C#", "Swing", "Maven", "Mathematical Expressions"],
            githubUrl: "https://github.com/tomasleote/multiFormatDataGenerator",
            imageUrl: "C:\Users\tomas\Desktop\Projetos\Programming\Portfolio\my-portfolio\src\assets\dataGenPic.png"
        },
        {
            title: "Stock Market Simulator",
            description: "A real-time stock market trading system simulation featuring automated trading bots with various strategies. Implements client-server architecture with networking modules, supports limit and market orders, and provides real-time portfolio management with a dynamic UI displaying live market activity.",
            technologies: ["Java", "Maven", "Networking", "Multi-threading", "UI Design"],
            githubUrl: "https://github.com/tomasleote/stockMarket_simulator",
            imageUrl: null
        },
        {
            title: "Op Shell",
            description: "A custom shell implementation project demonstrating command-line interface development and system programming concepts. Built to explore shell functionality, command parsing, and process management in a Unix-like environment.",
            technologies: ["C", "Unix", "System Programming", "Command Line"],
            githubUrl: "https://github.com/tomasleote/op-shell",
            imageUrl: null
        }
    ]

    return (
        <section ref={sectionRef} className="projects-section">
            <div className="projects-content">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        technologies={project.technologies}
                        githubUrl={project.githubUrl}
                        imageUrl={project.imageUrl}
                    />
                ))}
                
                <div className="section-link">
                    <a 
                        href="https://github.com/tomasleote" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-all-link"
                    >
                        View All Projects →
                    </a>
                </div>
            </div>
        </section>
    )
}

export default ProjectsSection