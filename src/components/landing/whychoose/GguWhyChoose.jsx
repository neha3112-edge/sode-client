"use client";

import React from "react";
import Image from "next/image";

export default function GguWhyChoose({ whyChoose = [], brand = {} }) {
  const title = brand.whyChooseTitle || "LEARNING OUTCOMES";
  const subtitle = brand.whyChooseSubtitle || "After a DBA at GGU";

  return (
    <section
      id="benefits"
      data-section="whychoose"
      className="benefits-section w-full bg-[#003468] text-white select-none overflow-hidden scroll-mt-20"
      style={{ backgroundColor: brand.whyChooseBg || "#003468" }}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] lg:min-h-[520px]">
        {/* Left: Full-Bleed Bridge Image */}
        <div className="lg:col-span-4 xl:col-span-4 relative w-full h-[320px] sm:h-[400px] lg:h-full min-h-[350px] lg:min-h-[520px] bg-slate-900 overflow-hidden">
          <Image
            src={brand.benefitsImage || "/assets/all_universities_images/ggu/learning-outcome-01.webp"}
            alt="Golden Gate Bridge"
            fill
            priority
            className="object-cover object-left"
            sizes="(max-width: 1024px) 100vw, 35vw"
          />
        </div>

        {/* Right: Content & 2-Column Grid */}
        <div className="lg:col-span-8 xl:col-span-8 bg-[#003468] flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-14 xl:px-20 py-12 sm:py-14 lg:py-16 text-white text-left">
          <h2 className="text-white text-[24px] sm:text-[28px] lg:text-[32px] font-extrabold uppercase m-0 leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-white/95 text-[15px] sm:text-[17px] font-semibold mt-1 mb-8 sm:mb-10 m-0">
            {subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-16 xl:gap-x-24 gap-y-7 sm:gap-y-9 max-w-5xl">
            {whyChoose.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5 sm:gap-4 group">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 transition-transform group-hover:scale-105">
                  <Image
                    src={item.image || "/assets/all_universities_images/ggu/learning-outcone-icon.webp"}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-[14.5px] sm:text-[15.5px] font-bold m-0 leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-[11.5px] sm:text-[12.5px] mt-1 m-0 leading-snug font-normal whitespace-normal">
                    {item.desc || item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
