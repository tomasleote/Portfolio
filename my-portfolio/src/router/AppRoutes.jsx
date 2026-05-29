// src/router/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Experience from '../pages/Experience'
import Projects from '../pages/Projects'
import Contact from '../pages/Contact'

export default function AppRoutes({ location, preloaderDone }) {
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home preloaderDone={preloaderDone} />} />
      <Route path="/about" element={<About />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}
