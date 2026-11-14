"use client";

import React from "react";

const ADMISSION_STEPS = [
  {
    step: 1,
    title: "Submit Form",
    description: "Fill in and submit your application form online",
    bgColor: "bg-[#fff6ee]",
    accentBorder: "border-[#ff7a00]",
    accentText: "text-[#ff7a00]",
    bottomBar: "bg-[#ff7a00]",
  },
  {
    step: 2,
    title: "Expert's Counseling",
    description: "You will receive a call from our expert counselor",
    bgColor: "bg-[#f0f7ff]",
    accentBorder: "border-[#0066cc]",
    accentText: "text-[#0066cc]",
    bottomBar: "bg-[#0066cc]",
  },
  {
    step: 3,
    title: "Choose University",
    description: "Select the course & university according to your interest",
    bgColor: "bg-[#fff0f5]",
    accentBorder: "border-[#ff2a6d]",
    accentText: "text-[#ff2a6d]",
    bottomBar: "bg-[#ff2a6d]",
  },
  {
    step: 4,
    title: "Online Payment",
    description: "You need to make a smooth online fee submission",
    bgColor: "bg-[#f0faf3]",
    accentBorder: "border-[#16a34a]",
    accentText: "text-[#16a34a]",
    bottomBar: "bg-[#16a34a]",
  },
  {
    step: 5,
    title: "Document Submit",
    description: "You need to upload all the required verified documents.",
    bgColor: "bg-[#f7f2ff]",
    accentBorder: "border-[#8b5cf6]",
    accentText: "text-[#8b5cf6]",
    bottomBar: "bg-[#8b5cf6]",
  },
  {
    step: 6,
    title: "Admission Confirm",
    description: "Get Confirmation on your Email & Whatsapp",
    bgColor: "bg-[#fff6ee]",
    accentBorder: "border-[#ff7a00]",
    accentText: "text-[#ff7a00]",
    bottomBar: "bg-[#ff7a00]",
  },
];

export default function SmuProcess() {
  return (
    <section
      id="process"
      className="w-full bg-white py-6 sm:py-8 lg:py-9 px-4 sm:px-5 md:px-6 lg:px-8 scroll-mt-16 sm:scroll-mt-20 select-none text-center"
    >
      {/* Section Heading */}
      <h2 className="text-[#074a76] font-bold text-[22px] sm:text-[26px] md:text-[30px] leading-tight text-center mb-0">
        How To Take Admission In Sikkim Manipal University Online?
      </h2>

      {/* Description */}
      <p className="max-w-[920px] mx-auto pt-2 pb-4 sm:pb-5 text-[#555555] text-[12.5px] sm:text-[13.5px] leading-[1.38] text-center m-0">
        Admissions in Sikkim Manipal University Online is a convenient process. Any eligible candidate can enrol in their desired courses. Follow these steps to secure your admission:
      </p>

      {/* 6 Step Cards without narrow container constraint - spans full width matching Amity & Manipal */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-4 w-full">
        {ADMISSION_STEPS.map((item) => (
          <div
            key={item.step}
            className={`relative ${item.bgColor} rounded-[14px] px-3.5 py-4 sm:py-4.5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] flex flex-col items-center text-center`}
          >
            {/* Step Number Circle */}
            <div
              className={`w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full border-[2.5px] sm:border-[3px] bg-white font-bold text-[18px] sm:text-[19px] flex items-center justify-center mx-auto shrink-0 mb-1.5 ${item.accentBorder} ${item.accentText}`}
            >
              {item.step}
            </div>

            {/* Title */}
            <h4 className="text-black font-semibold text-[14.5px] sm:text-[15px] mt-1.5 mb-1 leading-tight tracking-tight">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-[#444444] text-[11px] sm:text-[11.5px] leading-[1.3] m-0 max-w-[200px]">
              {item.description}
            </p>

            {/* Bottom Color Accent Bar */}
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
