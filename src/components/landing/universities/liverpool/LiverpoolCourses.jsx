"use client";

import React from "react";
import Image from "next/image";
import { Check, Download } from "lucide-react";
import { LIVERPOOL_COURSES, liverpoolImg } from "./constants";

export default function LiverpoolCourses({ onOpenApply, onOpenBrochure }) {
  return (
    <section id="courses" className="w-full bg-white pt-10 sm:pt-14 pb-4 sm:pb-6 select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h2 className="text-[26px] sm:text-[34px] md:text-[38px] font-black text-[#111111] leading-tight m-0">
          Courses Offered in
        </h2>
        <h3 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-[#00bcd4] leading-tight m-0 mt-1 mb-8 sm:mb-12">
          Liverpool Online MBA
        </h3>

        {/* 6 Specialisation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 text-left">
          {LIVERPOOL_COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-[14px] border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              {/* Top Banner Image */}
              <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
                <Image
                  src={liverpoolImg(course.image)}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[17px] sm:text-[18px] font-extrabold text-[#111111] leading-snug m-0 mb-2">
                    {course.title}
                  </h4>
                  <p className="text-[12.5px] sm:text-[13px] text-[#555555] leading-relaxed m-0 mb-5 font-normal">
                    {course.desc}
                  </p>
                </div>

                {/* Bottom Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(course.title, "Apply Now")}
                    className="py-2.5 px-3 rounded-lg bg-[#00408d] hover:bg-[#00306b] text-white font-bold text-[12.5px] sm:text-[13px] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all border-none"
                  >
                    <span>Apply Now</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBrochure?.(course.title, "Download Brochure")}
                    className="py-2.5 px-3 rounded-lg bg-[#111111] hover:bg-[#222222] text-white font-bold text-[12.5px] sm:text-[13px] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all border-none"
                  >
                    <span>Get Brochure</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

