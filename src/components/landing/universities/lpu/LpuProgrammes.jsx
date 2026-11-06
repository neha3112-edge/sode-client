"use client";

import React from "react";
import Image from "next/image";
import { DownloadOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { LPU_PROGRAMMES } from "./constants";

export default function LpuProgrammes({ onOpenBrochure }) {
  const renderCard = (prog) => (
    <div
      key={prog.code}
      className="bg-white rounded-[12px] p-4 sm:p-5 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow text-left"
    >
      {/* 1. Mobile View (< md): Float image so text wraps naturally around it */}
      <div className="block md:hidden">
        {/* Floating image thumbnail on left */}
        <div className="float-left mr-3.5 mb-1.5 w-[92px] h-[92px] rounded-[10px] overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
          <Image
            src={prog.image}
            alt={prog.title}
            width={92}
            height={92}
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-[#111827] font-bold text-[19px] leading-none m-0">
          {prog.code}
        </h3>
        <h4 className="text-[#111827] font-semibold text-[11.5px] leading-tight mt-0.5 mb-1.5 m-0">
          {prog.title}
        </h4>

        {/* Description wraps around floated image */}
        <p className="text-[#333333] text-[12px] leading-[1.26] m-0 mb-3">
          {prog.desc}
        </p>

        {/* Action Button at bottom left */}
        <div className="clear-both pt-1">
          <button
            type="button"
            onClick={() => onOpenBrochure?.(prog.code)}
            className="bg-[#f58220] hover:bg-[#e07115] text-white font-semibold text-[12px] py-1.5 px-4 rounded-[5px] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer border-none transition-all active:scale-95 w-fit select-none"
          >
            <span>Download Brochure</span>
            <DownloadOutlined className="text-[11px]" />
          </button>
        </div>
      </div>

      {/* 2. Desktop View (>= md): Clean 2-column flex layout */}
      <div className="hidden md:flex items-start gap-4.5 lg:gap-5 w-full">
        {/* Left Column: Big square image */}
        <div className="relative w-[145px] h-[145px] lg:w-[155px] lg:h-[155px] shrink-0 rounded-[10px] overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
          <Image
            src={prog.image}
            alt={prog.title}
            width={155}
            height={155}
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>

        {/* Right Column: Title, Subtitle, Description, Button */}
        <div className="flex flex-col justify-between flex-grow min-h-[145px] lg:min-h-[155px]">
          <div>
            <h3 className="text-[#111827] font-bold text-[20px] lg:text-[22px] leading-tight m-0">
              {prog.code}
            </h3>
            <h4 className="text-[#111827] font-semibold text-[12px] lg:text-[12.5px] leading-snug mt-0.5 mb-1.5 m-0">
              {prog.title}
            </h4>
            <p className="text-[#333333] text-[12px] lg:text-[12.5px] leading-[1.3] m-0 mb-3 line-clamp-3">
              {prog.desc}
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => onOpenBrochure?.(prog.code)}
              className="bg-[#f58220] hover:bg-[#e07115] text-white font-semibold text-[12px] lg:text-[12.5px] py-1.5 px-4 rounded-[5px] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer border-none transition-all active:scale-95 w-fit select-none"
            >
              <span>Download Brochure</span>
              <DownloadOutlined className="text-[11px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="program"
      className="w-full bg-[#fcfbfa] py-4 sm:py-6 lg:py-8 scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        {/* 1. Post-Graduate Programs */}
        <div className="mb-6 sm:mb-8 text-left">
          {/* Main Section Header */}
          <h2 className="text-[#9ca3af] font-bold text-[22px] sm:text-[28px] leading-none m-0 mb-1 sm:mb-1.5">
            Explore Program
          </h2>

          <h3 className="text-[#f58220] font-bold text-[15.5px] sm:text-[18px] leading-tight m-0 mb-2.5 sm:mb-3">
            Post-Graduate Programs of LPU Online
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4.5 w-full">
            {LPU_PROGRAMMES.postGraduate.map(renderCard)}
          </div>
        </div>

        {/* 2. Undergraduate Programs */}
        <div className="text-left">
          <h3 className="text-[#f58220] font-bold text-[15.5px] sm:text-[18px] leading-tight m-0 mb-2.5 sm:mb-3">
            Undergraduate Programs of LPU Online
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4.5 w-full">
            {LPU_PROGRAMMES.underGraduate.map(renderCard)}
          </div>
        </div>
      </Container>
    </section>
  );
}

