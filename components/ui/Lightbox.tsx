"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  // Tutup dengan Escape key, navigasi dengan Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-accent transition-colors z-10"
        aria-label="Tutup"
      >
        <X size={32} />
      </button>

      {/* Navigation - Previous */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-accent transition-colors"
        aria-label="Foto sebelumnya"
      >
        <ChevronLeft size={40} />
      </button>

      {/* Navigation - Next */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-accent transition-colors"
        aria-label="Foto berikutnya"
      >
        <ChevronRight size={40} />
      </button>

      {/* Image */}
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="max-w-[90vw] max-h-[85vh] object-contain"
      />

      {/* Counter */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
}
