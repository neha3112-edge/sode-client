"use client";

import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { Container } from "@/components/common/Container";
import { SHOOLINI_PROGRAMS } from "./constants";

export default function ShooliniProgrammes({ onOpenBrochure, onOpenApply }) {
  return (
    <section id="programs" className="w-full pt-5 pb-8 sm:pt-7 sm:pb-12 bg-white select-none">
      <Container>
        {/* Section Heading - Only main title with compact spacing */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-gray-900 font-extrabold text-2xl sm:text-3xl md:text-[32px] tracking-tight m-0">
            Shoolini University Online Courses
          </h2>
        </div>

        {/* 7 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SHOOLINI_PROGRAMS.map((course) => (
            <div
              key={course.title}
              className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col"
            >
              {/* Top Banner Image - Free Size (Natural Aspect Ratio) */}
              <div className="w-full overflow-hidden bg-gray-50 rounded-t-xl">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={1360}
                  height={540}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-contain block"
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                {/* Course Title */}
                <h3 className="text-gray-900 font-bold text-[17px] sm:text-[18px] leading-snug m-0">
                  {course.title}
                </h3>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium mt-2.5 mb-3">
                  <Clock size={13} className="text-gray-500 shrink-0" />
                  <span>{course.duration}</span>
                </div>

                {/* Description (Full text, no clamp) */}
                <p className="text-[#555555] text-xs sm:text-[12.5px] leading-relaxed mb-5 flex-1">
                  {course.description}
                </p>

                {/* Buttons Row */}
                <div className="flex items-center gap-2.5 pt-1 mt-auto">
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(course.title)}
                    className="flex-1 inline-flex items-center justify-center bg-[#fd202a] hover:bg-[#e01620] text-white font-medium text-xs sm:text-[13px] py-2.5 px-3 rounded-md transition-all whitespace-nowrap cursor-pointer border-none shadow-xs active:scale-95"
                  >
                    <span>Apply now</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBrochure?.(course.title)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white border border-[#fd202a] text-[#fd202a] hover:bg-[#fff5f5] font-medium text-xs sm:text-[13px] py-2.5 px-3 rounded-md transition-all whitespace-nowrap cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Download Brochure</span>
                    <FaDownload className="text-[11px] shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
