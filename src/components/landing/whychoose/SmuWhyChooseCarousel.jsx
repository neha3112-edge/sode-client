"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SmuWhyChooseCarousel({ whyChoose = [], brand = {} }) {
  const total = whyChoose.length;
  const [currentIndex, setCurrentIndex] = useState(total > 0 ? total : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const sectionTitle = brand.whyChooseTitle || `Advantages of ${brand.name || "Sikkim Manipal University Online"}`;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      setVisibleCount(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const extendedList = total > 0 ? [...whyChoose, ...whyChoose, ...whyChoose, ...whyChoose] : [];

  const handleTransitionEnd = () => {
    if (currentIndex >= total * 2) {
      setWithTransition(false);
      setCurrentIndex(total);
    } else if (currentIndex < total) {
      setWithTransition(false);
      setCurrentIndex(total + (currentIndex % total));
    }
  };

  const slide = (dir) => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + dir);
  };

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      setWithTransition(true);
      setCurrentIndex((prev) => (prev >= total * 2 ? total + 1 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
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
        if (Math.abs(deltaX) > 40 && touchEndXRef.current !== 0) slide(deltaX > 0 ? 1 : -1);
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
          onClick={() => slide(-1)}
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
              transition: withTransition ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
            }}
          >
            {extendedList.map((item, idx) => {
              const isCenter =
                visibleCount === 3 ? idx === currentIndex + 1 : visibleCount === 1 ? idx === currentIndex : false;

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
                        isCenter ? "h-48 sm:h-52 md:h-[210px]" : "h-44 sm:h-48 md:h-[185px]"
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
                          isCenter ? "text-[16px] sm:text-[17px] lg:text-[18px]" : "text-[15px] sm:text-[16px]"
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
          onClick={() => slide(1)}
          aria-label="Next advantage"
          className="absolute -right-1 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 text-[#212529] hover:text-black transition-all cursor-pointer p-2 border-none bg-transparent flex items-center justify-center active:scale-90"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
        </button>
      </div>
    </section>
  );
}
