"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function GGUApprovals({ approvals = [], brand = {} }) {
  const sectionTitle = brand?.approvalsTitle || "Accreditations & Associations";
  const sectionSubtitle =
    brand?.approvalsSubtitle || "of Golden Gate University, San Francisco";

  return (
    <section
      id="accreditations"
      className="certification w-full pt-12 sm:pt-16 pb-8 sm:pb-10  text-center select-none scroll-mt-20"
      style={{ backgroundColor: brand?.approvalsBg || "#F6F6F6" }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <h2
          className="text-[#111111] text-2xl sm:text-3xl lg:text-[30px] font-bold text-center m-0 leading-tight tracking-tight"
          style={{ color: brand?.approvalsHeaderColor || "#111111" }}
        >
          {sectionTitle}
        </h2>
        {sectionSubtitle && (
          <p className="text-[#555555] text-[15px] sm:text-[16px] mt-1.5 mb-8 sm:mb-10 text-center m-0">
            {sectionSubtitle}
          </p>
        )}

        <div className="b2-info grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center max-w-[1040px] mx-auto text-left">
          {approvals.map((item, idx) => {
            const data = normalizeApprovalItem(item, idx);
            return (
              <div
                key={data.id}
                className="b1 bg-white p-6 rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-slate-200/80 flex items-start gap-4 transition-all hover:shadow-md"
              >
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 shrink-0 flex items-center justify-center">
                  <Image
                    src={data.image}
                    alt={data.title || "Accreditation"}
                    fill
                    className="object-contain"
                    sizes="72px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-[#111111] leading-snug m-0 mb-1.5">
                    {data.title}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] text-[#444444] leading-relaxed m-0 font-normal">
                    {data.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
