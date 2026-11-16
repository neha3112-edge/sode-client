"use client";

import React from "react";
import { GGU_STATS } from "./constants";

export default function GguStats() {
  return (
    <section className="w-full bg-[#002f5e] text-white py-8 sm:py-10 border-t border-b border-[#003d7a] select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {GGU_STATS.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-[28px] sm:text-[34px] md:text-[38px] font-black tracking-tight text-white leading-none mb-1.5">
                {item.value}
              </span>
              <span className="text-[12px] sm:text-[13px] md:text-[13.5px] font-medium text-neutral-300 max-w-[190px] leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

