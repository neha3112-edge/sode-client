"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function RushfordApprovals({ approvals = [], brand = {} }) {
  const sectionTitle = brand?.approvalsTitle || "Accreditation & Collaboration";
  const sectionSubtitle = brand?.approvalsSubtitle || "Rushford Business School, Switzerland";

  return (
    <section
      id="accreditations"
      className="certification w-full pt-10 sm:pt-14 pb-6 sm:pb-8 bg-white text-center select-none scroll-mt-20"
      style={{ backgroundColor: brand?.approvalsBg || "#ffffff" }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <h2 className="text-[#111111] text-[26px] sm:text-[32px] font-bold text-center m-0 tracking-tight mb-1.5">
          {sectionTitle}
        </h2>
        {sectionSubtitle && (
          <p className="text-[14px] sm:text-[15px] text-[#444444] mb-8 sm:mb-10 font-normal">
            {sectionSubtitle}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
          {approvals.map((item, idx) => {
            const data = normalizeApprovalItem(item, idx);
            return (
              <div
                key={data.id}
                className="bg-white p-3.5 sm:p-4 rounded-[10px] border-2 border-[#cccccc] flex items-center gap-3 sm:gap-4.5"
              >
                <div className="relative w-[105px] sm:w-[130px] md:w-[145px] h-[58px] sm:h-[65px] md:h-[72px] shrink-0 flex items-center justify-center">
                  <Image
                    src={data.image}
                    alt={data.title || "Approval"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 105px, 145px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#17479e] text-[15px] sm:text-[17px] md:text-[18px] font-bold mb-1 leading-snug">
                    {data.title}
                  </h3>
                  <p className="text-[#444444] text-[12px] sm:text-[12.5px] md:text-[13px] leading-snug m-0">
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
