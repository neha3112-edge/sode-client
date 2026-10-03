"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";

export default function LiverpoolProgrammes({
  programmes = [],
  brand = {},
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const heading = brand.programmesTitle || "Courses Offered in";
  const subHeading = brand.programmesSubtitle || "Liverpool Online MBA";

  return (
    <section id="courses_offered" className="py-12 sm:py-16 bg-[#ffffff] select-none scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-[26px] sm:text-[34px] font-bold text-[#111111] leading-tight m-0">
            {heading} <br />
            <span className="text-[#00408d]">{subHeading}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programmes.map((c, idx) => (
            <div
              key={c.id || idx}
              className="slide bg-white rounded-[10px] shadow-[0_0_8px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[18px] sm:text-[19px] font-bold text-[#111111] mb-2 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-[13px] text-[#444444] leading-relaxed line-clamp-3 mb-4">
                    {c.description}
                  </p>
                  <hr className="border-t border-slate-200 mb-4" />
                </div>
              </div>
              <div className="px-5 pb-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onOpenApply?.(c.title)}
                  className="w-full py-2.5 px-3 bg-[#00408d] text-white font-bold text-[13px] rounded-[5px] hover:brightness-110 active:scale-95 transition-all border-none cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <i className="fa fa-check text-white text-[11px]" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectCourseForBrochure?.(c.title)}
                  className="w-full py-2.5 px-3 bg-black text-white font-bold text-[13px] rounded-[5px] hover:bg-neutral-800 active:scale-95 transition-all border-none cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Get Brochure</span>
                  <Download className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
