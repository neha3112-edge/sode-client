"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function MUApprovals({ approvals = [], brand = {} }) {
  const title = brand?.approvalsTitle || "Mangalayatan University Online";
  const subtitle = brand?.approvalsSubtitle || "Approvals & Recognition";

  return (
    <section
      id="approvals"
      className="w-full py-8 sm:py-9 lg:py-10 bg-[#193579] text-center select-none scroll-mt-20"
      style={{ backgroundColor: brand?.primaryColor || "#193579" }}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-[18px] sm:text-[20px] lg:text-[22px] font-bold text-white uppercase tracking-wide m-0 mb-1">
          {title}
        </h1>
        <h3 className="text-[15px] sm:text-[16px] lg:text-[18px] font-normal sm:font-medium text-white uppercase tracking-wide m-0 mb-6 sm:mb-7">
          {subtitle}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-center">
          {approvals.map((item, idx) => {
            const data = normalizeApprovalItem(item, idx);
            const itemTitle = item?.title || item?.tag || data?.title || "";
            const itemText = item?.text || item?.description || item?.desc || data?.description || data?.text || "";
            const itemImage = item?.image || item?.logo || data?.image || "";

            return (
              <div key={item?.id || data?.id || idx} className="flex flex-col items-center text-center">
                <div className={brand?.approvalsIconContainerClassName || "relative w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] lg:w-[86px] lg:h-[86px] flex items-center justify-center shrink-0 mb-2 sm:mb-2.5"}>
                  <div className="relative w-full h-full">
                    <Image
                      src={itemImage}
                      alt={itemTitle || "Approval"}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 72px, (max-width: 1024px) 80px, 86px"
                    />
                  </div>
                </div>
                {itemTitle && (
                  <h2 className={brand?.approvalsItemTitleClassName || "text-[13.5px] sm:text-[14px] font-bold text-white tracking-tight mt-0.5 mb-1"}>
                    {itemTitle}
                  </h2>
                )}
                {itemText && (
                  <p className={brand?.approvalsItemTextClassName || "text-[11px] sm:text-[11.5px] text-white/95 leading-[1.3] font-normal m-0 max-w-[240px]"}>
                    {itemText}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
