"use client";

import React from "react";

/**
 * Standard Step Styles for the 6 Admission Steps
 * Built-in so all landing pages share identical aesthetic CSS automatically.
 */
export const DEFAULT_STEP_STYLES = [
  { themeColor: "#ff7a00", borderColor: "#ff7a00", cardBg: "#fff8f0" },
  { themeColor: "#0066cc", borderColor: "#0066cc", cardBg: "#f0f7ff" },
  { themeColor: "#ff2a6d", borderColor: "#ff2a6d", cardBg: "#fff0f5" },
  { themeColor: "#16a34a", borderColor: "#16a34a", cardBg: "#f0faf3" },
  { themeColor: "#8b5cf6", borderColor: "#8b5cf6", cardBg: "#f7f2ff" },
  { themeColor: "#ff7a00", borderColor: "#ff7a00", cardBg: "#fff8f0" },
];

/**
 * Global Default 6 Admission Steps used consistently across all university landing pages.
 */
export const GLOBAL_ADMISSION_STEPS = [
  {
    num: 1,
    title: "Submit Form",
    desc: "Fill in and submit your application form online",
    themeColor: "#ff7a00",
    borderColor: "#ff7a00",
    cardBg: "#fff8f0",
  },
  {
    num: 2,
    title: "Expert's Counseling",
    desc: "You will receive a call from our expert counselor",
    themeColor: "#0066cc",
    borderColor: "#0066cc",
    cardBg: "#f0f7ff",
  },
  {
    num: 3,
    title: "Choose University",
    desc: "Select the course & university according to your interest",
    themeColor: "#ff2a6d",
    borderColor: "#ff2a6d",
    cardBg: "#fff0f5",
  },
  {
    num: 4,
    title: "Online Payment",
    desc: "You need to make a smooth online fee submission",
    themeColor: "#16a34a",
    borderColor: "#16a34a",
    cardBg: "#f0faf3",
  },
  {
    num: 5,
    title: "Document Submit",
    desc: "You need to upload all the required verified documents.",
    themeColor: "#8b5cf6",
    borderColor: "#8b5cf6",
    cardBg: "#f7f2ff",
  },
  {
    num: 6,
    title: "Admission Confirm",
    desc: "Get Confirmation on your Email & Whatsapp",
    themeColor: "#ff7a00",
    borderColor: "#ff7a00",
    cardBg: "#fff8f0",
  },
];

/**
 * Reusable Global Admission & Enrollment Process Section (Full Width)
 * Standardized across all pages.
 * Works seamlessly out-of-the-box with global defaults or custom overrides.
 */
export default function LandingAdmissionProcess({
  admissionSteps,
  admissionProcess = null,
  enrollmentProcess = null,
  universityName,
  brand = {},
}) {
  if (brand.hideAdmissionProcess) return null;

  // Active steps with fallback to global 6 steps
  const activeSteps =
    admissionSteps && admissionSteps.length > 0
      ? admissionSteps
      : brand.admissionSteps && brand.admissionSteps.length > 0
      ? brand.admissionSteps
      : GLOBAL_ADMISSION_STEPS;

  const activeUniversity =
    universityName ||
    brand.name ||
    brand.universityName ||
    "University Online";

  const isSmu =
    brand.slug === "smu" ||
    activeUniversity.toLowerCase().includes("sikkim") ||
    activeUniversity.toLowerCase().includes("smu");

  // Heading & subtitle logic
  const hasEnrollmentPrefix = Boolean(
    enrollmentProcess?.titlePrefix || brand?.enrollmentProcess?.titlePrefix
  );

  const titlePrefix =
    enrollmentProcess?.titlePrefix ||
    brand?.enrollmentProcess?.titlePrefix ||
    "What Is The Enrollment Process Of";

  const titleHighlight =
    enrollmentProcess?.titleHighlight ||
    brand?.enrollmentProcess?.titleHighlight ||
    `${activeUniversity} ?`;

  const prefixColor =
    enrollmentProcess?.prefixColor ||
    brand?.enrollmentProcess?.prefixColor ||
    "#13325b";

  const highlightColor =
    enrollmentProcess?.highlightColor ||
    brand?.enrollmentProcess?.highlightColor ||
    brand?.primaryColor ||
    "#ee3024";

  const headingText =
    admissionProcess?.title ||
    brand.admissionTitle ||
    brand.admissionProcess?.title ||
    (isSmu
      ? `How To Take Admission In ${activeUniversity}?`
      : `How to Apply for ${activeUniversity.toLowerCase().includes("course") ? activeUniversity : `${activeUniversity} Courses`}`);

  const subtitleText =
    admissionProcess?.subtitle ||
    enrollmentProcess?.description ||
    brand?.enrollmentProcess?.description ||
    brand.admissionSubtitle ||
    brand.admissionProcess?.subtitle ||
    `Students can easily enrol in ${activeUniversity} courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.`;

  const headingColor =
    brand.admissionHeadingColor ||
    (isSmu ? "#193579" : brand.primaryColor || "#08417b");

  // Safely resolve color strings
  const resolveColor = (c, fallback) => {
    if (!c || typeof c !== "string") return fallback;
    if (c.startsWith("#") || c.startsWith("rgb")) return c;
    const match = c.match(/\[(#[0-9a-fA-F]+)\]/);
    if (match) return match[1];
    return fallback;
  };

  // Safely resolve background
  const resolveBg = (bg, fallback) => {
    if (!bg || typeof bg !== "string") return { isHex: true, value: fallback };
    if (bg.startsWith("#") || bg.startsWith("rgb")) return { isHex: true, value: bg };
    const match = bg.match(/bg-\[(#[0-9a-fA-F]+)\]/);
    if (match) return { isHex: true, value: match[1] };
    return { isHex: false, value: bg };
  };

  return (
    <section id="process" className="py-10 sm:py-14 lg:py-16 bg-white w-full select-none">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16 mx-auto">
        {/* Heading */}
        {hasEnrollmentPrefix ? (
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-center tracking-tight mb-3 m-0">
            <span style={{ color: prefixColor }}>{titlePrefix} </span>
            <span style={{ color: highlightColor }}>{titleHighlight}</span>
          </h2>
        ) : (
          <h2
            className="text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-center tracking-tight mb-3 m-0"
            style={{ color: headingColor }}
          >
            {headingText}
          </h2>
        )}

        {/* Subtitle */}
        <p className="text-[13px] sm:text-[14px] text-center text-[#4b5563] mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto font-normal leading-relaxed m-0 px-4">
          {subtitleText}
        </p>

        {/* Responsive Step Cards Grid - Full Width Across All Screen Sizes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-4 xl:gap-5 w-full">
          {activeSteps.map((step, idx) => {
            const num = step.num || idx + 1;
            const defaultStyle = DEFAULT_STEP_STYLES[idx % DEFAULT_STEP_STYLES.length];

            const themeColor = resolveColor(step.themeColor, defaultStyle.themeColor);
            const borderColor = resolveColor(step.borderColor || step.themeColor, defaultStyle.borderColor);
            const bgInfo = resolveBg(step.cardBg, defaultStyle.cardBg);

            return (
              <div
                key={num}
                className={`${!bgInfo.isHex ? bgInfo.value : ""} rounded-[16px] sm:rounded-2xl overflow-hidden p-3.5 sm:p-4 md:p-5 pt-6 pb-6 text-center flex flex-col items-center justify-start h-full min-h-[165px] sm:min-h-[175px] transition-all duration-200 hover:-translate-y-1 shadow-2xs hover:shadow-xs relative`}
                style={{
                  backgroundColor: bgInfo.isHex ? bgInfo.value : undefined,
                  borderBottom: `4px solid ${borderColor}`,
                }}
              >
                {/* Circular Number Badge */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 bg-white flex items-center justify-center font-bold text-[15px] sm:text-[16px] mb-3.5 shrink-0 shadow-2xs select-none"
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  {num}
                </div>

                {/* Step Title */}
                <h3 className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-[#111827] mb-2 leading-snug m-0 text-center">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[12px] sm:text-[12.5px] lg:text-[13px] text-[#4b5563] leading-[1.6] font-normal m-0 text-center">
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
