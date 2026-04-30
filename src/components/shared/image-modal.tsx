"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { ContentImage } from "./content-image"

interface ImageModalProps {
  isOpen: boolean
  imageUrl: string | null
  alt: string
  onClose: () => void
}

export function ImageModal({ isOpen, imageUrl, alt, onClose }: ImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen || !imageUrl) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <ContentImage
          src={imageUrl}
          alt={alt}
          width={1200}
          height={900}
          className="max-h-[90vh] max-w-[90vw] object-contain"
        />
      </div>
    </div>
  )
}
