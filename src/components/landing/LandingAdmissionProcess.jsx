"use client";

import React from "react";

const STEP_STYLES = [
  {
    themeColor: "#ff7a00",
    bg: "bg-[#fff8f0]",
    borderBottom: "border-b-[#ff7a00]",
  },
  {
    themeColor: "#0066cc",
    bg: "bg-[#f0f7ff]",
    borderBottom: "border-b-[#0066cc]",
  },
  {
    themeColor: "#ff2a6d",
    bg: "bg-[#fff0f5]",
    borderBottom: "border-b-[#ff2a6d]",
  },
  {
    themeColor: "#16a34a",
    bg: "bg-[#f0faf3]",
    borderBottom: "border-b-[#16a34a]",
  },
  {
    themeColor: "#8b5cf6",
    bg: "bg-[#f7f2ff]",
    borderBottom: "border-b-[#8b5cf6]",
  },
  {
    themeColor: "#ff7a00",
    bg: "bg-[#fff8f0]",
    borderBottom: "border-b-[#ff7a00]",
  },
];

export default function LandingAdmissionProcess({
  admissionSteps = [],
  universityName = "Amity University Online",
}) {
  if (!admissionSteps || admissionSteps.length === 0) return null;

  const cleanUni = universityName.replace(/\s*Online\s*$/i, "");
  const headingText = universityName.toLowerCase().includes("course")
    ? `How to Apply for ${universityName}`
    : `How to Apply for ${universityName} Courses`;

  return (
    <section id="process" className="py-8 sm:py-12 lg:py-14 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-center text-[#08417b] tracking-tight mb-2 m-0">
          {headingText}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-[13.5px] text-center text-slate-600 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto font-normal leading-relaxed m-0 px-2">
          The admission process for {cleanUni} course admissions is very simple and user-friendly. Here&apos;s a step-by-step guide to enrolling in a degree course at the university :
        </p>

        {/* Responsive Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {admissionSteps.map((step, idx) => {
            const style = STEP_STYLES[idx % STEP_STYLES.length];
            const num = step.num || idx + 1;
            const themeColor = step.themeColor?.includes("#")
              ? step.themeColor.match(/#[0-9a-fA-F]+/)?.[0] || style.themeColor
              : style.themeColor;
            const cardBg = step.cardBg || style.bg;

            return (
              <div
                key={num}
                className={`${cardBg} rounded-2xl border-0 border-b-4 p-4 sm:p-4 pt-5 pb-5 text-center flex flex-col items-center justify-start h-full transition-transform hover:-translate-y-1 shadow-2xs hover:shadow-xs`}
                style={{ borderBottomColor: themeColor }}
              >
                {/* Circular Number Badge */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 bg-white flex items-center justify-center font-bold text-base sm:text-lg mb-3 shrink-0 shadow-2xs select-none"
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  {num}
                </div>

                {/* Step Title */}
                <h3 className="text-[13.5px] sm:text-[14px] font-bold text-slate-900 mb-1.5 leading-snug m-0">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed font-normal m-0">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
