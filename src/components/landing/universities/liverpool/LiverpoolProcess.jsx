"use client";

import React from "react";
import { LIVERPOOL_PROCESS_STEPS } from "./constants";

export default function LiverpoolProcess() {
  const stepColors = [
    { border: "#f59e0b", badge: "#f59e0b", bg: "#fef3c7" },
    { border: "#0284c7", badge: "#0284c7", bg: "#e0f2fe" },
    { border: "#ec4899", badge: "#ec4899", bg: "#fce7f3" },
    { border: "#10b981", badge: "#10b981", bg: "#d1fae5" },
    { border: "#8b5cf6", badge: "#8b5cf6", bg: "#ede9fe" },
    { border: "#ea580c", badge: "#ea580c", bg: "#ffedd5" },
  ];

  return (
    <section id="process" className="w-full bg-white py-12 sm:py-16 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-[26px] sm:text-[34px] md:text-[38px] font-black text-[#00408d] leading-tight m-0">
          How To Apply For Liverpool Business School Online MBA
        </h2>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#555555] leading-relaxed max-w-[860px] mx-auto m-0 mt-3 mb-10 sm:mb-12 font-medium">
          Applying for the Liverpool online MBA programme is a simple and streamlined process.
          Learners can begin their admission journey by completing the application form, submitting
          the required documents, and following the enrolment steps to secure their place in this
          globally recognised MBA in Liverpool programme.
        </p>

        {/* 6 Steps Grid (1 col mobile, 2 sm, 3 md, 6 xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 text-center">
          {LIVERPOOL_PROCESS_STEPS.map((item, idx) => {
            const color = stepColors[idx % stepColors.length];
            return (
              <div
                key={idx}
                className="bg-white rounded-[14px] p-5 border border-gray-200 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col items-center justify-between min-h-[220px]"
                style={{ borderBottom: `4px solid ${color.border}` }}
              >
                {/* Numbered Circle Badge */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-[18px] mb-3 border-2"
                  style={{
                    backgroundColor: color.bg,
                    borderColor: color.badge,
                    color: color.badge,
                  }}
                >
                  {item.step}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-start">
                  <h4 className="text-[15px] font-bold text-[#111111] leading-snug m-0 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-[#666666] leading-relaxed m-0 font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

