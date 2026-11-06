"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { lpuImg, LPU_PLACEMENT_SERVICES } from "./constants";

export default function LpuPlacement({ onOpenApply }) {
  return (
    <section
      id="placement"
      className="w-full bg-white py-10 sm:py-14 scroll-mt-16 sm:scroll-mt-20 select-none text-left"
    >
      <Container>
        {/* 1. Placement Support Services at LPU Online */}
        <div className="mb-12 sm:mb-16 text-center max-w-[920px] mx-auto">
          <h2 className="text-[#333333] font-bold text-[24px] sm:text-[30px] lg:text-[32px] leading-tight m-0 mb-2">
            Placement Support Services at LPU Online
          </h2>
          <p className="text-[#555555] text-[12.5px] sm:text-[13.5px] leading-[1.38] m-0 mb-8 sm:mb-10">
            Lovely Professional University online admission also offers structured placement support to prepare students and professionals for real-world careers and job sectors.
          </p>

          {/* 2 Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-[850px] mx-auto">
            {/* Service 1: Professional Enhancement Programme */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] mb-3 sm:mb-3.5 flex items-center justify-center mx-auto shrink-0">
                <Image
                  src={lpuImg("p1.png")}
                  alt="Professional Enhancement Programme"
                  width={72}
                  height={72}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[#111827] font-bold text-[15.5px] sm:text-[16.5px] leading-tight m-0 mb-2">
                {LPU_PLACEMENT_SERVICES[0].title}
              </h3>
              <p className="text-[#555555] text-[12px] sm:text-[12.5px] leading-[1.4] m-0 max-w-[380px]">
                {LPU_PLACEMENT_SERVICES[0].desc}
              </p>
            </div>

            {/* Service 2: Mock Interviews & Workshops */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] mb-3 sm:mb-3.5 flex items-center justify-center mx-auto shrink-0">
                <Image
                  src={lpuImg("p1.png")}
                  alt="Mock Interviews & Workshops"
                  width={72}
                  height={72}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[#111827] font-bold text-[15.5px] sm:text-[16.5px] leading-tight m-0 mb-2">
                {LPU_PLACEMENT_SERVICES[1].title}
              </h3>
              <p className="text-[#555555] text-[12px] sm:text-[12.5px] leading-[1.4] m-0 max-w-[380px]">
                {LPU_PLACEMENT_SERVICES[1].desc}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Placement & Hiring Partners at LPU Online */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-8 border-t border-gray-100">
          {/* Left Column: Heading, Description & Apply Button */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <h2 className="m-0 leading-none">
              <span className="text-[#9ca3af] font-bold text-[26px] sm:text-[32px] block leading-none">
                Placement
              </span>
              <span className="text-[#f58220] font-bold text-[20px] sm:text-[24px] lg:text-[26px] block leading-tight mt-1 mb-3">
                &amp; Hiring Partners at LPU Online
              </span>
            </h2>

            <p className="text-[#444444] text-[12px] sm:text-[13px] leading-[1.4] m-0 mb-5 max-w-[500px]">
              At LPU Online, Students and Professionals get an opportunity to enhance their career truly nurture their ambitions. The Lovely Professional University Online Admission supports students and has a dedicated placement support and a strong network of hiring partners. They create real opportunities for professional growth, whether you&apos;re pursuing an LPU MBA Online or an LPU Online MCA program.
            </p>

            <div>
              <button
                type="button"
                onClick={onOpenApply}
                className="bg-black hover:bg-gray-800 text-white font-semibold text-[13px] sm:text-[13.5px] px-6 py-2.5 rounded-[4px] shadow-sm transition-all cursor-pointer border-none active:scale-95 flex items-center gap-1.5 select-none w-fit"
              >
                <span>Apply Now »</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hiring Partners Grid Image */}
          <div className="lg:col-span-7 flex justify-center">
            {/* Desktop Image */}
            <div className="hidden sm:block w-full">
              <Image
                src={lpuImg("placement-desktop.webp")}
                alt="LPU Online Placement & Hiring Partners"
                width={800}
                height={303}
                sizes="(max-width: 1024px) 100vw, 700px"
                style={{ width: "100%", height: "auto" }}
                className="w-full h-auto object-contain block"
              />
            </div>

            {/* Mobile Image */}
            <div className="block sm:hidden w-full max-w-[360px]">
              <Image
                src={lpuImg("placement-mobile.webp")}
                alt="LPU Online Placement & Hiring Partners"
                width={600}
                height={906}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

