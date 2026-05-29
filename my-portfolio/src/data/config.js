// src/data/config.js
// Centralized static metadata. No hardcoded contact/social info should live in components.
import cvFile from '../assets/CV_TomasLeote_Lisboa_2026.pdf'

export const personal = {
  name: 'Tomás Leote Falcão',
  email: 'tomas.leote@gmail.com',
}

export const social = {
  linkedin: 'https://www.linkedin.com/in/tom%C3%A1s-leote-falc%C3%A3o-a81860266/',
  github: 'https://github.com/tomasleote',
  spotify: 'https://open.spotify.com/user/11123207778?si=95bcfbeef7aa4209',
}

// CV PDF — bundled asset. All references go through config.
export const cvUrl = cvFile

// Footer social icons (Font Awesome brand classes, rendered as `fab fa-...`).
export const socialLinks = [
  { icon: 'fa-linkedin-in', url: social.linkedin, label: 'LinkedIn' },
  { icon: 'fa-github', url: social.github, label: 'GitHub' },
  { icon: 'fa-envelope', url: `mailto:${personal.email}`, label: 'Email' },
  { icon: 'fa-spotify', url: social.spotify, label: 'Spotify' },
]

// Contact page links.
export const contactLinks = [
  { label: 'LinkedIn', url: social.linkedin, external: true },
  { label: 'GitHub', url: social.github, external: true },
]

// Tech stack for the Home marquee.
// lib: 'fa' => Font Awesome brand icon (rendered `fab <icon>`)
//      'devicon' => Devicon (rendered as the icon class directly)
export const techStack = [
  { name: 'React', icon: 'fa-react', lib: 'fa' },
  { name: 'JavaScript', icon: 'fa-js', lib: 'fa' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain', lib: 'devicon' },
  { name: 'Node.js', icon: 'fa-node-js', lib: 'fa' },
  { name: 'Java', icon: 'fa-java', lib: 'fa' },
  { name: 'Vue', icon: 'fa-vuejs', lib: 'fa' },
  { name: 'Angular', icon: 'fa-angular', lib: 'fa' },
  { name: 'Three.js', icon: 'devicon-threejs-original', lib: 'devicon' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain', lib: 'devicon' },
  { name: 'Vite', icon: 'devicon-vitejs-plain', lib: 'devicon' },
  { name: 'GraphQL', icon: 'devicon-graphql-plain', lib: 'devicon' },
  { name: 'Firebase', icon: 'devicon-firebase-plain', lib: 'devicon' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', lib: 'devicon' },
  { name: 'Git', icon: 'fa-git-alt', lib: 'fa' },
]
