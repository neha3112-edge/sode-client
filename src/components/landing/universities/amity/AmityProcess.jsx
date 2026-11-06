"use client";

import React from "react";

const ADMISSION_STEPS = [
  {
    step: 1,
    title: "Submit Form",
    description: "Fill in and submit your application form online",
    bgColor: "bg-[#fff4e9]",
    accentBorder: "border-[#ff8c32]",
    accentText: "text-[#ff8c32]",
    bottomBar: "bg-[#ff8c32]",
  },
  {
    step: 2,
    title: "Expert's Counseling",
    description: "You will receive a call from our expert counselor",
    bgColor: "bg-white",
    accentBorder: "border-[#0b5ed7]",
    accentText: "text-[#0b5ed7]",
    bottomBar: "bg-[#0b5ed7]",
  },
  {
    step: 3,
    title: "Choose University",
    description: "Select the course & university according to your interest",
    bgColor: "bg-[#fff1f6]",
    accentBorder: "border-[#ff2d6f]",
    accentText: "text-[#ff2d6f]",
    bottomBar: "bg-[#ff2d6f]",
  },
  {
    step: 4,
    title: "Online Payment",
    description: "You need to make a smooth online fee submission",
    bgColor: "bg-[#effff5]",
    accentBorder: "border-[#1faa59]",
    accentText: "text-[#1faa59]",
    bottomBar: "bg-[#1faa59]",
  },
  {
    step: 5,
    title: "Document Submit",
    description: "You need to upload all the required verified documents.",
    bgColor: "bg-[#f9f0ff]",
    accentBorder: "border-[#8e2de2]",
    accentText: "text-[#8e2de2]",
    bottomBar: "bg-[#8e2de2]",
  },
  {
    step: 6,
    title: "Admission Confirm",
    description: "Get Confirmation on your Email & Whatsapp",
    bgColor: "bg-[#fff4e9]",
    accentBorder: "border-[#ff8c32]",
    accentText: "text-[#ff8c32]",
    bottomBar: "bg-[#ff8c32]",
  },
];

export default function AmityProcess() {
  return (
    <section className="w-full bg-white pt-0 sm:pt-1 pb-8 sm:pb-10 px-4 sm:px-5 text-center select-none">
      {/* Heading (.apply-section h2) */}
      <h2 className="text-[#193579] font-semibold text-[20px] md:text-[30px] leading-tight text-center mb-0">
        How to Apply for Amity University Online Courses
      </h2>

      {/* Description (.section-desc) - Compact bottom spacing */}
      <p className="max-w-[900px] mx-auto pt-2 pb-4 sm:pb-5 text-[#555555] text-[13px] sm:text-[14px] leading-relaxed text-center m-0">
        The admission process for Amity University course admissions is very simple and
        user-friendly. Here&apos;s a step-by-step guide to enrolling in a degree course at the
        university :
      </p>

      {/* Steps layout (.steps-wrapper: 6 cols on desktop, 3 on tablet, 1 on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-4 w-full">
        {ADMISSION_STEPS.map((item) => (
          <div
            key={item.step}
            className={`relative ${item.bgColor} rounded-[14px] px-3.5 py-4 sm:py-4.5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] flex flex-col items-center text-center`}
          >
            {/* Step Number Circle (.step-number) */}
            <div
              className={`w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full border-[2.5px] sm:border-[3px] bg-white font-bold text-[18px] sm:text-[19px] flex items-center justify-center mx-auto shrink-0 mb-1.5 ${item.accentBorder} ${item.accentText}`}
            >
              {item.step}
            </div>

            {/* Title (.step-card h4: tight margins, no large empty gaps) */}
            <h4 className="text-black font-semibold text-[15px] sm:text-[15.5px] mt-2 mb-1.5 leading-snug tracking-tight">
              {item.title}
            </h4>

            {/* Description (.step-card p) */}
            <p className="text-[#444444] text-[11.5px] sm:text-[12px] leading-[1.35] m-0 max-w-[200px]">
              {item.description}
            </p>

            {/* Bottom Color Border (.step-card::after) */}
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
