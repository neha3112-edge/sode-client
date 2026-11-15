"use client";

import React from "react";
import { UU_PROCESS_STEPS } from "./constants";

export default function UuProcess() {
  return (
    <section
      id="process"
      className="w-full bg-white py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 select-none text-center"
    >
      {/* Section Heading */}
      <h2 className="text-[#003399] font-bold text-[22px] sm:text-[26px] md:text-[30px] leading-tight text-center mb-0">
        How to Apply for Uttaranchal University Online Courses
      </h2>

      {/* Description */}
      <p className="max-w-[920px] mx-auto pt-2 pb-5 sm:pb-6 text-[#555555] text-[12.5px] sm:text-[13.5px] leading-[1.38] text-center m-0 font-normal">
        Students can easily enrol in Uttaranchal University Online courses. Candidates can conveniently apply by selecting
        their desired program. Follow these steps to secure admission in the university.
      </p>

      {/* 6 Step Cards - Full Width Grid matching Amity & Manipal */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-4 w-full">
        {UU_PROCESS_STEPS.map((item) => (
          <div
            key={item.step}
            className={`relative ${item.bgColor} rounded-[14px] px-3.5 py-4 sm:py-5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] flex flex-col items-center text-center`}
          >
            {/* Step Number Circle */}
            <div
              className={`w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full border-[2.5px] sm:border-[3px] bg-white font-bold text-[18px] sm:text-[19px] flex items-center justify-center mx-auto shrink-0 mb-1.5 ${item.borderColor} ${item.numColor}`}
            >
              {item.step}
            </div>

            {/* Title */}
            <h4 className="text-black font-semibold text-[14.5px] sm:text-[15px] mt-1.5 mb-1 leading-tight tracking-tight">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-[#444444] text-[11px] sm:text-[11.5px] leading-[1.3] m-0 max-w-[200px]">
              {item.description}
            </p>

            {/* Bottom Color Accent Bar */}
            <span
              className={`absolute bottom-0 left-0 right-0 h-[4px] sm:h-[5px] rounded-b-[14px] ${item.bottomBar}`}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
