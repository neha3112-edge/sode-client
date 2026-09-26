"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Download, ChevronLeft, ChevronRight, Clock, Hourglass } from "lucide-react";
import { FaDownload } from "react-icons/fa";

/**
 * Reusable Landing Programmes Section
 * Supports:
 * 1. VGU Static 4-Column Grid Layout (vgu-cards / vgu-grid)
 * 2. Shoolini Static 3-Column Grid Layout (grid)
 * 3. Clean Card Carousel (Manipal - 3 cards visible, course code, title, logo, brochure button)
 * 4. SMU Card Carousel (3 cards visible, image, title, description, dual action buttons)
 * 5. Classic Amity Carousel (4 cards visible, level badge, duration hourglass, brochure button)
 */
export default function LandingProgrammes({
  programmes = [],
  universityName = "University Online",
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

  const isGrid = brand.programmesLayout === "grid";

  // ==========================================
  // Layout 1: VGU Static 4-Column Grid
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
                      <span className="absolute top-2.5 right-2.5 bg-black/95 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-[4px] shadow-sm select-none">
                        {durationText}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 text-center flex flex-col items-center">
                      <h3 className="text-[26px] sm:text-[28px] font-extrabold text-[#811811] m-0 tracking-tight leading-tight">
                        {c.code || c.id?.toUpperCase() || c.title}
                      </h3>
                      <p className="text-[12px] sm:text-[12.5px] font-semibold text-slate-800 mt-1 mb-2.5 line-clamp-1">
                        {c.title}
                      </p>
                      <p className="text-[11px] sm:text-[11.5px] text-slate-600 leading-[1.55] line-clamp-4 min-h-[66px] m-0">
                        {c.description}
                      </p>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
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

  // ==========================================
  // Layout 2: Shoolini Static 3-Column Grid
  // ==========================================
  if (isGrid) {
    return (
      <section id="program" className="py-6 sm:py-8 bg-white select-none">
        <div className="max-w-[980px] mx-auto px-4 sm:px-5">
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-center text-[#000000] mb-5 sm:mb-6 tracking-tight">
            {brand.programmesTitle || `${universityName} Courses`}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {programmes.map((c, idx) => (
              <div
                key={c.id || c.code || idx}
                className="bg-[#f7f7f7] rounded-[5px] overflow-hidden shadow-[0_0_5px_2px_#e8e8e8] flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[2.4/1] overflow-hidden rounded-t-[5px] bg-[#f7f7f7]">
                    <Image
                      src={c.image || "/assets/shoolini/mba-shoolini.webp"}
                      alt={c.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                    />
                  </div>

                  <div className="p-3 sm:p-3.5">
                    <h3 className="text-[13.5px] sm:text-[14px] font-semibold text-[#4d4d4d] m-0 mb-1 leading-snug">
                      {c.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-[#4d4d4d] font-normal mb-1.5">
                      <Clock className="w-3 h-3 text-[#4d4d4d] shrink-0" />
                      <span>{c.duration || "24 Months"}</span>
                    </div>

                    <p className="text-[11px] sm:text-[11.5px] text-[#4d4d4d] leading-[1.35] m-0 font-normal">
                      {c.description}
                    </p>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 pt-0 grid grid-cols-2 gap-1.5 mt-auto">
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(c.code || c.title)}
                    className="py-1.5 px-1.5 rounded-[4px] text-white font-medium text-[11px] sm:text-[11.5px] flex items-center justify-center gap-1 cursor-pointer transition-all hover:opacity-95 shadow-xs border-none active:scale-95 whitespace-nowrap"
                    style={{
                      background: brand.themeGradient || "linear-gradient(to right, #fd202a, #ff4be5)",
                    }}
                  >
                    <span>Apply now</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                    className="py-1.5 px-1 rounded-[4px] text-[#fd202a] font-medium text-[10.5px] sm:text-[11px] flex items-center justify-center gap-0.5 cursor-pointer transition-all hover:bg-red-50 shadow-xs border border-[#fd202a] active:scale-95 whitespace-nowrap"
                    style={{
                      background: "transparent",
                      color: "#fd202a",
                      borderColor: "#fd202a",
                    }}
                  >
                    <span>Download Brochure</span>
                    <Download className="w-2.5 h-2.5 stroke-[2.2] shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Layout 3, 4, 5: Interactive Carousel Sliders
  // ==========================================
  const isSmuLayout =
    brand.programmesLayout === "smu-cards" || brand.slug === "smu";

  const isCleanCard =
    brand.programmesCardStyle === "clean" ||
    brand.programmesCardStyle === "card" ||
    Boolean(brand.programmesPrefix);

  const defaultVisible = isCleanCard || isSmuLayout ? 3 : 4;

  const total = programmes.length;
  const [currentIndex, setCurrentIndex] = useState(total > 0 ? total : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(defaultVisible);
  const timerRef = useRef(null);

  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const rawUni = universityName || brand.name || "University Online";
  const displayUniversity = rawUni.replace(/\s+Online$/i, "").trim() || rawUni;
  const sectionBg =
    brand.programmesBg ||
    (isCleanCard
      ? "#f5ede7"
      : isSmuLayout
      ? undefined
      : brand.primaryColor || "#08417b");
  const sectionTitle =
    brand.programmesTitle ||
    `Programs offered by ${brand.name || "Sikkim Manipal University Online"}`;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(isCleanCard || isSmuLayout ? 3 : 4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCleanCard, isSmuLayout]);

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
          : "py-6 sm:py-8 lg:py-10 overflow-hidden relative select-none transition-colors w-full"
      }
      style={
        isSmuLayout
          ? {
              background:
                "linear-gradient(to bottom, #ffffff 0%, #ffffff 56%, #efefef 56%, #efefef 100%)",
            }
          : { backgroundColor: sectionBg }
      }
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Section Heading */}
      <div className="text-center mb-5 sm:mb-6 px-4 max-w-4xl mx-auto">
        {isCleanCard ? (
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold m-0 tracking-tight leading-tight">
            <span className="text-[#ee3024]">{brand.programmesPrefix || "Programs Offered by "}</span>
            <span className="text-[#192f59]">{brand.programmesHighlight || displayUniversity}</span>
          </h2>
        ) : isSmuLayout ? (
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#212529] m-0 tracking-tight leading-tight">
            {sectionTitle}
          </h2>
        ) : (
          <div>
            <h3
              className="text-xl sm:text-2xl lg:text-[28px] font-bold m-0 tracking-tight leading-tight"
              style={{ color: brand.primaryColor || "#f35a06" }}
            >
              {displayUniversity}
            </h3>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold mt-1 m-0 tracking-tight leading-tight text-white">
              {title}
            </h2>
          </div>
        )}
      </div>

      {/* Carousel Container */}
      <div
        className={`w-full mx-auto px-4 relative ${
          isCleanCard
            ? "max-w-[1140px] px-3 sm:px-6"
            : isSmuLayout
            ? "max-w-[1200px] xl:max-w-[1240px] px-6 sm:px-10 lg:px-12"
            : "max-w-[1240px] xl:max-w-[1360px] sm:px-8 lg:px-10"
        }`}
      >
        {/* Navigation Chevrons */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous programme"
          className="absolute -left-2 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-20 text-[#222222] hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next programme"
          className="absolute -right-2 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 text-[#222222] hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
        </button>

        {/* Viewport */}
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
            {extendedList.map((c, idx) => {
              if (isCleanCard) {
                return (
                  <div
                    key={`${c.id || c.code}-${idx}`}
                    className="shrink-0 px-2 sm:px-2.5 lg:px-3 box-border"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <div className={brand.programmeCardClass || "bg-white rounded-[5px] shadow-[0px_3px_15px_rgba(0,0,0,0.13)] py-4 sm:py-5 px-5 sm:px-[22px] flex flex-col justify-between h-full min-h-[350px] sm:min-h-[360px] text-left"}>
                      <div>
                        <h3 className="text-[26px] sm:text-[28px] font-bold text-[#000000] m-0 tracking-tight leading-none">
                          {c.code || c.id?.toUpperCase()}
                        </h3>

                        <h4 className="text-[17.5px] sm:text-[18.5px] font-semibold text-[#222222] mt-1.5 mb-1.5 leading-[1.2] min-h-[42px] flex items-start">
                          {c.title}
                        </h4>

                        <p className="text-[12.5px] sm:text-[13px] text-[#333333] leading-[1.5] font-normal m-0">
                          {c.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-0.5">
                        <div className="relative w-28 sm:w-[114px] h-7 sm:h-[28px] mb-2">
                          <Image
                            src={brand.manipalLogo || c.logo || "/assets/manipal_v1_images/manipal-logo.webp"}
                            alt="Online Manipal"
                            fill
                            className="object-contain object-left"
                            sizes="120px"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                          className="w-full py-2 sm:py-2.5 px-4 rounded-[5px] text-white font-medium text-[13px] sm:text-[13.5px] flex items-center justify-center gap-2 border-none cursor-pointer transition-opacity hover:opacity-95 shadow-xs"
                          style={{
                            background:
                              brand.programmeBtnBg ||
                              "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
                          }}
                        >
                          <span>Download Brochure</span>
                          <Download className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

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
                    <div className="bg-white rounded-[8px] sm:rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0px_8px_28px_rgba(0,0,0,0.12)] transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between h-full group text-left">
                      <div>
                        <div className="relative h-44 sm:h-48 md:h-[185px] w-full rounded-[6px] overflow-hidden mb-3.5 bg-slate-100">
                          <Image
                            src={c.image || "/assets/images/smu_mba.jpg"}
                            alt={c.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>

                        <h3
                          className="text-[17px] sm:text-[18px] font-bold m-0 tracking-tight leading-snug"
                          style={{ color: brand.primaryColor || "#074a76" }}
                        >
                          {c.title}
                        </h3>

                        <p className="text-[12px] sm:text-[12.5px] text-[#4b5563] leading-[1.55] mt-2 sm:mt-2.5 mb-2 line-clamp-4 min-h-[58px] sm:min-h-[60px] m-0">
                          {c.description}
                        </p>
                      </div>

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

              // Classic Card Style (Amity, etc.)
              return (
                <div
                  key={`${c.id || c.code}-${idx}`}
                  className="shrink-0 px-1.5 sm:px-2 xl:px-2.5 box-border"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="bg-white rounded-[8px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group text-left border border-slate-200/80">
                    <div>
                      <div className="relative h-44 sm:h-44 xl:h-48 w-full bg-slate-100 overflow-hidden">
                        <Image
                          src={c.image || "/assets/amitylp/MBA-amity.png"}
                          alt={c.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute top-0 left-0 bg-[#009900] text-white text-[11px] sm:text-[11.5px] font-semibold px-2.5 sm:px-3 py-1 rounded-br-[4px] tracking-wide select-none shadow-xs">
                          {levelText}
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 pb-2">
                        <h3
                          className="text-[20px] sm:text-[22px] xl:text-[24px] font-bold m-0 leading-tight tracking-tight"
                          style={{ color: brand.primaryColor || "#08417b" }}
                        >
                          {c.code || c.id?.toUpperCase() || c.title}
                        </h3>
                        <p
                          className="text-[12.5px] sm:text-[13px] font-semibold mt-1 mb-1.5 line-clamp-1"
                          style={{ color: brand.primaryColor || "#08417b" }}
                        >
                          {c.title}
                        </p>
                        <p className="text-[11.5px] sm:text-[12px] text-[#444444] leading-[1.5] line-clamp-3 sm:line-clamp-4 min-h-[54px] sm:min-h-[72px] m-0">
                          {c.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-3.5 sm:px-4 pt-2 pb-3.5 flex items-center justify-between border-t border-slate-100 mt-1">
                      <button
                        type="button"
                        onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                        className="active:scale-95 font-bold text-[11.5px] sm:text-[12px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-[4px] inline-flex items-center gap-1.5 border-none cursor-pointer transition-all shadow-xs shrink-0"
                        style={{
                          background: brand.programmeBtnBg || "#ffd200",
                          color: brand.programmeBtnText || "#000000",
                        }}
                      >
                        <span>Download Brochure</span>
                        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>

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
      </div>
    </section>
  );
}
