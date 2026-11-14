"use client";

import React from "react";
import { SMU_STATS } from "./constants";

export default function SmuStats() {
  return (
    <section className="py-10 sm:py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {SMU_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-2xl bg-[#fffdfa] border border-[#fef0e4] hover:shadow-md transition-shadow"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#f58220] tracking-tight">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-700 mt-2 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

