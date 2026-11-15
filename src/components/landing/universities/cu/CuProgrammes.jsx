"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ClockCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { CU_PG_PROGRAMMES, CU_UG_PROGRAMMES } from "./constants";

export default function CuProgrammes({ onOpenBrochure }) {
  const [activeTab, setActiveTab] = useState("pg");

  const programmes = activeTab === "pg" ? CU_PG_PROGRAMMES : CU_UG_PROGRAMMES;

  return (
    <section
      id="programs"
      className="w-full bg-[#f8f9fa] py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-gray-900 font-extrabold text-2xl sm:text-3xl md:text-[34px] leading-tight m-0">
            Chandigarh University
            <span className="block text-[#d11c1f] mt-1 text-xl sm:text-2xl md:text-[28px]">
              Online Degree Programs
            </span>
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
          <button
            type="button"
            onClick={() => setActiveTab("pg")}
            className={`px-6 py-2.5 rounded-md font-bold text-xs sm:text-sm transition-all cursor-pointer border ${
              activeTab === "pg"
                ? "bg-[#d11c1f] text-white border-[#d11c1f] shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#d11c1f]"
            }`}
          >
            Post Graduate
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ug")}
            className={`px-6 py-2.5 rounded-md font-bold text-xs sm:text-sm transition-all cursor-pointer border ${
              activeTab === "ug"
                ? "bg-[#d11c1f] text-white border-[#d11c1f] shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#d11c1f]"
            }`}
          >
            Under Graduate
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {programmes.map((prog) => (
            <div
              key={prog.code}
              className="bg-white rounded-xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative w-full h-[180px] sm:h-[190px] overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={prog.image}
                  alt={prog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  className="object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-gray-900 font-extrabold text-[22px] sm:text-[24px] leading-tight m-0 mb-1">
                    {prog.title}
                  </h3>
                  <p className="text-gray-500 font-medium text-xs sm:text-[13px] leading-snug m-0 mb-2">
                    {prog.subtitle}
                  </p>

                  <p className="text-gray-600 text-xs sm:text-[13px] leading-snug sm:leading-[1.35] font-normal m-0 mb-4 line-clamp-3 min-h-[48px]">
                    {prog.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-4 pt-2 border-t border-gray-100">
                    <ClockCircleOutlined className="text-[#d11c1f]" />
                    <span>Duration : {prog.duration}</span>
                  </div>
                </div>

                {/* Download Brochure Button */}
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.(`${prog.title} Brochure`)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#d11c1f] hover:bg-[#b01619] text-white font-semibold py-2.5 px-4 rounded-md shadow-xs transition-colors cursor-pointer border-none text-xs sm:text-sm select-none"
                >
                  <span>Download Brochure</span>
                  <DownloadOutlined className="text-xs sm:text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

