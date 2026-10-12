"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function EsgciWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const title = brand.whyChooseTitle || "PROFESSIONAL ADVANTAGES OF";
  const subtitle = brand.whyChooseSubtitle || "Completing the ESGCI Online DBA";
  const btnText = brand.whyChooseButtonText || brand.whyChooseBtnText || "Enroll & Get Your DBA Degree";

  return (
    <section
      id="benefits"
      data-section="whychoose"
      className="benefits-section w-full select-none py-10 sm:py-14 lg:py-16 scroll-mt-20 text-white relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Desktop: Content placed on right half so man with laptop in background is visible on left */}
        <div className="lg:w-[65%] xl:w-[62%] lg:ml-auto text-left">
          <div className="benft-header mb-6 sm:mb-8 text-left">
            <h2 className="text-[22px] sm:text-[26px] lg:text-[30px] font-black text-white uppercase tracking-tight mb-1 leading-tight">
              {title}
            </h2>
            <p className="text-[16px] sm:text-[18px] lg:text-[21px] text-white font-semibold leading-snug">
              {subtitle}
            </p>
          </div>

          {/* Cards Grid: 2 columns vertical cards on mobile, 3 columns horizontal cards on desktop */}
          <div className="bnf-data grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {whyChoose.map((item, idx) => (
              <div
                key={idx}
                className="bnf-card bg-white rounded-[14px] sm:rounded-[16px] lg:rounded-[14px] p-3.5 sm:p-4 lg:px-4 lg:py-3.5 flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 lg:gap-3.5 shadow-sm min-h-[125px] lg:min-h-[72px] text-center lg:text-left transition-transform hover:-translate-y-0.5"
              >
                {item.image && (
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-11 lg:h-11 shrink-0 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 56px, 44px"
                    />
                  </div>
                )}
                <h3 className="text-[12px] sm:text-[13px] lg:text-[13.5px] font-bold text-black leading-snug m-0">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-left">
            <button
              type="button"
              onClick={() => onOpenApply?.()}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-black hover:bg-neutral-900 text-white font-bold text-[13.5px] sm:text-[14.5px] rounded-[6px] border-none cursor-pointer shadow-md active:scale-95 transition-all"
            >
              <span>{btnText}</span>
              <span className="text-[#fff000] text-[17px] leading-none font-bold">➔</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
