"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { gguImg, GGU_MAIN_PROGRAMMES } from "./constants";

export default function GguCourses({ onOpenBrochure, onOpenApply }) {
  return (
    <section id="courses" className="w-full bg-[#fbfcfd] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-[24px] sm:text-[30px] md:text-[34px] font-black text-[#DC520A] tracking-wide uppercase leading-tight m-0 mb-1">
            COURSES OFFERED
          </h2>
          <p className="text-[14px] sm:text-[15px] font-bold text-neutral-800 m-0">
            By Golden Gate University
          </p>
        </div>

        {/* 2 Main Course Cards (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-[1080px] mx-auto">
          {GGU_MAIN_PROGRAMMES.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-[18px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              {/* Card Image - Natural free size (Image already has MASTER / DOCTORATE printed) */}
              <div className="relative w-full overflow-hidden rounded-t-[18px] bg-gray-50">
                <Image
                  src={gguImg(prog.image)}
                  alt={prog.title}
                  width={600}
                  height={320}
                  priority
                  className="w-full h-auto object-cover block"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-black text-neutral-900 leading-snug m-0 mb-3">
                    {prog.title}
                  </h3>
                  <p className="text-neutral-600 text-[13px] sm:text-[13.5px] leading-relaxed m-0 mb-5 font-normal">
                    {prog.description}
                  </p>

                  {/* Highlights / Details */}
                  <div className="space-y-1.5 mb-6 text-[13px] sm:text-[13.5px]">
                    <p className="m-0 text-neutral-800">
                      <strong className="font-bold text-neutral-900">
                        {prog.id === "mba" ? "Duration:" : "Duration & Credits:"}
                      </strong>{" "}
                      {prog.duration}
                    </p>
                    <p className="m-0 text-neutral-800">
                      <strong className="font-bold text-neutral-900">Eligibility:</strong>{" "}
                      {prog.eligibility}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenBrochure?.(prog.title, "Get Brochure")}
                    className="flex-1 py-2.5 px-4 bg-white hover:bg-neutral-50 text-neutral-800 border border-gray-300 rounded-[6px] text-[13.5px] sm:text-[14px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-98"
                  >
                    <span>Get Brochure</span>
                    <Download className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenApply?.(prog.title, "Apply Now")}
                    className="flex-1 py-2.5 px-4 bg-[#DC520A] hover:bg-[#b84307] text-white rounded-[6px] text-[13.5px] sm:text-[14px] font-bold transition-colors cursor-pointer border-none shadow-sm active:scale-98"
                  >
                    Apply now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

