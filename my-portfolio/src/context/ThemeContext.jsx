// src/context/ThemeContext.jsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

// Light theme styles are kept but disabled; flip to true to bring the toggle back.
const LIGHT_THEME_ENABLED = false

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    LIGHT_THEME_ENABLED ? localStorage.getItem('theme') || 'dark' : 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, canToggleTheme: LIGHT_THEME_ENABLED }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
