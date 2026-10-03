"use client";

import React from "react";
import Image from "next/image";
import { Download, Clock } from "lucide-react";

export default function ShooliniGrid({ programmes, brand = {}, universityName, onSelectCourseForBrochure, onOpenApply }) {
  return (
    <section id="program" className="py-6 sm:py-8 bg-white select-none">
      <div className="max-w-[980px] mx-auto px-4 sm:px-5">
        <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-center text-[#000000] mb-5 sm:mb-6 tracking-tight">
          {brand.programmesTitle || `${universityName} Courses`}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {programmes.map((c, idx) => (
            <div
              key={c.id || c.code || idx}
              className="bg-[#f7f7f7] rounded-[5px] overflow-hidden shadow-[0_0_5px_2px_#e8e8e8] flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-[2.4/1] overflow-hidden rounded-t-[5px] bg-[#f7f7f7]">
                  <Image
                    src={c.image || "/assets/shoolini/mba-shoolini.webp"}
                    alt={c.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                  />
                </div>

                <div className="p-3 sm:p-3.5">
                  <h3 className="text-[13.5px] sm:text-[14px] font-semibold text-[#4d4d4d] m-0 mb-1 leading-snug">
                    {c.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-[#4d4d4d] font-normal mb-1.5">
                    <Clock className="w-3 h-3 text-[#4d4d4d] shrink-0" />
                    <span>{c.duration || "24 Months"}</span>
                  </div>
                  <p className="text-[11px] sm:text-[11.5px] text-[#4d4d4d] leading-[1.35] m-0 font-normal">
                    {c.description}
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 pt-0 grid grid-cols-2 gap-1.5 mt-auto">
                <button
                  type="button"
                  onClick={() => onOpenApply?.(c.code || c.title)}
                  className="py-1.5 px-1.5 rounded-[4px] text-white font-medium text-[11px] sm:text-[11.5px] flex items-center justify-center gap-1 cursor-pointer transition-all hover:opacity-95 shadow-xs border-none active:scale-95 whitespace-nowrap"
                  style={{ background: brand.themeGradient || "linear-gradient(to right, #fd202a, #ff4be5)" }}
                >
                  <span>Apply now</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                  className="py-1.5 px-1 rounded-[4px] text-[#fd202a] font-medium text-[10.5px] sm:text-[11px] flex items-center justify-center gap-0.5 cursor-pointer transition-all hover:bg-red-50 shadow-xs border border-[#fd202a] active:scale-95 whitespace-nowrap bg-transparent"
                >
                  <span>Download Brochure</span>
                  <Download className="w-2.5 h-2.5 stroke-[2.2] shrink-0" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
