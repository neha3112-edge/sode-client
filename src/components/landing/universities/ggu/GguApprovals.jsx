"use client";

import React from "react";
import Image from "next/image";
import { gguImg, GGU_APPROVALS } from "./constants";

export default function GguApprovals() {
  return (
    <section id="approvals" className="w-full bg-[#fbfcfd] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-[20px] sm:text-[26px] md:text-[30px] font-black text-black leading-tight m-0 mb-1">
            Accreditations & Associations
          </h2>
          <p className="text-[13.5px] sm:text-[14.5px] font-semibold text-neutral-700 m-0">
            of Golden Gate University, San Francisco
          </p>
        </div>

        {/* 4 Cards Grid (2x2 on mobile, 4 cols on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-[1100px] mx-auto">
          {GGU_APPROVALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[12px] p-5 sm:p-6 border border-gray-100 shadow-[0_3px_15px_rgba(0,0,0,0.04)] border-b-[3px] border-b-[#DC520A] flex flex-col items-center justify-between min-h-[170px] sm:min-h-[190px] text-center hover:shadow-[0_6px_22px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              {/* Logo */}
              <div className="relative w-full h-[75px] sm:h-[85px] flex items-center justify-center mb-3">
                <Image
                  src={gguImg(item.image)}
                  alt={item.title}
                  width={140}
                  height={80}
                  className="max-h-[65px] sm:max-h-[75px] w-auto object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-[14px] sm:text-[15px] font-bold text-[#003468] m-0 leading-tight">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

