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
      className="pt-8 sm:pt-9 lg:pt-10 pb-0 bg-white relative overflow-hidden select-none"
    >
      {/* 1. Title & Paragraphs */}
      <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-[25px] sm:text-[28px] lg:text-[31px] font-bold text-[#111111] tracking-tight leading-tight m-0 mb-3">
          About{" "}
          <span style={{ color: primaryColor }}>
            {brand.aboutHighlight || brand.name || universityName}
          </span>
        </h2>

        {paragraphs.length > 0 && (
          <div className="space-y-2 mb-6 sm:mb-8 lg:mb-9">
            {/* Paragraph 1: Main description */}
            {paragraphs[0] && (
              <p className="text-[12px] sm:text-[12.5px] lg:text-[13px] text-[#222222] font-normal leading-[1.62] tracking-normal m-0 max-w-[780px] mx-auto">
                {paragraphs[0]}
              </p>
            )}

            {/* Paragraph 2: Quote (Bold black text matching Image 1) */}
            {paragraphs[1] && (
              <p className="text-[11.5px] sm:text-[12px] lg:text-[12.5px] text-[#111111] font-bold leading-snug tracking-normal m-0 pt-1.5 max-w-[760px] mx-auto">
                {paragraphs[1]}
              </p>
            )}

            {/* Remaining paragraphs if any */}
            {paragraphs.slice(2).map((p, idx) => (
              <p
                key={idx}
                className="text-[12px] sm:text-[12.5px] text-[#222222] font-normal leading-relaxed m-0"
              >
                {p}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* 2. 4-Column Stats Grid - Spread wide across desktop to flank the building dome */}
      {activeStats.length > 0 && (
        <div className="w-full max-w-[1080px] xl:max-w-[1140px] 2xl:max-w-[1220px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 sm:gap-6 lg:gap-8 items-start">
            {activeStats.map((st, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className="text-[28px] sm:text-[32px] lg:text-[35px] font-extrabold leading-none tracking-tight"
                  style={{ color: primaryColor }}
                >
                  {st.number}
                </div>
                <div className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-[#333333] font-medium mt-1.5 leading-snug max-w-[185px]">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Full-width Campus Building Image - Dome centered between Stat 2 & 3 */}
      {imageSrc && (
        <div className="relative w-full overflow-hidden -mt-[55px] sm:-mt-[80px] md:-mt-[100px] lg:-mt-[112px] xl:-mt-[125px] z-0 pointer-events-none select-none">
          <Image
            src={imageSrc}
            alt={about.title || universityName}
            width={1500}
            height={525}
            priority
            className="w-full h-auto object-cover sm:object-contain block mx-auto"
            sizes="100vw"
          />
        </div>
      )}
    </section>
  );
}
