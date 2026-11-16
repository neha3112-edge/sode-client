"use client";

import React from "react";
import { IIM_ADMISSION_STEPS } from "./constants";

export default function IimProcess() {
  return (
    <section
      id="process"
      className="w-full bg-white py-8 sm:py-10 lg:py-12 px-4 sm:px-5 md:px-6 lg:px-8 select-none text-center overflow-hidden"
    >
      {/* Section Heading */}
      <h2 className="font-extrabold text-[22px] sm:text-[26px] md:text-[30px] leading-tight text-center m-0 mb-1.5 text-[#17479E]">
        How To Apply For IIM Kozhikode University Online Courses
      </h2>

      {/* Subtitle */}
      <p className="max-w-[900px] mx-auto pt-1 pb-6 sm:pb-8 text-neutral-600 text-[12.5px] sm:text-[13.5px] leading-relaxed text-center m-0">
        Students can easily enrol in IIM Kozhikode University Online courses.
        Candidates can conveniently apply by selecting their desired program.
        Follow these steps to secure admission in the university.
      </p>

      {/* 6 Step Cards - Full Width Grid matching Manipal, ESGCI & Edgewood */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4 w-full">
        {IIM_ADMISSION_STEPS.map((item) => (
          <div
            key={item.num}
            style={{ backgroundColor: item.cardBg }}
            className="relative rounded-[16px] px-3.5 sm:px-4 py-5 sm:py-6 shadow-[0_4px_18px_rgba(0,0,0,0.04)] flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-200"
          >
            {/* Step Number Circle */}
            <div
              style={{
                borderColor: item.borderColor,
                color: item.themeColor,
              }}
              className="w-12 h-12 rounded-full border-[3px] bg-white font-bold text-[19px] flex items-center justify-center mx-auto shrink-0 mb-3"
            >
              {item.num}
            </div>

            {/* Title */}
            <h4 className="text-black font-bold text-[15px] sm:text-[15.5px] mb-1.5 leading-tight">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-neutral-600 text-[12px] sm:text-[12.5px] leading-snug m-0 max-w-[200px]">
              {item.desc}
            </p>

            {/* Bottom Accent Bar */}
            <span
              className="absolute bottom-0 left-0 right-0 h-[4px] rounded-b-[16px]"
              style={{ backgroundColor: item.themeColor }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

