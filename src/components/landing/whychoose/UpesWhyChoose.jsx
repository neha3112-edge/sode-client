"use client";

import React from "react";
import Image from "next/image";

export default function UpesWhyChoose({
  whyChoose = [],
  brand = {},
}) {
  const title =
    brand.whyChooseTitle ||
    "Why Choose UPES University Online (UPES CCE)";

  return (
    <section
      id="whychoose"
      className="py-10 sm:py-14 select-none scroll-mt-20"
      style={{
        backgroundImage: "linear-gradient(to right, #21b6ea, #5b359d)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <h2 className="text-[20px] sm:text-[25px] lg:text-[28px] font-bold text-white text-center tracking-tight mb-7 sm:mb-9 m-0">
          <b>Why Choose </b> UPES University Online (UPES CCE)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5">
          {whyChoose.map((item, idx) => {
            const isLeftBorder = item.borderSide === "left" || idx === 2 || idx === 3;
            return (
              <div
                key={idx}
                className={`bg-white p-4 sm:p-4.5 rounded-[4px] shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-start gap-3.5 ${
                  isLeftBorder
                    ? "border-l-4 border-[#ffb300]"
                    : "border-r-4 border-[#ffb300]"
                }`}
              >
                {item.image && (
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 mt-0.5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#111111] m-0 mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] text-[#444444] leading-relaxed m-0 font-normal">
                    {item.desc || item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
