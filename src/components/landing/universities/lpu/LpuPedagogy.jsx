"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { LPU_PEDAGOGY } from "./constants";

export default function LpuPedagogy() {
  return (
    <section
      id="pedagogy"
      className="w-full bg-white py-10 sm:py-14 scroll-mt-16 sm:scroll-mt-20 select-none text-left"
    >
      <Container>
        {/* Section Heading matching media_1793969254908_2e76a885.png */}
        <div className="mb-6 sm:mb-8 text-center max-w-[920px] mx-auto">
          <h2 className="text-[#333333] font-bold text-[24px] sm:text-[30px] lg:text-[32px] leading-tight m-0 mb-2">
            Learning Pedagogy at LPU Online
          </h2>
          <p className="text-[#555555] text-[12.5px] sm:text-[13.5px] leading-[1.38] m-0">
            The learning model at Lovely Professional University Online (LPU Online) is tailored to
            offer flexibility and an engaging experience to all the students who are enrolled in
            programs such as LPU MBA Online, LPU MCA Online, and LPU Online BCA.
          </p>
        </div>

        {/* 3 Pedagogy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
          {LPU_PEDAGOGY.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[6px] p-5 sm:p-6 border border-gray-200/90 border-b-[3px] border-b-[#f58220] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between text-left"
            >
              <div>
                {/* Header: Icon on Left, Title on Right */}
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="w-auto h-auto max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-[#f58220] font-bold text-[16px] sm:text-[17px] leading-tight m-0">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[#444444] text-[12px] sm:text-[12.5px] leading-[1.38] m-0">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

