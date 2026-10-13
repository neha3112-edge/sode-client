"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";

export default function VguGrid({ programmes, brand = {}, onSelectCourseForBrochure, onOpenApply }) {
  const cfg = brand.programmesConfig || {};
  const isSmall = brand.cardSize === "small" || cfg.cardSize === "small";

  const containerClass =
    cfg.containerClassName ||
    (isSmall
      ? "max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8"
      : "max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8");

  const gridClass =
    cfg.gridClassName ||
    (isSmall
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7");

  const cardClass =
    cfg.cardClassName ||
    (isSmall
      ? "bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between group"
      : "bg-white rounded-[14px] overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.16)] transition-all duration-300 flex flex-col justify-between group");

  const imageH = cfg.imageHeight || (isSmall ? "h-32 sm:h-36" : "h-44 sm:h-48");

  const titleClass =
    cfg.titleClassName ||
    (isSmall
      ? "text-[20px] sm:text-[22px] font-extrabold m-0 tracking-tight leading-tight"
      : "text-[26px] sm:text-[28px] font-extrabold m-0 tracking-tight leading-tight");

  const subTitleClass =
    cfg.subtitleClassName ||
    (isSmall
      ? "text-[11px] sm:text-[11.5px] font-semibold text-slate-800 mt-1 mb-1.5 line-clamp-1"
      : "text-[12px] sm:text-[12.5px] font-semibold text-slate-800 mt-1 mb-2.5 line-clamp-1");

  const descClass =
    cfg.descClassName ||
    (isSmall
      ? "text-[10px] sm:text-[10.5px] text-slate-600 leading-[1.45] line-clamp-3 min-h-[46px] m-0"
      : "text-[11px] sm:text-[11.5px] text-slate-600 leading-[1.55] line-clamp-4 min-h-[66px] m-0");

  const paddingClass = cfg.padding || (isSmall ? "p-3 sm:p-3.5" : "p-4 sm:p-5");

  const btnClass =
    cfg.buttonClassName ||
    (isSmall
      ? "font-bold text-[10.5px] sm:text-[11px] py-1.5 px-2 rounded-full inline-flex items-center justify-center gap-1 shadow-xs transition-all cursor-pointer border-none"
      : "font-bold text-[11.5px] sm:text-[12px] py-2 px-2 rounded-full inline-flex items-center justify-center gap-1 shadow-xs transition-all cursor-pointer border-none");

  const primaryColor = brand.primaryColor || "#811811";

  return (
    <section id="program" className="w-full py-10 sm:py-14 bg-[#f7f9fa] border-b border-slate-200">
      <div className={containerClass}>
        <h2 className="text-center text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-[#203061] tracking-tight mb-6 sm:mb-8">
          {brand.programmesTitle || (brand.name ? `${brand.name} Online Courses` : "Online Degree Courses")}
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
                  <div className={`relative ${imageH} w-full bg-slate-100 overflow-hidden`}>
                    <Image
                      src={c.image || brand.defaultProgrammeImage || "/assets/images/default-course.webp"}
                      alt={c.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="absolute top-2 right-2 bg-black/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] shadow-sm select-none">
                      {durationText}
                    </span>
                  </div>

                  <div className={`${paddingClass} text-center flex flex-col items-center`}>
                    <h3
                      className={titleClass}
                      style={{ color: primaryColor }}
                    >
                      {c.code || c.id?.toUpperCase() || c.title}
                    </h3>
                    <p className={subTitleClass}>
                      {c.title}
                    </p>
                    <p className={descClass}>
                      {c.description}
                    </p>
                  </div>
                </div>

                <div className={`${paddingClass} pt-0 grid grid-cols-2 gap-2 mt-1`}>
                  <button
                    type="button"
                    onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                    className={`bg-[#008000] hover:bg-[#006e00] active:scale-95 text-white ${btnClass}`}
                  >
                    <span>Get Brochure</span>
                    <Download className="w-3 h-3 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenApply?.(c.code || c.title)}
                    style={{ backgroundColor: primaryColor }}
                    className={`hover:opacity-90 active:scale-95 text-white ${btnClass}`}
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
