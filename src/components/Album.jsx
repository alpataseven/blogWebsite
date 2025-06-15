import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// === SLIDER COMPONENT ===
export function CarouselSlider({ photos, onClose, initialIndex }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % photos.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);  
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Close Button */}
      <button
        className="absolute top-6 right-6 text-white text-3xl hover:text-red-500 transition"
        onClick={onClose}
        aria-label="Kapat"
      >
        ✕
      </button>

      {/* Previous Button */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md"
        onClick={prevSlide}
        aria-label="Önceki"
      >
        ❮
      </button>

      {/* Image Viewer */}
      <div className="flex items-center justify-center w-full max-w-6xl px-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={currentIndex}
            src={photos[currentIndex]}
            alt={`Fotoğraf ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="max-h-[80vh] max-w-full object-contain rounded-xl"
          />
        </AnimatePresence>
      </div>

      {/* Next Button */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md"
        onClick={nextSlide}
        aria-label="Sonraki"
      >
        ❯
      </button>
    </div>
  );
}

// === MAIN GALLERY COMPONENT ===
export default function Album({ photos }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  return (
    <>
      <main className="min-h-screen my-16">
        <h1 className="text-center text-4xl font-extrabold mb-10 tracking-tight">
          Fotoğraf Galerisi
        </h1>

        {/* Görselleri ortalayarak göster */}
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {photos.map((photo, index) => (
            <div
              className="cursor-pointer w-[300px]"
              key={index}
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <img
                src={photo}
                alt={`Galeri görseli ${index + 1}`}
                className="rounded-xl transition-transform duration-300 hover:scale-105 w-full h-auto object-cover shadow-md"
              />
            </div>
          ))}
        </div>
      </main>

      {/* Slider Açıkken */}
      {selectedPhotoIndex !== null && (
        <CarouselSlider
          photos={photos}
          onClose={() => setSelectedPhotoIndex(null)}
          initialIndex={selectedPhotoIndex}
        />
      )}
    </>
  );
}
