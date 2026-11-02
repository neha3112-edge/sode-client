"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";
import LandingContainer from "../../LandingContainer";

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
        className="w-full py-3 sm:py-4 px-3 text-center"
        style={{ backgroundColor: headerBg }}
      >
        <h2
          className="text-[19px] sm:text-[23px] lg:text-[26px] font-bold tracking-normal leading-snug m-0"
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
        className="w-full py-5 sm:py-8 lg:py-10 px-0.75 sm:px-1.5 lg:px-0"
        style={{ backgroundColor: sectionBg }}
      >
        <LandingContainer className="approvals-content-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2.5 min-[390px]:gap-x-3 sm:gap-x-8 lg:gap-x-6 gap-y-4 sm:gap-y-6 lg:gap-y-8 items-center w-full">
            {approvals.map((item, idx) => {
              const data = normalizeApprovalItem(item, idx);
              return (
                <div
                  key={data.id}
                  className="flex items-center gap-2 sm:gap-3.5"
                >
                  <div className="relative w-12 h-12 min-[390px]:w-14 min-[390px]:h-14 sm:w-[72px] sm:h-[72px] lg:w-[72px] lg:h-[72px] shrink-0 flex items-center justify-center">
                    <Image
                      src={data.image}
                      alt={data.title || data.tag || `Approval ${idx + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 56px, 80px"
                    />
                  </div>
                  <p className="text-[10px] min-[360px]:text-[11px] sm:text-[13px] lg:text-[13px] font-normal text-[#111111] leading-[1.10] sm:leading-[1.2] m-0">
                    {data.title}
                  </p>
                </div>
              );
            })}
          </div>
        </LandingContainer>
      </div>
    </section>
  );
}
