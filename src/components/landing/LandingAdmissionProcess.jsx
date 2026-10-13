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

  // UPES Dedicated Layout
  if (brand.slug === "upes" || brand.admissionLayout === "upes") {
    const steps = [
      {
        num: 1,
        title: "Submit Form",
        desc: "Fill in and submit your application form online",
        themeColor: "#ff8c32",
        cardBg: "#fff4e9",
      },
      {
        num: 2,
        title: "Expert's Counseling",
        desc: "You will receive a call from our expert counselor",
        themeColor: "#0b5ed7",
        cardBg: "#eaf2ff",
      },
      {
        num: 3,
        title: "Choose University",
        desc: "Select the course & university according to your interest",
        themeColor: "#ff2d6f",
        cardBg: "#ffeaf1",
      },
      {
        num: 4,
        title: "Online Payment",
        desc: "You need to make a smooth online fee submission",
        themeColor: "#1faa59",
        cardBg: "#e9f8ef",
      },
      {
        num: 5,
        title: "Document Submit",
        desc: "You need to upload all the required verified documents",
        themeColor: "#7e22ce",
        cardBg: "#f5ebff",
      },
      {
        num: 6,
        title: "Admission Confirm",
        desc: "Get Confirmation on your Email & Whatsapp",
        themeColor: "#ff8c32",
        cardBg: "#fff4e9",
      },
    ];

    const title =
      admissionProcess?.title ||
      brand.admissionTitle ||
      brand.admissionProcess?.title ||
      "How to Apply for UPES University Online Courses";

    const subtitle =
      admissionProcess?.subtitle ||
      brand.admissionSubtitle ||
      brand.admissionProcess?.subtitle ||
      "The admission process for UPES University course admissions is very simple and user-friendly. Here’s a step-by-step guide to enrolling in a degree course at the university :";

    return (
      <section className="py-12 sm:py-16 bg-white text-center select-none border-b border-slate-100" id="admission-process">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[20px] sm:text-[26px] lg:text-[30px] font-semibold text-[#193579] capitalize tracking-tight m-0 mb-3">
            {title}
          </h2>
          <p className="max-w-[900px] mx-auto text-[13px] sm:text-[14px] text-[#555555] leading-relaxed mb-8 sm:mb-12 font-normal m-0">
            {subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {steps.map((st) => (
              <div
                key={st.num}
                className="relative p-5 rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col items-center text-center transition-transform hover:-translate-y-1"
                style={{ backgroundColor: st.cardBg }}
              >
                {/* Number Circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-[20px] font-bold bg-white mb-4"
                  style={{
                    border: `3px solid ${st.themeColor}`,
                    color: st.themeColor,
                  }}
                >
                  {st.num}
                </div>

                <h4 className="text-[16px] font-semibold text-black mb-2 m-0 leading-snug">
                  {st.title}
                </h4>
                <p className="text-[12px] text-[#444444] leading-relaxed m-0 font-normal">
                  {st.desc}
                </p>

                {/* Colored Bottom Accent Bar */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[5px] rounded-b-[14px]"
                  style={{ backgroundColor: st.themeColor }}
                />
              </div>
            ))}
          </div>
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
    admissionProcess?.titleColor ||
    enrollmentProcess?.headingColor ||
    enrollmentProcess?.titleColor ||
    brand.admissionHeadingColor ||
    (isSmu ? "#193579" : "#1a365d");

  const sectionPadding =
    admissionProcess?.sectionPadding ||
    brand.admissionSectionClass ||
    "pt-9 sm:pt-12 lg:pt-16 pb-10 sm:pb-12 lg:pb-14";

  const isCu =
    brand.slug === "cu" ||
    brand.admissionLayout === "cu" ||
    activeUniversity.toLowerCase().includes("chandigarh");

  const containerClass =
    brand.admissionContainerClass ||
    admissionProcess?.containerClass ||
    (isCu || isSmu || brand.admissionFullWidth || admissionProcess?.fullWidth
      ? "w-full px-4 sm:px-6 lg:px-8 xl:px-10 max-w-none"
      : "w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1280px] mx-auto");

  return (
    <section
      id={brand.admissionProcessId || (brand.slug === "ggu" ? "how-to-apply" : "process")}
      className={`${sectionPadding} bg-white w-full select-none`}
    >
      <div className={containerClass}>
        {/* Heading */}
        {hasEnrollmentPrefix ? (
          <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-center tracking-tight mb-2.5 sm:mb-3.5 m-0 leading-[1.25]">
            <span
              style={{ color: prefixColor }}
              className={enrollmentProcess?.breakLine ? "block" : "inline"}
            >
              {titlePrefix}
            </span>{" "}
            <span
              style={{ color: highlightColor }}
              className={enrollmentProcess?.breakLine ? "block" : "inline"}
            >
              {titleHighlight}
            </span>
          </h2>
        ) : (
          <h2
            className={
              enrollmentProcess?.headingClassName ||
              admissionProcess?.headingClassName ||
              brand.admissionHeadingClass ||
              (isSmu
                ? "text-[17.5px] min-[360px]:text-[18.5px] min-[390px]:text-[20px] sm:text-[24px] lg:text-[28px] font-semibold text-center tracking-tight mb-2.5 sm:mb-3.5 m-0 leading-snug whitespace-pre-line"
                : "text-[26px] sm:text-[32px] lg:text-[36px] xl:text-[38px] font-bold text-center tracking-tight mb-2.5 sm:mb-3.5 m-0 leading-[1.2] whitespace-pre-line")
            }
            style={{ color: headingColor }}
          >
            {isSmu && !hasExplicitTitle ? (
              <>
                <span className="block sm:inline">How To Take Admission In</span>{" "}
                <span className="block sm:inline whitespace-nowrap sm:whitespace-normal">
                  {activeUniversity}?
                </span>
              </>
            ) : (
              headingText
            )}
          </h2>
        )}

        {/* Subtitle */}
        <p
          className={
            enrollmentProcess?.subtitleClassName ||
            admissionProcess?.subtitleClassName ||
            brand.admissionSubtitleClass ||
            "text-[13px] sm:text-[13.5px] lg:text-[14px] text-center text-black tracking-[0.3px] mb-5 sm:mb-7 lg:mb-8 max-w-[1150px] mx-auto font-normal leading-[1.65] m-0 px-3 sm:px-4 whitespace-pre-line"
          }
          style={enrollmentProcess?.subtitleStyle}
        >
          {subtitleText}
        </p>

        {/* Responsive Step Cards Grid */}
        <div
          className={
            enrollmentProcess?.gridClass ||
            brand?.admissionGridClass ||
            `grid ${
              rawSteps.length <= 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto"
                : isCu || brand.slug === "lpu" || brand.slug === "upes"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
            } gap-3.5 sm:gap-4 lg:gap-3.5 xl:gap-4.5 2xl:gap-5 w-full`
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
            const circleBg = extractColor(
              step.circleBg,
              "#ffffff"
            );
            const circleTextColor = extractColor(
              step.circleColor || step.circleTextColor,
              themeColor
            );
            const titleColor = extractColor(step.titleColor, "#111827");
            const descColor = extractColor(step.descColor, "#4b5563");

            return (
              <div
                key={num}
                className="rounded-[10px] overflow-hidden pt-5 pb-6 px-3 sm:px-3.5 text-center flex flex-col items-center justify-start h-full min-h-[170px] sm:min-h-[185px] transition-all duration-200 hover:-translate-y-1 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-md relative w-full"
                style={{
                  backgroundColor: cardBg,
                  borderBottom: `4px solid ${borderColor}`,
                }}
              >
                {/* Circular Number / Color Badge */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-[15px] sm:text-[16px] mb-3 sm:mb-3.5 shrink-0 select-none mx-auto bg-white"
                  style={{
                    backgroundColor: circleBg || "#ffffff",
                    border: `2px solid ${circleTextColor || themeColor}`,
                    color: circleTextColor || themeColor,
                  }}
                >
                  {num}
                </div>

                {/* Step Title */}
                <h3
                  className="text-[13.5px] sm:text-[14.5px] lg:text-[14px] xl:text-[15px] font-bold mb-1.5 sm:mb-2 leading-snug m-0 text-center"
                  style={{ color: titleColor || "#000000" }}
                >
                  {title}
                </h3>

                {/* Step Description */}
                {desc && (
                  <p
                    className="text-[11px] sm:text-[11.5px] lg:text-[11px] xl:text-[12px] leading-[1.45] font-normal m-0 text-center w-full px-0.5 text-slate-600"
                    style={{ color: descColor }}
                  >
                    {desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
