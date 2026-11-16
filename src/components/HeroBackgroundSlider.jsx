'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const HERO_SLIDES = [
  {
    src: '/assets/aistudio/cat_780b12b8.jpg',
    alt: 'Three Maine Coon kittens sitting together',
    position: 'object-[center_22%]',
  },
  {
    src: '/assets/aistudio/IMG_8519_1fbe5195.jpg',
    alt: 'Maine Coon litter resting together',
    position: 'object-center',
  },
];

export default function HeroBackgroundSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-x-0 top-0 h-[540px] sm:h-[620px] lg:h-[680px] overflow-hidden pointer-events-none">
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_SLIDES.map((slide, idx) => (
          <motion.div
            key={slide.src}
            initial={false}
            animate={{ opacity: idx === activeIndex ? 0.6 : 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={`w-full h-full object-cover ${slide.position}`}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#16161A]/95 via-[#16161A]/60 to-[#16161A]/25 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] via-transparent to-[#16161A]/45 z-10" />
      </div>

      {/* Subtle slideshow indicator bars */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 pointer-events-auto">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Show hero background photo ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === activeIndex ? 'w-7 bg-[#C59B4B]' : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
