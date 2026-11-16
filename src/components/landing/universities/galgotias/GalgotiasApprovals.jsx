"use client";

import React from "react";
import Image from "next/image";
import { APPROVALS_LIST } from "./constants";

export default function GalgotiasApprovals() {
  return (
    <section id="approvals" className="py-8 sm:py-10 bg-[#f9bc08] select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[22px] sm:text-[26px] md:text-[28px] font-bold text-center text-[#111111] mb-8 sm:mb-10 m-0">
          Accreditations & Approvals of Galgotias University online
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {APPROVALS_LIST.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5 sm:gap-4 text-left">
              {/* Direct image without artificial bg-white or padding */}
              <div className="w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] shrink-0 flex items-center justify-center">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={72}
                  height={72}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#811811] font-bold text-[18px] sm:text-[20px] m-0 mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-black text-[13px] sm:text-[14px] leading-[1.3] m-0 font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
