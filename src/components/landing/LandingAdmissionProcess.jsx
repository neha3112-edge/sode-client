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
  admissionProcess = null,
  universityName = "Amity University Online",
  brand = {},
}) {
  if (!admissionSteps || admissionSteps.length === 0) return null;

  const isSmu =
    brand.slug === "smu" ||
    brand.name?.toLowerCase().includes("sikkim") ||
    brand.name?.toLowerCase().includes("smu");

  const cleanUni = universityName.replace(/\s*Online\s*$/i, "");
  
  const headingText =
    admissionProcess?.title ||
    brand.admissionTitle ||
    (isSmu
      ? `How To Take Admission In ${brand.name || "Sikkim Manipal University Online"}?`
      : universityName.toLowerCase().includes("course")
      ? `How to Apply for ${universityName}`
      : `How to Apply for ${universityName} Courses`);

  const subtitleText =
    admissionProcess?.subtitle ||
    brand.admissionSubtitle ||
    (isSmu
      ? `Admissions in ${brand.name || "Sikkim Manipal University Online"} is a convenient process. Any eligible candidate can enrol in their desired courses. Follow these steps to secure your admission:`
      : `The admission process for ${cleanUni} course admissions is very simple and user-friendly. Here's a step-by-step guide to enrolling in a degree course at the university :`);

  const headingColor = isSmu ? "#193579" : (brand.primaryColor || "#08417b");

  return (
    <section id="process" className="py-10 sm:py-14 lg:py-16 bg-white w-full select-none">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1240px] xl:max-w-[1300px] mx-auto">
        {/* Heading */}
        <h2
          className="text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-center tracking-tight mb-3 m-0"
          style={{ color: headingColor }}
        >
          {headingText}
        </h2>

        {/* Subtitle */}
        <p className="text-[13px] sm:text-[14px] text-center text-[#4b5563] mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto font-normal leading-relaxed m-0 px-4">
          {subtitleText}
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
                className={`${cardBg} rounded-2xl border-0 border-b-4 p-4 sm:p-4 pt-6 pb-6 text-center flex flex-col items-center justify-start h-full transition-all duration-300 hover:-translate-y-1 shadow-2xs hover:shadow-xs`}
                style={{ borderBottomColor: themeColor }}
              >
                {/* Circular Number Badge */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 bg-white flex items-center justify-center font-bold text-[15px] sm:text-[16px] mb-3.5 shrink-0 shadow-2xs select-none"
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  {num}
                </div>

                {/* Step Title */}
                <h3 className="text-[14px] sm:text-[15px] font-bold text-[#111827] mb-2 leading-snug m-0">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[12px] sm:text-[12.5px] text-[#4b5563] leading-[1.65] font-normal m-0">
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
