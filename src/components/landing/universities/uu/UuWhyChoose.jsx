"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { UU_WHY_CHOOSE } from "./constants";

export default function UuWhyChoose() {
  return (
    <section id="approach" className="w-full py-12 sm:py-16 bg-[#f8fafc] select-none">
      <Container>
        <div className="text-center max-w-[750px] mx-auto mb-10">
          <h2 className="text-[#003399] font-bold text-2xl sm:text-3xl md:text-[34px] leading-tight m-0">
            Why Choose{" "}
            <span className="text-[#62B239]">Uttaranchal University Online?</span>
          </h2>
        </div>

        {/* 4 Feature Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {UU_WHY_CHOOSE.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-start"
            >
              {/* Icon Image - pure image, no artificial bg wrapper */}
              <div className="relative w-12 h-12 mb-3.5">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>

              <h3 className="text-[#003399] font-bold text-base sm:text-[18px] leading-snug m-0 mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-xs sm:text-[13.5px] leading-relaxed m-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

