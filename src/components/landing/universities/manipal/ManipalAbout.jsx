"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { manipalImg } from "./constants";

export default function ManipalAbout() {
  return (
    <section
      id="about"
      className="w-full bg-white pt-8 sm:pt-12 pb-0 scroll-mt-16 sm:scroll-mt-20 select-none overflow-hidden"
    >
      <Container>
        {/* Section Heading */}
        <h2 className="font-bold text-[22px] sm:text-[26px] md:text-[30px] leading-tight text-center m-0 mb-2 sm:mb-2.5">
          <span className="text-[#111827]">About </span>
          <span className="text-[#ee3024]">Manipal University Online</span>
        </h2>

        {/* Paragraphs with tight, clean line-height */}
        <div className="max-w-[900px] mx-auto text-center mb-5 sm:mb-6 px-4">
          <p className="text-[#444444] text-[12px] sm:text-[13px] leading-[1.36] m-0 mb-2 font-normal">
            All students can enrol in Manipal University&apos;s online degree programs thanks to Manipal
            Online&apos;s free EMIs, special scholarships, and other benefits. Online Degree Programs
            with Complete Placement Support. Manipal University Online&apos;s integrity and authenticity
            are guaranteed by its top NIRF, QS, THE rankings, NAAC A+ certification, and international
            recognition.
          </p>
          <p className="text-[#111827] font-semibold text-[12px] sm:text-[13px] leading-[1.35] m-0">
            &ldquo;Manipal University Online is the No.1 choice of many students and is trusted for
            its commitment to providing high-quality digital education.&rdquo;
          </p>
        </div>

        {/* Mobile Stats (< md): Clean 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-[500px] mx-auto mb-6 text-center md:hidden">
          <div className="flex flex-col items-center">
            <span className="text-[#f35a06] font-bold text-[24px] sm:text-[28px] leading-none mb-1">
              70+ Years
            </span>
            <span className="text-[#333333] font-medium text-[11px] sm:text-[12px] leading-tight">
              Legacy of Manipal Education
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#f35a06] font-bold text-[24px] sm:text-[28px] leading-none mb-1">
              500+
            </span>
            <span className="text-[#333333] font-medium text-[11px] sm:text-[12px] leading-tight">
              Experienced Faculty
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#f35a06] font-bold text-[24px] sm:text-[28px] leading-none mb-1">
              100+
            </span>
            <span className="text-[#333333] font-medium text-[11px] sm:text-[12px] leading-tight">
              Top Recruiting Companies
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#f35a06] font-bold text-[24px] sm:text-[28px] leading-none mb-1">
              1500+
            </span>
            <span className="text-[#333333] font-medium text-[11px] sm:text-[12px] leading-tight">
              Learner Presence Across Indian Towns and Cities
            </span>
          </div>
        </div>
      </Container>

      {/* Full-Width Campus Stage with Overlaid Stats (edge-to-edge full width) */}
      <div className="relative w-full overflow-hidden">
        {/* Overlaid 4 Stats Flanking the Dome (>= md) */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 w-full max-w-[1280px] mx-auto px-4 lg:px-8 absolute top-[8%] lg:top-[12%] xl:top-[14%] left-0 right-0 z-10 text-center pointer-events-none">
          {/* Stat 1: Far Left */}
          <div className="flex flex-col items-center">
            <span className="text-[#f35a06] font-bold text-[26px] lg:text-[34px] leading-tight mb-1">
              70+ Years
            </span>
            <span className="text-[#333333] font-medium text-[11px] lg:text-[12.5px] leading-tight max-w-[170px]">
              Legacy of Manipal Education
            </span>
          </div>

          {/* Stat 2: Left of Dome */}
          <div className="flex flex-col items-center pr-4 lg:pr-10">
            <span className="text-[#f35a06] font-bold text-[26px] lg:text-[34px] leading-tight mb-1">
              500+
            </span>
            <span className="text-[#333333] font-medium text-[11px] lg:text-[12.5px] leading-tight max-w-[150px]">
              Experienced Faculty
            </span>
          </div>

          {/* Stat 3: Right of Dome */}
          <div className="flex flex-col items-center pl-4 lg:pl-10">
            <span className="text-[#f35a06] font-bold text-[26px] lg:text-[34px] leading-tight mb-1">
              100+
            </span>
            <span className="text-[#333333] font-medium text-[11px] lg:text-[12.5px] leading-tight max-w-[160px]">
              Top Recruiting Companies
            </span>
          </div>

          {/* Stat 4: Far Right */}
          <div className="flex flex-col items-center">
            <span className="text-[#f35a06] font-bold text-[26px] lg:text-[34px] leading-tight mb-1">
              1500+
            </span>
            <span className="text-[#333333] font-medium text-[11px] lg:text-[12.5px] leading-tight max-w-[180px]">
              Learner Presence Across Indian Towns and Cities
            </span>
          </div>
        </div>

        {/* Campus Building Full-Width Image (100% edge-to-edge, no side gaps) */}
        <div className="w-full">
          <Image
            src={manipalImg("manipal-about.webp")}
            alt="Manipal University Jaipur Campus"
            width={1500}
            height={525}
            priority
            sizes="100vw"
            className="w-full h-auto object-cover object-bottom block"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
