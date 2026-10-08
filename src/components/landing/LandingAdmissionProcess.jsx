"use client";

import React from "react";
import { Card } from "antd";

/**
 * Multi-colored palette matching Image 2 permanently.
 * Used as default colors if not overridden in JSON.
 */
export const DEFAULT_STEP_PALETTE = [
  { themeColor: "#ff7a00", borderColor: "#ff7a00", cardBg: "#fff8f0" }, // Step 1: Orange
  { themeColor: "#0066cc", borderColor: "#0066cc", cardBg: "#f0f7ff" }, // Step 2: Blue
  { themeColor: "#ff2a6d", borderColor: "#ff2a6d", cardBg: "#fff0f5" }, // Step 3: Pink
  { themeColor: "#16a34a", borderColor: "#16a34a", cardBg: "#f0faf3" }, // Step 4: Green
  { themeColor: "#8b5cf6", borderColor: "#8b5cf6", cardBg: "#f7f2ff" }, // Step 5: Purple
  { themeColor: "#ff7a00", borderColor: "#ff7a00", cardBg: "#fff8f0" }, // Step 6: Orange / Amber
];

/**
 * Global Default 6 Admission Steps used consistently across all university landing pages,
 * perfectly matching the multi-colored design in Image 2.
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
    desc: "You will get an admission confirmation on your Email",
    themeColor: "#8b5cf6",
    borderColor: "#8b5cf6",
    cardBg: "#f7f2ff",
  },
  {
    num: 6,
    title: "Admission Confirm",
    desc: "Get Confirmation on your Email , Whatsapp",
    themeColor: "#ff7a00",
    borderColor: "#ff7a00",
    cardBg: "#fff8f0",
  },
];

/**
 * Helper to safely extract color codes (supports "#fff8f0", "rgb(...)", and Tailwind classes like "bg-[#fff8f0]", "text-[#0066cc]")
 */
const extractColor = (val, fallback) => {
  if (!val || typeof val !== "string") return fallback;
  const trimmed = val.trim();
  if (trimmed.startsWith("#") || trimmed.startsWith("rgb") || trimmed.startsWith("hsl")) {
    return trimmed;
  }
  const match = trimmed.match(/\[(#[0-9a-fA-F]{3,8}|[a-zA-Z0-9(),\s.%-]+)\]/);
  if (match && match[1]) {
    return match[1];
  }
  return fallback;
};

/**
 * Reusable Global Admission & Enrollment Process Section (Full Width)
 * Permanent multi-colored design as shown in Image 2.
 * All card content, data, and colors can be overridden from JSON.
 */
export default function LandingAdmissionProcess({
  admissionSteps,
  admissionProcess = null,
  enrollmentProcess = null,
  universityName,
  brand = {},
}) {
  if (brand.hideAdmissionProcess) return null;

  // IIM Kozhikode Dedicated Layout
  if (brand.slug === "iim" || brand.admissionLayout === "iim") {
    const steps = [
      { num: 1, title: "Submit Form", desc: "Fill in and submit your application form online", colorClass: "orange" },
      { num: 2, title: "Expert's Counseling", desc: "You will receive a call from our expert counselor", colorClass: "blue" },
      { num: 3, title: "Choose University", desc: "Select the course & university according to your interest", colorClass: "pink" },
      { num: 4, title: "Online Payment", desc: "You need to make a smooth online fee submission", colorClass: "green" },
      { num: 5, title: "Document Submit", desc: "You need to upload all the required verified documents.", colorClass: "purple" },
      { num: 6, title: "Admission Confirm", desc: "Get Confirmation on your Email & Whatsapp", colorClass: "orange" },
    ];
    return (
      <section className="apply-section" id="how-to-apply">
        <h2>{brand.admissionTitle || "How to Apply for IIM Kozhikode University Online Courses"}</h2>
        <p className="section-desc">
          {brand.admissionSubtitle || "Students can easily enrol in IIM Kozhikode University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university."}
        </p>

        <div className="steps-wrapper">
          {steps.map((st) => (
            <div key={st.num} className={`step-card ${st.colorClass}`}>
              <div className="step-number">{st.num}</div>
              <h4>{st.title}</h4>
              <p>{st.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Active steps with fallback to global 6 steps
  const rawSteps =
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
  const hasExplicitTitle = Boolean(
    admissionProcess?.title ||
    brand.admissionTitle ||
    brand.admissionProcess?.title ||
    enrollmentProcess?.title
  );

  const hasEnrollmentPrefix =
    !hasExplicitTitle &&
    Boolean(enrollmentProcess?.titlePrefix || brand?.enrollmentProcess?.titlePrefix);

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
    enrollmentProcess?.title ||
    (isSmu
      ? `How To Take Admission In ${activeUniversity}?`
      : `How to Apply for ${
          activeUniversity.toLowerCase().includes("course")
            ? activeUniversity
            : `${activeUniversity} Courses`
        }`);

  const subtitleText =
    admissionProcess?.subtitle ||
    brand.admissionSubtitle ||
    brand.admissionProcess?.subtitle ||
    enrollmentProcess?.description ||
    brand?.enrollmentProcess?.description ||
    `The admission process for ${activeUniversity} course admissions is very simple and user-friendly. Here's a step-by-step guide to enrolling in a degree course at the university :`;

  const headingColor =
    admissionProcess?.headingColor ||
    brand.admissionHeadingColor ||
    (isSmu ? "#193579" : brand.primaryColor || "#08417b");

  return (
    <section
      id={brand.admissionProcessId || (brand.slug === "manipal" ? "apply" : brand.slug === "ggu" ? "how-to-apply" : "process")}
      className={`apply-section ${brand.admissionSectionClass || "pt-2 sm:pt-3 lg:pt-4 pb-10 sm:pb-12 lg:pb-14 bg-white w-full select-none"}`}
    >
      <div className="w-full px-3 sm:px-6 md:px-8 lg:px-8 xl:px-12 2xl:px-16 max-w-[1400px] mx-auto">
        {/* Heading */}
        {hasEnrollmentPrefix ? (
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-center tracking-tight mb-2.5 sm:mb-3 m-0">
            <span style={{ color: prefixColor }}>{titlePrefix} </span>
            <span style={{ color: highlightColor }}>{titleHighlight}</span>
          </h2>
        ) : (
          <h2
            className="text-[22px] sm:text-[26px] lg:text-[30px] xl:text-[32px] font-bold text-center tracking-tight mb-2.5 sm:mb-3 m-0 leading-tight"
            style={{ color: headingColor }}
          >
            {headingText}
          </h2>
        )}

        {/* Subtitle */}
        <p className="text-[12.5px] sm:text-[13.5px] lg:text-[14px] text-center text-[#555555] mb-5 sm:mb-6 lg:mb-7 max-w-[860px] mx-auto font-normal leading-relaxed m-0 px-2 sm:px-4">
          {subtitleText}
        </p>

        {/* Responsive Step Cards Grid */}
        <div
          className={
            (brand.admissionGridClass ? brand.admissionGridClass.replace(/\bgrid-cols-1\b/, "grid-cols-2") : null) ||
            (enrollmentProcess?.gridClass ? enrollmentProcess.gridClass.replace(/\bgrid-cols-1\b/, "grid-cols-2") : null) ||
            `grid ${
              rawSteps.length <= 4
                ? "grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto"
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
            } gap-2.5 sm:gap-3 lg:gap-2.5 xl:gap-3.5 2xl:gap-4 w-full`
          }
        >
          {rawSteps.map((step, idx) => {
            // Default multi-color palette cycle matching Image 2
            const defaultPalette = DEFAULT_STEP_PALETTE[idx % DEFAULT_STEP_PALETTE.length];

            // Flexible field support for JSON data (num/step/id, title/name/heading, desc/description/text/subtitle)
            const num = step.num || step.step || step.id || idx + 1;
            const title = step.title || step.name || step.heading || "";
            const desc = step.desc || step.description || step.subtitle || step.text || "";

            // Custom or default color assignments from JSON
            const themeColor = extractColor(step.themeColor || step.color, defaultPalette.themeColor);
            const borderColor = extractColor(
              step.borderColor || step.bottomBorderColor || step.bottomBorder,
              themeColor
            );
            const cardBg = extractColor(
              step.cardBg || step.bgColor || step.background,
              defaultPalette.cardBg
            );
            const circleBg = extractColor(step.circleBg, "#ffffff");
            const titleColor = extractColor(step.titleColor, "#111827");
            const descColor = extractColor(step.descColor, "#4b5563");

            return (
              <Card
                key={num}
                variant="borderless"
                styles={{ body: { padding: 0 } }}
                className="rounded-[14px] sm:rounded-2xl overflow-hidden px-2 py-3 sm:px-2.5 sm:py-3.5 lg:px-2 lg:py-3.5 xl:px-3 xl:py-4 text-center flex flex-col items-center justify-start h-full min-h-[160px] sm:min-h-[165px] lg:min-h-[165px] xl:min-h-[175px] transition-all duration-200 hover:-translate-y-1 shadow-2xs hover:shadow-xs relative"
                style={{
                  backgroundColor: cardBg,
                  borderBottom: `4px solid ${borderColor}`,
                }}
              >
                {/* Circular Number Badge */}
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-full border-2 flex items-center justify-center font-bold text-[14px] sm:text-[15px] lg:text-[14px] xl:text-[15px] mb-2 sm:mb-2.5 shrink-0 shadow-2xs select-none mx-auto"
                  style={{
                    backgroundColor: circleBg,
                    borderColor: themeColor,
                    color: themeColor,
                  }}
                >
                  {num}
                </div>

                {/* Step Title */}
                <h3
                  className="text-[13px] sm:text-[14px] lg:text-[13px] xl:text-[14.5px] 2xl:text-[15px] font-bold mb-1 sm:mb-1.5 leading-snug m-0 text-center"
                  style={{ color: titleColor }}
                >
                  {title}
                </h3>

                {/* Step Description */}
                {desc && (
                  <p
                    className="text-[11px] sm:text-[11.5px] lg:text-[11px] xl:text-[11.5px] 2xl:text-[12px] leading-[1.35] sm:leading-[1.4] font-normal m-0 text-center line-clamp-3 max-w-[190px] mx-auto"
                    style={{ color: descColor }}
                  >
                    {desc}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
