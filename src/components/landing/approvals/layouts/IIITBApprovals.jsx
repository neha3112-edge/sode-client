"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function IIITBApprovals({
  approvals = [],
  brand = {},
  title,
  activeTitle,
}) {
  const trophyImage =
    brand?.approvalsTrophyImage ||
    "/assets/all_universities_images/iiitb/award-icon.webp";

  const heading =
    brand?.approvalsTitle ||
    title ||
    activeTitle ||
    "Approvals & Accreditation";

  return (
    <section
      id="approvals"
      className="accreditation-section w-full py-12 sm:py-16 lg:py-20 bg-[#212121] text-white select-none scroll-mt-20"
      style={{ backgroundColor: brand?.approvalsBg || "#212121" }}
    >
      <div className="accreditation-container max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-stretch gap-6 md:gap-8 lg:gap-12">
          {/* Left: Trophy + Title */}
          <div className="accreditation-left w-full md:w-[280px] lg:w-[320px] shrink-0 flex flex-row md:flex-col items-center justify-start md:justify-center text-left md:text-center gap-4 sm:gap-5 md:gap-0">
            <div className="trophy-wrapper relative w-[115px] h-[125px] sm:w-[120px] sm:h-[130px] md:w-[125px] md:h-[135px] lg:w-[145px] lg:h-[155px] mb-0 md:mb-4 lg:mb-5 shrink-0">
              <Image
                src={trophyImage}
                alt="Approvals & Accreditation Trophy"
                fill
                className="object-contain trophy"
                sizes="(max-width: 768px) 130px, 160px"
                priority
              />
            </div>
            <h2 className="text-[28px] sm:text-[30px] md:text-[28px] lg:text-[32px] font-extrabold text-white tracking-tight leading-[1.12] m-0 text-left md:text-center whitespace-pre-line">
              {heading.includes("&") ? (
                <>
                  <span>{heading.split("&")[0].trim()} &amp;</span>
                  <br />
                  <span>{heading.split("&")[1].trim()}</span>
                </>
              ) : (
                heading
              )}
            </h2>
          </div>

          {/* Vertical Divider Line */}
          <div
            className="hidden md:block w-[1.5px] bg-[#666666] self-stretch my-2 shrink-0 rounded-full"
            style={{ backgroundColor: "#666666" }}
          />

          {/* Right: Approvals Grid */}
          <div className="accreditation-grid flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-7 lg:gap-y-9 items-center justify-center">
            {approvals.map((item, idx) => {
              const data = normalizeApprovalItem(item, idx);
              return (
                <div
                  key={data.id || idx}
                  className="accreditation-item flex items-center gap-4 sm:gap-5"
                >
                  {/* Circular White Badge */}
                  <div className="accreditation-badge relative w-[72px] h-[72px] sm:w-[72px] sm:h-[72px] lg:w-[76px] lg:h-[76px] min-w-[72px] sm:min-w-[72px] lg:min-w-[76px] rounded-full bg-white flex items-center justify-center shrink-0 p-2.5 shadow-md">
                    <div className="relative w-full h-full">
                      <Image
                        src={data.image}
                        alt={data.title || `Approval ${idx + 1}`}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="accreditation-item-content flex-1 text-left">
                    <h4 className="text-white font-bold text-[17px] sm:text-[18px] lg:text-[19px] leading-tight mb-1 sm:mb-1.5 m-0">
                      {data.title}
                    </h4>
                    <p className="text-[#c8c8c8] text-[12.5px] sm:text-[13px] lg:text-[13.5px] leading-[1.45] font-normal m-0">
                      {data.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
