"use client";

import React from "react";
import { SMU_STATS } from "./constants";

export default function SmuStats() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[#f8f9fa]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 sm:gap-8 text-center">
          {SMU_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-black text-[#ff9800] tracking-tight leading-none">
                {stat.number}
              </div>
              <div className="text-[13px] sm:text-[14px] md:text-[14.5px] font-medium text-[#222222] mt-2.5 sm:mt-3">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
