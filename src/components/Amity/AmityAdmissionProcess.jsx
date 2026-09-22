"use client";

import React from "react";

export default function AmityAdmissionProcess() {
  const steps = [
    {
      num: 1,
      title: "Submit Form",
      desc: "Fill in and submit your application form online",
      themeColor: "text-[#ff7a00]",
      borderColor: "border-[#ff7a00]",
      bottomBorder: "border-b-[4px] border-[#ff7a00]",
      cardBg: "bg-[#fff8f0]",
    },
    {
      num: 2,
      title: "Expert's Counseling",
      desc: "You will receive a call from our expert counselor",
      themeColor: "text-[#0066cc]",
      borderColor: "border-[#0066cc]",
      bottomBorder: "border-b-[4px] border-[#0066cc]",
      cardBg: "bg-[#f0f7ff]",
    },
    {
      num: 3,
      title: "Choose University",
      desc: "Select the course & university according to your interest",
      themeColor: "text-[#e91e63]",
      borderColor: "border-[#e91e63]",
      bottomBorder: "border-b-[4px] border-[#e91e63]",
      cardBg: "bg-[#fff0f5]",
    },
    {
      num: 4,
      title: "Online Payment",
      desc: "You need to make a smooth online fee submission",
      themeColor: "text-[#10b981]",
      borderColor: "border-[#10b981]",
      bottomBorder: "border-b-[4px] border-[#10b981]",
      cardBg: "bg-[#f0fff4]",
    },
    {
      num: 5,
      title: "Document Submit",
      desc: "You need to upload all the required verified documents.",
      themeColor: "text-[#8b5cf6]",
      borderColor: "border-[#8b5cf6]",
      bottomBorder: "border-b-[4px] border-[#8b5cf6]",
      cardBg: "bg-[#f8f4ff]",
    },
    {
      num: 6,
      title: "Admission Confirm",
      desc: "Get Confirmation on your Email & Whatsapp",
      themeColor: "text-[#ff7a00]",
      borderColor: "border-[#ff7a00]",
      bottomBorder: "border-b-[4px] border-[#ff7a00]",
      cardBg: "bg-[#fff8f0]",
    },
  ];

  return (
    <section id="admission" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#08417b] tracking-tight leading-tight">
            How to Apply for Amity University Online Courses
          </h2>
          <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            The admission process for Amity University course admissions is very simple and
            user-friendly. Here's a step-by-step guide to enrolling in a degree course at the
            university :
          </p>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-4.5">
          {steps.map((st) => (
            <div
              key={st.num}
              className={`${st.cardBg} ${st.bottomBorder} rounded-xl p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all duration-200 group`}
            >
              {/* Circular Step Number */}
              <div
                className={`w-12 h-12 rounded-full border-2 ${st.borderColor} bg-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
              >
                <span className={`text-base font-black ${st.themeColor}`}>{st.num}</span>
              </div>

              {/* Step Title */}
              <h3 className="text-sm font-black text-slate-900 mt-4 mb-2 tracking-tight leading-snug">
                {st.title}
              </h3>

              {/* Step Description */}
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
