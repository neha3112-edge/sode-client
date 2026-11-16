"use client";

import React from "react";
import Image from "next/image";
import { Clock, Download } from "lucide-react";
import { IIITB_COURSES_DATA, iiitbImg } from "./constants";

export default function IiitbCourses({ onOpenBrochure, onOpenApply }) {
  return (
    <section id="main-courses" className="w-full bg-[#f8fafc] py-12 sm:py-16 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-black text-[#003b6f] m-0 leading-tight">
            Courses Offered
          </h2>
          <p className="text-[14.5px] sm:text-[16px] text-neutral-600 font-semibold m-0 mt-1.5">
            By IIIT Bangalore
          </p>
        </div>

        {/* 8 Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {IIITB_COURSES_DATA.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Card Top: Image & Info */}
              <div>
                {/* Course Image */}
                <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                  <Image
                    src={iiitbImg(course.image)}
                    alt={course.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 pb-2">
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-neutral-900 m-0 leading-snug line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Duration with Clock Icon */}
                  <div className="flex items-center gap-1.5 text-neutral-700 text-[13px] font-semibold mt-2.5 mb-3">
                    <Clock className="w-4 h-4 text-neutral-800 shrink-0" />
                    <span>
                      <strong>Duration:</strong> {course.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-600 text-[12.5px] sm:text-[13px] leading-relaxed m-0 font-normal">
                    {course.desc}
                  </p>
                </div>
              </div>

              {/* Card Bottom: Action Buttons */}
              <div className="p-5 sm:p-6 pt-3 flex items-center gap-2.5 border-t border-gray-100 mt-4">
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.(course.title, "Download Brochure")}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-[#01519a] hover:bg-[#003f7a] text-white font-bold text-[12.5px] flex items-center justify-center gap-1.5 border-none cursor-pointer active:scale-98 transition-all"
                >
                  <span className="truncate">Download Brochure</span>
                  <Download className="w-3.5 h-3.5 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenApply?.(course.title, "Apply Now")}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-[#003b6f] hover:bg-[#002a4f] text-white font-bold text-[12.5px] flex items-center justify-center border-none cursor-pointer active:scale-98 transition-all"
                >
                  <span>Apply now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

