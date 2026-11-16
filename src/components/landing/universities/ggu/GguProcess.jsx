"use client";

import React from "react";
import { GGU_ADMISSION_STEPS } from "./constants";

export default function GguProcess() {
  return (
    <section
      id="admission"
      className="w-full bg-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 select-none text-center"
    >
      {/* Heading */}
      <h2 className="font-extrabold text-[22px] sm:text-[26px] md:text-[30px] leading-tight text-center m-0 mb-1 text-black">
        How To Apply For Golden Gate University Online Courses
      </h2>

      {/* Subtitle */}
      <p className="max-w-[950px] mx-auto pt-1 pb-6 sm:pb-7 text-neutral-600 text-[12.5px] sm:text-[13.5px] leading-relaxed text-center m-0">
        Students can easily enrol in Golden Gate University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.
      </p>

      {/* 6 Step Cards - Full Width (No max-w container constraint, spans full screen width) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 w-full">
        {GGU_ADMISSION_STEPS.map((item) => (
          <div
            key={item.num}
            style={{ backgroundColor: item.cardBg }}
            className="relative rounded-[14px] px-3.5 py-4 sm:py-5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-200"
          >
            {/* Step Number Circle */}
            <div
              style={{
                borderColor: item.borderColor,
                color: item.themeColor,
              }}
              className="w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full border-[2.5px] sm:border-[3px] bg-white font-bold text-[18px] sm:text-[19px] flex items-center justify-center mx-auto shrink-0 mb-2"
            >
              {item.num}
            </div>

            {/* Title */}
            <h4 className="text-black font-bold text-[14.5px] sm:text-[15px] mb-1.5 leading-tight tracking-tight">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-neutral-600 text-[11.5px] sm:text-[12px] leading-snug m-0 max-w-[200px]">
              {item.desc}
            </p>

            {/* Bottom Color Accent Bar */}
            <span
              className="absolute bottom-0 left-0 right-0 h-[4px] sm:h-[5px] rounded-b-[14px]"
              style={{ backgroundColor: item.borderColor }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
