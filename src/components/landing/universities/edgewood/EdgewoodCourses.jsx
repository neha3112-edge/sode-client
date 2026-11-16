"use client";

import React from "react";
import Image from "next/image";
import { edgewoodImg, EDGEWOOD_COURSES_DATA } from "./constants";

export default function EdgewoodCourses({ onOpenBrochure, onOpenApply }) {
  return (
    <section
      id="courses"
      className="w-full bg-[#edf0f2] py-12 sm:py-16 px-4 sm:px-6 select-none scroll-mt-20"
    >
      <div className="max-w-[1060px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[#b2171e] font-black text-[22px] sm:text-[26px] md:text-[28px] uppercase tracking-wide block leading-tight">
            COURSES OFFERED
          </span>
          <h2 className="text-[#111111] font-bold text-[15px] sm:text-[17px] md:text-[18px] leading-tight m-0 mt-1">
            By Edgewood University Online
          </h2>
        </div>

        {/* 2 White Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {EDGEWOOD_COURSES_DATA.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-[22px] overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Direct Card Image - Free natural size, NO artificial background or border */}
              <div className="w-full overflow-hidden">
                <Image
                  src={edgewoodImg(course.image)}
                  alt={course.title}
                  width={course.imageWidth}
                  height={course.imageHeight}
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="w-full h-auto block object-cover"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between text-left">
                <div>
                  <h3 className="text-[#111111] font-black text-[18px] sm:text-[20px] m-0 mb-3 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-[#555555] text-[13px] sm:text-[13.5px] leading-relaxed m-0 mb-4">
                    {course.description}
                  </p>

                  <div className="space-y-1 text-[#111111] text-[13px] sm:text-[13.5px] font-bold mb-6">
                    <div>Duration: {course.duration}</div>
                    <div>Eligibility: {course.eligibility}</div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-3.5 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenBrochure?.(course.title, `Brochure - ${course.title}`)}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-white hover:bg-neutral-50 text-[#b2171e] font-bold text-[13px] border border-[#b2171e] cursor-pointer transition-all active:scale-95 shadow-2xs"
                  >
                    <span>Get Brochure</span>
                    <span className="text-[14px] leading-none">↓</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenApply?.(course.title, `Apply - ${course.title}`)}
                    className="inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-[#b2171e] hover:bg-[#991319] text-white font-bold text-[13px] border-none cursor-pointer transition-all active:scale-95 shadow-2xs"
                  >
                    Apply now
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
