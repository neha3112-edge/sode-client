"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { CU_STATS } from "./constants";

export default function CuStats() {
  return (
    <section className="w-full bg-[#d11c1f] py-8 sm:py-10 text-white select-none">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">
          {CU_STATS.map((item, index) => (
            <div key={index} className="flex flex-col items-center sm:items-start">
              <span className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold tracking-tight leading-none text-white">
                {item.value}
              </span>
              <p className="text-xs sm:text-[13px] lg:text-[14px] text-white/90 font-medium leading-snug sm:leading-[1.3] m-0 mt-1.5 max-w-[220px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

