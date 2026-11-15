"use client";

import React from "react";
import Image from "next/image";
import { DownloadOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { VGU_PROGRAMMES } from "./constants";

export default function VguProgrammes({ onOpenBrochure, onOpenApply }) {
  return (
    <section
      id="programs"
      className="w-full bg-[#f8f9fa] py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-[#13294b] font-bold text-2xl sm:text-3xl md:text-[32px] leading-tight m-0">
            VGU Online | Vivekananda Global University Online Courses
          </h2>
        </div>

        {/* 8 Course Cards: 4 columns on lg, 2 on md, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {VGU_PROGRAMMES.map((prog) => (
            <div
              key={prog.code}
              className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Card Image with Duration Badge - Free Size */}
              <div className="relative w-full overflow-hidden bg-gray-100 rounded-t-xl shrink-0">
                <Image
                  src={prog.image}
                  alt={prog.title}
                  width={600}
                  height={380}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                  className="w-full h-auto object-contain block"
                  style={{ width: "100%", height: "auto" }}
                />
                <span className="absolute top-2.5 right-2.5 bg-black/85 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full z-10">
                  {prog.duration}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow text-center">
                <div>
                  <h3 className="text-[#811811] font-bold text-xl sm:text-2xl leading-tight m-0 mb-1">
                    {prog.title}
                  </h3>
                  <p className="text-gray-700 font-semibold text-xs leading-snug m-0 mb-2">
                    {prog.subtitle}
                  </p>

                  <p className="text-gray-600 text-xs sm:text-[12px] leading-snug font-normal m-0 mb-3.5 line-clamp-3 min-h-[46px] text-left">
                    {prog.description}
                  </p>
                </div>

                {/* 2 Buttons Side-by-Side: Get Brochure & Apply Now (Single Line Normal Height) */}
                <div className="grid grid-cols-2 gap-1.5 pt-2.5 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => onOpenBrochure?.(`${prog.title} Brochure`)}
                    className="inline-flex items-center justify-center gap-1 bg-[#25a244] hover:bg-[#1f8b39] text-white font-semibold text-[11px] sm:text-xs py-1.5 px-1.5 sm:px-2 rounded-md shadow-xs transition-colors cursor-pointer border-none whitespace-nowrap active:scale-95"
                  >
                    <span className="whitespace-nowrap">Get Brochure</span>
                    <DownloadOutlined className="text-[10px] shrink-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(`${prog.title} Course Card`)}
                    className="inline-flex items-center justify-center bg-[#811811] hover:bg-[#6b140e] text-white font-semibold text-[11px] sm:text-xs py-1.5 px-1.5 sm:px-2 rounded-md shadow-xs transition-colors cursor-pointer border-none whitespace-nowrap active:scale-95"
                  >
                    <span className="whitespace-nowrap">Apply Now</span>
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

