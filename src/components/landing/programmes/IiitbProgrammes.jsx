"use client";

import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

export default function IiitbProgrammes({
  programmes = [],
  brand = {},
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const heading = brand.programmesTitle || "Courses Offered";
  const subHeading = brand.programmesSubtitle || (brand.name ? `By ${brand.name}` : "");

  return (
    <section
      id="main-courses"
      className="courses-section py-14 sm:py-16 bg-[#f9fafb] select-none scroll-mt-20"
    >
      <div className="courses-container max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="section-title text-[28px] sm:text-[32px] font-extrabold text-[#003b6f] m-0">
            {heading}
          </h2>
          {subHeading && (
            <p className="section-subtitle text-[15px] sm:text-[16px] text-[#555555] mt-1 m-0">
              {subHeading}
            </p>
          )}
        </div>

        <div className="courses-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {programmes.map((c, idx) => (
            <div
              key={c.id || idx}
              className="course-card bg-white rounded-[14px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <div className="relative w-full h-[160px] overflow-hidden bg-slate-100">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="course-img object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="course-content p-5">
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-[#111111] mb-2 leading-snug">
                    {c.title}
                  </h3>
                  <div className="duration_list flex items-center gap-2 text-[13.5px] text-[#333333] mb-3">
                    <Clock className="w-4 h-4 text-black stroke-[2.5]" />
                    <span>
                      <b>Duration:</b> {c.duration || "24 weeks"}
                    </span>
                  </div>
                  <p className="course-desc text-[13px] text-[#555555] leading-relaxed line-clamp-4 m-0">
                    {c.description || c.desc}
                  </p>
                </div>
              </div>
              <div className="course-actions px-4 pb-4.5 pt-0 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectCourseForBrochure?.(c.title)}
                  className="btn brochure flex-1 h-[42px] px-2.5 sm:px-3 bg-[#01519a] hover:bg-[#003f7a] text-white font-bold text-[12px] sm:text-[13px] rounded-[8px] border-none cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap transition-all active:scale-95 shadow-xs"
                >
                  <span className="whitespace-nowrap">Download Brochure</span>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0 text-white" viewBox="0 0 24 24">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenApply?.(c.title)}
                  className="btn apply flex-1 h-[42px] px-2.5 sm:px-3 bg-[#00284d] hover:bg-[#001c38] text-white font-bold text-[12px] sm:text-[13px] rounded-[8px] border-none cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap transition-all active:scale-95 shadow-xs"
                >
                  <span className="whitespace-nowrap">Apply now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
