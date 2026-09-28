"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Landing Why Choose / Key Features Component
 * Supports:
 * 1. VGU Centered Maroon Badge & 3x2 Icon Grid (vgu-grid / vgu)
 * 2. Shoolini Checkerboard Grid (checkerboard)
 * 3. SMU 3-Card Carousel with elevated center card (smu-advantages / smu)
 * 4. Manipal Key Features Slider (slider)
 * 5. Classic 2-Column Grid with Student Photo (Amity, etc.)
 */
export default function LandingWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const isLpuLayout = brand.whyChooseLayout === "lpu" || brand.slug === "lpu";

  // ==========================================
  // Layout 0: LPU Learning Pedagogy & Placement Support Services
  // ==========================================
  if (isLpuLayout) {
    return (
      <>
        {/* 1. Learning Pedagogy at LPU Online */}
        <section id="pedagogy" className="py-12 sm:py-16 bg-white border-b border-slate-100">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-900 tracking-tight leading-tight m-0">
                Learning Pedagogy at LPU Online
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-600 mt-2.5 leading-relaxed font-normal m-0 max-w-3xl mx-auto">
                The learning model at Lovely Professional University Online (LPU Online) is tailored to offer flexibility and an engaging experience to all the students who are enrolled in programs such as LPU MBA Online, LPU MCA Online, and LPU Online BCA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Live Lectures */}
              <div className="bg-white rounded-[8px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-200/80 border-b-4 border-b-[#f58220] flex flex-col items-start text-left space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0 relative flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#f58220]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#f58220] m-0">
                    Live Lectures
                  </h3>
                </div>
                <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed m-0 font-normal">
                  The university provides interactive live sessions that create a real-time virtual classroom. It benefits the students pursuing LPU MBA online and LPU MCA online to interact with faculty, clear their doubts instantly, and collaborate with peers.
                </p>
              </div>

              {/* Card 2: Recorded Videos */}
              <div className="bg-white rounded-[8px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-200/80 border-b-4 border-b-[#f58220] flex flex-col items-start text-left space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0 relative flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#f58220]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#f58220] m-0">
                    Recorded Videos
                  </h3>
                </div>
                <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed m-0 font-normal">
                  Learners get access to recorded lectures for flexible learning. This facility is ideal for working professionals pursuing LPU MBA Online or LPU BCA Online, as it enables them to revise anytime and anywhere.
                </p>
              </div>

              {/* Card 3: Assignments & Projects */}
              <div className="bg-white rounded-[8px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-200/80 border-b-4 border-b-[#f58220] flex flex-col items-start text-left space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0 relative flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#f58220]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#f58220] m-0">
                    Assignments & Projects
                  </h3>
                </div>
                <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed m-0 font-normal">
                  The LMS of LPU online includes digital assignment submission and project work. Students from LPU online MCA and LPU MBA online tracks monitor progress and gain practical exposure throughout the course.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Placement Support Services at LPU Online */}
        <section id="placement-services" className="py-12 sm:py-16 bg-[#f9f9f9] border-b border-slate-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-900 tracking-tight leading-tight m-0">
                Placement Support Services at LPU Online
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-600 mt-2.5 leading-relaxed font-normal m-0 max-w-3xl mx-auto">
                Lovely Professional University online admission also offers structured placement support to prepare students and professionals for real-world careers and job sectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#f58220] flex items-center justify-center text-white shadow-md">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 m-0">
                  Professional Enhancement Programme
                </h3>
                <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed m-0 font-normal max-w-md">
                  The Placement Enhancement Programme (PEP) trains students in aptitude, soft skills, and interview preparation. It is beneficial for LPU MBA online and LPU MCA online learners.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#f58220] flex items-center justify-center text-white shadow-md">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 m-0">
                  Mock Interviews & Workshops
                </h3>
                <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed m-0 font-normal max-w-md">
                  Mock interviews and industry-oriented online workshops are used to provide students of Lovely Professional University Online courses with communication skills, confidence, and real-life insights.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!whyChoose || whyChoose.length === 0) return null;

  const universityName = brand.name || "University Online";
  const studentImg = brand.whyChooseStudentImage || "/assets/amitylp/Why-choose-amity.png";
  const isVguLayout = brand.whyChooseLayout === "vgu-grid" || brand.slug === "vgu";
  const isCheckerboard = brand.whyChooseLayout === "checkerboard";
  const isSmuLayout = brand.whyChooseLayout === "smu-advantages" || brand.slug === "smu";
  const isSlider = brand.whyChooseLayout === "slider";

  // ==========================================
  // Layout 1: VGU Centered Badge & 3-Column Icons Grid
  // ==========================================
  if (isVguLayout) {
    return (
      <section id="Resources" className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <LandingContainer>
          <div className="flex justify-center mb-5">
            <div className="bg-[#811811] text-white px-7 sm:px-9 py-3 sm:py-3.5 rounded-[10px] text-center shadow-xs max-w-xl">
              <h2 className="text-[18px] sm:text-[21px] md:text-[22px] font-bold text-white tracking-tight leading-snug m-0">
                Why Vivekananda Global University Online is a<br className="hidden sm:inline" />
                {" "}Smart Choice for learners?
              </h2>
            </div>
          </div>

          {brand.whyChooseDescription && (
            <p className="text-center text-[12.5px] sm:text-[13.5px] text-slate-600 leading-relaxed max-w-4xl mx-auto mb-10 sm:mb-14 font-normal">
              {brand.whyChooseDescription}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-10 sm:gap-y-12 max-w-5xl mx-auto">
            {whyChoose.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group px-2">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-3.5 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    sizes="64px"
                  />
                </div>

                <h3 className="text-[16px] sm:text-[17px] font-bold text-slate-900 m-0 tracking-tight leading-snug mb-1.5">
                  {item.title}
                </h3>

                <p className="text-[12px] sm:text-[12.5px] text-slate-600 leading-relaxed font-normal m-0 max-w-[320px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </LandingContainer>
      </section>
    );
  }

  // ==========================================
  // Layout 2: Shoolini Checkerboard Grid
  // ==========================================
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

  // ==========================================
  // Layout 3: SMU 3-Card Carousel
  // ==========================================
  if (isSmuLayout) {
    return <SmuWhyChooseCarousel whyChoose={whyChoose} brand={brand} />;
  }

  // ==========================================
  // Layout 4 & 5: Slider or Classic 2-Column
  // ==========================================
  if (isSlider) {
    return <SliderWhyChoose whyChoose={whyChoose} brand={brand} />;
  }

  // Classic Fallback
  return (
    <section id="whychoose" className="py-8 sm:py-12 bg-white">
      <LandingContainer>
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
      </LandingContainer>
    </section>
  );
}

// Subcomponent: SMU Advantages Carousel
function SmuWhyChooseCarousel({ whyChoose, brand }) {
  const total = whyChoose.length;
  const [currentIndex, setCurrentIndex] = useState(total > 0 ? total : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const sectionTitle =
    brand.whyChooseTitle ||
    `Advantages of ${brand.name || "Sikkim Manipal University Online"}`;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const extendedList =
    total > 0
      ? [...whyChoose, ...whyChoose, ...whyChoose, ...whyChoose]
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

  useEffect(() => {
    if (isPaused || total <= 1) return;
    timerRef.current = setInterval(() => {
      setWithTransition(true);
      setCurrentIndex((prev) => (prev >= total * 2 ? total + 1 : prev + 1));
    }, 7000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, total]);

  return (
    <section
      id="whychoose"
      className="w-full py-10 sm:py-14 lg:py-16 bg-white overflow-hidden relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => {
        setIsPaused(true);
        touchStartXRef.current = e.targetTouches[0].clientX;
      }}
      onTouchMove={(e) => {
        touchEndXRef.current = e.targetTouches[0].clientX;
      }}
      onTouchEnd={() => {
        const deltaX = touchStartXRef.current - touchEndXRef.current;
        if (Math.abs(deltaX) > 40 && touchEndXRef.current !== 0) {
          if (deltaX > 0) handleNext();
          else handlePrev();
        }
        touchStartXRef.current = 0;
        touchEndXRef.current = 0;
        setTimeout(() => setIsPaused(false), 2000);
      }}
    >
      <div className="text-center mb-8 sm:mb-10 px-4 max-w-4xl mx-auto">
        <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#212529] m-0 tracking-tight leading-tight">
          {sectionTitle}
        </h2>
      </div>

      <div className="w-full max-w-[1140px] xl:max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 relative">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous advantage"
          className="absolute -left-1 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 text-[#212529] hover:text-black transition-all cursor-pointer p-2 border-none bg-transparent flex items-center justify-center active:scale-90"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
        </button>

        <div className="w-full overflow-hidden py-5">
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex items-center"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              transition: withTransition
                ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {extendedList.map((item, idx) => {
              const isCenter =
                visibleCount === 3
                  ? idx === currentIndex + 1
                  : visibleCount === 1
                  ? idx === currentIndex
                  : false;

              return (
                <div
                  key={`${item.title}-${idx}`}
                  className="shrink-0 px-2.5 sm:px-3 box-border transition-all duration-300"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div
                    className={`bg-white rounded-[8px] sm:rounded-[10px] overflow-hidden transition-all duration-300 flex flex-col text-center border border-slate-100 ${
                      isCenter
                        ? "shadow-[0px_10px_35px_rgba(0,0,0,0.14)] scale-[1.05] z-10"
                        : "shadow-[0px_4px_20px_rgba(0,0,0,0.07)] opacity-95 scale-[0.98] z-0"
                    }`}
                  >
                    <div
                      className={`relative w-full overflow-hidden bg-slate-100 transition-all duration-300 ${
                        isCenter
                          ? "h-48 sm:h-52 md:h-[210px]"
                          : "h-44 sm:h-48 md:h-[185px]"
                      }`}
                    >
                      <Image
                        src={item.image || "/assets/images/smu_advantage_legacy.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <div
                      className={`bg-[#074a76] text-white flex items-center justify-center transition-all duration-300 ${
                        isCenter ? "py-3.5 sm:py-4 px-3" : "py-3 px-3"
                      }`}
                    >
                      <h3
                        className={`font-bold text-white m-0 tracking-tight leading-snug ${
                          isCenter
                            ? "text-[16px] sm:text-[17px] lg:text-[18px]"
                            : "text-[15px] sm:text-[16px]"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div
                      className={`bg-white flex items-center justify-center transition-all duration-300 ${
                        isCenter ? "p-5 sm:p-6" : "p-4 sm:p-5"
                      }`}
                    >
                      <p className="text-[12.5px] sm:text-[13px] text-[#555555] leading-relaxed m-0 font-normal min-h-[58px] sm:min-h-[64px] flex items-center justify-center">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next advantage"
          className="absolute -right-1 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 text-[#212529] hover:text-black transition-all cursor-pointer p-2 border-none bg-transparent flex items-center justify-center active:scale-90"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
        </button>
      </div>
    </section>
  );
}

// Subcomponent: Manipal Key Features Slider
function SliderWhyChoose({ whyChoose, brand }) {
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
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(4);
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
    const timer = setInterval(() => {
      handleNext();
    }, 2500);
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
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
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
