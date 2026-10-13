"use client";

import React from "react";
import Image from "next/image";
import LandingContainer from "../LandingContainer";

export default function VguWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const headerBg = brand.primaryColor || "#811811";
  const title =
    brand.whyChooseTitle ||
    `Why ${brand.name || "Vivekananda Global University Online"} is a Smart Choice for learners?`;

  return (
    <section id="Resources" className="py-14 sm:py-20 bg-white border-b border-slate-200 select-none">
      <LandingContainer>
        <div className="flex justify-center mb-5">
          <div
            className="text-white px-7 sm:px-9 py-3 sm:py-3.5 rounded-[10px] text-center shadow-xs max-w-xl"
            style={{ backgroundColor: headerBg }}
          >
            <h2 className="text-[18px] sm:text-[21px] md:text-[22px] font-bold text-white tracking-tight leading-snug m-0">
              {title}
            </h2>
          </div>
        </div>

        {brand.whyChooseDescription && (
          <p className="text-center text-[12.5px] sm:text-[13.5px] text-slate-600 leading-relaxed max-w-4xl mx-auto mb-10 sm:mb-14 font-normal">
            {brand.whyChooseDescription}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-10 sm:gap-y-12 max-w-5xl mx-auto">
          {whyChoose.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group px-2">
              {item.image && (
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-3.5 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    sizes="64px"
                  />
                </div>
              )}
              <h3 className="text-[16px] sm:text-[17px] font-bold text-slate-900 m-0 tracking-tight leading-snug mb-1.5">
                {item.title}
              </h3>
              <p className="text-[12px] sm:text-[12.5px] text-slate-600 leading-relaxed font-normal m-0 max-w-[320px]">
                {item.desc || item.description}
              </p>
            </div>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}
