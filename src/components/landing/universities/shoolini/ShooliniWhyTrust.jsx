"use client";

import React from "react";
import { SHOOLINI_WHY_TRUST } from "./constants";

export default function ShooliniWhyTrust() {
  return (
    <section id="why-trust" className="w-full pt-12 sm:pt-16 pb-0 bg-white select-none">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-6 sm:mb-8">
        <h2 className="text-[#fd202a] font-black text-2xl sm:text-3xl md:text-[34px] tracking-tight leading-none m-0">
          Why Students Trust
        </h2>
        <h3 className="text-gray-900 font-bold text-base sm:text-lg md:text-[20px] leading-tight mt-1 sm:mt-1.5 m-0">
          Shoolini University Online
        </h3>
      </div>

      {/* Edge-to-Edge 2x2 Checkerboard Grid on Desktop & Mobile */}
      <div className="w-full grid grid-cols-2 gap-0">
        {SHOOLINI_WHY_TRUST.map((item, idx) => {
          const isRed = item.theme === "red";
          return (
            <div
              key={idx}
              className={`p-5 sm:p-8 md:p-12 lg:px-20 lg:py-14 xl:px-28 xl:py-16 flex flex-col justify-center ${
                isRed
                  ? "bg-[#fd202a] text-white"
                  : "bg-[#fffdf8] text-gray-900"
              }`}
            >
              <div className="max-w-[560px]">
                <h4
                  className={`font-extrabold text-[15px] sm:text-lg md:text-xl lg:text-[22px] m-0 mb-2 sm:mb-3.5 leading-snug ${
                    isRed ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </h4>
                <p
                  className={`text-xs sm:text-[13px] md:text-[14px] leading-relaxed m-0 font-normal ${
                    isRed ? "text-white/95" : "text-gray-800"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
