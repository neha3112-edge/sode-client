"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { LPU_STATS } from "./constants";

export default function LpuAbout() {
  return (
    <section
      id="about"
      className="w-full bg-white py-8 sm:py-12 scroll-mt-16 sm:scroll-mt-20 select-none text-left"
    >
      <Container>
        {/* Section Header */}
        <div className="mb-3 sm:mb-4">
          <p className="text-[#9ca3af] font-bold text-[16px] sm:text-[18px] leading-none m-0 mb-1">
            About
          </p>
          <h2 className="text-[24px] sm:text-[30px] md:text-[34px] font-bold leading-tight m-0">
            <span className="text-[#111111]">LPU </span>
            <span className="text-[#f58220]">Online University</span>
          </h2>
          <p className="text-[#555555] font-semibold text-[12px] sm:text-[13.5px] leading-tight m-0 mt-1">
            (Lovely Professional University Online)
          </p>
        </div>

        {/* Paragraphs with tight line-height */}
        <div className="space-y-2.5 mb-6 sm:mb-8 text-[#444444] text-[12px] sm:text-[13px] md:text-[13.5px] leading-[1.34] sm:leading-[1.38]">
          <p className="m-0">
            Lovely Professional University (LPU Online) is a trusted institute which was established
            in 2005. LPU Online offers a wide range of UGC-approved degree programs. All the courses
            are delivered through a flexible digital learning platform, therefore allowing students
            to learn anytime, anywhere across India and abroad.
          </p>
          <p className="m-0">
            Lovely Professional University Online Courses include programs such as LPU MBA Online,
            LPU Online MCA, and LPU Online BCA. These are designed with an industry-relevant
            curriculum. The university has extended opportunities like a smooth Lovely Professional
            University online admission process, affordable fee structures, and strong academic
            support. Overall, LPU Online courses help learners and working professionals build
            future-ready careers.
          </p>
        </div>

        {/* 4 Stats Grid: Centered on mobile, Left-aligned on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 sm:gap-8 pt-5 border-t border-gray-200/80 text-center sm:text-left">
          {LPU_STATS.map((st) => (
            <div key={st.label} className="flex flex-col items-center sm:items-start">
              <span className="text-[#f58220] font-black text-[30px] sm:text-[36px] lg:text-[40px] leading-none mb-1">
                {st.number}
              </span>
              <span className="text-[#222222] font-bold text-[12px] sm:text-[13px] leading-tight">
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

