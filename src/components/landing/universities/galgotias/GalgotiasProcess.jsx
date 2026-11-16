"use client";

import React from "react";

const ADMISSION_STEPS = [
  {
    num: 1,
    title: "Submit Form",
    desc: "Fill in and submit your application form online",
    cardBg: "bg-[#fff4e9]",
    borderColor: "border-[#ff8c32]",
    textColor: "text-[#ff8c32]",
    themeColor: "#ff8c32",
  },
  {
    num: 2,
    title: "Expert's Counseling",
    desc: "You will receive a call from our expert counselor",
    cardBg: "bg-[#f2f8ff]",
    borderColor: "border-[#0b5ed7]",
    textColor: "text-[#0b5ed7]",
    themeColor: "#0b5ed7",
  },
  {
    num: 3,
    title: "Choose University",
    desc: "Select the course & university according to your interest",
    cardBg: "bg-[#fff1f6]",
    borderColor: "border-[#ff2d6f]",
    textColor: "text-[#ff2d6f]",
    themeColor: "#ff2d6f",
  },
  {
    num: 4,
    title: "Online Payment",
    desc: "You need to make a smooth online fee submission",
    cardBg: "bg-[#effff5]",
    borderColor: "border-[#1faa59]",
    textColor: "text-[#1faa59]",
    themeColor: "#1faa59",
  },
  {
    num: 5,
    title: "Document Submit",
    desc: "You need to upload all the required verified documents.",
    cardBg: "bg-[#f9f0ff]",
    borderColor: "border-[#8e2de2]",
    textColor: "text-[#8e2de2]",
    themeColor: "#8e2de2",
  },
  {
    num: 6,
    title: "Admission Confirm",
    desc: "Get Confirmation on your Email & Whatsapp",
    cardBg: "bg-[#fff4e9]",
    borderColor: "border-[#ff8c32]",
    textColor: "text-[#ff8c32]",
    themeColor: "#ff8c32",
  },
];

export default function GalgotiasProcess() {
  return (
    <section
      id="admission"
      className="w-full bg-white py-8 sm:py-10 lg:py-12 px-4 sm:px-5 lg:px-6 select-none scroll-mt-20 text-center"
    >
      {/* Heading */}
      <h2 className="text-[#111111] font-bold text-[22px] sm:text-[26px] md:text-[30px] leading-tight text-center m-0 mb-2">
        How Can One Apply To Galgotias University Online?
      </h2>

      {/* Subtitle */}
      <p className="max-w-[920px] mx-auto pt-1 pb-5 sm:pb-7 text-[#555555] text-[12.5px] sm:text-[13.5px] leading-relaxed text-center m-0">
        Galgotias University online admission process is quite simple and convenient. Learners get an opportunity to learn accessibly and get a worldwide recognised degree. They can enrol in Galgotias University Apply Online through the following steps.
      </p>

      {/* 6 Steps Grid - Full Width across screen without max-w container constraint (exact Amity/Manipal structure) */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-4 w-full">
        {ADMISSION_STEPS.map((item) => (
          <div
            key={item.num}
            className={`relative ${item.cardBg} rounded-[14px] px-3.5 py-4 sm:py-5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] flex flex-col items-center text-center`}
          >
            {/* Step Number Circle */}
            <div
              className={`w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full border-[2.5px] sm:border-[3px] bg-white font-bold text-[18px] sm:text-[19px] flex items-center justify-center mx-auto shrink-0 mb-1.5 ${item.borderColor} ${item.textColor}`}
            >
              {item.num}
            </div>

            {/* Title */}
            <h4 className="text-black font-semibold text-[14.5px] sm:text-[15px] mt-2 mb-1.5 leading-snug tracking-tight">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-[#444444] text-[11.5px] sm:text-[12px] leading-[1.35] m-0 max-w-[200px]">
              {item.desc}
            </p>

            {/* Bottom Color Bar */}
            <span
              className="absolute bottom-0 left-0 right-0 h-[4px] sm:h-[5px] rounded-b-[14px]"
              style={{ backgroundColor: item.themeColor }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
