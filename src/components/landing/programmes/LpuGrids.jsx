"use client";

import React from "react";
import Image from "next/image";

export default function LpuGrids({ programmes, onSelectCourseForBrochure }) {
  const isPost = (c) =>
    c.category?.toLowerCase().includes("post") ||
    c.level?.toLowerCase().includes("post") ||
    ["MBA", "MCA", "MSC", "MCOM", "MA"].includes(c.code);

  const pgList = programmes.filter(isPost);
  const ugList = programmes.filter((c) => !isPost(c));

  const renderGroup = (list, subTitle, mainTitle) => (
    <div>
      <div className="pb-6">
        {mainTitle && (
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] text-[#b3b3b3] font-black tracking-tight leading-none m-0">
            {mainTitle}
          </h2>
        )}
        <p className="text-[25px] sm:text-[29px] lg:text-[32px] text-[#f58220] font-semibold tracking-tight leading-[1.25] mt-2 m-0">
          {subTitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {list.map((prog) => (
          <div
            key={prog.code}
            className="bg-[#f8f9fa] rounded-[14px] p-3.5 sm:p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-slate-200/70 flex flex-col justify-between gap-3 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="relative w-24 sm:w-28 h-24 sm:h-28 shrink-0 rounded-[10px] overflow-hidden bg-white">
                <Image src={prog.image} alt={prog.title} fill className="object-cover" sizes="120px" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <h2 className="text-xl sm:text-[22px] font-black text-slate-900 tracking-tight leading-tight m-0">
                  {prog.code}
                </h2>
                <h3 className="text-xs sm:text-[12.5px] font-bold text-slate-800 mt-0.5 mb-1 m-0 leading-tight">
                  {prog.title}
                </h3>
                <p className="text-[11px] sm:text-[12px] text-slate-600 leading-relaxed m-0">
                  {prog.desc || prog.description}
                </p>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => onSelectCourseForBrochure?.(prog.code)}
                className="bg-[#f58220] hover:bg-[#e07115] text-white font-semibold text-xs sm:text-[12.5px] px-4 py-2 rounded-[6px] shadow-xs inline-flex items-center gap-1.5 cursor-pointer border-none transition-colors active:scale-98"
              >
                <span>Download Brochure</span>
                <svg viewBox="0 0 512 512" className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
                  <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="program" className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {renderGroup(
          pgList,
          <>
            Post-Graduate Programs of LPU <br className="sm:hidden" />
            Online
          </>,
          "Explore Program"
        )}
        {renderGroup(
          ugList,
          <>
            Undergraduate Programs of LPU <br className="sm:hidden" />
            Online
          </>
        )}
      </div>
    </section>
  );
}
