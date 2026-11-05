"use client";

import React from "react";
import Image from "next/image";
import { Clock, Laptop, Download } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";

export default function UuProgrammes({
  programmes = [],
  brand = {},
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const uniName = brand.name || "University Online";
  const ugTitle = brand.programmesUgSubtitle || "Undergraduate programs";
  const pgTitle = brand.programmesPgSubtitle || "Postgraduate programs";

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
      className="w-full bg-[#f8f8f8] rounded-[16px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:shadow-lg transition-all duration-300"
    >
      <div>
        <div className="relative w-full aspect-[500/230] overflow-hidden bg-slate-100">
          <Image
            src={c.image}
            alt={c.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* Solid Green accent bar between image and content */}
        <div className="h-[6px] bg-[#62B239] w-full" />
        <div className="px-5 sm:px-6 pt-5 pb-2 flex flex-col">
          <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#003399] mb-3 leading-snug">
            | {c.title}
          </h3>
          <p className="text-[13px] sm:text-[13.5px] text-[#555555] leading-[1.55] line-clamp-4 min-h-[78px] sm:min-h-[84px] mb-2">
            {c.description}
          </p>
        </div>
      </div>

      {/* Pinned Bottom Container: Duration & Mode Strip + Action Buttons */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 flex flex-col mt-auto">
        <div className="flex items-center gap-6 text-[12.5px] sm:text-[13px] font-semibold text-[#003399] mb-4">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#003399] stroke-[2.2]" />
            <span>{c.duration || "3 Years"}</span>
          </span>
          <span className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-[#003399] stroke-[2.2]" />
            <span>Online Course</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
            className="w-full h-[36px] sm:h-[38px] px-2 bg-white text-[#62B239] font-medium text-[11.5px] sm:text-[12px] rounded-[8px] border-[1.5px] border-[#62B239] hover:bg-[#62B239]/10 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs"
          >
            <span>Download Brochure</span>
            <Download className="w-3.5 h-3.5 text-[#62B239] stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => onOpenApply?.(c.code || c.title)}
            className="w-full h-[36px] sm:h-[38px] px-2 bg-[#62B239] text-white font-medium text-[12.5px] sm:text-[13px] rounded-[8px] border-none hover:bg-[#539e2e] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <span>Apply Now</span>
            <FaArrowRight className="w-3 h-3 text-white shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="program" className="py-8 sm:py-12 bg-[#ffffff] select-none scroll-mt-20 font-poppins" style={{ fontFamily: "'Poppins', var(--font-poppins), sans-serif" }}>
      <div className="uu-container w-full mx-auto font-poppins">
        {/* 1. Undergraduate Programs Section */}
        {ugPrograms.length > 0 && (
          <div className="mb-10 sm:mb-12">
            <div className="text-left mb-6 sm:mb-7">
              <h2 className="programmes-heading text-[19px] sm:text-[21px] lg:text-[22px] font-medium tracking-normal leading-tight m-0">
                <span className="text-[#003399] font-medium">{uniName}</span>{" "}
                <span className="text-[#62B239] font-medium">{ugTitle}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {ugPrograms.map(renderProgramCard)}
            </div>
          </div>
        )}

        {/* 2. Postgraduate Programs Section */}
        {pgPrograms.length > 0 && (
          <div>
            <div className="text-left mb-6 sm:mb-7">
              <h2 className="programmes-heading text-[19px] sm:text-[21px] lg:text-[22px] font-medium tracking-normal leading-tight m-0">
                <span className="text-[#003399] font-medium">{uniName}</span>{" "}
                <span className="text-[#62B239] font-medium">{pgTitle}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {pgPrograms.map(renderProgramCard)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
