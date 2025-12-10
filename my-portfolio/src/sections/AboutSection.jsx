import '../styles/AboutSection.css'

function AboutSection({ isActive }) {
    const currentTechStack = [
        "TypeScript", "JavaScript", "Java", "Python", "React", "Angular", "Vue", 
        ".NET", "C", "R", "HTML", "CSS", "Node.js", "Figma", "GitHub"
    ];

    return (
        <div className='about-content'>
            <p className='about-text'> 
                Hey there! I'm a recent Computing Science graduate from the University of Groningen who genuinely enjoys building web applications and creating digital experiences. Beyond coding, I have a big passion for travelling, discovering new music, and outdoor sports.
            </p>
            
            <p className='about-text'> 
                Currently, I'm working as a freelancer for Avodah Creatives, where I'm helping to build their product and website from scratch. I focus on developing UI components and ensuring our applications meet web accessibility standards and best practices to deliver an inclusive user experience that everyone can enjoy.    
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