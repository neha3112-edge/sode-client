"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function UpesApprovals({
  approvals = [],
  activeTitle,
  brand = {},
}) {
  return (
    <section
      id="approvals"
      className="py-10 sm:py-14 bg-[#e6e6e6] text-center select-none scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold tracking-tight mb-6 sm:mb-8 m-0 leading-snug">
          <span className="text-[#003399]">UPES University Online</span>{" "}
          <span className="text-[#f2167d]">APPROVALS AND RECOGNITIONS</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {approvals.map((appr, idx) => {
            const data = normalizeApprovalItem(appr, idx);
            return (
              <div
                key={data.id || idx}
                className="bg-white rounded-[10px] p-3.5 sm:p-5 flex flex-col items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.06)] min-h-[140px] sm:min-h-[160px]"
              >
                <div className="relative w-full max-w-[130px] h-[50px] sm:h-[60px] my-auto">
                  <Image
                    src={data.image}
                    alt={data.title || data.tag || "Approval"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 140px, 180px"
                  />
                </div>
                <p className="text-[12px] sm:text-[13px] font-medium text-slate-800 leading-snug m-0 mt-2 line-clamp-2">
                  {data.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
