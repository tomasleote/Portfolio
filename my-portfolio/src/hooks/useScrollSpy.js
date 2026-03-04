import { useState, useEffect } from 'react'

/**
 * Simple scroll spy hook using scroll events as backup
 * @param {Array} sectionIds - Array of section IDs to track
 * @param {string} rootElementId - ID of the scrolling container (optional)
 * @returns {string} The ID of the currently active section
 */
const useScrollSpyBackup = (sectionIds, rootElementId = null) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '')

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = rootElementId ? document.getElementById(rootElementId) : window
      const scrollPosition = (rootElementId ? scrollContainer.scrollTop : window.scrollY) + 200 // Offset for better detection

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i])
        if (element) {
          let elementTop;
          if (rootElementId) {
            const containerRect = document.getElementById(rootElementId).getBoundingClientRect();
            const rect = element.getBoundingClientRect();
            elementTop = rect.top - containerRect.top + document.getElementById(rootElementId).scrollTop;
          } else {
            const rect = element.getBoundingClientRect()
            elementTop = rect.top + window.scrollY
          }

          if (scrollPosition >= elementTop) {
            if (activeSection !== sectionIds[i]) {
              setActiveSection(sectionIds[i])
            }
            break
          }
        }
      }
    }

    // Initial call
    handleScroll()

    // Add scroll listener
    const scrollContainer = rootElementId ? document.getElementById(rootElementId) : window
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [sectionIds, activeSection, rootElementId])

  return activeSection
}

/**
 * Enhanced scroll spy hook with Intersection Observer and fallback
 * @param {Array} sectionIds - Array of section IDs to track
 * @param {string} rootElementId - ID of the scrolling container (optional)
 * @returns {string} The ID of the currently active section
 */
const useScrollSpy = (sectionIds, rootElementId = null) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '')
  const [useBackup, setUseBackup] = useState(false)

  // Try Intersection Observer first
  useEffect(() => {
    // Check if IntersectionObserver is available
    if (!window.IntersectionObserver) {
      setUseBackup(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          // Get the first visible section (topmost)
          const topSection = visibleEntries.reduce((top, current) => {
            return current.boundingClientRect.top < top.boundingClientRect.top ? current : top
          })

          setActiveSection(topSection.target.id)
        }
      },
      {
        root: rootElementId ? document.getElementById(rootElementId) : null,
        rootMargin: '-10% 0px -50% 0px',
        threshold: 0.1
      }
    )

    // Observe all sections
    let observedElements = 0
    sectionIds.forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
        observedElements++
      }
    })

    if (observedElements === 0) {
      setUseBackup(true)
      observer.disconnect()
      return
    }

    return () => {
      observer.disconnect()
    }
  }, [sectionIds])

  // Backup scroll spy
  const backupActiveSection = useScrollSpyBackup(sectionIds, rootElementId)

  return useBackup ? backupActiveSection : activeSection
}

export { useScrollSpy }
