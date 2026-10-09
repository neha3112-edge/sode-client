"use client";

import React from "react";
import Image from "next/image";
import LandingContainer from "../LandingContainer";

export default function VguWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const headerBg = brand.primaryColor || "#811811";
  const rawTitle =
    brand.whyChooseTitle ||
    `Why ${brand.name || "Vivekananda Global University Online"} is a Smart Choice for learners?`;

  // Render title with clean 3-line break matching user request
  const renderTitle = () => {
    if (typeof rawTitle === "string") {
      const lines = rawTitle.includes("\n")
        ? rawTitle.split("\n")
        : [
            "Why Vivekananda Global University",
            "Online is a Smart Choice",
            "for learners?",
          ];
      return lines.map((line, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <br />}
          <span>{line}</span>
        </React.Fragment>
      ));
    }
    return rawTitle;
  };

  return (
    <section id="Resources" className="py-9 sm:py-12 bg-white border-b border-slate-200 select-none">
      <LandingContainer>
        <div className="flex justify-center mb-4 sm:mb-4.5">
          <div
            className="text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-[8px] sm:rounded-[10px] text-center shadow-xs max-w-[490px] sm:max-w-[510px] mx-2 sm:mx-0"
            style={{ backgroundColor: headerBg }}
          >
            <h2 className="text-[15.5px] sm:text-[19px] md:text-[20px] font-semibold text-white tracking-wide leading-[1.3] m-0">
              {renderTitle()}
            </h2>
          </div>
        </div>

        {brand.whyChooseDescription && (
          <p className="text-center text-[12px] sm:text-[13px] text-slate-600 leading-[1.65] max-w-[960px] mx-auto mb-7 sm:mb-8 font-normal px-2">
            {brand.whyChooseDescription}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-7 sm:gap-y-8 max-w-5xl mx-auto">
          {whyChoose.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group px-2">
              {item.image && (
                <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] mb-3 sm:mb-3.5 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>
              )}
              <h3 className="text-[15px] sm:text-[16px] font-bold text-slate-900 m-0 tracking-tight leading-snug mb-1">
                {item.title}
              </h3>
              <p className="text-[12px] sm:text-[12.5px] text-slate-600 leading-relaxed font-normal m-0 max-w-[310px]">
                {item.desc || item.description}
              </p>
            </div>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}

