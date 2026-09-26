"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable Landing Approvals Section
 * Supports:
 * 1. Shoolini Split Layout (dark left box + soft gradient 2x3 grid)
 * 2. VGU 2-Column Badges Layout (left text & Enquire button + right 2x2 pill badges)
 * 3. Modern Interactive Carousel/Slider (SMU, Manipal, etc. with smooth infinite loop & arrows)
 * 4. Classic Banner Grid (Amity, etc.)
 */
export default function LandingApprovals({
  approvals = [],
  universityName,
  brand = {},
  title = "Recognition and Approvals",
  bannerBg,
  showTags = false,
}) {
  if (!approvals || approvals.length === 0) return null;

  const activeUniversity = universityName || brand?.name || "University Online";
  const activeTitle = brand?.approvalsTitle || title;
  const subtitle = brand?.approvalsSubtitle || brand?.approvalsDescription || null;
  const isSplit = brand?.approvalsLayout === "split";
  const isVguLayout = brand?.approvalsLayout === "vgu-badges" || brand?.slug === "vgu";
  const isCarouselLayout = brand?.approvalsLayout === "smu-carousel" || brand?.slug === "smu";
  const isSlider =
    brand?.approvalsLayout === "slider" ||
    isCarouselLayout ||
    (!isSplit && !isVguLayout && Boolean(subtitle));

  const primaryColor = brand?.approvalsHeaderColor || brand?.primaryColor || "#ee3024";
  const gridBg = brand?.approvalsBg || "#ffffff";

  // ==========================================
  // Layout 1: Shoolini Split Layout
  // ==========================================
  if (isSplit) {
    return (
      <section id="approval" className="w-full select-none p-0 overflow-hidden bg-[#010d2a]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Dark Box matching #approval-box1 */}
          <div className="lg:col-span-5 bg-[#010d2a] text-white flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:pl-20 py-8 sm:py-12">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight m-0 mb-3 text-white">
              <span
                className="font-extrabold inline"
                style={{
                  background: brand?.themeGradient || "linear-gradient(to right, #fd202a, #ff4be5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {activeUniversity}{" "}
              </span>
              <span className="text-white font-bold">Recognitions & Accreditations</span>
            </h2>
            {subtitle && (
              <p className="text-[13px] sm:text-[14px] text-[#ecf0f1] font-normal leading-relaxed m-0">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Gradient Grid matching #approval-box2 */}
          <div
            className="lg:col-span-7 p-6 sm:p-8 lg:p-10 xl:pr-16 flex items-center"
            style={{
              background: "linear-gradient(to right, #fce8e8 0%, #fdf3f3 40%, #ffffff 100%)",
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 w-full">
              {approvals.map((item, idx) => (
                <div key={idx} className="flex flex-col items-start text-left">
                  <div className="relative w-24 sm:w-28 h-12 sm:h-14 mb-2">
                    <Image
                      src={item.image}
                      alt={item.tag || item.title || "approval"}
                      fill
                      className="object-contain object-left"
                      sizes="120px"
                    />
                  </div>
                  <div className="text-[13px] sm:text-[13.5px] leading-tight">
                    <span className="font-extrabold text-[#fd202a] block">
                      {item.tag || item.title}
                    </span>
                    <span className="font-bold text-[#000000] block mt-0.5">
                      {item.subtext || item.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 2: VGU 2-Column Badges Layout
  // ==========================================
  if (isVguLayout) {
    const sectionTitle =
      brand.approvalsTitle ||
      `${brand.name || "Vivekananda Global University"} Online Accreditation & Approval`;
    const sectionDescription =
      brand.approvalsDescription ||
      "Vivekananda Global University Online Courses are UGC-recognised and have top accreditations and approvals from the country's recognised statutory bodies.";

    return (
      <section id="approvals" className="w-full py-10 sm:py-14 bg-white border-b border-slate-200">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Title, Description, Enquire Button */}
            <div className="lg:col-span-4 text-center sm:text-left">
              <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-extrabold text-[#811811] leading-tight tracking-tight m-0">
                {sectionTitle}
              </h2>
              <p className="mt-3.5 mb-6 text-[12.5px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal">
                {sectionDescription}
              </p>
              <button
                type="button"
                onClick={() => {
                  const heroEl = document.getElementById("hero") || document.getElementById("banner");
                  if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#ffc107] hover:bg-[#e0a800] text-slate-950 font-bold text-[13.5px] sm:text-[14px] px-6 py-2.5 rounded-[6px] shadow-xs active:scale-95 transition-all cursor-pointer border-none"
              >
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Right Column: 2x2 Grid of Pill Badge Cards */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {approvals.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 px-4 py-3 bg-white rounded-[32px] border border-slate-700/60 shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.text || "Approval"}
                        fill
                        className="object-contain"
                        sizes="56px"
                      />
                    </div>
                    <p className="text-[12px] sm:text-[12.5px] font-semibold text-slate-800 leading-snug m-0">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 3: Modern Carousel Slider (SMU, Manipal, etc.)
  // ==========================================
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const items = approvals;
  const extendedItems = [...items, ...items, ...items];
  const [currentIndex, setCurrentIndex] = useState(items.length);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  useEffect(() => {
    if (!isSlider || isPaused || items.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 2500);

    return () => clearInterval(timer);
  }, [isSlider, isPaused, items.length, handleNext]);

  const handleTransitionEnd = () => {
    if (currentIndex >= items.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - items.length);
    } else if (currentIndex < items.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + items.length);
    }
  };

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
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-0 sm:-left-3 top-[35%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#f35a06] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
              aria-label="Previous approval"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 sm:-right-3 top-[35%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#f35a06] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
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
                      <div className="relative w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] md:w-[165px] md:h-[165px] shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={item.image}
                          alt={item.text || "Recognition approval"}
                          fill
                          className="object-contain"
                          sizes="180px"
                        />
                      </div>

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
                        <p className="text-[12px] sm:text-[13px] leading-snug text-slate-800 font-normal m-0 text-center">
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

  // ==========================================
  // Layout 4: Classic Banner Grid (Amity, etc.)
  // ==========================================
  const activeBannerBg = bannerBg || brand?.approvalsBannerBg || brand?.accentColor || "#ffd200";
  const headerTextColor = brand?.approvalsHeaderColor || brand?.primaryColor || "#08417b";

  return (
    <section id="approvals" className="w-full">
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
