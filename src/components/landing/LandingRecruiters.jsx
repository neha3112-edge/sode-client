"use client";

import React from "react";
import Image from "next/image";
import LandingContainer from "./LandingContainer";

export default function LandingRecruiters({
  recruiters = {},
  brand = {},
}) {
  if (!recruiters || Object.keys(recruiters).length === 0) return null;

  const {
    title = "Top Recruiters at VGU Online",
    image = "/assets/vgu/placement-partner-vgu.webp",
  } = recruiters;

  return (
    <section id="partners" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <LandingContainer>
        {/* Centered Maroon Badge */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-[#811811] text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-[8px] text-center shadow-xs">
            <h2 className="text-[17px] sm:text-[20px] font-bold text-white tracking-tight leading-tight m-0">
              {title}
            </h2>
          </div>
        </div>

        {/* Recruiters Logos Image */}
        <div className="max-w-[1020px] mx-auto px-2">
          <div className="relative w-full aspect-[2.6/1] sm:aspect-[2.8/1] flex items-center justify-center">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1020px"
            />
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
