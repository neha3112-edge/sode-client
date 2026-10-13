"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function SmuApprovals({ approvals = [], title, subtitle, brand = {} }) {
  const [index, setIndex] = useState(0);
  const total = approvals.length;

  const next = useCallback(() => {
    if (total === 0) return;
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    if (total === 0) return;
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, total]);

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 40;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      next();
    } else if (distance < -minSwipeDistance) {
      prev();
    }
  };

  if (!approvals || approvals.length === 0) return null;

  const visibleApprovals = [
    approvals[index],
    approvals[(index + 1) % total],
    approvals[(index + 2) % total],
    approvals[(index + 3) % total],
  ].filter(Boolean);

  const displayTitle = title || brand?.approvalsTitle || "Rankings & Accreditations";

  return (
    <section id="approvals" className="w-full py-8 sm:py-12 bg-[#efefef] select-none scroll-mt-20">
      <div className="w-full max-w-[1536px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center w-full max-w-[1650px] mx-auto mb-6 sm:mb-8 lg:mb-10 px-2 sm:px-4">
          <h2 className="text-[19px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#111827] tracking-tight leading-[1.3] m-0 mb-2 sm:mb-3">
            {typeof displayTitle === "string" && displayTitle.includes("Rankings & Accreditations") ? (
              <>
                <span className="block">
                  {displayTitle.replace("Rankings & Accreditations", "").trim() || "Sikkim Manipal University Online"}
                </span>
                <span className="block">Rankings & Accreditations</span>
              </>
            ) : (
              displayTitle
            )}
          </h2>
          {subtitle && (
            <p className="text-[12px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] text-[#444444] leading-relaxed font-normal m-0 max-w-[1600px] mx-auto text-center">
              {typeof subtitle === "string" && subtitle.includes("SMU Online delivers") ? (
                <>
                  <span className="block xl:whitespace-nowrap">
                    {subtitle.split("SMU Online delivers")[0]}SMU Online delivers
                  </span>
                  <span className="block xl:whitespace-nowrap mt-0.5">
                    {subtitle.split("SMU Online delivers")[1]?.trim()}
                  </span>
                </>
              ) : (
                subtitle
              )}
            </p>
          )}
        </div>

        <div
          className="relative flex items-center justify-between px-8 sm:px-12 lg:px-16 w-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Previous Arrow - Larger size matching request */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous approval"
            className="absolute left-0 sm:left-1 lg:left-2 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 text-[#212529] hover:text-[#074a76] hover:scale-110 bg-transparent border-none shadow-none cursor-pointer flex items-center justify-center transition-all active:scale-90 focus:outline-none"
          >
            <ChevronLeft className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 stroke-[2.5]" />
          </button>

          {/* Carousel Grid: 2 items on mobile, 3 on sm, 4 on md+ with LARGER cards & logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-14 w-full mx-auto">
            {visibleApprovals.map((appr, idx) => {
              const data = normalizeApprovalItem(appr, idx);
              return (
                <div
                  key={`${data.id}-${idx}`}
                  className={`bg-transparent border-0 shadow-none p-2 flex flex-col items-center justify-start text-center min-h-[180px] sm:min-h-[210px] lg:min-h-[240px] transition-all duration-300 ${
                    idx < 2 ? "flex" : idx === 2 ? "hidden sm:flex" : "hidden md:flex"
                  }`}
                >
                  <div className="relative w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-24 sm:h-28 md:h-32 lg:h-36 mb-3 sm:mb-4 flex items-center justify-center">
                    <Image
                      src={data.image}
                      alt={data.title || "Approval"}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 300px"
                    />
                  </div>
                  <p className="text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[16.5px] font-medium text-[#111827] m-0 leading-snug text-center max-w-[200px] sm:max-w-[240px] lg:max-w-[280px] xl:max-w-[320px]">
                    {data.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Next Arrow - Larger size matching request */}
          <button
            type="button"
            onClick={next}
            aria-label="Next approval"
            className="absolute right-0 sm:right-1 lg:right-2 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 text-[#212529] hover:text-[#074a76] hover:scale-110 bg-transparent border-none shadow-none cursor-pointer flex items-center justify-center transition-all active:scale-90 focus:outline-none"
          >
            <ChevronRight className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}

