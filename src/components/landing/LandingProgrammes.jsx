"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Download, ChevronLeft, ChevronRight, Hourglass } from "lucide-react";

/**
 * Reusable Landing Programmes Carousel (Infinite Loop with Timer)
 * Matches Reference Image:
 * - Deep navy background (#08417b / brand.primaryColor)
 * - Two-line centered white heading
 * - 4 cards visible on desktop, sliding smoothly in a loop on a timer
 * - Green "Graduation" / "Post Graduation" badge on top-left of image
 * - Yellow "Get Brochure" button + "36 Months / 24 Months" duration
 * - Fully data-driven by `programmes` and `brand` from JSON.
 */
export default function LandingProgrammes({
  programmes = [],
  universityName = "Amity University",
  brand = {},
  title = "Online Degree Courses",
  intervalTime = 2000,
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const total = programmes.length;

  // Start at `total` so previous card is available for the left peek
  const [currentIndex, setCurrentIndex] = useState(total > 0 ? total : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const timerRef = useRef(null);

  // Clean university name so line 1 says "Amity University" like in Image 1
  const rawUni = universityName || brand.name || "Amity University";
  const displayUniversity = rawUni.replace(/\s+Online$/i, "").trim() || rawUni;
  const primaryBg = brand.hero?.formBackground || brand.primaryColor || "#08417b";

  // Responsive visible cards count: exactly 4 cards on desktop matching Image 2
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        // Desktop: exactly 4 cards visible side-by-side
        setVisibleCount(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Repeat items 4 times so infinite sliding both forward and backward has seamless cards
  const extendedList =
    total > 0
      ? [
        ...programmes,
        ...programmes,
        ...programmes,
        ...programmes,
      ]
      : [];

  // Reset to index `total` invisibly when sliding transition reaches boundary
  const handleTransitionEnd = () => {
    if (currentIndex >= total * 2) {
      setWithTransition(false);
      setCurrentIndex(total);
    }
  };

  // Auto-play timer that shifts 1 card at a time in loop
  useEffect(() => {
    if (isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      setWithTransition(true);
      setCurrentIndex((prev) => {
        if (prev >= total * 2) {
          return total + 1;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timerRef.current);
  }, [isPaused, total, intervalTime]);

  if (!programmes || programmes.length === 0) return null;

  return (
    <section
      id="programmes"
      className="py-12 sm:py-16 text-white overflow-hidden relative select-none transition-colors w-full"
      style={{ backgroundColor: primaryBg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Heading matching reference UI */}
      <div className="text-center mb-8 sm:mb-10 px-4 max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-bold text-white m-0 tracking-tight leading-tight">
          {displayUniversity}
        </h3>
        <h2 className="text-3xl sm:text-4xl lg:text-[36px] font-bold text-white mt-1.5 m-0 tracking-tight leading-tight">
          {title}
        </h2>
      </div>

      {/* Responsive Centered Container matching Laptop (Image 1) and Desktop (Image 2) */}
      <div className="w-full max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="w-full overflow-hidden">
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex items-stretch"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              transition: withTransition
                ? "transform 500ms ease-in-out"
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

              return (
                <div
                  key={`${c.id || c.code}-${idx}`}
                  className="shrink-0 px-1.5 sm:px-2 xl:px-2.5 box-border"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  {/* Course Card matching Image 1 & Image 2 */}
                  <div className="bg-white rounded-[6px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group text-left border border-slate-200/80">
                    <div>
                      {/* Course Image with Green Level Badge */}
                      <div className="relative h-40 sm:h-44 xl:h-48 w-full bg-slate-100 overflow-hidden">
                        <Image
                          src={c.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"}
                          alt={c.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        {/* Green Level Badge on top-left */}
                        <div className="absolute top-0 left-0 bg-[#009900] text-white text-[11px] sm:text-[11.5px] font-semibold px-2.5 sm:px-3 py-1 rounded-br-[4px] tracking-wide select-none shadow-xs">
                          {levelText}
                        </div>
                      </div>

                      {/* Card Content with Exact Typography */}
                      <div className="p-3.5 sm:p-4 xl:p-4.5 pb-2">
                        <h3 className="text-[21px] sm:text-[23px] xl:text-[25px] font-bold text-[#08417b] m-0 leading-tight tracking-tight">
                          {c.code || c.id?.toUpperCase() || c.title}
                        </h3>
                        <p className="text-[12.5px] sm:text-[13px] font-semibold text-[#08417b] mt-1 mb-2 line-clamp-1">
                          {c.title}
                        </p>
                        <p className="text-[11.5px] sm:text-[12px] text-[#444444] leading-[1.5] line-clamp-4 min-h-[68px] sm:min-h-[72px] m-0">
                          {c.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="px-3.5 sm:px-4 xl:px-4.5 pt-2 pb-3.5 flex items-center justify-between border-t border-slate-100 mt-1">
                      {/* Yellow Get Brochure Button */}
                      <button
                        type="button"
                        onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                        className="bg-[#ffd200] hover:bg-[#ffc107] active:scale-95 text-black font-bold text-[11px] sm:text-[12px] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-[4px] inline-flex items-center gap-1 sm:gap-1.5 border-none cursor-pointer transition-all shadow-xs shrink-0"
                      >
                        <span>Get Brochure</span>
                        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>

                      {/* Duration Indicator with Hourglass Icon */}
                      <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-[12px] font-medium text-[#333333] select-none shrink-0">
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
