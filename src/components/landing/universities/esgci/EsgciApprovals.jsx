"use client";

import React from "react";
import Image from "next/image";
import { esgciImg, ESGCI_APPROVALS } from "./constants";

export default function EsgciApprovals() {
  return (
    <section id="approvals" className="w-full bg-white pt-6 sm:pt-8 pb-10 sm:pb-14 px-3 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1240px] mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-black uppercase tracking-tight m-0 mb-6 sm:mb-8">
          APPROVALS AND ACCREDITATION
        </h2>

        {/* 4 Accreditations Grid - 2 Columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7 sm:gap-6 lg:gap-8 items-start">
          {ESGCI_APPROVALS.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center px-1 sm:px-2">
              {/* Logo: Large prominent scale */}
              <div className="h-24 sm:h-28 md:h-32 flex items-center justify-center mb-2.5 sm:mb-3 w-full">
                <Image
                  src={esgciImg(item.image)}
                  alt={item.title}
                  width={300}
                  height={140}
                  className="max-h-[85px] sm:max-h-[100px] md:max-h-[110px] w-auto max-w-[90%] object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>

              {/* Title in Bold Green matching screenshot */}
              <h3 className="text-[14px] sm:text-[16px] font-extrabold text-[#04903c] m-0 mb-1.5 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#333333] text-[11px] sm:text-[12.5px] leading-snug m-0 max-w-[240px] font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
