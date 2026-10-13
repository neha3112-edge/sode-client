"use client";

import React from "react";
import Image from "next/image";

export default function ManipalAbout({ about = {}, brand = {}, stats = [] }) {
  const universityName = brand.name || "University Online";
  const primaryColor = brand.primaryColor || "#ee3024";
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
    <section id="about" className="pt-10 sm:pt-14 pb-0 bg-white relative overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight m-0 mb-3">
          About{" "}
          <span style={{ color: primaryColor }}>
            {brand.aboutHighlight || brand.name || universityName}
          </span>
        </h2>
        {paragraphs.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-2.5 mb-8 sm:mb-12">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`text-[12.5px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal m-0 ${
                  idx === 1 ? "font-semibold italic text-slate-800" : ""
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        )}
        {activeStats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-2 sm:px-4 relative z-10">
            {activeStats.map((st, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className="text-[26px] sm:text-[30px] lg:text-[34px] font-black leading-tight tracking-tight"
                  style={{ color: primaryColor }}
                >
                  {st.number}
                </div>
                <div className="text-[11px] sm:text-[12px] text-slate-600 font-medium mt-0.5 leading-snug max-w-[190px]">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {imageSrc && (
        <div className="relative w-full max-w-[1440px] 2xl:max-w-[1500px] mx-auto -mt-6 sm:-mt-10 md:-mt-14 z-0">
          <Image
            src={imageSrc}
            alt={about.title || universityName}
            width={1500}
            height={525}
            priority
            className="w-full h-auto object-contain block mx-auto"
            sizes="(max-width: 1536px) 100vw, 1500px"
          />
        </div>
      )}
    </section>
  );
}
