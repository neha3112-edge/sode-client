"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function ESGCIApprovals({ approvals = [], brand = {} }) {
  const sectionTitle = brand?.approvalsTitle || "APPROVALS AND ACCREDITATION";

  return (
    <section
      id="certification"
      className="certification w-full py-10 sm:py-14 lg:py-16 text-center select-none scroll-mt-20 bg-white"
      style={{ backgroundColor: brand?.approvalsBg || "#ffffff" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2
          className="text-[#111111] text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-center m-0 uppercase tracking-tight mb-8 sm:mb-10 lg:mb-12"
          style={{ color: brand?.approvalsHeaderColor || "#111111" }}
        >
          {sectionTitle}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-10 items-start max-w-[1140px] mx-auto">
          {approvals.map((item, idx) => {
            const data = normalizeApprovalItem(item, idx);
            return (
              <div
                key={data.id}
                className="flex flex-col items-center text-center px-1 sm:px-2"
              >
                <div className="relative w-full h-12 sm:h-14 lg:h-16 max-w-[170px] mb-3 sm:mb-4 flex items-center justify-center">
                  <Image
                    src={data.image}
                    alt={data.title || "Approval"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 140px, 170px"
                  />
                </div>
                <h3 className="text-[#04903c] text-[13.5px] sm:text-[15px] lg:text-[16px] font-bold mb-1.5 leading-snug">
                  {data.title}
                </h3>
                <p className="text-[#555555] text-[11px] sm:text-[12px] lg:text-[12.5px] leading-relaxed m-0 font-normal max-w-[240px]">
                  {data.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
