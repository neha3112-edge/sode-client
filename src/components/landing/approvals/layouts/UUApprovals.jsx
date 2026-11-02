"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function UUApprovals({ approvals = [], brand = {} }) {
  const heading = brand?.approvalsTitle || "Online UU";
  const highlight = brand?.approvalsHighlight || "Approvals & Recognition";
  const subtitle = brand?.approvalsSubtitle || brand?.approvalsDescription || null;

  return (
    <section id="approvals" className="w-full py-6 sm:py-7 lg:py-8 bg-white select-none scroll-mt-20 font-poppins">
      <div className="uu-container w-full mx-auto text-center font-poppins">
        <h2 className="text-[20px] sm:text-[24px] lg:text-[27px] font-semibold leading-tight m-0 mb-2 sm:mb-2.5 font-poppins">
          <span className="text-[#003399]">{heading} </span>
          <span className="text-[#62B239]">{highlight}</span>
        </h2>
        {subtitle && (
          <p className="hidden sm:block text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#444444] font-normal leading-[1.6] max-w-[1140px] mx-auto mb-5 sm:mb-7 font-poppins">
            {subtitle}
          </p>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center justify-items-center w-full max-w-full mx-auto">
          {approvals.map((item, idx) => {
            const data = normalizeApprovalItem(item, idx);
            return (
              <div
                key={data.id || idx}
                className="w-full flex items-center justify-center p-1 sm:p-2 transition-transform hover:scale-105 duration-200"
              >
                <div className="relative w-full max-w-[115px] sm:max-w-[135px] md:max-w-[155px] lg:max-w-[175px] flex items-center justify-center">
                  <Image
                    src={data.image}
                    alt={data.title || `Approval ${idx + 1}`}
                    width={270}
                    height={270}
                    className="w-full h-auto object-contain mx-auto"
                    sizes="(max-width: 640px) 33vw, 16vw"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
