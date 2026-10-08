"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";

export default function LpuGrids({ programmes, brand = {}, onSelectCourseForBrochure }) {
  const isPost = (c) =>
    c.category?.toLowerCase().includes("post") ||
    c.level?.toLowerCase().includes("post") ||
    ["MBA", "MCA", "MSC", "MCOM", "MA"].includes(c.code);

  const pgList = programmes.filter(isPost);
  const ugList = programmes.filter(
    (c) => !isPost(c) || c.category?.toLowerCase().includes("under") || ["BBA", "BA", "BCA"].includes(c.code)
  );

  const pgTitle =
    brand.programmesPgSubtitle ||
    brand.programmesPgTitle ||
    (brand.name ? `Post-Graduate Programs of ${brand.name}` : "Post-Graduate Programs");

  const ugTitle =
    brand.programmesUgSubtitle ||
    brand.programmesUgTitle ||
    (brand.name ? `Undergraduate Programs of ${brand.name}` : "Undergraduate Programs");

  const mainHeader = brand.programmesMainTitle || brand.programmesTitle || "Explore Program";

  const renderGroup = (list, subTitle, mainTitle) => (
    <div>
      <div className="pb-6">
        {mainTitle && (
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] text-[#b3b3b3] font-black tracking-tight leading-none m-0">
            {mainTitle}
          </h2>
        )}
        <p className="text-base sm:text-xl text-[#f58220] font-bold mt-2 m-0">{subTitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((prog) => (
          <div
            key={prog.code}
            className="bg-white rounded-[12px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 hover:shadow-lg transition-shadow"
          >
            <div className="relative w-32 sm:w-36 h-32 sm:h-36 shrink-0 rounded-[10px] overflow-hidden bg-slate-50">
              <Image src={prog.image} alt={prog.title} fill className="object-cover" sizes="150px" />
            </div>
            <div className="flex-1 text-left space-y-1 w-full">
              <h2 className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight leading-none m-0">
                {prog.code}
              </h2>
              <h3 className="text-[11.5px] sm:text-xs font-bold text-slate-800 pt-1 pb-1.5 border-b border-slate-200 block w-full m-0 tracking-tight">
                {prog.title}
              </h3>
              <p className="text-[11.5px] sm:text-[12px] text-slate-600 pt-1 leading-relaxed m-0">
                {prog.desc || prog.description}
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onSelectCourseForBrochure?.(prog.code)}
                  className="bg-[#f58220] hover:bg-[#e07115] text-white font-bold text-[12px] px-4 py-2 rounded-[6px] shadow-xs inline-flex items-center gap-1.5 cursor-pointer border-none transition-colors"
                >
                  <span>Download Brochure</span>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="program" className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {renderGroup(pgList, pgTitle, mainHeader)}
        {renderGroup(ugList, ugTitle)}
      </div>
    </section>
  );
}
