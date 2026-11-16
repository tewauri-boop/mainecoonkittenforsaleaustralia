'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function FaqAccordion({ items = [], cardPadding = 'p-5', largeTitle = false }) {
  const [openIndices, setOpenIndices] = useState([]);

  const allOpen = items.length > 0 && openIndices.length === items.length;

  const toggleItem = (idx) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleAll = () => {
    if (allOpen) {
      setOpenIndices([]);
    } else {
      setOpenIndices(items.map((_, idx) => idx));
    }
  };

  return (
    <div>
      {items.length > 1 && (
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={toggleAll}
            className="text-xs font-semibold text-[#7A746E] hover:text-[#16161A] underline underline-offset-4 decoration-[#D8D2C9] hover:decoration-[#C59B4B] transition-colors cursor-pointer"
          >
            {allOpen ? 'Collapse All Questions' : 'Expand All Questions'}
          </button>
        </div>
      )}

      <div className="space-y-3.5">
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          const panelId = `faq-answer-${idx}`;

          return (
            <div
              key={idx}
              className={`bg-white rounded-xl border transition-colors shadow-sm ${
                isOpen ? 'border-[#C59B4B]' : 'border-[#E8E2D8] hover:border-[#D8D2C9]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={`w-full text-left ${cardPadding} flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B4B] rounded-xl`}
              >
                <span
                  className={`font-serif font-bold text-[#16161A] ${
                    largeTitle ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                  }`}
                >
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-[#C59B4B] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`${
                        largeTitle ? 'px-6 pb-6' : 'px-5 pb-5'
                      } text-xs sm:text-sm text-[#5C554E] leading-relaxed pt-3 border-t border-[#F0EBE1]`}
                    >
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
