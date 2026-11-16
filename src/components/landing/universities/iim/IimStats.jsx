"use client";

import React from "react";
import Image from "next/image";
import { IIM_STATS, iimImg } from "./constants";

export default function IimStats() {
  return (
    <section className="w-full bg-[#FFF0B5] py-5 sm:py-6 select-none border-y border-[#ffe28a]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
          {IIM_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 sm:gap-3.5 justify-center sm:justify-start"
            >
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center">
                <Image
                  src={iimImg(stat.icon)}
                  alt={stat.label}
                  width={48}
                  height={48}
                  className="w-9 sm:w-11 h-auto object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>

              {/* Number & Label */}
              <div className="flex flex-col">
                <span className="text-[20px] sm:text-[24px] lg:text-[26px] font-black text-[#17479E] leading-none">
                  {stat.number}
                </span>
                <span className="text-[12px] sm:text-[13px] font-medium text-neutral-800 leading-tight mt-1">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

