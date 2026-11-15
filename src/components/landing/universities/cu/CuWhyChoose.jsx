"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { CU_WHY_CHOOSE } from "./constants";

export default function CuWhyChoose() {
  return (
    <section
      id="whychoose"
      className="w-full bg-[#f4f6fa] py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-gray-900 font-extrabold text-2xl sm:text-3xl md:text-[34px] leading-tight m-0 mb-2">
            Why Choose CU Online University?
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm leading-snug sm:leading-[1.38] m-0 max-w-2xl mx-auto">
            Chandigarh University is a UGC- DEB approved university ranked 19th. It offers
            flexibility, industry-oriented courses crafted for students across India. Students can
            earn a recognized degree while earning or balancing their personal lives.
          </p>
        </div>

        {/* 6 Cards Grid: 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {CU_WHY_CHOOSE.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 sm:p-5 flex items-start gap-4 shadow-xs hover:shadow-md transition-all border border-gray-100 border-r-4 border-r-[#254b77]"
            >
              {/* Icon */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div className="text-left">
                <h3 className="font-bold text-sm sm:text-base text-[#d11c1f] leading-tight m-0 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-[13px] leading-snug sm:leading-[1.35] m-0 font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

