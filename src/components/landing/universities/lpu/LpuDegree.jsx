"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { lpuImg, LPU_DEGREE_CARDS } from "./constants";

export default function LpuDegree({ onOpenApply }) {
  return (
    <section
      id="degree"
      className="w-full bg-[#fff8f2] py-10 sm:py-14 lg:py-16 scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Sample Certificate directly without extra bg-white box or padding */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-[8px] overflow-hidden shadow-md">
              <Image
                src={lpuImg("sample-certificate-lpu.webp")}
                alt="LPU Online Sample Degree Certificate"
                width={666}
                height={825}
                sizes="(max-width: 1024px) 100vw, 420px"
                style={{ width: "100%", height: "auto" }}
                className="w-full h-auto object-contain block rounded-[8px]"
              />
            </div>
          </div>

          {/* Right: UGC Entitled Content & 4 Cards */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center">
            <h2 className="text-[#f58220] font-bold text-[24px] sm:text-[30px] lg:text-[34px] leading-tight m-0">
              Get UGC Entitled Online Degree
            </h2>
            <h3 className="text-[#111827] font-bold text-[17px] sm:text-[20px] lg:text-[22px] leading-tight mt-1 mb-2">
              Which Enhance Your Career
            </h3>
            <p className="text-[#444444] text-[12px] sm:text-[13px] leading-[1.34] sm:leading-[1.38] m-0 mb-4 max-w-[620px]">
              Lovely Professional University Online (LPU Online) is one of the most trusted and
              credible institutions in India that offers flexible and affordable education in
              digital mode.
            </p>

            {/* 2x2 Grid of Orange Border Cards with tight spacing and line-height */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-5 sm:mb-6">
              {LPU_DEGREE_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="bg-white rounded-[6px] sm:rounded-[8px] p-3.5 sm:p-4 border-[1.5px] border-[#f58220] flex flex-col text-left shadow-2xs"
                >
                  <h4 className="text-[#111827] font-bold text-[13.5px] sm:text-[14px] leading-tight m-0 mb-1">
                    {card.title}
                  </h4>
                  <p className="text-[#444444] text-[11.5px] sm:text-[12px] leading-[1.32] m-0">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <button
                type="button"
                onClick={onOpenApply}
                className="bg-black hover:bg-gray-800 text-white font-semibold text-[13px] sm:text-[13.5px] px-6 py-2.5 rounded-[4px] shadow-sm transition-all cursor-pointer border-none active:scale-95"
              >
                Get FREE Career Assistance
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

