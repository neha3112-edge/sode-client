"use client";

import React from "react";
import Image from "next/image";
import { shooliniImg } from "./constants";

export const SHOOLINI_APPROVAL_ITEMS = [
  {
    image: shooliniImg("Naac-A+.webp"),
    renderText: () => (
      <p className="text-[13px] sm:text-[14px] leading-tight m-0">
        <span className="text-[#fd202a] font-extrabold block">NAAC Accredited</span>
        <span className="text-black font-bold block mt-0.5">A+ Grade</span>
      </p>
    ),
  },
  {
    image: shooliniImg("UGC.webp"),
    renderText: () => (
      <p className="text-[13px] sm:text-[14px] leading-tight m-0">
        <span className="text-[#fd202a] font-extrabold block">UGC Entitled</span>
        <span className="text-black font-bold block mt-0.5">Degree</span>
      </p>
    ),
  },
  {
    image: shooliniImg("nirf.png"),
    renderText: () => (
      <p className="text-[13px] sm:text-[14px] leading-tight m-0">
        <span className="block">
          <span className="text-[#fd202a] font-extrabold mr-1">#69</span>
          <span className="text-black font-bold">NIRF</span>
        </span>
        <span className="text-black font-bold block mt-0.5">India Rankings</span>
      </p>
    ),
  },
  {
    image: shooliniImg("rank-23.webp"),
    renderText: () => (
      <p className="text-[13px] sm:text-[14px] leading-tight m-0">
        <span className="text-[#fd202a] font-extrabold mr-1">TOP 100</span>
        <span className="text-black font-bold">Impact Rankings</span>
      </p>
    ),
  },
  {
    image: shooliniImg("the-ranking.webp"),
    renderText: () => (
      <p className="text-[13px] sm:text-[14px] leading-tight m-0">
        <span className="block">
          <span className="text-[#fd202a] font-extrabold mr-1">#1</span>
          <span className="text-black font-bold">THE World</span>
        </span>
        <span className="text-black font-bold block mt-0.5">University Rankings</span>
      </p>
    ),
  },
  {
    image: shooliniImg("qs.webp"),
    renderText: () => (
      <p className="text-[13px] sm:text-[14px] leading-tight m-0">
        <span className="block">
          <span className="text-[#fd202a] font-extrabold mr-1">QS #1</span>
          <span className="text-black font-bold">Gauge (Indian</span>
        </span>
        <span className="text-black font-bold block mt-0.5">Education Ratings)</span>
      </p>
    ),
  },
];

export default function ShooliniApprovals() {
  return (
    <section id="approvals" className="w-full select-none border-b border-gray-100">
      {/* 100% Full Width Edge-to-Edge Grid (No Container, No Side Gaps) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12">
        {/* Left Dark Navy Box - Extends 100% to Left Screen Edge */}
        <div className="lg:col-span-5 bg-[#061329] pl-6 sm:pl-12 lg:pl-16 xl:pl-24 pr-6 sm:pr-10 py-8 sm:py-10 lg:py-12 flex flex-col justify-center text-left">
          <h2 className="m-0 leading-tight">
            <span className="text-[#fd202a] font-extrabold text-2xl sm:text-[26px] lg:text-[28px] block">
              Shoolini University Online
            </span>
            <span className="text-white font-extrabold text-2xl sm:text-[26px] lg:text-[28px] block mt-1">
              Recognitions &amp; Accreditations
            </span>
          </h2>
          <p className="text-white/85 text-xs sm:text-[13.5px] mt-3 leading-relaxed font-normal m-0 max-w-[360px]">
            Academic excellence powers Shoolini Online&apos;s strong national and global rankings.
          </p>
        </div>

        {/* Right Pure White Box - Extends 100% to Right Screen Edge */}
        <div className="lg:col-span-7 bg-white px-6 sm:px-10 lg:px-14 xl:px-16 py-8 sm:py-10 lg:py-12 flex items-center">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-y-7 gap-x-8 lg:gap-x-12">
            {SHOOLINI_APPROVAL_ITEMS.map((item, idx) => (
              <div key={idx} className="flex flex-col items-start text-left">
                {/* Logo Image */}
                <div className="relative w-[110px] sm:w-[130px] h-[46px] sm:h-[52px] mb-2.5 shrink-0">
                  <Image
                    src={item.image}
                    alt="Shoolini Recognition"
                    fill
                    sizes="130px"
                    className="object-contain object-left"
                  />
                </div>

                {/* Text below logo */}
                {item.renderText()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
