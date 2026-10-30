"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";

export default function VguGrid({ programmes, brand = {}, onSelectCourseForBrochure, onOpenApply }) {
  const cfg = brand.programmesConfig || {};
  const primaryColor = brand.primaryColor || "#811811";

  const containerClass = cfg.containerClassName || "max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8";
  const gridClass = cfg.gridClassName || "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 justify-items-center";
  const cardClass = cfg.cardClassName || "bg-white rounded-[10px] overflow-hidden shadow-[0_12px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_18px_30px_rgba(0,0,0,0.24)] transition-all duration-300 flex flex-col justify-between group w-full max-w-[300px] sm:max-w-[260px] lg:max-w-[250px] relative border border-slate-100";

  const renderTitle = () => {
    const rawTitle = brand.programmesTitle;
    if (typeof rawTitle === "string" && rawTitle.includes("\n")) {
      const lines = rawTitle.split("\n");
      return lines.map((line, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <br className="sm:hidden" />}
          {idx > 0 && <span className="hidden sm:inline"> </span>}
          <span>{line}</span>
        </React.Fragment>
      ));
    }
    return rawTitle || (brand.name ? `${brand.name} Online Courses` : "Online Degree Courses");
  };

  return (
    <section id="program" className="w-full py-9 sm:py-14 bg-[#f7f7f7] border-b border-slate-200 select-none">
      <div className={containerClass}>
        <h2 className={cfg.headingClassName || brand.programmesHeadingClassName || "text-center text-[24px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-bold text-[#203061] tracking-tight mb-6 sm:mb-8 leading-[1.25] whitespace-normal sm:whitespace-nowrap"}>
          {renderTitle()}
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
                className={cardClass}
              >
                <div>
                  {/* Top Image + Duration Badge */}
                  <div className="relative h-[135px] sm:h-[140px] w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={c.image || "/assets/all_universities_images/vgu/mba-vgu.webp"}
                      alt={c.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 300px, 250px"
                    />
                    <span className="absolute top-0 right-0 bg-black text-white text-[11px] font-bold px-3 py-0.5 rounded-bl-[12px] shadow-xs select-none z-10">
                      {durationText}
                    </span>
                  </div>

                  {/* Content: Title, Subtitle, Description */}
                  <div className="pt-3 pb-2 px-3 text-center flex flex-col items-center">
                    <h3
                      className="text-[26px] sm:text-[28px] font-bold m-0 tracking-tight leading-none mb-1 text-[#811811]"
                    >
                      {c.code || c.id?.toUpperCase() || c.title}
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] font-semibold text-[#1f2937] mt-0 mb-2 leading-snug line-clamp-1">
                      {c.title}
                    </p>
                    <p className="text-[11px] text-[#4b5563] leading-[1.38] font-normal m-0 px-1 line-clamp-5">
                      {c.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="px-2.5 pb-3.5 pt-2 flex items-center justify-center gap-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                    className="bg-[#008000] hover:bg-[#006e00] active:scale-95 text-white font-bold text-[11px] sm:text-[11.5px] py-1.5 px-3 rounded-full inline-flex items-center justify-center gap-1 shadow-xs transition-all cursor-pointer border-none shrink-0"
                  >
                    <span>Get Brochure</span>
                    <Download className="w-3 h-3 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenApply?.(c.code || c.title)}
                    className="bg-[#811811] hover:opacity-95 active:scale-95 text-white font-bold text-[11px] sm:text-[11.5px] py-1.5 px-3.5 rounded-full inline-flex items-center justify-center shadow-xs transition-all cursor-pointer border-none shrink-0"
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
