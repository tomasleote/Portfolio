import '../styles/ProjectsSection.css'
import ProjectCard from '../components/ProjectCard'
import dataGenPic from '../assets/dataGenPic.png'
import stockSimPic from '../assets/stockSim.png'
import flightLogisticsPic from '../assets/FlightLogisticsSimulation.png'
import lotrSimPic from '../assets/lotrSimulator.png'

function ProjectsSection({ isActive }) {
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
            imageUrl: dataGenPic
        },
        {
            title: "Stock Market Simulator",
            description: "A real-time stock market trading system simulation featuring automated trading bots with various strategies. Implements client-server architecture with networking modules, supports limit and market orders, and provides real-time portfolio management with a dynamic UI displaying live market activity.",
            technologies: ["Java", "Maven", "Networking", "Multi-threading", "UI Design"],
            githubUrl: "https://github.com/tomasleote/stockMarket_simulator",
            imageUrl: stockSimPic
        },
        {
            title: "Flight Logistics Simulator",
            description: "A comprehensive flight logistics simulation system that models airline operations, route optimization, and resource management. Features dynamic flight scheduling, passenger management, and real-time logistics coordination with performance analytics and operational insights.",
            technologies: ["Java", "Simulation", "Algorithm Design", "Data Structures", "Performance Analysis"],
            githubUrl: "https://github.com/tomasleote/flightLogisticsSimulator",
            imageUrl: flightLogisticsPic
        },
        {
            title: "Lord of the Rings Simulator",
            description: "An interactive simulation game based on the Lord of the Rings universe, featuring character management, quest systems, and strategic gameplay mechanics. Implements object-oriented design patterns with rich storytelling elements and immersive game mechanics.",
            technologies: ["Java", "OOP Design", "Game Development", "Simulation", "Story Design"],
            githubUrl: "https://github.com/tomasleote/lotrSimulator",
            imageUrl: lotrSimPic
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
        <div className="projects-content">
            <h2 className="section-title">Projects</h2>
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
    )
}

export default ProjectsSection