"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { VGU_APPROVALS } from "./constants";

export default function VguApprovals({ onOpenApply }) {
  return (
    <section
      id="approvals"
      className="w-full bg-white py-10 sm:py-14 border-b border-gray-100 scroll-mt-16 sm:scroll-mt-20 select-none"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Text & Enquire Button */}
          <div className="w-full lg:w-[42%] text-left">
            <h2 className="text-[#811811] font-bold text-2xl sm:text-[28px] lg:text-[32px] leading-tight m-0 mb-3">
              Vivekananda Global University <br className="hidden sm:inline" />
              Online Accreditation &amp; Approval
            </h2>
            <p className="text-gray-600 text-xs sm:text-[13.5px] leading-snug m-0 mb-5 max-w-md font-normal">
              Vivekananda Global University Online Courses are UGC-recognised and have top
              accreditations and approvals from the country&apos;s recognised statutory bodies.
            </p>
            <div>
              <button
                type="button"
                onClick={() => onOpenApply?.("Approvals Section Enquire Now")}
                className="bg-[#ffc107] hover:bg-[#e0a800] text-black font-bold text-xs sm:text-sm py-2.5 px-7 rounded-md shadow-xs transition-all cursor-pointer border-none active:scale-95"
              >
                Enquire Now
              </button>
            </div>
          </div>

          {/* Right 4 Pill Cards (2x2 on desktop, vertical on mobile) */}
          <div className="w-full lg:w-[56%] grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {VGU_APPROVALS.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 hover:border-[#811811] rounded-[24px] sm:rounded-[28px] p-3 sm:p-3.5 flex items-center gap-3.5 bg-white shadow-xs hover:shadow-sm transition-all"
              >
                <div className="relative w-12 h-12 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="52px"
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-800 text-[11.5px] sm:text-[12.5px] font-semibold leading-snug m-0">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

