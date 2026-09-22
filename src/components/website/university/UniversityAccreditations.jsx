"use client";

import React from "react";
import Image from "next/image";
import { Award } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export default function UniversityAccreditations({
  approvalsList,
  uniName,
}) {
  if (!approvalsList || approvalsList.length === 0) return null;

  return (
    <div
      id="approvals"
      className="scroll-mt-16 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 text-center"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-4">
        Rankings & Accreditations of {uniName}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 w-full">
        {approvalsList.map((item, idx) => {
          const logoSrc = item.logo || item.image ? getAssetPath(item.logo || item.image) : null;
          const title = item.name || item.code || "Accredited";
          const desc = item.description || `Approved by ${title}`;

          return (
            <div
              key={item._id || idx}
              className="bg-white rounded-xl border border-gray-200 flex flex-col p-1.5 sm:p-3 items-center justify-between text-center aspect-[4/4.6] sm:aspect-square shadow-2xs hover:border-blue-300 transition-colors overflow-hidden shrink-0 w-[calc((100%-12px)/3)] sm:w-[calc((100%-20px)/3)] md:w-[calc((100%-60px)/6)]"
            >
              <div className="flex-1 min-h-0 w-full relative">
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 64px, 80px"
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
                  </div>
                )}
              </div>
              <div className="w-full shrink-0 flex flex-col items-center justify-start text-center pt-1">
                <div className="w-full h-4 sm:h-5 flex items-center justify-center">
                  <h3 className="text-[10px] sm:text-[11.5px] md:text-[12.5px] font-bold text-gray-900 m-0 tracking-tight leading-tight line-clamp-1 w-full text-center">
                    {title}
                  </h3>
                </div>
                <div className="w-full h-[22px] sm:h-[26px] flex items-start justify-center mt-0.5">
                  {desc ? (
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600 leading-tight m-0 line-clamp-2 w-full text-center">
                      {desc}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
