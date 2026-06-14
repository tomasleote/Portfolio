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
import findADayPic from '../assets/findADay.png'

export const projects = [
  {
    title: "FindADay",
    category: "Web App",
    description: "FindADay was born out of the frustration of trying to coordinate a group trip where no one could agree on a date. I couldn't find a tool that made it easy, so I built one. FindADay is a scheduling tool with no accounts required. Whether you're planning a dinner or a vacation, just create a link, collect availability, and let the integrated heatmap show you exactly when everyone is free.",
    technologies: ["React", "Firebase", "Tailwind CSS", "Vercel", "Google Places API"],
    url: "https://findaday.cc",
    imageUrl: findADayPic,
    links: [{ label: "Source Code", url: "https://github.com/tomasleote/findaday" }],
  },
  {
    title: "Avodah Creatives",
    category: "Website",
    description: "A modern, responsive website designed and developed for Avodah Creatives as a freelance project. Built with React and styled using Tailwind CSS, the site features a clean and professional design that showcases the creative agency's portfolio and services with smooth animations and an intuitive user experience.",
    technologies: ["React", "Tailwind CSS", "Responsive Design", "Modern UI/UX"],
    url: "https://avodahcreatives.com/",
    imageUrl: avodahWebsite,
  },
  {
    title: "Thesis: Analytics Dashboard",
    category: "Full Stack",
    description: "A comprehensive analytics dashboard developed during a full-time internship at Klippa for my bachelor's thesis. Built with Angular, GraphQL, and Highcharts to provide scalable data visualizations and strategic insights into platform usage for business clients.",
    technologies: ["Angular", "GraphQL", "Highcharts", "TypeScript", "Data Visualization"],
    url: "https://www.klippa.com/en/home-en/",
    imageUrl: null, // uses video instead
    videoUrl: thesisDemoVid,
    links: [{ label: "↓ Download Thesis PDF", url: thesisPdf }],
  },
  {
    title: "Budget Tracker",
    category: "Full Stack",
    description: "A comprehensive full-stack budget tracker application built with React and Node.js, implementing strict MVC architecture patterns for scalable personal finance management. Features transaction management, budget planning, financial analytics, and data import/export capabilities.",
    technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Express.js"],
    url: "https://github.com/tomasleote/budget_tracker",
    imageUrl: budgetTrackerPic,
    links: [{ label: "Source Code", url: "https://github.com/tomasleote/budget_tracker" }],
  },
  {
    title: "Op Shell",
    category: "Systems",
    description: "A custom shell implementation project demonstrating command-line interface development and system programming concepts. Built to explore shell functionality, command parsing, and process management in a Unix-like environment.",
    technologies: ["C", "Unix", "System Programming", "Command Line"],
    url: "https://github.com/tomasleote/op-shell",
    imageUrl: null,
    links: [
      { label: "Demo", url: "https://op-shell.vercel.app/" },
      { label: "Source Code", url: "https://github.com/tomasleote/op-shell" },
    ],
  },
  {
    title: "Monte do Papa Léguas",
    category: "Website",
    description: "A professional hotel website developed using Wix as per client requirements to enable easy future updates by staff members. Integrated Hey Travel booking system for seamless reservation management. The project focused on creating an intuitive user experience while implementing comprehensive SEO strategies.",
    technologies: ["Wix", "Hey Travel Integration", "SEO Optimization", "Web Design"],
    url: "https://www.montedopapaleguas.pt/",
    imageUrl: papaLeguasWebsite,
  },
  {
    title: "Portfolio Website",
    category: "Website",
    description: "A modern, interactive portfolio website built with React and Vite, featuring a responsive design that adapts seamlessly between desktop and mobile experiences. Implements smooth animations, magnetic hover effects, and dynamic content transitions.",
    technologies: ["React", "Vite", "CSS3", "Responsive Design", "Animation"],
    url: "https://github.com/tomasleote/Portfolio",
    imageUrl: portfolioWebsite,
    links: [{ label: "Source Code", url: "https://github.com/tomasleote/Portfolio" }],
  },
  {
    title: "Data Generator",
    category: "Desktop App",
    description: "A Java-based synthetic data generator that can generate thousands of unique values per second with different format requirements. Features a modular pipeline architecture with composable generators, mathematical formula support, and a user-friendly C# interface.",
    technologies: ["Java", "C#", "Swing", "Maven", "Mathematical Expressions"],
    url: "https://github.com/tomasleote/multiFormatDataGenerator",
    imageUrl: dataGenPic,
    links: [{ label: "Source Code", url: "https://github.com/tomasleote/multiFormatDataGenerator" }],
  },
  {
    title: "Stock Market Simulator",
    category: "Networking",
    description: "A networking and messaging project that simulates a real-time stock market environment with automated trading bots. Traders communicate with the Stock Market through a networking module, sending messages to a PriorityBlockingQueue for processing.",
    technologies: ["Java", "Networking", "PriorityBlockingQueue", "Message Queues"],
    url: "https://github.com/tomasleote/stockMarket_simulator",
    imageUrl: stockSimPic,
    links: [{ label: "Source Code", url: "https://github.com/tomasleote/stockMarket_simulator" }],
  },
  {
    title: "Flight Logistics Simulator",
    category: "Simulation",
    description: "A comprehensive flight logistics simulation system that models airline operations, route optimization, and resource management. Features dynamic flight scheduling, passenger management, and real-time logistics coordination.",
    technologies: ["Java", "Simulation", "Algorithm Design", "Data Structures"],
    url: "https://github.com/tomasleote/flightLogisticsSimulator",
    imageUrl: flightLogisticsPic,
    links: [{ label: "Source Code", url: "https://github.com/tomasleote/flightLogisticsSimulator" }],
  },
  {
    title: "LOTR Simulator",
    category: "Game Dev",
    description: "An interactive simulation game based on the Lord of the Rings universe, featuring character management, quest systems, and strategic gameplay mechanics. Implements object-oriented design patterns with rich storytelling elements.",
    technologies: ["Java", "OOP Design", "Game Development", "Simulation"],
    url: "https://github.com/tomasleote/lotrSimulator",
    imageUrl: lotrSimPic,
    links: [{ label: "Source Code", url: "https://github.com/tomasleote/lotrSimulator" }],
  },
]
