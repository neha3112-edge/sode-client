"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { CU_APPROVALS } from "./constants";

export default function CuApprovals() {
  return (
    <section
      id="approvals"
      className="w-full bg-[#f4f6fa] py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-gray-900 font-extrabold text-2xl sm:text-3xl md:text-[34px] leading-tight m-0">
            <span className="text-[#d11c1f]">CU Online </span>
            Awards &amp; Recognition
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {CU_APPROVALS.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all border border-gray-100 flex flex-col items-center justify-center text-center"
            >
              {/* Badge Image */}
              <div className="relative w-[120px] sm:w-[140px] h-[60px] sm:h-[70px] flex items-center justify-center mb-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="140px"
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <p className="text-gray-700 text-[11px] sm:text-[12px] font-semibold leading-snug m-0 max-w-[180px]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

