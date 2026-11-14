"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { MU_APPROVALS } from "./constants";

export default function MuApprovals() {
  return (
    <section
      id="approvals"
      className="w-full bg-[#193579] py-6 sm:py-8 md:py-9 text-center text-white scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        {/* Section Headings - Compact & Aligned matching media_1794684544099_7ac07de5.jpg */}
        <div className="max-w-3xl mx-auto mb-4 sm:mb-6 text-center">
          <h2 className="text-white text-[17px] sm:text-2xl md:text-[26px] font-bold uppercase tracking-wide m-0 mb-0.5 sm:mb-1 leading-tight">
            Mangalayatan University Online
          </h2>
          <h3 className="text-gray-200 text-[11.5px] sm:text-base md:text-[17px] font-medium uppercase tracking-[0.14em] m-0 leading-snug">
            Approvals &amp; Recognition
          </h3>
        </div>

        {/* 4 Accreditations / Approvals Grid: 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-[1100px] mx-auto">
          {MU_APPROVALS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center px-1 py-0.5 select-none"
            >
              {/* Circular Badge Image */}
              <div className="relative w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] flex items-center justify-center mx-auto mb-1.5 sm:mb-2.5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 80px, 110px"
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h4 className="text-white font-bold text-[12.5px] sm:text-[15px] leading-snug m-0 mb-0.5 sm:mb-1">
                {item.title}
              </h4>

              {/* Description with Clean Readable Line Height */}
              <p className="text-gray-200 text-[10px] sm:text-[12px] leading-[1.3] m-0 max-w-[145px] sm:max-w-[220px] font-normal opacity-95">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

