"use client";

import React from "react";
import Image from "next/image";

/**
 * Reusable Landing Approvals Section
 * Matches the reference design with full-width yellow header banner and clean approvals grid.
 * Fully responsive: 1 column on mobile, 2 on tablet, 4 on desktop.
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
  const activeBannerBg = bannerBg || brand?.accentColor || "#ffd200";

  return (
    <section id="approvals" className="w-full">
      {/* 1. Full-Width Yellow Header Banner */}
      <div
        className="w-full py-2.5 sm:py-3.5 px-4 text-center select-none shadow-xs"
        style={{ backgroundColor: activeBannerBg }}
      >
        <h3 className="m-0 text-[14px] sm:text-[17px] md:text-[20px] font-bold text-[#08417b] tracking-tight leading-tight">
          {activeUniversity}
        </h3>
        <h2 className="m-0 mt-0.5 text-[18px] sm:text-[22px] md:text-[26px] font-extrabold text-[#08417b] tracking-tight leading-tight">
          {title}
        </h2>
      </div>

      {/* 2. Approvals Grid on Warm Light Cream Background */}
      <div className="py-6 sm:py-10 bg-[#fffde8] border-b border-amber-200/50">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 items-center">
            {approvals.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 sm:gap-3.5 bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-lg sm:rounded-none border border-amber-100 sm:border-none shadow-xs sm:shadow-none group"
              >
                {/* Logo Image */}
                <div className="relative w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] lg:w-[88px] lg:h-[88px] shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.text || "Recognition approval"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 64px, 88px"
                  />
                </div>

                {/* Description Text */}
                <div className="flex-1 min-w-0">
                  {showTags && item.tag && (
                    <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mb-1">
                      {item.tag}
                    </span>
                  )}
                  <p className="text-[12px] sm:text-[13px] leading-snug text-[#333333] font-medium m-0">
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
