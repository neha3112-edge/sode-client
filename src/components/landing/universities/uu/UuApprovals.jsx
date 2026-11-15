"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { UU_APPROVALS } from "./constants";

export default function UuApprovals() {
  return (
    <section id="approvals" className="w-full py-10 sm:py-14 bg-white select-none">
      <Container>
        <div className="text-center max-w-[850px] mx-auto mb-8 sm:mb-10">
          <h2 className="text-[#003399] font-bold text-2xl sm:text-3xl md:text-[32px] leading-tight m-0">
            Online UU <span className="text-[#62B239]">Approvals &amp; Recognition</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-[13.5px] md:text-sm leading-relaxed mt-3 mb-0">
            Uttaranchal University Online UGC-approved online degree programs provide the convenience and flexibility
            of online learning while maintaining the equivalency of traditional on-campus degrees. Uttaranchal
            University Online courses are delivered by distinguished international faculty, offering a truly
            world-class education experience.
          </p>
        </div>

        {/* 6 Approvals Logos Grid - Prominent & Large Size */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 lg:gap-8 items-center justify-items-center">
          {UU_APPROVALS.map((approval) => (
            <div
              key={approval.alt}
              className="relative w-full max-w-[160px] sm:max-w-[185px] lg:max-w-[210px] h-[105px] sm:h-[125px] lg:h-[140px] flex items-center justify-center p-1 transition-transform duration-200 hover:scale-105"
            >
              <Image
                src={approval.image}
                alt={approval.alt}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 185px, 210px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

