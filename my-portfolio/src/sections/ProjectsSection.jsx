import '../styles/ProjectsSection.css'
import ProjectCard from '../components/ProjectCard'
import Magnet from '../components/effects/Magnet'
import { useState, useEffect } from 'react'
import avodahWebsite from '../assets/avodahWebsite.png'
import papaLeguasWebsite from '../assets/papaLeguasWebsite.png'
import portfolioWebsite from '../assets/portfolioWebsite.png'
import thesisDemoVid from '../assets/thesisDemoVid.mp4'
import thesisPdf from '../assets/thesis.pdf'
import dataGenPic from '../assets/dataGenPic.png'
import stockSimPic from '../assets/stockSim.png'
import flightLogisticsPic from '../assets/FlightLogisticsSimulation.png'
import lotrSimPic from '../assets/lotrSimulator.png'
import budgetTrackerPic from '../assets/budgetTracker.png'

function ProjectsSection({ isActive }) {
    const [isMobile, setIsMobile] = useState(false)
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => window.removeEventListener('resize', checkMobile)
    }, [])
    
    const projects = [
        {
            title: "Avodah Creatives Website",
            description: "A modern, responsive website designed and developed for Avodah Creatives as a freelance project. Built with React and styled using Tailwind CSS, the site features a clean and professional design that showcases the creative agency's portfolio and services with smooth animations and an intuitive user experience.",
            technologies: ["React", "Tailwind CSS", "Responsive Design", "Modern UI/UX"],
            githubUrl: "https://avodahcreatives.com/",
            imageUrl: avodahWebsite
        },
        {
            title: "Thesis Project: Platform Usage Statistics Interface",
            description: "A comprehensive analytics dashboard developed during a full-time internship at Klippa for my bachelor's thesis. Built with Angular, GraphQL, and Highcharts to provide scalable data visualizations and strategic insights into platform usage for business clients. Click the video preview to watch a demo, or download the thesis PDF to read the full research and implementation details.",
            technologies: ["Angular", "GraphQL", "Highcharts", "TypeScript", "Data Visualization"],
            githubUrl: "https://www.klippa.com/en/home-en/",
            videoUrl: thesisDemoVid,
            documentUrl: thesisPdf,
            documentLabel: "Download Thesis PDF"
        },
        {
            title: "Budget Tracker",
            description: "A comprehensive full-stack budget tracker application built with React and Node.js, implementing strict MVC architecture patterns for scalable personal finance management. Features transaction management, budget planning, financial analytics, and data import/export capabilities with real-time updates.",
            technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Express.js"],
            githubUrl: "https://github.com/tomasleote/budget_tracker",
            imageUrl: budgetTrackerPic
        },
        {
            title: "Monte do Papa Léguas Website",
            description: "A professional hotel website developed using Wix as per client requirements to enable easy future updates by staff members. Integrated Hey Travel booking system for seamless reservation management. The project focused on creating an intuitive user experience while implementing comprehensive SEO strategies to improve the hotel's online visibility and search engine rankings.",
            technologies: ["Wix", "Hey Travel Integration", "SEO Optimization", "Web Design"],
            githubUrl: "https://www.montedopapaleguas.pt/",
            imageUrl: papaLeguasWebsite
        },
        {
            title: "Personal Portfolio Website",
            description: "A modern, interactive portfolio website built with React and Vite, featuring a responsive design that adapts seamlessly between desktop and mobile experiences. Implements smooth animations, magnetic hover effects, and dynamic content transitions. The site showcases projects, experience, and skills with an emphasis on clean design and user experience.",
            technologies: ["React", "Vite", "CSS3", "Responsive Design", "Animation"],
            githubUrl: "https://github.com/tomasleote/Portfolio",
            imageUrl: portfolioWebsite
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
                isMobile ? (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        technologies={project.technologies}
                        githubUrl={project.githubUrl}
                        imageUrl={project.imageUrl}
                        videoUrl={project.videoUrl}
                        documentUrl={project.documentUrl}
                        documentLabel={project.documentLabel}
                    />
                ) : (
                    <Magnet 
                        key={index}
                        padding={50}
                        magnetStrength={10}
                        wrapperClassName="magnet-wrapper"
                    >
                        <ProjectCard
                            title={project.title}
                            description={project.description}
                            technologies={project.technologies}
                            githubUrl={project.githubUrl}
                            imageUrl={project.imageUrl}
                            videoUrl={project.videoUrl}
                            documentUrl={project.documentUrl}
                            documentLabel={project.documentLabel}
                        />
                    </Magnet>
                )
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