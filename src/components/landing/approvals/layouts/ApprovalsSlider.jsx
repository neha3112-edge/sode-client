"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function ApprovalsSlider({
  approvals = [],
  activeUniversity,
  activeTitle,
  subtitle,
  brand = {},
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = approvals.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [nextSlide, total]);

  const visible = [
    approvals[currentIndex],
    approvals[(currentIndex + 1) % total],
    approvals[(currentIndex + 2) % total],
  ].filter(Boolean);

  const displayTitle =
    activeTitle ||
    brand?.approvalsTitle ||
    `${activeUniversity || brand?.name || "University"} Recognitions`;

  return (
    <section id="approval" className="py-10 sm:py-14 bg-white border-b border-slate-200/80 select-none scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 m-0">
            {displayTitle}
          </h2>
          {subtitle && (
            <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto m-0">{subtitle}</p>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute -left-2 sm:-left-4 z-10 p-2 bg-white rounded-full shadow-md border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            {visible.map((item, idx) => {
              const data = normalizeApprovalItem(item, idx);
              return (
                <div
                  key={data.id}
                  className="bg-white rounded-[12px] p-6 border border-slate-200 shadow-xs flex flex-col items-center text-center transition-all hover:shadow-md"
                >
                  <div className="relative w-24 h-20 mb-3 flex items-center justify-center">
                    <Image
                      src={data.image}
                      alt={data.title || data.tag || "Approval"}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 m-0">
                    {data.title}
                  </h3>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next"
            className="absolute -right-2 sm:-right-4 z-10 p-2 bg-white rounded-full shadow-md border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
