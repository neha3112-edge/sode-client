"use client";

import React from "react";
import Image from "next/image";

export default function IiitbWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const title = brand.whyChooseTitle || "WHY CHOOSE?";
  const subtitle = brand.whyChooseSubtitle || `${brand.name || "IIIT Bangalore"} Online Courses`;

  return (
    <section
      id="why_choose"
      className="why-section py-14 sm:py-16 bg-white text-center select-none scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="why-header mb-8 sm:mb-12">
          <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#111111] m-0 mb-1">
            {title}
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#444444] tracking-wide m-0">
            {subtitle}
          </p>
        </div>

        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item, idx) => {
            const isDark = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`why-card p-8 sm:p-10 text-white flex flex-col items-center text-center ${
                  isDark ? "bg-[#1b355e]" : "bg-[#1f9acb]"
                }`}
              >
                {item.image && (
                  <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                )}
                <h3 className="text-[18px] font-bold mb-3 text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-white/95 m-0 font-normal">
                  {item.desc || item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
