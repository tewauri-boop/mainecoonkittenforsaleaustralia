'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { REVIEWS, TRUSTPILOT } from '@/src/config/site.js';

function getStarColor(rating) {
  if (rating >= 5) return 'bg-[#00B67A]';
  if (rating === 4) return 'bg-[#73CF11]';
  if (rating === 3) return 'bg-[#FFCE00]';
  if (rating === 2) return 'bg-[#FF8622]';
  return 'bg-[#FF3722]';
}

function TrustpilotStars({ rating = 5, size = 'sm' }) {
  const boxSize = size === 'lg' ? 'w-7 h-7' : 'w-[20px] h-[20px]';
  const iconSize = size === 'lg' ? 'w-4 h-4' : 'w-3 h-3';
  const activeColor = getStarColor(rating);

  return (
    <div
      className="inline-flex items-center gap-[3px]"
      aria-label={`${rating} out of 5 stars on Trustpilot`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${boxSize} inline-flex items-center justify-center rounded-[2px] ${
            star <= rating ? `${activeColor} text-white` : 'bg-[#DCDCE6] text-white'
          }`}
        >
          <Star className={`${iconSize} fill-current`} aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export default function TrustpilotReviews({
  limit = REVIEWS.length,
  compact = false,
  bgClass = 'bg-[#F8F8FA]',
}) {
  const items = REVIEWS.slice(0, limit);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Sync activeIndex with horizontal scroll position
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const card = el.querySelector('.tp-review-card');
      const step = card ? card.clientWidth + 16 : 320;
      const idx = Math.round(el.scrollLeft / step);
      setActiveIndex(Math.min(items.length - 1, Math.max(0, idx)));
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [items.length]);

  // Revolving auto-advance (TrustBox Carousel behavior)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector('.tp-review-card');
      const step = card ? card.clientWidth + 16 : 320;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 20) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused]);

  const scrollStep = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.tp-review-card');
    const step = card ? card.clientWidth + 16 : 320;

    if (dir === 'left' && el.scrollLeft <= 10) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    } else if (dir === 'right' && el.scrollLeft + el.clientWidth >= el.scrollWidth - 20) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
    }
  };

  const jumpTo = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.tp-review-card');
    const step = card ? card.clientWidth + 16 : 320;
    el.scrollTo({ left: index * step, behavior: 'smooth' });
  };

  return (
    <section
      aria-labelledby="trustpilot-reviews-heading"
      className={`py-14 sm:py-20 ${bgClass} border-y border-[#E5E5EA]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TrustBox Carousel Layout: Left Rating Summary + Right Revolving Carousel */}
        <div
          className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Left: Authentic Trustpilot Rating Summary Panel */}
          <div className="lg:w-[275px] shrink-0 flex flex-col justify-between bg-white border border-[#E5E5EA] rounded-xl p-6 shadow-xs">
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Star className="w-5 h-5 text-[#00B67A] fill-[#00B67A]" aria-hidden="true" />
                <span className="font-bold text-base tracking-tight text-[#191919]">
                  Trustpilot
                </span>
              </div>

              <div>
                <h2
                  id="trustpilot-reviews-heading"
                  className="text-2xl font-bold text-[#191919] tracking-tight"
                >
                  {TRUSTPILOT.ratingLabel}
                </h2>
                <div className="mt-2 flex items-center justify-center lg:justify-start gap-2">
                  <TrustpilotStars rating={5} size="lg" />
                </div>
              </div>

              <div className="text-xs text-[#191919]">
                TrustScore <strong className="font-bold">{TRUSTPILOT.ratingValue}</strong>{' '}
                <span className="text-[#6E717C]" aria-hidden="true">|</span>{' '}
                <span className="font-medium text-[#4A4A52]">
                  Based on {TRUSTPILOT.reviewCount} reviews
                </span>
              </div>

              {/* Authentic Trustpilot Star Breakdown Bars */}
              {!compact && TRUSTPILOT.breakdown && (
                <div className="pt-3 border-t border-[#F0F0F5] space-y-1.5 text-[11px] text-[#4A4A52]">
                  {TRUSTPILOT.breakdown.map((row) => (
                    <div key={row.label} className="flex items-center gap-2">
                      <span className="w-10 text-left shrink-0">{row.label}</span>
                      <div className="flex-1 h-2 bg-[#ECECF2] rounded-sm overflow-hidden">
                        <div
                          className={`h-full rounded-sm ${
                            row.label === '3-star'
                              ? 'bg-[#FFCE00]'
                              : row.label === '4-star'
                              ? 'bg-[#73CF11]'
                              : 'bg-[#00B67A]'
                          }`}
                          style={{ width: `${row.percent}%` }}
                        />
                      </div>
                      <span className="w-7 text-right text-[#6E717C] shrink-0">
                        {row.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0F0F5] flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-[#6E717C]">
                Verified Adopter Feedback
              </span>
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                className="inline-flex items-center gap-1 text-[#6E717C] hover:text-[#191919] text-[11px]"
                aria-label={isPaused ? 'Resume revolving Trustpilot reviews' : 'Pause revolving Trustpilot reviews'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3 h-3" aria-hidden="true" />
                    <span>Paused</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3" aria-hidden="true" />
                    <span>Revolving</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Revolving Trustpilot Carousel */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="relative flex items-center">
              {/* Left Revolving Arrow */}
              <button
                type="button"
                onClick={() => scrollStep('left')}
                className="hidden sm:flex absolute -left-4 z-10 w-9 h-9 rounded-full bg-white border border-[#DCDCE6] text-[#191919] hover:border-[#00B67A] hover:text-[#007A52] shadow-md items-center justify-center transition-colors"
                aria-label="Previous Trustpilot review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Revolving Track */}
              <div
                ref={trackRef}
                tabIndex={0}
                aria-label="Revolving verified Trustpilot reviews"
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 w-full focus:outline-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {items.map((review) => (
                  <article
                    key={review.id}
                    className="tp-review-card snap-start shrink-0 w-[85%] sm:w-[calc(50%-8px)] xl:w-[calc(33.333%-11px)] bg-white border border-[#E5E5EA] hover:border-[#00B67A]/60 rounded-xl p-5 flex flex-col justify-between gap-4 transition-colors shadow-xs"
                  >
                    <div className="space-y-2.5">
                      {/* Trustpilot Card Header: 5 Green Stars + Verified + Timestamp */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <TrustpilotStars rating={review.rating} size="sm" />
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6E717C]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#6E717C]" aria-hidden="true" />
                            <span>Verified</span>
                          </span>
                        </div>
                        <span className="text-[11px] text-[#6E717C] shrink-0">{review.date}</span>
                      </div>

                      {/* Review Headline */}
                      <h3 className="text-[15px] font-bold text-[#191919] leading-snug line-clamp-1">
                        {review.title}
                      </h3>

                      {/* Review Content */}
                      <p className="text-[13px] text-[#191919]/85 leading-relaxed line-clamp-4">
                        {review.body}
                      </p>
                    </div>

                    {/* Trustpilot Reviewer & Date of Experience */}
                    <div className="pt-3 border-t border-[#F0F0F5] space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#FFE3D3] text-[#191919] text-[11px] font-bold flex items-center justify-center shrink-0">
                          {review.initials}
                        </div>
                        <div className="text-xs text-[#191919] truncate">
                          <strong className="font-semibold">{review.author}</strong>
                          <span className="text-[#6E717C] mx-1" aria-hidden="true">·</span>
                          <span className="text-[#6E717C]">{review.location}</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-[#6E717C]">
                        <strong className="font-semibold text-[#191919]">Date of experience:</strong>{' '}
                        {review.experienceDate}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Right Revolving Arrow */}
              <button
                type="button"
                onClick={() => scrollStep('right')}
                className="hidden sm:flex absolute -right-4 z-10 w-9 h-9 rounded-full bg-white border border-[#DCDCE6] text-[#191919] hover:border-[#00B67A] hover:text-[#007A52] shadow-md items-center justify-center transition-colors"
                aria-label="Next Trustpilot review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Carousel Controls & Trustpilot Caption */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollStep('left')}
                  className="sm:hidden w-8 h-8 rounded-full bg-white border border-[#DCDCE6] text-[#191919] flex items-center justify-center"
                  aria-label="Previous Trustpilot review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  {items.map((r, i) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => jumpTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeIndex === i
                          ? 'w-5 bg-[#00B67A]'
                          : 'w-1.5 bg-[#D4D4DC] hover:bg-[#9E9EAA]'
                      }`}
                      aria-label={`Show Trustpilot review ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollStep('right')}
                  className="sm:hidden w-8 h-8 rounded-full bg-white border border-[#DCDCE6] text-[#191919] flex items-center justify-center"
                  aria-label="Next Trustpilot review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-[#6E717C]">
                Showing verified customer reviews from <strong className="text-[#191919]">Trustpilot</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
