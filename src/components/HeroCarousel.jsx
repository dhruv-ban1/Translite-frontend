import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Replace these with actual images of Fiber Gallery's products!
const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2070&auto=format&fit=crop', // A sleek, modern architectural application
    title: 'Premium Acrylic & PVC Sheets',
    subtitle: 'High-clarity, weather-resistant materials optimized for architectural and industrial applications.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=2070&auto=format&fit=crop', // Structural/industrial focus
    title: 'Durable Fiber Sheets',
    subtitle: 'Engineered for a high strength-to-weight ratio, providing long-term structural reliability.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop', // Interior design/decorative focus
    title: 'Versatile Decorative Panels',
    subtitle: 'A wide range of paneling solutions designed to enhance both interior aesthetics and surface protection.',
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play logic: Changes slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-slate-950">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          
          {/* Dark Overlay (Makes text readable) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text Content */}
      <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 font-medium">
                {slides[currentSlide].subtitle}
              </p>
              
              <button 
                onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-orange-500/30 active:scale-95"
              >
                Explore Products
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index 
                ? "w-8 h-2 bg-orange-500" 
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}