"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function AmityApprovals({
  approvals = [],
  brand = {},
  activeUniversity,
  activeTitle,
}) {
  const cfg = brand?.approvalsConfig || {};
  const headerBg = cfg.headerBg || brand?.approvalsHeaderBg || brand?.accentColor || "#ffd508";
  const headerTextColor = cfg.headerColor || brand?.approvalsHeaderColor || brand?.primaryColor || "#08417b";
  const sectionBg = cfg.background || brand?.approvalsBg || "#fff5c4";
  const uniTitle = brand?.approvalsUniTitle || brand?.name || activeUniversity || "Amity University Online";
  const mainTitle = brand?.approvalsTitle || activeTitle || "Recognition and Approvals";

  return (
    <section id="approvals" className="w-full select-none scroll-mt-20">
      {/* Yellow Top Banner */}
      <div
        className="w-full py-3 sm:py-4 px-4 text-center"
        style={{ backgroundColor: headerBg }}
      >
        <h2
          className="text-[19px] sm:text-[23px] lg:text-[26px] font-bold tracking-tight leading-snug m-0"
          style={{ color: headerTextColor }}
        >
          <span>{uniTitle}</span>
          <span className="block text-[18px] sm:text-[22px] lg:text-[24px] font-bold mt-0.5">
            {mainTitle}
          </span>
        </h2>
      </div>

      {/* Cream Body with Approval Badges */}
      <div
        className="w-full py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: sectionBg }}
      >
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-5 sm:gap-y-6 lg:gap-y-8 items-center">
            {approvals.map((item, idx) => {
              const data = normalizeApprovalItem(item, idx);
              return (
                <div
                  key={data.id}
                  className="flex items-center gap-3 sm:gap-3.5"
                >
                  <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] lg:w-[80px] lg:h-[80px] shrink-0 flex items-center justify-center">
                    <Image
                      src={data.image}
                      alt={data.title || data.tag || `Approval ${idx + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                  </div>
                  <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] font-medium text-[#111111] leading-[1.3] m-0">
                    {data.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
