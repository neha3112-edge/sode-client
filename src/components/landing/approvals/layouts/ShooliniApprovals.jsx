"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function ShooliniApprovals({
  approvals = [],
  activeUniversity,
  subtitle,
  brand = {},
}) {
  const uniName = brand?.name || activeUniversity || "Shoolini University";

  return (
    <section id="approval" className="w-full select-none p-0 overflow-hidden bg-[#010d2a] scroll-mt-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 bg-[#010d2a] text-white flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:pl-20 py-8 sm:py-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold leading-[1.22] m-0 mb-3 text-white">
            {brand?.approvalsTitleHtml ? (
              <span dangerouslySetInnerHTML={{ __html: brand.approvalsTitleHtml }} />
            ) : (
              <>
                <span className="block font-bold">
                  <span className="text-[#fd202a]">Shoolini University </span>
                  <span className="text-[#ff389e]">Online</span>
                </span>
                <span className="block text-white font-bold">Recognitions &</span>
                <span className="block text-white font-bold">Accreditations</span>
              </>
            )}
          </h2>
          {subtitle && (
            <p className="text-[13px] sm:text-[14px] text-[#cbd5e1] font-normal leading-relaxed m-0 max-w-[420px]">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className="lg:col-span-7 p-6 sm:p-8 lg:p-10 xl:pr-16 flex items-center bg-white"
          style={{
            backgroundColor: brand?.approvalsRightBg || brand?.approvalsBg || "#ffffff",
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 w-full">
            {approvals.map((item, idx) => {
              const data = normalizeApprovalItem(item, idx);
              return (
                <div key={data.id} className="flex flex-col items-start text-left">
                  <div className="relative w-24 sm:w-28 h-12 sm:h-14 mb-2">
                    <Image
                      src={data.image}
                      alt={data.tag || data.title || "approval"}
                      fill
                      className="object-contain object-left"
                      sizes="120px"
                    />
                  </div>
                  <div className="text-[13px] sm:text-[13.5px] leading-tight">
                    <span className="font-extrabold text-[#fd202a] block">
                      {data.tag || data.title}
                    </span>
                    <span className="font-bold text-[#000000] block mt-0.5">
                      {item.subtext || data.title}
                    </span>
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
