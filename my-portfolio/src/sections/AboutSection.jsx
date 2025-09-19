import '../styles/AboutSection.css'

function AboutSection({ isActive }) {
    return (
        <div className='about-content'>
            <p className='about-text'> 
                As a recent Computing Science graduate from the University of Groningen, I offer hands-on experience in full-stack development
                with particular focus on web technologies and responsive applications.
            </p>
            
            <p className='about-text'> 
                My internship experience spans both front-end and back-end development, having worked with modern frameworks like React, Angular, and Vue. At Hospital Lusíadas, I designed
                and implemented solutions in .NET and Vue that improved operational workflows, while my thesis internship at Klippa gave me valuable experience with Angular and data visualization tools. 
                I bring a combination of technical proficiency, entrepreneurial experience from founding Project Umbra, and a demonstrated ability to collaborate in diverse and international environments.
            </p>
            
            <p className='about-text'> 
                With strong problem-solving skills and adaptability to new technologies, I am eager to contribute to innovative development
                projects in a dynamic environment.
            </p>
        </div>
    )
}

export default AboutSection