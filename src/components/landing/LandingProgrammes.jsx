"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Download, ChevronLeft, ChevronRight, Hourglass } from "lucide-react";
import { FaDownload } from "react-icons/fa";

/**
 * Reusable Landing Programmes Section
 */
export default function LandingProgrammes({
  programmes = [],
  universityName = "Amity University",
  brand = {},
  title = "Online Degree Courses",
  intervalTime = 3500,
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const isVguGrid =
    brand.programmesLayout === "vgu-cards" ||
    brand.programmesLayout === "vgu-grid" ||
    (brand.slug === "vgu" && brand.programmesLayout !== "carousel");

  const isSmuLayout =
    brand.programmesLayout === "smu-cards" || brand.slug === "smu";

  // ==========================================
  // Layout 1: VGU Static 4-Column Grid (Matches VGU screenshot 100%)
  // ==========================================
  if (isVguGrid) {
    const heading =
      brand.programmesTitle ||
      "VGU Online | Vivekananda Global University Online Courses";

    return (
      <section id="program" className="w-full py-12 sm:py-16 bg-[#f7f9fa] border-b border-slate-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#203061] tracking-tight mb-8 sm:mb-12">
            {heading}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7">
            {programmes.map((c, idx) => {
              const isPostGrad =
                c.level?.toLowerCase().includes("post") ||
                c.title?.toLowerCase().includes("master") ||
                c.code?.toLowerCase().startsWith("m");
              const durationText =
                c.duration || (isPostGrad ? "24 Months" : "36 Months");

              return (
                <div
                  key={`${c.id || c.code}-${idx}`}
                  className="bg-white rounded-[14px] overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.16)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Image with Black Duration Badge */}
                    <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={c.image || "/assets/vgu/mba-vgu.webp"}
                        alt={c.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Black duration badge top right */}
                      <span className="absolute top-2.5 right-2.5 bg-black/95 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-[4px] shadow-sm select-none">
                        {durationText}
                      </span>
                    </div>

                    {/* Card Content (Centered) */}
                    <div className="p-4 sm:p-5 text-center flex flex-col items-center">
                      {/* Course Code (e.g. MBA, MCA) */}
                      <h3 className="text-[26px] sm:text-[28px] font-extrabold text-[#811811] m-0 tracking-tight leading-tight">
                        {c.code || c.id?.toUpperCase() || c.title}
                      </h3>

                      {/* Full Course Name */}
                      <p className="text-[12px] sm:text-[12.5px] font-semibold text-slate-800 mt-1 mb-2.5 line-clamp-1">
                        {c.title}
                      </p>

                      {/* Description */}
                      <p className="text-[11px] sm:text-[11.5px] text-slate-600 leading-[1.55] line-clamp-4 min-h-[66px] m-0">
                        {c.description}
                      </p>
                    </div>
                  </div>

                  {/* Dual Action Buttons (Green Get Brochure & Maroon Apply Now) */}
                  <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectCourseForBrochure?.(c.code || c.title)
                      }
                      className="bg-[#008000] hover:bg-[#006e00] active:scale-95 text-white font-bold text-[11.5px] sm:text-[12px] py-2 px-2 rounded-full inline-flex items-center justify-center gap-1 shadow-xs transition-all cursor-pointer border-none"
                    >
                      <span>Get Brochure</span>
                      <Download className="w-3 h-3 stroke-[2.5]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenApply?.(c.code || c.title)}
                      className="bg-[#811811] hover:bg-[#6b130e] active:scale-95 text-white font-bold text-[11.5px] sm:text-[12px] py-2 px-2 rounded-full inline-flex items-center justify-center shadow-xs transition-all cursor-pointer border-none"
                    >
                      <span>Apply Now</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const total = programmes.length;
  const [currentIndex, setCurrentIndex] = useState(total > 0 ? total : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(isSmuLayout ? 3 : 4);
  const timerRef = useRef(null);

  // Touch swipe state
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const rawUni = universityName || brand.name || "Amity University";
  const displayUniversity = rawUni.replace(/\s+Online$/i, "").trim() || rawUni;
  const primaryBg = brand.hero?.formBackground || brand.primaryColor || "#08417b";
  const sectionTitle =
    brand.programmesTitle ||
    `Programs offered by ${brand.name || "Sikkim Manipal University Online"}`;

  // Responsive visible cards count
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(isSmuLayout ? 3 : 4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSmuLayout]);

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

    const delay = isSmuLayout ? 7500 : intervalTime;
    timerRef.current = setInterval(() => {
      setWithTransition(true);
      setCurrentIndex((prev) => {
        if (prev >= total * 2) {
          return total + 1;
        }
        return prev + 1;
      });
    }, delay);

    return () => clearInterval(timerRef.current);
  }, [isPaused, total, intervalTime, isSmuLayout]);

  if (!programmes || programmes.length === 0) return null;

  return (
    <section
      id={isSmuLayout ? "programs" : "programmes"}
      className={
        isSmuLayout
          ? "w-full pt-10 pb-12 sm:pt-12 sm:pb-14 text-slate-900 overflow-hidden relative select-none"
          : "py-10 sm:py-14 lg:py-16 text-white overflow-hidden relative select-none transition-colors w-full"
      }
      style={
        isSmuLayout
          ? {
              background:
                "linear-gradient(to bottom, #ffffff 0%, #ffffff 56%, #efefef 56%, #efefef 100%)",
            }
          : { backgroundColor: primaryBg }
      }
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Section Heading */}
      <div
        className={
          isSmuLayout
            ? "text-center mb-7 sm:mb-9 lg:mb-10 px-4 max-w-4xl mx-auto"
            : "text-center mb-6 sm:mb-8 lg:mb-10 px-4 max-w-4xl mx-auto"
        }
      >
        {isSmuLayout ? (
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#212529] m-0 tracking-tight leading-tight">
            {sectionTitle}
          </h2>
        ) : (
          <>
            <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white m-0 tracking-tight leading-tight">
              {displayUniversity}
            </h3>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-white mt-1 m-0 tracking-tight leading-tight">
              {title}
            </h2>
          </>
        )}
      </div>

      {/* Carousel Container */}
      <div
        className={
          isSmuLayout
            ? "w-full max-w-[1200px] xl:max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 relative"
            : "w-full max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 relative"
        }
      >
        {/* Left Chevron Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous programme"
          className={
            isSmuLayout
              ? "absolute -left-1 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 text-[#212529] hover:text-black transition-all cursor-pointer p-2 border-none bg-transparent flex items-center justify-center active:scale-90"
              : "hidden sm:flex absolute -left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center border-none cursor-pointer active:scale-95 transition-all"
          }
        >
          <ChevronLeft className={isSmuLayout ? "w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" : "w-5 h-5"} />
        </button>

        {/* Slider Track */}
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

              if (isSmuLayout) {
                return (
                  <div
                    key={`${c.id || c.code}-${idx}`}
                    className="shrink-0 px-2.5 sm:px-3 box-border"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    {/* SMU Course Card */}
                    <div className="bg-white rounded-[8px] sm:rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0px_8px_28px_rgba(0,0,0,0.12)] transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between h-full group text-left">
                      <div>
                        {/* Top Image */}
                        <div className="relative h-44 sm:h-48 md:h-[185px] w-full rounded-[6px] overflow-hidden mb-3.5 bg-slate-100">
                          <Image
                            src={c.image || "/assets/images/smu_mba.jpg"}
                            alt={c.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>

                        {/* Course Title */}
                        <h3
                          className="text-[17px] sm:text-[18px] font-bold m-0 tracking-tight leading-snug"
                          style={{ color: brand.primaryColor || "#074a76" }}
                        >
                          {c.title}
                        </h3>

                        {/* Course Description */}
                        <p className="text-[12px] sm:text-[12.5px] text-[#4b5563] leading-[1.55] mt-2 sm:mt-2.5 mb-2 line-clamp-4 min-h-[58px] sm:min-h-[60px] m-0">
                          {c.description}
                        </p>
                      </div>

                      {/* Dual Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-4 sm:mt-5">
                        <button
                          type="button"
                          onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                          className="active:scale-95 text-white font-semibold text-[13px] sm:text-[13.5px] py-2.5 px-2 rounded-[5px] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer border-none"
                          style={{
                            backgroundColor:
                              brand.slug === "vgu"
                                ? "#008000"
                                : brand.hero?.buttonBackground || "#f78d2d",
                          }}
                        >
                          <span>Get Brochure</span>
                          <FaDownload className="w-3 h-3 text-white shrink-0" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenApply?.(c.code || c.title)}
                          className="active:scale-95 text-white font-semibold text-[13px] sm:text-[13.5px] py-2.5 px-2 rounded-[5px] flex items-center justify-center transition-all shadow-xs cursor-pointer border-none"
                          style={{
                            backgroundColor: brand.primaryColor || "#074a76",
                          }}
                        >
                          <span>Apply Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={`${c.id || c.code}-${idx}`}
                  className="shrink-0 px-1.5 sm:px-2 xl:px-2.5 box-border"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  {/* Classic Course Card (Amity, etc.) */}
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

        {/* Right Chevron Arrow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next programme"
          className={
            isSmuLayout
              ? "absolute -right-1 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 text-[#212529] hover:text-black transition-all cursor-pointer p-2 border-none bg-transparent flex items-center justify-center active:scale-90"
              : "hidden sm:flex absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center border-none cursor-pointer active:scale-95 transition-all"
          }
        >
          <ChevronRight className={isSmuLayout ? "w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" : "w-5 h-5"} />
        </button>

        {/* Mobile Navigation Controls for Classic view */}
        {!isSmuLayout && (
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
        )}
      </div>
    </section>
  );
}
