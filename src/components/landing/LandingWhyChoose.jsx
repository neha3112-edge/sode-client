"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Landing Why Choose / Key Features Component
 * Supports both modern interactive carousel/slider with infinite loop (2s interval)
 * and classic 2-column grid layout.
 */
export default function LandingWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const universityName = brand.name || "University Online";
  const studentImg = brand.whyChooseStudentImage || "/assets/amitylp/Why-choose-amity.png";
  const isSlider = brand.whyChooseLayout === "slider";
  const isCheckerboard = brand.whyChooseLayout === "checkerboard";

  if (isCheckerboard) {
    return (
      <section id="Career" className="py-10 sm:py-14 bg-white select-none">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2
              className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight m-0"
              style={{
                background: brand.themeGradient || "linear-gradient(to right, #fd202a, #ff4be5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {brand.whyChoosePrefix || "Why Students Trust"}
            </h2>
            <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#000000] mt-1 m-0">
              {brand.whyChooseHighlight || brand.name || "Shoolini University Online"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {whyChoose.map((item, idx) => {
              // Alternating checkerboard: Card 0 & 3 red, Card 1 & 2 light peach
              const isRed = idx === 0 || idx === 3;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 lg:p-10 rounded-[6px] transition-transform duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: isRed ? (brand.accentColor || "#fd2954") : (brand.hero?.sectionBg || "#fff8f2"),
                    color: isRed ? "#ffffff" : "#4d4d4d",
                  }}
                >
                  <h4
                    className="text-lg sm:text-[20px] font-bold tracking-tight mb-3 leading-snug"
                    style={{ color: isRed ? "#ffffff" : "#000000" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-[13.5px] sm:text-[14.5px] leading-relaxed font-normal m-0"
                    style={{ color: isRed ? "#ffffff" : "#4d4d4d" }}
                  >
                    {item.desc || item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const prefix = brand.whyChoosePrefix || "Key Features of";
  const highlight = brand.whyChooseHighlight || brand.name || universityName;
  const subtitle = brand.whyChooseSubtitle || null;

  // Slider State & Infinite Loop logic
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Triple items for seamless infinite looping
  const items = whyChoose;
  const extendedItems = [...items, ...items, ...items];
  const [currentIndex, setCurrentIndex] = useState(items.length > 0 ? items.length : 0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive visible count
  useEffect(() => {
    if (!isSlider) return;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSlider]);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // 2s Auto-Play Loop
  useEffect(() => {
    if (!isSlider || isPaused || items.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(timer);
  }, [isSlider, isPaused, items.length, handleNext]);

  // Seamless boundary wrap without animation glitch
  const handleTransitionEnd = () => {
    if (currentIndex >= items.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - items.length);
    } else if (currentIndex < items.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + items.length);
    }
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setIsPaused(false);
  };

  const sectionBg = brand?.whyChooseBg || (isSlider ? "#fdf8f4" : "#ffffff");
  const primaryColor = brand?.primaryColor || "#ee3024";

  if (items.length === 0) return null;

  return (
    <section
      id="advantage"
      className="py-8 sm:py-10 md:py-11 select-none"
      style={{ backgroundColor: sectionBg }}
    >
      <LandingContainer>
        {isSlider ? (
          /* Slider / Carousel Mode (Exact match to First Image reference) */
          <div>
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
              <h2 className="text-2xl sm:text-[28px] md:text-[32px] font-bold tracking-tight m-0 text-center leading-tight">
                <span style={{ color: primaryColor }}>{prefix} </span>
                <span className="text-[#192f59] font-bold">{highlight}</span>
              </h2>
              {subtitle && (
                <p className="mt-2 text-[13px] sm:text-[14px] text-slate-700 leading-normal font-normal m-0 text-center max-w-4xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Slider Track with Navigation Chevrons */}
            <div
              className="relative max-w-6xl mx-auto px-4 sm:px-8"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Feature"
                className="absolute -left-2 sm:-left-4 top-[28%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Feature"
                className="absolute -right-2 sm:-right-4 top-[28%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </button>

              {/* Carousel Viewport */}
              <div
                className="overflow-hidden w-full select-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex"
                  style={{
                    transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
                    transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {extendedItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="shrink-0 px-2 sm:px-3 flex flex-col items-center text-center"
                      style={{ width: `${100 / visibleCount}%` }}
                    >
                      {/* Top Icon */}
                      {item.image && (
                        <div className="relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] mb-2 sm:mb-2.5 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain"
                            sizes="80px"
                          />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#111827] m-0 mb-1 leading-snug text-center">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[12px] sm:text-[12.5px] text-slate-700 leading-[1.4] font-normal m-0 text-center max-w-[225px]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Classic 2-Column Grid Mode */
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-slate-900 tracking-tight m-0 text-center sm:text-left mb-6 sm:mb-8">
              {brand.whyChooseTitle || `Why Choose ${universityName} for Degree Courses`}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-8 order-2 lg:order-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6">
                  {whyChoose.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-left">
                      {pt.image && (
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-lg p-1 bg-amber-50/50">
                          <Image
                            src={pt.image}
                            alt={pt.title}
                            fill
                            className="object-contain"
                            sizes="48px"
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <h3
                          className="text-[14.5px] sm:text-[15.5px] font-bold tracking-tight m-0"
                          style={{ color: brand.primaryColor || "#084183" }}
                        >
                          {pt.title}
                        </h3>
                        <p className="text-[12px] sm:text-[12.5px] text-gray-600 leading-relaxed font-normal m-0 max-w-sm">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-8 text-center sm:text-left">
                  <button
                    type="button"
                    onClick={() => onOpenApply?.()}
                    className="inline-flex items-center justify-center gap-1.5 font-bold text-[14px] px-6 py-2.5 rounded-md shadow-2xs transition-colors cursor-pointer border-none w-full sm:w-fit active:scale-95 hover:opacity-95"
                    style={{
                      background: brand.accentColor || "#ffc107",
                      color: brand.primaryColor || "#08417b",
                    }}
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
                <div className="relative w-full max-w-[240px] sm:max-w-[300px] h-[240px] sm:h-[300px]">
                  <Image
                    src={studentImg}
                    alt={`Why choose ${universityName}`}
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 1024px) 260px, 340px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </LandingContainer>
    </section>
  );
}
