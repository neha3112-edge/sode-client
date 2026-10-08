"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function EsgciWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const title = brand.whyChooseTitle || "Professional Advantages of";
  const subtitle = brand.whyChooseSubtitle || `Completing the ${brand.name || "ESGCI"} Online DBA`;
  const bg = brand.whyChooseBg || brand.primaryColor || "#04903c";
  const btnText = brand.whyChooseButtonText || brand.whyChooseBtnText || "Enroll & Get Your DBA Degree";

  return (
    <section
      id="benefits"
      data-section="whychoose"
      className="benefits-section w-full select-none py-12 sm:py-16 scroll-mt-20 text-white"
      style={{ backgroundColor: bg }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-white mb-1 tracking-tight">
          {title}
        </h2>
        <p className="text-[18px] sm:text-[22px] lg:text-[25px] text-white font-medium mb-10 leading-snug">
          {subtitle}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mb-10">
          {whyChoose.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              {item.image && (
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 transition-transform group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
              )}
              <h3 className="text-[13px] sm:text-[14px] lg:text-[14.5px] font-bold text-white leading-snug m-0">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpenApply?.()}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-neutral-900 text-white font-bold text-[14.5px] sm:text-[15.5px] rounded-[5px] transition-all border-none cursor-pointer shadow-md active:scale-95"
        >
          <span>{btnText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
