"use client";

import React from "react";
import { SMU_PROCESS_STEPS } from "./constants";

export default function SmuProcess({ onOpenBrochure }) {
  return (
    <section className="py-14 sm:py-16 bg-[#fbfcfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a202c] tracking-tight">
            How to take admission in Sikkim Manipal University Online?
          </h2>
          <div className="w-20 h-1 bg-[#f58220] mx-auto mt-3 rounded-full" />
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Admissions in Sikkim Manipal University Online is a convenient process. Any eligible candidate can enrol in their desired courses. Follow these steps to secure your admission:
          </p>
        </div>

        {/* 6 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {SMU_PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className={`rounded-2xl p-5 border-2 ${step.borderColor} ${step.cardBg} flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-base shadow-sm mb-4"
                  style={{ backgroundColor: step.themeColor }}
                >
                  {String(step.num).padStart(2, "0")}
                </div>
                <h3 className={`font-bold text-base mb-2 ${step.textColor}`}>
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => onOpenBrochure?.("Sikkim Manipal University Online Admission")}
            className="inline-flex items-center gap-2 bg-[#074a76] hover:bg-[#063b5e] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer text-sm sm:text-base"
          >
            Start Your Admission Now »
          </button>
        </div>
      </div>
    </section>
  );
}

