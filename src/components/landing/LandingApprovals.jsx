"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable Landing Approvals Section
 * Supports both modern interactive carousel/slider (with 2s loop) and classic grid view.
 */
export default function LandingApprovals({
  approvals = [],
  universityName,
  brand,
  title = "Recognition and Approvals",
  bannerBg,
  showTags = false,
}) {
  if (!approvals || approvals.length === 0) return null;

  const activeUniversity = universityName || brand?.name || "University Online";
  const activeTitle = brand?.approvalsTitle || title;
  const subtitle = brand?.approvalsSubtitle || null;
  const isSlider = brand?.approvalsLayout === "slider" || Boolean(subtitle);
  const primaryColor = brand?.approvalsHeaderColor || brand?.primaryColor || "#ee3024";
  const borderColor = brand?.approvalsBorderColor || brand?.primaryColor || "#f35a06";
  const gridBg = brand?.approvalsBg || "#ffffff";

  // Slider State
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Triple items for seamless infinite looping
  const items = approvals;
  const extendedItems = [...items, ...items, ...items];
  const [currentIndex, setCurrentIndex] = useState(items.length);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Calculate visible items based on screen width
  useEffect(() => {
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
  }, []);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // 2 Seconds Auto-Play Interval
  useEffect(() => {
    if (!isSlider || isPaused || items.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(timer);
  }, [isSlider, isPaused, items.length, handleNext]);

  // Seamless jump without animation when reaching edge of clones
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

  // Helper to format approval description (bold before colon)
  const formatApprovalText = (text) => {
    if (!text) return null;
    const colonIdx = text.indexOf(":");
    if (colonIdx !== -1) {
      const titlePart = text.substring(0, colonIdx);
      const descPart = text.substring(colonIdx + 1);
      return (
        <>
          <span className="font-bold text-slate-900">{titlePart}:</span>
          {descPart}
        </>
      );
    }
    return text;
  };

  // Render Slider Layout (Image 2 and 3 style)
  if (isSlider) {
    return (
      <section
        id="approvals"
        className="w-full py-10 sm:py-14 border-b border-slate-200/60 overflow-hidden"
        style={{ backgroundColor: gridBg }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Header Title & Subtitle */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#111827] tracking-tight m-0">
              {activeUniversity}{" "}
              <span style={{ color: primaryColor }}>{activeTitle}</span>
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-[14px] text-slate-600 max-w-3xl mx-auto mt-2.5 leading-relaxed font-normal">
                {subtitle}
              </p>
            )}
          </div>

          {/* Carousel Slider */}
          <div className="relative group/carousel px-4 sm:px-8">
            {/* Left Arrow Button - Clean chevron without background circle */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-0 sm:-left-3 top-[32%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#f35a06] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
              aria-label="Previous approval"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
            </button>

            {/* Right Arrow Button - Clean chevron without background circle */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 sm:-right-3 top-[32%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#f35a06] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
              aria-label="Next approval"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
            </button>

            {/* Slider Viewport */}
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                  transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 px-2 sm:px-4 py-2"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <div className="flex flex-col items-center text-center h-full group">
                      {/* Logo Badge (The webp image itself is already a circular badge with orange border & soft shadow) */}
                      <div className="relative w-[140px] h-[140px] sm:w-[155px] sm:h-[155px] md:w-[170px] md:h-[170px] shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={item.image}
                          alt={item.text || "Recognition approval"}
                          fill
                          className="object-contain"
                          sizes="180px"
                        />
                      </div>

                      {/* Approval Description */}
                      <div className="mt-3 sm:mt-4 max-w-[240px]">
                        {showTags && item.tag && (
                          <span
                            className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5"
                            style={{
                              backgroundColor: `${primaryColor}15`,
                              color: primaryColor,
                            }}
                          >
                            {item.tag}
                          </span>
                        )}
                        <p className="text-[11.5px] sm:text-[12.5px] leading-snug text-slate-800 font-normal m-0 text-center">
                          {formatApprovalText(item.text)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Classic Fallback Grid Layout
  const activeBannerBg = bannerBg || brand?.approvalsBannerBg || brand?.accentColor || "#ffd200";
  const headerTextColor = brand?.approvalsHeaderColor || brand?.primaryColor || "#08417b";

  return (
    <section id="approvals" className="w-full">
      {/* 1. Full-Width Header Banner */}
      <div
        className="w-full py-2.5 sm:py-3.5 px-4 text-center select-none shadow-xs"
        style={{ backgroundColor: activeBannerBg }}
      >
        <h3
          className="m-0 text-[14px] sm:text-[17px] md:text-[20px] font-bold tracking-tight leading-tight"
          style={{ color: headerTextColor }}
        >
          {activeUniversity}
        </h3>
        <h2
          className="m-0 mt-0.5 text-[18px] sm:text-[22px] md:text-[26px] font-extrabold tracking-tight leading-tight"
          style={{ color: headerTextColor }}
        >
          {activeTitle}
        </h2>
      </div>

      {/* 2. Approvals Grid */}
      <div
        className="py-6 sm:py-10 border-b border-slate-200/50"
        style={{ backgroundColor: gridBg }}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 items-center">
            {approvals.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 sm:gap-3.5 bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-lg sm:rounded-none border border-amber-100 sm:border-none shadow-xs sm:shadow-none group"
              >
                <div className="relative w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] lg:w-[88px] lg:h-[88px] shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.text || "Recognition approval"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 64px, 88px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {showTags && item.tag && (
                    <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mb-1">
                      {item.tag}
                    </span>
                  )}
                  <p className="text-[12px] sm:text-[13px] leading-snug text-[#333333] font-medium m-0">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

