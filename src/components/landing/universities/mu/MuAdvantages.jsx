"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { MU_ADVANTAGES } from "./constants";

export default function MuAdvantages() {
  return (
    <section
      id="Advantage"
      className="w-full bg-[#193579] py-6 sm:py-8 md:py-9 text-white scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        {/* Section Heading - Compact & Balanced */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <h2 className="text-white font-bold text-xl sm:text-2xl md:text-[26px] leading-tight m-0">
            Why Choose
            <span className="text-[#F97316] block mt-1 sm:mt-1.5 leading-tight">
              Mangalayatan University Online Degree Courses?
            </span>
          </h2>
        </div>

        {/* 6 Advantages Cards Grid: 3 cols on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-[1100px] mx-auto">
          {MU_ADVANTAGES.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl py-3 px-4 sm:py-3.5 sm:px-5 flex items-center gap-3.5 text-black shadow-xs hover:shadow-md transition-all"
            >
              {/* Icon Image */}
              <div className="relative w-12 h-12 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  sizes="52px"
                  className="object-contain"
                />
              </div>

              {/* Text with Compact & Clean Line Height */}
              <div className="text-left">
                <p className="font-bold text-[14px] sm:text-[15px] text-[#111827] leading-tight m-0">
                  {item.title}
                </p>
                <p className="font-medium text-[12px] sm:text-[13px] text-gray-500 leading-tight m-0 mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

