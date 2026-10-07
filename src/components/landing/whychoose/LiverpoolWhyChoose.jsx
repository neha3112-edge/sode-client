"use client";

import React from "react";
import Image from "next/image";

export default function LiverpoolWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const leftCards = whyChoose.slice(0, 3);
  const rightCards = whyChoose.slice(3, 6);
  const heading = brand.whyChooseTitle || "What Makes";
  const subHeading = brand.whyChooseSubtitle || `${brand.name || "Liverpool Business School"} MBA Stand Out?`;

  return (
    <section
      id="why-choose"
      className="mba-offer-section w-full select-none py-14 sm:py-18 relative bg-cover bg-center scroll-mt-20 text-white"
      style={{
        backgroundImage: `url(${brand.whyChooseBgImage || "/assets/all_universities_images/liverpool/MID.webp"})`,
      }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <h2 className="text-[26px] sm:text-[34px] font-bold text-center mb-10 sm:mb-14 leading-snug m-0">
          {heading} <br />
          <span className="text-[#2de1c2]">{subHeading}</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {leftCards.map((c, idx) => (
              <div
                key={idx}
                className="bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-md border border-slate-100"
              >
                <span className="text-[26px] text-[#1bc9a4] shrink-0">{c.icon || "🎓"}</span>
                <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                  {c.title || c.desc || c.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[320px] h-[340px] sm:h-[400px]">
              <Image
                src={brand.whyChooseCenterImage || "/assets/all_universities_images/liverpool/MID-2.webp"}
                alt="Liverpool MBA Stand Out"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {rightCards.map((c, idx) => (
              <div
                key={idx}
                className="bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-md border border-slate-100"
              >
                <span className="text-[26px] text-[#1bc9a4] shrink-0">{c.icon || "💼"}</span>
                <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                  {c.title || c.desc || c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
