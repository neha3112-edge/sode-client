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
      className="certification w-full pt-7 sm:pt-7 md:pt-[28px] pb-8 sm:pb-10 text-center select-none scroll-mt-20"
      style={{ backgroundColor: brand?.approvalsBg || "#F6F6F6" }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <h2
          className="text-[#111111] text-[22px] sm:text-[26px] md:text-[28px] font-bold text-center m-0 leading-tight tracking-tight"
          style={{ color: brand?.approvalsHeaderColor || "#111111" }}
        >
          {sectionTitle}
        </h2>
        {sectionSubtitle && (
          <p className="sub-pp text-[#111111] text-[17px] sm:text-[16.5px] font-medium sm:font-medium mt-1.5 sm:mt-2 mb-6 sm:mb-7 md:mb-8 text-center m-0 max-w-[275px] sm:max-w-none mx-auto leading-snug">
            {sectionSubtitle}
          </p>
        )}

        <div className="b2-info grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 justify-center max-w-[1100px] mx-auto text-center">
          {approvals.map((item, idx) => {
            const data = normalizeApprovalItem(item, idx);
            return (
              <div
                key={data.id}
                className="b1 bg-white p-4 sm:p-5 rounded-[8px] shadow-[0_3px_12px_rgba(0,0,0,0.04)] border border-slate-200/70 border-b-[3px] border-b-[#DC520A] flex flex-col items-center justify-between h-[165px] sm:h-[175px] transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="relative w-full h-[85px] sm:h-[95px] flex items-center justify-center my-auto">
                  <Image
                    src={data.image}
                    alt={data.title || "Accreditation"}
                    fill
                    className="object-contain object-center p-1"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <span className="text-[12.5px] sm:text-[13px] md:text-[13.5px] font-bold text-[#111111] text-center tracking-tight mt-auto block">
                  {data.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
