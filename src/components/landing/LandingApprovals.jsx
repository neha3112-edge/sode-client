"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable Landing Approvals Section
 * Supports:
 * 1. SMU Modern Rankings & Accreditations Carousel (clean light grey background, centered description, arrows, 4-column carousel).
 * 2. Classic Banner Grid (full-width yellow banner header, cream background grid).
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

  const isCarouselLayout =
    brand.approvalsLayout === "smu-carousel" || brand.slug === "smu";

  const total = approvals.length;
  const [currentIndex, setCurrentIndex] = useState(total > 0 ? total : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const timerRef = useRef(null);

  // Responsive visible cards count: 1 on mobile, 2 on tablet, 4 on desktop
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
          ...approvals,
          ...approvals,
          ...approvals,
          ...approvals,
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

  // Auto-play timer for carousel
  useEffect(() => {
    if (!isCarouselLayout || isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      setWithTransition(true);
      setCurrentIndex((prev) => {
        if (prev >= total * 2) {
          return total + 1;
        }
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(timerRef.current);
  }, [isCarouselLayout, isPaused, total]);

  // ==========================================
  // Layout 1: VGU 2-Column Badges Layout (matches VGU live page & screenshot)
  // ==========================================
  const isVguLayout =
    brand.approvalsLayout === "vgu-badges" || brand.slug === "vgu";

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
                  const heroEl = document.getElementById("hero");
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
  // Layout 2: SMU Clean Rankings & Accreditations Carousel
  // ==========================================
  if (isCarouselLayout) {
    const sectionTitle =
      brand.approvalsTitle ||
      `${brand.name || "Sikkim Manipal University"} Online Rankings & Accreditations`;
    const sectionDescription =
      brand.approvalsDescription ||
      "Sikkim Manipal University is one of the top ranked university in India. The university is UGC-DEB recognised and is accredited by leading national accreditation bodies. It is an advanced online learning platform. SMU Online delivers industry-aligned programs which hold academic excellence. Sikkim Manipal University online courses are the most preferred choice for learners. They offer flexibility, credibility and high-quality higher education.";

    return (
      <section
        id="approvals"
        className="w-full py-10 sm:py-14 lg:py-16 bg-[#f8f9fa] border-b border-slate-200/80 select-none overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-[#111827] tracking-tight leading-tight m-0">
              {sectionTitle}
            </h2>
            <p className="mt-3.5 mb-0 text-[13px] sm:text-[14px] text-slate-600 leading-relaxed font-normal">
              {sectionDescription}
            </p>
          </div>

          {/* Carousel Slider */}
          <div className="relative px-6 sm:px-10">
            {/* Left Navigation Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Accreditation"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-xs border border-slate-200 transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Slider Track */}
            <div className="w-full overflow-hidden">
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
                {extendedList.map((item, idx) => (
                  <div
                    key={`${item.tag || item.text}-${idx}`}
                    className="shrink-0 px-3 sm:px-4 box-border"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <div className="flex flex-col items-center justify-start text-center h-full group p-2">
                      {/* Logo Image */}
                      <div className="relative w-full h-[95px] sm:h-[110px] flex items-center justify-center mb-3">
                        <Image
                          src={item.image}
                          alt={item.text || "Accreditation"}
                          fill
                          className="object-contain transition-transform duration-200 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>

                      {/* Description Text */}
                      <p className="text-[13px] sm:text-[14px] text-slate-700 font-medium leading-snug m-0 max-w-[240px]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Navigation Arrow */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Accreditation"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-xs border border-slate-200 transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 2: Classic Banner Grid (Amity, etc.)
  // ==========================================
  const activeUniversity = universityName || brand?.name || "Amity University Online";
  const activeBannerBg = bannerBg || brand?.accentColor || "#ffd200";

  return (
    <section id="approvals" className="w-full">
      {/* 1. Full-Width Header Banner */}
      <div
        className="w-full py-2.5 sm:py-3.5 px-4 text-center select-none shadow-xs"
        style={{ backgroundColor: activeBannerBg }}
      >
        <h3 className="m-0 text-[14px] sm:text-[17px] md:text-[20px] font-bold text-[#08417b] tracking-tight leading-tight">
          {activeUniversity}
        </h3>
        <h2 className="m-0 mt-0.5 text-[18px] sm:text-[22px] md:text-[26px] font-extrabold text-[#08417b] tracking-tight leading-tight">
          {title}
        </h2>
      </div>

      {/* 2. Approvals Grid on Light Cream Background */}
      <div className="py-6 sm:py-10 bg-[#fffde8] border-b border-amber-200/50">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 items-center">
            {approvals.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 sm:gap-3.5 bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-lg sm:rounded-none border border-amber-100 sm:border-none shadow-xs sm:shadow-none group"
              >
                {/* Logo Image */}
                <div className="relative w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] lg:w-[88px] lg:h-[88px] shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.text || "Recognition approval"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 64px, 88px"
                  />
                </div>

                {/* Description Text */}
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
