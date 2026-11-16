"use client";

import React from "react";
import Image from "next/image";
import { IIM_ELIGIBILITY, iimImg } from "./constants";

export default function IimEligibility({ onOpenApply }) {
  return (
    <section
      id="eligibility"
      className="w-full relative text-white py-12 sm:py-16 overflow-hidden select-none bg-[#15478a]"
    >
      {/* Desktop Background Image (Full width campus with blue tone matching live site) */}
      <Image
        src={iimImg("benefit-bg.webp")}
        alt="Eligibility Background"
        fill
        sizes="(max-width: 768px) 0vw, 100vw"
        className="hidden md:block object-cover object-center pointer-events-none"
      />

      {/* Mobile Background Image */}
      <Image
        src={iimImg("mobile-bg-for-benefits.webp")}
        alt="Eligibility Background Mobile"
        fill
        sizes="(max-width: 768px) 100vw, 0vw"
        className="md:hidden object-cover object-top pointer-events-none"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Bullets & Button */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2 className="text-[24px] sm:text-[30px] md:text-[34px] font-black text-white leading-tight m-0 mb-6">
              {IIM_ELIGIBILITY.title}
            </h2>

            {/* 4 Bullet Points */}
            <div className="flex flex-col gap-4 mb-7 max-w-[620px]">
              {IIM_ELIGIBILITY.items.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-white m-0 flex items-center gap-2">
                    <span className="text-[#0CB1EF] font-black text-[18px]">→</span>
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-white/90 text-[12.5px] sm:text-[13px] leading-relaxed m-0 mt-1 pl-5 font-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Free Counseling Button */}
            <button
              type="button"
              onClick={() => onOpenApply?.("Eligibility", "Get 100% Free Counseling")}
              className="py-2.5 sm:py-3 px-6 sm:px-7 rounded-full bg-[#0CB1EF] hover:bg-[#0aa0d8] text-white font-bold text-[13.5px] sm:text-[14px] border-none shadow-md cursor-pointer active:scale-98 transition-all"
            >
              Get 100% Free Counseling
            </button>
          </div>

          {/* Mobile Spacer to reveal the model baked into the bottom of mobile-bg-for-benefits.webp */}
          <div className="lg:hidden w-full min-h-[340px] sm:min-h-[400px] pointer-events-none" />

          {/* Desktop Spacer Column for the model baked into benefit-bg.webp */}
          <div className="hidden lg:block lg:col-span-5 min-h-[460px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

