"use client";

import React, { useState } from "react";
import Image from "next/image";
import { edgewoodImg, EDGEWOOD_SPECIALIZATIONS_DATA } from "./constants";

export default function EdgewoodSpecializations({ onOpenApply }) {
  const [activeTab, setActiveTab] = useState("dba");

  const currentSpecializations =
    activeTab === "dba"
      ? EDGEWOOD_SPECIALIZATIONS_DATA.dba
      : EDGEWOOD_SPECIALIZATIONS_DATA.mbaDba;

  return (
    <section
      id="specializations"
      className="w-full bg-[#fbfbfb] py-12 sm:py-16 px-4 sm:px-6 select-none scroll-mt-20"
    >
      <div className="max-w-[1060px] mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-[#b2171e] font-black text-[22px] sm:text-[28px] md:text-[32px] leading-tight m-0 mb-6 sm:mb-8">
          Specializations of Edgewood University Online <br className="hidden sm:inline" />
          DBA / MBA + DBA
        </h2>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab("dba")}
            className={`px-8 py-2 rounded-md font-bold text-[14px] sm:text-[15px] cursor-pointer transition-all ${
              activeTab === "dba"
                ? "bg-[#b2171e] text-white shadow-md border-none"
                : "bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50"
            }`}
          >
            DBA
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mbaDba")}
            className={`px-8 py-2 rounded-md font-bold text-[14px] sm:text-[15px] cursor-pointer transition-all ${
              activeTab === "mbaDba"
                ? "bg-[#b2171e] text-white shadow-md border-none"
                : "bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50"
            }`}
          >
            MBA + DBA
          </button>
        </div>

        {/* 2 Specialization Cards with Overlapping Apply Now Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-[960px] mx-auto pb-4">
          {currentSpecializations.map((spec) => (
            <div
              key={spec.id}
              className="relative bg-white rounded-[20px] overflow-visible shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-neutral-100 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Direct Card Image - Free natural size, NO artificial background or border */}
              <div className="w-full rounded-t-[20px] overflow-hidden">
                <Image
                  src={edgewoodImg(spec.image)}
                  alt={spec.title}
                  width={spec.imageWidth}
                  height={spec.imageHeight}
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="w-full h-auto block object-cover"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 pb-9 sm:pb-10 flex flex-col flex-1 justify-between text-center">
                <div>
                  <h3 className="text-[#111111] font-black text-[20px] sm:text-[22px] m-0 mb-3 leading-snug text-center">
                    {spec.title}
                  </h3>
                  <p className="text-[#555555] text-[13px] sm:text-[13.5px] leading-relaxed m-0 text-center">
                    {spec.description}
                  </p>
                </div>
              </div>

              {/* Overlapping Bottom Center Red Apply Now Button */}
              <div className="absolute -bottom-4.5 sm:-bottom-5 left-1/2 -translate-x-1/2 z-10 w-max">
                <button
                  type="button"
                  onClick={() => onOpenApply?.(spec.title, `Apply - ${spec.title}`)}
                  className="inline-flex items-center justify-center py-2.5 px-8 rounded-[8px] bg-[#b2171e] hover:bg-[#991319] text-white font-bold text-[14px] border-none cursor-pointer transition-all active:scale-95 shadow-md"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
