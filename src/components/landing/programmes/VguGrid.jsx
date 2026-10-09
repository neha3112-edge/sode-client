"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";

export default function VguGrid({ programmes, brand = {}, onSelectCourseForBrochure, onOpenApply }) {
  const cfg = brand.programmesConfig || {};
  const primaryColor = brand.primaryColor || "#811811";

  const containerClass = cfg.containerClassName || "max-w-[1280px] mx-auto px-8 sm:px-10 lg:px-8";
  const gridClass = cfg.gridClassName || "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7";

  return (
    <section id="program" className="w-full py-9 sm:py-16 bg-[#f7f9fa] border-b border-slate-200 select-none">
      <div className={containerClass}>
        <h2 className="text-center text-[21px] sm:text-[26px] lg:text-[28px] font-bold text-[#203061] tracking-tight mb-6 sm:mb-10 leading-[1.25] whitespace-pre-line">
          {brand.programmesTitle ||
            "VGU Online |\nVivekananda Global University\nOnline Courses"}
        </h2>

        <div className={gridClass}>
          {programmes.map((c, idx) => {
            const isPostGrad =
              c.level?.toLowerCase().includes("post") ||
              c.title?.toLowerCase().includes("master") ||
              c.code?.toLowerCase().startsWith("m");
            const durationText = c.duration || (isPostGrad ? "24 Months" : "36 Months");

            return (
              <div
                key={`${c.id || c.code}-${idx}`}
                className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between group max-w-[340px] sm:max-w-none mx-auto w-full border border-slate-100/80"
              >
                <div>
                  {/* Top Image + Duration Badge */}
                  <div className="relative h-[185px] sm:h-[190px] w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={c.image || "/assets/all_universities_images/vgu/mba-vgu.webp"}
                      alt={c.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="absolute top-0 right-0 bg-black text-white text-[11px] font-bold px-3.5 py-1 rounded-bl-[12px] shadow-xs select-none">
                      {durationText}
                    </span>
                  </div>

                  {/* Content: Title, Subtitle, Description */}
                  <div className="pt-5 pb-3 px-4 text-center flex flex-col items-center">
                    <h3 className="text-[26px] sm:text-[28px] font-extrabold text-black m-0 tracking-tight leading-none mb-2">
                      {c.code || c.id?.toUpperCase() || c.title}
                    </h3>
                    <p className="text-[13px] sm:text-[13.5px] font-bold text-[#1f2937] mt-0 mb-3 leading-snug line-clamp-1">
                      {c.title}
                    </p>
                    <p className="max-w-[270px] mx-auto text-[11.5px] sm:text-[12px] text-[#475569] leading-[1.65] font-normal m-0 line-clamp-5">
                      {c.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="px-4 pb-5 pt-2 flex items-center justify-center gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                    className="bg-[#008000] hover:bg-[#006e00] active:scale-95 text-white font-bold text-[11.5px] sm:text-[12px] py-2 px-3.5 rounded-full inline-flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer border-none shrink-0"
                  >
                    <span>Get Brochure</span>
                    <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenApply?.(c.code || c.title)}
                    style={{ backgroundColor: primaryColor }}
                    className="hover:opacity-95 active:scale-95 text-white font-bold text-[11.5px] sm:text-[12px] py-2 px-4 rounded-[8px] inline-flex items-center justify-center shadow-xs transition-all cursor-pointer border-none shrink-0"
                  >
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
