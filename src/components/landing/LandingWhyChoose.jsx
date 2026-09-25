"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import LandingContainer from "./LandingContainer";

export default function LandingWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const isSmuLayout =
    brand.whyChooseLayout === "smu-advantages" || brand.slug === "smu";

  const universityName = brand.name || "Amity University Online";
  const sectionTitle =
    brand.whyChooseTitle ||
    (isSmuLayout
      ? `Advantages of ${brand.name || "Sikkim Manipal University Online"}`
      : `Why Choose ${universityName} for Degree Courses`);
  const studentImg = brand.whyChooseStudentImage || "/assets/amitylp/Why-choose-amity.png";

  const total = whyChoose.length;
  const [currentIndex, setCurrentIndex] = useState(total > 0 ? total : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const timerRef = useRef(null);

  // Touch swipe state
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Responsive visible cards count for SMU carousel
  useEffect(() => {
    if (!isSmuLayout) return;
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSmuLayout]);

  const extendedList =
    total > 0
      ? [
          ...whyChoose,
          ...whyChoose,
          ...whyChoose,
          ...whyChoose,
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

  // Auto-play timer for carousel
  useEffect(() => {
    if (!isSmuLayout || isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      setWithTransition(true);
      setCurrentIndex((prev) => {
        if (prev >= total * 2) {
          return total + 1;
        }
        return prev + 1;
      });
    }, 7000);

    return () => clearInterval(timerRef.current);
  }, [isSmuLayout, isPaused, total]);

  if (!whyChoose || whyChoose.length === 0) return null;

  return (
    <section
      id="whychoose"
      className={
        isSmuLayout
          ? "w-full py-10 sm:py-14 lg:py-16 bg-white overflow-hidden relative select-none"
          : "py-8 sm:py-12 bg-white"
      }
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {isSmuLayout ? (
        <>
          {/* Section Heading */}
          <div className="text-center mb-8 sm:mb-10 px-4 max-w-4xl mx-auto">
            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#212529] m-0 tracking-tight leading-tight">
              {sectionTitle}
            </h2>
          </div>

          {/* Advantages Carousel Container */}
          <div className="w-full max-w-[1140px] xl:max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 relative">
            {/* Left Chevron Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous advantage"
              className="absolute -left-1 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 text-[#212529] hover:text-black transition-all cursor-pointer p-2 border-none bg-transparent flex items-center justify-center active:scale-90"
            >
              <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
            </button>

            {/* Slider Track */}
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
                  // In 3-card desktop view, middle item is elevated
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
                      {/* Advantage Card */}
                      <div
                        className={`bg-white rounded-[8px] sm:rounded-[10px] overflow-hidden transition-all duration-300 flex flex-col text-center border border-slate-100 ${
                          isCenter
                            ? "shadow-[0px_10px_35px_rgba(0,0,0,0.14)] scale-[1.05] z-10"
                            : "shadow-[0px_4px_20px_rgba(0,0,0,0.07)] opacity-95 scale-[0.98] z-0"
                        }`}
                      >
                        {/* Top Image */}
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

                        {/* Dark Blue Title Ribbon */}
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

                        {/* Description Text */}
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

            {/* Right Chevron Arrow */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next advantage"
              className="absolute -right-1 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 text-[#212529] hover:text-black transition-all cursor-pointer p-2 border-none bg-transparent flex items-center justify-center active:scale-90"
            >
              <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
            </button>
          </div>
        </>
      ) : (
        <LandingContainer>
          {/* Section Heading */}
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-slate-900 tracking-tight m-0 text-center sm:text-left mb-6 sm:mb-8">
            {sectionTitle}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Features */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-5">
                {whyChoose.map((pt, idx) => (
                  <div key={idx} className="space-y-1 text-center sm:text-left">
                    <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#084183] tracking-tight m-0">
                      {pt.title}
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-gray-600 leading-relaxed font-normal m-0 max-w-sm mx-auto sm:mx-0">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Apply Now Button */}
              <div className="mt-5 sm:mt-6 text-center sm:text-left">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-[#08417b] font-bold text-[14px] px-6 py-2.5 rounded-md shadow-2xs transition-colors cursor-pointer border-none w-full sm:w-fit active:scale-95"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Student Image */}
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
      )}
    </section>
  );
}
