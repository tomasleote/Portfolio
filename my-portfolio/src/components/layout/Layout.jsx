// src/components/layout/Layout.jsx
import { useState } from 'react'
import Navbar from './Navbar'
import Menu from './Menu'
import Footer from './Footer'
import PageTransition from '../effects/PageTransition'

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Navbar
        onMenuToggle={() => setIsMenuOpen((p) => !p)}
        isMenuOpen={isMenuOpen}
      />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <PageTransition>{children}</PageTransition>

      <Footer />
    </>
  )
}
