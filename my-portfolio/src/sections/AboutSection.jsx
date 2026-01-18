import '../styles/AboutSection.css'

function AboutSection({ isActive }) {
    const currentTechStack = [
        "TypeScript", "JavaScript", "Java", "React", "Angular", "Vue", "Outsystems", "Python",
        ".NET", "C", "R", "HTML", "CSS", "Node.js", "Figma", "GitHub"
    ];

    const calculateAge = () => {
        const birthDate = new Date(2001, 11, 13); // Month is 0-indexed (11 = December)
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Adjust age if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const age = calculateAge();

    return (
        <div className='about-content'>
            <p className='about-text'>
                Hello! I'm Tomás, a {age}-year-old software developer based in Lisbon, and I'm someone who gets excited about bringing ideas to life, whether that's organizing music events, building websites and new software, or just figuring out how to make something work that didn't exist before.
            </p>
            
            <p className='about-text'>
                Currently, I'm working as a Junior Software Developer at Minsait, where I'm expanding my skillset to work with low-code tools such as OutSystems. As part of the Low Code and Innovation team, I work on various full-stack projects for different clients, ensuring our applications meet web accessibility standards and best practices to deliver an inclusive user experience that everyone can enjoy.
            </p>
            
            <p className='about-text'> 
                During my internships at Klippa and Hospital Lusíadas, I got hands-on experience with both front-end and back-end development, learning how to create systems that people actually use every day. Throughout my bachelor's, I enjoyed diving into different programming languages and turning theoretical knowledge into working projects that I could see in action.
            </p>
            
            <p className='about-text'> 
                Beyond tech, I also have entrepreneurial experience from founding Project Umbra, a music event company that focused on bringing low-cost music events to the international community in Groningen. It served as a space to showcase local and young talents in Groningen's electronic music scene, where we organized 20+ events, hosting up to 700 people per event. In my free time, I enjoy surfing and going to the beach, watching football, discovering new movies and music, and DJing.
            </p>
            
            <p className='about-text'> 
                I bring a combination of technical expertise, entrepreneurial spirit, and a proven ability to thrive in diverse, international environments. With my adaptability to new technologies and collaborative mindset, I'm excited to contribute to innovative development projects in dynamic, forward-thinking teams.
            </p>
            
            <div className="tech-stack-section">
                <h3 className="tech-stack-title">Current Tech Stack:</h3>
                <div className="tech-stack-container">
                    {currentTechStack.map((tech, index) => (
                        <span key={index} className="tech-tag">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutSection