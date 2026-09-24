"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Download, ChevronLeft, ChevronRight, Hourglass } from "lucide-react";

/**
 * Reusable Landing Programmes Carousel (Infinite Loop with Timer + Touch Swipe)
 * - 4 cards visible on desktop, 2 on tablet, 1 on mobile
 * - Touch swipe support for mobile gesture navigation
 * - Smooth auto-play with pause on hover/touch
 * - Green level badge, Yellow Get Brochure button, and Duration
 */
export default function LandingProgrammes({
  programmes = [],
  universityName = "Amity University",
  brand = {},
  title = "Online Degree Courses",
  intervalTime = 3000,
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const total = programmes.length;

  const [currentIndex, setCurrentIndex] = useState(total > 0 ? total : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const timerRef = useRef(null);

  // Touch swipe state
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const rawUni = universityName || brand.name || "Amity University";
  const displayUniversity = rawUni.replace(/\s+Online$/i, "").trim() || rawUni;
  const primaryBg = brand.hero?.formBackground || brand.primaryColor || "#08417b";

  // Responsive visible cards count: 1 on mobile (<640px), 2 on tablet (<1024px), 4 on desktop
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const extendedList =
    total > 0
      ? [
        ...programmes,
        ...programmes,
        ...programmes,
        ...programmes,
      ]
      : [];

  const handleTransitionEnd = () => {
    if (currentIndex >= total * 2) {
      setWithTransition(false);
      setCurrentIndex(total);
    } else if (currentIndex < total) {
      setWithTransition(false);
      setCurrentIndex(total + (currentIndex % total));
    }
  };

  const handleNext = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Touch gestures for mobile swipe
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(deltaX) > 40 && touchEndXRef.current !== 0) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Auto-play timer
  useEffect(() => {
    if (isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      setWithTransition(true);
      setCurrentIndex((prev) => {
        if (prev >= total * 2) {
          return total + 1;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timerRef.current);
  }, [isPaused, total, intervalTime]);

  if (!programmes || programmes.length === 0) return null;

  return (
    <section
      id="programmes"
      className="py-10 sm:py-14 lg:py-16 text-white overflow-hidden relative select-none transition-colors w-full"
      style={{ backgroundColor: primaryBg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Section Heading */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4 max-w-4xl mx-auto">
        <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white m-0 tracking-tight leading-tight">
          {displayUniversity}
        </h3>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-white mt-1 m-0 tracking-tight leading-tight">
          {title}
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="w-full max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 relative">
        <div className="w-full overflow-hidden rounded-[8px]">
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex items-stretch"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              transition: withTransition
                ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {extendedList.map((c, idx) => {
              const isPostGrad =
                c.level?.toLowerCase().includes("post") ||
                c.title?.toLowerCase().includes("master") ||
                c.code?.toLowerCase().startsWith("m");

              const levelText = c.level || (isPostGrad ? "Post Graduation" : "Graduation");
              const durationText = c.duration || (isPostGrad ? "24 Months" : "36 Months");

              return (
                <div
                  key={`${c.id || c.code}-${idx}`}
                  className="shrink-0 px-1.5 sm:px-2 xl:px-2.5 box-border"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  {/* Course Card */}
                  <div className="bg-white rounded-[8px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group text-left border border-slate-200/80">
                    <div>
                      {/* Course Image with Green Level Badge */}
                      <div className="relative h-44 sm:h-44 xl:h-48 w-full bg-slate-100 overflow-hidden">
                        <Image
                          src={c.image || "/assets/amitylp/MBA-amity.png"}
                          alt={c.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        {/* Green Level Badge */}
                        <div className="absolute top-0 left-0 bg-[#009900] text-white text-[11px] sm:text-[11.5px] font-semibold px-2.5 sm:px-3 py-1 rounded-br-[4px] tracking-wide select-none shadow-xs">
                          {levelText}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-3.5 sm:p-4 pb-2">
                        <h3 className="text-[20px] sm:text-[22px] xl:text-[24px] font-bold text-[#08417b] m-0 leading-tight tracking-tight">
                          {c.code || c.id?.toUpperCase() || c.title}
                        </h3>
                        <p className="text-[12.5px] sm:text-[13px] font-semibold text-[#08417b] mt-1 mb-1.5 line-clamp-1">
                          {c.title}
                        </p>
                        <p className="text-[11.5px] sm:text-[12px] text-[#444444] leading-[1.5] line-clamp-3 sm:line-clamp-4 min-h-[54px] sm:min-h-[72px] m-0">
                          {c.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="px-3.5 sm:px-4 pt-2 pb-3.5 flex items-center justify-between border-t border-slate-100 mt-1">
                      {/* Yellow Get Brochure Button */}
                      <button
                        type="button"
                        onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                        className="bg-[#ffd200] hover:bg-[#ffc107] active:scale-95 text-black font-bold text-[11.5px] sm:text-[12px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-[4px] inline-flex items-center gap-1.5 border-none cursor-pointer transition-all shadow-xs shrink-0"
                      >
                        <span>Get Brochure</span>
                        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>

                      {/* Duration Indicator with Hourglass */}
                      <div className="flex items-center gap-1 text-[11.5px] sm:text-[12px] font-medium text-[#333333] select-none shrink-0">
                        <Hourglass className="w-3.5 h-3.5 text-[#555555]" />
                        <span>{durationText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center justify-center gap-3 mt-4 sm:hidden">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous programme"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border-none cursor-pointer active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[11.5px] text-white/80 font-medium">Swipe to explore</span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next programme"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border-none cursor-pointer active:scale-95 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
