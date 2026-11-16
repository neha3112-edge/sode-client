"use client";

import React from "react";
import Image from "next/image";
import { IIM_TOOLS, iimImg } from "./constants";

export default function IimTools() {
  return (
    <section className="w-full bg-white py-8 sm:py-12 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-neutral-900 leading-tight m-0 mb-2.5">
            Tools &amp; Technologies You&apos;ll Learn in
            <br className="hidden sm:inline" />{" "}
            <span className="text-[#17479E]">
              the IIM Kozhikode HR Analytics Course
            </span>
          </h2>
          <p className="text-neutral-600 text-[13px] sm:text-[14px] leading-relaxed m-0 font-normal">
            The IIM Kozhikode HR Analytics Course, one of the most career-focused
            courses at IIM Kozhikode, offers hands-on training with tools that
            define modern HRM practices. Designed as a practical certification
            course in IIM Kozhikode, it equips learners with the ability to
            analyze data and apply insights across HR functions.
          </p>
        </div>

        {/* 3 Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {IIM_TOOLS.map((tool, idx) => (
            <div
              key={idx}
              className="rounded-[12px] border border-gray-200 overflow-hidden bg-white shadow-xs flex flex-col justify-between transition-transform hover:-translate-y-1 duration-200"
            >
              {/* Top White Logo Area */}
              <div className="h-[140px] sm:h-[160px] flex items-center justify-center p-4 sm:p-6">
                <Image
                  src={iimImg(tool.image)}
                  alt={tool.name}
                  width={240}
                  height={120}
                  className="max-h-[85px] sm:max-h-[105px] w-auto max-w-[85%] object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>

              {/* Bottom Blue Banner */}
              <div className="bg-[#17479E] text-white p-4 text-[12px] sm:text-[12.5px] leading-relaxed font-medium text-center min-h-[78px] flex items-center justify-center">
                <span>{tool.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

