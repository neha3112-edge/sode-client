"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function SsbmWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const title = brand.whyChooseTitle || "Global Doctor of";
  const subtitle = brand.whyChooseSubtitle || `Business Administration with ${brand.name || "SSBM"}`;
  const btnText = brand.whyChooseButtonText || brand.whyChooseBtnText || "Enroll & Get Your DBA Degree";

  return (
    <section
      id="benefits"
      data-section="whychoose"
      className="benefits-section w-full select-none scroll-mt-20 text-white relative bg-cover"
      style={{
        backgroundImage: `url(${brand.whyChooseBgImage || "/assets/all_universities_images/ssbm/Global.webp"})`,
      }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Spacer for Desktop Background Alignment */}
          <div className="hidden lg:block lg:col-span-4" />

          {/* Right Content */}
          <div className="lg:col-span-8 py-8 sm:py-8 text-left">
            <h2 className="text-[25px] sm:text-[34px] lg:text-[38px] font-extrabold text-white leading-[1.1] uppercase m-0">
              {title}
            </h2>
            <p className="text-[25px] sm:text-[24px] lg:text-[26px] text-white font-normal sm:font-medium mt-1 mb-6 leading-tight sm:leading-snug">
              {subtitle}
            </p>

            <div className="bnf-data grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-6 sm:mb-8 max-w-[360px] sm:max-w-none">
              {whyChoose.map((item, idx) => (
                <div
                  key={idx}
                  className="bnf1 bg-white text-black p-2.5 sm:p-3.5 rounded-[10px] flex flex-col items-center justify-center text-center gap-1.5 shadow-none sm:shadow-md min-h-[135px]"
                >
                  {item.image && (
                    <div className="relative w-[50px] h-[50px] shrink-0 mb-1">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="50px"
                      />
                    </div>
                  )}
                  <h3 className="text-[14px] sm:text-[14px] font-bold text-[#111111] leading-tight m-0 text-center">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onOpenApply?.()}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 bg-black hover:bg-neutral-900 text-white font-bold text-[15px] sm:text-[15px] rounded-[5px] transition-all border-none cursor-pointer shadow-md active:scale-95"
            >
              <span>{btnText}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
