'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Plane, ShieldCheck, Heart } from 'lucide-react';
import { PRODUCTS, SITE } from '@/src/config/site.js';
import KittenReserveBar from '@/src/components/KittenReserveBar.jsx';

export default function HeroKittenSlider({ kittens = PRODUCTS, currency = SITE.currency }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Check scroll positions for enabling/disabling arrows
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

      // Compute active index based on card width
      const cardWidth = el.querySelector('.kitten-slide-card')?.clientWidth || 300;
      const gap = 16;
      const currentIdx = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(kittens.length - 1, Math.max(0, currentIdx)));
    };

    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [kittens]);

  // Gentle auto-slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const card = el.querySelector('.kitten-slide-card');
      const cardWidth = card ? card.clientWidth + 16 : 320;
      
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 20) {
        // Loop back to start
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollByDirection = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.querySelector('.kitten-slide-card');
    const scrollAmount = card ? card.clientWidth + 16 : 320;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (index) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.querySelector('.kitten-slide-card');
    const cardWidth = card ? card.clientWidth + 16 : 320;
    el.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="mt-12 sm:mt-16 pt-8 border-t border-[#2A2B32]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Header bar above the sliding strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Meet Our Current Litters</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
            Sliding Showcase of Available Kittens
          </h2>
          <p className="text-xs text-[#A09A93] mt-1">
            Swipe or use controls to browse currently available gentle giants. All kittens are desexed, DNA tested & ready to travel.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => scrollByDirection('left')}
            disabled={!canScrollLeft}
            className={`w-9 h-9 rounded-full border border-[#3A3C46] flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'bg-[#222329] text-white hover:bg-[#C59B4B] hover:text-[#16161A] hover:border-[#C59B4B]'
                : 'bg-[#1C1D22] text-[#555] cursor-not-allowed border-[#282930]'
            }`}
            aria-label="Previous kittens"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollByDirection('right')}
            disabled={!canScrollRight}
            className={`w-9 h-9 rounded-full border border-[#3A3C46] flex items-center justify-center transition-all ${
              canScrollRight
                ? 'bg-[#222329] text-white hover:bg-[#C59B4B] hover:text-[#16161A] hover:border-[#C59B4B]'
                : 'bg-[#1C1D22] text-[#555] cursor-not-allowed border-[#282930]'
            }`}
            aria-label="Next kittens"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <Link
            href="/shop/"
            className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#222329] hover:bg-[#2F3038] border border-[#3A3C46] text-xs font-medium text-[#C59B4B] transition-colors"
          >
            <span>View All ({kittens.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* The Sliding Strip Container with Edge Fade Masks */}
      <div className="relative group/slider">
        {/* Subtle Edge Fade Overlays */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#16161A] to-transparent z-10 pointer-events-none transition-opacity" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#16161A] to-transparent z-10 pointer-events-none transition-opacity" />
        )}

        {/* Scrollable Track */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          aria-label="Maine Coon kittens sliding track"
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth focus:outline-none focus:ring-1 focus:ring-[#C59B4B]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {kittens.map((kitten, idx) => (
            <div
              key={kitten.slug}
              className="kitten-slide-card snap-start shrink-0 w-[270px] sm:w-[310px] bg-[#1E1F26] rounded-2xl border border-[#33353F] hover:border-[#C59B4B] transition-all duration-300 overflow-hidden flex flex-col group/card shadow-lg hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Kitten Image Frame */}
              <Link
                href={`/shop/${kitten.category}/${kitten.slug}/`}
                className="relative block aspect-[4/3] overflow-hidden bg-[#121317]"
              >
                <img
                  src={kitten.images[0]}
                  alt={`${kitten.name} Maine Coon`}
                  className={`w-full h-full ${
                    kitten.images[0]?.startsWith('/assets/') ? 'object-contain' : 'object-cover'
                  } transition-transform duration-500 group-hover/card:scale-105`}
                  loading={idx < 3 ? 'eager' : 'lazy'}
                />

                {/* Badge (Status / Line) */}
                <div className="absolute top-3 left-3 bg-[#16161A]/90 backdrop-blur-md border border-[#3A3C46] text-[#C59B4B] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                  {kitten.badge}
                </div>

                {/* Age Tag */}
                <div className="absolute bottom-3 right-3 bg-[#16161A]/85 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded border border-[#2F3038]">
                  {kitten.age}
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#A09A93] mb-1.5">
                    <span className="text-[#C59B4B] font-semibold">{kitten.gender}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{kitten.color}</span>
                  </div>

                  <Link
                    href={`/shop/${kitten.category}/${kitten.slug}/`}
                    className="font-serif text-base sm:text-lg font-bold text-white group-hover/card:text-[#C59B4B] transition-colors block line-clamp-1"
                  >
                    {kitten.name}
                  </Link>

                  <p className="text-xs text-[#A09A93] mt-1.5 line-clamp-2 leading-relaxed">
                    {kitten.shortDescription}
                  </p>
                </div>

                {/* Bottom Row with Price and CTA */}
                <div className="mt-4 pt-3 border-t border-[#2A2B33]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#7A746E]">Adoption Fee</div>
                      <div className="text-sm sm:text-base font-bold text-white">
                        ${kitten.price.toLocaleString()} <span className="text-xs font-normal text-[#A09A93]">{currency}</span>
                      </div>
                    </div>

                    <Link
                      href={`/shop/${kitten.category}/${kitten.slug}/`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A2B33] hover:bg-[#3A3C46] text-white text-xs font-semibold transition-colors"
                    >
                      <span>Meet</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                  <KittenReserveBar kitten={kitten} variant="dark" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicator Dots & Guarantee Highlights */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        {/* Navigation Indicator Pills */}
        <div className="flex items-center gap-1.5">
          {kittens.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'w-6 bg-[#C59B4B]'
                  : 'w-2 bg-[#3A3C46] hover:bg-[#5A5C66]'
              }`}
              aria-label={`Jump to kitten slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Reassurance Micro-Strip */}
        <div className="flex items-center gap-4 text-[11px] text-[#A09A93]">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>HCM / SMA / PKDef DNA Tested</span>
          </div>
          <span className="hidden sm:inline">·</span>
          <div className="hidden sm:flex items-center gap-1">
            <Plane className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Complimentary Direct Flights</span>
          </div>
        </div>
      </div>
    </div>
  );
}
