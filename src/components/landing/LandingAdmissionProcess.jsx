"use client";

import React from "react";

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
 * Helper to normalize background color strings (supports "#fff8f0" and legacy "bg-[#fff8f0]")
 */
const getCardBg = (bg, fallback = "#fff8f0") => {
  if (!bg) return fallback;
  if (bg.startsWith("bg-[")) return bg.slice(4, -1);
  return bg;
};

/**
 * Reusable Global Admission & Enrollment Process Section (Full Width)
 * Standardized across all landing pages.
 */
export default function LandingAdmissionProcess({
  admissionSteps,
  admissionProcess = null,
  enrollmentProcess = null,
  universityName,
  brand = {},
}) {
  if (brand.hideAdmissionProcess) return null;

  const isGalgotias =
    brand.slug === "galgotias" ||
    brand.admissionLayout === "galgotias" ||
    brand.heroStyle === "galgotias";

  if (isGalgotias) {
    const title =
      admissionProcess?.title ||
      "Admission Process for Galgotias Online for 2026";
    const subtitle =
      admissionProcess?.subtitle ||
      "Here’s how you can apply for online courses at Galgotias University Online for 2026:";

    const steps = admissionProcess?.steps || [
      {
        step: "Step 1:",
        text: "Visit the official Galgotias Online website (keep in mind there are separate websites for online and on-campus programs).",
      },
      {
        step: "Step 2:",
        text: 'Click on the "Apply Now" button at the top right corner.',
      },
      {
        step: "Step 3:",
        text: "Fill in your basic personal and academic details. If you have a job, include that information as well.",
      },
      {
        step: "Step 4:",
        text: "Upload the required documents, including proof of eligibility and a recent passport-sized photo.",
      },
      {
        step: "Step 5:",
        text: "Submit the application form and pay the application fee. After your application is reviewed and your documents are confirmed, the university will send you an email with details about your enrollment and the next steps.",
      },
    ];

    return (
      <section id="admission" className="py-10 sm:py-14 bg-white select-none">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28">
          {/* 1. Admission Process for Galgotias Online */}
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0">
            {title}
          </h2>

          <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal mt-3 mb-6 sm:mb-8 max-w-6xl">
            {subtitle}
          </p>

          <div className="space-y-3.5 sm:space-y-4">
            {steps.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                <svg
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#22c55e] shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-[13.5px] sm:text-[14px] text-slate-800 leading-relaxed font-normal m-0">
                  <strong className="font-bold text-slate-900">
                    {item.step || `Step ${idx + 1}:`}
                  </strong>{" "}
                  {item.text || item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 2. How to Apply to Galgotias University Online With Us? */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0">
              {admissionProcess?.withUsTitle ||
                "How to Apply to Galgotias University Online With Us?"}
            </h2>

            <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal mt-3 mb-6 sm:mb-8 max-w-6xl">
              {admissionProcess?.withUsSubtitle ||
                "Here’s a simple guide to help you with Galgotias University online admission. Follow the steps below to complete your admission process quickly and easily."}
            </p>

            {/* 6 Step Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-4 xl:gap-5 w-full">
              {(
                admissionProcess?.withUsSteps || [
                  {
                    num: 1,
                    title: "Submit Form",
                    desc: "Fill out the form and submit your application online",
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
                    desc: "Select the course & university based on your interest",
                    themeColor: "#ff2a6d",
                    borderColor: "#ff2a6d",
                    cardBg: "#fff0f5",
                  },
                  {
                    num: 4,
                    title: "Online Payment",
                    desc: "You need to pay the required fee amount",
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
                    desc: "Get confirmation on your Email & WhatsApp",
                    themeColor: "#ff7a00",
                    borderColor: "#ff7a00",
                    cardBg: "#fff8f0",
                  },
                ]
              ).map((step, idx) => {
                const num = step.num || idx + 1;
                const themeColor = step.themeColor || "#ff7a00";
                const borderColor = step.borderColor || themeColor;
                const cardBg = step.cardBg || "#fff8f0";

                return (
                  <div
                    key={num}
                    className="rounded-[10px] sm:rounded-[12px] overflow-hidden p-3.5 sm:p-4 pt-5 pb-5 text-center flex flex-col items-center justify-start h-full min-h-[160px] sm:min-h-[170px] shadow-2xs hover:shadow-xs transition-all"
                    style={{
                      backgroundColor: cardBg,
                      borderBottom: `4px solid ${borderColor}`,
                    }}
                  >
                    {/* Circular Number Badge */}
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 bg-white flex items-center justify-center font-bold text-[15px] sm:text-[16px] mb-3 shrink-0 shadow-2xs select-none"
                      style={{ borderColor: themeColor, color: themeColor }}
                    >
                      {num}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-slate-900 mb-1.5 leading-snug m-0 text-center">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-[11px] sm:text-[11.5px] text-slate-600 leading-relaxed font-normal m-0 text-center">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Study Method of Galgotias Online */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0 mb-4 sm:mb-5">
              {admissionProcess?.studyMethodTitle ||
                "Study Method of Galgotias Online"}
            </h2>

            <ul className="space-y-2.5 sm:space-y-3 text-[13.5px] sm:text-[14px] text-slate-700 font-normal list-none p-0 m-0 max-w-6xl">
              {(
                admissionProcess?.studyMethodPoints || [
                  {
                    bold: "Advanced LMS Platform:",
                    text: "Uses an advanced Learning Management System as its E-Campus for live classes, course materials, and assignments. User-friendly interface allows students to access academic records, watch recorded lectures, and learn at their own pace.",
                  },
                  {
                    bold: "Blended Learning:",
                    text: "Combines live sessions and recorded lectures with industry-relevant, well-structured content designed for working professionals. Students receive printed self-learning materials at home alongside digital resources.",
                  },
                  {
                    bold: "Mentorship & Support:",
                    text: "Offers personalized mentorship from professors and industry leaders for portfolio building with real-world applications. Faculty are knowledgeable, approachable, and invested in student growth.",
                  },
                  {
                    bold: "Practical Focus:",
                    text: "Focuses on developing strategic thinking, communication, problem-solving, and digital collaboration skills with business and marketing applications.",
                  },
                  {
                    bold: "Flexible Assessment:",
                    text: "Conducts classes and examinations through the LMS platform with structured academic sessions starting in January and June.",
                  },
                ]
              ).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-slate-900 font-black text-base leading-none mt-0.5 select-none">
                    •
                  </span>
                  <span>
                    <strong className="text-slate-900 font-bold">
                      {item.bold}
                    </strong>{" "}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

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
    enrollmentProcess?.title ||
    brand?.enrollmentProcess?.title ||
    admissionProcess?.title ||
    brand.admissionTitle ||
    brand.admissionProcess?.title ||
    (isSmu
      ? `How To Take Admission In ${activeUniversity}?`
      : `How to Apply for ${
          activeUniversity.toLowerCase().includes("course")
            ? activeUniversity
            : `${activeUniversity} Courses`
        }`);

  const subtitleText =
    enrollmentProcess?.description ||
    brand?.enrollmentProcess?.description ||
    admissionProcess?.subtitle ||
    brand.admissionSubtitle ||
    brand.admissionProcess?.subtitle ||
    `Students can easily enrol in ${activeUniversity} courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.`;

  const headingColor =
    brand.admissionHeadingColor ||
    (brand.slug === "lpu" ? "#222222" : isSmu ? "#193579" : brand.primaryColor || "#08417b");

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
            const themeColor = step.themeColor || "#ff7a00";
            const borderColor = step.borderColor || themeColor;
            const cardBg = getCardBg(step.cardBg);

            return (
              <div
                key={num}
                className="rounded-[16px] sm:rounded-2xl overflow-hidden p-3.5 sm:p-4 md:p-5 pt-6 pb-6 text-center flex flex-col items-center justify-start h-full min-h-[165px] sm:min-h-[175px] transition-all duration-200 hover:-translate-y-1 shadow-2xs hover:shadow-xs relative"
                style={{
                  backgroundColor: cardBg,
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
