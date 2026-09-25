"use client";

import React from "react";

/**
 * Standard Step Styles for the 6 Admission Steps
 * Built-in so all landing pages share identical aesthetic CSS automatically.
 * Landing pages only need to pass content (title, desc), while retaining the option
 * to override colors if needed.
 */
const DEFAULT_STEP_STYLES = [
  { themeColor: "#ff7a00", borderColor: "#ff7a00", cardBg: "#fff6ee" },
  { themeColor: "#0066cc", borderColor: "#0066cc", cardBg: "#f0f7ff" },
  { themeColor: "#ff2a6d", borderColor: "#ff2a6d", cardBg: "#fff0f5" },
  { themeColor: "#16a34a", borderColor: "#16a34a", cardBg: "#f0faf3" },
  { themeColor: "#8b5cf6", borderColor: "#8b5cf6", cardBg: "#f7f2ff" },
  { themeColor: "#ff7a00", borderColor: "#ff7a00", cardBg: "#fff6ee" },
];

/**
 * Reusable Admission & Enrollment Process Section
 * Large, beautiful cards matching the reference design.
 * CSS is standardized inside the component; universities supply their content via JSON.
 */
export default function LandingAdmissionProcess({
  admissionSteps = [],
  enrollmentProcess = {},
  universityName = "University Online",
  brand = {},
}) {
  if (!admissionSteps || admissionSteps.length === 0) return null;

  // Title & Header Configuration
  const titlePrefix =
    enrollmentProcess?.titlePrefix ||
    brand?.enrollmentProcess?.titlePrefix ||
    "What Is The Enrollment Process Of";

  const titleHighlight =
    enrollmentProcess?.titleHighlight ||
    brand?.enrollmentProcess?.titleHighlight ||
    `${universityName} ?`;

  const prefixColor =
    enrollmentProcess?.prefixColor ||
    brand?.enrollmentProcess?.prefixColor ||
    "#13325b";

  const highlightColor =
    enrollmentProcess?.highlightColor ||
    brand?.enrollmentProcess?.highlightColor ||
    brand?.primaryColor ||
    "#ee3024";

  // Subtitle / Description Text
  const subtitleText =
    enrollmentProcess?.description ||
    brand?.enrollmentProcess?.description ||
    `The admission process of ${universityName} is quite simple, quick, and completely student-friendly. It is designed to ensure a seamless enrollment experience for learners applying to online degree programs. Here's a step-by-step guide to enrolling in an online course at the university.`;

  // Safely resolve color strings (handles hex, rgb, or tailwind arbitrary classes)
  const resolveColor = (c, fallback) => {
    if (!c || typeof c !== "string") return fallback;
    if (c.startsWith("#") || c.startsWith("rgb")) return c;
    const match = c.match(/\[(#[0-9a-fA-F]+)\]/);
    if (match) return match[1];
    return fallback;
  };

  // Safely resolve background (handles hex, rgb, or tailwind bg class)
  const resolveBg = (bg, fallback) => {
    if (!bg || typeof bg !== "string") return { isHex: true, value: fallback };
    if (bg.startsWith("#") || bg.startsWith("rgb")) return { isHex: true, value: bg };
    const match = bg.match(/bg-\[(#[0-9a-fA-F]+)\]/);
    if (match) return { isHex: true, value: match[1] };
    return { isHex: false, value: bg };
  };

  return (
    <section id="process" className="py-12 sm:py-14 lg:py-16 bg-white w-full select-none">
      <div className="w-full px-2 sm:px-4 lg:px-6 max-w-[1240px] mx-auto">
        {/* Two-tone Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-center tracking-tight mb-3 m-0">
          <span style={{ color: prefixColor }}>{titlePrefix} </span>
          <span style={{ color: highlightColor }}>{titleHighlight}</span>
        </h2>

        {/* Subtitle */}
        <p className="text-[13px] sm:text-[14px] text-center text-[#555555] mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto font-normal leading-relaxed m-0 px-2 sm:px-4">
          {subtitleText}
        </p>

        {/* Responsive Reusable Step Cards Grid - Large Cards Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 lg:gap-3.5">
          {admissionSteps.map((step, idx) => {
            const num = step.num || idx + 1;
            const defaultStyle = DEFAULT_STEP_STYLES[idx % DEFAULT_STEP_STYLES.length];

            const themeColor = resolveColor(step.themeColor, defaultStyle.themeColor);
            const borderColor = resolveColor(step.borderColor || step.themeColor, defaultStyle.borderColor);
            const bgInfo = resolveBg(step.cardBg, defaultStyle.cardBg);

            return (
              <div
                key={num}
                className={`${!bgInfo.isHex ? bgInfo.value : ""} rounded-[16px] sm:rounded-2xl overflow-hidden p-3.5 sm:p-4 pt-6 pb-5 text-center flex flex-col items-center justify-start h-full min-h-[165px] sm:min-h-[175px] transition-all duration-200 hover:-translate-y-1 shadow-2xs hover:shadow-xs relative`}
                style={{
                  backgroundColor: bgInfo.isHex ? bgInfo.value : undefined,
                  borderBottom: `4px solid ${borderColor}`,
                }}
              >
                {/* Circular Number Badge */}
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 bg-white flex items-center justify-center font-bold text-lg sm:text-xl mb-3.5 shrink-0 shadow-2xs select-none"
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  {num}
                </div>

                {/* Step Title */}
                <h3 className="text-[15px] sm:text-[15.5px] font-bold text-[#111111] mb-2 leading-snug m-0 text-center">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[12px] sm:text-[12.5px] text-[#444444] leading-relaxed font-normal m-0 text-center">
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
