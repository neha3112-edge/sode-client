"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ClockCircleOutlined,
  DownloadOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { MU_ONLINE_PROGRAMMES, MU_DISTANCE_PROGRAMMES } from "./constants";

export default function MuProgrammes({ onOpenBrochure, onOpenApply }) {
  const [activeTab, setActiveTab] = useState("online");

  const programmes = activeTab === "online" ? MU_ONLINE_PROGRAMMES : MU_DISTANCE_PROGRAMMES;

  return (
    <section
      id="program"
      className="w-full bg-[#f8f9fa] py-10 sm:py-14 scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <h2 className="text-[#193579] font-bold text-2xl sm:text-[28px] md:text-[30px] leading-tight m-0">
            Programs Offered
            <span className="text-[#F97316] block mt-1 text-xl sm:text-[24px] md:text-[26px]">
              By Mangalayatan University Online
            </span>
          </h2>
        </div>

        {/* Tab Switcher - Clean, Normal Sizing */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("online")}
            className={`px-5 py-2 rounded-full font-semibold text-[13.5px] sm:text-[14px] leading-normal cursor-pointer transition-all border ${
              activeTab === "online"
                ? "bg-[#193579] border-[#193579] text-white shadow-xs"
                : "bg-white border-gray-300 text-gray-700 hover:border-[#193579]"
            }`}
          >
            Online Courses
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("distance")}
            className={`px-5 py-2 rounded-full font-semibold text-[13.5px] sm:text-[14px] leading-normal cursor-pointer transition-all border ${
              activeTab === "distance"
                ? "bg-[#193579] border-[#193579] text-white shadow-xs"
                : "bg-white border-gray-300 text-gray-700 hover:border-[#193579]"
            }`}
          >
            Distance Courses
          </button>
        </div>

        {/* 3-Column Programmes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {programmes.map((prog) => (
            <div
              key={prog.code}
              className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-gray-200/90 flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative w-full h-[175px] sm:h-[185px] overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={prog.image}
                  alt={prog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  className="object-cover"
                />
              </div>

              {/* Card Body with Balanced Spacing & Line Height */}
              <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-[#193579] font-bold text-[20px] sm:text-[22px] leading-tight m-0 mb-1">
                    {prog.title}
                  </h3>
                  <p className="text-gray-600 font-semibold text-[12px] sm:text-[12.5px] leading-normal m-0 mb-2.5">
                    {prog.subtitle}
                  </p>

                  {/* Duration & Eligibility Box */}
                  <div className="grid grid-cols-2 gap-2 bg-[#f8f9fa] rounded-lg p-2 sm:p-2.5 mb-3 border border-gray-100 text-left">
                    <div className="flex items-start gap-1.5">
                      <ClockCircleOutlined className="text-[#F97316] text-[13px] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] sm:text-[10.5px] font-bold text-[#F97316] block uppercase tracking-wider leading-tight">
                          Duration :
                        </span>
                        <span className="text-[11.5px] sm:text-[12px] font-semibold text-gray-800 leading-tight block mt-0.5">
                          {prog.duration}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <svg
                        className="w-3.5 h-3.5 text-[#F97316] mt-0.5 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.5L4.5 9 12 5.5 19.5 9 12 11.5zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                      </svg>
                      <div>
                        <span className="text-[10px] sm:text-[10.5px] font-bold text-[#F97316] block uppercase tracking-wider leading-tight">
                          Eligibility :
                        </span>
                        <span className="text-[11.5px] sm:text-[12px] font-semibold text-gray-800 leading-tight block mt-0.5">
                          {prog.eligibility}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description with Clean Readable Line Height */}
                  <p className="text-[#555555] text-[12px] sm:text-[12.5px] leading-[1.48] font-normal m-0 mb-3.5 line-clamp-3 min-h-[54px]">
                    {prog.description}
                  </p>
                </div>

                {/* Bottom Action Buttons - Single Line Guaranteed (No Wrap) */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => onOpenBrochure?.(`${prog.title} Brochure`)}
                    className="flex-[1.25] whitespace-nowrap py-1.5 sm:py-2 px-2 sm:px-2.5 border border-[#193579] text-[#193579] hover:bg-[#193579] hover:text-white rounded-full text-[11px] sm:text-[11.5px] md:text-[12px] font-semibold transition-colors cursor-pointer bg-transparent inline-flex items-center justify-center gap-1 select-none"
                  >
                    <span>Download Brochure</span>
                    <DownloadOutlined className="text-[11px] shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenApply?.(prog.title)}
                    className="flex-[0.85] whitespace-nowrap py-1.5 sm:py-2 px-2 sm:px-2.5 bg-[#F97316] hover:bg-[#ea580c] text-white border border-[#F97316] rounded-full text-[11px] sm:text-[11.5px] md:text-[12px] font-semibold transition-all shadow-xs cursor-pointer inline-flex items-center justify-center gap-1 select-none"
                  >
                    <span>Apply Now</span>
                    <ArrowRightOutlined className="text-[11px] shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

