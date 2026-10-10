"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function LpuApprovals({ approvals = [], brand = {} }) {
  const uniName = brand?.approvalsUniName || "LPU University";
  const titlePart1 = brand?.approvalsTitlePart1 || "Accreditations &";
  const titlePart2 = brand?.approvalsTitlePart2 || "Approvals";

  return (
    <section id="approvals" className="w-full bg-[#4d4d4d] text-white pt-5 sm:pt-7 md:pt-8 pb-6 sm:pb-7 md:pb-8 px-4 sm:px-6 lg:px-8 xl:px-12 scroll-mt-20">
      <div className="w-full max-w-[1400px] mx-auto text-center">
        <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] font-extrabold tracking-wide m-0 mb-5 sm:mb-6 md:mb-7 leading-tight">
          <span className="text-[#f58220] block sm:inline">{uniName}</span>{" "}
          <span className="text-white inline">{titlePart1} {titlePart2}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 w-full mx-auto justify-items-center items-start gap-5 sm:gap-4 md:gap-6 lg:gap-8">
          {approvals.map((appr, idx) => {
            const data = normalizeApprovalItem(appr, idx);
            // Show exactly 4 approvals on mobile (2x2 grid), and all 5 on desktop
            const isHiddenOnMobile = idx >= 4;

            return (
              <div
                key={data.id}
                className={`${
                  isHiddenOnMobile ? "hidden sm:flex" : "flex"
                } flex-col items-center w-full`}
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full bg-white flex items-center justify-center p-3 sm:p-3.5 shadow-lg transition-transform duration-200 hover:scale-105">
                  <Image
                    src={data.image}
                    alt={data.title || "Approval"}
                    fill
                    className="object-contain p-2 sm:p-2.5"
                    sizes="(max-width: 640px) 96px, 128px"
                  />
                </div>
                <div className="mt-2.5 sm:mt-3 text-center">
                  <p className="text-sm sm:text-base lg:text-[17px] font-extrabold text-white leading-tight m-0">
                    {data.title}
                  </p>
                  {data.tag && (
                    <p className="text-xs sm:text-[12px] font-semibold text-slate-300 mt-0.5 sm:mt-1 m-0 tracking-wider">
                      {data.tag}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
