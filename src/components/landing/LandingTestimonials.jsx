"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Testimonials Section (#testimonials)
 */
export default function LandingTestimonials({
  testimonials = [],
  faculties = [],
  universityName,
  brand = {},
}) {
  const isGalgotias =
    brand.slug === "galgotias" ||
    brand.heroStyle === "galgotias" ||
    brand.testimonialsStyle === "galgotias" ||
    faculties?.length > 0;

  const isClassic = brand.testimonialsCardStyle === "classic";
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const items = testimonials || [];
  const extendedItems = [...items, ...items, ...items];
  const [currentIndex, setCurrentIndex] = useState(items.length);

  const primaryColor = brand?.primaryColor || "#ee3024";
  const university = universityName || brand?.name || "Galgotias University Online";

  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setVisibleCount(w < 640 ? 1 : w < 1024 ? 2 : 3);
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
    if (isGalgotias || isPaused || items.length === 0) return;
    const timer = setInterval(handleNext, 3000);
    return () => clearInterval(timer);
  }, [isGalgotias, isPaused, items.length, handleNext]);

  const handleTransitionEnd = () => {
    if (currentIndex >= items.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - items.length);
    } else if (currentIndex < items.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + items.length);
    }
  };

  // 1. Galgotias Layout (Faculties + Reviews)
  if (isGalgotias) {
    const facultiesList = faculties?.length > 0 ? faculties : brand.faculties || [];

    return (
      <section id="testimonials" className="py-10 sm:py-16 bg-white select-none w-full">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          {facultiesList.length > 0 && (
            <div className="mb-14 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0 mb-6 sm:mb-8 text-center">
                {brand.facultiesTitle || "Faculties at Galgotias Online University"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
                {facultiesList.map((faculty, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[8px] sm:rounded-[10px] p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow text-left flex flex-col justify-center"
                  >
                    <h3 className="text-[17px] sm:text-[19px] font-bold text-slate-900 leading-tight m-0">
                      {faculty.name}
                    </h3>
                    <p className="text-[13.5px] sm:text-[14.5px] text-slate-700 font-normal mt-1 m-0 leading-relaxed">
                      {faculty.designation || faculty.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {items.length > 0 && (
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0 mb-8 sm:mb-10 text-center">
                {brand.reviewsTitle || "Galgotias Online Reviews"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#fafbfc] rounded-[8px] sm:rounded-[10px] p-6 sm:p-7 text-center flex flex-col items-center justify-start border border-slate-100/90 shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#525f70] text-white flex items-center justify-center mb-3 shadow-2xs shrink-0">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>

                    <h3 className="text-[16px] sm:text-[17px] font-bold text-slate-900 leading-tight m-0">{item.name}</h3>
                    <p className="text-[12.5px] sm:text-[13px] text-slate-600 font-normal mt-1 mb-2.5 leading-tight m-0">{item.course}</p>

                    <div className="flex items-center justify-center gap-1 mb-3">
                      {[...Array(item.rating || 5)].map((_, sIdx) => (
                        <svg key={sIdx} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f5a623] fill-[#f5a623]" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-[12.5px] sm:text-[13px] text-slate-700 leading-relaxed font-normal text-center m-0">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // 2. Default Carousel Layout (Manipal, Amity, etc.)
  return (
    <section
      id="testimonials"
      className="py-12 sm:py-16 bg-white overflow-hidden select-none"
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
        setIsPaused(false);
      }}
    >
      <LandingContainer>
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-slate-900 tracking-tight m-0">
            What Learners Say <span style={{ color: primaryColor }}>About {university}</span>
          </h2>
          {isClassic && (
            <p className="text-xs sm:text-[14px] text-slate-600 max-w-2xl mx-auto mt-2 font-normal">
              Real stories and career transformations from our successful alumni and online learners.
            </p>
          )}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 z-20 text-slate-800 hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 z-20 text-slate-800 hover:text-[#ee3024] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedItems.map((item, idx) => {
                const imgSrc = (item.image || item.avatar || "").trim();
                const initials = (item.name || "U")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div key={idx} className="shrink-0 px-2.5 sm:px-3.5 py-2" style={{ width: `${100 / visibleCount}%` }}>
                    {isClassic ? (
                      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3.5 mb-3.5">
                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-orange-400 shrink-0 bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                              {imgSrc ? (
                                <Image src={imgSrc} alt={item.name || "Student"} fill className="object-cover" sizes="56px" />
                              ) : (
                                <span>{initials}</span>
                              )}
                            </div>
                            <div>
                              <h4 className="text-[15px] sm:text-[16px] font-bold text-slate-900 m-0">{item.name}</h4>
                              <span className="text-[12px] sm:text-[12.5px] font-semibold" style={{ color: primaryColor }}>
                                {item.course}
                              </span>
                            </div>
                          </div>
                          <hr className="border-t border-slate-100 my-3" />
                          <p className="text-[13px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal m-0 line-clamp-5">
                            {item.text}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Quote className="w-6 h-6 text-orange-200" />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-[8px] sm:rounded-[10px] p-6 sm:p-7 border border-slate-100 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col justify-start text-left">
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-[4px] overflow-hidden mb-3.5 shrink-0 bg-slate-100 shadow-2xs flex items-center justify-center font-bold text-slate-700 text-base">
                          {imgSrc ? (
                            <Image src={imgSrc} alt={item.name || "Student"} fill className="object-cover" sizes="64px" />
                          ) : (
                            <span>{initials}</span>
                          )}
                        </div>
                        <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900 m-0 leading-tight">{item.name}</h3>
                        <p className="text-[13px] sm:text-[13.5px] text-slate-600 font-medium mt-1 mb-3.5 leading-tight">{item.course}</p>
                        <p className="text-[12.5px] sm:text-[13px] text-slate-700 leading-relaxed font-normal m-0">{item.text}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}

