"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, GraduationCap, Download, ArrowRight } from "lucide-react";

export default function MuGrid({
  programmes = [],
  brand = {},
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const [activeCategory, setActiveCategory] = useState("Master");

  const titleLine1 = brand.programmesTitle || "MANGALAYATAN UNIVERSITY ONLINE COURSES";
  const titleLine2 = brand.programmesSubtitle || null;

  const filtered = programmes.filter((c) => {
    if (activeCategory === "Master") {
      return (
        c.category === "Master" ||
        c.level?.toLowerCase().includes("post") ||
        c.title?.toLowerCase().includes("master") ||
        c.code?.toLowerCase().startsWith("m")
      );
    }
    if (activeCategory === "Bachelor") {
      return (
        c.category === "Bachelor" ||
        c.level?.toLowerCase().includes("grad") ||
        c.title?.toLowerCase().includes("bachelor") ||
        c.code?.toLowerCase().startsWith("b")
      );
    }
    return true;
  });

  return (
    <section
      id="program"
      data-section="program"
      className={`programmes-section py-8 sm:py-12 select-none ${brand.programmesSectionClassName || ""}`}
      style={{
        backgroundColor: brand.programmesBg || "#f8f9fa",
        ...brand.programmesSectionStyle,
      }}
    >
      <div className={`max-w-[1240px] mx-auto px-4 sm:px-6 ${brand.programmesContainerClassName || ""}`}>
        {/* Section Heading */}
        <h2
          className={`text-center font-bold text-[#193579] uppercase tracking-wide m-0 ${
            brand.programmesTitleClassName || "text-[24px] sm:text-[28px] lg:text-[30px]"
          }`}
          style={brand.programmesTitleStyle}
        >
          {titleLine1}
        </h2>
        {titleLine2 && (
          <h3
            className={`text-center font-medium text-[#193579] uppercase ${
              brand.programmesSubtitleClassName || "text-[18px] sm:text-[22px] lg:text-[25px] tracking-wider mt-1 mb-6 sm:mb-8"
            }`}
            style={brand.programmesSubtitleStyle}
          >
            {titleLine2}
          </h3>
        )}

        {/* Master / Bachelor Tabs */}
        <div className={`flex justify-center gap-3 ${brand.programmesTabsClassName || "mb-4 sm:mb-5 mt-4"}`}>
          {["Master", "Bachelor"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveCategory(tab)}
              className={`px-6 sm:px-7 py-1.5 sm:py-2 rounded-[5px] font-medium text-[13px] sm:text-[14px] transition-all cursor-pointer border-none ${
                activeCategory === tab
                  ? brand.programmesTabActiveClass || "bg-[#F97316] text-white shadow-xs"
                  : brand.programmesTabInactiveClass || "bg-[#dcdcdc] text-black hover:bg-[#d0d0d0]"
              }`}
              style={activeCategory === tab ? brand.programmesTabActiveStyle : brand.programmesTabInactiveStyle}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((c, idx) => {
            const isPostGrad =
              c.category === "Master" ||
              c.level?.toLowerCase().includes("post") ||
              c.title?.toLowerCase().includes("master") ||
              c.code?.toLowerCase().startsWith("m");

            const durationText = c.duration || (isPostGrad ? "2 Years" : "3 Years");
            const eligibilityText = c.eligibility || (isPostGrad ? "Bachelor Degree" : "12th Passed");
            const cardRadius = brand.programmesCardRadius || "rounded-[6px]";

            return (
              <div
                key={`${c.id || c.code}-${idx}`}
                className={`bg-white ${cardRadius} overflow-hidden shadow-[0_3px_15px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all flex flex-col justify-between border border-[#ededed] group ${
                  brand.programmesCardClassName || ""
                }`}
                style={brand.programmesCardStyle}
              >
                <div>
                  {/* Course Banner Image */}
                  <div
                    className={`relative w-full overflow-hidden bg-slate-100 ${
                      brand.programmesCardImageClassName || "aspect-[16/7.8]"
                    }`}
                  >
                    <Image
                      src={c.image || "/assets/mu/mba-mu.webp"}
                      alt={c.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    />
                  </div>

                  {/* Card Content */}
                  <div className={`pb-0.5 ${brand.programmesCardBodyClassName || "p-3.5 sm:p-4 pt-3"}`}>
                    <h3
                      className={`text-[#0a3e8c] m-0 mb-0.5 leading-tight tracking-tight ${
                        brand.programmesCardTitleClassName || "text-[25px] sm:text-[27px] font-bold"
                      }`}
                    >
                      Online {c.code || c.id?.toUpperCase() || c.title}
                    </h3>
                    <div
                      className={`text-[#111111] mb-2 line-clamp-1 ${
                        brand.programmesCardSubtitleClassName || "text-[13px] sm:text-[13.5px] font-bold"
                      }`}
                    >
                      {c.title}
                    </div>

                    {/* Duration & Eligibility */}
                    <div className="grid grid-cols-2 gap-2 my-1.5 text-[12px] sm:text-[12.5px]">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-black shrink-0" />
                          <span className="text-[#f97316] font-bold">Duration :</span>
                        </div>
                        <div className="font-bold text-[#111111] text-[12px] sm:text-[12.5px] pl-5 mt-0.5">
                          {durationText}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <GraduationCap className="w-4 h-4 text-black shrink-0" />
                          <span className="text-[#f97316] font-bold">Eligibility :</span>
                        </div>
                        <div className="font-bold text-[#111111] text-[12px] sm:text-[12.5px] pl-5.5 mt-0.5">
                          {eligibilityText}
                        </div>
                      </div>
                    </div>

                    <p
                      className={`text-[#333333] leading-[1.4] line-clamp-4 min-h-[46px] m-0 mb-2 ${
                        brand.programmesCardDescClassName || "text-[12px] sm:text-[12.5px]"
                      }`}
                    >
                      {c.description}
                    </p>
                  </div>
                </div>

                {/* Thin divider & Dual Pill Action Buttons */}
                <div className={brand.programmesCardFooterClassName || "px-3.5 sm:px-4 pb-3"}>
                  <hr className="border-t border-slate-200 my-2" />
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                      className={`flex-1 py-1.5 sm:py-2 px-2.5 rounded-full font-bold whitespace-nowrap transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs ${
                        brand.programmesCardBtn1Class ||
                        "border-[1.5px] border-[#0a3e8c] text-[12px] sm:text-[12.5px] text-[#0a3e8c] bg-white hover:bg-slate-50"
                      }`}
                      style={brand.programmesCardBtn1Style}
                    >
                      <span>Download Brochure</span>
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenApply?.(c.code || c.title)}
                      className={`py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-full font-bold whitespace-nowrap transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs shrink-0 ${
                        brand.programmesCardBtn2Class ||
                        "border-none text-[12px] sm:text-[12.5px] text-white bg-[#f97316] hover:bg-[#ea580c]"
                      }`}
                      style={brand.programmesCardBtn2Style}
                    >
                      <span>Know More</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
