"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import { IIITB_STATS } from "./constants";

export default function IiitbStats() {
  return (
    <section className="w-full bg-[#2b2b2b] text-white py-10 sm:py-12 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {IIITB_STATS.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 sm:gap-4">
              {/* Circular White Icon Badge */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#01519a]" />
              </div>

              {/* Text Info */}
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-[22px] sm:text-[28px] font-black text-white m-0 leading-tight">
                  {stat.value}
                </h3>
                <p className="text-white/90 text-[12px] sm:text-[13px] leading-snug m-0 mt-0.5 font-normal">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

