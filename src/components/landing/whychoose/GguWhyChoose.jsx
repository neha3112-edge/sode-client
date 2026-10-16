"use client";

import React from "react";
import Image from "next/image";

export default function GguWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const title = brand.whyChooseTitle || "LEARNING OUTCOMES";
  const subtitle = brand.whyChooseSubtitle || `After a DBA at ${brand.name || "GGU"}`;
  const bg = brand.whyChooseBg || brand.primaryColor || "#003468";

  return (
    <section
      id="benefits"
      data-section="whychoose"
      className="benefits-section w-full text-white select-none overflow-hidden scroll-mt-20"
      style={{ backgroundColor: bg }}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_2fr] items-stretch min-h-[480px] lg:min-h-[520px] lg:h-[520px]">
        {/* Desktop Left: Golden Gate Bridge (ds-view) */}
        <div className="hidden lg:block relative w-full h-full min-h-[480px] lg:min-h-[520px] overflow-hidden">
          <Image
            src={brand.benefitsImage || brand.whyChooseImage || "/assets/all_universities_images/ggu/learning-outcome-01.webp"}
            alt={title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 0vw, 35vw"
          />
        </div>

        {/* Right Content: Title, Subtitle, 6 items in 2 columns (benft-1) */}
        <div
          className="flex flex-col justify-start px-6 sm:px-10 lg:px-12 xl:px-14 pt-8 sm:pt-10 lg:pt-11 pb-8 text-white text-left"
          style={{ backgroundColor: bg }}
        >
          <h2 className="text-white text-[24px] sm:text-[26px] lg:text-[28px] font-extrabold uppercase m-0 leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-white text-[16px] sm:text-[18px] lg:text-[20px] font-semibold mt-1 mb-6 sm:mb-7 lg:mb-8 m-0 leading-snug">
            {subtitle}
          </p>

          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 lg:gap-x-12 xl:gap-x-14 gap-y-7 sm:gap-y-7 max-w-4xl">
            {whyChoose.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 group">
                <div className="relative w-14 h-14 sm:w-[52px] sm:h-[52px] shrink-0 transition-transform group-hover:scale-105">
                  <Image
                    src={item.image || "/assets/all_universities_images/ggu/learning-outcone-icon.webp"}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-[14.5px] sm:text-[16px] lg:text-[16.5px] font-bold m-0 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/95 text-[12px] sm:text-[13px] lg:text-[13.5px] mt-1 m-0 leading-snug font-normal whitespace-normal max-w-[260px]">
                    {item.desc || item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View: Bottom Golden Gate Bridge (mb-view) */}
        <div className="block lg:hidden w-full relative h-[220px] sm:h-[280px] -mb-1 overflow-hidden">
          <Image
            src="/assets/all_universities_images/ggu/learing-outome-mobile.webp"
            alt={title}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
