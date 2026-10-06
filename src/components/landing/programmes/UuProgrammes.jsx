"use client";

import React from "react";
import Image from "next/image";
import { Clock, Laptop, Download, ArrowRight } from "lucide-react";

export default function UuProgrammes({
  programmes = [],
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const ugPrograms = programmes.filter(
    (p) =>
      p.level?.toLowerCase().includes("undergrad") ||
      ["ba", "bba", "bca"].includes(p.code?.toLowerCase()) ||
      ["ba", "bba", "bca"].includes(p.id?.toLowerCase())
  );

  const pgPrograms = programmes.filter(
    (p) =>
      p.level?.toLowerCase().includes("postgrad") ||
      ["mba", "mca"].includes(p.code?.toLowerCase()) ||
      ["mba", "mca"].includes(p.id?.toLowerCase())
  );

  const renderProgramCard = (c, idx) => (
    <div
      key={c.id || idx}
      className="w-full bg-white rounded-[8px] overflow-hidden border border-slate-200/90 shadow-[0_3px_12px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:shadow-md transition-all duration-300"
    >
      <div>
        <div className="relative w-full aspect-[16/9.5] overflow-hidden bg-slate-100">
          <Image
            src={c.image}
            alt={c.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        {/* Green accent line between image and content */}
        <div className="h-[3px] bg-[#62B239] w-full" />
        <div className="p-3.5 sm:p-4 pb-1 flex flex-col">
          <h3 className="text-[15px] sm:text-[16px] font-bold text-[#003399] mb-1.5 leading-snug">
            | {c.title}
          </h3>
          <p className="text-[12px] sm:text-[12.5px] text-[#555555] leading-relaxed line-clamp-3 mb-2.5">
            {c.description}
          </p>
          <div className="flex items-center gap-4 text-[11.5px] sm:text-[12px] font-medium text-[#003399] mb-2.5">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#003399] stroke-[2.2]" />
              <span>{c.duration || "3 Years"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-[#003399] stroke-[2.2]" />
              <span>Online Course</span>
            </span>
          </div>
        </div>
      </div>
      <div className="p-3.5 sm:p-4 pt-1 pb-3.5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
          className="w-full py-1.5 px-1 bg-white text-[#62B239] font-medium text-[11px] sm:text-[11.5px] rounded-[4px] border border-[#62B239] hover:bg-[#62B239]/10 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap"
        >
          <span>Download Brochure</span>
          <Download className="w-3 h-3 stroke-[2.5]" />
        </button>
        <button
          type="button"
          onClick={() => onOpenApply?.(c.code || c.title)}
          className="w-full py-1.5 px-1 bg-[#62B239] text-white font-medium text-[11px] sm:text-[11.5px] rounded-[4px] border-none hover:bg-[#539e2e] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs whitespace-nowrap"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-3 h-3 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );

  return (
    <section id="program" className="py-8 sm:py-12 bg-[#ffffff] select-none scroll-mt-20">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        {/* 1. Undergraduate Programs Section */}
        {ugPrograms.length > 0 && (
          <div className="mb-10 sm:mb-12">
            <div className="text-center mb-6 sm:mb-7">
              <h2 className="text-[20px] sm:text-[24px] lg:text-[26px] font-bold leading-tight m-0">
                <span className="text-[#003399]">Uttaranchal University Online</span>{" "}
                <span className="text-[#62B239]">Undergraduate programs</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {ugPrograms.map(renderProgramCard)}
            </div>
          </div>
        )}

        {/* 2. Postgraduate Programs Section */}
        {pgPrograms.length > 0 && (
          <div>
            <div className="text-center mb-6 sm:mb-7">
              <h2 className="text-[20px] sm:text-[24px] lg:text-[26px] font-bold leading-tight m-0">
                <span className="text-[#003399]">Uttaranchal University Online</span>{" "}
                <span className="text-[#62B239]">Postgraduate programs</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {pgPrograms.map(renderProgramCard)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
