"use client";

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

export default function UniversityTopRecruiters({
  recruiters = [],
  uniName = "",
}) {
  if (!Array.isArray(recruiters) || recruiters.length === 0) {
    return null;
  }

  const title = `Top Recruiters at ${uniName || "University"}`;

  return (
    <div
      id="top-recruiters"
      data-nav-label="Top Recruiters"
      className="scroll-mt-20 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-5"
    >
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight m-0">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3.5">
        {recruiters.map((r, idx) => {
          const logoSrc = r.logo ? getAssetPath(r.logo) : null;
          return (
            <div
              key={r._id || idx}
              className="bg-white rounded-lg border border-gray-200/90 hover:border-blue-400 hover:shadow-xs p-3 flex items-center justify-center transition-all h-14 sm:h-16 shadow-2xs group"
            >
              {logoSrc ? (
                <div className="relative w-full h-7 sm:h-8 flex items-center justify-center">
                  <Image
                    src={logoSrc}
                    alt={r.name || "Recruiter Logo"}
                    fill
                    sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
                    className="object-contain transition-transform group-hover:scale-105"
                  />
                </div>
              ) : (
                <span className="text-xs sm:text-[13px] font-bold text-gray-800 tracking-tight text-center truncate px-1">
                  {r.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
