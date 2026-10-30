"use client";

/**
 * G-wealth Republic — Property Gallery with Lightbox
 * Full-screen gallery with thumbnail navigation, keyboard support, and image counter.
 */
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PropertyGallery({ images, title }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!showLightbox || !autoPlay) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [showLightbox, autoPlay, images.length]);

  useEffect(() => {
    if (!showLightbox) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setShowLightbox(false);
      if (e.key === "ArrowLeft") setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setCurrentImage((prev) => (prev + 1) % images.length);
      if (e.key === " ") setAutoPlay((prev) => !prev);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showLightbox, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="space-y-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
          <img
            src={images[currentImage]}
            alt={title}
            className="h-full w-full object-cover"
            onClick={() => setShowLightbox(true)}
          />
          <button
            onClick={() => setShowLightbox(true)}
            className="absolute inset-0 cursor-pointer"
            aria-label="Open gallery"
          />
        </div>
        <div className="grid grid-cols-5 gap-3">
          {images.slice(0, 5).map((img, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentImage(idx); setShowLightbox(true); }}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all ${currentImage === idx ? "border-gold" : "border-transparent"}`}
            >
              <img src={img} alt={`${title} - view ${idx + 1}`} className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-6xl max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close */}
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute -top-12 right-0 text-white hover:text-gold"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Image */}
              <div className="relative flex items-center justify-center h-[80vh]">
                <img
                  src={images[currentImage]}
                  alt={`${title} - ${currentImage + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute bottom-4 text-sm text-slate-300">
                  {currentImage + 1} / {images.length}
                </div>
              </div>

              {/* Play/Pause */}
              <button
                onClick={() => setAutoPlay((prev) => !prev)}
                className="absolute bottom-4 left-4 text-white hover:text-gold"
              >
                {autoPlay ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
