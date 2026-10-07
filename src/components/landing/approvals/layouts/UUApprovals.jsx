"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function UUApprovals({ approvals = [], brand = {} }) {
  const heading = brand?.approvalsTitle || "Online UU";
  const highlight = brand?.approvalsHighlight || "Approvals & Recognition";
  const subtitle = brand?.approvalsSubtitle || brand?.approvalsDescription || null;

  return (
    <section id="approvals" className="w-full py-8 sm:py-14 lg:py-16 bg-white select-none scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[22px] sm:text-[30px] lg:text-[34px] font-bold leading-tight m-0 mb-4 sm:mb-3">
          <span className="text-[#111111]">{heading} </span>
          <span className="text-[#62B239]">{highlight}</span>
        </h2>
        {subtitle && (
          <p className="hidden sm:block text-[12.5px] sm:text-[13.5px] text-[#444444] font-normal leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12">
            {subtitle}
          </p>
        )}

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6 lg:gap-10 items-center justify-items-center max-w-[1200px] mx-auto">
          {approvals.map((item, idx) => {
            const data = normalizeApprovalItem(item, idx);
            return (
              <div
                key={data.id}
                className="relative w-full max-w-[110px] sm:max-w-[150px] h-[70px] sm:h-[95px] lg:h-[105px] flex items-center justify-center transition-transform hover:scale-105 duration-200"
              >
                <Image
                  src={data.image}
                  alt={data.title || `Approval ${idx + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 110px, 160px"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
