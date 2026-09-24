"use client";

import React from "react";

const STEP_COLORS = [
  { border: "#f97316", bg: "#fff7ee" },
  { border: "#2563eb", bg: "#f0f7ff" },
  { border: "#ec4899", bg: "#fdf2f8" },
  { border: "#10b981", bg: "#f0fdf4" },
  { border: "#8b5cf6", bg: "#faf5ff" },
  { border: "#f97316", bg: "#fff7ee" },
];

export default function UniversityAdmissionProcess({ admissionProcess }) {
  if (
    !admissionProcess ||
    !Array.isArray(admissionProcess.steps) ||
    admissionProcess.steps.length === 0
  ) {
    return null;
  }

  const { title, subTitle, steps = [] } = admissionProcess;

  const sortedSteps = [...steps].sort(
    (a, b) =>
      (a.order || 0) - (b.order || 0) ||
      (a.stepNumber || 0) - (b.stepNumber || 0)
  );

  return (
    <section
      id="admission-process"
      data-nav-label="Admission Process"
      className="scroll-mt-20 w-screen relative left-1/2 -translate-x-1/2 bg-white py-10 px-4 sm:px-6 lg:px-8 my-6"
    >
      <div className="w-full">
        {/* Title directly from backend */}
        {title && (
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#1e3a8a] text-center tracking-tight mb-2">
            {title}
          </h2>
        )}

        {/* 6 Step Cards in One Row Full Width (No Container) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 w-full">
          {sortedSteps.map((step, idx) => {
            const fallback = STEP_COLORS[idx % STEP_COLORS.length];
            const stepColor = step.color || fallback.border;
            const bgColor = fallback.bg;

            return (
              <div
                key={step._id || idx}
                style={{
                  backgroundColor: bgColor,
                  borderBottom: `4px solid ${stepColor}`,
                }}
                className="rounded-xl p-4 sm:p-5 text-center flex flex-col items-center justify-start min-h-[175px] shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Number Circle Badge */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-white shadow-2xs mb-3 shrink-0"
                  style={{
                    border: `2px solid ${stepColor}`,
                    color: stepColor,
                  }}
                >
                  {step.stepNumber || idx + 1}
                </div>

                {/* Step Title */}
                <h3 className="font-bold text-[14px] text-gray-900 leading-snug mb-1.5 whitespace-nowrap">
                  {step.title}
                </h3>

                {/* Step Description */}
                {step.description && (
                  <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                    {step.description}
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
