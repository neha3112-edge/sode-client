"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LandingContainer from "../LandingContainer";

export default function SliderWhyChoose({ whyChoose = [], brand = {} }) {
  const prefix = brand.whyChoosePrefix || "Key Features of";
  const highlight = brand.whyChooseHighlight || brand.name || "University Online";
  const subtitle = brand.whyChooseSubtitle || null;
  const sectionBg = brand?.whyChooseBg || "#fdf8f4";
  const primaryColor = brand?.primaryColor || "#ee3024";

  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const items = whyChoose;
  const extendedItems = [...items, ...items, ...items];
  const [currentIndex, setCurrentIndex] = useState(items.length > 0 ? items.length : 0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setVisibleCount(width < 640 ? 1 : width < 1024 ? 2 : 4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  useEffect(() => {
    if (isPaused || items.length === 0) return;
    const timer = setInterval(() => handleNext(), 2500);
    return () => clearInterval(timer);
  }, [isPaused, items.length, handleNext]);

  const handleTransitionEnd = () => {
    if (currentIndex >= items.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - items.length);
    } else if (currentIndex < items.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + items.length);
    }
  };

  return (
    <section
      id="advantage"
      className="py-8 sm:py-10 md:py-11 select-none"
      style={{ backgroundColor: sectionBg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <LandingContainer>
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

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Feature"
            className="absolute -left-2 sm:-left-4 top-[28%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Feature"
            className="absolute -right-2 sm:-right-4 top-[28%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          <div
            className="overflow-hidden w-full select-none"
            onTouchStart={(e) => {
              setIsPaused(true);
              touchStartX.current = e.targetTouches[0].clientX;
            }}
            onTouchMove={(e) => {
              touchEndX.current = e.targetTouches[0].clientX;
            }}
            onTouchEnd={() => {
              const diff = touchStartX.current - touchEndX.current;
              if (Math.abs(diff) > 40) {
                if (diff > 0) handleNext();
                else handlePrev();
              }
              setIsPaused(false);
            }}
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
                  {item.image && (
                    <div className="relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] mb-2 sm:mb-2.5 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105">
                      <Image src={item.image} alt={item.title} fill className="object-contain" sizes="80px" />
                    </div>
                  )}
                  <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#111827] m-0 mb-1 leading-snug text-center">
                    {item.title}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] text-slate-700 leading-[1.4] font-normal m-0 text-center max-w-[225px]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
