"use client";

import React from "react";
import Image from "next/image";

export default function ManipalAbout({ about = {}, brand = {}, stats = [] }) {
  const universityName = brand.name || "Manipal University Online";
  const primaryColor = brand.aboutHighlightColor || brand.aboutColor || "#ee3024";
  const activeStats = stats.length > 0 ? stats : brand.stats || [];

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const imageSrc =
    about.image ||
    brand.campusImage ||
    "/assets/manipal_v1_images/manipal-about.webp";

  return (
    <section
      id="about"
      className="w-full pt-7 sm:pt-9 lg:pt-11 pb-0 bg-white relative overflow-hidden select-none font-['Poppins',sans-serif]"
    >
      {/* 1. Title & Paragraphs */}
      <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-[26px] sm:text-[29px] lg:text-[32px] font-extrabold text-[#111111] tracking-normal leading-tight m-0 mb-2">
          About{" "}
          <span style={{ color: primaryColor }}>
            {brand.aboutHighlight || brand.name || universityName}
          </span>
        </h2>

        {paragraphs.length > 0 && (
          <div className="space-y-2 mb-8 sm:mb-10 lg:mb-12">
            {/* Paragraph 1: Main description */}
            {paragraphs[0] && (
              <p className="text-[13.5px] sm:text-[14px] text-[#222222] font-normal leading-[1.50] tracking-normal m-0 max-w-[820px] mx-auto">
                {paragraphs[0]}
              </p>
            )}

            {/* Paragraph 2: Quote (Bold black text matching Image 1) */}
            {paragraphs[1] && (
              <p className="text-[14px] sm:text-[14.5px] text-[#111111] font-medium leading-snug tracking-normal m-0 pt-6 max-w-[860px] mx-auto">
                {paragraphs[1]}
              </p>
            )}

            {/* Remaining paragraphs if any */}
            {paragraphs.slice(2).map((p, idx) => (
              <p
                key={idx}
                className="text-[12.5px] text-[#222222] font-normal leading-relaxed m-0"
              >
                {p}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* 2. 4-Column Stats Grid - Synchronized with the building wings & dome */}
      {activeStats.length > 0 && (
        <div className="w-full max-w-[1240px] xl:max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-y-8 gap-x-4 sm:gap-x-6 lg:gap-x-10 items-start w-full">
            {activeStats.map((st, idx) => {
              // Add defensive horizontal offset so Col 2 and Col 3 flank the dome with ample clearance
              const colOffsetClass =
                idx === 1
                  ? "sm:pr-3 md:pr-6 lg:pr-10"
                  : idx === 2
                    ? "sm:pl-3 md:pl-6 lg:pl-10"
                    : "";

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center text-center ${colOffsetClass}`}
                >
                  <div
                    className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold leading-none tracking-normal"
                    style={{ color: primaryColor }}
                  >
                    {st.number}
                  </div>
                  <div className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-[#333333] font-medium mt-2 leading-snug whitespace-normal sm:whitespace-nowrap max-w-[210px]">
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Full-Width Campus Building Image - 100% full cover across desktop screen matching Target Image 1 */}
      {imageSrc && (
        <div className="relative w-full overflow-hidden -mt-3 sm:-mt-[36px] md:-mt-[48px] lg:-mt-[60px] xl:-mt-[72px] 2xl:-mt-[84px] z-0 pointer-events-none select-none">
          <Image
            src={imageSrc}
            alt={about.title || universityName}
            width={1920}
            height={672}
            priority
            className="w-full min-w-full h-auto object-cover block"
            sizes="100vw"
          />
        </div>
      )}
    </section>
  );
}
