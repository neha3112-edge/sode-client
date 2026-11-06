"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { LPU_APPROVALS } from "./constants";

export default function LpuApprovals() {
  const renderBadge = (item) => (
    <div
      key={item.title}
      className="flex flex-col items-center text-center px-2 py-1 select-none"
    >
      {/* Circle Badge Logo directly without extra bg-white wrapper */}
      <div className="relative w-[115px] h-[115px] sm:w-[125px] sm:h-[125px] md:w-[110px] md:h-[110px] lg:w-[125px] lg:h-[125px] flex items-center justify-center mx-auto mb-2.5">
        <Image
          src={item.image}
          alt={item.title}
          width={125}
          height={125}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Title & Status */}
      <h4 className="text-white font-bold text-[13px] sm:text-[14px] leading-tight m-0 uppercase">
        {item.title}
      </h4>
      <p className="text-gray-300 font-semibold text-[11px] sm:text-[12px] leading-tight m-0 mt-0.5 uppercase tracking-wide">
        {item.status}
      </p>
    </div>
  );

  return (
    <section
      id="approvals"
      className="w-full bg-[#373737] py-8 sm:py-12 scroll-mt-16 sm:scroll-mt-20 select-none text-center"
    >
      <Container>
        {/* Section Heading */}
        <h2 className="font-bold text-[24px] sm:text-[28px] md:text-[30px] leading-tight text-center m-0 mb-6 sm:mb-8">
          <span className="text-[#f58220] block sm:inline">LPU University </span>
          <span className="text-white">Accreditations &amp; Approvals</span>
        </h2>

        {/* 2-Columns Grid on Mobile (2x2), 4-Columns on Desktop (matching media_1793968998824_91a823d7.png) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 sm:gap-y-8 gap-x-4 sm:gap-x-6 w-full justify-center items-center">
          {LPU_APPROVALS.map((item) => renderBadge(item))}
        </div>
      </Container>
    </section>
  );
}

