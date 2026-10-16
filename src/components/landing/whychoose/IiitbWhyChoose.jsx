"use client";

import React from "react";
import Image from "next/image";

export default function IiitbWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const title = brand.whyChooseTitle || "WHY CHOOSE?";
  const subtitle = brand.whyChooseSubtitle || `${brand.name || "IIIT Bangalore"} Online Courses`;

  return (
    <section
      id="why_choose"
      className="why-section w-full pt-8 sm:pt-12 pb-0 bg-white text-center select-none scroll-mt-20 overflow-hidden"
      style={{ paddingBottom: 0, marginBottom: 0 }}
    >
      <div className="why-header max-w-[1240px] mx-auto px-4 mb-6 sm:mb-8 text-center">
        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#111111] m-0 mb-1.5 uppercase tracking-wide">
          {title}
        </h2>
        <p className="text-[15px] sm:text-[17px] text-[#444444] font-medium tracking-normal m-0">
          {subtitle}
        </p>
      </div>

      <div className="why-grid w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {whyChoose.map((item, idx) => {
          const isDark = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`why-card ${
                isDark ? "dark bg-[#1b355e]" : "light bg-[#1f9acb]"
              } w-full p-8 sm:p-10 lg:p-12 text-white flex flex-col items-center text-center justify-start`}
            >
              {item.image && (
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
              )}
              <h3 className="text-[18px] sm:text-[20px] font-bold mb-3 text-white leading-snug">
                {item.title}
              </h3>
              <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-white/95 m-0 font-normal max-w-md">
                {item.desc || item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
