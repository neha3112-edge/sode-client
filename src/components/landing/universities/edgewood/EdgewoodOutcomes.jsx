"use client";

import React from "react";
import Image from "next/image";
import { edgewoodImg, EDGEWOOD_OUTCOMES_DATA } from "./constants";

export default function EdgewoodOutcomes() {
  return (
    <section className="w-full bg-[#b2171e] text-white py-12 sm:py-16 px-4 sm:px-6 select-none shadow-inner">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-white font-black text-[26px] sm:text-[32px] md:text-[38px] uppercase tracking-wide leading-tight m-0">
            LEARNING OUTCOMES OF <br />
            <span className="font-bold normal-case text-[20px] sm:text-[26px] md:text-[30px] opacity-95">
              Edgewood University Online
            </span>
          </h2>
        </div>

        {/* 6 Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {EDGEWOOD_OUTCOMES_DATA.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3.5 sm:gap-4 p-5 rounded-[18px] bg-[#9e141a] hover:bg-[#8f1217] transition-colors"
            >
              {/* Direct Icon - Free Size, NO white background wrapper */}
              <div className="shrink-0 pt-0.5">
                <Image
                  src={edgewoodImg(item.icon)}
                  alt="Outcome Icon"
                  width={42}
                  height={42}
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain block"
                  style={{ width: "auto", height: "auto", maxHeight: "44px" }}
                />
              </div>

              {/* Text */}
              <div className="text-left">
                <h3 className="text-white font-bold text-[15px] sm:text-[16px] m-0 mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-white/85 text-[12.5px] sm:text-[13.5px] leading-relaxed m-0">
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
