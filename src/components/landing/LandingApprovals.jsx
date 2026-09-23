"use client";

import React from "react";
import Image from "next/image";

/**
 * Reusable Landing Approvals Section
 * Matches the reference design with full-width yellow header banner and clean circular approvals grid.
 * Data-driven from JSON/landing data (approvals array, universityName, brand).
 */
export default function LandingApprovals({
  approvals = [],
  universityName,
  brand,
  title = "Recognition and Approvals",
  bannerBg,
  showTags = false,
}) {
  if (!approvals || approvals.length === 0) return null;

  const activeUniversity = universityName || brand?.name || "Amity University Online";
  const activeBannerBg = bannerBg || brand?.accentColor || "#53df30ff";

  return (
    <section id="approvals" className="w-full">
      {/* 1. Full-Width Yellow Header Banner matching Image 1 */}
      <div
        className="w-full py-3 sm:py-3.5 px-4 text-center select-none shadow-xs"
        style={{ backgroundColor: activeBannerBg }}
      >
        <h3 className="m-0 text-[17px] sm:text-[19px] md:text-[21px] font-bold text-[#08417b] tracking-tight leading-tight">
          {activeUniversity}
        </h3>
        <h2 className="m-0 mt-0.5 text-[22px] sm:text-[25px] md:text-[28px] font-extrabold text-[#08417b] tracking-tight leading-tight">
          {title}
        </h2>
      </div>

      {/* 2. Approvals Grid on Warm Light Cream Background matching Image 1 */}
      <div className="py-8 sm:py-10 bg-[#fffde8] border-b border-amber-200/50">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-7 sm:gap-y-9 gap-x-4 sm:gap-x-6 lg:gap-x-8 items-center">
            {approvals.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 sm:gap-3.5 group">
                {/* Large Logo Image without duplicate outer border (PNG has built-in golden ring) */}
                <div className="relative w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] lg:w-[90px] lg:h-[90px] shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.text || "Recognition approval"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 76px, 90px"
                  />
                </div>

                {/* Clean Description Text */}
                <div className="flex-1">
                  {showTags && item.tag && (
                    <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mb-1">
                      {item.tag}
                    </span>
                  )}
                  <p className="text-[12.5px] sm:text-[13.5px] lg:text-[14px] font-semibold text-[#1a1a1a] leading-[1.3] m-0 max-w-[200px]">
                    {item.text}
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
