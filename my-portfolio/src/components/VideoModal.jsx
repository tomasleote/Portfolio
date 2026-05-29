import { useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '../styles/VideoModal.css'

function VideoModal({ videoUrl, title, isOpen, onClose }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useGSAP(() => {
    if (!overlayRef.current || !contentRef.current) return
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      .fromTo(contentRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.1'
      )
  }, { dependencies: [isOpen], scope: overlayRef })

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }

  const modalContent = (
    <div
      ref={overlayRef}
      className="modal-overlay video-modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div ref={contentRef} className="modal-content video-modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <video src={videoUrl} className="modal-video" controls autoPlay playsInline />
        <p className="modal-title">{title}</p>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default VideoModal
